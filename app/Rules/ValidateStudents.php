<?php

namespace App\Rules;

use App\Models\Student;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidateStudents implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $this->checkArray($attribute, $value, $fail);
    }


    private function checkArray(string $attribute, mixed $value, Closure $fail): void
    {
        if(! is_array($value))
        {
            $fail("The $attribute must be an array.");
            return;
        }
        
        $students = Student::pluck('id')->toArray();

        foreach ($value as $id)
        {
            if(! in_array($id, $students))
            {
                $fail("The $attribute is invalid.");
                return;
            }
        }
    }   
}
