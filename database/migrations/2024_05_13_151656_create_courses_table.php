<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('teacher_id')->unsigned();
            $table->bigInteger('lesson_id')->unsigned();
            $table->bigInteger('class_id')->unsigned();

            $table->date('class_time');
            $table->date('exam_time');

            $table->text('description')->nullable();

            $table->foreign('teacher_id')->references('id')->on('teachers');
            $table->foreign('lesson_id')->references('id')->on('lessons');
            $table->foreign('class_id')->references('id')->on('classes');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
};
