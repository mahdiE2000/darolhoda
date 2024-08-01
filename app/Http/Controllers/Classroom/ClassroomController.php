<?php

namespace App\Http\Controllers\Classroom;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClassPartCollection;
use Illuminate\Http\Request;
use App\Repositories\ClassRepositoryInterface;
use App\Http\Resources\ClassCollection;

class ClassroomController extends Controller
{
    protected $repository;

    public function __construct(ClassRepositoryInterface $repository, Request $request)
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
            ? response()->json(new ClassPartCollection($this->getClasses()))
            : response()->json(new ClassCollection($this->getPaginatedClasses($request)));
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
    public function store(Request $request)
    {
        $this->repository->create($request->only('name'));

        return response()->json([
            'message' => 'created'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->repository->getClass($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $this->repository->update($id, $request->only('name'));

        return response()->json([
            'message' => 'updated'
        ],200);
    }
}
