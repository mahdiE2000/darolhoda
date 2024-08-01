<?php

namespace App\Http\Controllers\Session;

use App\Http\Controllers\Controller;
use App\Http\Resources\ShowSessionResource;
use App\Support\Session\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{

    public function __construct(Session $session)
    {
        $this->session = $session;
        $this->middleware('auth:admin,teacher');
    }

    public function index(Request $request)
    {
        return $this->session->getSessionsByCourse($request->get('course_id'));
    }
    public function show(string $id)
    {
        return response()->json(new ShowSessionResource($this->session->getSessionWithAbsences($id)));
    }

    public function store(Request $request)
    {
        dd(1);
    }

    public function update(Request $request, $id)
    {
        $this->session->updateWithSession($id);

        return response()->json([
            'message' => 'succcess',
        ]);
    }
}
