<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Configuración del Sistema de Email del Congreso
    |--------------------------------------------------------------------------
    |
    | Esta configuración maneja todos los aspectos relacionados con el
    | envío de emails del sistema de congreso.
    |
    */

    'defaults' => [
        'from_address' => env('MAIL_FROM_ADDRESS', 'congreso@umg.edu.gt'),
        'from_name' => env('MAIL_FROM_NAME', 'Congreso de Tecnología UMG'),
        'reply_to' => env('MAIL_REPLY_TO', 'noreply@umg.edu.gt'),
    ],

    'templates' => [
        'registration_confirmation' => [
            'subject' => '¡Confirmación de Inscripción - Congreso de Tecnología UMG!',
            'view' => 'emails.participant-registration-confirmation',
        ],
        'email_verification' => [
            'subject' => 'Verifica tu Correo Electrónico - Congreso de Tecnología UMG',
            'view' => 'emails.email-verification',
        ],
        'event_reminder' => [
            'subject_prefix' => '¡Recordatorio: Congreso de Tecnología UMG en',
            'view' => 'emails.event-reminder',
        ],
    ],

    'queue' => [
        'enabled' => env('MAIL_QUEUE_ENABLED', true),
        'connection' => env('MAIL_QUEUE_CONNECTION', 'database'),
        'delay' => env('MAIL_QUEUE_DELAY', 0), // segundos
    ],

    'verification' => [
        'expires_in_minutes' => env('EMAIL_VERIFICATION_EXPIRES', 60),
        'resend_cooldown_minutes' => env('EMAIL_RESEND_COOLDOWN', 5),
    ],

    'reminders' => [
        'default_days_before' => [
            7,  // Una semana antes
            1,  // Un día antes
        ],
        'auto_send' => env('AUTO_SEND_REMINDERS', false),
    ],

    'event_info' => [
        'name' => 'Congreso de Tecnología UMG',
        'date' => env('EVENT_DATE', '2024-12-15'),
        'time' => env('EVENT_TIME', '8:00 AM'),
        'location' => env('EVENT_LOCATION', 'Campus Central UMG'),
        'website' => env('EVENT_WEBSITE', 'https://congreso.umg.edu.gt'),
        'contact_email' => env('EVENT_CONTACT_EMAIL', 'congreso@umg.edu.gt'),
        'contact_phone' => env('EVENT_CONTACT_PHONE', '+502 1234-5678'),
    ],

    'social_links' => [
        'website' => env('SOCIAL_WEBSITE', '#'),
        'facebook' => env('SOCIAL_FACEBOOK', '#'),
        'instagram' => env('SOCIAL_INSTAGRAM', '#'),
        'twitter' => env('SOCIAL_TWITTER', '#'),
    ],

    'testing' => [
        'enabled' => env('MAIL_TESTING_ENABLED', false),
        'test_email' => env('MAIL_TEST_EMAIL', 'test@example.com'),
        'log_emails' => env('MAIL_LOG_ENABLED', true),
    ],
];
