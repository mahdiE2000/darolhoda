<?php

namespace App\Support\Uploader;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class Uploader {

    private $request;
    private $storageManager;
    private $file;

    const SUCCESS = 'success';
    const FAILED = 'failed';

    public function __construct(Request $request, StorageManager $storageManager)
    {
        $this->request = $request;
        $this->storageManager = $storageManager;
        $this->file = $request->file;
    }

    public function temporaryFileUpload()
    {
        return $this->storageManager->putFileAsPublic($this->generateUniqueName(), $this->file, 'temp');
    }

    private function saveFileIntoDatabase(Model $model,string $name, string $path)
    {
        $file = $model->files()->create([
            'name' => $name,
            'size' => $this->getFileSize($name, $path),
            'type' => $path,
            'is_private' => $this->isPrivate()
        ]);

        return $file;
    }

    private function getFileSize($name,$path)
    {
        return $this->storageManager->getFileSizeOf($name, $path, $this->isPrivate());
    }

    public function moveFileIntoStorage(Model $model, string $destination, string $name=null, string $temp='temp')
    {

        foreach($this->request->attachments as $file)
        {
            if(! $this->isFileExists(basename($file), $temp))
            {
                return static::FAILED;
            }
            $fileName = $name . "_" . uniqid() . "." . File::extension($file) ?? basename($file);

            $this->storageManager->moveFileAsPublic($file, $destination, $fileName);

            $this->saveFileIntoDatabase($model, $fileName, $destination);
        }

        return static::SUCCESS;
    }

    private function generateUniqueName()
    {
        return $this->file->hashName();
    }

    private function isPrivate()
    {
        return $this->request->has('is-private');
    }

    private function isFileExists($name, $path)
    {
        return $this->storageManager->isFileExists($name, $path, $this->isPrivate());
    }
}
