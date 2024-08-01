<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamDataResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $resource = [
            'course_id' => $this->id,
            'teacher_name' => $this->teacher->name,
            'lesson' => $this->lesson->title,
            'class' => $this->class->name,
        ]; 

        return !auth('student')->check() ? $resource += ['members' => new CourseMemberCollection($this->members)] : $resource;
    }
}