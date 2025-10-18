<?php

namespace Database\Seeders;

use App\Models\Winner;
use App\Models\Activity;
use App\Models\Participant;
use Illuminate\Database\Seeder;

class WinnerSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Obtener competencias (tipo competencia)
        $competitions = Activity::where('type', 'competencia')->get();
        
        if ($competitions->isEmpty()) {
            $this->command->warn('No hay competencias registradas. Ejecuta primero el seeder de actividades.');
            return;
        }
        
        // Obtener participantes
        $participants = Participant::all();
        
        if ($participants->count() < 3) {
            $this->command->warn('Se necesitan al menos 3 participantes registrados.');
            return;
        }
        
        $currentYear = date('Y');
        
        // Crear ganadores para cada competencia
        foreach ($competitions->take(3) as $index => $competition) {
            // Primer lugar
            Winner::create([
                'activity_id' => $competition->id,
                'participant_id' => $participants[$index * 3 % $participants->count()]->id,
                'position' => 1,
                'project_name' => $this->getProjectName($competition->name, 1),
                'project_description' => $this->getProjectDescription($competition->name, 1),
                'project_image' => null, // Se puede subir después desde el admin
                'judges_notes' => 'Excelente proyecto con gran innovación y calidad técnica. Demostró dominio completo del tema.',
                'score' => 95.50,
                'year' => $currentYear,
                'is_published' => true,
            ]);
            
            // Segundo lugar
            Winner::create([
                'activity_id' => $competition->id,
                'participant_id' => $participants[($index * 3 + 1) % $participants->count()]->id,
                'position' => 2,
                'project_name' => $this->getProjectName($competition->name, 2),
                'project_description' => $this->getProjectDescription($competition->name, 2),
                'project_image' => null,
                'judges_notes' => 'Muy buen proyecto con implementación sólida. Pequeñas mejoras pendientes.',
                'score' => 88.75,
                'year' => $currentYear,
                'is_published' => true,
            ]);
            
            // Tercer lugar
            Winner::create([
                'activity_id' => $competition->id,
                'participant_id' => $participants[($index * 3 + 2) % $participants->count()]->id,
                'position' => 3,
                'project_name' => $this->getProjectName($competition->name, 3),
                'project_description' => $this->getProjectDescription($competition->name, 3),
                'project_image' => null,
                'judges_notes' => 'Buen concepto y ejecución. Tiene potencial para desarrollo futuro.',
                'score' => 82.00,
                'year' => $currentYear,
                'is_published' => true,
            ]);
        }
        
        // Crear algunos ganadores de años anteriores
        if ($competitions->count() > 0) {
            Winner::create([
                'activity_id' => $competitions->first()->id,
                'participant_id' => $participants[0]->id,
                'position' => 1,
                'project_name' => 'Sistema de Gestión Académica Inteligente',
                'project_description' => 'Plataforma web que utiliza IA para optimizar la asignación de horarios y recursos en instituciones educativas. Ganador del año anterior.',
                'project_image' => null,
                'judges_notes' => 'Proyecto revolucionario que resuelve un problema real.',
                'score' => 98.00,
                'year' => $currentYear - 1,
                'is_published' => true,
            ]);
        }
        
        $this->command->info('✅ Ganadores de prueba creados exitosamente!');
        $this->command->info('   - Año actual: ' . Winner::where('year', $currentYear)->count() . ' ganadores');
        $this->command->info('   - Años anteriores: ' . Winner::where('year', '<', $currentYear)->count() . ' ganadores');
    }
    
    private function getProjectName(string $activityName, int $position): string
    {
        $projects = [
            1 => [
                'Sistema de IA Predictiva para Análisis de Datos',
                'App de Realidad Aumentada para Educación',
                'Blockchain para Gestión de Certificados Académicos',
                'Plataforma IoT para Smart Campus',
                'Sistema de Reconocimiento Facial con IA',
            ],
            2 => [
                'Asistente Virtual con Procesamiento de Lenguaje Natural',
                'App Móvil para Gestión de Eventos Universitarios',
                'Sistema de Monitoreo Ambiental con Sensores',
                'Plataforma de E-Learning con Gamificación',
                'Chatbot Inteligente para Atención Estudiantil',
            ],
            3 => [
                'Sistema de Recomendación de Cursos con ML',
                'App de Networking para Estudiantes',
                'Dashboard de Análisis de Datos Académicos',
                'Sistema de Control de Asistencia Biométrico',
                'Plataforma de Colaboración en Tiempo Real',
            ],
        ];
        
        return $projects[$position][array_rand($projects[$position])];
    }
    
    private function getProjectDescription(string $activityName, int $position): string
    {
        $descriptions = [
            'Proyecto innovador que implementa tecnologías de vanguardia para resolver problemas reales del sector educativo. Desarrollado con las mejores prácticas de programación y diseño.',
            'Solución tecnológica integral que combina múltiples herramientas y frameworks modernos. Destaca por su interfaz intuitiva y arquitectura escalable.',
            'Aplicación robusta que demuestra excelencia técnica y creatividad en la solución de desafíos complejos. Incluye funcionalidades avanzadas y diseño responsive.',
            'Sistema completo que integra diferentes tecnologías de forma eficiente. Presenta una propuesta de valor clara y ejecución profesional.',
            'Desarrollo técnico de alta calidad con enfoque en la experiencia del usuario. Implementa patrones de diseño modernos y código limpio.',
        ];
        
        return $descriptions[array_rand($descriptions)];
    }
}

