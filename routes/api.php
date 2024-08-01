<?php


use App\Http\Controllers\File\TemporaryFileUploaderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {

    Route::group(['namespace' => 'App\Http\Controllers\Auth', 'prefix' => 'auth'], function () {
        // // --------------------- Admin Atuhentication -------------------------//

        Route::controller(AuthAdminController::class)->group(function () {
            Route::post('/admin/login', 'login')->name('admin.login');
            Route::get('/admin/logout', 'logout')->name('admin.logout')->middleware('auth:admin');
        });

        // // --------------------- Teacher Atuhentication -------------------------//

        Route::controller(AuthTeacherController::class)->group(function () {
            Route::post('/teacher/login', 'login')->name('teacher.login');
            Route::get('/teacher/logout', 'logout')->name('teacher.logout')->middleware('auth:teacher');
        });

        // // --------------------- Student Atuhentication -------------------------//

        Route::controller(AuthStudentController::class)->group(function () {
            Route::post('/student/login', 'login')->name('student.login');
            Route::get('/student/logout', 'logout')->name('student.logout')->middleware('auth:student');
        });

    });

    Route::group(['middleware' => 'auth:sanctum'], function() {

        Route::group(['namespace' => 'App\Http\Controllers\Admin'], function () {
            Route::apiResource('admins', AdminController::class);
        });

        Route::group(['namespace' => 'App\Http\Controllers\Teacher'], function () {
            Route::apiResource('teachers', TeacherController::class);
            Route::get('teachers/search/{search}', [App\Http\Controllers\Teacher\TeacherController::class,'search']);
        });

        Route::group(['namespace' => 'App\Http\Controllers\Student'], function () {
            Route::apiResource('students', StudentController::class);
            Route::get('students/search/{search}', [App\Http\Controllers\Student\StudentController::class,'search']);
        });

        Route::group(['namespace' => 'App\Http\Controllers\Course'], function () {
            Route::apiResource('courses', CourseController::class);
            Route::get('lessons/search/{search}', [App\Http\Controllers\Course\CourseController::class,'search']);
        });

        Route::group(['namespace' => 'App\Http\Controllers\Lesson'], function () {
            Route::apiResource('lessons', LessonController::class);
            Route::get('lessons/search/{search}', [App\Http\Controllers\Lesson\LessonController::class,'search']);
        });

        Route::group(['namespace' => 'App\Http\Controllers\Classroom'], function () {
            Route::apiResource('classes', ClassroomController::class);
        });

        Route::group(['namespace' => 'App\Http\Controllers\Exam'], function () {
            Route::apiResource('exams', ExamController::class);
            Route::get('exams/search/{search}', [App\Http\Controllers\Exam\ExamController::class,'search']);
        });

        Route::group(['namespace' => 'App\Http\Controllers\Score'], function () {
            Route::apiResource('scores', ScoreController::class);
        });

        Route::group(['namespace' => 'App\Http\Controllers\File'], function () {
            Route::post('files', [App\Http\Controllers\File\FileController::class,'store']);
            Route::delete('files/{path}/{name}', [App\Http\Controllers\File\FileController::class,'destroy']);
        });

        Route::group(['namespace' => 'App\Http\Controllers\CourseSelected'], function () {
            Route::apiResource('selected-course', CourseSelectedController::class);
        });

        Route::group(['namespace' => 'App\Http\Controllers\Absence'], function () {
            Route::apiResource('absences', AbsenceController::class);
        });

        Route::group(['namespace' => 'App\Http\Controllers\Session'], function () {
            Route::apiResource('sessions', SessionController::class);
        });

        Route::group(['namespace' => 'App\Http\Controllers\Profile'], function () {
            Route::get('/profile', 'ProfileController@show');
            Route::patch('/profile', 'ProfileController@update');
        });
    });

});
