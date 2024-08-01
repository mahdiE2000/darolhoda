<?php

namespace App\Support\Admin;

use App\Repositories\AdminRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class Admin {

    public function  __construct(
        readonly AdminRepositoryInterface $repository,
        readonly Request $request,
    ){}

    public function getAdmins()
    {
        return $this->repository->getPaginated($this->request->get('itemsPerPage'));
    }

    public function createAdmin()
    {
        return $this->repository->create($this->data());
    }

    public function getAdmin($id)
    {
        $admin = $this->repository->getAdmin($id);

        $this->isAuthorized('view', $admin);

        return $admin;
    }

    public function updateAdmin($id)
    {
        $this->isAuthorized('update', $this->repository->getAdmin($id));

        return $this->repository->update($id, $this->data());
    }

    protected function data()
    {
        $data = [
            'name' => $this->request->input('name'),
            'last_name' => $this->request->input('lname'),
            'student_code' => $this->request->input('student_code'),
            'phone_number' => $this->request->input('phone'),
            'meli_code' => $this->request->input('code_meli')
        ];

        if($this->request->has('password'))
        {
            $data['password'] = Hash::make($this->request->input('password'));
        }

        return $data;
    }

    protected function isAuthorized($action, $object)
    {
        return $this->authorize($action, $object);
    }
}
