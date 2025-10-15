<?php

namespace App\Console\Commands;

use App\Mail\EmailVerification;
use App\Mail\EventReminder;
use App\Mail\ParticipantRegistrationConfirmation;
use App\Models\Participant;
use App\Models\User;
use App\Services\EmailService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestEmailSystem extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'congreso:test-emails 
                            {--email= : Email de destino para las pruebas}
                            {--type=all : Tipo de email a probar (all, registration, verification, reminder)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Probar el sistema de emails enviando emails de prueba';

    protected EmailService $emailService;

    /**
     * Create a new command instance.
     */
    public function __construct(EmailService $emailService)
    {
        parent::__construct();
        $this->emailService = $emailService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->option('email') ?? 'test@example.com';
        $type = $this->option('type');

        $this->info("🧪 Probando sistema de emails...");
        $this->info("📧 Email de destino: {$email}");
        $this->info("📋 Tipo de prueba: {$type}");

        try {
            switch ($type) {
                case 'registration':
                    $this->testRegistrationEmail($email);
                    break;
                case 'verification':
                    $this->testVerificationEmail($email);
                    break;
                case 'reminder':
                    $this->testReminderEmail($email);
                    break;
                case 'all':
                default:
                    $this->testAllEmails($email);
                    break;
            }

            $this->info('✅ Pruebas de email completadas exitosamente.');
        } catch (\Exception $e) {
            $this->error('❌ Error en las pruebas: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }

    private function testRegistrationEmail(string $email)
    {
        $this->info('📧 Probando email de confirmación de inscripción...');
        
        // Crear un participante de prueba
        $participant = new Participant([
            'first_name' => 'Juan',
            'last_name' => 'Pérez',
            'email' => $email,
            'phone' => '+502 1234-5678',
            'type' => 'interno',
            'student_id' => '2024001',
            'is_active' => true,
            'created_at' => now(),
        ]);

        Mail::to($email)->send(new ParticipantRegistrationConfirmation($participant));
        $this->info('✅ Email de confirmación enviado.');
    }

    private function testVerificationEmail(string $email)
    {
        $this->info('📧 Probando email de verificación...');
        
        // Crear un usuario de prueba
        $user = new User([
            'name' => 'Juan Pérez',
            'email' => $email,
            'role' => 'participant',
        ]);

        $verificationUrl = url('/verify-email?token=test-token');
        Mail::to($email)->send(new EmailVerification($user, $verificationUrl));
        $this->info('✅ Email de verificación enviado.');
    }

    private function testReminderEmail(string $email)
    {
        $this->info('📧 Probando email de recordatorio...');
        
        // Crear un participante de prueba
        $participant = new Participant([
            'first_name' => 'Juan',
            'last_name' => 'Pérez',
            'email' => $email,
            'phone' => '+502 1234-5678',
            'type' => 'interno',
            'student_id' => '2024001',
            'is_active' => true,
        ]);

        Mail::to($email)->send(new EventReminder(
            $participant,
            7,
            '15/12/2024',
            '8:00 AM',
            'Campus Central UMG',
            []
        ));
        $this->info('✅ Email de recordatorio enviado.');
    }

    private function testAllEmails(string $email)
    {
        $this->testRegistrationEmail($email);
        $this->testVerificationEmail($email);
        $this->testReminderEmail($email);
    }
}