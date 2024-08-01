<?php

namespace App\Http\Controllers\File;

use App\Http\Controllers\Controller;
use App\Repositories\FileRepositoryInterface;
use App\Support\Uploader\Uploader;
use Illuminate\Http\Request;
use App\Http\Requests\FileStore;


class FileController extends Controller {
    protected $uploader;
    protected $repository;

    public function __construct(Uploader $uploader, FileRepositoryInterface $repository)
    {
        $this->uploader = $uploader;
        $this->repository = $repository;
        $this->middleware('auth:admin,teacher');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(FileStore $request)
    {
        $uploadedFile = $this->uploader->temporaryFileUpload();

        return response()->json([
            'message' => 'uploaded successfully',
            'files' => $uploadedFile
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $path,string $name)
    {
        $this->repository->delete($path, $name);

        return response()->json([
            'message' => 'object successfully deleted'
        ],200);
    }

}
