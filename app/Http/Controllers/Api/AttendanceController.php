<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Attendance;
use App\Models\Participant;
use App\Models\AttendanceQrCode;
use App\Models\QrScanner;
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
