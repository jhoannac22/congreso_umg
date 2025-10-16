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
}