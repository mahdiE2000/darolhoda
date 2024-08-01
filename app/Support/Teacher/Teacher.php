<?php

namespace  App\Support\Teacher;

use App\Imports\TeacherImport;
use App\Repositories\TeacherRepositoryInterface;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class Teacher {

     use AuthorizesRequests;

    public function __construct(
        readonly TeacherRepositoryInterface $repository,
        readonly Request $request,
    ){}

    public function getTeachers()
    {
        return $this->repository->getAll();
    }

    public function getPaginatedTeachers()
    {
        return $this->repository->getPaginated($this->request->get('itemsPerPage'));
    }

    public function createTeacher()
    {
        if($this->request->has('file'))
        {
            return $this->importExcelFileAsData($this->request);
        }
        return $this->repository->create($this->data());
    }

    public function getTeacher($id)
    {
        $teacher = $this->repository->getTeacher($id);

        $this->isAuthorized('view', $teacher);

        return $teacher;
    }

    public function updateTeacher($id)
    {
        return $this->repository->update($id, $this->data());
    }

    protected function data()
    {
        $data = [
            'name' => $this->request->input('name'),
            'last_name' => $this->request->input('lname'),
            'teacher_code' => $this->request->input('teacher_code'),
            'phone_number' => $this->request->input('phone'),
            'meli_code' => $this->request->input('code_meli')
        ];

        if($this->request->has('password'))
        {
            $data['password'] = Hash::make($this->request->input('password'));
        }

        return $data;
    }

    protected function importExcelFileAsData($request)
    {
        try{

            return (new TeacherImport)->import($request->file('file')->store('temp'));

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

    public function search($search)
    {
        return $this->repository->search($search);
    }

    protected function isAuthorized($action, $object)
    {
        return $this->authorize($action, $object);
    }
}
