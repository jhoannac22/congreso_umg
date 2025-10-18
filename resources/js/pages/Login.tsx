import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import UMGLogo from '../components/UMGLogo';
import Button from '../components/Button';
import Navigation from '../components/Navigation';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const response = await fetch('/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setErrors({ general: data.message || 'Error al iniciar sesión' });
                }
                return;
            }

            // Success - store token and redirect
            localStorage.setItem('auth_token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Store participant data if available
            if (data.participant) {
                localStorage.setItem('participant', JSON.stringify(data.participant));
            }
            
            // Redirect to dashboard or home
            window.location.href = '/dashboard';
            
        } catch (error) {
            setErrors({ general: 'Error de conexión. Por favor intenta nuevamente.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Iniciar Sesión - Congreso de Tecnología UMG">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link 
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" 
                    rel="stylesheet" 
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
                {/* Navigation */}
                <Navigation showLogin={false} />

                {/* Main Content */}
                <div className="px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-5xl font-bold text-gray-800 font-['Playfair_Display'] mb-6">
                                Iniciar Sesión
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Accede a tu cuenta para gestionar tu participación
                            </p>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#D4AF37] mx-auto rounded-full"></div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Login Form */}
                            <div className="relative">
                                {/* Decorative Elements */}
                                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#D4AF37] rounded-full opacity-60"></div>
                                <div className="absolute -top-2 -right-6 w-6 h-6 bg-[#B22222] rounded-full opacity-40"></div>
                                <div className="absolute -bottom-4 -left-2 w-4 h-4 bg-[#D4AF37] rounded-full opacity-50"></div>
                                
                                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-800 font-['Playfair_Display'] mb-2">
                                            Acceder a tu Cuenta
                                        </h3>
                                        <p className="text-gray-600">Ingresa tus credenciales para continuar</p>
                                    </div>
                                
                                {errors.general && (
                                    <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 shadow-md">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium">{errors.general}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email */}
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                            Correo Electrónico *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:border-transparent focus:bg-white transition-all duration-200"
                                                placeholder="tu@email.com"
                                                required
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                            Contraseña *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:border-transparent focus:bg-white transition-all duration-200"
                                                placeholder="Tu contraseña"
                                                required
                                            />
                                        </div>
                                        {errors.password && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Remember Me & Forgot Password */}
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-[#B22222] bg-gray-50 border-gray-300 rounded focus:ring-[#B22222] focus:ring-2"
                                            />
                                            <span className="ml-2 text-gray-700 text-sm">Recordarme</span>
                                        </label>
                                        <a href="#" className="text-[#B22222] text-sm hover:text-[#8B1A1A] transition-colors font-medium">
                                            ¿Olvidaste tu contraseña?
                                        </a>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-6">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="w-full bg-gradient-to-r from-[#B22222] to-[#D4AF37] hover:from-[#8B1A1A] hover:to-[#B8955A] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Iniciando Sesión...
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                    </svg>
                                                    Iniciar Sesión
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                </form>

                                {/* Demo Accounts */}
                                <div className="mt-8 p-6 bg-gradient-to-r from-[#D4AF37]/10 to-[#B22222]/10 rounded-xl border border-[#D4AF37]/20">
                                    <div className="text-center mb-4">
                                        <div className="w-8 h-8 bg-[#B22222] rounded-full flex items-center justify-center mx-auto mb-2">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-gray-800 font-semibold mb-3">Cuentas de Demostración</h4>
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <div className="bg-white/50 p-3 rounded-lg">
                                            <div className="text-gray-700">
                                                <strong className="text-[#B22222]">Admin:</strong> admin@congreso.umg.edu.gt / admin123
                                            </div>
                                        </div>
                                        <div className="bg-white/50 p-3 rounded-lg">
                                            <div className="text-gray-700">
                                                <strong className="text-[#B22222]">Organizador:</strong> organizador@congreso.umg.edu.gt / org123
                                            </div>
                                        </div>
                                        <div className="bg-white/50 p-3 rounded-lg">
                                            <div className="text-gray-700">
                                                <strong className="text-[#B22222]">Participante:</strong> participante@congreso.umg.edu.gt / demo123
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                            {/* Info Panel */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="text-center mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">¿Qué puedes hacer?</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        <li className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-[#B22222] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Ver tus actividades registradas</span>
                                        </li>
                                        <li className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-[#B22222] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Descargar tus diplomas</span>
                                        </li>
                                        <li className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-[#B22222] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Ver tu código QR personal</span>
                                        </li>
                                        <li className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-[#B22222] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Gestionar tu perfil</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="text-center mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B22222] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">¿No tienes cuenta?</h3>
                                        <p className="text-gray-600 mb-6">
                                            Regístrate ahora para participar en el congreso y acceder a todas las actividades.
                                        </p>
                                        <Button href="/register" variant="outline" className="w-full">
                                            Crear Cuenta
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
