<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Registro - Congreso de Tecnología UMG</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #e74c3c;
        }
        .logo {
            max-width: 150px;
            height: auto;
            margin-bottom: 15px;
        }
        .title {
            color: #e74c3c;
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        }
        .subtitle {
            color: #666;
            font-size: 16px;
            margin: 5px 0 0 0;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #2c3e50;
        }
        .content {
            margin-bottom: 30px;
        }
        .qr-section {
            background-color: #f8f9fa;
            border: 2px solid #e74c3c;
            border-radius: 10px;
            padding: 25px;
            text-align: center;
            margin: 25px 0;
        }
        .qr-title {
            color: #e74c3c;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .qr-code {
            max-width: 250px;
            width: 100%;
            height: auto;
            border: 3px solid #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            margin: 15px 0;
        }
        .qr-instructions {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin-top: 15px;
            font-size: 14px;
            color: #856404;
        }
        .event-info {
            background-color: #e8f5e8;
            border-left: 4px solid #28a745;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 5px 5px 0;
        }
        .event-info h3 {
            color: #28a745;
            margin-top: 0;
            font-size: 18px;
        }
        .info-row {
            display: flex;
            margin: 10px 0;
            align-items: center;
        }
        .info-label {
            font-weight: bold;
            width: 120px;
            color: #2c3e50;
        }
        .info-value {
            color: #555;
        }
        .benefits {
            background-color: #f0f8ff;
            border-radius: 5px;
            padding: 20px;
            margin: 20px 0;
        }
        .benefits h3 {
            color: #007bff;
            margin-top: 0;
        }
        .benefit-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        .benefit-icon {
            color: #28a745;
            font-weight: bold;
            margin-right: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 14px;
        }
        .contact-info {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .urgent-notice {
            background-color: #ffe6e6;
            border: 2px solid #ff6b6b;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
        .urgent-notice strong {
            color: #d63031;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="{{ asset('logo-umg.png') }}" alt="Logo UMG" class="logo">
            <h1 class="title">¡Bienvenido al Congreso!</h1>
            <p class="subtitle">Congreso de Tecnología UMG 2024</p>
        </div>

        <!-- Greeting -->
        <div class="greeting">
            <p>¡Hola <strong>{{ $participant->first_name }} {{ $participant->last_name }}</strong>!</p>
        </div>

        <!-- Main Content -->
        <div class="content">
            <p>¡Excelente! Tu registro al <strong>Congreso de Tecnología UMG 2024</strong> ha sido confirmado exitosamente. Estamos emocionados de tenerte como participante.</p>
            
            <p>Como <strong>{{ $participant->type === 'interno' ? 'estudiante interno' : 'estudiante externo' }}</strong> de {{ $participant->school ?? 'la Universidad Mariano Gálvez' }}, tendrás acceso a todas las actividades y beneficios del congreso.</p>
        </div>

        <!-- QR Code Section -->
        <div class="qr-section">
            <h2 class="qr-title">🎫 Tu Código QR de Asistencia</h2>
            <p><strong>¡IMPORTANTE!</strong> Este código QR es tu pase de entrada al congreso. Guárdalo y preséntalo al llegar.</p>
            
            <img src="{{ $qrCodeUrl }}" alt="Código QR de Asistencia" class="qr-code">
            
            <div class="qr-instructions">
                <strong>📱 Instrucciones:</strong><br>
                • Guarda esta imagen en tu teléfono<br>
                • Preséntala al escanear en la entrada<br>
                • No lo compartas con otras personas<br>
                • Funciona solo para ti
            </div>
        </div>

        <!-- Event Information -->
        <div class="event-info">
            <h3>📅 Información del Evento</h3>
            <div class="info-row">
                <span class="info-label">📅 Fecha:</span>
                <span class="info-value">{{ $eventDate }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">⏰ Horario:</span>
                <span class="info-value">{{ $eventTime }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">📍 Lugar:</span>
                <span class="info-value">{{ $eventLocation }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">🏢 Dirección:</span>
                <span class="info-value">{{ $eventAddress }}</span>
            </div>
        </div>

        <!-- Benefits Section -->
        <div class="benefits">
            <h3>🎁 ¿Qué incluye tu participación?</h3>
            <div class="benefit-item">
                <span class="benefit-icon">✓</span>
                <span>Acceso a todas las conferencias y talleres</span>
            </div>
            <div class="benefit-item">
                <span class="benefit-icon">✓</span>
                <span>Materiales y recursos del evento</span>
            </div>
            <div class="benefit-item">
                <span class="benefit-icon">✓</span>
                <span>Certificado de participación digital</span>
            </div>
            <div class="benefit-item">
                <span class="benefit-icon">✓</span>
                <span>Participación en competencias y actividades</span>
            </div>
            <div class="benefit-item">
                <span class="benefit-icon">✓</span>
                <span>Networking con profesionales del sector</span>
            </div>
        </div>

        <!-- Urgent Notice -->
        <div class="urgent-notice">
            <strong>⚠️ RECUERDA:</strong><br>
            Lleva este código QR (en tu teléfono o impreso) y un documento de identificación al evento.
        </div>

        <!-- Contact Information -->
        <div class="contact-info">
            <h3>📞 ¿Necesitas ayuda?</h3>
            <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos:</p>
            <div class="info-row">
                <span class="info-label">📧 Email:</span>
                <span class="info-value">congreso.tecnologia@miumg.edu.gt</span>
            </div>
            <div class="info-row">
                <span class="info-label">📱 Teléfono:</span>
                <span class="info-value">+502 2411-1800</span>
            </div>
            <div class="info-row">
                <span class="info-label">🌐 Web:</span>
                <span class="info-value">www.miumg.edu.gt/congreso-tecnologia</span>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>¡Esperamos verte en el Congreso de Tecnología UMG 2024!</p>
            <p><strong>Universidad Mariano Gálvez de Guatemala</strong><br>
            Facultad de Ingeniería en Sistemas<br>
            Congreso de Tecnología 2024</p>
            
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
                Este es un correo automático. Por favor, no respondas a este mensaje.<br>
                Si no te registraste en este evento, por favor ignora este correo.
            </p>
        </div>
    </div>
</body>
</html>
