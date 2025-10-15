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
        Schema::table('activities', function (Blueprint $table) {
            $table->boolean('requires_payment')->default(false)->after('requires_registration');
            $table->decimal('price', 10, 2)->nullable()->after('requires_payment');
            $table->string('currency', 3)->default('GTQ')->after('price');
            $table->text('payment_description')->nullable()->after('currency');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropColumn(['requires_payment', 'price', 'currency', 'payment_description']);
        });
    }
};
