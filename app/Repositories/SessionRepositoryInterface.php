<?php

namespace App\Repositories;
 

interface SessionRepositoryInterface {

    public function create($data);

    public function getSession($id);

    public function getSessionsByCourseId($courseId);  

}