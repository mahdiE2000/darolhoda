<?php

namespace App\Http\Controllers\Lesson;

use App\Http\Controllers\Controller;
use App\Http\Resources\LessonPartCollection;
use App\Http\Resources\ShowLessonResource;
use App\Imports\LessonTeacherImport;
use App\Models\Lesson;
use App\Models\Teacher;
use Illuminate\Http\Request;
use App\Repositories\LessonRepositoryInterface;
use App\Http\Resources\LessonCollection;
use App\Http\Requests\LessonStore;

class LessonController extends Controller
{
    protected $repository;

    public function __construct(LessonRepositoryInterface $repository, Request $request)
    {
        $this->repository = $repository;
        $this->middleware('auth:admin')->except(['index','show']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $request->has('part')
            ? response()->json(new LessonPartCollection($this->getClasses()))
            : response()->json(new LessonCollection($this->getPaginatedClasses($request)));
    }

    protected function getClasses()
    {
        return $this->repository->getAll();
    }

    protected function getPaginatedClasses($request)
    {
        return $this->repository->getPaginated($request->get('itemsPerPage'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LessonStore $request)
    {

        if($request->has('file'))
            try {
                return (new LessonTeacherImport)->import($request->file('file')->store('temp'));

            } catch (\Exception)
            {
                return response()->json(['message' => 'success'], 200);
            }

        $lesson = $this->repository->create($request->all());

//        $this->refreshLessonTeachers($request, $lesson->id);

        return response()->json([
            'message' => 'created'
        ],201);
    }

    protected function refreshLessonTeachers(Request $request, $lessonId)
    {
        $teachers = $this->getAllTeachers($request->teachers);

        return $this->repository
                    ->getLesson($lessonId)
                    ->teachers()
                    ->sync($teachers);
    }
    protected function getAllTeachers(array $teacherIds)
    {
        return Teacher::whereIn('id', $teacherIds)->get();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new ShowLessonResource($this->repository->getLesson($id)->load('teachers'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LessonStore $request, string $id)
    {

        $this->repository->update($id, $request->all());

        $this->refreshLessonTeachers($request, $id);

        return response()->json([
            'message' => 'updated'
        ],200);
    }
    public function search($search)
    {
        return $this->repository->search($search);
    }
}
