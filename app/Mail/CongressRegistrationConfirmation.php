<?php

namespace App\Mail;

use App\Models\Participant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CongressRegistrationConfirmation extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $participant;
    public $qrCodeUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(Participant $participant, string $qrCodeUrl)
    {
        $this->participant = $participant;
        $this->qrCodeUrl = $qrCodeUrl;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '¡Bienvenido al Congreso de Tecnología UMG 2024! - Tu Código QR de Asistencia',
            from: config('mail.from.address'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.congress-registration-confirmation',
            with: [
                'participant' => $this->participant,
                'qrCodeUrl' => $this->qrCodeUrl,
                'eventDate' => '15 de Noviembre de 2024',
                'eventTime' => '8:00 AM - 6:00 PM',
                'eventLocation' => 'Universidad Mariano Gálvez de Guatemala',
                'eventAddress' => 'Campus Central, Zona 11, Ciudad de Guatemala',
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
