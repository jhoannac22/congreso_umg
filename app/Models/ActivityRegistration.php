<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ActivityRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity_id',
        'participant_id',
        'status',
        'notes',
        'payment_status',
        'payment_method',
        'transaction_id',
        'amount_paid',
        'currency',
        'registered_at',
        'confirmed_at',
        'cancelled_at',
    ];

    protected $casts = [
        'registered_at' => 'datetime',
        'confirmed_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'amount_paid' => 'decimal:2',
    ];

    /**
     * Get the activity that owns the registration.
     */
    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }

    /**
     * Get the participant that owns the registration.
     */
    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }

    /**
     * Get the attendance QR code for this registration.
     */
    public function attendanceQrCode(): HasOne
    {
        return $this->hasOne(AttendanceQrCode::class, 'registration_id');
    }

    /**
     * Get the attendances for this registration.
     */
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class, 'participant_id', 'participant_id')
                    ->where('activity_id', $this->activity_id);
    }

    /**
     * Scope a query to only include confirmed registrations.
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    /**
     * Scope a query to only include paid registrations.
     */
    public function scopePaid($query)
    {
        return $query->where('payment_status', 'paid');
    }

    /**
     * Check if the registration is confirmed.
     */
    public function isConfirmed(): bool
    {
        return $this->status === 'confirmed';
    }

    /**
     * Check if the registration is paid.
     */
    public function isPaid(): bool
    {
        return $this->payment_status === 'paid';
    }

    /**
     * Check if the registration is cancelled.
     */
    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    /**
     * Generate QR code for attendance if registration is confirmed.
     */
    public function generateAttendanceQrCode(): ?AttendanceQrCode
    {
        // Solo generar QR si la inscripción está confirmada
        if (!$this->isConfirmed()) {
            return null;
        }

        // Verificar si ya existe un QR code
        if ($this->attendanceQrCode) {
            return $this->attendanceQrCode;
        }

        // Crear nuevo QR code
        return AttendanceQrCode::createForRegistration($this);
    }

    /**
     * Boot method para generar QR code automáticamente
     */
    protected static function boot()
    {
        parent::boot();

        // Generar QR code cuando se confirma la inscripción
        static::updated(function ($registration) {
            if ($registration->isDirty('status') && $registration->isConfirmed()) {
                $registration->generateAttendanceQrCode();
            }
        });

        // También generar QR code al crear si ya viene confirmado
        static::created(function ($registration) {
            if ($registration->isConfirmed()) {
                $registration->generateAttendanceQrCode();
            }
        });
    }
}