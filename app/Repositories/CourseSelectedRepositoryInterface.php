<?php

namespace App\Repositories;

interface CourseSelectedRepositoryInterface {
    public function getCourseSelected($id);

    public function getCourseSelectedByIds($ids);

    public function getCourseSelectedStudent($id);

    public function getByUserIdAndCourseId($userId, $courseId);
}
