<?php

namespace App\Policies;

use App\Models\Score;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Auth\User as Authenticatable;

class ScorePolicy
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
    public function view(Authenticatable $user, Score $score): bool
    {
        if(auth('teacher')->check())
        {
            return $score->exam->course->teacher_id == $user->id;
        }

        return $score->courseSelected->student_id == auth()->id();
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
    public function update(Authenticatable $user, Score $score, $action): bool
    {
        if($action == 'score' && auth('teacher')->check() || $action == 'answer' && auth('teacher')->check())
        {
            return $score->exam->course->teacher_id == $user->id;
        }

        if($action == 'ask' && auth('student')->check())
        {
            return $score->courseSelected->student_id == auth()->id();
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Authenticatable $user, Score $score): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Authenticatable $user, Score $score): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Authenticatable $user, Score $score): bool
    {
        //
    }
}
