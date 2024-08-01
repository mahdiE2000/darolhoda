<?php

namespace App\Imports;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Student;
use App\Models\Teacher;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CourseImport implements ToModel, WithHeadingRow
{
    use Importable;
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $teacher = Teacher::where('teacher_code', $row['kd_prondh'])->first();

        if ($teacher)
        {
            for ($i = 1; $i <= 15; $i++)
            {
                if (! empty($row['tdrys' . $i]))
                {
                    $lesson = Lesson::where('title', 'like', '%' .  $row['tdrys' . $i] . "%")->first();

                    if(
                        ! is_null($lesson) &&
                        ! Course::where('teacher_id',$teacher->id)->where('lesson_id',$lesson->id)->exists()
                    )
                    {
                        Course::create([
                            'class_id' => 1,
                            'teacher_id' => $teacher->id,
                            'lesson_id' => $lesson->id,
                            'class_time' => now(),
                            'exam_time' => now(),
                        ]);
                    }
                }
            }
        }
    }
}
