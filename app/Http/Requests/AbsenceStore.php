<?php

namespace App\Http\Requests;

use App\Rules\ValidateCourseSelectedIds;
use Illuminate\Foundation\Http\FormRequest;

class AbsenceStore extends FormRequest
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
            'course_id' => ['required','integer','exists:courses,id'],
            'date' => ['required','date'],
            'course_selected' => ['nullable', 'array', new ValidateCourseSelectedIds],
        ];
    }
}
