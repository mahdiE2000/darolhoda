<?php

namespace App\Repositories\Eloquent;
use App\Models\Absence;
use App\Repositories\AbsenceRepositoryInterface;

class AbsenceRepository implements AbsenceRepositoryInterface {

    public function insert($data)
    {
        return Absence::insert($data);
    }
}