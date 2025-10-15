<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\QrCodeService;
use App\Models\AttendanceQrCode;
use App\Models\Activity;
use App\Models\ActivityRegistration;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class QrCodeController extends Controller
{
    protected QrCodeService $qrCodeService;

    public function __construct(QrCodeService $qrCodeService)
    {
        $this->qrCodeService = $qrCodeService;
    }

    /**
     * Generar QR code para una inscripción específica
     */
    public function generateForRegistration(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'registration_id' => 'required|exists:activity_registrations,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $registration = ActivityRegistration::findOrFail($request->registration_id);
            $qrCode = $this->qrCodeService->generateForRegistration($registration);

            if (!$qrCode) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to generate QR code. Registration may not be confirmed or activity may have ended.'
                ], 400);
            }

            return response()->json([
                'success' => true,
                'message' => 'QR code generated successfully',
                'data' => [
                    'qr_code' => [
                        'id' => $qrCode->id,
                        'qr_code_image_url' => $qrCode->qr_code_image_url,
                        'status' => $qrCode->status,
                        'expires_at' => $qrCode->expires_at,
                        'participant' => [
                            'id' => $qrCode->participant->id,
                            'name' => $qrCode->participant->first_name . ' ' . $qrCode->participant->last_name,
                            'email' => $qrCode->participant->email,
                        ],
                        'activity' => [
                            'id' => $qrCode->activity->id,
                            'name' => $qrCode->activity->name,
                            'start_date' => $qrCode->activity->start_date,
                            'end_date' => $qrCode->activity->end_date,
                        ]
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error generating QR code via API', [
                'registration_id' => $request->registration_id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Generar QR codes para todas las inscripciones de una actividad
     */
    public function generateForActivity(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'activity_id' => 'required|exists:activities,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $activity = Activity::findOrFail($request->activity_id);
            $results = $this->qrCodeService->generateForActivity($activity);

            return response()->json([
                'success' => true,
                'message' => 'QR code generation completed',
                'data' => [
                    'activity' => [
                        'id' => $activity->id,
                        'name' => $activity->name,
                    ],
                    'results' => $results
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error generating QR codes for activity via API', [
                'activity_id' => $request->activity_id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtener QR code por ID
     */
    public function show(int $id): JsonResponse
    {
        try {
            $qrCode = AttendanceQrCode::with(['participant', 'activity', 'registration'])
                ->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => [
                    'qr_code' => [
                        'id' => $qrCode->id,
                        'qr_code_image_url' => $qrCode->qr_code_image_url,
                        'status' => $qrCode->status,
                        'generated_at' => $qrCode->generated_at,
                        'expires_at' => $qrCode->expires_at,
                        'used_at' => $qrCode->used_at,
                        'participant' => [
                            'id' => $qrCode->participant->id,
                            'name' => $qrCode->participant->first_name . ' ' . $qrCode->participant->last_name,
                            'email' => $qrCode->participant->email,
                            'type' => $qrCode->participant->type,
                        ],
                        'activity' => [
                            'id' => $qrCode->activity->id,
                            'name' => $qrCode->activity->name,
                            'type' => $qrCode->activity->type,
                            'start_date' => $qrCode->activity->start_date,
                            'end_date' => $qrCode->activity->end_date,
                            'location' => $qrCode->activity->location,
                        ],
                        'registration' => [
                            'id' => $qrCode->registration->id,
                            'status' => $qrCode->registration->status,
                            'registered_at' => $qrCode->registration->registered_at,
                        ]
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'QR code not found'
            ], 404);
        }
    }

    /**
     * Obtener estadísticas de QR codes para una actividad
     */
    public function getActivityStats(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'activity_id' => 'required|exists:activities,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $activity = Activity::findOrFail($request->activity_id);
            $stats = $this->qrCodeService->getActivityQrStats($activity);

            return response()->json([
                'success' => true,
                'data' => [
                    'stats' => $stats
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error getting QR stats via API', [
                'activity_id' => $request->activity_id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Regenerar QR code existente
     */
    public function regenerate(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'qr_code_id' => 'required|exists:attendance_qr_codes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $qrCode = AttendanceQrCode::findOrFail($request->qr_code_id);
            $newQrCode = $this->qrCodeService->regenerateQrCode($qrCode);

            if (!$newQrCode) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to regenerate QR code'
                ], 400);
            }

            return response()->json([
                'success' => true,
                'message' => 'QR code regenerated successfully',
                'data' => [
                    'old_qr_code_id' => $qrCode->id,
                    'new_qr_code' => [
                        'id' => $newQrCode->id,
                        'qr_code_image_url' => $newQrCode->qr_code_image_url,
                        'status' => $newQrCode->status,
                        'expires_at' => $newQrCode->expires_at,
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error regenerating QR code via API', [
                'qr_code_id' => $request->qr_code_id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Limpiar QR codes expirados
     */
    public function cleanupExpired(): JsonResponse
    {
        try {
            $result = $this->qrCodeService->cleanupExpiredQrCodes();

            return response()->json([
                'success' => $result['success'],
                'message' => $result['success'] 
                    ? "Cleaned up {$result['updated_count']} expired QR codes"
                    : "Error: {$result['error']}",
                'data' => $result
            ]);

        } catch (\Exception $e) {
            Log::error('Error cleaning up expired QR codes via API', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Obtener QR codes de un participante
     */
    public function getParticipantQrCodes(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'participant_id' => 'required|exists:participants,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $qrCodes = AttendanceQrCode::where('participant_id', $request->participant_id)
                ->with(['activity', 'registration'])
                ->orderBy('created_at', 'desc')
                ->get();

            $data = $qrCodes->map(function ($qrCode) {
                return [
                    'id' => $qrCode->id,
                    'qr_code_image_url' => $qrCode->qr_code_image_url,
                    'status' => $qrCode->status,
                    'generated_at' => $qrCode->generated_at,
                    'expires_at' => $qrCode->expires_at,
                    'used_at' => $qrCode->used_at,
                    'activity' => [
                        'id' => $qrCode->activity->id,
                        'name' => $qrCode->activity->name,
                        'type' => $qrCode->activity->type,
                        'start_date' => $qrCode->activity->start_date,
                        'end_date' => $qrCode->activity->end_date,
                        'location' => $qrCode->activity->location,
                    ],
                    'registration' => [
                        'id' => $qrCode->registration->id,
                        'status' => $qrCode->registration->status,
                    ]
                ];
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'qr_codes' => $data
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Error getting participant QR codes via API', [
                'participant_id' => $request->participant_id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Internal server error'
            ], 500);
        }
    }
}