<?php

namespace App\Repositories\Eloquent;
use App\Repositories\ClassRepositoryInterface;
use App\Models\StdClass;

class ClassRepository implements ClassRepositoryInterface {

    public function getAll()
    {
		return StdClass::orderBy('created_at', 'desc')->get();
    }

    public function getPaginated($count)
    {
        return StdClass::orderBy('created_at', 'desc')->paginate($count)->withQueryString(['itemsPerPage' => $count]);
    }

    public function getClass($id)
    {
        return StdClass::findOrFail($id);
    }

    public function create($data)
    {
        return StdClass::create($data);
    }

    public function update($id, $data)
    {
        return StdClass::find($id)->update($data);
    }

}
