<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Score extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_selected_id',
        'exam_id',
        'score',
        'ask',
        'answer'
    ];


    public function files()
    {
        return $this->morphMany(File::class, 'filable');
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function courseSelected()
    {
        return $this->belongsTo(CourseSelected::class, 'course_selected_id');
    }
    public function isReportAnswered()
    {
        return $this->answer;
    }
}
