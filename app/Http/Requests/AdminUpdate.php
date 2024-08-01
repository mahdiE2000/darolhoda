<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminUpdate extends FormRequest
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
            'user_name' => ['required', 'string', 'unique:admins,user_name,' . $this->user()->id],
            'phone' => ['required','string','max:11', 'unique:admins,phone_number,' . $this->user()->id],
            'code_meli' => ['required', 'string','max:10','unique:admins,meli_code,' . $this->user()->id],
            'password' => ['required', 'min:8']
        ];
    }
}
