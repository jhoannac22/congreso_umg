<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Activity extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'type',
        'start_date',
        'end_date',
        'location',
        'max_participants',
        'current_participants',
        'requirements',
        'materials',
        'cost',
        'instructor',
        'instructor_bio',
        'is_active',
        'requires_approval',
        'requires_registration',
        'requires_payment',
        'price',
        'currency',
        'payment_description',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'cost' => 'decimal:2',
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'requires_approval' => 'boolean',
        'requires_registration' => 'boolean',
        'requires_payment' => 'boolean',
    ];

    /**
     * Relación con la categoría
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Relación con participantes (many-to-many)
     */
    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(Participant::class, 'activity_participant')
                    ->withPivot('status', 'notes', 'registered_at')
                    ->withTimestamps();
    }
    
    /**
     * Relación con participantes registrados
     */
    public function registeredParticipants(): BelongsToMany
    {
        return $this->participants()->wherePivot('status', 'registered');
    }
    
    /**
     * Relación con participantes confirmados
     */
    public function confirmedParticipants(): BelongsToMany
    {
        return $this->participants()->wherePivot('status', 'confirmed');
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
    public function registrations(): HasMany
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
     * Scope para actividades activas
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope para talleres
     */
    public function scopeTalleres($query)
    {
        return $query->where('type', 'taller');
    }

    /**
     * Scope para competencias
     */
    public function scopeCompetencias($query)
    {
        return $query->where('type', 'competencia');
    }

    /**
     * Verificar si hay cupos disponibles
     */
    public function hasAvailableSpots(): bool
    {
        if ($this->max_participants === 0) {
            return true; // Sin límite
        }
        
        return $this->current_participants < $this->max_participants;
    }

    /**
     * Obtener cupos disponibles
     */
    public function getAvailableSpots(): int
    {
        if ($this->max_participants === 0) {
            return -1; // Sin límite
        }
        
        return max(0, $this->max_participants - $this->current_participants);
    }

    /**
     * Verificar si requiere pago
     */
    public function requiresPayment(): bool
    {
        return $this->requires_payment && $this->price > 0;
    }

    /**
     * Obtener precio formateado
     */
    public function getFormattedPrice(): string
    {
        if (!$this->requiresPayment()) {
            return 'Gratis';
        }

        return $this->currency . ' ' . number_format((float)($this->price ?? 0), 2);
    }

    /**
     * Verificar si un participante ha pagado
     */
    public function isPaidByParticipant(int $participantId): bool
    {
        return $this->payments()
            ->where('participant_id', $participantId)
            ->where('status', 'completed')
            ->exists();
    }
}
