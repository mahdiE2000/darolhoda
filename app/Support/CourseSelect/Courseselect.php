<?php

namespace App\Support\CourseSelect;
use App\Imports\CourseSelectedImport;
use App\Repositories\CourseRepositoryInterface;
use App\Repositories\CourseSelectedRepositoryInterface;
use App\Repositories\StudentRepositoryInterface;
use Illuminate\Http\Request;

class Courseselect {

    public function __construct(
        readonly CourseRepositoryInterface $courseRepository,
        readonly StudentRepositoryInterface $studentRepository,
        readonly Request $request,
    ){}

    public function create()
    {
        if($this->request->has('file'))
        {
            return (new CourseSelectedImport)->import($this->request->file('file')->store('temp'));
        }
        return $this->refreshMembers($this->request->course_id, $this->request->members);
    }

    public function getAllStudents(array $ids)
    {
        return $this->studentRepository->getStudentByIds($ids);
    }

    protected function refreshMembers($course, $members)
    {
        $members = $this->getAllStudents($members);

        return $this->courseRepository->getCourse($course)->members()->sync($members);
    }
}
