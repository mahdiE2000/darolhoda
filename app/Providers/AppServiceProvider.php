<?php

namespace App\Providers;

use App\Repositories\LessonTeacherRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'App\Repositories\AdminRepositoryInterface',
            'App\Repositories\Eloquent\AdminRepository'
        );
        $this->app->bind(
            'App\Repositories\TeacherRepositoryInterface',
            'App\Repositories\Eloquent\TeacherRepository'
        );
        $this->app->bind(
            'App\Repositories\StudentRepositoryInterface',
            'App\Repositories\Eloquent\StudentRepository'
        );
        $this->app->bind(
            'App\Repositories\CourseRepositoryInterface',
            'App\Repositories\Eloquent\CourseRepository'
        );
        $this->app->bind(
            'App\Repositories\ClassRepositoryInterface',
            'App\Repositories\Eloquent\ClassRepository'
        );
        $this->app->bind(
            'App\Repositories\LessonRepositoryInterface',
            'App\Repositories\Eloquent\LessonRepository'
        );
        $this->app->bind(
            'App\Repositories\ExamRepositoryInterface',
            'App\Repositories\Eloquent\ExamRepository'
        );
        $this->app->bind(
            'App\Repositories\FileRepositoryInterface',
            'App\Repositories\Eloquent\FileRepository'
        );
        $this->app->bind(
            'App\Repositories\ScoreRepositoryInterface',
            'App\Repositories\Eloquent\ScoreRepository'
        );
        $this->app->bind(
            'App\Repositories\SessionRepositoryInterface',
            'App\Repositories\Eloquent\SessionRepository'
        );
        $this->app->bind(
            'App\Repositories\CourseSelectedRepositoryInterface',
            'App\Repositories\Eloquent\CourseSelectedRepository'
        );
        $this->app->bind(
            'App\Repositories\AbsenceRepositoryInterface',
            'App\Repositories\Eloquent\AbsenceRepository'
        );
        $this->app->bind(
            'App\Repositories\LessonTeacherRepositoryInterface',
            'App\Repositories\Eloquent\LessonTeacherRepository'
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
