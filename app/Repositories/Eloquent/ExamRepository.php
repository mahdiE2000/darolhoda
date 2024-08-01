<?php

namespace App\Repositories\Eloquent;

use App\Repositories\ExamRepositoryInterface;
use App\Models\Exam;
use App\Models\CourseSelected;
class ExamRepository implements ExamRepositoryInterface
{

    public function getAll()
    {
        return Exam::all();
    }

    public function getExam($id)
    {
        return Exam::findOrFail($id);
    }

//    public function getExamWithScores($id)
//    {
//        $exam = $this->getExam($id);
//
//        $student = auth()->guard('student');
//
//        if($student->check()) {
//
//            $course_selected = CourseSelected::where('student_id', $student->user()->id)
//                ->where('course_id', $exam->course_id)
//                ->first();
//
//            try {
//
//            } catch (\Exception $e) {
//                abort(404);
//            }
//        }
//        return $exam->load('scores');
//    }

    public function getPaginated($count)
    {
        return Exam::paginate($count);
    }

    public function create($data)
    {
        return Exam::create($data);
    }

    public function update($id, $data)
    {
        return Exam::find($id)->update($data);
    }

    public function search($search)
    {
        return Exam::where("title", "like", "%" . $search . "%")->get();

    }
}
