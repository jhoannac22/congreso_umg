<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AttendanceQrCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_id',
        'activity_id',
        'participant_id',
        'code',
        'qr_data',
        'is_used',
        'used_at',
        'expires_at',
    ];

    protected $casts = [
        'is_used' => 'boolean',
        'used_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    /**
     * Get the registration that owns the QR code.
     */
    public function registration(): BelongsTo
    {
        return $this->belongsTo(ActivityRegistration::class, 'registration_id');
    }

    /**
     * Get the activity that owns the QR code.
     */
    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }

    /**
     * Get the participant that owns the QR code.
     */
    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }

    /**
     * Create QR code for registration.
     */
    public static function createForRegistration(ActivityRegistration $registration): self
    {
        $code = self::generateUniqueCode();
        
        $qrData = [
            'registration_id' => $registration->id,
            'activity_id' => $registration->activity_id,
            'participant_id' => $registration->participant_id,
            'code' => $code,
        ];

        return self::create([
            'registration_id' => $registration->id,
            'activity_id' => $registration->activity_id,
            'participant_id' => $registration->participant_id,
            'code' => $code,
            'qr_data' => json_encode($qrData),
            'expires_at' => $registration->activity->end_date ?? now()->addDays(30),
        ]);
    }

    /**
     * Generate a unique code.
     */
    protected static function generateUniqueCode(): string
    {
        do {
            $code = strtoupper(substr(md5(uniqid(rand(), true)), 0, 10));
        } while (self::where('code', $code)->exists());

        return $code;
    }

    /**
     * Check if QR code is valid.
     */
    public function isValid(): bool
    {
        return !$this->is_used && (!$this->expires_at || $this->expires_at->isFuture());
    }

    /**
     * Mark QR code as used.
     */
    public function markAsUsed(): void
    {
        $this->update([
            'is_used' => true,
            'used_at' => now(),
        ]);
    }
}

