<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programacionCategory = \App\Models\Category::where('name', 'Programación')->first();
        $webCategory = \App\Models\Category::where('name', 'Desarrollo Web')->first();
        $iaCategory = \App\Models\Category::where('name', 'Inteligencia Artificial')->first();
        $roboticsCategory = \App\Models\Category::where('name', 'Robótica')->first();

        $activities = [
            // Talleres
            [
                'category_id' => $programacionCategory->id,
                'name' => 'Taller de Python para Principiantes',
                'description' => 'Aprende los fundamentos de Python desde cero. Ideal para estudiantes que quieren iniciarse en la programación.',
                'type' => 'taller',
                'start_date' => now()->addDays(30)->setTime(9, 0),
                'end_date' => now()->addDays(30)->setTime(12, 0),
                'location' => 'Aula 101',
                'max_participants' => 25,
                'requirements' => 'Conocimientos básicos de computación',
                'materials' => 'Laptop con Python instalado',
                'cost' => 0,
                'instructor' => 'Dr. Carlos Mendoza',
                'instructor_bio' => 'Doctor en Ciencias de la Computación con 15 años de experiencia en Python',
                'is_active' => true,
                'requires_approval' => false,
            ],
            [
                'category_id' => $webCategory->id,
                'name' => 'Taller de React y Laravel',
                'description' => 'Desarrollo de aplicaciones web modernas usando React en el frontend y Laravel en el backend.',
                'type' => 'taller',
                'start_date' => now()->addDays(32)->setTime(14, 0),
                'end_date' => now()->addDays(32)->setTime(18, 0),
                'location' => 'Laboratorio de Sistemas',
                'max_participants' => 20,
                'requirements' => 'Conocimientos básicos de HTML, CSS y JavaScript',
                'materials' => 'Laptop con Node.js y Composer instalados',
                'cost' => 50,
                'instructor' => 'Ing. María González',
                'instructor_bio' => 'Ingeniera en Sistemas especializada en desarrollo web full-stack',
                'is_active' => true,
                'requires_approval' => true,
            ],
            [
                'category_id' => $iaCategory->id,
                'name' => 'Introducción a Machine Learning',
                'description' => 'Taller práctico sobre los conceptos básicos de machine learning y sus aplicaciones.',
                'type' => 'taller',
                'start_date' => now()->addDays(35)->setTime(10, 0),
                'end_date' => now()->addDays(35)->setTime(16, 0),
                'location' => 'Aula 205',
                'max_participants' => 30,
                'requirements' => 'Conocimientos básicos de Python y matemáticas',
                'materials' => 'Laptop con Jupyter Notebook instalado',
                'cost' => 75,
                'instructor' => 'Dr. Ana Rodríguez',
                'instructor_bio' => 'Investigadora en IA con publicaciones en revistas internacionales',
                'is_active' => true,
                'requires_approval' => true,
            ],

            // Competencias
            [
                'category_id' => $programacionCategory->id,
                'name' => 'Competencia de Programación en C++',
                'description' => 'Competencia individual de resolución de problemas algorítmicos usando C++.',
                'type' => 'competencia',
                'start_date' => now()->addDays(40)->setTime(8, 0),
                'end_date' => now()->addDays(40)->setTime(12, 0),
                'location' => 'Laboratorio de Programación',
                'max_participants' => 50,
                'requirements' => 'Conocimientos avanzados de C++ y algoritmos',
                'materials' => 'Laptop con compilador de C++',
                'cost' => 0,
                'instructor' => 'Prof. Luis Martínez',
                'instructor_bio' => 'Profesor de algoritmos y estructuras de datos',
                'is_active' => true,
                'requires_approval' => false,
            ],
            [
                'category_id' => $roboticsCategory->id,
                'name' => 'Competencia de Robótica',
                'description' => 'Competencia de construcción y programación de robots para resolver desafíos específicos.',
                'type' => 'competencia',
                'start_date' => now()->addDays(45)->setTime(9, 0),
                'end_date' => now()->addDays(45)->setTime(17, 0),
                'location' => 'Gimnasio Principal',
                'max_participants' => 15,
                'requirements' => 'Conocimientos básicos de electrónica y programación',
                'materials' => 'Kits de robótica proporcionados por la universidad',
                'cost' => 100,
                'instructor' => 'Ing. Roberto Silva',
                'instructor_bio' => 'Ingeniero en Mecatrónica con experiencia en competencias internacionales',
                'is_active' => true,
                'requires_approval' => true,
            ],
        ];

        foreach ($activities as $activity) {
            \App\Models\Activity::create($activity);
        }
    }
}
