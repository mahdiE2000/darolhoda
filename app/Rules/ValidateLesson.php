<?php

namespace App\Rules;

use App\Models\Lesson;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidateLesson implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $lesson = Lesson::selectRaw("*, REPLACE(name, ' ', '') as name")
            ->get();
        dd($lesson, $attribute);
    }
}
