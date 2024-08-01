<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LessonStore extends FormRequest
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
        return $this->has('file')
            ? [
                'file' => 'required|file|mimes:xlsx',
            ] : [
            'title' => ['required','string', 'unique:lessons,title'],
            'time' => ['required', 'numeric']
        ];
    }
}
