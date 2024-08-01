<?php

namespace App\Repositories\Eloquent;
use App\Models\File;
use App\Repositories\FileRepositoryInterface;
use App\Support\Uploader\StorageManager;

class FileRepository implements FileRepositoryInterface {

    public function getFile($path, $name)
    {
        return File::where('type', $path)->where('name', $name);
    }

    public function delete($path, $name)
    {
        $file = $this->getFile($path, $name)->first();

        if(!is_null($file))
        {
            $file->delete();
        }
        return resolve(StorageManager::class)->deleteFile($name, $path);
    }

}
