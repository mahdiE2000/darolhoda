<?php

namespace App\Repositories\Eloquent;
use App\Models\Teacher;
use App\Repositories\TeacherRepositoryInterface;

class TeacherRepository implements TeacherRepositoryInterface {

    public function getAll()
    {
		return Teacher::all();
    }

    public function getPaginated($count)
    {
        return Teacher::paginate($count);
    }

    public function getTeacher($id)
    {
        return Teacher::findOrFail($id);
    }

    public function findTeacherByEmail($email)
    {
        return Teacher::where('email', $email)->firstOrFail();
    }

    public function findTeacherByTeacherCode($teacherCode)
    {
        return Teacher::where('teacher_code', $teacherCode)->firstOrFail();
    }

    public function create($data)
    {
        return Teacher::create($data);
    }

    public function update($id, $data)
    {
        return Teacher::find($id)->update($data);
    }

    public function search($search)
    {
        $students = Teacher::where("name", "like", "%" . $search . "%")
            ->orWhere("last_name", "like", "%" . $search . "%")
            ->get();
        return $students;
    }

}
