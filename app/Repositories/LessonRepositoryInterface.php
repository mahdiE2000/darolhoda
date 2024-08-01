<?php

namespace App\Repositories;

interface LessonRepositoryInterface {

    public function getAll();

    public function getPaginated($count);

    public function search($search);

    public function getLesson($id);

    public function create($data);

    public function update($id, $data);

}
