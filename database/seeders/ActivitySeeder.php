<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ActivitySeeder extends Seeder
{
    public function run(): void
    {
        $activities = [
            // Talleres de IA
            [
                'name' => 'Introducción a Machine Learning',
                'description' => 'Aprende los fundamentos de Machine Learning, algoritmos de clasificación y regresión. Incluye práctica con Python y scikit-learn.',
                'type' => 'taller',
                'start_date' => Carbon::now()->addDays(30)->setTime(9, 0),
                'end_date' => Carbon::now()->addDays(30)->setTime(12, 0),
                'location' => 'Aula Magna - Edificio C',
                'max_participants' => 50,
                'current_participants' => 0,
                'price' => 0.00,
                'currency' => 'GTQ',
                'category_id' => 1,
                'is_active' => true,
                'requires_registration' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Deep Learning con TensorFlow',
                'description' => 'Taller avanzado de redes neuronales profundas. Aprende a construir modelos de visión por computadora y procesamiento de lenguaje natural.',
                'type' => 'taller',
                'start_date' => Carbon::now()->addDays(31)->setTime(14, 0),
                'end_date' => Carbon::now()->addDays(31)->setTime(17, 0),
                'location' => 'Laboratorio de Cómputo 3',
                'max_participants' => 30,
                'current_participants' => 0,
                'price' => 0.00,
                'currency' => 'GTQ',
                'category_id' => 1,
                'is_active' => true,
                'requires_registration' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            
            // Talleres de Desarrollo Web
            [
                'name' => 'React y Next.js desde Cero',
                'description' => 'Aprende a crear aplicaciones web modernas con React 18 y Next.js 14. Incluye Server Components, API Routes y despliegue en Vercel.',
                'type' => 'taller',
                'start_date' => Carbon::now()->addDays(32)->setTime(9, 0),
                'end_date' => Carbon::now()->addDays(32)->setTime(13, 0),
                'location' => 'Laboratorio de Cómputo 1',
                'max_participants' => 40,
                'current_participants' => 0,
                'price' => 0.00,
                'currency' => 'GTQ',
                'category_id' => 2,
                'is_active' => true,
                'requires_registration' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Laravel 11: API REST y Microservicios',
                'description' => 'Desarrollo de APIs robustas con Laravel 11. Aprende sobre autenticación, testing, caching y arquitectura de microservicios.',
                'type' => 'taller',
                'start_date' => Carbon::now()->addDays(33)->setTime(14, 0),
                'end_date' => Carbon::now()->addDays(33)->setTime(18, 0),
                'location' => 'Aula Virtual',
                'max_participants' => 35,
                'current_participants' => 0,
                'price' => 0.00,
                'currency' => 'GTQ',
                'category_id' => 2,
                'is_active' => true,
                'requires_registration' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            
            // Talleres de Ciberseguridad
            [
                'name' => 'Ethical Hacking y Pentesting',
                'description' => 'Introducción al hacking ético. Aprende técnicas de penetración, análisis de vulnerabilidades y uso de herramientas como Kali Linux.',
                'type' => 'taller',
                'start_date' => Carbon::now()->addDays(34)->setTime(10, 0),
                'end_date' => Carbon::now()->addDays(34)->setTime(14, 0),
                'location' => 'Laboratorio de Seguridad',
                'max_participants' => 25,
                'current_participants' => 0,
                'price' => 50.00,
                'currency' => 'GTQ',
                'category_id' => 3,
                'is_active' => true,
                'requires_registration' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            
            // Competencias
            [
                'name' => 'Hackathon UMG 2025',
                'description' => '24 horas de innovación y programación. Forma tu equipo y desarrolla una solución tecnológica para resolver un problema real. Premios de Q5,000 para el primer lugar.',
                'type' => 'competencia',
                'start_date' => Carbon::now()->addDays(35)->setTime(8, 0),
                'end_date' => Carbon::now()->addDays(36)->setTime(8, 0),
                'location' => 'Campus Central UMG',
                'max_participants' => 100,
                'current_participants' => 0,
                'price' => 100.00,
                'currency' => 'GTQ',
                'category_id' => 2,
                'is_active' => true,
                'requires_registration' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Competencia de Programación Algorítmica',
                'description' => 'Resuelve problemas algorítmicos en tiempo real. Pon a prueba tus habilidades en estructuras de datos, algoritmos y pensamiento lógico.',
                'type' => 'competencia',
                'start_date' => Carbon::now()->addDays(37)->setTime(15, 0),
                'end_date' => Carbon::now()->addDays(37)->setTime(19, 0),
                'location' => 'Auditorio Principal',
                'max_participants' => 60,
                'current_participants' => 0,
                'price' => 0.00,
                'currency' => 'GTQ',
                'category_id' => 2,
                'is_active' => true,
                'requires_registration' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            
            // Desarrollo Móvil
            [
                'name' => 'Flutter: Apps Multiplataforma',
                'description' => 'Crea aplicaciones para iOS y Android con una sola base de código. Aprende Dart, widgets, gestión de estado y publicación en stores.',
                'type' => 'taller',
                'start_date' => Carbon::now()->addDays(38)->setTime(9, 0),
                'end_date' => Carbon::now()->addDays(38)->setTime(13, 0),
                'location' => 'Laboratorio Móvil',
                'max_participants' => 30,
                'current_participants' => 0,
                'price' => 0.00,
                'currency' => 'GTQ',
                'category_id' => 4,
                'is_active' => true,
                'requires_registration' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            
            // IoT
            [
                'name' => 'Arduino e IoT: Casa Inteligente',
                'description' => 'Construye tu propio sistema de casa inteligente. Aprende a programar Arduino, conectar sensores y crear dashboards de control.',
                'type' => 'taller',
                'start_date' => Carbon::now()->addDays(39)->setTime(14, 0),
                'end_date' => Carbon::now()->addDays(39)->setTime(18, 0),
                'location' => 'Laboratorio de Robótica',
                'max_participants' => 20,
                'current_participants' => 0,
                'price' => 75.00,
                'currency' => 'GTQ',
                'category_id' => 5,
                'is_active' => true,
                'requires_registration' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            
            // Conferencias
            [
                'name' => 'Conferencia Inaugural: El Futuro de la IA',
                'description' => 'Expertos internacionales discuten el impacto de la Inteligencia Artificial en la sociedad, ética en IA y tendencias futuras. Conferencia gratuita abierta al público.',
                'type' => 'taller',
                'start_date' => Carbon::now()->addDays(29)->setTime(18, 0),
                'end_date' => Carbon::now()->addDays(29)->setTime(20, 0),
                'location' => 'Auditorio Principal',
                'max_participants' => 500,
                'current_participants' => 0,
                'price' => 0.00,
                'currency' => 'GTQ',
                'category_id' => 1,
                'is_active' => true,
                'requires_registration' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('activities')->insert($activities);
    }
}
