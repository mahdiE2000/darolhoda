<?php

namespace App\Repositories;

interface CourseRepositoryInterface {

    public function getPaginated($count);

    public function getAll();

    public function getCourse($id);

    public function findCourseByTeacher($id);

    public function create($data);

    public function update($id, $data);

    public function getCourseExams($course);

    public function search($search, LessonRepositoryInterface $lesson);
}
