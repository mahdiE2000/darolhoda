<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\StudentStore;
use App\Http\Requests\StudentUpdate;
use App\Http\Resources\StudentPartCollection;
use App\Support\Student\Student;
use Illuminate\Http\Request;
use App\Http\Resources\StudentCollection;
use App\Http\Resources\StudentResource;
use App\Http\Resources\StudentSearchCollection;
use App\Repositories\StudentRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    protected $student;

    public function __construct(Student $student)
    {
        $this->student = $student;
        $this->middleware('auth:admin')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $students = $request->has('course_id')
            ? new StudentPartCollection($this->student->getStudentsCourse())
            : new StudentCollection($this->student->getPaginatedStudents());

        return response()->json($students);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StudentStore $request)
    {
        $this->student->createStudent();

        return response()->json([
            'message' => 'created'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $student = $this->student->getStudent($id);

        return response()->json([
            'data' => new StudentResource($student)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id)
    {
        $this->student->updateStudent($id);

        return response()->json([
            'message' => 'updated'
        ], 200);
    }

    public function search($search)
    {
        // return $search;
        return response()->json([
            'data' => new StudentSearchCollection($this->student->search($search))
        ], 200);
    }
}
