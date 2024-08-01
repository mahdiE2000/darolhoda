<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected static ?string $password;

    public function definition()
    {
        return [
            'name'=> $this->faker->name(),
            'last_name' => $this->faker->lastName(),
            'teacher_code' => $this->faker->randomNumber(7),
            'phone_number' => $this->faker->phoneNumber(),
            'password' => static::$password ??= Hash::make('password'),
            'meli_code' => '037' . $this->faker->randomNumber(7)
        ];
    }
}
