<?php

// Configuración específica para desarrollo
// Este archivo fuerza HTTP y configura el entorno correctamente

// Determinar si la aplicación está en modo mantenimiento
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Registrar el autoloader de Composer
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__.'/../bootstrap/app.php';

// Forzar HTTP para desarrollo local
if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
    $_SERVER['HTTPS'] = 'off';
    $_SERVER['SERVER_PORT'] = '8000';
}

// Configurar URL base para desarrollo
if (!isset($_SERVER['HTTP_HOST'])) {
    $_SERVER['HTTP_HOST'] = '127.0.0.1:8000';
}

// Asegurar que el protocolo sea HTTP
if (!isset($_SERVER['REQUEST_SCHEME'])) {
    $_SERVER['REQUEST_SCHEME'] = 'http';
}

// Manejar la request
$app->handleRequest(\Illuminate\Http\Request::capture());
