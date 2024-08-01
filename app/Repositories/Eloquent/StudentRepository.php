<?php

namespace App\Repositories\Eloquent;
use App\Models\Student;
use App\Repositories\StudentRepositoryInterface;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class StudentRepository implements StudentRepositoryInterface {

    public function getAll()
    {
		return Student::orderBy('last_name', 'ASC')->get();
    }
    public function getPaginated($count)
    {
        return Student::orderBy('last_name', 'ASC')->paginate($count)->withQueryString(['itemsPerPage' => $count]);
    }

    public function getStudentCourseSelected($courseId)
    {
        $selected = Student::leftJoin('course_selected', function($join) use ($courseId) {
                $join->on('students.id', '=', 'course_selected.student_id')
                ->where('course_selected.course_id', '=', $courseId);
            })
            ->select('students.*', DB::raw('CASE WHEN course_selected.course_id IS NULL THEN false ELSE true END AS selected'))
            ->orderBy('last_name', 'ASC')
            ->get();

        return $selected;
    }

    public function getStudent($id)
    {
        return Student::findOrFail($id);
    }

    public function getStudentByIds($ids)
    {
        return Student::whereIn("id", Arr::flatten($ids))->get();
    }

    public function findStudentByEmail($email)
    {
        return Student::where('email', $email)->firstOrFail();
    }

    public function findStudentByStudentCode($studentCode)
    {
        return Student::where('student_code', $studentCode)->firstOrFail();
    }

    public function create($data)
    {
        return Student::create($data);
    }

    public function update($id, $data)
    {
        return Student::find($id)->update($data);
    }

    public function search($search)
    {
        $students = Student::where("name", "like", "%" . $search . "%")
                           ->orWhere("last_name", "like", "%" . $search . "%")
                           ->get();
        return $students;
    }
}
