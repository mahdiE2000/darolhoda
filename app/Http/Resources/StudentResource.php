<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'lname' => $this->last_name,
            'student_code' => $this->student_code,
            'phone' => $this->phone_number,
            'code_meli' => $this->meli_code,
            'group' => $this->group,
            'level' => $this->level,
        ];
    }
}
