<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\StdClass;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'teacher_id' => Teacher::inRandomOrder()->value('id'),
            'lesson_id' => Lesson::inRandomOrder()->value('id'),
            'class_id' => StdClass::inRandomOrder()->value('id'),
            'class_time' => $this->faker->dateTime(),
            'exam_time' => now()->addDays(30),
            'description' => $this->faker->paragraph()
        ];
    }
}
