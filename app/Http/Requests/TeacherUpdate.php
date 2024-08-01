<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeacherUpdate extends FormRequest
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
            'name' => ['required', 'string'],
            'lname' => ['required', 'string'],
            'teacher_code' => ['required','unique:teachers,teacher_code,' . $this->route('teacher')],
            'phone' => ['required','string','max:11', 'unique:teachers,phone_number,' . $this->route('teacher')],
            'code_meli' => ['required', 'string','max:10','unique:teachers,meli_code,' . $this->route('teacher')],
            'password' => ['required', 'min:8']
        ];
    }
}
