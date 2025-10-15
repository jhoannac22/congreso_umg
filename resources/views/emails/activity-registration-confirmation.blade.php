<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Inscripción</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #1E5A96;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #1E5A96;
            margin-bottom: 10px;
        }
        .title {
            color: #1E5A96;
            font-size: 28px;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            font-size: 16px;
        }
        .activity-info {
            background-color: #f8f9fa;
            border-left: 4px solid #D4AF37;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .activity-name {
            font-size: 20px;
            font-weight: bold;
            color: #1E5A96;
            margin-bottom: 10px;
        }
        .info-row {
            display: flex;
            margin-bottom: 10px;
            align-items: center;
        }
        .info-label {
            font-weight: bold;
            color: #555;
            min-width: 120px;
        }
        .info-value {
            color: #333;
        }
        .payment-info {
            background-color: #e8f5e8;
            border: 1px solid #4caf50;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
        }
        .payment-title {
            color: #2e7d32;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .status-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 12px;
        }
        .status-confirmed {
            background-color: #4caf50;
            color: white;
        }
        .status-registered {
            background-color: #2196f3;
            color: white;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            background-color: #D4AF37;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 5px;
            font-weight: bold;
        }
        .button:hover {
            background-color: #B8860B;
        }
        .qr-section {
            text-align: center;
            margin: 20px 0;
            padding: 20px;
            background-color: #f0f0f0;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Congreso de Tecnología UMG</div>
            <h1 class="title">¡Inscripción Confirmada!</h1>
            <p class="subtitle">Tu participación ha sido registrada exitosamente</p>
        </div>

        <div class="activity-info">
            <div class="activity-name">{{ $activity->name }}</div>
            
            <div class="info-row">
                <span class="info-label">Tipo:</span>
                <span class="info-value">{{ ucfirst($activity->type) }}</span>
            </div>
            
            <div class="info-row">
                <span class="info-label">Fecha:</span>
                <span class="info-value">{{ \Carbon\Carbon::parse($activity->start_date)->format('d/m/Y H:i') }}</span>
            </div>
            
            @if($activity->location)
            <div class="info-row">
                <span class="info-label">Ubicación:</span>
                <span class="info-value">{{ $activity->location }}</span>
            </div>
            @endif
            
            @if($activity->instructor)
            <div class="info-row">
                <span class="info-label">Instructor:</span>
                <span class="info-value">{{ $activity->instructor }}</span>
            </div>
            @endif
            
            <div class="info-row">
                <span class="info-label">Estado:</span>
                <span class="status-badge status-{{ $registration->status }}">
                    {{ ucfirst($registration->status) }}
                </span>
            </div>
            
            @if($registration->notes)
            <div class="info-row">
                <span class="info-label">Notas:</span>
                <span class="info-value">{{ $registration->notes }}</span>
            </div>
            @endif
        </div>

        @if($registration->payment_status === 'paid')
        <div class="payment-info">
            <div class="payment-title">✅ Pago Procesado Exitosamente</div>
            <div class="info-row">
                <span class="info-label">Monto:</span>
                <span class="info-value">{{ $registration->currency }} {{ number_format((float)($registration->amount_paid ?? 0), 2) }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Método:</span>
                <span class="info-value">{{ ucfirst($registration->payment_method) }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">ID Transacción:</span>
                <span class="info-value">{{ $registration->transaction_id }}</span>
            </div>
        </div>
        @endif

        <div class="qr-section">
            <h3>Tu Código QR de Participación</h3>
            <p>Presenta este código en el evento para confirmar tu asistencia</p>
            @if($participant->qr_code)
                <img src="{{ $participant->qr_code }}" alt="QR Code" style="max-width: 200px; height: auto;">
            @else
                <p style="color: #666;">QR Code generándose...</p>
            @endif
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <a href="{{ url('/my-activities') }}" class="button">Ver Mis Actividades</a>
            <a href="{{ url('/activities') }}" class="button">Explorar Más Actividades</a>
        </div>

        <div class="footer">
            <p><strong>Información Importante:</strong></p>
            <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                <li>Llega 15 minutos antes del inicio de la actividad</li>
                <li>Trae una identificación válida</li>
                <li>Si no puedes asistir, cancela tu inscripción con anticipación</li>
                <li>Para cualquier consulta, contacta a: congreso@umg.edu.gt</li>
            </ul>
            
            <p style="margin-top: 20px;">
                <strong>Congreso de Tecnología UMG</strong><br>
                Universidad Mariano Gálvez de Guatemala<br>
                {{ \Carbon\Carbon::now()->format('Y') }}
            </p>
        </div>
    </div>
</body>
</html>
