<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Diploma extends Model
{
    protected $fillable = [
        'participant_id',
        'activity_id',
        'diploma_number',
        'template_type',
        'pdf_path',
        'issue_date',
        'is_sent',
        'sent_at',
        'notes',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'is_sent' => 'boolean',
        'sent_at' => 'datetime',
    ];

    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }
}
