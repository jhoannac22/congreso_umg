<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreParticipantRequest;
use App\Models\Activity;
use App\Models\Participant;
use App\Services\EmailService;
use App\Services\QRCodeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ParticipantController extends Controller
{
    protected EmailService $emailService;
    protected QRCodeService $qrCodeService;

    public function __construct(EmailService $emailService, QRCodeService $qrCodeService)
    {
        $this->emailService = $emailService;
        $this->qrCodeService = $qrCodeService;
    }
    /**
     * Dashboard público - información básica de participantes
     */
    public function dashboard(): JsonResponse
    {
        $participants = Participant::select([
            'id', 'first_name', 'last_name', 'email', 'phone', 
            'type', 'school', 'student_id', 'created_at', 'qr_code'
        ])->orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Datos del dashboard obtenidos exitosamente',
            'data' => $participants,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Participant::with(['activities']);

        // Filtrar por tipo
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filtrar por estado activo
        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }

        // Buscar por nombre o email
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Ordenar por nombre
        $query->orderBy('first_name')->orderBy('last_name');

        $participants = $query->paginate(15);

        return response()->json([
            'message' => 'Participantes obtenidos exitosamente',
            'data' => $participants,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreParticipantRequest $request): JsonResponse
    {
        $participant = Participant::create($request->validated());

        // El código QR se genera automáticamente en el modelo Participant
        // No necesitamos generar uno manualmente aquí

        // Enviar email de confirmación automáticamente
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
            
            // Enviar email directamente
            Mail::to($participant->email)->send(new \App\Mail\ParticipantRegistrationConfirmation($participant));
        } catch (\Exception $e) {
            // Log del error pero no fallar el registro
            Log::error('Error enviando email de confirmación: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Participante registrado exitosamente',
            'data' => $participant,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Participant $participant): JsonResponse
    {
        $participant->load(['activities', 'attendances', 'diplomas', 'winners']);

        return response()->json([
            'message' => 'Participante obtenido exitosamente',
            'data' => $participant,
        ]);
    }

    /**
     * Obtener participante por email
     */
    public function showByEmail(string $email): JsonResponse
    {
        try {
            $participant = Participant::where('email', urldecode($email))->first();

            if (!$participant) {
                return response()->json([
                    'message' => 'Participante no encontrado',
                    'error' => 'No se encontró un participante con ese email'
                ], 404);
            }

            $participant->load(['activities', 'attendances', 'diplomas', 'winners']);

            return response()->json([
                'message' => 'Participante obtenido exitosamente',
                'data' => $participant,
            ]);
        } catch (\Exception $e) {
            Log::error('Error getting participant by email', [
                'email' => $email,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'message' => 'Error al obtener participante',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreParticipantRequest $request, Participant $participant): JsonResponse
    {
        $participant->update($request->validated());

        return response()->json([
            'message' => 'Participante actualizado exitosamente',
            'data' => $participant,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Participant $participant): JsonResponse
    {
        $participant->delete();

        return response()->json([
            'message' => 'Participante eliminado exitosamente',
        ]);
    }

    /**
     * Registrar participante en una actividad
     */
    public function registerActivity(Request $request, Participant $participant): JsonResponse
    {
        $request->validate([
            'activity_id' => 'required|exists:activities,id',
        ]);

        $activity = Activity::findOrFail($request->activity_id);

        // Verificar si ya está registrado
        if ($participant->activities()->where('activity_id', $activity->id)->exists()) {
            return response()->json([
                'message' => 'El participante ya está registrado en esta actividad',
            ], 422);
        }

        // Verificar cupos disponibles
        if (!$activity->hasAvailableSpots()) {
            return response()->json([
                'message' => 'No hay cupos disponibles para esta actividad',
            ], 422);
        }

        // Registrar en la actividad
        $participant->activities()->attach($activity->id, [
            'status' => $activity->requires_approval ? 'pending' : 'approved',
            'registered_at' => now(),
        ]);

        // Actualizar contador de participantes
        $activity->increment('current_participants');

        return response()->json([
            'message' => 'Participante registrado en la actividad exitosamente',
            'data' => [
                'participant' => $participant,
                'activity' => $activity,
                'status' => $activity->requires_approval ? 'pending' : 'approved',
            ],
        ]);
    }

    /**
     * Desregistrar participante de una actividad
     */
    public function unregisterActivity(Participant $participant, Activity $activity): JsonResponse
    {
        // Verificar si está registrado
        if (!$participant->activities()->where('activity_id', $activity->id)->exists()) {
            return response()->json([
                'message' => 'El participante no está registrado en esta actividad',
            ], 422);
        }

        // Desregistrar de la actividad
        $participant->activities()->detach($activity->id);

        // Actualizar contador de participantes
        $activity->decrement('current_participants');

        return response()->json([
            'message' => 'Participante desregistrado de la actividad exitosamente',
        ]);
    }

    /**
     * Obtener código QR del participante
     */
    public function getQrCode(Participant $participant): JsonResponse
    {
        return response()->json([
            'message' => 'Código QR obtenido exitosamente',
            'data' => [
                'qr_code' => $participant->qr_code,
                'participant' => $participant,
            ],
        ]);
    }

    /**
     * Generar reporte de participantes
     */
    public function report(Request $request): JsonResponse
    {
        $query = Participant::withCount(['activities', 'attendances', 'diplomas']);

        // Filtrar por tipo
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filtrar por rango de fechas de registro
        if ($request->has('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $participants = $query->get();

        $stats = [
            'total_participants' => $participants->count(),
            'internal_participants' => $participants->where('type', 'interno')->count(),
            'external_participants' => $participants->where('type', 'externo')->count(),
            'active_participants' => $participants->where('is_active', true)->count(),
            'total_activities_registered' => $participants->sum('activities_count'),
            'total_attendances' => $participants->sum('attendances_count'),
            'total_diplomas' => $participants->sum('diplomas_count'),
        ];

        return response()->json([
            'message' => 'Reporte de participantes generado exitosamente',
            'data' => [
                'participants' => $participants,
                'statistics' => $stats,
            ],
        ]);
    }
}
