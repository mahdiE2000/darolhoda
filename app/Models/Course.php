<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\StudentCourse;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'teacher_id',
        'lesson_id',
        'class_id',
        'class_time',
        'exam_time',
        'description'
    ];

    public function getRouteKeyName()
    {
        return 'id';
    }

    public function members()
    {
        return $this->belongsToMany(Student::class,CourseSelected::class)->orderBy('last_name', 'ASC')->withPivot('id');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function class()
    {
        return $this->belongsTo(StdClass::class);
    }

    public function exam()
    {
        return $this->hasMany(Exam::class)->select('id', 'title', 'date');
    }

    public function exams()
    {
        return $this->hasMany(Exam::class);
    }
}
