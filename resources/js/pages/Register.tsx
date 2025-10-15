import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import UMGLogo from '../components/UMGLogo';
import Button from '../components/Button';
import Navigation from '../components/Navigation';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        type: 'externo',
        school: '',
        studentId: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [isUMGStudent, setIsUMGStudent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        // Formatear el número de carnet (remover guiones)
        let processedValue = value;
        if (name === 'studentId') {
            // Remover guiones y espacios, solo números
            processedValue = value.replace(/[-\s]/g, '');
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: processedValue
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Detectar automáticamente si es estudiante UMG por el correo
        if (name === 'email') {
            const isUMG = value.toLowerCase().endsWith('@miumg.edu.gt');
            setIsUMGStudent(isUMG);
            
            // Actualizar el tipo automáticamente
            if (isUMG) {
                setFormData(prev => ({
                    ...prev,
                    email: value,
                    type: 'interno'
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    email: value,
                    type: 'externo'
                }));
            }
        }

        // Validación en tiempo real para contraseñas
        if (name === 'password' || name === 'confirmPassword') {
            if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: 'La confirmación de contraseña no coincide'
                }));
            } else if (name === 'confirmPassword' && formData.password && value === formData.password) {
                setErrors(prev => ({
                    ...prev,
                    confirmPassword: ''
                }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        // Validación de contraseñas
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: 'La confirmación de contraseña no coincide' });
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setErrors({ password: 'La contraseña debe tener al menos 6 caracteres' });
            setLoading(false);
            return;
        }

        try {
            // Crear el usuario (que incluye la creación del participante)
            const userResponse = await fetch('/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    role: 'participant',
                    phone: formData.phone,
                    // Datos adicionales para el participante
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                        type: formData.email.includes('@miumg.edu.gt') ? 'interno' : 'externo',
                    school: formData.school
                })
            });

            const userData = await userResponse.json();

            if (!userResponse.ok) {
                if (userData.errors) {
                    setErrors(userData.errors);
                } else {
                    setErrors({ general: userData.message || 'Error al crear usuario' });
                }
                return;
            }

            // Success - store token and participant data
            localStorage.setItem('auth_token', userData.access_token);
            localStorage.setItem('user', JSON.stringify(userData.user));
            
            // Store participant data if available
            if (userData.participant) {
                localStorage.setItem('participant', JSON.stringify(userData.participant));
            }
            
            // Redirect to confirmation page
            window.location.href = '/confirmation';
            
        } catch (error) {
            setErrors({ general: 'Error de conexión. Por favor intenta nuevamente.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Registro - Congreso de Tecnología UMG">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link 
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" 
                    rel="stylesheet" 
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
                {/* Navigation */}
                <Navigation />

                {/* Main Content */}
                <div className="px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-5xl font-bold text-gray-800 font-['Playfair_Display'] mb-6">
                                Registro al Congreso
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Únete a nosotros en este evento tecnológico único
                            </p>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#D4AF37] mx-auto rounded-full"></div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Registration Form */}
                            <div className="relative">
                                {/* Decorative Elements */}
                                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#D4AF37] rounded-full opacity-60"></div>
                                <div className="absolute -top-2 -right-6 w-6 h-6 bg-[#B22222] rounded-full opacity-40"></div>
                                <div className="absolute -bottom-4 -left-2 w-4 h-4 bg-[#D4AF37] rounded-full opacity-50"></div>
                                
                                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-800 font-['Playfair_Display'] mb-2">
                                            Formulario de Inscripción
                                        </h3>
                                        <p className="text-gray-600">Completa tus datos para participar</p>
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
                                    {/* Name Fields */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                                Nombre *
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:border-transparent focus:bg-white transition-all duration-200"
                                                    placeholder="Tu nombre"
                                                    required
                                                />
                                            </div>
                                            {errors.first_name && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.first_name}
                                                </p>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                                Apellido *
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:border-transparent focus:bg-white transition-all duration-200"
                                                    placeholder="Tu apellido"
                                                    required
                                                />
                                            </div>
                                            {errors.last_name && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.last_name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                            Correo Electrónico *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                {isUMGStudent ? (
                                                    <svg className="h-5 w-5 text-[#B22222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white transition-all duration-200 ${
                                                    isUMGStudent 
                                                        ? 'border-[#B22222] focus:ring-[#B22222] bg-red-50/50' 
                                                        : 'border-gray-200 focus:ring-[#B22222]'
                                                }`}
                                                placeholder="tu@email.com o estudiante@miumg.edu.gt"
                                                required
                                            />
                                            {isUMGStudent && (
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-[#B22222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        {isUMGStudent && (
                                            <div className="mt-2 p-3 bg-gradient-to-r from-[#B22222]/10 to-[#D4AF37]/10 border border-[#B22222]/20 rounded-lg">
                                                <div className="flex items-center">
                                                    <svg className="w-5 h-5 text-[#B22222] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-[#B22222] font-medium text-sm">
                                                        ¡Estudiante UMG detectado! Solo necesitas completar los campos básicos.
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                            Teléfono {!isUMGStudent && '*'}
                                            {isUMGStudent && (
                                                <span className="text-gray-500 font-normal text-xs ml-1">(Opcional para estudiantes UMG)</span>
                                            )}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:border-transparent focus:bg-white transition-all duration-200 ${
                                                    isUMGStudent ? 'opacity-75' : ''
                                                }`}
                                                placeholder={isUMGStudent ? "Opcional para estudiantes UMG" : "+502 1234-5678"}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password Fields */}
                                    <div className="grid md:grid-cols-2 gap-4">
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
                                                    placeholder="Mínimo 6 caracteres"
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
                                        
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                                Confirmar Contraseña *
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    {formData.confirmPassword && formData.password === formData.confirmPassword ? (
                                                        <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white transition-all duration-200 ${
                                                        formData.confirmPassword && formData.password === formData.confirmPassword 
                                                            ? 'border-green-300 focus:ring-green-500' 
                                                            : errors.confirmPassword 
                                                                ? 'border-red-300 focus:ring-red-500' 
                                                                : 'border-gray-200 focus:ring-[#B22222]'
                                                    }`}
                                                    placeholder="Repite tu contraseña"
                                                    required
                                                />
                                            </div>
                                            {errors.confirmPassword && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.confirmPassword}
                                                </p>
                                            )}
                                            {formData.confirmPassword && formData.password === formData.confirmPassword && !errors.confirmPassword && (
                                                <p className="text-green-600 text-sm mt-1 flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    Las contraseñas coinciden
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Type - Hidden, detected automatically */}
                                    <div className="hidden">
                                        <input
                                            type="hidden"
                                            name="type"
                                            value={formData.type}
                                        />
                                    </div>

                                    {/* Type Display */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                                        <div className="flex items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                                isUMGStudent 
                                                    ? 'bg-gradient-to-br from-[#B22222] to-[#D4AF37]' 
                                                    : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                                            }`}>
                                                {isUMGStudent ? (
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div>
                                                <p className={`font-semibold text-sm ${
                                                    isUMGStudent ? 'text-[#B22222]' : 'text-blue-700'
                                                }`}>
                                                    {isUMGStudent ? 'Estudiante UMG' : 'Estudiante Externo'}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {isUMGStudent 
                                                        ? 'Detectado automáticamente por tu correo institucional'
                                                        : 'Registro completo requerido'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Conditional Fields */}
                                    {formData.type === 'externo' && (
                                        <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#B22222]/10 p-4 rounded-xl border border-[#D4AF37]/20">
                                            <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                                Colegio/Institución *
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="school"
                                                    value={formData.school}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:border-transparent transition-all duration-200"
                                                    placeholder="Nombre de tu colegio"
                                                    required
                                                />
                                            </div>
                                            {errors.school && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.school}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {formData.type === 'interno' && (
                                        <div className="bg-gradient-to-r from-[#B22222]/10 to-[#D4AF37]/10 p-4 rounded-xl border border-[#B22222]/20">
                                            <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                                                Ingrese el número de tu carnet *
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="studentId"
                                                    value={formData.studentId}
                                                    onChange={handleChange}
                                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:border-transparent transition-all duration-200"
                                                    placeholder="Ejemplo: 18902022570 (sin guiones)"
                                                    required
                                                />
                                            </div>
                                            {/* Mostrar formato correcto si detecta guiones */}
                                            {formData.studentId.includes('-') && (
                                                <p className="text-blue-600 text-sm mt-1 flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-3a1 1 0 00-1 1v4a1 1 0 11-2 0V8a1 1 0 011-1z" clipRule="evenodd" />
                                                    </svg>
                                                    Se detectaron guiones. Se guardarán automáticamente sin guiones.
                                                </p>
                                            )}
                                            {errors.student_id && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.student_id}
                                                </p>
                                            )}
                                        </div>
                                    )}

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
                                                    Registrando...
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Registrarse al Congreso
                                                </div>
                                            )}
                                        </Button>
                                    </div>
                                </form>
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
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">¿Qué incluye tu registro?</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        <li className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-[#B22222] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Acceso a todos los talleres y competencias</span>
                                        </li>
                                        <li className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-[#B22222] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Código QR único para asistencia</span>
                                        </li>
                                        <li className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-[#B22222] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Diploma digital de participación</span>
                                        </li>
                                        <li className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-[#B22222] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Materiales y recursos del evento</span>
                                        </li>
                                        <li className="flex items-start space-x-3">
                                            <div className="w-6 h-6 bg-[#B22222] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Certificado de participación</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <div className="text-center mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B22222] rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">¿Ya tienes cuenta?</h3>
                                        <p className="text-gray-600 mb-6">
                                            Si ya te registraste anteriormente, puedes iniciar sesión para acceder a tu perfil.
                                        </p>
                                        <Button href="/login" variant="outline" className="w-full">
                                            Iniciar Sesión
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
