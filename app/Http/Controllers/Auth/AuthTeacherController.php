<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Support\Auth\Authentication;
use App\Repositories\TeacherRepositoryInterface;
use App\Http\Requests\TeacherLogin;

class AuthTeacherController extends Controller
{

    protected $auth;
    protected $repository;

    public function __construct(Authentication $auth, TeacherRepositoryInterface $repository)
    {
        $this->auth = $auth;
        $this->repository = $repository;
        $this->middleware('guest:admin,teacher,student');
    }

    public function login(TeacherLogin $request)
    {
        $teacher = $this->repository->findTeacherByTeacherCode($request->user_name);
        return $this->auth->authenticate($teacher);
    }

    public function logout()
    {
        return $this->auth->logout();
    }

}
