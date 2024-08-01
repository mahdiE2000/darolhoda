<?php

namespace App\Rules;

use App\Repositories\CourseSelectedRepositoryInterface;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidateCourseSelectedId implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        resolve(CourseSelectedRepositoryInterface::class)->getCourseSelected($value);
    }
}
