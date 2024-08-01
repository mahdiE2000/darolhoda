<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'unit'];
    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'lesson_teacher');
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
