<?php

namespace App\Http\Controllers\Exam;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExamStore;
use App\Http\Resources\ShowExamResource;
use App\Support\Exam\Exam;
use Illuminate\Http\Request;
use App\Http\Resources\ExamCollection;

class ExamController extends Controller
{
    protected $exam;

    public function __construct(Exam $exam)
    {
        $this->exam = $exam;
        $this->middleware('auth:admin,teacher')->except(['index','show']);
    }

    public function index(Request $request)
    {
        $exams = $this->exam->getUserExams();

        return new ExamCollection($exams);
    }

    public function store(ExamStore $request)
    {
        $this->exam->create();

        return response()->json([
            'message' => 'created'
        ], 201);
    }

    public function show(string $id)
    {
        $exam = $this->exam->getExamWithScore($id);

        return response()->json(new ShowExamResource($exam), 200);
    }

    public function update(ExamStore $request, string $id)
    {
        $this->exam->update($id);

        return response()->json([
            'message' => 'updated'
        ], 200);
    }

    public function search($search)
    {
        return $this->exam->search($search);
    }
}
