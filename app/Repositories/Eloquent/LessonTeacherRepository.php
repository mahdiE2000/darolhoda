<?php

namespace App\Repositories\Eloquent;

use App\Models\LessonTeacher;
use App\Repositories\LessonTeacherRepositoryInterface;

class LessonTeacherRepository implements LessonTeacherRepositoryInterface {
    public function create($data)
    {
        return LessonTeacher::create($data);
    }
}
