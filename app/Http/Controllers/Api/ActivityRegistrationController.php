<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ActivityRegistrationController extends Controller
{
    /**
     * Inscribir un participante a una actividad
     */
    public function register(Request $request, Activity $activity)
    {
        try {
            // Validar datos
            $request->validate([
                'participant_id' => 'required|exists:participants,id',
                'notes' => 'nullable|string|max:500',
            ]);

            $participant = Participant::findOrFail($request->participant_id);

            // Verificar si ya está inscrito
            if ($participant->isRegisteredIn($activity)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ya estás inscrito en esta actividad',
                ], 400);
            }

            // Verificar si la actividad requiere inscripción
            if (!$activity->requires_registration) {
                return response()->json([
                    'success' => false,
                    'message' => 'Esta actividad no requiere inscripción previa',
                ], 400);
            }

            // Verificar si hay cupos disponibles
            if (!$activity->hasAvailableSpots()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Lo sentimos, no hay cupos disponibles para esta actividad',
                ], 400);
            }

            // Iniciar transacción
            DB::beginTransaction();

            try {
                // Registrar al participante
                $participant->activities()->attach($activity->id, [
                    'status' => 'registered',
                    'notes' => $request->notes,
                    'registered_at' => now(),
                ]);

                // Actualizar contador de participantes
                $activity->increment('current_participants');

                // Enviar email de confirmación
                try {
                    // Configurar SMTP manualmente para asegurar el envío
                    config([
                        'mail.default' => 'smtp',
                        'mail.mailers.smtp.host' => 'smtp.gmail.com',
                        'mail.mailers.smtp.port' => 587,
                        'mail.mailers.smtp.username' => 'jhoannac000@gmail.com',
                        'mail.mailers.smtp.password' => 'jtiajrnjtapvcqbu',
                        'mail.mailers.smtp.encryption' => 'tls',
                        'mail.from.address' => 'jhoannac000@gmail.com',
                        'mail.from.name' => 'Congreso de Tecnología UMG',
                    ]);

                    // Aquí se enviará el email (lo crearemos después)
                    // Mail::to($participant->email)->send(new ActivityRegistrationConfirmation($participant, $activity));
                } catch (\Exception $e) {
                    Log::error('Error enviando email de confirmación de inscripción: ' . $e->getMessage());
                }

                DB::commit();

                return response()->json([
                    'success' => true,
                    'message' => '¡Inscripción exitosa! Te hemos enviado un email de confirmación.',
                    'data' => [
                        'activity' => $activity->load('category'),
                        'registration' => [
                            'status' => 'registered',
                            'registered_at' => now()->toISOString(),
                        ],
                    ],
                ], 201);

            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }

        } catch (\Exception $e) {
            Log::error('Error en inscripción a actividad: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al procesar la inscripción',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cancelar inscripción de un participante
     */
    public function cancel(Request $request, Activity $activity)
    {
        try {
            $request->validate([
                'participant_id' => 'required|exists:participants,id',
            ]);

            $participant = Participant::findOrFail($request->participant_id);

            // Verificar si está inscrito
            if (!$participant->isRegisteredIn($activity)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No estás inscrito en esta actividad',
                ], 400);
            }

            DB::beginTransaction();

            try {
                // Actualizar el estado a cancelado en lugar de eliminar
                $participant->activities()->updateExistingPivot($activity->id, [
                    'status' => 'cancelled',
                ]);

                // Decrementar contador de participantes
                $activity->decrement('current_participants');

                DB::commit();

                return response()->json([
                    'success' => true,
                    'message' => 'Inscripción cancelada exitosamente',
                ], 200);

            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }

        } catch (\Exception $e) {
            Log::error('Error al cancelar inscripción: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al cancelar la inscripción',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Obtener las actividades inscritas de un participante
     */
    public function myActivities(Request $request)
    {
        try {
            $request->validate([
                'participant_id' => 'required|exists:participants,id',
            ]);

            $participant = Participant::findOrFail($request->participant_id);

            $activities = $participant->activities()
                ->with('category')
                ->wherePivotIn('status', ['registered', 'confirmed'])
                ->get()
                ->map(function ($activity) {
                    return [
                        'id' => $activity->id,
                        'name' => $activity->name,
                        'description' => $activity->description,
                        'type' => $activity->type,
                        'start_date' => $activity->start_date->toISOString(),
                        'end_date' => $activity->end_date->toISOString(),
                        'location' => $activity->location,
                        'instructor' => $activity->instructor,
                        'category' => $activity->category->name,
                        'registration' => [
                            'status' => $activity->pivot->status,
                            'registered_at' => $activity->pivot->registered_at,
                            'notes' => $activity->pivot->notes,
                        ],
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $activities,
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error al obtener actividades inscritas: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener tus actividades',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Verificar si un participante está inscrito en una actividad
     */
    public function checkRegistration(Request $request, Activity $activity)
    {
        try {
            $request->validate([
                'participant_id' => 'required|exists:participants,id',
            ]);

            $participant = Participant::findOrFail($request->participant_id);

            $isRegistered = $participant->isRegisteredIn($activity);

            $registration = null;
            if ($isRegistered) {
                $pivotData = $participant->activities()
                    ->where('activity_id', $activity->id)
                    ->first()
                    ->pivot;

                $registration = [
                    'status' => $pivotData->status,
                    'registered_at' => $pivotData->registered_at,
                    'notes' => $pivotData->notes,
                ];
            }

            return response()->json([
                'success' => true,
                'is_registered' => $isRegistered,
                'registration' => $registration,
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error al verificar inscripción: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al verificar la inscripción',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
