<?php

namespace App\Models;

use App\Support\Uploader\Traits\Filable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

class Exam extends Model
{
    use HasFactory, Filable;

    protected $fillable = [
        'title',
        'date',
        'course_id',
        'report_start_time',
        'report_end_time',
    ];


    public function scores()
    {
        return $this->hasMany(Score::class);
    }
    public function course()
    {
        return $this->belongsTo(Course::class)->with('members','lesson','teacher','class');
    }

    public function isReportTimeValid()
    {
        $currentTime = Carbon::now();
        return $currentTime->between($this->report_start_time, $this->report_end_time);
    }
}
