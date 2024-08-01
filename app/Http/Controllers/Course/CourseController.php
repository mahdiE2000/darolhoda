<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseStore;
use App\Imports\CourseImport;
use App\Imports\LessonTeacherImport;
use App\Support\Course\Course;
use Illuminate\Http\Request;
use App\Repositories\CourseRepositoryInterface;
use App\Http\Resources\CourseCollection;
use App\Http\Resources\ShowCourseResource;

class CourseController extends Controller
{
    protected $course;

    public function __construct(Course $course)
    {
        $this->course = $course;
        $this->middleware('auth:admin')->except(['index','show']);
    }

    public function index(Request $request)
    {
        $data = $this->course->getUserCourses($request->get('itemsPerPage'));

        return response()->json(new CourseCollection($data), 200);
    }

    public function store(Request $request)
    {
        if($request->has('file'))
            return (new CourseImport)->import($request->file('file')->store('temp'));

        $this->course->create();

        return response()->json([
            'message' => 'created'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $course = $this->course->getCourse($id);

        return response()->json(new ShowCourseResource($course));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CourseStore $request, string $id)
    {
        $this->course->update($id);

        return response()->json([
            'message' => 'updated'
        ], 200);
    }

    public function search($search)
    {
        return $this->course->search($search);
    }
}
