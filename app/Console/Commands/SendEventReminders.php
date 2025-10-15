<?php

namespace App\Console\Commands;

use App\Services\EmailService;
use Illuminate\Console\Command;

class SendEventReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'congreso:send-reminders 
                            {--days=7 : Días antes del evento para enviar el recordatorio}
                            {--date= : Fecha del evento (formato: Y-m-d)}
                            {--time= : Hora del evento (formato: H:i)}
                            {--location= : Ubicación del evento}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Enviar recordatorios masivos del evento a todos los participantes';

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
        $daysUntilEvent = $this->option('days');
        $eventDate = $this->option('date') ?? now()->addDays($daysUntilEvent)->format('d/m/Y');
        $eventTime = $this->option('time') ?? '8:00 AM';
        $eventLocation = $this->option('location') ?? 'Campus Central UMG';

        $this->info("Enviando recordatorios del evento...");
        $this->info("Días hasta el evento: {$daysUntilEvent}");
        $this->info("Fecha del evento: {$eventDate}");
        $this->info("Hora del evento: {$eventTime}");
        $this->info("Ubicación: {$eventLocation}");

        try {
            $this->emailService->sendBulkEventReminders(
                $daysUntilEvent,
                $eventDate,
                $eventTime,
                $eventLocation
            );

            $this->info('✅ Recordatorios enviados exitosamente a todos los participantes.');
        } catch (\Exception $e) {
            $this->error('❌ Error enviando recordatorios: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
}