<?php

namespace App\Support\Course;
use App\Repositories\CourseRepositoryInterface;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class Course {

    use AuthorizesRequests;

    public function __construct(
        readonly CourseRepositoryInterface $repository,
        readonly Request $request,
    ){}

    public function getUserCourses($paginateCount=null)
    {
        return $this->getUser()->courses($paginateCount);
    }

    public function create()
    {
        return $this->repository->create($this->request->all());
    }

    public function update($id)
    {
        return $this->repository->update($id, $this->request->all());
    }

    public function getCourse($id)
    {
        $course = $this->repository->getCourse($id);

        $this->authorize('view', $course);

        return $this->request->user()->getSelectedCourse($course); // use ploicy and edit this
    }

    protected function getUser()
    {
        return $this->request->user();
    }

    public function search($search)
    {
        return $this->repository->search($search);
    }

}
