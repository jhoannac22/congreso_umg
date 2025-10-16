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
            $table->string('congress_qr_code_url')->nullable()->after('qr_code');
            $table->text('congress_qr_data')->nullable()->after('congress_qr_code_url');
            $table->timestamp('congress_qr_generated_at')->nullable()->after('congress_qr_data');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('participants', function (Blueprint $table) {
            $table->dropColumn(['congress_qr_code_url', 'congress_qr_data', 'congress_qr_generated_at']);
        });
    }
};
