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
        Schema::create('attendance_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')->constrained()->onDelete('cascade');
            
            // Datos del reporte
            $table->date('report_date');
            $table->time('report_time');
            $table->enum('report_type', ['hourly', 'daily', 'activity_summary', 'real_time']);
            
            // Estadísticas del reporte
            $table->integer('total_registered'); // Total de inscritos
            $table->integer('total_present'); // Total presentes
            $table->integer('total_late'); // Total llegaron tarde
            $table->integer('total_absent'); // Total ausentes
            $table->integer('total_excused'); // Total con excusa
            
            // Porcentajes
            $table->decimal('attendance_rate', 5, 2); // Tasa de asistencia (0-100)
            $table->decimal('punctuality_rate', 5, 2); // Tasa de puntualidad (0-100)
            
            // Detalles adicionales
            $table->json('hourly_breakdown')->nullable(); // Desglose por horas
            $table->json('participant_details')->nullable(); // Detalles de participantes
            $table->json('trends')->nullable(); // Tendencias y comparaciones
            
            // Metadatos del reporte
            $table->string('generated_by')->nullable(); // Quién generó el reporte
            $table->timestamp('generated_at');
            $table->timestamps();
            
            // Índices para consultas eficientes
            $table->index(['activity_id', 'report_date']);
            $table->index(['report_type', 'report_date']);
            $table->index(['generated_at']);
            
            // Constraint único para evitar reportes duplicados
            $table->unique(['activity_id', 'report_date', 'report_type', 'report_time'], 'unique_report_entry');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_reports');
    }
};