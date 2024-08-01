<?php

namespace App\Repositories;

interface FileRepositoryInterface {

    public function getFile($path, $name);

    public function delete($path, $name);
}
