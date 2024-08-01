<?php

namespace App\Policies;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Auth\User as Authenticatable;

class TeacherPolicy
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
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Authenticatable $user, Teacher $teacher): bool
    {
        if(auth('teacher')->check()) {
            return $user->id == $teacher->id;
        }
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Authenticatable $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Authenticatable $user, Teacher $teacher): bool
    {

    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Authenticatable $user, Teacher $teacher): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Authenticatable $user, Teacher $teacher): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Authenticatable $user, Teacher $teacher): bool
    {
        //
    }
}
