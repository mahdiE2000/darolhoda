<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseStore extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'teacher_id' => ['required','integer','exists:teachers,id'],
            'lesson_id' => ['required','integer','exists:lessons,id'],
            'class_id' => ['required','integer','exists:classes,id'],
            'exam_time' => ['required','date'],
            'class_time' => ['required','date'],
            'description' => ['nullable', 'max:8000']
        ];
    }
}
