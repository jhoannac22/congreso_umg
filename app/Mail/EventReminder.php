<?php

namespace App\Mail;

use App\Models\Participant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EventReminder extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $participant;
    public $daysUntilEvent;
    public $eventDate;
    public $eventTime;
    public $eventLocation;
    public $registeredActivities;

    /**
     * Create a new message instance.
     */
    public function __construct(
        Participant $participant,
        int $daysUntilEvent,
        string $eventDate,
        string $eventTime,
        string $eventLocation,
        array $registeredActivities = []
    ) {
        $this->participant = $participant;
        $this->daysUntilEvent = $daysUntilEvent;
        $this->eventDate = $eventDate;
        $this->eventTime = $eventTime;
        $this->eventLocation = $eventLocation;
        $this->registeredActivities = $registeredActivities;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '¡Recordatorio: Congreso de Tecnología UMG en ' . $this->daysUntilEvent . ' días!',
            from: config('mail.from.address'),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.event-reminder',
            with: [
                'participant' => $this->participant,
                'daysUntilEvent' => $this->daysUntilEvent,
                'eventDate' => $this->eventDate,
                'eventTime' => $this->eventTime,
                'eventLocation' => $this->eventLocation,
                'registeredActivities' => $this->registeredActivities,
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
