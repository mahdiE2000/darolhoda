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
        Schema::create('absences', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('course_selected_id')->unsigned();
            $table->foreign('course_selected_id')->references('id')->on('course_selected');

            $table->bigInteger('session_id')->unsigned();
            $table->foreign('session_id')->references('id')->on('sessions');
            $table->timestamps();

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
