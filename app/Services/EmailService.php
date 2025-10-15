<?php

namespace App\Services;

use App\Mail\EmailVerification;
use App\Mail\EventReminder;
use App\Mail\ParticipantRegistrationConfirmation;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;

class EmailService
{
    /**
     * Enviar email de confirmación de inscripción
     */
    public function sendRegistrationConfirmation(Participant $participant): void
    {
        Mail::to($participant->email)
            ->send(new ParticipantRegistrationConfirmation($participant));
    }

    /**
     * Enviar email de verificación
     */
    public function sendEmailVerification(User $user): void
    {
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        Mail::to($user->email)
            ->send(new EmailVerification($user, $verificationUrl));
    }

    /**
     * Enviar recordatorio del evento
     */
    public function sendEventReminder(
        Participant $participant,
        int $daysUntilEvent,
        string $eventDate,
        string $eventTime,
        string $eventLocation,
        array $registeredActivities = []
    ): void {
        Mail::to($participant->email)
            ->send(new EventReminder(
                $participant,
                $daysUntilEvent,
                $eventDate,
                $eventTime,
                $eventLocation,
                $registeredActivities
            ));
    }

    /**
     * Enviar recordatorios masivos del evento
     */
    public function sendBulkEventReminders(
        int $daysUntilEvent,
        string $eventDate,
        string $eventTime,
        string $eventLocation
    ): void {
        $participants = Participant::where('is_active', true)->get();

        foreach ($participants as $participant) {
            // Obtener actividades registradas del participante
            $registeredActivities = $participant->activities()->get()->toArray();

            $this->sendEventReminder(
                $participant,
                $daysUntilEvent,
                $eventDate,
                $eventTime,
                $eventLocation,
                $registeredActivities
            );
        }
    }

    /**
     * Reenviar email de verificación
     */
    public function resendEmailVerification(User $user): void
    {
        if ($user->hasVerifiedEmail()) {
            throw new \Exception('El email ya ha sido verificado.');
        }

        $this->sendEmailVerification($user);
    }

    /**
     * Enviar notificación de cambio de horario
     */
    public function sendScheduleChangeNotification(Participant $participant, array $changes): void
    {
        // TODO: Implementar notificación de cambios de horario
        // Este método se puede implementar más adelante
    }

    /**
     * Enviar certificado de participación
     */
    public function sendParticipationCertificate(Participant $participant): void
    {
        // TODO: Implementar envío de certificado
        // Este método se puede implementar más adelante
    }
}
