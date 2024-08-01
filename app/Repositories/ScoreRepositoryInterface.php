<?php

namespace App\Repositories;

interface ScoreRepositoryInterface {

    public function create($data);

    public function checkExists($courseSelected, $examId);

    public function getScore($id);
    
    public function update($id, $score);
}