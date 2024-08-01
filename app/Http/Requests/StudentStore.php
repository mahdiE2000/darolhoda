<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentStore extends FormRequest
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
                'name' => ['required', 'string'],
                'lname' => ['required', 'string'],
                'level' => ['required', 'in:1,2,3,4,5'],
                'group' => ['nullable'],
                'student_code' => ['required', 'string', 'unique:students,student_code'],
                'phone' => ['required','string','max:11', 'unique:students,phone_number'],
                'code_meli' => ['nullable', 'string','max:10','unique:students,meli_code'],
                'password' => ['required', 'min:8']
            ];
    }
}
