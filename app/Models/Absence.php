<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Absence extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_selected_id',
        'session_id',
        'is_excused_absence',
        'reason_excused_absence',
        'delay'
    ];
}
