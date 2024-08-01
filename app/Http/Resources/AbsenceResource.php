<?php

namespace App\Http\Resources;

use Illuminate\Http\Request; 
use Illuminate\Http\Resources\Json\JsonResource;

class AbsenceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'absent_id' => $this->id,
            'course_selected_id' => $this->course_selected_id
        ];
    }
}
