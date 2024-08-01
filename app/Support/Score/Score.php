<?php

namespace App\Support\Score;

use App\Repositories\CourseSelectedRepositoryInterface;
use App\Repositories\ExamRepositoryInterface;
use App\Repositories\ScoreRepositoryInterface;
use App\Support\Score\Exceptions\CourseSelectedDoesntMatchWithExamException;
use App\Support\Score\Exceptions\ScoreExistsException;
use App\Support\Score\Exceptions\ScoreFileNotFoundException;
use App\Support\Score\Exceptions\ScoreReportAnsweredException;
use App\Support\Score\Exceptions\ScoreReportTimeExpirationException;
use App\Support\Score\Exceptions\ScoreUpdateActionNotDefinedException;
use App\Support\Uploader\Uploader;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class Score {

    use AuthorizesRequests;

    protected $repository;

    protected $request;

    protected $uploader;
    protected $courseSelectedRepository;
    protected $examRepository;
    public function __construct(
        ScoreRepositoryInterface $repository,
        CourseSelectedRepositoryInterface $courseSelectedRepository,
        ExamRepositoryInterface $examRepository,
        Request $request,
        Uploader $uploader
    )
    {
        $this->repository = $repository;
        $this->courseSelectedRepository = $courseSelectedRepository;
        $this->examRepository = $examRepository;
        $this->request = $request;
        $this->uploader = $uploader;
    }

    public function update($scoreId)
    {
        return match ($this->request->get('action')) {

            'ask' => $this->updateOrCreateReport($scoreId),

            'score' => $this->updateScore($scoreId),

            'answer' => $this->updateOrCreateAnswer($scoreId),

            default => throw new ScoreUpdateActionNotDefinedException,
        };
    }

    public function create()
    {
        $this->authorize('view', $this->examRepository->getExam($this->request->exam_id));

        throw_unless($this->isMatchedCourseSelectedWithExam(), CourseSelectedDoesntMatchWithExamException::class);

        throw_if($this->isScoreExists(), ScoreExistsException::class);

        $score = $this->repository->create($this->request->only('course_selected_id', 'exam_id', 'score'));

        throw_unless($this->uploader->moveFileIntoStorage($score, 'score', $this->generateUniqueScoreFileName($this->request->get('course_selected_id'))) == $this->uploader::SUCCESS, ScoreFileNotFoundException::class);
    }

    public function generateUniqueScoreFileName($courseSelectedId)
    {
        $student = $this->courseSelectedRepository->getCourseSelectedStudent($courseSelectedId);

        $fullName = Str::replace( " ", "_", $student->full_name);

        return $fullName;
    }
    public function getScore($id)
    {
        $score = $this->repository->getScore($id);

        $this->authorize('view', $score);

        return $score;
    }

    protected function updateScore($scoreId)
    {
        $score = $this->repository->getScore($scoreId);

        $this->authorize('update', [$score, 'score']);

        if($this->request->has('attachments'))

            throw_unless( $this->uploader->moveFileIntoStorage($score, 'score', $this->generateUniqueScoreFileName($score->course_selected_id)) == $this->uploader::SUCCESS, ScoreFileNotFoundException::class);

        return $this->repository->update($scoreId, $this->request->only('score'));
    }

    protected function updateOrCreateReport($scoreId)
    {
        $score = $this->repository->getScore($scoreId);

        $this->authorize('update', [$score, 'ask']);

        throw_unless($score->exam->isReportTimeValid(), ScoreReportTimeExpirationException::class);

        throw_if($score->isReportAnswered(), ScoreReportAnsweredException::class);

        $this->repository->update($scoreId, $this->request->only('ask'));
    }

    protected function updateOrCreateAnswer($scoreId)
    {
        $score = $this->repository->getScore($scoreId);

        $this->authorize('update', [$score, 'answer']);

        throw_unless($score->exam->isReportTimeValid(), ScoreReportTimeExpirationException::class);

        return $this->repository->update($scoreId, $this->request->only('answer'));
    }

    protected function isScoreExists()
    {
        return $this->repository->checkExists($this->request->course_selected_id, $this->request->exam_id);
    }

    protected function isMatchedCourseSelectedWithExam()
    {
        $courseSelect = $this->courseSelectedRepository->getCourseSelected($this->request->course_selected_id);

        $exam = $this->examRepository->getExam($this->request->exam_id);

        return $courseSelect->course_id == $exam->course_id;
    }
}
