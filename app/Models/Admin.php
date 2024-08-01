<?php

namespace App\Models;

use App\Repositories\CourseRepositoryInterface;
use App\Repositories\ExamRepositoryInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guard = 'admin';

    protected $fillable = [
        'name',
        'last_name',
        'user_name',
        'phone_number',
        'password',
        'meli_code',
    ];

    public function courses($paginateCount=null)
    {
        return resolve(CourseRepositoryInterface::class)->getPaginated($paginateCount);
    }

    public function getSelectedCourse(Course $course)
    {
        return $course->load('class','lesson','teacher', 'members','sessions');
    }

    public function guardCheck($guard)
    {
        return $this->guard === $guard;
    }

    public function exams()
    {
        return resolve(ExamRepositoryInterface::class)->getAll();
    }

    public function getExamScore($exam)
    {
        return $exam->load('scores');
    }
}
