import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UMGLogo from '../components/UMGLogo';
import Navigation from '../components/Navigation';

export default function Home() {
    return (
        <>
            <Head title="Congreso de Tecnología UMG">
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

                {/* Hero Section */}
                <section id="inicio" className="relative px-6 py-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left side - Content */}
                            <div className="text-gray-800 space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-5xl lg:text-6xl font-bold font-['Playfair_Display'] leading-tight">
                                        Congreso de 
                                        <span className="block text-[#D4AF37]">Tecnología</span>
                                    </h2>
                                    <p className="text-xl lg:text-2xl text-gray-600 font-light">
                                        Promoviendo la innovación y el conocimiento tecnológico
                                    </p>
                                </div>
                                
                                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                                    Un evento anual que busca promover la carrera de ingeniería en sistemas de Informacion y  
                                    Ciencias de la Computacion entre estudiantes de nivel medio y ofrecer a los alumnos de la facultad 
                                    una plataforma para participar en diversas actividades académicas y recreativas.
                                 
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link 
                                        href="/register" 
                                        className="bg-[#B22222] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#8B0000] transition-all duration-200 transform hover:scale-105 shadow-lg"
                                    >
                                        Inscribirse Ahora
                                    </Link>
                                    <Link 
                                        href="/activities" 
                                        className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#D4AF37] hover:text-[#1E5A96] transition-all duration-200"
                                    >
                                        Ver Actividades
                                    </Link>
                                </div>
                            </div>
                            
                            {/* Right side - Logo and decorative elements */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="relative">
                                    <UMGLogo size="xl" className="relative z-10 transform scale-125" />
                                    
                                    {/* Decorative circles */}
                                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-xl"></div>
                                    <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#B22222]/20 rounded-full blur-xl"></div>
                                    <div className="absolute top-1/2 -left-8 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-6 py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-4xl font-bold text-gray-800 font-['Playfair_Display'] mb-4">
                                ¿Qué encontrarás?
                            </h3>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Descubre todas las oportunidades que tenemos preparadas para ti
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-white rounded-2xl p-8 text-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-[#1E5A96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-3">Talleres Especializados</h4>
                                <p className="text-gray-600">
                                    Aprende de expertos en programación, IA, robótica y más
                                </p>
                            </div>
                            
                            {/* Feature 2 */}
                            <div className="bg-white rounded-2xl p-8 text-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-[#1E5A96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-3">Competencias</h4>
                                <p className="text-gray-600">
                                    Demuestra tus habilidades y compite por premios increíbles
                                </p>
                            </div>
                            
                            {/* Feature 3 */}
                            <div className="bg-white rounded-2xl p-8 text-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-[#1E5A96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-3">Control de Asistencia</h4>
                                <p className="text-gray-600">
                                    Sistema moderno de asistencia con códigos QR únicos
                                </p>
                            </div>
                            
                            {/* Feature 4 */}
                            <div className="bg-white rounded-2xl p-8 text-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-[#1E5A96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-3">Diplomas </h4>
                                <p className="text-gray-600">
                                    Recibe tu diploma en formato digital al completar las actividades
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-4xl font-bold text-gray-800 font-['Playfair_Display'] mb-6">
                            ¿Listo para ser parte del futuro?
                        </h3>
                        <p className="text-xl text-gray-600 mb-8">
                            Únete a cientos de estudiantes y profesionales en el evento tecnológico más importante del año
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="#inscripcion" 
                                className="bg-[#B22222] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#8B0000] transition-all duration-200 transform hover:scale-105 shadow-xl"
                            >
                                Inscribirse Gratis
                            </Link>
                            <Link 
                                href="#faq" 
                                className="border-2 border-[#D4AF37] text-[#D4AF37] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#D4AF37] hover:text-[#1E5A96] transition-all duration-200"
                            >
                                Preguntas Frecuentes
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <UMGLogo size="sm" />
                                    <div className="text-white">
                                        <h4 className="font-bold">Congreso de Tecnología</h4>
                                        <p className="text-sm text-gray-400">Universidad Mariano Gálvez</p>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Promoviendo la innovación y el conocimiento tecnológico desde 1966.
                                </p>
                            </div>
                            
                            <div>
                                <h5 className="text-white font-semibold mb-4">Enlaces Rápidos</h5>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="#inicio" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Inicio</Link></li>
                                    <li><Link href="#actividades" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Actividades</Link></li>
                                    <li><Link href="#inscripcion" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Inscripción</Link></li>
                                    <li><Link href="#faq" className="text-gray-400 hover:text-[#D4AF37] transition-colors">FAQ</Link></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h5 className="text-white font-semibold mb-4">Contacto</h5>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li>📧 congreso@umg.edu.gt</li>
                                    <li>📞 +502 1234-5678</li>
                                    <li>📍 Universidad Mariano Gálvez</li>
                                    <li>🌐 www.umg.edu.gt</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
                            <p className="text-gray-400 text-sm">
                                © 2025 Universidad Mariano Gálvez. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
