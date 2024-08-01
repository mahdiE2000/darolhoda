<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowCourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $resource = [
            'teacher' => [
                'id' => $this->teacher->id,
                'name' => $this->teacher->name,
                'last_name' => $this->teacher->last_name
            ],
            'class' => [
                'id' => $this->class->id,
                'class_name' => $this->class->name
            ],
            'lesson' => [
                'id' => $this->lesson->id,
                'lesson_title' => $this->lesson->title,
                'unit' => $this->lesson->unit,
            ],
            'exam_time' => $this->exam_time,
            'class_time' => $this->class_time,
            'description' => $this->description,
            'sessions' => new SessionCollection($this->sessions)
        ];

        return !auth('student')->check() ? $resource += ['members' => new CourseMemberCollection($this->members), 'exams' => $this->exam] : $resource;
    }
}
