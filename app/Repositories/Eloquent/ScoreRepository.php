<?php

namespace App\Repositories\Eloquent;
use App\Models\Score;
use App\Repositories\ScoreRepositoryInterface;

class ScoreRepository implements ScoreRepositoryInterface {

    public function create($data)
    {
       return Score::create($data);
    }

    public function getScore($id)
    {
        return Score::findOrFail($id);
    }

    public function update($id, $score)
    {
        return $this->getScore($id)->update($score);
    }

    public function checkExists($courseSelected, $examId)
    {
        return Score::where('exam_id', $examId)
                    ->where('course_selected_id', $courseSelected)
                    ->exists();
    }
}