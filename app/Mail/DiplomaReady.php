<?php

namespace App\Mail;

use App\Models\Diploma;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class DiplomaReady extends Mailable
{
    use Queueable, SerializesModels;

    public Diploma $diploma;

    /**
     * Create a new message instance.
     */
    public function __construct(Diploma $diploma)
    {
        $this->diploma = $diploma;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '🎓 Tu Diploma del Congreso de Tecnología está Listo',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.diploma-ready',
            with: [
                'diploma' => $this->diploma,
                'participant' => $this->diploma->participant,
                'activity' => $this->diploma->activity,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $attachments = [];
        
        if ($this->diploma->pdf_path && Storage::disk('public')->exists($this->diploma->pdf_path)) {
            $attachments[] = Attachment::fromStorageDisk('public', $this->diploma->pdf_path)
                ->as("Diploma_{$this->diploma->diploma_number}.pdf")
                ->withMime('application/pdf');
        }
        
        return $attachments;
    }
}

