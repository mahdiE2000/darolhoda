<?php

namespace App\Imports;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Student;
use App\Models\Teacher;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CourseSelectedImport implements ToModel, WithHeadingRow
{
    use Importable;

    public function model(array $row)
    {
        $student = Student::where('student_code', $row['kd_tlbh'])->first();

        if ($student)
        {
            $courses = [];

            for ($i = 1; $i <= 15; $i++)
            {
                if (! empty($row['drs_' . $i]))
                {
                    $course = Course::findOrFail($row['drs_' . $i]);

                    is_null($course) ?: $courses[] = $row['drs_' . $i];
                }
            }
            $student->setCourseSelected()->syncWithoutDetaching($courses);
        }
    }
}
