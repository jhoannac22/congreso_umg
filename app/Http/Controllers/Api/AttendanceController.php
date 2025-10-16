<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Attendance;
use App\Models\Participant;
use App\Models\AttendanceQrCode;
use App\Models\QrScanner;
use App\Models\ActivityRegistration;
use App\Services\QrCodeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AttendanceController extends Controller
{
    protected QrCodeService $qrCodeService;

    public function __construct(QrCodeService $qrCodeService)
    {
        $this->qrCodeService = $qrCodeService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Attendance::with(['participant', 'activity']);

        // Filtrar por participante
        if ($request->has('participant_id')) {
            $query->where('participant_id', $request->participant_id);
        }

        // Filtrar por actividad
        if ($request->has('activity_id')) {
            $query->where('activity_id', $request->activity_id);
        }

        // Filtrar por tipo
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filtrar por fecha
        if ($request->has('date_from')) {
            $query->whereDate('actual_check_in', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('actual_check_in', '<=', $request->date_to);
        }

        // Ordenar por fecha de check-in
        $query->orderBy('actual_check_in', 'desc');

        $attendances = $query->paginate(15);

        return response()->json([
            'message' => 'Asistencias obtenidas exitosamente',
            'data' => $attendances,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'participant_id' => 'required|exists:participants,id',
            'activity_id' => 'required|exists:activities,id',
            'type' => 'required|in:general,activity',
            'notes' => 'nullable|string|max:1000',
        ]);

        $attendance = Attendance::create([
            'participant_id' => $request->participant_id,
            'activity_id' => $request->activity_id,
            'check_in_time' => now(),
            'type' => $request->type,
            'notes' => $request->notes,
        ]);

        $attendance->load(['participant', 'activity']);

        return response()->json([
            'message' => 'Asistencia registrada exitosamente',
            'data' => $attendance,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance): JsonResponse
    {
        $attendance->load(['participant', 'activity']);

        return response()->json([
            'message' => 'Asistencia obtenida exitosamente',
            'data' => $attendance,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance): JsonResponse
    {
        $request->validate([
            'notes' => 'nullable|string|max:1000',
        ]);

        $attendance->update($request->only(['notes']));

        return response()->json([
            'message' => 'Asistencia actualizada exitosamente',
            'data' => $attendance,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance): JsonResponse
    {
        $attendance->delete();

        return response()->json([
            'message' => 'Asistencia eliminada exitosamente',
        ]);
    }

    /**
     * Check-in usando código QR del nuevo sistema
     */
    public function checkIn(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'qr_data' => 'required|string',
            'scanner_id' => 'nullable|string',
            'scanner_location' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Validar el QR code
            $validation = $this->qrCodeService->validateQrCode($request->qr_data);

            if (!$validation['valid']) {
                return response()->json([
                    'success' => false,
                    'message' => $validation['error'],
                    'error_type' => $this->getErrorType($validation['error'])
                ], 400);
            }

            $qrCode = $validation['qr_code'];
            $participant = $validation['participant'];
            $activity = $validation['activity'];

            // Verificar si ya tiene asistencia registrada para esta actividad
            $existingAttendance = Attendance::where('participant_id', $participant->id)
                ->where('activity_id', $activity->id)
                ->whereDate('actual_check_in', today())
                ->first();

            if ($existingAttendance) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ya tienes asistencia registrada para esta actividad hoy',
                    'data' => [
                        'existing_attendance' => $existingAttendance->getSummary()
                    ]
                ], 409);
            }

            // Verificar scanner si se proporciona
            $scannedBy = null;
            if ($request->scanner_id) {
                $scanner = QrScanner::authenticateByApiKey($request->scanner_id);
                if (!$scanner || !$scanner->canScanActivity($activity->id)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Scanner no autorizado para esta actividad'
                    ], 403);
                }
                $scannedBy = $scanner->scanner_code;
                $scanner->recordUsage();
            }

            // Registrar asistencia
            $attendance = Attendance::registerFromQr($qrCode, $scannedBy, $request->scanner_location);

            Log::info('Attendance registered via QR scan', [
                'attendance_id' => $attendance->id,
                'participant_id' => $participant->id,
                'activity_id' => $activity->id,
                'scanner_id' => $scannedBy,
                'qr_code_id' => $qrCode->id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Asistencia registrada exitosamente',
                'data' => [
                    'attendance' => $attendance->getSummary(),
                    'participant' => [
                        'id' => $participant->id,
                        'name' => $participant->first_name . ' ' . $participant->last_name,
                        'email' => $participant->email,
                        'type' => $participant->type,
                    ],
                    'activity' => [
                        'id' => $activity->id,
                        'name' => $activity->name,
                        'type' => $activity->type,
                        'start_date' => $activity->start_date,
                        'end_date' => $activity->end_date,
                        'location' => $activity->location,
                    ],
                    'qr_code' => [
                        'id' => $qrCode->id,
                        'used_at' => $qrCode->used_at,
                    ]
                ]
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error registering attendance via QR', [
                'qr_data' => $request->qr_data,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }

    /**
     * Obtener un QR code de prueba válido
     */
    public function getTestQrCode(Request $request): JsonResponse
    {
        try {
            // Buscar el primer QR code activo
            $qrCode = AttendanceQrCode::where('status', 'active')
                ->whereNull('used_at')
                ->with(['participant', 'activity'])
                ->first();

            if (!$qrCode) {
                return response()->json([
                    'success' => false,
                    'message' => 'No active QR codes available for testing'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Test QR code retrieved successfully',
                'data' => [
                    'qr_data' => $qrCode->qr_code_data,
                    'participant' => [
                        'name' => $qrCode->participant->first_name . ' ' . $qrCode->participant->last_name,
                    ],
                    'activity' => [
                        'name' => $qrCode->activity->name,
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error getting test QR code', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error getting test QR code: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Validar QR code sin registrar asistencia (para preview)
     */
    public function validateQrCode(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'qr_data' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $validation = $this->qrCodeService->validateQrCode($request->qr_data);

            if (!$validation['valid']) {
                return response()->json([
                    'success' => false,
                    'message' => $validation['error'],
                    'error_type' => $this->getErrorType($validation['error'])
                ], 400);
            }

            $qrCode = $validation['qr_code'];
            $participant = $validation['participant'];
            $activity = $validation['activity'];

            // Verificar si ya tiene asistencia
            $existingAttendance = Attendance::where('participant_id', $participant->id)
                ->where('activity_id', $activity->id)
                ->whereDate('actual_check_in', today())
                ->first();

            return response()->json([
                'success' => true,
                'message' => 'QR code válido',
                'data' => [
                    'participant' => [
                        'id' => $participant->id,
                        'name' => $participant->first_name . ' ' . $participant->last_name,
                        'email' => $participant->email,
                        'type' => $participant->type,
                    ],
                    'activity' => [
                        'id' => $activity->id,
                        'name' => $activity->name,
                        'type' => $activity->type,
                        'start_date' => $activity->start_date,
                        'end_date' => $activity->end_date,
                        'location' => $activity->location,
                    ],
                    'qr_code' => [
                        'id' => $qrCode->id,
                        'status' => $qrCode->status,
                        'expires_at' => $qrCode->expires_at,
                    ],
                    'can_register' => !$existingAttendance,
                    'existing_attendance' => $existingAttendance ? $existingAttendance->getSummary() : null
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error validating QR code', [
                'qr_data' => $request->qr_data,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }

    /**
     * Check-out usando código QR
     */
    public function checkOut(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'qr_data' => 'required|string',
            'scanner_id' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Validar el QR code
            $validation = $this->qrCodeService->validateQrCode($request->qr_data);

            if (!$validation['valid']) {
                return response()->json([
                    'success' => false,
                    'message' => $validation['error'],
                    'error_type' => $this->getErrorType($validation['error'])
                ], 400);
            }

            $participant = $validation['participant'];
            $activity = $validation['activity'];

            // Buscar la asistencia más reciente sin check-out
            $attendance = Attendance::where('participant_id', $participant->id)
                ->where('activity_id', $activity->id)
                ->whereNull('check_out_time')
                ->whereDate('actual_check_in', today())
                ->first();

            if (!$attendance) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se encontró una asistencia activa para hacer check-out'
                ], 404);
            }

            // Actualizar check-out
            $attendance->update([
                'check_out_time' => now(),
            ]);

            Log::info('Check-out registered via QR', [
                'attendance_id' => $attendance->id,
                'participant_id' => $participant->id,
                'activity_id' => $activity->id,
                'check_out_time' => $attendance->check_out_time
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Check-out realizado exitosamente',
                'data' => [
                    'attendance' => $attendance->getSummary(),
                    'participant' => [
                        'id' => $participant->id,
                        'name' => $participant->first_name . ' ' . $participant->last_name,
                        'email' => $participant->email,
                    ],
                    'activity' => [
                        'id' => $activity->id,
                        'name' => $activity->name,
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error registering check-out via QR', [
                'qr_data' => $request->qr_data,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor'
            ], 500);
        }
    }

    /**
     * Verificar si un participante está registrado en una actividad
     */
    private function isParticipantRegisteredInActivity(Participant $participant, int $activityId): bool
    {
        // Verificar en activity_registrations (tabla principal)
        $isRegisteredInMain = ActivityRegistration::where('participant_id', $participant->id)
            ->where('activity_id', $activityId)
            ->whereIn('status', ['registered', 'confirmed'])
            ->exists();
        
        // Verificar en activity_participant (tabla pivot)
        $isRegisteredInPivot = $participant->activities()->where('activity_id', $activityId)->exists();
        
        return $isRegisteredInMain || $isRegisteredInPivot;
    }

    /**
     * Obtener tipo de error para clasificación en frontend
     */
    private function getErrorType(string $error): string
    {
        if (strpos($error, 'already used') !== false) {
            return 'already_used';
        }
        if (strpos($error, 'expired') !== false) {
            return 'expired';
        }
        if (strpos($error, 'not started') !== false) {
            return 'not_started';
        }
        if (strpos($error, 'ended') !== false) {
            return 'ended';
        }
        if (strpos($error, 'Invalid QR') !== false) {
            return 'invalid_format';
        }
        
        return 'unknown';
    }

    /**
     * Registrar asistencia usando datos del QR (seguro)
     */
    public function checkInByEmail(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'qr_data' => 'required|string',
            'activity_id' => 'nullable|exists:activities,id',
            'type' => 'nullable|in:general,activity',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Datos de validación incorrectos',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Intentar decodificar datos del QR
            $qrData = json_decode($request->qr_data, true);
            
            if (!$qrData || !isset($qrData['participant_id'], $qrData['email'], $qrData['token'])) {
                // Fallback: tratar como email simple (compatibilidad)
                return $this->checkInByEmailLegacy($request);
            }

            // Buscar participante por ID
            $participant = Participant::find($qrData['participant_id']);

            if (!$participant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Participante no encontrado'
                ], 404);
            }

            // Validar token del QR
            if (!$participant->validateQrToken($qrData['token'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'QR code inválido o manipulado'
                ], 403);
            }

            // Validar timestamp (QR válido por 24 horas)
            if (time() - $qrData['timestamp'] > 86400) {
                return response()->json([
                    'success' => false,
                    'message' => 'QR code expirado. Por favor, genera uno nuevo.'
                ], 403);
            }

            if (!$participant->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Participante inactivo'
                ], 403);
            }

            // Determinar el tipo de asistencia
            $type = $request->type ?? 'general';
            $activityId = $request->activity_id;

            // Si es asistencia a actividad, verificar que esté registrado
            if ($type === 'activity' && $activityId) {
                $activity = Activity::find($activityId);
                
                if (!$activity) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Actividad no encontrada'
                    ], 404);
                }

                // Verificar si el participante está registrado en la actividad
                if (!$this->isParticipantRegisteredInActivity($participant, $activityId)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'El participante no está registrado en esta actividad'
                    ], 403);
                }

                // Verificar si ya tiene asistencia registrada hoy para esta actividad
                $existingAttendance = Attendance::where('participant_id', $participant->id)
                    ->where('activity_id', $activityId)
                    ->whereDate('check_in_time', today())
                    ->first();

                if ($existingAttendance) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Ya tienes asistencia registrada para esta actividad hoy',
                        'data' => [
                            'attendance' => $existingAttendance
                        ]
                    ], 409);
                }
            } else {
                // Para asistencia general, usar la primera actividad disponible o null
                $activityId = $activityId ?? Activity::where('is_active', true)->first()?->id;
                
                if (!$activityId) {
                    return response()->json([
                        'success' => false,
                        'message' => 'No hay actividades disponibles para registrar asistencia'
                    ], 404);
                }

                // Verificar duplicados para asistencia general
                $existingGeneralAttendance = Attendance::where('participant_id', $participant->id)
                    ->where('activity_id', $activityId)
                    ->where('type', 'general')
                    ->whereDate('check_in_time', today())
                    ->first();

                Log::info('Checking for general attendance duplicates', [
                    'participant_id' => $participant->id,
                    'activity_id' => $activityId,
                    'existing_count' => $existingGeneralAttendance ? 1 : 0
                ]);

                if ($existingGeneralAttendance) {
                    Log::info('Duplicate general attendance found', [
                        'existing_id' => $existingGeneralAttendance->id,
                        'check_in_time' => $existingGeneralAttendance->check_in_time
                    ]);
                    
                    return response()->json([
                        'success' => false,
                        'message' => 'Ya tienes asistencia general registrada hoy',
                        'data' => [
                            'attendance' => $existingGeneralAttendance,
                            'check_in_time' => $existingGeneralAttendance->check_in_time
                        ]
                    ], 409);
                }
            }

            // Crear registro de asistencia
            $attendance = Attendance::create([
                'participant_id' => $participant->id,
                'activity_id' => $activityId,
                'check_in_time' => now(),
                'type' => $type,
                'notes' => 'Check-in via QR code (email)',
            ]);

            $attendance->load(['participant', 'activity']);

            Log::info('Attendance registered via email QR', [
                'attendance_id' => $attendance->id,
                'participant_id' => $participant->id,
                'email' => $participant->email,
                'activity_id' => $activityId,
                'type' => $type
            ]);

            return response()->json([
                'success' => true,
                'message' => '¡Asistencia registrada exitosamente!',
                'data' => [
                    'attendance' => $attendance,
                    'participant' => [
                        'id' => $participant->id,
                        'name' => $participant->first_name . ' ' . $participant->last_name,
                        'email' => $participant->email,
                        'type' => $participant->type,
                    ],
                    'activity' => $attendance->activity ? [
                        'id' => $attendance->activity->id,
                        'name' => $attendance->activity->name,
                        'type' => $attendance->activity->type,
                        'location' => $attendance->activity->location,
                    ] : null
                ]
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error registering attendance via QR', [
                'qr_data' => $request->qr_data,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Método de compatibilidad para QR con solo email (legacy)
     */
    private function checkInByEmailLegacy(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'qr_data' => 'required|email',
            'activity_id' => 'nullable|exists:activities,id',
            'type' => 'nullable|in:general,activity',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Email inválido en el código QR',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Buscar participante por email
            $participant = Participant::where('email', $request->qr_data)->first();

            if (!$participant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Participante no encontrado con ese email'
                ], 404);
            }

            if (!$participant->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Participante inactivo'
                ], 403);
            }

            // Determinar el tipo de asistencia
            $type = $request->type ?? 'general';
            $activityId = $request->activity_id;

            // Si es asistencia a actividad, verificar que esté registrado
            if ($type === 'activity' && $activityId) {
                $activity = Activity::find($activityId);
                
                if (!$activity) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Actividad no encontrada'
                    ], 404);
                }

                // Verificar si el participante está registrado en la actividad
                if (!$this->isParticipantRegisteredInActivity($participant, $activityId)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'El participante no está registrado en esta actividad'
                    ], 403);
                }

                // Verificar si ya tiene asistencia registrada hoy para esta actividad
                $existingAttendance = Attendance::where('participant_id', $participant->id)
                    ->where('activity_id', $activityId)
                    ->whereDate('check_in_time', today())
                    ->first();

                if ($existingAttendance) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Ya tienes asistencia registrada para esta actividad hoy',
                        'data' => [
                            'attendance' => $existingAttendance
                        ]
                    ], 409);
                }
            } else {
                // Para asistencia general, usar la primera actividad disponible o null
                $activityId = $activityId ?? Activity::where('is_active', true)->first()?->id;
                
                if (!$activityId) {
                    return response()->json([
                        'success' => false,
                        'message' => 'No hay actividades disponibles para registrar asistencia'
                    ], 404);
                }

                // Verificar duplicados para asistencia general
                $existingGeneralAttendance = Attendance::where('participant_id', $participant->id)
                    ->where('activity_id', $activityId)
                    ->where('type', 'general')
                    ->whereDate('check_in_time', today())
                    ->first();

                Log::info('Checking for general attendance duplicates', [
                    'participant_id' => $participant->id,
                    'activity_id' => $activityId,
                    'existing_count' => $existingGeneralAttendance ? 1 : 0
                ]);

                if ($existingGeneralAttendance) {
                    Log::info('Duplicate general attendance found', [
                        'existing_id' => $existingGeneralAttendance->id,
                        'check_in_time' => $existingGeneralAttendance->check_in_time
                    ]);
                    
                    return response()->json([
                        'success' => false,
                        'message' => 'Ya tienes asistencia general registrada hoy',
                        'data' => [
                            'attendance' => $existingGeneralAttendance,
                            'check_in_time' => $existingGeneralAttendance->check_in_time
                        ]
                    ], 409);
                }
            }

            // Crear registro de asistencia
            $attendance = Attendance::create([
                'participant_id' => $participant->id,
                'activity_id' => $activityId,
                'check_in_time' => now(),
                'type' => $type,
                'notes' => 'Check-in via QR code (email)',
            ]);

            $attendance->load(['participant', 'activity']);

            Log::info('Attendance registered via email QR (legacy)', [
                'attendance_id' => $attendance->id,
                'participant_id' => $participant->id,
                'email' => $participant->email,
                'activity_id' => $activityId,
                'type' => $type
            ]);

            return response()->json([
                'success' => true,
                'message' => '¡Asistencia registrada exitosamente!',
                'data' => [
                    'attendance' => $attendance,
                    'participant' => [
                        'id' => $participant->id,
                        'name' => $participant->first_name . ' ' . $participant->last_name,
                        'email' => $participant->email,
                        'type' => $participant->type,
                    ],
                    'activity' => $attendance->activity ? [
                        'id' => $attendance->activity->id,
                        'name' => $attendance->activity->name,
                        'type' => $attendance->activity->type,
                        'location' => $attendance->activity->location,
                    ] : null
                ]
            ], 201);

        } catch (\Exception $e) {
            Log::error('Error registering attendance via email QR (legacy)', [
                'email' => $request->qr_data,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generar reporte de asistencias
     */
    public function report(Request $request): JsonResponse
    {
        $query = Attendance::with(['participant', 'activity']);

        // Filtrar por actividad
        if ($request->has('activity_id')) {
            $query->where('activity_id', $request->activity_id);
        }

        // Filtrar por tipo
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filtrar por rango de fechas
        if ($request->has('date_from')) {
            $query->whereDate('actual_check_in', '>=', $request->date_from);
        }

        if ($request->has('date_to')) {
            $query->whereDate('actual_check_in', '<=', $request->date_to);
        }

        $attendances = $query->get();

        $stats = [
            'total_attendances' => $attendances->count(),
            'general_attendances' => $attendances->where('type', 'general')->count(),
            'activity_attendances' => $attendances->where('type', 'activity')->count(),
            'unique_participants' => $attendances->pluck('participant_id')->unique()->count(),
            'attendances_today' => $attendances->where('actual_check_in', '>=', today())->count(),
            'present_count' => $attendances->where('attendance_status', 'present')->count(),
            'late_count' => $attendances->where('attendance_status', 'late')->count(),
            'qr_scanned_count' => $attendances->where('check_in_method', 'qr_scan')->count(),
            'manual_count' => $attendances->where('check_in_method', 'manual')->count(),
        ];

        // Agrupar por actividad
        $byActivity = $attendances->groupBy('activity_id')->map(function ($group) {
            return [
                'activity' => $group->first()->activity,
                'total_attendances' => $group->count(),
                'unique_participants' => $group->pluck('participant_id')->unique()->count(),
            ];
        });

        return response()->json([
            'message' => 'Reporte de asistencias generado exitosamente',
            'data' => [
                'attendances' => $attendances,
                'statistics' => $stats,
                'by_activity' => $byActivity,
            ],
        ]);
    }
}
