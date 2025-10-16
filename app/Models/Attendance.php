<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class Attendance extends Model
{
    protected $fillable = [
        'participant_id',
        'activity_id',
        'attendance_qr_code_id',
        'check_in_method',
        'scanned_by',
        'scanner_location',
        'is_valid',
        'validation_notes',
        'expected_check_in',
        'actual_check_in',
        'check_in_time',
        'check_out_time',
        'attendance_status',
        'minutes_late',
        'type',
        'notes',
    ];

    protected $casts = [
        'actual_check_in' => 'datetime',
        'expected_check_in' => 'datetime',
        'check_in_time' => 'datetime',
        'check_out_time' => 'datetime',
        'scanner_location' => 'array',
        'is_valid' => 'boolean',
    ];

    /**
     * Relación con participante
     */
    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }

    /**
     * Relación con actividad
     */
    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }

    /**
     * Relación con QR code usado
     */
    public function attendanceQrCode(): BelongsTo
    {
        return $this->belongsTo(AttendanceQrCode::class, 'attendance_qr_code_id');
    }

    /**
     * Scope para asistencias válidas
     */
    public function scopeValid($query)
    {
        return $query->where('is_valid', true);
    }

    /**
     * Scope por método de check-in
     */
    public function scopeByCheckInMethod($query, string $method)
    {
        return $query->where('check_in_method', $method);
    }

    /**
     * Scope por estado de asistencia
     */
    public function scopeByStatus($query, string $status)
    {
        return $query->where('attendance_status', $status);
    }

    /**
     * Scope para asistencias de hoy
     */
    public function scopeToday($query)
    {
        return $query->whereDate('actual_check_in', today());
    }

    /**
     * Calcular minutos de retraso
     */
    public function calculateMinutesLate(): int
    {
        if (!$this->expected_check_in) {
            return 0;
        }

        $expectedTime = Carbon::parse($this->expected_check_in);
        $actualTime = Carbon::parse($this->actual_check_in);

        if ($actualTime->lte($expectedTime)) {
            return 0;
        }

        return $actualTime->diffInMinutes($expectedTime);
    }

    /**
     * Determinar estado de asistencia
     */
    public function determineAttendanceStatus(): string
    {
        if (!$this->expected_check_in) {
            return 'present';
        }

        $expectedTime = Carbon::parse($this->expected_check_in);
        $actualTime = Carbon::parse($this->actual_check_in);

        // Si llegó 15 minutos o más tarde, es "late"
        if ($actualTime->diffInMinutes($expectedTime) >= 15) {
            return 'late';
        }

        return 'present';
    }

    /**
     * Registrar asistencia desde QR code
     */
    public static function registerFromQr(AttendanceQrCode $qrCode, string $scannedBy = null, array $scannerLocation = null): self
    {
        $activity = $qrCode->activity;
        $participant = $qrCode->participant;

        // Calcular tiempo esperado de llegada
        $expectedCheckIn = Carbon::parse($activity->start_date)->subMinutes(15); // 15 minutos antes

        // Crear registro de asistencia
        $attendance = self::create([
            'participant_id' => $participant->id,
            'activity_id' => $activity->id,
            'attendance_qr_code_id' => $qrCode->id,
            'check_in_method' => 'qr_scan',
            'scanned_by' => $scannedBy,
            'scanner_location' => $scannerLocation,
            'is_valid' => true,
            'expected_check_in' => $expectedCheckIn,
            'actual_check_in' => now(),
            'type' => 'activity',
        ]);

        // Calcular minutos de retraso y estado
        $minutesLate = $attendance->calculateMinutesLate();
        $attendanceStatus = $attendance->determineAttendanceStatus();

        $attendance->update([
            'minutes_late' => $minutesLate,
            'attendance_status' => $attendanceStatus,
        ]);

        // Marcar QR code como usado
        $qrCode->markAsUsed();

        return $attendance;
    }

    /**
     * Validar asistencia manual
     */
    public function validateAttendance(string $notes = null): void
    {
        $this->update([
            'is_valid' => true,
            'validation_notes' => $notes,
        ]);
    }

    /**
     * Obtener resumen de la asistencia
     */
    public function getSummary(): array
    {
        return [
            'participant_name' => $this->participant->first_name . ' ' . $this->participant->last_name,
            'activity_name' => $this->activity->name,
            'check_in_time' => $this->actual_check_in->format('Y-m-d H:i:s'),
            'check_in_method' => $this->check_in_method,
            'attendance_status' => $this->attendance_status,
            'minutes_late' => $this->minutes_late,
            'is_valid' => $this->is_valid,
            'scanned_by' => $this->scanned_by,
        ];
    }
}
