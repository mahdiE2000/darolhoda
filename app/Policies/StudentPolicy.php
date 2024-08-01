<?php

namespace App\Policies;

use App\Models\Student;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Auth\User as Authenticatable;


class StudentPolicy
{
    public function before(Authenticatable $user, string $ability): bool|null
    {
        if($user->guardCheck('admin'))
        {
            return true;
        }
        return null;
    }
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Authenticatable $user): bool
    {
        return $user->guardCheck('admin');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Authenticatable $user, Student $student): bool
    {
        if(auth('student')->check()) {
            return $user->id == $student->id;
        }
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Student $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Student $user, Student $student): bool
    {
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Student $user, Student $student): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Student $user, Student $student): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Student $user, Student $student): bool
    {
        //
    }
}
