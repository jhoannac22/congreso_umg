<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;

echo "=== Cambiando rol a admin ===\n\n";

$user = User::where('email', 'yoanncastellanos520@gmail.com')->first();

if ($user) {
    echo "👤 Usuario encontrado: {$user->name}\n";
    echo "📧 Email: {$user->email}\n";
    echo "🔑 Rol actual: {$user->role}\n\n";
    
    $user->role = 'admin';
    $user->save();
    
    echo "✅ ¡Rol cambiado a admin!\n";
    echo "🔑 Nuevo rol: {$user->role}\n\n";
    
    echo "=== Instrucciones ===\n";
    echo "1. Cierra sesión en el navegador\n";
    echo "2. Inicia sesión nuevamente con: yoanncastellanos520@gmail.com\n";
    echo "3. Ahora tendrás acceso completo al Dashboard de Admin:\n";
    echo "   - Dashboard principal\n";
    echo "   - Panel de Diplomas Admin\n";
    echo "   - Panel de Asistencia Admin\n";
    echo "   - Panel de Ganadores Admin\n";
    echo "   - Todas las funciones de administración\n\n";
    
    echo "=== Para volver a ser participant ===\n";
    echo "Ejecuta: php change_to_participant.php\n\n";
} else {
    echo "❌ Usuario no encontrado\n";
}
