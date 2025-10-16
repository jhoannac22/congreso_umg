<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Activity;
use Carbon\Carbon;

class ActividadesOctubre2024Seeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Limpiar actividades existentes
        Activity::query()->delete();

        $this->command->info('🗑️  Actividades anteriores eliminadas');

        // Base de fecha: 12 de octubre de 2024
        $baseDate = Carbon::parse('2024-10-12');

        // Crear 2 actividades por categoría (1 gratis, 1 de pago)
        $activities = [
            // ===== CATEGORÍA 1: Inteligencia Artificial =====
            [
                'category_id' => 1,
                'name' => 'Introducción a Machine Learning',
                'description' => 'Aprende los fundamentos de Machine Learning, algoritmos de clasificación y regresión. Incluye práctica con Python y scikit-learn.',
                'type' => 'taller',
                'start_date' => $baseDate->copy()->setTime(9, 0, 0),
                'end_date' => $baseDate->copy()->setTime(13, 0, 0),
                'location' => 'Aula Magna - Edificio A',
                'max_participants' => 40,
                'requires_registration' => true,
                'requires_payment' => false,
                'price' => 0.00,
                'currency' => 'GTQ',
                'instructor' => 'Dr. Carlos Mendoza',
                'instructor_bio' => 'PhD en Inteligencia Artificial con 10 años de experiencia.',
                'is_active' => true,
            ],
            [
                'category_id' => 1,
                'name' => 'Deep Learning con TensorFlow',
                'description' => 'Taller avanzado de redes neuronales profundas. Construye modelos de visión por computadora y procesamiento de lenguaje natural.',
                'type' => 'taller',
                'start_date' => $baseDate->copy()->setTime(14, 0, 0),
                'end_date' => $baseDate->copy()->setTime(18, 0, 0),
                'location' => 'Laboratorio de IA - Edificio C',
                'max_participants' => 30,
                'requires_registration' => true,
                'requires_payment' => true,
                'price' => 75.00,
                'currency' => 'GTQ',
                'instructor' => 'Ing. Ana García',
                'instructor_bio' => 'Especialista en Deep Learning y redes neuronales.',
                'is_active' => true,
            ],

            // ===== CATEGORÍA 2: Desarrollo Web =====
            [
                'category_id' => 2,
                'name' => 'React y Next.js desde Cero',
                'description' => 'Aprende a crear aplicaciones web modernas con React 18 y Next.js 14. Incluye Server Components y API Routes.',
                'type' => 'taller',
                'start_date' => $baseDate->copy()->setTime(9, 0, 0),
                'end_date' => $baseDate->copy()->setTime(13, 0, 0),
                'location' => 'Laboratorio de Cómputo 1',
                'max_participants' => 35,
                'requires_registration' => true,
                'requires_payment' => false,
                'price' => 0.00,
                'currency' => 'GTQ',
                'instructor' => 'Ing. Roberto Silva',
                'instructor_bio' => 'Full-stack developer con 8 años de experiencia.',
                'is_active' => true,
            ],
            [
                'category_id' => 2,
                'name' => 'Laravel 11: API REST Avanzado',
                'description' => 'Desarrollo de APIs robustas con Laravel 11. Aprende autenticación JWT, testing, caching y arquitectura de microservicios.',
                'type' => 'taller',
                'start_date' => $baseDate->copy()->setTime(14, 0, 0),
                'end_date' => $baseDate->copy()->setTime(18, 0, 0),
                'location' => 'Aula Virtual - Edificio B',
                'max_participants' => 30,
                'requires_registration' => true,
                'requires_payment' => true,
                'price' => 85.00,
                'currency' => 'GTQ',
                'instructor' => 'Ing. María González',
                'instructor_bio' => 'Backend developer especializada en Laravel y PHP.',
                'is_active' => true,
            ],

            // ===== CATEGORÍA 3: Ciberseguridad =====
            [
                'category_id' => 3,
                'name' => 'Ethical Hacking Básico',
                'description' => 'Introducción al hacking ético. Aprende técnicas de penetración y análisis de vulnerabilidades con Kali Linux.',
                'type' => 'taller',
                'start_date' => $baseDate->copy()->setTime(10, 0, 0),
                'end_date' => $baseDate->copy()->setTime(14, 0, 0),
                'location' => 'Laboratorio de Seguridad',
                'max_participants' => 25,
                'requires_registration' => true,
                'requires_payment' => false,
                'price' => 0.00,
                'currency' => 'GTQ',
                'instructor' => 'Lic. Ana Morales',
                'instructor_bio' => 'Pentester certificada CEH con 12 años de experiencia.',
                'is_active' => true,
            ],
            [
                'category_id' => 3,
                'name' => 'Seguridad en Aplicaciones Web',
                'description' => 'Aprende sobre vulnerabilidades web: SQL Injection, XSS, CSRF. Incluye laboratorios prácticos con DVWA.',
                'type' => 'taller',
                'start_date' => $baseDate->copy()->setTime(15, 0, 0),
                'end_date' => $baseDate->copy()->setTime(19, 0, 0),
                'location' => 'Laboratorio de Ciberseguridad',
                'max_participants' => 20,
                'requires_registration' => true,
                'requires_payment' => true,
                'price' => 90.00,
                'currency' => 'GTQ',
                'instructor' => 'Lic. Carlos Ruiz',
                'instructor_bio' => 'Experto en seguridad de aplicaciones web.',
                'is_active' => true,
            ],

            // ===== CATEGORÍA 4: Desarrollo Móvil =====
            [
                'category_id' => 4,
                'name' => 'Flutter: Apps Multiplataforma',
                'description' => 'Crea aplicaciones para iOS y Android con Flutter. Aprende Dart, widgets y publicación en stores.',
                'type' => 'taller',
                'start_date' => $baseDate->copy()->setTime(9, 0, 0),
                'end_date' => $baseDate->copy()->setTime(13, 0, 0),
                'location' => 'Laboratorio Móvil',
                'max_participants' => 28,
                'requires_registration' => true,
                'requires_payment' => false,
                'price' => 0.00,
                'currency' => 'GTQ',
                'instructor' => 'Ing. Luis Herrera',
                'instructor_bio' => 'Mobile developer con apps en App Store y Google Play.',
                'is_active' => true,
            ],
            [
                'category_id' => 4,
                'name' => 'React Native Avanzado',
                'description' => 'Desarrollo avanzado con React Native: animaciones, push notifications, integración con APIs nativas.',
                'type' => 'taller',
                'start_date' => $baseDate->copy()->setTime(14, 0, 0),
                'end_date' => $baseDate->copy()->setTime(18, 0, 0),
                'location' => 'Laboratorio de Cómputo 3',
                'max_participants' => 25,
                'requires_registration' => true,
                'requires_payment' => true,
                'price' => 95.00,
                'currency' => 'GTQ',
                'instructor' => 'Ing. Patricia López',
                'instructor_bio' => 'Senior React Native developer con 6 años de experiencia.',
                'is_active' => true,
            ],

            // ===== CATEGORÍA 5: IoT y Automatización =====
            [
                'category_id' => 5,
                'name' => 'Arduino e IoT: Casa Inteligente',
                'description' => 'Construye tu sistema de casa inteligente con Arduino y ESP32. Aprende sobre sensores y conectividad WiFi.',
                'type' => 'taller',
                'start_date' => $baseDate->copy()->setTime(10, 0, 0),
                'end_date' => $baseDate->copy()->setTime(16, 0, 0),
                'location' => 'Laboratorio de Robótica',
                'max_participants' => 20,
                'requires_registration' => true,
                'requires_payment' => false,
                'price' => 0.00,
                'currency' => 'GTQ',
                'instructor' => 'Ing. Miguel Torres',
                'instructor_bio' => 'Especialista en IoT y sistemas embebidos.',
                'is_active' => true,
            ],
            [
                'category_id' => 5,
                'name' => 'Robótica con Raspberry Pi',
                'description' => 'Construye robots con Raspberry Pi, Python y visión por computadora. Incluye kit de robótica que te llevas.',
                'type' => 'taller',
                'start_date' => $baseDate->copy()->setTime(9, 0, 0),
                'end_date' => $baseDate->copy()->setTime(17, 0, 0),
                'location' => 'Laboratorio de Robótica Avanzada',
                'max_participants' => 15,
                'requires_registration' => true,
                'requires_payment' => true,
                'price' => 150.00,
                'currency' => 'GTQ',
                'instructor' => 'Dr. Elena Vásquez',
                'instructor_bio' => 'Investigadora en robótica con múltiples publicaciones.',
                'is_active' => true,
            ],
        ];

        // Insertar actividades
        foreach ($activities as $activityData) {
            Activity::create($activityData);
        }

        $this->command->info('');
        $this->command->info('✅ Se crearon 10 actividades (2 por categoría)');
        $this->command->info('');
        $this->command->info('📊 RESUMEN POR CATEGORÍA:');
        $this->command->info('   🤖 Inteligencia Artificial: 1 gratis + 1 de pago (Q75)');
        $this->command->info('   🌐 Desarrollo Web: 1 gratis + 1 de pago (Q85)');
        $this->command->info('   🔒 Ciberseguridad: 1 gratis + 1 de pago (Q90)');
        $this->command->info('   📱 Desarrollo Móvil: 1 gratis + 1 de pago (Q95)');
        $this->command->info('   🔧 IoT y Automatización: 1 gratis + 1 de pago (Q150)');
        $this->command->info('');
        $this->command->info('💰 Total: 5 gratis + 5 de pago (Q75 - Q150)');
        $this->command->info('👥 Capacidades: 15 - 40 participantes');
        $this->command->info('📅 Fecha: 12 de Octubre, 2024');
    }
}

