<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseMemberResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "last_name" => $this->last_name,
            "student_code" => $this->student_code,
            'group' => $this->group,
            'level' => $this->level,
            'course_selected' => $this->pivot->id,
            'absences' => $this->pivot->countAbcenses()
        ];
    }
}
