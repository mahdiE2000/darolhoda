<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
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
            'class' => $this->class->name,
            'lesson' => $this->lesson->title,
            'teacher' => $this->teacher->name . " " . $this->teacher->last_name ,
            'exam_time' => $this->exam_time,
            'class_time' => $this->class_time,
            'description' => $this->description,
        ];
    }
}
