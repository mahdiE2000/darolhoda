<?php

namespace App\Repositories\Eloquent;
use App\Models\Session;
use App\Repositories\SessionRepositoryInterface;

class SessionRepository implements SessionRepositoryInterface
{
    public function create($data)
    {
        return Session::create($data);
    }

    public function getSession($id)
    {
        return Session::findOrFail($id);
    }
    
    public function getSessionsByCourseId($courseId)
    {
        return Session::where('course_id', $courseId)->get();
    }

}