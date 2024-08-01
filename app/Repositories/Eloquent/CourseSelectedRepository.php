<?php

namespace App\Repositories\Eloquent;
use App\Models\CourseSelected;
use App\Repositories\CourseSelectedRepositoryInterface;
use Illuminate\Support\Arr;

class CourseSelectedRepository implements CourseSelectedRepositoryInterface
{

    public function getCourseSelected($id)
    {
        return CourseSelected::findOrFail($id);
    }

    public function getCourseSelectedByIds($ids)
    {
        return CourseSelected::whereIn('id', Arr::flatten($ids))->get();
    }


    public function getCourseSelectedStudent($id)
    {
        return $this->getCourseSelected($id)->student;
    }

    public function getByUserIdAndCourseId($userId, $courseId)
    {
        return CourseSelected::where('student_id', $userId)->where('course_id', $courseId)->first();
    }
}
