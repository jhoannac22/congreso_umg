<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class ConfigureGmailSMTP extends Command
{
    protected $signature = 'congreso:configure-gmail 
                            {email : Tu email de Gmail}
                            {password : Tu App Password de Gmail}';
    
    protected $description = 'Configurar Gmail SMTP para el sistema de emails';

    public function handle()
    {
        $email = $this->argument('email');
        $password = $this->argument('password');

        $this->info('🔧 Configurando Gmail SMTP...');

        // Crear configuración temporal
        $config = [
            'MAIL_MAILER=smtp',
            'MAIL_HOST=smtp.gmail.com',
            'MAIL_PORT=587',
            "MAIL_USERNAME={$email}",
            "MAIL_PASSWORD={$password}",
            'MAIL_ENCRYPTION=tls',
            "MAIL_FROM_ADDRESS={$email}",
            'MAIL_FROM_NAME="Congreso de Tecnología UMG"',
            'MAIL_TIMEOUT=60',
            'MAIL_VERIFY_PEER=true'
        ];

        // Mostrar configuración
        $this->info('📧 Configuración generada:');
        foreach ($config as $line) {
            $this->line($line);
        }

        $this->warn('⚠️  IMPORTANTE:');
        $this->line('1. Copia estas líneas a tu archivo .env');
        $this->line('2. Asegúrate de usar una App Password, no tu contraseña normal');
        $this->line('3. Ejecuta: php artisan config:clear');
        $this->line('4. Prueba con: php artisan congreso:test-emails --email=' . $email);

        return 0;
    }
}
