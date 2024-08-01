<?php

namespace App\Support\Student;

use App\Imports\StudentImport;
use App\Imports\TeacherImport;
use App\Repositories\StudentRepositoryInterface;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class Student {

    use AuthorizesRequests;

    public function __construct(
        readonly StudentRepositoryInterface $repository,
        readonly  Request $request,
    ){}

    public function getPaginatedStudents()
    {
        $this->isAuthorized('viewAny', Student::class);

        return $this->repository->getPaginated($this->request->get('itemsPerPage'));
    }

    public function getStudentsCourse()
    {
        return $this->repository->getStudentCourseSelected($this->request->get('course_id'));
    }

    public function getStudent($id)
    {
        $student = $this->repository->getStudent($id);

        $this->isAuthorized('view', $student);

        return $student;
    }

    public function createStudent()
    {
        if($this->request->has('file'))
        {
            return $this->importExcelFileAsData($this->request);
        }

        return $this->repository->create($this->data());
    }

    public function updateStudent($id)
    {
        return $this->repository->update($id, $this->data());
    }

    protected function data()
    {
        $data = [
            'name' => $this->request->input('name'),
            'last_name' => $this->request->input('lname'),
            'student_code' => $this->request->input('student_code'),
            'phone_number' => $this->request->input('phone'),
            'meli_code' => $this->request->input('code_meli'),
            'level' => $this->request->input('level'),
            'group' => optional($this->request->input('group')),
        ];

        if($this->request->has('password'))
        {
            $data['password'] = Hash::make($this->request->input('password'));
        }

         return $data;
    }

    public function search($search)
    {
        return $this->repository->search($search);
    }

    protected function importExcelFileAsData($request)
    {
        try{

            return (new StudentImport)->import($request->file('file')->store('temp'));

        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {

            $failures = $e->failures();

            foreach ($failures as $failure)
            {
                $errorMessages[] = [
                    'row' => $failure->row(),
                    'errors' => $failure->errors(),
                ];
            }
        }

        throw ValidationException::withMessages(['exelImportErrors' =>  $errorMessages]);
    }

    protected function isAuthorized($action, $object)
    {
        return $this->authorize($action, $object);
    }
}
