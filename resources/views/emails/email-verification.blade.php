@extends('emails.layout')

@section('content')
<h2>Verifica tu Correo Electrónico</h2>

<p>Estimado/a <strong>{{ $user->name }}</strong>,</p>

<p>Gracias por registrarte en el Congreso de Tecnología UMG. Para completar tu registro y activar tu cuenta, necesitamos verificar tu dirección de correo electrónico.</p>

<div class="highlight-box">
    <h3>🔐 Verificación Requerida</h3>
    <p>Haz clic en el botón de abajo para verificar tu email</p>
</div>

<div style="text-align: center; margin: 30px 0;">
    <a href="{{ $verificationUrl }}" class="button">Verificar Mi Email</a>
</div>

<div class="divider"></div>

<h3>📋 ¿Por qué necesito verificar mi email?</h3>
<ul style="line-height: 1.8; padding-left: 20px;">
    <li>✅ Confirmar que tienes acceso a tu correo electrónico</li>
    <li>✅ Recibir notificaciones importantes del evento</li>
    <li>✅ Acceder a tu perfil y materiales del congreso</li>
    <li>✅ Recibir tu certificado de participación</li>
    <li>✅ Mantener la seguridad de tu cuenta</li>
</ul>

<div class="divider"></div>

<h3>⚠️ Información Importante</h3>
<div class="info-item">
    <h4>🔗 Enlace de Verificación</h4>
    <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
    <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px;">{{ $verificationUrl }}</p>
</div>

<div class="info-item">
    <h4>⏰ Tiempo de Expiración</h4>
    <p>Este enlace expirará en <strong>24 horas</strong> por seguridad.</p>
</div>

<div class="info-item">
    <h4>🔄 Reenviar Verificación</h4>
    <p>Si necesitas un nuevo enlace de verificación, puedes solicitarlo desde la página de login.</p>
</div>

<div class="divider"></div>

<h3>🆘 ¿Necesitas Ayuda?</h3>
<p>Si tienes problemas para verificar tu email o no recibiste este mensaje:</p>
<ul style="line-height: 1.8; padding-left: 20px;">
    <li>Revisa tu carpeta de spam o correo no deseado</li>
    <li>Verifica que escribiste correctamente tu email</li>
    <li>Contacta al soporte técnico del evento</li>
</ul>

<p><strong>¡Una vez verificado, podrás acceder a todas las funcionalidades del congreso!</strong></p>

<p>Saludos cordiales,<br>
<strong>Comité Organizador</strong><br>
Congreso de Tecnología UMG</p>
@endsection