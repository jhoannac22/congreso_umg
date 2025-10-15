import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import UMGLogo from '../components/UMGLogo';
import Button from '../components/Button';

export default function EmailVerification() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const email = urlParams.get('email');

        if (!token || !email) {
            setStatus('error');
            setMessage('Enlace de verificación inválido o incompleto.');
            return;
        }

        verifyEmail(token, email);
    }, []);

    const verifyEmail = async (token: string, email: string) => {
        try {
            const response = await fetch('/api/v1/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    token,
                    email
                })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'Email verificado exitosamente');
            } else {
                setStatus('error');
                setMessage(data.message || 'Error al verificar el email');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Error de conexión. Por favor, intenta nuevamente.');
        }
    };

    return (
        <>
            <Head title="Verificación de Email - Congreso de Tecnología UMG">
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
                                <p className="text-sm text-gray-600">Universidad Mariano Gálvez</p>
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
                            <Link href="/faq" className="text-gray-800 hover:text-[#B22222] transition-colors duration-200 font-medium">
                                FAQ
                            </Link>
                            <Button href="/login" variant="outline" size="sm">
                                Iniciar Sesión
                            </Button>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-6">
                    <div className="max-w-md w-full">
                        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 text-center">
                            {/* Status Icon */}
                            <div className="mb-6">
                                {status === 'loading' && (
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full flex items-center justify-center mx-auto">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                    </div>
                                )}
                                {status === 'success' && (
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl font-bold text-gray-800 font-['Playfair_Display'] mb-4">
                                {status === 'loading' && 'Verificando Email...'}
                                {status === 'success' && '¡Email Verificado!'}
                                {status === 'error' && 'Error de Verificación'}
                            </h2>

                            {/* Message */}
                            <p className="text-gray-600 mb-8">
                                {message}
                            </p>

                            {/* Actions */}
                            <div className="space-y-4">
                                {status === 'success' && (
                                    <>
                                        <Button href="/login" variant="primary" className="w-full">
                                            Iniciar Sesión
                                        </Button>
                                        <Button href="/" variant="outline" className="w-full">
                                            Ir al Inicio
                                        </Button>
                                    </>
                                )}
                                {status === 'error' && (
                                    <>
                                        <Button href="/register" variant="primary" className="w-full">
                                            Intentar Registro Nuevamente
                                        </Button>
                                        <Button href="/" variant="outline" className="w-full">
                                            Ir al Inicio
                                        </Button>
                                    </>
                                )}
                                {status === 'loading' && (
                                    <p className="text-sm text-gray-500">
                                        Por favor espera mientras verificamos tu email...
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500">
                                ¿Necesitas ayuda?{' '}
                                <a href="mailto:congreso@umg.edu.gt" className="text-[#B22222] hover:underline">
                                    Contáctanos
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
