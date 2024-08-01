<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;


class CoursePolicy
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
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Authenticatable $user, Course $course): bool
    {
        return $user->guardCheck('teacher')
                ? $user->id === $course->teacher_id
                : $user->courses()->contains($course->id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Authenticatable $user): bool
    {
        return $user->guardCheck('admin');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Authenticatable $user, Course $course): bool
    {
        return $user->guardCheck('admin');
    }
}
