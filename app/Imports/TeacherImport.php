<?php

namespace App\Imports;

use App\Models\Teacher;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class TeacherImport implements ToModel, WithBatchInserts, WithChunkReading, WithHeadingRow, WithValidation
{
    use importable;
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Teacher([
            'name' => $row['nam'],
            'last_name' => $row['nam_khanoadgy'],
            'father_name' => $row['nam_pdr'],
            'meli_code' => $row['kd_mly'],
            'teacher_code' => $row['kd_prondh'],
            'phone_number' => $row['shmarh_tmas'],
            'password' => $row['gthroazhh'] ? Hash::make($row['gthroazhh']) : Hash::make($row['kd_mly']),
        ]);
    }
    public function uniqueBy()
    {
        return 'teacher_code';
    }

    public function batchSize(): int
    {
        return 1000;
    }
    public function rules(): array
    {
        return [
            'nam' => ['string'],
            'nam_khanoadgy' => ['string', 'nullable'],
            'nam_pdr' => [ 'string', 'nullable'],
            'shmarh_tmas' => ['unique:teachers,phone_number'],
            'kd_mly' => ['unique:teachers,meli_code'],
            'gthroazhh' => ['min:8','nullable']
        ];
    }

    public function customValidationAttributes()
    {
        return [
            'nam' => 'نام',
            'nam_khanoadgy' => 'نام خانوادگی',
            'nam_pdr' => 'نام پدر',
            'kd_prondh' => 'کد  پرونده',
            'shmarh_tmas' => 'شماره تماس',
            'kd_mly' => 'کد ملی',
            'gthroazhh' => 'گذرواژه',
        ];
    }
    public function chunkSize(): int
    {
        return 1000;
    }
}
