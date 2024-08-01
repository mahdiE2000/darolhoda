<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentSearchCollection;
use App\Http\Resources\TeacherSearchCollection;
use App\Support\Teacher\Teacher;
use Illuminate\Http\Request;
use App\Http\Resources\TeacherCollection;
use App\Http\Resources\TeacherResource;
use App\Http\Resources\TeacherPartCollection;

class TeacherController extends Controller
{
    protected $teacher;
    public function __construct(Teacher $teacher)
    {
        $this->teacher = $teacher;
        $this->middleware('auth:admin')->except(['show']);
    }

    public function index(Request $request)
    {
        return $request->has('part')
            ? response()->json(new TeacherPartCollection($this->teacher->getTeachers()))
            : response()->json(new TeacherCollection($this->teacher->getPaginatedTeachers()));
    }

    public function store()
    {
        $this->teacher->createTeacher();

        return response()->json([
            'message' => 'success'
        ], 201);
    }

    public function show(string $id)
    {
        $teacher = $this->teacher->getTeacher($id);

        return response()->json([
            'data' => new TeacherResource($teacher)
        ], 200);
    }

    public function update(string $id)
    {
        $this->teacher->updateTeacher($id);

        return response()->json([
            'message' => 'updated'
        ], 200);
    }

    public function search($search)
    {
        return response()->json([
            'data' => new TeacherSearchCollection($this->teacher->search($search))
        ], 200);
    }
}
