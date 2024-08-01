<?php

namespace App\Repositories\Eloquent;
use App\Models\Course;
use App\Repositories\CourseRepositoryInterface;
use App\Repositories\LessonRepositoryInterface;

class CourseRepository implements CourseRepositoryInterface {

    public function getPaginated($count)
    {
        return Course::with('class','lesson','teacher')->orderBy('class_time', 'desc')->paginate($count);
    }

    public function getAll()
    {
		return Course::all();
	}

    public function getCourse($id)
    {
        return Course::findOrFail($id);
    }

    public function create($data)
    {
        return Course::create($data);
    }

    public function update($id, $data)
    {
        return Course::find($id)->update($data);
    }

    public function findCourseByTeacher($id)
    {
        return Course::where('teacher_id', $id);
    }

    public function getCourseExams($course)
    {
        return $course->load('exam');
    }

    public function search($search, LessonRepositoryInterface $lesson)
    {
        return $lesson->search($search)->load('courses');
    }

}
