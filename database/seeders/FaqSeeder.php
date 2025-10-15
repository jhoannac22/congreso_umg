<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => '¿Cuándo se realizará el Congreso de Tecnología UMG 2025?',
                'answer' => 'El Congreso de Tecnología UMG 2025 se llevará a cabo del ' . Carbon::now()->addDays(29)->format('d/m/Y') . ' al ' . Carbon::now()->addDays(40)->format('d/m/Y') . '. Las actividades incluyen talleres, conferencias, competencias y hackathons distribuidos durante estos días.',
                'category' => 'General',
                'order' => 1,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Cómo me registro para participar en el congreso?',
                'answer' => 'Para registrarte, haz clic en el botón "Inscripción" en la página principal. Los estudiantes UMG deben usar su correo institucional (@miumg.edu.gt). Los estudiantes externos pueden registrarse con cualquier correo electrónico válido. Después del registro, recibirás un correo de confirmación con tu código QR único.',
                'category' => 'Registro',
                'order' => 2,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Cuál es el costo de participación?',
                'answer' => 'La mayoría de las actividades son completamente GRATUITAS para todos los participantes. Algunas actividades especiales tienen un costo simbólico: Ethical Hacking (Q50), Arduino e IoT (Q75), y Hackathon (Q100 por equipo). Los estudiantes UMG tienen descuentos adicionales del 50%.',
                'category' => 'Costos',
                'order' => 3,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Puedo inscribirme en múltiples actividades?',
                'answer' => 'Sí, puedes inscribirte en todas las actividades que desees, siempre que no se traslapen en horario. Te recomendamos revisar cuidadosamente el calendario de actividades antes de inscribirte. El sistema te notificará si hay conflictos de horario.',
                'category' => 'Actividades',
                'order' => 4,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Cómo funciona el sistema de asistencia con código QR?',
                'answer' => 'Al registrarte, recibirás un código QR único por correo electrónico. Debes presentar este código al ingresar a cada actividad. El personal del congreso lo escaneará para registrar tu asistencia. Es importante que guardes tu código QR en tu dispositivo móvil o lo imprimas.',
                'category' => 'Asistencia',
                'order' => 5,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Obtendré un diploma de participación?',
                'answer' => 'Sí, todos los participantes que completen al menos el 80% de asistencia en una actividad recibirán un diploma digital. Los diplomas se generan automáticamente al finalizar cada actividad y se envían por correo electrónico. También puedes descargarlos desde tu perfil de participante.',
                'category' => 'Diplomas',
                'order' => 6,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Necesito experiencia previa para participar en los talleres?',
                'answer' => 'Cada taller indica su nivel de dificultad (Principiante, Intermedio, Avanzado). Los talleres para principiantes no requieren experiencia previa. Para talleres avanzados como "Deep Learning" o "Ethical Hacking", se recomienda tener conocimientos básicos del tema. Revisa la descripción completa de cada actividad.',
                'category' => 'Talleres',
                'order' => 7,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Qué debo llevar a los talleres prácticos?',
                'answer' => 'Para todos los talleres te recomendamos traer tu laptop con batería cargada y cargador. Los talleres de programación pueden requerir software específico (te enviaremos la lista por correo). Para talleres de Arduino e IoT, todos los materiales están incluidos. Algunas aulas tienen WiFi disponible.',
                'category' => 'Talleres',
                'order' => 8,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Cómo me inscribo en el Hackathon?',
                'answer' => 'Para el Hackathon puedes inscribirte de forma individual o en equipos de hasta 4 personas. Si te inscribes individualmente, te ayudaremos a formar un equipo. El costo es de Q100 por equipo (no por persona). Los equipos ganadores recibirán premios de Q5,000 (1er lugar), Q3,000 (2do) y Q1,500 (3er).',
                'category' => 'Competencias',
                'order' => 9,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Hay límite de cupos para las actividades?',
                'answer' => 'Sí, cada actividad tiene un límite de participantes por razones de espacio y calidad de la experiencia. Los talleres prácticos suelen tener entre 20-50 cupos. Las conferencias pueden albergar hasta 500 personas. Te recomendamos inscribirte lo antes posible para asegurar tu lugar.',
                'category' => 'Actividades',
                'order' => 10,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Puedo cancelar mi inscripción a una actividad?',
                'answer' => 'Sí, puedes cancelar tu inscripción hasta 48 horas antes del inicio de la actividad desde tu perfil de participante. Para actividades con costo, el reembolso se realizará en un plazo de 5-7 días hábiles. Las cancelaciones tardías no son elegibles para reembolso.',
                'category' => 'Registro',
                'order' => 11,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Dónde se llevarán a cabo las actividades?',
                'answer' => 'Todas las actividades se realizarán en el Campus Central de la Universidad Mariano Gálvez. Cada actividad especifica su ubicación exacta (Auditorio Principal, Laboratorios, Aula Magna, etc.). Te enviaremos un mapa del campus por correo electrónico una semana antes del evento.',
                'category' => 'General',
                'order' => 12,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Hay estacionamiento disponible?',
                'answer' => 'Sí, el campus cuenta con estacionamiento gratuito para participantes del congreso. Te recomendamos llegar con 30 minutos de anticipación para encontrar espacio. También contamos con paradas de transporte público cercanas y servicio de Uber/taxi disponible.',
                'category' => 'Logística',
                'order' => 13,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Habrá servicio de alimentación?',
                'answer' => 'Durante el congreso habrá cafeterías y food trucks disponibles en el campus. Para eventos de día completo como el Hackathon, se proporcionarán snacks y bebidas. No está incluido el almuerzo, pero hay múltiples opciones de comida en los alrededores del campus.',
                'category' => 'Logística',
                'order' => 14,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'question' => '¿Cómo me entero de los ganadores de las competencias?',
                'answer' => 'Los resultados de todas las competencias se publicarán en la sección "Resultados" de esta página web inmediatamente después de cada evento. También enviaremos notificaciones por correo electrónico a todos los participantes. Los ganadores serán contactados directamente para la entrega de premios.',
                'category' => 'Competencias',
                'order' => 15,
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('faqs')->insert($faqs);
    }
}
