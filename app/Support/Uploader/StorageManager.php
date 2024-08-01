<?php

namespace App\Support\Uploader;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;


class StorageManager {

    public function putFileAsPrivate(string $name, UploadedFile $file, string $type)
    {
        return Storage::disk('private')->putFileAs($type, $file, $name);
    }

    public function putFileAsPublic(string $name, UploadedFile $file, string $type)
    {
        return Storage::disk('public')->putFileAs($type, $file, $name);
    }

    public function moveFileAsPublic(string $source, string $path, string $name)
    {
        return Storage::disk('public')->move($source, $this->directoryPrefix($name, $path));
    }

    public function getFileSizeOf(string $name, string $type, bool $isPrivate)
    {
        return $this->disk($isPrivate)->size($this->directoryPrefix($name, $type));
    }

    public function getAbsolutePathOf(string $name, string $type, bool $isPrivate)
    {
        return $this->disk($isPrivate)->path($this->directoryPrefix($name, $type));
    }

    public function isFileExists(string $name, string $type, bool $isPrivate)
    {
        return $this->disk($isPrivate)->exists($this->directoryPrefix($name, $type));
    }

    public function getFile(string $name, string $type, bool $isPrivate)
    {
        return $this->disk($isPrivate)->download($this->directoryPrefix($name, $type));
    }

    public function deleteFile(string $name, string $type, bool $isPrivate=false)
    {
        return $this->disk($isPrivate)->delete($this->directoryPrefix($name, $type));
    }

    public function directoryPrefix($name, $type)
    {
        return $type . DIRECTORY_SEPARATOR . $name;
    }

    private function disk(bool $isPrivate)
    {
        return $isPrivate ? Storage::disk('private') : Storage::disk('public');
    }

}
