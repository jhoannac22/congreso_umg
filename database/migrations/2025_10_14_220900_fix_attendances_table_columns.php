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
        Schema::table('attendances', function (Blueprint $table) {
            // Agregar las columnas que faltan
            if (!Schema::hasColumn('attendances', 'attendance_status')) {
                $table->enum('attendance_status', ['present', 'late', 'absent', 'excused'])->default('present');
            }
            
            if (!Schema::hasColumn('attendances', 'minutes_late')) {
                $table->integer('minutes_late')->nullable(); // Minutos de retraso
            }
            
            // Agregar índices que faltan
            $table->index(['check_in_method', 'is_valid'], 'attendances_check_in_method_valid_index');
            $table->index(['attendance_status', 'actual_check_in'], 'attendances_status_check_in_index');
            $table->index(['scanned_by'], 'attendances_scanned_by_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('attendances', function (Blueprint $table) {
            $table->dropColumn(['attendance_status', 'minutes_late']);
            $table->dropIndex('attendances_check_in_method_valid_index');
            $table->dropIndex('attendances_status_check_in_index');
            $table->dropIndex('attendances_scanned_by_index');
        });
    }
};