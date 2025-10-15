import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import UMGLogo from '../components/UMGLogo';
import Button from '../components/Button';

interface ParticipantData {
    id: number;
    name: string;
    email: string;
    type: string;
    event: string;
    registered_at: string;
}

export default function ParticipantQR() {
    const [participantData, setParticipantData] = useState<ParticipantData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const participantId = urlParams.get('participant');
        const encodedData = urlParams.get('data');

        if (participantId && encodedData) {
            try {
                // Decodificar datos del participante
                const decodedData = atob(encodedData);
                const data = JSON.parse(decodedData);
                setParticipantData(data);
            } catch (err) {
                setError('Datos del participante inválidos');
            }
        } else {
            setError('Información del participante no encontrada');
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B22222] mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando información del participante...</p>
                </div>
            </div>
        );
    }

    if (error || !participantData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Button href="/" variant="primary">
                        Ir al Inicio
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title={`Participante: ${participantData.name} - Congreso de Tecnología UMG`}>
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
                            <Link href="/register" className="text-gray-800 hover:text-[#B22222] transition-colors duration-200 font-medium">
                                Inscripción
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800 font-['Playfair_Display'] mb-4">
                                Información del Participante
                            </h2>
                            <p className="text-xl text-gray-600">
                                Acceso mediante código QR
                            </p>
                        </div>

                        {/* Participant Info Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 font-['Playfair_Display']">
                                {participantData.event}
                            </h3>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase tracking-wide">Nombre</p>
                                            <p className="text-lg font-semibold text-gray-800">{participantData.name}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-[#B22222] rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase tracking-wide">Email</p>
                                            <p className="text-lg font-semibold text-gray-800">{participantData.email}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-[#1E5A96] rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase tracking-wide">Tipo</p>
                                            <p className="text-lg font-semibold text-gray-800 capitalize">
                                                {participantData.type === 'interno' ? 'Estudiante UMG' : 'Estudiante Externo'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 uppercase tracking-wide">Fecha de Registro</p>
                                            <p className="text-lg font-semibold text-gray-800">
                                                {new Date(participantData.registered_at).toLocaleDateString('es-GT')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Event Information */}
                        <div className="bg-gradient-to-r from-[#B22222] to-[#D4AF37] rounded-2xl p-8 text-white mb-8">
                            <h3 className="text-2xl font-bold mb-4 font-['Playfair_Display']">
                                🎯 Acceso Válido al Congreso
                            </h3>
                            <p className="text-lg mb-4">
                                Este código QR confirma tu participación en el Congreso de Tecnología UMG 2025.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                                    ✅ Registro Confirmado
                                </span>
                                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                                    🎫 Acceso al Evento
                                </span>
                                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                                    📱 Código QR Válido
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/" variant="primary" size="lg">
                                🏠 Ir al Inicio del Congreso
                            </Button>
                            <Button href="/activities" variant="outline" size="lg">
                                📋 Ver Actividades
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
