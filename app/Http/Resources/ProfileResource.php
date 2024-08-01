<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'name' => $this->name,
            'last_name' => $this->last_name,
            'phone_number' => $this->phone_number,
            'meli_code' => $this->meli_code
        ];

        if(auth('student')->check()){
            return $data += [
                'student_code' => $this->student_code,
            ];
        }
        if(auth('teacher')->check()){
            return $data += [
                'student_code' => $this->student_code,
            ];
        }

        return $data += [
            'user_name' => $this->user_name
        ];
    }
}
