<?php

namespace App\Services;

use App\Models\ActivityRegistration;
use App\Models\AttendanceQrCode;
use App\Models\Participant;
use App\Models\Activity;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class QrCodeService
{
    /**
     * Generar QR code para una inscripción específica
     */
    public function generateForRegistration(ActivityRegistration $registration): ?AttendanceQrCode
    {
        try {
            // Verificar que la inscripción esté confirmada
            if (!$registration->isConfirmed()) {
                Log::warning('Attempted to generate QR code for unconfirmed registration', [
                    'registration_id' => $registration->id,
                    'status' => $registration->status
                ]);
                return null;
            }

            // Verificar si ya existe un QR code
            if ($registration->attendanceQrCode) {
                Log::info('QR code already exists for registration', [
                    'registration_id' => $registration->id,
                    'qr_code_id' => $registration->attendanceQrCode->id
                ]);
                return $registration->attendanceQrCode;
            }

            // Verificar que la actividad no haya terminado
            $activity = $registration->activity;
            if (Carbon::parse($activity->end_date)->isPast()) {
                Log::warning('Cannot generate QR code for past activity', [
                    'activity_id' => $activity->id,
                    'end_date' => $activity->end_date
                ]);
                return null;
            }

            // Crear el QR code
            $qrCode = AttendanceQrCode::createForRegistration($registration);

            Log::info('QR code generated successfully', [
                'registration_id' => $registration->id,
                'participant_id' => $registration->participant_id,
                'activity_id' => $registration->activity_id,
                'qr_code_id' => $qrCode->id
            ]);

            return $qrCode;

        } catch (\Exception $e) {
            Log::error('Error generating QR code for registration', [
                'registration_id' => $registration->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return null;
        }
    }

    /**
     * Generar QR codes para todas las inscripciones confirmadas de una actividad
     */
    public function generateForActivity(Activity $activity): array
    {
        $results = [
            'generated' => 0,
            'skipped' => 0,
            'errors' => 0,
            'details' => []
        ];

        try {
            $registrations = $activity->registrations()
                ->where('status', 'confirmed')
                ->with(['participant', 'attendanceQrCode'])
                ->get();

            foreach ($registrations as $registration) {
                if ($registration->attendanceQrCode) {
                    $results['skipped']++;
                    $results['details'][] = [
                        'participant' => $registration->participant->first_name . ' ' . $registration->participant->last_name,
                        'status' => 'already_exists'
                    ];
                    continue;
                }

                $qrCode = $this->generateForRegistration($registration);
                
                if ($qrCode) {
                    $results['generated']++;
                    $results['details'][] = [
                        'participant' => $registration->participant->first_name . ' ' . $registration->participant->last_name,
                        'status' => 'generated',
                        'qr_code_id' => $qrCode->id
                    ];
                } else {
                    $results['errors']++;
                    $results['details'][] = [
                        'participant' => $registration->participant->first_name . ' ' . $registration->participant->last_name,
                        'status' => 'error'
                    ];
                }
            }

            Log::info('Bulk QR code generation completed', [
                'activity_id' => $activity->id,
                'results' => $results
            ]);

        } catch (\Exception $e) {
            Log::error('Error in bulk QR code generation', [
                'activity_id' => $activity->id,
                'error' => $e->getMessage()
            ]);
            $results['errors']++;
        }

        return $results;
    }

    /**
     * Regenerar QR code existente (útil si se necesita actualizar)
     */
    public function regenerateQrCode(AttendanceQrCode $qrCode): ?AttendanceQrCode
    {
        try {
            // Marcar el QR anterior como cancelado
            $qrCode->update(['status' => 'cancelled']);

            // Obtener la inscripción
            $registration = $qrCode->registration;

            // Generar nuevo QR code
            $newQrCode = $this->generateForRegistration($registration);

            Log::info('QR code regenerated', [
                'old_qr_code_id' => $qrCode->id,
                'new_qr_code_id' => $newQrCode?->id,
                'registration_id' => $registration->id
            ]);

            return $newQrCode;

        } catch (\Exception $e) {
            Log::error('Error regenerating QR code', [
                'qr_code_id' => $qrCode->id,
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }

    /**
     * Validar QR code desde datos escaneados
     */
    public function validateQrCode(string $qrDataString): array
    {
        try {
            $qrCode = AttendanceQrCode::validateFromScan($qrDataString);

            if (!$qrCode) {
                return [
                    'valid' => false,
                    'error' => 'Invalid QR code format or data',
                    'qr_code' => null
                ];
            }

            // Verificar si ya fue usado
            if ($qrCode->isUsed()) {
                return [
                    'valid' => false,
                    'error' => 'QR code already used',
                    'qr_code' => $qrCode,
                    'used_at' => $qrCode->used_at
                ];
            }

            // Verificar si está expirado
            if ($qrCode->isExpired()) {
                return [
                    'valid' => false,
                    'error' => 'QR code expired',
                    'qr_code' => $qrCode,
                    'expired_at' => $qrCode->expires_at
                ];
            }

            // Verificar si la actividad aún está activa
            $activity = $qrCode->activity;
            if (Carbon::parse($activity->start_date)->isFuture()) {
                return [
                    'valid' => false,
                    'error' => 'Activity has not started yet',
                    'qr_code' => $qrCode,
                    'activity_start' => $activity->start_date
                ];
            }

            if (Carbon::parse($activity->end_date)->isPast()) {
                return [
                    'valid' => false,
                    'error' => 'Activity has already ended',
                    'qr_code' => $qrCode,
                    'activity_end' => $activity->end_date
                ];
            }

            return [
                'valid' => true,
                'error' => null,
                'qr_code' => $qrCode,
                'participant' => $qrCode->participant,
                'activity' => $qrCode->activity
            ];

        } catch (\Exception $e) {
            Log::error('Error validating QR code', [
                'qr_data' => $qrDataString,
                'error' => $e->getMessage()
            ]);

            return [
                'valid' => false,
                'error' => 'Validation error: ' . $e->getMessage(),
                'qr_code' => null
            ];
        }
    }

    /**
     * Obtener estadísticas de QR codes para una actividad
     */
    public function getActivityQrStats(Activity $activity): array
    {
        try {
            $totalRegistrations = $activity->registrations()->where('status', 'confirmed')->count();
            $qrCodesGenerated = $activity->attendanceQrCodes()->count();
            $qrCodesUsed = $activity->attendanceQrCodes()->where('status', 'used')->count();
            $qrCodesActive = $activity->attendanceQrCodes()->where('status', 'active')->count();
            $qrCodesExpired = $activity->attendanceQrCodes()->where('status', 'expired')->count();

            return [
                'activity_id' => $activity->id,
                'activity_name' => $activity->name,
                'total_registrations' => $totalRegistrations,
                'qr_codes_generated' => $qrCodesGenerated,
                'qr_codes_used' => $qrCodesUsed,
                'qr_codes_active' => $qrCodesActive,
                'qr_codes_expired' => $qrCodesExpired,
                'generation_rate' => $totalRegistrations > 0 ? round(($qrCodesGenerated / $totalRegistrations) * 100, 2) : 0,
                'usage_rate' => $qrCodesGenerated > 0 ? round(($qrCodesUsed / $qrCodesGenerated) * 100, 2) : 0,
            ];

        } catch (\Exception $e) {
            Log::error('Error getting QR stats for activity', [
                'activity_id' => $activity->id,
                'error' => $e->getMessage()
            ]);

            return [
                'activity_id' => $activity->id,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Limpiar QR codes expirados
     */
    public function cleanupExpiredQrCodes(): array
    {
        try {
            $expiredQrCodes = AttendanceQrCode::where('expires_at', '<', now())
                ->where('status', 'active')
                ->get();

            $updated = 0;
            foreach ($expiredQrCodes as $qrCode) {
                $qrCode->update(['status' => 'expired']);
                $updated++;
            }

            Log::info('Expired QR codes cleaned up', [
                'updated_count' => $updated
            ]);

            return [
                'success' => true,
                'updated_count' => $updated
            ];

        } catch (\Exception $e) {
            Log::error('Error cleaning up expired QR codes', [
                'error' => $e->getMessage()
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
}