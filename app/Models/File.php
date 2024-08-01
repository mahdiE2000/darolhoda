<?php

namespace App\Models;

use App\Support\Uploader\StorageManager;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'size',
        'is_private'
    ];

    public function filable()
    {
        return $this->morphTo();
    }
}
