<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentUpdate extends FormRequest
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
            'student_code' => ['required', 'string', 'unique:students,student_code,' . $this->route('student')],
            'phone' => ['required','string','max:11', 'unique:students,phone_number,' . $this->route('student')],
            'code_meli' => ['required', 'string','max:10','unique:students,meli_code,' . $this->route('student')],
            'password' => ['required', 'min:8']
        ];
    }
}
