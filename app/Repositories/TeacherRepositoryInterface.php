<?php

namespace App\Repositories;

interface TeacherRepositoryInterface {

    public function getAll();

    public function getPaginated($count);

    public function getTeacher($id);

    public function findTeacherByEmail($email);

    public function findTeacherByTeacherCode($teacherCode);
    public function create($data);

    public function update($id, $data);

    public function search($search);
}
