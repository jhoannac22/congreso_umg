@extends('emails.layout')

@section('content')
    <!-- Hero Section -->
    <tr>
        <td style="padding: 0;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #1E5A96 0%, #2C7CC1 100%);">
                        <div style="font-size: 60px; margin-bottom: 20px;">🎓</div>
                        <h1 style="margin: 0; font-size: 32px; color: #ffffff; font-weight: 700; line-height: 1.2;">
                            ¡Tu Diploma Está Listo!
                        </h1>
                        <p style="margin: 15px 0 0 0; font-size: 18px; color: #D4AF37; font-weight: 500;">
                            Felicidades por tu participación
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Main Content -->
    <tr>
        <td style="padding: 40px 30px;">
            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Estimado/a <strong>{{ $participant->first_name }} {{ $participant->last_name }}</strong>,
            </p>

            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Nos complace informarte que tu <strong>Diploma de {{ ucfirst($diploma->template_type === 'winner' ? 'Reconocimiento' : 'Participación') }}</strong> 
                del <strong>Congreso de Tecnología {{ date('Y') }}</strong> ya está disponible.
            </p>

            <!-- Diploma Info Card -->
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                <tr>
                    <td style="padding: 25px; background: #f8f9fa; border-left: 4px solid #1E5A96; border-radius: 8px;">
                        <h2 style="margin: 0 0 15px 0; font-size: 20px; color: #1E5A96; font-weight: 600;">
                            📋 Información del Diploma
                        </h2>
                        
                        <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-size: 14px; color: #666;">
                                    <strong>Actividad:</strong>
                                </td>
                                <td style="padding: 8px 0; font-size: 14px; color: #333;">
                                    {{ $activity->name }}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-size: 14px; color: #666;">
                                    <strong>Tipo:</strong>
                                </td>
                                <td style="padding: 8px 0; font-size: 14px; color: #333;">
                                    @if($diploma->template_type === 'winner')
                                        🏆 Reconocimiento al Mérito
                                    @elseif($diploma->template_type === 'special')
                                        ⭐ Reconocimiento Especial
                                    @else
                                        🎓 Participación
                                    @endif
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-size: 14px; color: #666;">
                                    <strong>Número de Diploma:</strong>
                                </td>
                                <td style="padding: 8px 0; font-size: 14px; color: #333; font-family: monospace;">
                                    {{ $diploma->diploma_number }}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-size: 14px; color: #666;">
                                    <strong>Fecha de Emisión:</strong>
                                </td>
                                <td style="padding: 8px 0; font-size: 14px; color: #333;">
                                    {{ \Carbon\Carbon::parse($diploma->issue_date)->isoFormat('D [de] MMMM [de] YYYY') }}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

            <p style="margin: 25px 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Tu diploma está adjunto a este correo en formato PDF. También puedes descargarlo desde tu panel de participante 
                en nuestro sitio web en cualquier momento.
            </p>

            <!-- Tips Section -->
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 25px 0;">
                <tr>
                    <td style="padding: 20px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #856404; font-weight: 600;">
                            💡 ¿Qué puedes hacer con tu diploma?
                        </h3>
                        <ul style="margin: 10px 0; padding-left: 20px; color: #856404; font-size: 14px; line-height: 1.8;">
                            <li>Agrégalo a tu perfil de LinkedIn</li>
                            <li>Inclúyelo en tu currículum vitae</li>
                            <li>Compártelo en tus redes sociales</li>
                            <li>Imprímelo y enmárcalo</li>
                        </ul>
                    </td>
                </tr>
            </table>

            @if($diploma->template_type === 'winner')
            <p style="margin: 25px 0; padding: 20px; background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); border-radius: 8px; font-size: 16px; line-height: 1.6; color: #333; text-align: center; font-weight: 600;">
                🎊 ¡Felicitaciones nuevamente por tu excelente desempeño! 🎊
            </p>
            @endif

            <p style="margin: 25px 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                Gracias por ser parte del <strong>Congreso de Tecnología UMG</strong>. Esperamos verte en futuras ediciones.
            </p>

            <!-- CTA Button -->
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                <tr>
                    <td style="text-align: center;">
                        <a href="{{ config('app.url') }}/participant-dashboard" 
                           style="display: inline-block; padding: 14px 35px; background: #1E5A96; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                            Ver Mis Diplomas
                        </a>
                    </td>
                </tr>
            </table>

            <p style="margin: 30px 0 0 0; font-size: 14px; line-height: 1.6; color: #666666; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <strong>Nota:</strong> Este diploma es válido y verificable mediante el número de diploma que aparece en el documento. 
                Si tienes alguna pregunta o necesitas un duplicado, no dudes en contactarnos.
            </p>
        </td>
    </tr>

    <!-- Social Share Section -->
    <tr>
        <td style="padding: 30px; background: #f8f9fa; text-align: center;">
            <p style="margin: 0 0 15px 0; font-size: 16px; color: #333; font-weight: 600;">
                ¡Comparte tu logro! 📢
            </p>
            <p style="margin: 0 0 20px 0; font-size: 14px; color: #666;">
                Etiquétanos en redes sociales: <strong>@CongresoTecUMG</strong>
            </p>
        </td>
    </tr>
@endsection

