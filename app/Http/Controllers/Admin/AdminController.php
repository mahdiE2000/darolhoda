<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\Admin\Admin;
use App\Http\Resources\AdminCollection;
use App\Http\Resources\AdminResource;

class AdminController extends Controller
{
    protected $admin;

    public function __construct(Admin $admin)
    {
        $this->admin = $admin;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = $this->admin->getAdmins();
        return response()->json(new AdminCollection($admins), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store()
    {
        $this->admin->createAdmin();

        return response()->json([
            'message' => 'created'
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $admin = $this->admin->getAdmin($id);

        return response()->json([
            'data' => new AdminResource($admin)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id)
    {
        $this->admin->updateAdmin($id);

        return response()->json([
            'message' => 'updated'
        ],200);
    }

}
