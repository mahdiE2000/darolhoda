<?php

namespace App\Http\Controllers\CourseSelected;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseSelectedStore;
use App\Support\CourseSelect\Courseselect;
use Illuminate\Http\Request;
use App\Repositories\CourseRepositoryInterface;
use App\Models\Student;
use Illuminate\Support\Arr;

class CourseSelectedController extends Controller
{

    protected $courseselect;

    public function __construct(Courseselect $courseselect)
    {
        $this->courseselect = $courseselect;
        $this->middleware('auth:admin');
    }

    public function store()
    {

        $this->courseselect->create();

        return response()->json([
            'message' => 'success'
        ], 201);
    }
}
