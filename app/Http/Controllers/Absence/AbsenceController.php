<?php

namespace App\Http\Controllers\Absence;

use App\Http\Controllers\Controller;
use App\Http\Requests\AbsenceStore;
use Illuminate\Http\Request;
use App\Support\Absence\Absence;

class AbsenceController extends Controller
{
    protected $absence;

    public function __construct(Absence $absence)
    {
        $this->absence = $absence;
        $this->middleware('auth:admin,teacher');
    }

    public function store(AbsenceStore $request)
    {
        $this->absence->create();

        return response()->json([
            'message' => 'success'
        ]);
    }
}
