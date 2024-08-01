<?php

namespace App\Repositories;

interface ClassRepositoryInterface {

    public function getAll();

    public function getPaginated($count);

    public function getClass($id);

    public function create($data);

    public function update($id, $data);

}