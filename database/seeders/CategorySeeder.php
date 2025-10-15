<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Inteligencia Artificial',
                'description' => 'Talleres y competencias sobre IA, Machine Learning y Deep Learning',
                'color' => '#3B82F6',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Desarrollo Web',
                'description' => 'Tecnologías web modernas, frameworks y mejores prácticas',
                'color' => '#10B981',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Ciberseguridad',
                'description' => 'Seguridad informática, ethical hacking y protección de datos',
                'color' => '#EF4444',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Desarrollo Móvil',
                'description' => 'Aplicaciones móviles para iOS, Android y multiplataforma',
                'color' => '#8B5CF6',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'IoT y Automatización',
                'description' => 'Internet de las Cosas, robótica y sistemas embebidos',
                'color' => '#F59E0B',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('categories')->insert($categories);
    }
}
