<?php

namespace App\Repositories\Eloquent;
use App\Models\Admin;
use App\Repositories\AdminRepositoryInterface;

class AdminRepository implements AdminRepositoryInterface{

    public function getAll()
    {
		return Admin::all();
    }

    public function getPaginated($count)
    {
        return Admin::paginate($count);
    }

    public function getAdmin($id)
    {
        return Admin::findOrFail($id);
    }

    public function findAdminByEmail($email)
    {
        return Admin::where('email', $email)->firstOrFail();
    }

    public function findAdminByUserName($username)
    {
        return Admin::where('user_name', $username)->firstOrFail();
    }

    public function create($data)
    {
        return Admin::create($data);
    }

    public function update($id, $data)
    {
        return Admin::find($id)->update($data);
    }
}
