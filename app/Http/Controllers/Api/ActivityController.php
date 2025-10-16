<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = \App\Models\Activity::with('category');

        // Filtrar por estado activo si se especifica
        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        } else {
            // Por defecto, solo mostrar actividades activas
            $query->where('is_active', true);
        }

        // Filtrar por tipo
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filtrar por categoría
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Ordenar por fecha de inicio
        $query->orderBy('start_date');

        $activities = $query->get();

        return response()->json([
            'message' => 'Actividades obtenidas exitosamente',
            'data' => $activities,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'type' => 'required|in:taller,competencia',
            'start_date' => 'required|date|after:now',
            'end_date' => 'required|date|after:start_date',
            'location' => 'nullable|string|max:255',
            'max_participants' => 'nullable|integer|min:0',
            'requirements' => 'nullable|string|max:1000',
            'materials' => 'nullable|string|max:1000',
            'cost' => 'nullable|numeric|min:0',
            'instructor' => 'nullable|string|max:255',
            'instructor_bio' => 'nullable|string|max:1000',
            'requires_approval' => 'sometimes|boolean',
        ]);

        $activity = \App\Models\Activity::create($request->all());
        $activity->load('category');

        return response()->json([
            'message' => 'Actividad creada exitosamente',
            'data' => $activity,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(\App\Models\Activity $activity): \Illuminate\Http\JsonResponse
    {
        $activity->load(['category', 'participants']);

        return response()->json([
            'message' => 'Actividad obtenida exitosamente',
            'data' => $activity,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, \App\Models\Activity $activity): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'category_id' => 'sometimes|required|exists:categories,id',
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string|max:2000',
            'type' => 'sometimes|required|in:taller,competencia',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after:start_date',
            'location' => 'sometimes|nullable|string|max:255',
            'max_participants' => 'sometimes|nullable|integer|min:0',
            'requirements' => 'sometimes|nullable|string|max:1000',
            'materials' => 'sometimes|nullable|string|max:1000',
            'cost' => 'sometimes|nullable|numeric|min:0',
            'instructor' => 'sometimes|nullable|string|max:255',
            'instructor_bio' => 'sometimes|nullable|string|max:1000',
            'is_active' => 'sometimes|boolean',
            'requires_approval' => 'sometimes|boolean',
        ]);

        $activity->update($request->all());
        $activity->load('category');

        return response()->json([
            'message' => 'Actividad actualizada exitosamente',
            'data' => $activity,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(\App\Models\Activity $activity): \Illuminate\Http\JsonResponse
    {
        // Verificar si la actividad tiene participantes registrados
        if ($activity->participants()->count() > 0) {
            return response()->json([
                'message' => 'No se puede eliminar la actividad porque tiene participantes registrados',
            ], 422);
        }

        $activity->delete();

        return response()->json([
            'message' => 'Actividad eliminada exitosamente',
        ]);
    }

    /**
     * Activar/desactivar actividad
     */
    public function toggleStatus(\App\Models\Activity $activity): \Illuminate\Http\JsonResponse
    {
        $activity->update(['is_active' => !$activity->is_active]);

        return response()->json([
            'message' => 'Estado de actividad actualizado exitosamente',
            'data' => $activity,
        ]);
    }

    /**
     * Obtener participantes de una actividad
     */
    public function participants(\App\Models\Activity $activity): \Illuminate\Http\JsonResponse
    {
        $participants = $activity->participants()
            ->withPivot(['status', 'registered_at', 'approved_at'])
            ->orderBy('pivot_registered_at', 'desc')
            ->get();

        return response()->json([
            'message' => 'Participantes de la actividad obtenidos exitosamente',
            'data' => [
                'activity' => $activity,
                'participants' => $participants,
            ],
        ]);
    }

    /**
     * Aprobar participante en una actividad
     */
    public function approveParticipant(\App\Models\Activity $activity, \App\Models\Participant $participant): \Illuminate\Http\JsonResponse
    {
        $pivot = $activity->participants()->where('participant_id', $participant->id)->first();

        if (!$pivot) {
            return response()->json([
                'message' => 'El participante no está registrado en esta actividad',
            ], 404);
        }

        if ($pivot->pivot->status === 'approved') {
            return response()->json([
                'message' => 'El participante ya está aprobado',
            ], 422);
        }

        $activity->participants()->updateExistingPivot($participant->id, [
            'status' => 'approved',
            'approved_at' => now(),
        ]);

        return response()->json([
            'message' => 'Participante aprobado exitosamente',
        ]);
    }

    /**
     * Rechazar participante en una actividad
     */
    public function rejectParticipant(\App\Models\Activity $activity, \App\Models\Participant $participant): \Illuminate\Http\JsonResponse
    {
        $pivot = $activity->participants()->where('participant_id', $participant->id)->first();

        if (!$pivot) {
            return response()->json([
                'message' => 'El participante no está registrado en esta actividad',
            ], 404);
        }

        $activity->participants()->updateExistingPivot($participant->id, [
            'status' => 'rejected',
        ]);

        // Decrementar contador de participantes
        $activity->decrement('current_participants');

        return response()->json([
            'message' => 'Participante rechazado exitosamente',
        ]);
    }

    /**
     * Generar reporte de actividades
     */
    public function report(Request $request): \Illuminate\Http\JsonResponse
    {
        $query = \App\Models\Activity::with(['category'])->withCount(['participants']);

        // Filtrar por tipo
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filtrar por categoría
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filtrar por estado activo
        if ($request->has('active')) {
            $query->where('is_active', $request->boolean('active'));
        }

        // Filtrar por rango de fechas
        if ($request->has('date_from')) {
            $query->whereDate('start_date', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('start_date', '<=', $request->date_to);
        }

        $activities = $query->get();

        $stats = [
            'total_activities' => $activities->count(),
            'talleres' => $activities->where('type', 'taller')->count(),
            'competencias' => $activities->where('type', 'competencia')->count(),
            'active_activities' => $activities->where('is_active', true)->count(),
            'total_participants' => $activities->sum('participants_count'),
            'activities_with_full_capacity' => $activities->filter(function ($activity) {
                return $activity->max_participants > 0 && $activity->current_participants >= $activity->max_participants;
            })->count(),
        ];

        // Agrupar por categoría
        $byCategory = $activities->groupBy('category_id')->map(function ($group) {
            return [
                'category' => $group->first()->category,
                'total_activities' => $group->count(),
                'total_participants' => $group->sum('participants_count'),
            ];
        });

        return response()->json([
            'message' => 'Reporte de actividades generado exitosamente',
            'data' => [
                'activities' => $activities,
                'statistics' => $stats,
                'by_category' => $byCategory,
            ],
        ]);
    }

    /**
     * Register a participant for an activity
     */
    public function register(Request $request, $id)
    {
        try {
            \Log::info('Iniciando registro de actividad', [
                'activity_id' => $id,
                'request_data' => $request->all()
            ]);

            $request->validate([
                'participant_id' => 'required|integer|exists:participants,id',
                'notes' => 'nullable|string|max:500',
                'payment_data' => 'nullable|array',
                'payment_data.card_number' => 'required_with:payment_data|string|min:12|max:19',
                'payment_data.expiry_date' => 'required_with:payment_data|string|regex:/^\d{2}\/\d{2}$/',
                'payment_data.cvv' => 'required_with:payment_data|string|min:3|max:4',
                'payment_data.cardholder_name' => 'required_with:payment_data|string|max:100',
                'payment_data.email' => 'required_with:payment_data|email|max:100',
                'payment_data.phone' => 'required_with:payment_data|string|regex:/^\d{8}$/',
                'payment_data.amount' => 'required_with:payment_data|numeric|min:0',
                'payment_data.currency' => 'required_with:payment_data|string|max:3',
            ]);

            \Log::info('Validación pasada correctamente');

            $activity = \App\Models\Activity::findOrFail($id);
            $participant = \App\Models\Participant::findOrFail($request->participant_id);

            // Verificar si la actividad está activa
            if (!$activity->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Esta actividad no está disponible para inscripciones'
                ], 400);
            }

            // Verificar si ya está inscrito
            $existingRegistration = \App\Models\ActivityRegistration::where('activity_id', $activity->id)
                ->where('participant_id', $participant->id)
                ->first();

            if ($existingRegistration) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ya estás inscrito en esta actividad'
                ], 400);
            }

            // Verificar cupos disponibles
            if ($activity->max_participants > 0) {
                $currentRegistrations = \App\Models\ActivityRegistration::where('activity_id', $activity->id)
                    ->whereIn('status', ['registered', 'confirmed'])
                    ->count();

                if ($currentRegistrations >= $activity->max_participants) {
                    return response()->json([
                        'success' => false,
                        'message' => 'No hay cupos disponibles para esta actividad'
                    ], 400);
                }
            }

            // Procesar pago si es necesario
            $paymentStatus = 'none';
            $transactionId = null;
            
            \Log::info('Verificando si requiere pago', [
                'has_payment_data' => $request->has('payment_data'),
                'requires_payment' => $activity->requires_payment,
                'price' => $activity->price
            ]);
            
            if ($request->has('payment_data') && $activity->requires_payment && $activity->price > 0) {
                \Log::info('Procesando pago', [
                    'payment_data' => $request->payment_data
                ]);
                
                // Validación muy simple para demo
                $cardNumber = str_replace(' ', '', $request->payment_data['card_number'] ?? '');
                
                if (strlen($cardNumber) < 12 || strlen($cardNumber) > 19) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Número de tarjeta debe tener entre 12 y 19 dígitos'
                    ], 400);
                }
                
                // Simular pago exitoso
                $paymentStatus = 'paid';
                $transactionId = 'TXN_' . time() . '_' . rand(1000, 9999);
                
                \Log::info('Pago procesado exitosamente', [
                    'transaction_id' => $transactionId
                ]);
            }

            // Crear la inscripción
            $registration = \App\Models\ActivityRegistration::create([
                'activity_id' => $activity->id,
                'participant_id' => $participant->id,
                'status' => $paymentStatus === 'paid' ? 'confirmed' : 'registered',
                'notes' => $request->notes,
                'payment_status' => $paymentStatus,
                'payment_method' => $request->has('payment_data') ? 'card' : null,
                'transaction_id' => $transactionId,
                'amount_paid' => $request->has('payment_data') ? $request->payment_data['amount'] : 0,
                'currency' => $request->has('payment_data') ? $request->payment_data['currency'] : 'GTQ',
                'registered_at' => now(),
            ]);

            // Actualizar contador de participantes
            $activity->increment('current_participants');

            // Cargar las relaciones necesarias para el email
            $registration->load(['activity', 'participant']);

            // Enviar email de confirmación
            try {
                \Mail::to($participant->email)->send(new \App\Mail\ActivityRegistrationConfirmation($registration));
            } catch (\Exception $e) {
                \Log::error('Error enviando email de confirmación: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => $paymentStatus === 'paid' 
                    ? 'Inscripción exitosa y pago procesado correctamente'
                    : 'Inscripción exitosa',
                'data' => [
                    'registration' => $registration,
                    'activity' => $activity,
                    'participant' => $participant,
                    'payment_status' => $paymentStatus,
                    'transaction_id' => $transactionId
                ]
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Datos de entrada inválidos',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error en registro de actividad: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }

    /**
     * Process payment for activity registration
     */
    private function processPayment($paymentData, $activity)
    {
        try {
            // Verificar que paymentData no sea null
            if (!$paymentData || !is_array($paymentData)) {
                return [
                    'success' => false,
                    'message' => 'Datos de pago inválidos'
                ];
            }

            // Verificar que todas las claves requeridas existan
            $requiredKeys = ['card_number', 'expiry_date', 'cvv', 'amount'];
            foreach ($requiredKeys as $key) {
                if (!isset($paymentData[$key])) {
                    return [
                        'success' => false,
                        'message' => "Campo requerido faltante: $key"
                    ];
                }
            }

            // Simular procesamiento de pago
            // En una implementación real, aquí se integraría con un procesador de pagos como Stripe, PayPal, etc.
            
            // Validaciones básicas
            $cardNumber = str_replace(' ', '', $paymentData['card_number']);
            $expiryDate = $paymentData['expiry_date'];
            $cvv = $paymentData['cvv'];
            $amount = $paymentData['amount'];
            
            // Validar número de tarjeta
            if (!$this->validateCardNumber($cardNumber)) {
                return [
                    'success' => false,
                    'message' => 'Número de tarjeta inválido'
                ];
            }
            
            // Validar fecha de vencimiento
            if (!$this->validateExpiryDate($expiryDate)) {
                return [
                    'success' => false,
                    'message' => 'Fecha de vencimiento inválida'
                ];
            }
            
            // Validar CVV
            if (strlen($cvv) < 3 || strlen($cvv) > 4) {
                return [
                    'success' => false,
                    'message' => 'CVV inválido'
                ];
            }
            
            // Validar monto
            if ($amount != $activity->price) {
                return [
                    'success' => false,
                    'message' => 'El monto no coincide con el precio de la actividad'
                ];
            }
            
            // Simular procesamiento exitoso
            $transactionId = 'TXN_' . time() . '_' . rand(1000, 9999);
            
            // Log del pago procesado
            \Log::info('Pago procesado exitosamente', [
                'transaction_id' => $transactionId,
                'activity_id' => $activity->id,
                'amount' => $amount,
                'currency' => $paymentData['currency'],
                'cardholder_name' => $paymentData['cardholder_name'],
                'email' => $paymentData['email']
            ]);
            
            return [
                'success' => true,
                'transaction_id' => $transactionId,
                'message' => 'Pago procesado exitosamente'
            ];
            
        } catch (\Exception $e) {
            \Log::error('Error procesando pago: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Error procesando el pago'
            ];
        }
    }

    /**
     * Validate card number - Very permissive for demo purposes
     */
    private function validateCardNumber($cardNumber)
    {
        $cardNumber = str_replace(' ', '', $cardNumber);
        
        // Solo verificar que contenga dígitos y tenga longitud válida
        return ctype_digit($cardNumber) && strlen($cardNumber) >= 12 && strlen($cardNumber) <= 19;
    }

    /**
     * Validate expiry date
     */
    private function validateExpiryDate($expiryDate)
    {
        $parts = explode('/', $expiryDate);
        if (count($parts) != 2) {
            return false;
        }
        
        $month = intval($parts[0]);
        $year = intval($parts[1]);
        
        if ($month < 1 || $month > 12) {
            return false;
        }
        
        $currentYear = date('y');
        $currentMonth = date('n');
        
        if ($year < $currentYear) {
            return false;
        }
        
        if ($year == $currentYear && $month < $currentMonth) {
            return false;
        }
        
        return true;
    }
}
