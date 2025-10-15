<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'question' => '¿Qué es el Congreso de Tecnología UMG?',
                'answer' => 'El Congreso de Tecnología UMG es un evento anual que busca promover la carrera de ingeniería en sistemas entre estudiantes de nivel medio y ofrecer a los alumnos de la facultad una plataforma para participar en diversas actividades académicas y recreativas.',
                'category' => 'general',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'question' => '¿Cómo me inscribo al congreso?',
                'answer' => 'Puedes inscribirte a través de nuestro formulario en línea. Los estudiantes externos deben proporcionar datos como nombre, correo, colegio y teléfono. Los estudiantes internos solo necesitan su correo universitario.',
                'category' => 'inscripcion',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'question' => '¿Cuál es la diferencia entre talleres y competencias?',
                'answer' => 'Los talleres son actividades educativas donde aprendes conceptos y técnicas específicas. Las competencias son eventos competitivos donde puedes demostrar tus habilidades y competir por premios.',
                'category' => 'actividades',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'question' => '¿Hay costo para participar?',
                'answer' => 'Algunas actividades son gratuitas y otras tienen un costo. El precio se indica claramente en la descripción de cada actividad. Los estudiantes de la UMG tienen descuentos especiales.',
                'category' => 'inscripcion',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'question' => '¿Cómo funciona el sistema de asistencia con QR?',
                'answer' => 'Al inscribirte, recibirás un código QR único. Al llegar al evento, escanea tu código en los puntos de registro para marcar tu asistencia. Esto nos ayuda a generar reportes automáticos.',
                'category' => 'general',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'question' => '¿Cuándo recibiré mi diploma?',
                'answer' => 'Los diplomas se generan automáticamente después de completar las actividades. Podrás descargarlo desde tu perfil y también recibirás una copia por correo electrónico.',
                'category' => 'diplomas',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'question' => '¿Puedo participar en múltiples actividades?',
                'answer' => 'Sí, puedes inscribirte en tantas actividades como desees, siempre que no se superpongan en horario y haya cupos disponibles.',
                'category' => 'actividades',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'question' => '¿Qué pasa si no puedo asistir a una actividad?',
                'answer' => 'Si no puedes asistir, puedes cancelar tu inscripción desde tu perfil hasta 24 horas antes del evento. Esto libera tu cupo para otros participantes.',
                'category' => 'actividades',
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($faqs as $faq) {
            \App\Models\Faq::create($faq);
        }
    }
}
