<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Participant;
use App\Models\AttendanceQrCode;
use App\Models\QrScanner;
use App\Models\ActivityRegistration;
use App\Services\QRCodeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AttendanceController extends Controller
{
    protected QRCodeService $qrCodeService;

    public function __construct(QRCodeService $qrCodeService)
    {
        $this->qrCodeService = $qrCodeService;
    }

    /**
     * Registrar asistencia mediante código QR
     */
    public function registerAttendance(Request $request): JsonResponse
    {
        $request->validate([
            'qr_data' => 'required|string',
            'scanned_by' => 'nullable|string|max:255', // Quien escaneó el código
            'location' => 'nullable|string|max:255', // Ubicación del escaneo
        ]);

        try {
            // Validar el código QR
            $validation = $this->qrCodeService->validateCongressAttendanceQr($request->qr_data);

            if (!$validation['valid']) {
                return response()->json([
                    'success' => false,
                    'message' => $validation['error'],
                    'participant' => null
                ], 400);
            }

            $participant = $validation['participant'];

            // Verificar si ya se registró la asistencia
            $existingAttendance = Attendance::where('participant_id', $participant->id)
                ->where('event_type', 'congress')
                ->whereDate('created_at', today())
                ->first();

            if ($existingAttendance) {
                return response()->json([
                    'success' => false,
                    'message' => 'La asistencia ya fue registrada para este participante hoy',
                    'participant' => $participant,
                    'attendance' => $existingAttendance
                ], 409);
            }

            // Registrar la asistencia
            $attendance = Attendance::create([
                'participant_id' => $participant->id,
                'event_type' => 'congress',
                'scanned_by' => $request->scanned_by ?? 'system',
                'location' => $request->location ?? 'entrada_principal',
                'qr_data' => $request->qr_data,
                'status' => 'confirmed',
                'notes' => 'Asistencia registrada mediante código QR del congreso'
            ]);

            Log::info('Congress attendance registered via QR code', [
                'participant_id' => $participant->id,
                'attendance_id' => $attendance->id,
                'scanned_by' => $request->scanned_by,
                'location' => $request->location
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Asistencia registrada exitosamente',
                'participant' => $participant,
                'attendance' => $attendance,
                'timestamp' => $attendance->created_at->format('Y-m-d H:i:s')
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error registering congress attendance', [
                'qr_data' => $request->qr_data,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor al registrar asistencia',
                'participant' => null
            ], 500);
        }
    }

    /**
     * Obtener estadísticas de asistencia del congreso
     */
    public function getAttendanceStats(): JsonResponse
    {
        try {
            $today = today();
            
            $totalParticipants = Participant::where('is_active', true)->count();
            $attendedToday = Attendance::where('event_type', 'congress')
                ->whereDate('created_at', $today)
                ->count();
            
            $attendanceRate = $totalParticipants > 0 ? round(($attendedToday / $totalParticipants) * 100, 2) : 0;

            // Estadísticas por tipo de participante
            $internalAttended = Attendance::where('event_type', 'congress')
                ->whereDate('created_at', $today)
                ->whereHas('participant', function($query) {
                    $query->where('type', 'interno');
                })
                ->count();

            $externalAttended = Attendance::where('event_type', 'congress')
                ->whereDate('created_at', $today)
                ->whereHas('participant', function($query) {
                    $query->where('type', 'externo');
                })
                ->count();

            // Asistencias por hora
            $attendanceByHour = Attendance::where('event_type', 'congress')
                ->whereDate('created_at', $today)
                ->selectRaw('HOUR(created_at) as hour, COUNT(*) as count')
                ->groupBy('hour')
                ->orderBy('hour')
                ->get();

            return response()->json([
                'success' => true,
                'stats' => [
                    'date' => $today->format('Y-m-d'),
                    'total_participants' => $totalParticipants,
                    'attended_today' => $attendedToday,
                    'attendance_rate' => $attendanceRate,
                    'by_type' => [
                        'internal' => $internalAttended,
                        'external' => $externalAttended
                    ],
                    'by_hour' => $attendanceByHour
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error getting attendance stats', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al obtener estadísticas de asistencia'
            ], 500);
        }
    }

    /**
     * Obtener lista de participantes que asistieron
     */
    public function getAttendees(Request $request): JsonResponse
    {
        try {
            $date = $request->get('date', today()->format('Y-m-d'));
            
            $attendances = Attendance::where('event_type', 'congress')
                ->whereDate('created_at', $date)
                ->with(['participant' => function($query) {
                    $query->select('id', 'first_name', 'last_name', 'email', 'type', 'school');
                }])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'date' => $date,
                'total_attendees' => $attendances->count(),
                'attendees' => $attendances
            ]);

        } catch (\Exception $e) {
            Log::error('Error getting attendees list', [
                'date' => $request->get('date'),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al obtener lista de asistentes'
            ], 500);
        }
    }

    /**
     * Validar código QR sin registrar asistencia
     */
    public function validateQrCode(Request $request): JsonResponse
    {
        $request->validate([
            'qr_data' => 'required|string'
        ]);

        try {
            $validation = $this->qrCodeService->validateCongressAttendanceQr($request->qr_data);

            if (!$validation['valid']) {
                return response()->json([
                    'success' => false,
                    'message' => $validation['error'],
                    'participant' => null
                ], 400);
            }

            $participant = $validation['participant'];

            // Verificar si ya asistió hoy
            $alreadyAttended = Attendance::where('participant_id', $participant->id)
                ->where('event_type', 'congress')
                ->whereDate('created_at', today())
                ->exists();

            return response()->json([
                'success' => true,
                'message' => 'Código QR válido',
                    'participant' => [
                        'id' => $participant->id,
                        'name' => $participant->first_name . ' ' . $participant->last_name,
                        'email' => $participant->email,
                    'type' => $participant->type,
                    'school' => $participant->school,
                    'already_attended' => $alreadyAttended
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error validating QR code', [
                'qr_data' => $request->qr_data,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al validar código QR'
            ], 500);
        }
    }
<<<<<<< Updated upstream

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
=======
}
>>>>>>> Stashed changes
