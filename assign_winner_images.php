<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Winner;

echo "=== Asignando imágenes a ganadores ===\n\n";

// Mapeo de nombres de proyectos a archivos de imagen
$imageMapping = [
    'Sistema de IA para Optimización de Código' => 'sistema de IA.jpg',
    'Plataforma de Análisis Predictivo' => 'plataforma de analisis predictivo.jpg',
    'App de ML para Diagnóstico Médico' => 'app de registro medico.jpg',
    'Robot Autónomo con Visión Artificial' => 'Robot Autónomo con Visión Artificial.jpg',
    'Sistema IoT para Smart Home' => 'casa inteligente internet de las cosas.jpg',
    'Drone con Navegación Inteligente' => 'drone.jpg',
];

echo "Imágenes encontradas:\n";
foreach ($imageMapping as $project => $image) {
    echo "  - {$image}\n";
}
echo "\n";

// Obtener todos los ganadores publicados
$winners = Winner::with(['participant', 'activity'])
    ->where('is_published', true)
    ->orderBy('position')
    ->orderBy('activity_id')
    ->get();

echo "Ganadores encontrados: " . $winners->count() . "\n\n";

$assigned = 0;
$notAssigned = 0;

foreach ($winners as $winner) {
    echo "Procesando: {$winner->project_name}\n";
    
    if (isset($imageMapping[$winner->project_name])) {
        $imageFile = $imageMapping[$winner->project_name];
        $imagePath = "winners/{$imageFile}";
        
        // Verificar si el archivo existe
        $fullPath = storage_path("app/public/{$imagePath}");
        if (file_exists($fullPath)) {
            $winner->project_image = $imagePath;
            $winner->save();
            
            echo "  ✅ Asignado: {$imageFile}\n";
            echo "  📍 URL: http://127.0.0.1:8000/storage/{$imagePath}\n";
            $assigned++;
        } else {
            echo "  ❌ Archivo no encontrado: {$imageFile}\n";
            $notAssigned++;
        }
    } else {
        echo "  ⚠️  No hay imagen mapeada para este proyecto\n";
        $notAssigned++;
    }
    echo "\n";
}

echo "=== Resumen ===\n";
echo "Imágenes asignadas: {$assigned}\n";
echo "Ganadores sin imagen: {$notAssigned}\n\n";

echo "=== ¡Completado! ===\n";
echo "Ve a: http://127.0.0.1:8000/winners\n";
echo "Para ver las imágenes en la página de ganadores.\n\n";
