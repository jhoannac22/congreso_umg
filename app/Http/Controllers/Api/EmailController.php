<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use App\Models\User;
use App\Services\EmailService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmailController extends Controller
{
    protected EmailService $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    /**
     * Reenviar email de verificación
     */
    public function resendVerification(Request $request): JsonResponse
    {
        $user = Auth::user();

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'El email ya ha sido verificado.',
            ], 400);
        }

        try {
            $this->emailService->resendEmailVerification($user);

            return response()->json([
                'message' => 'Email de verificación enviado exitosamente.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al enviar el email de verificación.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Enviar email de confirmación de inscripción
     */
    public function sendRegistrationConfirmation(Request $request): JsonResponse
    {
        $request->validate([
            'participant_id' => 'required|exists:participants,id',
        ]);

        $participant = Participant::findOrFail($request->participant_id);

        try {
            $this->emailService->sendRegistrationConfirmation($participant);

            return response()->json([
                'message' => 'Email de confirmación enviado exitosamente.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al enviar el email de confirmación.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Enviar recordatorio del evento
     */
    public function sendEventReminder(Request $request): JsonResponse
    {
        $request->validate([
            'participant_id' => 'required|exists:participants,id',
            'days_until_event' => 'required|integer|min:1',
            'event_date' => 'required|string',
            'event_time' => 'required|string',
            'event_location' => 'required|string',
        ]);

        $participant = Participant::findOrFail($request->participant_id);

        try {
            $this->emailService->sendEventReminder(
                $participant,
                $request->days_until_event,
                $request->event_date,
                $request->event_time,
                $request->event_location
            );

            return response()->json([
                'message' => 'Recordatorio del evento enviado exitosamente.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al enviar el recordatorio del evento.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Enviar recordatorios masivos del evento
     */
    public function sendBulkEventReminders(Request $request): JsonResponse
    {
        $request->validate([
            'days_until_event' => 'required|integer|min:1',
            'event_date' => 'required|string',
            'event_time' => 'required|string',
            'event_location' => 'required|string',
        ]);

        try {
            $this->emailService->sendBulkEventReminders(
                $request->days_until_event,
                $request->event_date,
                $request->event_time,
                $request->event_location
            );

            return response()->json([
                'message' => 'Recordatorios masivos enviados exitosamente.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al enviar los recordatorios masivos.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Verificar email
     */
    public function verifyEmail(Request $request): JsonResponse
    {
        $request->validate([
            'id' => 'required|integer',
            'hash' => 'required|string',
        ]);

        $user = User::findOrFail($request->id);

        if (!hash_equals((string) $request->hash, sha1($user->email))) {
            return response()->json([
                'message' => 'Enlace de verificación inválido.',
            ], 400);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'El email ya ha sido verificado.',
            ], 400);
        }

        $user->markEmailAsVerified();

        return response()->json([
            'message' => 'Email verificado exitosamente.',
        ]);
    }
}