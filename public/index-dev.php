<?php

// Configuración temporal para desarrollo
// Forzar HTTP en lugar de HTTPS

if (!defined('LARAVEL_START')) {
    define('LARAVEL_START', microtime(true));
}

// Determinar si la aplicación está en modo mantenimiento
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Registrar el autoloader de Composer
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel y manejar la request
$app = require_once __DIR__.'/../bootstrap/app.php';

// Forzar HTTP para desarrollo
if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
    $_SERVER['HTTPS'] = 'off';
}

$app->handleRequest(\Illuminate\Http\Request::capture());
