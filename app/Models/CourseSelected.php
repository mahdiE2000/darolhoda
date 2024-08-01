<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourseSelected extends Pivot
{

    protected $table = 'course_selected';

    public function scores()
    {
        return $this->hasMany(Score::class, 'course_selected_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function countAbcenses()
    {
        $count = 0;

        $sessions = Session::where('course_id', $this->course_id)->get();
        foreach($sessions as $session)
        {
           if(Absence::where('session_id', $session->id)->where('course_selected_id', $this->id)->exists())
           {
                $count += 1;
           }
        }

        return $count;
    }
}
