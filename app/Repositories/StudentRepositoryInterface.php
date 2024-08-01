<?php

namespace App\Repositories;

interface StudentRepositoryInterface {

    public function getAll();

    public function getPaginated($count);

    public function search($search);

    public function getStudentCourseSelected($courseId);

    public function getStudent($id);

    public function getStudentByIds($ids);

    public function findStudentByEmail($email);

    public function findStudentByStudentCode($studentCode);

    public function create($data);

    public function update($id, $data);
}
