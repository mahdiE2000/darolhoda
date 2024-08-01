<?php

namespace Database\Seeders;

use App\Models\StdClass;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StdClassTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        StdClass::factory()->count(50)->create();
    }
}
