<?php

namespace App\Repositories\Eloquent;
use App\Repositories\AttendanceRepositoryInterface;

class AttendanceRepository implements AttendanceRepositoryInterface {

    public function create($data)
    {
        return Attendance::create($data);
    }
}
