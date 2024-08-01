<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Support\Auth\Authentication;
use App\Repositories\AdminRepositoryInterface;
use App\Http\Requests\AdminLogin;

class AuthAdminController extends Controller
{

    protected $auth;
    protected $repository;

    public function __construct(Authentication $auth, AdminRepositoryInterface $repository)
    {
        $this->auth = $auth;
        $this->repository = $repository;
        $this->middleware('guest:admin,teacher,student');
    }

    public function login(AdminLogin $request)
    {
        $admin = $this->repository->findAdminByUserName($request->user_name);
        return $this->auth->authenticate($admin);
    }

    public function logout()
    {
        return $this->auth->logout();
    }

}
