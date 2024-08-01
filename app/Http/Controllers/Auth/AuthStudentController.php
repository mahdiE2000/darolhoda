<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Support\Auth\Authentication;
use App\Repositories\StudentRepositoryInterface;
use App\Http\Requests\StudentLogin;

class AuthStudentController extends Controller
{

    protected $auth;
    protected $repository;

    public function __construct(Authentication $auth, StudentRepositoryInterface $repository)
    {
        $this->auth = $auth;
        $this->repository = $repository;
        $this->middleware('guest:admin,teacher,student');
    }

    public function login(StudentLogin $request)
    {
        $student = $this->repository->findStudentByStudentCode($request->user_name);
        return $this->auth->authenticate($student);
    }

    public function logout()
    {
        return $this->auth->logout();
    }

}
