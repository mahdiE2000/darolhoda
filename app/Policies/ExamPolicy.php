<?php

namespace App\Policies;

use App\Models\Exam;
use App\Models\User;
use App\Repositories\CourseSelectedRepositoryInterface;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Auth\User as Authenticatable;

class ExamPolicy
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
        dd(2);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Authenticatable $user, Exam $exam): bool
    {
        if(auth('teacher')->check())
        {
            return $exam->course->teacher_id == $user->id;
        }
        return true;
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
    public function update(Authenticatable $user, Exam $exam): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Authenticatable $user, Exam $exam): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Authenticatable $user, Exam $exam): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Authenticatable $user, Exam $exam): bool
    {
        //
    }
}
