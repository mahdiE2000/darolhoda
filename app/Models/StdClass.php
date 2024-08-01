<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StdClass extends Model
{
    use HasFactory;

    protected $table = 'classes';

    protected $fillable = ['name'];
}
