<?php

namespace App\Http\Requests;

use App\Rules\ValidateCourseSelectedId;
use Illuminate\Foundation\Http\FormRequest;

class ScoreStore extends FormRequest
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
            'course_selected_id' => ['required', new ValidateCourseSelectedId],
            'exam_id' => ['required','integer', 'exists:exams,id'],
            'score' => ['required', 'numeric', 'between:1,20'],
            'attachments' => ['required', 'array']
        ];
    }
}
