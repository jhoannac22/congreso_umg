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
        Schema::create('activity_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activity_id')->constrained()->onDelete('cascade');
            $table->foreignId('participant_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['registered', 'confirmed', 'cancelled', 'attended'])->default('registered');
            $table->text('notes')->nullable();
            $table->enum('payment_status', ['none', 'pending', 'paid', 'failed', 'refunded'])->default('none');
            $table->string('payment_method')->nullable(); // 'card', 'cash', 'transfer', etc.
            $table->string('transaction_id')->nullable();
            $table->decimal('amount_paid', 10, 2)->default(0);
            $table->string('currency', 3)->default('GTQ');
            $table->timestamp('registered_at')->useCurrent();
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();

            // Índices para mejorar el rendimiento
            $table->index(['activity_id', 'status']);
            $table->index(['participant_id', 'status']);
            $table->index('transaction_id');
            $table->index('registered_at');

            // Evitar inscripciones duplicadas
            $table->unique(['activity_id', 'participant_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_registrations');
    }
};