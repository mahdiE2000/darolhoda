<?php

namespace App\Repositories;

interface AdminRepositoryInterface {

    public function getAll();

    public function getPaginated($count);

    public function getAdmin($id);

    public function findAdminByEmail($email);

    public function findAdminByUserName($username);

    public function create($data);

    public function update($id, $data);
}
