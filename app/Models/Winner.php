<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Winner extends Model
{
    protected $fillable = [
        'activity_id',
        'participant_id',
        'position',
        'project_name',
        'project_description',
        'project_image',
        'judges_notes',
        'score',
        'year',
        'is_published',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'is_published' => 'boolean',
    ];

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }

    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }
}
