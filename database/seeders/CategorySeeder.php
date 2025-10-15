<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Programación',
                'description' => 'Talleres y competencias relacionadas con desarrollo de software',
                'color' => '#3B82F6',
                'is_active' => true,
            ],
            [
                'name' => 'Robótica',
                'description' => 'Actividades de robótica y automatización',
                'color' => '#10B981',
                'is_active' => true,
            ],
            [
                'name' => 'Inteligencia Artificial',
                'description' => 'Talleres sobre IA, machine learning y data science',
                'color' => '#8B5CF6',
                'is_active' => true,
            ],
            [
                'name' => 'Ciberseguridad',
                'description' => 'Competencias y talleres de seguridad informática',
                'color' => '#EF4444',
                'is_active' => true,
            ],
            [
                'name' => 'Desarrollo Web',
                'description' => 'Talleres de desarrollo frontend y backend',
                'color' => '#F59E0B',
                'is_active' => true,
            ],
            [
                'name' => 'Bases de Datos',
                'description' => 'Actividades sobre diseño y administración de bases de datos',
                'color' => '#06B6D4',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::create($category);
        }
    }
}
