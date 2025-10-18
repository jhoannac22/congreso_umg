<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;

echo "=== Cambiando rol de vuelta a participant ===\n\n";

$user = User::where('email', 'yoanncastellanos520@gmail.com')->first();

if ($user) {
    echo "👤 Usuario encontrado: {$user->name}\n";
    echo "📧 Email: {$user->email}\n";
    echo "🔑 Rol actual: {$user->role}\n\n";
    
    $user->role = 'participant';
    $user->save();
    
    echo "✅ ¡Rol cambiado a participant!\n";
    echo "🔑 Nuevo rol: {$user->role}\n\n";
    
    echo "=== Instrucciones ===\n";
    echo "1. Cierra sesión en el navegador\n";
    echo "2. Inicia sesión nuevamente con: yoanncastellanos520@gmail.com\n";
    echo "3. Ahora tendrás acceso a las funciones de participante:\n";
    echo "   - Ver actividades\n";
    echo "   - Inscribirte a talleres/competencias\n";
    echo "   - Ver tus diplomas\n";
    echo "   - Acceso al scanner QR\n";
    echo "4. NO tendrás acceso al Dashboard de Admin\n\n";
    
    echo "=== Para volver a ser admin ===\n";
    echo "Ejecuta: php change_to_admin.php\n\n";
} else {
    echo "❌ Usuario no encontrado\n";
}
