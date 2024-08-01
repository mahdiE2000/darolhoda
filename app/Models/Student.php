<?php

namespace App\Models;

use App\Repositories\CourseSelectedRepositoryInterface;
use App\Repositories\ExamRepositoryInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Repositories\CourseRepositoryInterface;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Student extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guard = 'student';

    protected $fillable = [
        'name',
        'last_name',
        'student_code',
        'phone_number',
        'password',
        'meli_code',
        'father_name',
        'level',
        'group'
    ];

    public function courses($paginateCount=null)
    {
        return $this->belongsToMany(Course::class, CourseSelected::class)->orderBy('class_time', 'desc')->paginate($paginateCount);
    }

    public function setCourseSelected()
    {
        return $this->belongsToMany(Course::class, CourseSelected::class);
    }

    public function getSelectedCourse($course)
    {
        return $course;
    }

    public function exams()
    {
        $courseWithExam = resolve(CourseRepositoryInterface::class)->getCourseExams($this->courses()->load('exams'));

        $exams = $courseWithExam->pluck('exams')->sort()->flatten();

        return $exams;
    }

    public function getExamScore(Exam $exam)
    {
        $courseSelect = (resolve(CourseSelectedRepositoryInterface::class)->getByUserIdAndCourseId($this->id, $exam->course_id));

        abort_unless($courseSelect, 404);

        $scores = $courseSelect->scores;

        foreach ($scores as $score) {
            if ($score->exam_id == $exam->id) {
                $exam->score = $score;
                return $exam;
            }
        }

        return $exam;
    }

    public function guardCheck($guard)
    {
        return $this->guard === $guard;
    }

    public function scores()
    {

    }

    public function getFullNameAttribute()
    {
        return $this->name . " " . $this->last_name;
    }

}
