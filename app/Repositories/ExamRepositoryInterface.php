<?php

namespace App\Repositories;

interface ExamRepositoryInterface
{

    public function getAll();

    public function getExam($id);

//    public function getExamWithScores($id);

    public function getPaginated($count);

    public function create($data);

    public function update($id, $data);

    public function search($search);
}
