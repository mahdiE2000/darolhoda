<?php

namespace App\Support\Uploader\Traits;
use App\Models\File;

trait Filable {
    public function files()
    {
        return $this->morphMany(File::class, 'filable');
    }
}