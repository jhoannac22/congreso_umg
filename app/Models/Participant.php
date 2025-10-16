<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Participant extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'type',
        'school',
        'student_id',
        'qr_code',
        'is_active',
        'email_verified',
        'email_verified_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'email_verified' => 'boolean',
        'email_verified_at' => 'datetime',
    ];

    /**
     * Boot del modelo para generar QR code automáticamente
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($participant) {
            if (empty($participant->qr_code)) {
                $participant->qr_code = 'QR_' . Str::random(16) . '_' . time();
            }
        });

        static::created(function ($participant) {
            // Actualizar QR code después de crear el participante con su ID real
            if (strpos($participant->qr_code, 'QR_') === 0) {
                // Usar el método unificado para generar QR
                $participant->qr_code = $participant->getAttendanceQrCodeUrl();
                $participant->save();
            }
        });
    }

    /**
     * Relación con actividades (many-to-many)
     */
    public function activities(): BelongsToMany
    {
        return $this->belongsToMany(Activity::class, 'activity_participant')
                    ->withPivot('status', 'notes', 'registered_at')
                    ->withTimestamps();
    }
    
    /**
     * Verificar si está inscrito en una actividad
     */
    public function isRegisteredIn(Activity $activity): bool
    {
        return $this->activities()->where('activity_id', $activity->id)->exists();
    }
    
    /**
     * Obtener todas las actividades registradas
     */
    public function getRegisteredActivities()
    {
        return $this->activities()->wherePivotIn('status', ['registered', 'confirmed'])->get();
    }

    /**
     * Relación con asistencias
     */
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }

    /**
     * Relación con registros de actividades
     */
    public function activityRegistrations(): HasMany
    {
        return $this->hasMany(ActivityRegistration::class);
    }

    /**
     * Relación con ganadores
     */
    public function winners(): HasMany
    {
        return $this->hasMany(Winner::class);
    }

    /**
     * Relación con diplomas
     */
    public function diplomas(): HasMany
    {
        return $this->hasMany(Diploma::class);
    }

    /**
     * Relación con pagos
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Scope para participantes activos
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope para participantes internos
     */
    public function scopeInternos($query)
    {
        return $query->where('type', 'interno');
    }

    /**
     * Scope para participantes externos
     */
    public function scopeExternos($query)
    {
        return $query->where('type', 'externo');
    }

    /**
     * Obtener el nombre completo
     */
    public function getFullNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    /**
     * Verificar si es participante interno
     */
    public function isInterno(): bool
    {
        return $this->type === 'interno';
    }

    /**
     * Verificar si es participante externo
     */
    public function isExterno(): bool
    {
        return $this->type === 'externo';
    }

    /**
     * Obtener URL del código QR para asistencia (con datos seguros)
     */
    public function getAttendanceQrCodeUrl(): string
    {
        // Generar token único para este participante
        $token = hash('sha256', $this->id . $this->email . config('app.key'));
        
        // Crear datos seguros para el QR
        $qrData = [
            'participant_id' => $this->id,
            'email' => $this->email,
            'token' => $token,
            'timestamp' => time()
        ];
        
        $encodedData = urlencode(json_encode($qrData));
        return "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={$encodedData}&color=000000&bgcolor=ffffff&format=png";
    }

    /**
     * Obtener datos para el código QR (datos seguros)
     */
    public function getQrData(): string
    {
        $token = hash('sha256', $this->id . $this->email . config('app.key'));
        
        return json_encode([
            'participant_id' => $this->id,
            'email' => $this->email,
            'token' => $token,
            'timestamp' => time()
        ]);
    }

    /**
     * Validar token del QR
     */
    public function validateQrToken(string $token): bool
    {
        // Validar contra el token actual
        $expectedToken = hash('sha256', $this->id . $this->email . config('app.key'));
        if (hash_equals($expectedToken, $token)) {
            return true;
        }
        
        // Validar contra el token almacenado en qr_code (compatibilidad)
        if ($this->qr_code) {
            // Extraer el token del QR almacenado
            $qrUrl = $this->qr_code;
            if (preg_match('/data=([^&]+)/', $qrUrl, $matches)) {
                $decodedData = urldecode($matches[1]);
                $qrData = json_decode($decodedData, true);
                if ($qrData && isset($qrData['token'])) {
                    if (hash_equals($qrData['token'], $token)) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
}
