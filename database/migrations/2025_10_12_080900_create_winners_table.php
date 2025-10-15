<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('winners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')->constrained()->onDelete('cascade');
            $table->foreignId('participant_id')->constrained()->onDelete('cascade');
            $table->integer('position'); // 1 = primer lugar, 2 = segundo lugar, etc.
            $table->string('project_name')->nullable();
            $table->text('project_description')->nullable();
            $table->string('project_image')->nullable(); // Ruta de la imagen del proyecto
            $table->text('judges_notes')->nullable();
            $table->decimal('score', 5, 2)->nullable();
            $table->year('year');
            $table->boolean('is_published')->default(false);
            $table->timestamps();
            
            $table->index(['activity_id', 'year']);
            $table->index(['position', 'year']);
            $table->unique(['activity_id', 'participant_id', 'year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('winners');
    }
};
