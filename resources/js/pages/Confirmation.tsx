import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import UMGLogo from '../components/UMGLogo';
import Button from '../components/Button';

interface Participant {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    type: string;
    school?: string;
    student_id?: string;
    qr_code: string;
    created_at: string;
}

export default function Confirmation() {
    const [participant, setParticipant] = useState<Participant | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const participantId = urlParams.get('participant');

        // Primero intentar obtener el ID desde la URL
        if (participantId) {
            fetchParticipant(participantId);
        } else {
            // Primero intentar obtener el participante desde localStorage
            const participantStr = localStorage.getItem('participant');
            if (participantStr) {
                try {
                    const participantData = JSON.parse(participantStr);
                    console.log('Participant data from localStorage:', participantData);
                    setParticipant(participantData);
                    setLoading(false);
                    return;
                } catch (e) {
                    console.error('Error parsing participant from localStorage:', e);
                }
            }
            
            // Si no hay datos en localStorage, intentar obtener desde la API
            const userStr = localStorage.getItem('user');
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    fetchParticipantByEmail(user.email);
                } catch (e) {
                    setError('Error al cargar los datos del usuario');
                    setLoading(false);
                }
            } else {
                setError('ID de participante no encontrado');
                setLoading(false);
            }
        }
    }, []);

    const fetchParticipant = async (participantId: string) => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch(`/api/v1/participants/${participantId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar los datos del participante');
            }

            const data = await response.json();
            setParticipant(data.data);
            
            // Guardar participant_id en localStorage para usarlo en "Mis Actividades"
            localStorage.setItem('participant', JSON.stringify(data.data));
        } catch (error) {
            setError('Error al cargar los datos del participante');
        } finally {
            setLoading(false);
        }
    };

    const fetchParticipantByEmail = async (email: string) => {
        try {
            const token = localStorage.getItem('auth_token');
            
            if (!token) {
                setError('Token de autenticación no encontrado. Por favor, regístrate nuevamente.');
                setLoading(false);
                return;
            }

            console.log('Fetching participant by email:', email);
            console.log('Using token:', token.substring(0, 20) + '...');

            const response = await fetch(`/api/v1/participants/by-email/${encodeURIComponent(email)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                if (response.status === 401) {
                    setError('Sesión expirada. Por favor, regístrate nuevamente.');
                } else if (response.status === 404) {
                    setError('Participante no encontrado. Por favor, regístrate nuevamente.');
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                setLoading(false);
                return;
            }

            const data = await response.json();
            console.log('Participant data received:', data);
            
            setParticipant(data.data);
            
            // Guardar participant_id en localStorage para usarlo en "Mis Actividades"
            localStorage.setItem('participant', JSON.stringify(data.data));
        } catch (error) {
            console.error('Error fetching participant:', error);
            setError('Error al cargar los datos del participante: ' + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const downloadQRCode = () => {
        if (participant?.qr_code) {
            const link = document.createElement('a');
            link.href = participant.qr_code;
            link.download = `QR_${participant.first_name}_${participant.last_name}.png`;
            link.click();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B22222] mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando confirmación...</p>
                </div>
            </div>
        );
    }

    if (error || !participant) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Button href="/register" variant="primary">
                        Volver al Registro
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title="Confirmación de Inscripción - Congreso de Tecnología UMG">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link 
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" 
                    rel="stylesheet" 
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
                {/* Navigation */}
                <nav className="relative z-10 px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-4">
                            <UMGLogo size="sm" />
                            <div className="text-gray-800">
                                <h1 className="text-xl font-bold font-['Inter']">Congreso de Tecnología</h1>
                                <p className="text-sm opacity-90">Universidad Mariano Gálvez</p>
                            </div>
                        </Link>
                        
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="/" className="text-gray-800 hover:text-[#B22222] transition-colors duration-200 font-medium">
                                Inicio
                            </Link>
                            <Link href="/activities" className="text-gray-800 hover:text-[#B22222] transition-colors duration-200 font-medium">
                                Actividades
                            </Link>
                            <Link href="/login" className="text-gray-800 hover:text-[#B22222] transition-colors duration-200 font-medium">
                                Iniciar Sesión
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Success Header */}
                        <div className="text-center mb-12">
                            <div className="text-green-500 text-6xl mb-4">✅</div>
                            <h2 className="text-4xl font-bold text-gray-800 font-['Playfair_Display'] mb-4">
                                ¡Inscripción Exitosa!
                            </h2>
                            <p className="text-xl text-gray-600">
                                Tu registro al Congreso de Tecnología UMG ha sido confirmado
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Participant Info */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Información del Participante</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="font-medium text-gray-600">Nombre:</span>
                                        <span className="text-gray-800">{participant.first_name} {participant.last_name}</span>
                                    </div>
                                    
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="font-medium text-gray-600">Email:</span>
                                        <span className="text-gray-800">{participant.email}</span>
                                    </div>
                                    
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="font-medium text-gray-600">Tipo:</span>
                                        <span className="text-gray-800 capitalize">
                                            {participant.type === 'interno' ? 'Estudiante UMG' : 'Estudiante Externo'}
                                        </span>
                                    </div>
                                    
                                    {participant.school && (
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span className="font-medium text-gray-600">Institución:</span>
                                            <span className="text-gray-800">{participant.school}</span>
                                        </div>
                                    )}
                                    
                                    {participant.student_id && (
                                        <div className="flex justify-between py-2 border-b border-gray-200">
                                            <span className="font-medium text-gray-600">No. Estudiante:</span>
                                            <span className="text-gray-800">{participant.student_id}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between py-2">
                                        <span className="font-medium text-gray-600">Fecha de Registro:</span>
                                        <span className="text-gray-800">
                                            {new Date(participant.created_at).toLocaleDateString('es-GT')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* QR Code */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Tu Código QR</h3>
                                
                                <div className="text-center">
                                    {participant.qr_code ? (
                                        <>
                                            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block mb-4">
                                                <img 
                                                    src={participant.qr_code} 
                                                    alt="Código QR del participante"
                                                    className="w-48 h-48 mx-auto"
                                                />
                                            </div>
                                            
                                            <p className="text-gray-600 mb-6">
                                                Presenta este código QR en el evento para registrar tu asistencia
                                            </p>
                                            
                                            <Button 
                                                onClick={downloadQRCode}
                                                variant="outline"
                                                className="w-full mb-4"
                                            >
                                                📱 Descargar QR
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="text-center py-12">
                                            {/* QR Code Placeholder Icon */}
                                            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-2xl inline-block mb-6 border-2 border-dashed border-gray-300">
                                                <svg 
                                                    className="w-32 h-32 text-gray-400 mx-auto" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    {/* QR Code Pattern SVG */}
                                                    <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        {/* Top Left Corner */}
                                                        <rect x="3" y="3" width="4" height="4" fill="currentColor"/>
                                                        <rect x="3" y="9" width="1" height="1" fill="currentColor"/>
                                                        <rect x="5" y="9" width="1" height="1" fill="currentColor"/>
                                                        <rect x="7" y="9" width="1" height="1" fill="currentColor"/>
                                                        <rect x="9" y="3" width="1" height="1" fill="currentColor"/>
                                                        <rect x="9" y="5" width="1" height="1" fill="currentColor"/>
                                                        <rect x="9" y="7" width="1" height="1" fill="currentColor"/>
                                                        <rect x="9" y="9" width="1" height="1" fill="currentColor"/>
                                                        
                                                        {/* Top Right Corner */}
                                                        <rect x="15" y="3" width="4" height="4" fill="currentColor"/>
                                                        <rect x="15" y="9" width="1" height="1" fill="currentColor"/>
                                                        <rect x="17" y="9" width="1" height="1" fill="currentColor"/>
                                                        <rect x="19" y="9" width="1" height="1" fill="currentColor"/>
                                                        <rect x="21" y="3" width="1" height="1" fill="currentColor"/>
                                                        <rect x="21" y="5" width="1" height="1" fill="currentColor"/>
                                                        <rect x="21" y="7" width="1" height="1" fill="currentColor"/>
                                                        <rect x="21" y="9" width="1" height="1" fill="currentColor"/>
                                                        
                                                        {/* Bottom Left Corner */}
                                                        <rect x="3" y="15" width="4" height="4" fill="currentColor"/>
                                                        <rect x="3" y="21" width="1" height="1" fill="currentColor"/>
                                                        <rect x="5" y="21" width="1" height="1" fill="currentColor"/>
                                                        <rect x="7" y="21" width="1" height="1" fill="currentColor"/>
                                                        <rect x="9" y="15" width="1" height="1" fill="currentColor"/>
                                                        <rect x="9" y="17" width="1" height="1" fill="currentColor"/>
                                                        <rect x="9" y="19" width="1" height="1" fill="currentColor"/>
                                                        <rect x="9" y="21" width="1" height="1" fill="currentColor"/>
                                                        
                                                        {/* Random dots pattern */}
                                                        <rect x="11" y="5" width="1" height="1" fill="currentColor"/>
                                                        <rect x="13" y="7" width="1" height="1" fill="currentColor"/>
                                                        <rect x="11" y="11" width="1" height="1" fill="currentColor"/>
                                                        <rect x="15" y="13" width="1" height="1" fill="currentColor"/>
                                                        <rect x="13" y="17" width="1" height="1" fill="currentColor"/>
                                                        <rect x="17" y="19" width="1" height="1" fill="currentColor"/>
                                                        <rect x="19" y="15" width="1" height="1" fill="currentColor"/>
                                                        <rect x="21" y="17" width="1" height="1" fill="currentColor"/>
                                                    </g>
                                                </svg>
                                            </div>
                                            
                                            <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#B22222]/20 p-4 rounded-xl border border-[#D4AF37]/30">
                                                <p className="text-gray-700 font-medium mb-2">🎯 Código QR Personalizado</p>
                                                <p className="text-gray-600 text-sm">
                                                    Tu código QR único se generará automáticamente y estará disponible pronto.
                                                </p>
                                            </div>
                                            
                                            <div className="mt-4 flex items-center justify-center space-x-2 text-gray-500">
                                                <div className="w-2 h-2 bg-[#B22222] rounded-full animate-pulse"></div>
                                                <span className="text-sm">Generando...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Next Steps */}
                        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Próximos Pasos</h3>
                            
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#1E5A96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">1. Revisa tu Email</h4>
                                    <p className="text-gray-600 text-sm">
                                        Recibirás un email de confirmación con todos los detalles del evento
                                    </p>
                                </div>
                                
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#1E5A96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">2. Explora Actividades</h4>
                                    <p className="text-gray-600 text-sm">
                                        Descubre los talleres y competencias disponibles
                                    </p>
                                </div>
                                
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-[#1E5A96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-800 mb-2">3. Asiste al Evento</h4>
                                    <p className="text-gray-600 text-sm">
                                        Presenta tu código QR para registrar asistencia
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/activities" variant="primary" size="lg">
                                Ver Actividades Disponibles
                            </Button>
                            <Button href="/my-activities" variant="secondary" size="lg">
                                Mis Actividades
                            </Button>
                            <Button href="/participant-dashboard" variant="outline" size="lg">
                                Acceder a Mi Perfil
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
