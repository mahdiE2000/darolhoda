<?php

namespace App\Imports;

use App\Models\Lesson;
use App\Models\Teacher;
use App\Rules\ValidateLesson;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class LessonTeacherImport implements ToModel, WithHeadingRow
{
    use Importable;

    public function model(array $row)
    {
            $teacher = Teacher::where('teacher_code', $row['kd_prondh'])->first();

            if ($teacher)
            {
                $lessons = [];

                for ($i = 1; $i <= 15; $i++)
                {
                    if (!empty($row['tdrys' . $i]))
                    {
                        $lesson = Lesson::where('title', 'like', '%' . $row['tdrys' . $i] . "%")->first();

                        if(is_null($lesson))
                        {
                            $lesson = Lesson::create([
                                'title' => $row['tdrys' . $i],
                            ]);

                            $lessons[] = $lesson->id;
                        } else {
                            $lessons[] = $lesson->id;
                        }
                    }
                }
                $teacher->lessons()->syncWithoutDetaching($lessons);
            }
    }
}
