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
        Schema::table('absences', function (Blueprint $table) {
            $table->integer('delay')->comment('In Minutes')->after('session_id')->nullable();
            $table->tinyInteger('is_excused_absence')->default('0')->comment('0: unexcused absence, 1: excused absence')->after('delay');
            $table->text('reason_absence')->after('is_excused_absence')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('absences', function (Blueprint $table) {
            //
        });
    }
};
