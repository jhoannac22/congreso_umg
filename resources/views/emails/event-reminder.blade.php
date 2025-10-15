@extends('emails.layout')

@section('content')
<h2>¡Recordatorio: Congreso de Tecnología UMG</h2>

<p>Estimado/a <strong>{{ $participant->first_name }} {{ $participant->last_name }}</strong>,</p>

<p>¡El Congreso de Tecnología UMG está muy cerca! Te recordamos algunos detalles importantes para que estés completamente preparado.</p>

<div class="highlight-box">
    <h3>📅 ¡El Evento es {{ $daysUntilEvent }}!</h3>
    <p>{{ $eventDate }} - {{ $eventTime }}</p>
</div>

<div class="info-grid">
    <div class="info-item">
        <h4>📍 Ubicación</h4>
        <p>{{ $eventLocation }}</p>
    </div>
    <div class="info-item">
        <h4>⏰ Horario</h4>
        <p>8:00 AM - 6:00 PM</p>
    </div>
    <div class="info-item">
        <h4>🎫 Tu Código</h4>
        <p>{{ $participant->id }}</p>
    </div>
    <div class="info-item">
        <h4>📱 Estado</h4>
        <p>✅ Inscrito</p>
    </div>
</div>

<div class="qr-section">
    <h3>📱 No Olvides tu Código QR</h3>
    <p>Presenta este código QR en el evento para registrar tu asistencia.</p>
    @if($participant->qr_code)
    <div class="qr-code">
        <img src="{{ $participant->qr_code }}" alt="Código QR del participante" style="max-width: 100%; max-height: 100%;">
    </div>
    @endif
    <p style="font-size: 14px; color: #666;">Guarda este QR en tu teléfono o imprímelo</p>
</div>

<div class="divider"></div>

<h3>📋 Programa del Día</h3>
<div class="info-item">
    <h4>🌅 8:00 AM - Registro y Bienvenida</h4>
    <p>Llegada, registro de asistencia y coffee de bienvenida</p>
</div>
<div class="info-item">
    <h4>🎤 9:00 AM - Conferencias Magistrales</h4>
    <p>Presentaciones de expertos en tecnología</p>
</div>
<div class="info-item">
    <h4>🛠️ 11:00 AM - Talleres Prácticos</h4>
    <p>Sesiones hands-on de programación y desarrollo</p>
</div>
<div class="info-item">
    <h4>🍽️ 12:30 PM - Almuerzo</h4>
    <p>Networking y comida incluida</p>
</div>
<div class="info-item">
    <h4>🏆 2:00 PM - Competencias</h4>
    <p>Hackathons y desafíos tecnológicos</p>
</div>
<div class="info-item">
    <h4>🎓 5:00 PM - Clausura y Certificados</h4>
    <p>Entrega de diplomas y cierre del evento</p>
</div>

<div class="divider"></div>

<h3>🎒 ¿Qué Debes Llevar?</h3>
<ul style="line-height: 1.8; padding-left: 20px;">
    <li>✅ Tu código QR (impreso o en el teléfono)</li>
    <li>✅ Identificación oficial</li>
    <li>✅ Laptop o tablet (opcional)</li>
    <li>✅ Cuaderno y pluma</li>
    <li>✅ Entusiasmo por aprender</li>
</ul>

<div class="divider"></div>

<h3>🚗 Información de Estacionamiento</h3>
<div class="info-item">
    <h4>🅿️ Estacionamiento</h4>
    <p>Estacionamiento gratuito disponible en el campus. Te recomendamos llegar 30 minutos antes.</p>
</div>

<div class="divider"></div>

<h3>📱 Actividades en las que Estás Inscrito</h3>
@if($registeredActivities && count($registeredActivities) > 0)
    @foreach($registeredActivities as $activity)
    <div class="info-item">
        <h4>{{ $activity->title }}</h4>
        <p>{{ $activity->description }}</p>
        <p><strong>Horario:</strong> {{ $activity->start_time }} - {{ $activity->end_time }}</p>
    </div>
    @endforeach
@else
<div class="info-item">
    <h4>🎯 Explora Actividades</h4>
    <p>Aún no te has inscrito en actividades específicas. ¡Revisa el programa y regístrate!</p>
</div>
@endif

<div style="text-align: center; margin: 30px 0;">
    <a href="{{ url('/activities') }}" class="button">Ver Programa Completo</a>
    <a href="{{ url('/login') }}" class="button" style="background: linear-gradient(135deg, #D4AF37 0%, #B22222 100%);">Mi Perfil</a>
</div>

<div class="divider"></div>

<h3>📞 Contacto de Emergencia</h3>
<p>Si tienes alguna pregunta o necesitas asistencia el día del evento:</p>
<div class="info-item">
    <h4>📱 WhatsApp</h4>
    <p>+502 1234-5678 (Comité Organizador)</p>
</div>
<div class="info-item">
    <h4>📧 Email</h4>
    <p>congreso@umg.edu.gt</p>
</div>

<p><strong>¡Nos vemos muy pronto en el Congreso de Tecnología UMG!</strong></p>

<p>Saludos cordiales,<br>
<strong>Comité Organizador</strong><br>
Congreso de Tecnología UMG</p>
@endsection