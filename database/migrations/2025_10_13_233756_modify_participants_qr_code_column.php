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
        Schema::table('participants', function (Blueprint $table) {
            // Primero eliminar la columna existente
            $table->dropColumn('qr_code');
        });
        
        Schema::table('participants', function (Blueprint $table) {
            // Agregar la columna con tipo text para URLs largas
            $table->text('qr_code')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('participants', function (Blueprint $table) {
            // Eliminar la columna text
            $table->dropColumn('qr_code');
        });
        
        Schema::table('participants', function (Blueprint $table) {
            // Restaurar la columna original
            $table->string('qr_code')->nullable();
        });
    }
};