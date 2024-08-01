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
        Schema::create('scores', function (Blueprint $table) {
            $table->id();
            $table->integer('score');

            $table->unsignedBigInteger('exam_id');
            $table->foreign('exam_id')->references('id')->on('exams');

            $table->unsignedBigInteger('course_selected_id');
            $table->foreign('course_selected_id')->references('id')->on('course_selected');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scores');
    }
};
