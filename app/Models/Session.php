<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Session extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'date'
    ];

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }

    public function courseSelectedAbcenses()
    {
        return $this->belongsToMany(CourseSelected::class, Absence::class,'session_id', 'course_selected_id');
    }

    public function isSessionFinished()
    {
        return $this->date->diffInMinutes(now(), false);
    }
}
