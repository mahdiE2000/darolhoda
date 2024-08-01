<?php

namespace App\Support\Exam;

use App\Repositories\ExamRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
class Exam {

    use AuthorizesRequests;

    public function __construct(
        readonly ExamRepositoryInterface $repository,
        readonly Request $request
    ){}

    public function create()
    {
        return $this->repository->create($this->request->all());
    }

    public function getExamWithScore($id)
    {
        $exam = resolve(ExamRepositoryInterface::class)->getExam($id);

        $this->authorize('view', $exam);

        return $this->getUser()->getExamScore($exam);
    }

    public function getUserExams()
    {
        $exams = $this->getUser()->exams();
        return $exams;
    }

    public function update($id)
    {
        return $this->repository->update($id, $this->request->all());
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
