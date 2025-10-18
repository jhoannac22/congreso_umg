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

            return response()->json([
                'success' => true,
                'message' => 'Código QR válido',
                    'participant' => [
                        'id' => $participant->id,
                        'name' => $participant->first_name . ' ' . $participant->last_name,
                        'email' => $participant->email,
                        'type' => $participant->type,
                    'school' => $participant->school,
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

    /**
     * Registrar asistencia por email o código QR
     */
    public function checkInByEmail(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'nullable|email',
            'qr_data' => 'nullable|string',
            'activity_id' => 'nullable|exists:activities,id'
        ]);

        try {
            $participant = null;

            // Si se envía email, buscar por email
            if ($request->has('email') && $request->email) {
                $participant = Participant::where('email', $request->email)->first();
            }
            // Si se envía qr_data, validar y buscar participante
            elseif ($request->has('qr_data') && $request->qr_data) {
                $validation = $this->qrCodeService->validateCongressAttendanceQr($request->qr_data);
                
                if (!$validation['valid']) {
                    return response()->json([
                        'success' => false,
                        'message' => $validation['error']
                    ], 400);
                }
                
                $participant = $validation['participant'];
            }
            // Si no se envía ni email ni qr_data
            else {
                return response()->json([
                    'success' => false,
                    'message' => 'Se requiere email o código QR'
                ], 400);
            }

            if (!$participant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Participante no encontrado'
                ], 404);
            }

            // Verificar si ya tiene asistencia registrada hoy
            $today = now()->startOfDay();
            $existingAttendance = Attendance::where('participant_id', $participant->id)
                ->where('check_in_time', '>=', $today)
                ->first();

            if ($existingAttendance) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ya se registró la asistencia para este participante hoy'
                ], 400);
            }

            // Crear registro de asistencia
            $attendance = Attendance::create([
                'participant_id' => $participant->id,
                'activity_id' => $request->activity_id,
                'check_in_time' => now(),
                'check_out_time' => null,
                'type' => $request->activity_id ? 'activity' : 'general'
            ]);

            Log::info('Attendance registered by email', [
                'participant_id' => $participant->id,
                'email' => $participant->email,
                'activity_id' => $request->activity_id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Asistencia registrada exitosamente',
                'attendance' => [
                    'id' => $attendance->id,
                    'participant_name' => $participant->first_name . ' ' . $participant->last_name,
                    'email' => $participant->email,
                    'check_in_time' => $attendance->check_in_time->format('Y-m-d H:i:s'),
                    'activity_id' => $attendance->activity_id
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error registering attendance by email', [
                'email' => $request->email,
                'activity_id' => $request->activity_id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al registrar asistencia'
            ], 500);
        }
    }

    /**
     * Registrar asistencia por código QR
     */
    public function checkInByQr(Request $request): JsonResponse
    {
        $request->validate([
            'qr_data' => 'required|string',
            'activity_id' => 'nullable|exists:activities,id'
        ]);

        try {
            // Validar código QR
            $validation = $this->qrCodeService->validateCongressAttendanceQr($request->qr_data);

            if (!$validation['valid']) {
                return response()->json([
                    'success' => false,
                    'message' => $validation['error']
                ], 400);
            }

            $participant = $validation['participant'];

            // Verificar si ya tiene asistencia registrada hoy
            $today = now()->startOfDay();
            $existingAttendance = Attendance::where('participant_id', $participant->id)
                ->where('check_in_time', '>=', $today)
                ->first();

            if ($existingAttendance) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ya se registró la asistencia para este participante hoy'
                ], 400);
            }

            // Crear registro de asistencia
            $attendance = Attendance::create([
                'participant_id' => $participant->id,
                'activity_id' => $request->activity_id,
                'check_in_time' => now(),
                'check_out_time' => null,
                'type' => $request->activity_id ? 'activity' : 'general'
            ]);

            Log::info('Attendance registered by QR', [
                'participant_id' => $participant->id,
                'qr_data' => $request->qr_data,
                'activity_id' => $request->activity_id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Asistencia registrada exitosamente',
                'attendance' => [
                    'id' => $attendance->id,
                    'participant_name' => $participant->first_name . ' ' . $participant->last_name,
                    'email' => $participant->email,
                    'check_in_time' => $attendance->check_in_time->format('Y-m-d H:i:s'),
                    'activity_id' => $attendance->activity_id
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error registering attendance by QR', [
                'qr_data' => $request->qr_data,
                'activity_id' => $request->activity_id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al registrar asistencia'
            ], 500);
        }
    }

    /**
     * Obtener reporte de asistencia
     */
    public function report(Request $request): JsonResponse
    {
        try {
            $query = Attendance::with(['participant', 'activity']);

            // Filtros opcionales
            if ($request->has('date_from')) {
                $query->where('check_in_time', '>=', $request->date_from);
            }

            if ($request->has('date_to')) {
                $query->where('check_in_time', '<=', $request->date_to);
            }

            if ($request->has('activity_id')) {
                $query->where('activity_id', $request->activity_id);
            }

            $attendances = $query->orderBy('check_in_time', 'desc')->get();

            return response()->json([
                'success' => true,
                'data' => $attendances,
                'total' => $attendances->count()
            ]);

        } catch (\Exception $e) {
            Log::error('Error generating attendance report', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al generar reporte de asistencia'
            ], 500);
        }
    }
    
    /**
     * Obtener estadísticas simples de asistencia
     */
    public function getStats(Request $request): JsonResponse
    {
        try {
            // Total de asistencias
            $total = Attendance::count();
            
            // Asistencias de hoy
            $today = Attendance::whereDate('check_in_time', today())->count();
            
            // Asistencias por tipo
            $byType = [
                'general' => Attendance::where('type', 'general')->count(),
                'activity' => Attendance::where('type', 'activity')->count(),
            ];
            
            // Asistencias por actividad
            $byActivity = Attendance::with('activity')
                ->whereNotNull('activity_id')
                ->get()
                ->groupBy('activity_id')
                ->map(function ($group) {
                    return [
                        'activity' => $group->first()->activity->name ?? 'Sin actividad',
                        'count' => $group->count()
                    ];
                })
                ->values();
            
            // Últimas asistencias
            $recent = Attendance::with(['participant', 'activity'])
                ->orderBy('check_in_time', 'desc')
                ->limit(10)
                ->get();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'total' => $total,
                    'today' => $today,
                    'by_type' => $byType,
                    'by_activity' => $byActivity,
                    'recent' => $recent
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error getting attendance stats', [
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener estadísticas'
            ], 500);
        }
    }
    
    /**
     * Exportar reporte de asistencia a Excel
     */
    public function exportExcel(Request $request): JsonResponse
    {
        try {
            $query = Attendance::with(['participant', 'activity']);
            
            // Aplicar filtros
            if ($request->has('date_from')) {
                $query->where('check_in_time', '>=', $request->date_from);
            }
            if ($request->has('date_to')) {
                $query->where('check_in_time', '<=', $request->date_to);
            }
            if ($request->has('activity_id')) {
                $query->where('activity_id', $request->activity_id);
            }
            
            $attendances = $query->orderBy('check_in_time', 'desc')->get();
            
            // Preparar datos para CSV (compatible con Excel)
            $csvData = [];
            $csvData[] = ['ID', 'Participante', 'Email', 'Tipo', 'Actividad', 'Fecha y Hora', 'Tipo de Participante'];
            
            foreach ($attendances as $attendance) {
                $csvData[] = [
                    $attendance->id,
                    ($attendance->participant->first_name ?? '') . ' ' . ($attendance->participant->last_name ?? ''),
                    $attendance->participant->email ?? '',
                    $attendance->type,
                    $attendance->activity->name ?? 'Asistencia General',
                    $attendance->check_in_time->format('Y-m-d H:i:s'),
                    $attendance->participant->type ?? ''
                ];
            }
            
            return response()->json([
                'success' => true,
                'data' => $csvData,
                'filename' => 'asistencias_' . date('Y-m-d') . '.csv'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error exporting attendance to Excel', [
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error al exportar reporte'
            ], 500);
        }
    }
}