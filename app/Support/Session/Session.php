<?php

namespace App\Support\Session;

use App\Repositories\SessionRepositoryInterface;
use App\Repositories\CourseSelectedRepositoryInterface;

use App\Support\Absence\Absence;
use Illuminate\Http\Request;

class Session {
    protected $repository;
    protected $courseSelectedRepository;

    protected $request;

    protected $absence;
    public function __construct(SessionRepositoryInterface $repository, Request $request,CourseSelectedRepositoryInterface $courseSelectedRepository, Absence $absence)
    {
        $this->repository = $repository;
        $this->request = $request;
        $this->absence = $absence;
        $this->courseSelectedRepository = $courseSelectedRepository;
    }

    public function create()
    {
        return $this->repository->create($this->request->all());
    }

   public function updateAbsences($id)
   {
       return $this->updateWithSession($id);
   }

    public function getSessionsByCourse($courseId)
    {
        return $this->repository->getSessionsByCourseId($courseId);
    }

    public function getSessionWithAbsences($id)
    {
        return $this->repository->getSession($id)->absences;
    }

    public function updateWithSession($sessionId)
    {
        return $this->absence->refreshAbcenses($sessionId, $this->request->absences);
    }

}
