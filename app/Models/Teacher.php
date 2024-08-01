<?php

namespace App\Models;

use App\Repositories\ExamRepositoryInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Repositories\CourseRepositoryInterface;
use App\Models\Course;

class Teacher extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guard = 'teacher';

    protected $fillable = [
        'name',
        'last_name',
        'teacher_code',
        'phone_number',
        'password',
        'meli_code',
    ];

    public function courses($paginateCount=null)
    {
        return $this->hasMany(Course::class)->orderBy('class_time', 'desc')->paginate($paginateCount);
    }

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class, 'lesson_teacher');
    }

    public function exams()
    {
        $courseWithExam = resolve(CourseRepositoryInterface::class)->getCourseExams($this->courses()->load('exams'));

        $exams = $courseWithExam->pluck('exams')->sort()->flatten();

        return $exams;
    }


    public function getSelectedCourse(Course $course)
    {
        return $course->load('class','lesson','teacher', 'members','sessions');
    }

    public function guardCheck($guard)
    {
        return $this->guard === $guard;
    }

    public function getExamScore(Exam $exam)
    {
        return $exam->load('scores');
    }


}
