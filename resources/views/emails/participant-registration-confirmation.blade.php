@extends('emails.layout')

@section('content')
<div style="text-align: center; margin-bottom: 40px;">
    <!-- Success Icon -->
    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
        <svg width="40" height="40" fill="white" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
        </svg>
    </div>
    
    <!-- Success Message -->
    <h1 style="color: #1F2937; font-size: 32px; font-weight: bold; margin: 0 0 10px; font-family: 'Playfair Display', serif;">¡Inscripción Exitosa!</h1>
    <p style="color: #6B7280; font-size: 18px; margin: 0;">Tu registro al Congreso de Tecnología UMG ha sido confirmado</p>
</div>

<!-- Participant Information Card -->
<div style="background: white; border-radius: 16px; padding: 30px; margin: 30px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #1F2937; font-size: 24px; font-weight: bold; margin: 0 0 20px; font-family: 'Playfair Display', serif;">Información del Participante</h3>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
            <p style="color: #6B7280; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 5px;">Nombre</p>
            <p style="color: #1F2937; font-size: 16px; font-weight: 500; margin: 0;">{{ $participant->first_name }} {{ $participant->last_name }}</p>
        </div>
        
        <div>
            <p style="color: #6B7280; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 5px;">Email</p>
            <p style="color: #1F2937; font-size: 16px; font-weight: 500; margin: 0;">{{ $participant->email }}</p>
        </div>
        
        <div>
            <p style="color: #6B7280; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 5px;">Tipo</p>
            <p style="color: #1F2937; font-size: 16px; font-weight: 500; margin: 0;">{{ $participant->type === 'interno' ? 'Estudiante UMG' : 'Estudiante Externo' }}</p>
        </div>
        
        <div>
            <p style="color: #6B7280; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 5px;">Fecha de Registro</p>
            <p style="color: #1F2937; font-size: 16px; font-weight: 500; margin: 0;">{{ $participant->created_at->format('d/m/Y') }}</p>
        </div>
        
        @if($participant->type === 'externo' && $participant->school)
        <div>
            <p style="color: #6B7280; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 5px;">Institución</p>
            <p style="color: #1F2937; font-size: 16px; font-weight: 500; margin: 0;">{{ $participant->school }}</p>
        </div>
        @endif
        
        @if($participant->type === 'interno' && $participant->student_id)
        <div>
            <p style="color: #6B7280; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 5px;">Número de Estudiante</p>
            <p style="color: #1F2937; font-size: 16px; font-weight: 500; margin: 0;">{{ $participant->student_id }}</p>
        </div>
        @endif
    </div>
</div>

<!-- QR Code Card -->
<div style="background: white; border-radius: 16px; padding: 30px; margin: 30px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
    <h3 style="color: #1F2937; font-size: 24px; font-weight: bold; margin: 0 0 20px; font-family: 'Playfair Display', serif;">Tu Código QR</h3>
    
    @if($participant->qr_code)
    <div style="background: #F9FAFB; border-radius: 12px; padding: 20px; display: inline-block;">
        <img src="{{ $participant->qr_code }}" alt="Código QR del participante" style="max-width: 200px; max-height: 200px; border-radius: 8px;">
    </div>
    <p style="color: #6B7280; font-size: 14px; margin: 15px 0 0;">Presenta este código QR en el evento para registrar tu asistencia</p>
    @else
    <div style="background: #F9FAFB; border-radius: 12px; padding: 40px; display: inline-block;">
        <div style="width: 100px; height: 100px; background: #E5E7EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
            <svg width="40" height="40" fill="#9CA3AF" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 1v10h10V5H5z" clipRule="evenodd"/>
            </svg>
        </div>
        <p style="color: #6B7280; font-size: 14px; margin: 15px 0 0;">Código QR del participante</p>
    </div>
    @endif
</div>

<!-- What's Included Section -->
<div style="background: white; border-radius: 16px; padding: 30px; margin: 30px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="color: #1F2937; font-size: 24px; font-weight: bold; margin: 0 0 20px; font-family: 'Playfair Display', serif;">¿Qué incluye tu registro?</h3>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div style="display: flex; align-items: center; padding: 10px 0;">
            <div style="width: 24px; height: 24px; background: #B22222; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
                <svg width="12" height="12" fill="white" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
            </div>
            <span style="color: #374151; font-size: 16px;">Materiales y recursos del evento</span>
        </div>
        
        <div style="display: flex; align-items: center; padding: 10px 0;">
            <div style="width: 24px; height: 24px; background: #B22222; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
                <svg width="12" height="12" fill="white" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
            </div>
            <span style="color: #374151; font-size: 16px;">Certificado de participación</span>
        </div>
    </div>
</div>

<!-- Action Buttons -->
<div style="text-align: center; margin: 40px 0;">
    <a href="{{ url('/login') }}" style="display: inline-block; background: linear-gradient(135deg, #B22222 0%, #D4AF37 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 0 10px;">Iniciar Sesión</a>
    <a href="{{ url('/activities') }}" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #B22222 100%); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 0 10px;">Ver Actividades</a>
</div>

<p style="color: #6B7280; font-size: 16px; text-align: center; margin: 30px 0;">
    <strong>¡Esperamos verte pronto en el Congreso de Tecnología UMG!</strong>
</p>

<p style="color: #6B7280; font-size: 14px; text-align: center;">
    Si tienes alguna pregunta, no dudes en contactarnos.<br>
    <strong>Comité Organizador - Congreso de Tecnología UMG</strong>
</p>
@endsection