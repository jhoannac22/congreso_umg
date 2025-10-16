import React from 'react';
import { Head, Link } from '@inertiajs/react';
import UMGLogo from '../components/UMGLogo';
import Navigation from '../components/Navigation';

interface Activity {
    id: number;
    name: string;
    description: string;
    type: string;
    start_date: string;
    end_date: string;
    location: string;
    instructor: string;
    instructor_bio: string;
    max_participants: number;
    current_participants: number;
    category?: {
        id: number;
        name: string;
    };
}

interface HomeProps {
    activities?: Activity[];
}

export default function Home({ activities = [] }: HomeProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString('es-GT', options);
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('es-GT', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <>
            <Head title="Congreso de Tecnología UMG 2024">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link 
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap" 
                    rel="stylesheet" 
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                {/* Navigation */}
                <Navigation />

                {/* Hero Section */}
                <section id="inicio" className="relative px-6 py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E5A96]/5 to-[#D4AF37]/5"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left side - Content */}
                            <div className="text-gray-800 space-y-8">
                                <div className="space-y-4">
                                    <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                        🎓 Evento Académico 2024
                                    </div>
                                    <h1 className="text-6xl lg:text-7xl font-bold font-['Playfair_Display'] leading-tight">
                                        Congreso de 
                                        <span className="block text-[#D4AF37] mt-2">Tecnología</span>
                                    </h1>
                                    <p className="text-2xl lg:text-3xl text-gray-600 font-light">
                                        Construyendo el futuro digital
                                    </p>
                                </div>
                                
                                <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                                    Únete al evento tecnológico más importante del año, donde la innovación 
                                    se encuentra con el conocimiento. Una experiencia única para estudiantes 
                                    y profesionales apasionados por la tecnología.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link 
                                        href="/register" 
                                        className="bg-[#B22222] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#8B0000] transition-all duration-200 transform hover:scale-105 shadow-lg text-center"
                                    >
                                        Inscribirse Gratis
                                    </Link>
                                    <Link 
                                        href="#agenda" 
                                        className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#D4AF37] hover:text-white transition-all duration-200 text-center"
                                    >
                                        Ver Agenda
                                    </Link>
                                </div>

                                {/* Key Stats */}
                                <div className="grid grid-cols-3 gap-6 pt-8">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-[#B22222]">12+</div>
                                        <div className="text-sm text-gray-600 mt-1">Actividades</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-[#B22222]">500+</div>
                                        <div className="text-sm text-gray-600 mt-1">Participantes</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-[#B22222]">100%</div>
                                        <div className="text-sm text-gray-600 mt-1">Gratuito</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right side - Logo */}
                            <div className="flex justify-center lg:justify-end">
                                <div className="relative">
                                    <UMGLogo size="xl" className="relative z-10 transform scale-125" />
                                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-xl"></div>
                                    <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#B22222]/20 rounded-full blur-xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Congress Section */}
                <section id="sobre-congreso" className="px-6 py-20 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold text-gray-800 font-['Playfair_Display'] mb-6">
                                Sobre el Congreso
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Un espacio de aprendizaje, innovación y networking para la comunidad tecnológica
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-gray-700 leading-relaxed">
                                        El <strong className="text-[#B22222]">Congreso de Tecnología UMG</strong> es un evento 
                                        anual que tiene como objetivo principal <strong>promover la carrera de Ingeniería en 
                                        Sistemas de Información y Ciencias de la Computación</strong> entre estudiantes de 
                                        nivel medio, así como ofrecer a los alumnos de la facultad una plataforma excepcional 
                                        para participar en diversas actividades académicas y recreativas.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Este evento reúne a estudiantes, profesionales y expertos en tecnología para compartir 
                                        conocimientos, experiencias y las últimas tendencias en el mundo digital. Es una oportunidad 
                                        única para expandir tu red de contactos profesionales y descubrir las infinitas posibilidades 
                                        que ofrece el campo de la tecnología.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-[#1E5A96] to-[#2C7CC1] text-white p-6 rounded-2xl shadow-lg">
                                    <div className="text-4xl mb-3">🎯</div>
                                    <h4 className="font-semibold text-lg mb-2">Misión</h4>
                                    <p className="text-sm text-white/90">
                                        Inspirar y formar a la próxima generación de profesionales en tecnología
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] text-gray-800 p-6 rounded-2xl shadow-lg">
                                    <div className="text-4xl mb-3">👁️</div>
                                    <h4 className="font-semibold text-lg mb-2">Visión</h4>
                                    <p className="text-sm">
                                        Ser el evento tecnológico de referencia en Guatemala
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-[#B22222] to-[#DC3545] text-white p-6 rounded-2xl shadow-lg">
                                    <div className="text-4xl mb-3">💡</div>
                                    <h4 className="font-semibold text-lg mb-2">Innovación</h4>
                                    <p className="text-sm text-white/90">
                                        Conoce las tecnologías emergentes y tendencias del futuro
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-gray-700 to-gray-900 text-white p-6 rounded-2xl shadow-lg">
                                    <div className="text-4xl mb-3">🤝</div>
                                    <h4 className="font-semibold text-lg mb-2">Networking</h4>
                                    <p className="text-sm text-white/90">
                                        Conecta con profesionales y empresas líderes
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Attend Section */}
                <section id="por-que-inscribirse" className="px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold text-gray-800 font-['Playfair_Display'] mb-6">
                                ¿Por Qué Deberías Inscribirte?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Descubre las increíbles oportunidades que te esperan
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Benefit 1 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Aprendizaje Práctico</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Talleres hands-on con tecnologías actuales como IA, Machine Learning, 
                                    Desarrollo Web, Robótica y más. Aprende haciendo con expertos del sector.
                                </p>
                            </div>

                            {/* Benefit 2 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-[#1E5A96] rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Oportunidades Laborales</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Conecta directamente con empresas tecnológicas que buscan talento. 
                                    Descubre ofertas de empleo, pasantías y oportunidades de carrera.
                                </p>
                            </div>

                            {/* Benefit 3 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-[#B22222] rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Certificaciones</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Obtén diplomas digitales verificables por cada actividad completada. 
                                    Fortalece tu CV y perfil profesional en LinkedIn.
                                </p>
                            </div>

                            {/* Benefit 4 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-[#28A745] rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Red de Contactos</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Conoce a estudiantes, profesionales y líderes de la industria. 
                                    Construye relaciones que impulsarán tu carrera profesional.
                                </p>
                            </div>

                            {/* Benefit 5 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-[#FFC107] rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Premios y Reconocimientos</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Participa en competencias y demuestra tus habilidades. Gana premios 
                                    increíbles y reconocimiento en la comunidad tecnológica.
                                </p>
                            </div>

                            {/* Benefit 6 */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-[#6F42C1] rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">100% Gratuito</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Accede a todas las actividades, talleres y competencias sin ningún costo. 
                                    Solo necesitas tu entusiasmo y ganas de aprender.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Agenda Section */}
                <section id="agenda" className="px-6 py-20 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold text-gray-800 font-['Playfair_Display'] mb-6">
                                Agenda de Actividades
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Explora nuestra programación completa de talleres y competencias
                            </p>
                        </div>

                        {activities.length > 0 ? (
                            <div className="space-y-6">
                                {activities.map((activity, index) => (
                                    <div 
                                        key={activity.id}
                                        className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                                    >
                                        <div className="grid lg:grid-cols-4 gap-6 p-8">
                                            {/* Date & Time */}
                                            <div className="lg:col-span-1 flex flex-col justify-center items-center lg:items-start bg-gradient-to-br from-[#1E5A96] to-[#2C7CC1] text-white p-6 rounded-xl">
                                                <div className="text-sm font-semibold uppercase tracking-wider mb-2">
                                                    {formatDate(activity.start_date).split(',')[0]}
                                                </div>
                                                <div className="text-3xl font-bold mb-1">
                                                    {new Date(activity.start_date).getDate()}
                                                </div>
                                                <div className="text-sm mb-4">
                                                    {new Date(activity.start_date).toLocaleDateString('es-GT', { month: 'long', year: 'numeric' })}
                                                </div>
                                                <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                                                    🕐 {formatTime(activity.start_date)}
                                                </div>
                                            </div>

                                            {/* Activity Details */}
                                            <div className="lg:col-span-2 space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        activity.type === 'taller' 
                                                            ? 'bg-blue-100 text-blue-700' 
                                                            : 'bg-purple-100 text-purple-700'
                                                    }`}>
                                                        {activity.type === 'taller' ? '🎓 Taller' : '🏆 Competencia'}
                                                    </span>
                                                    {activity.category && (
                                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                                                            {activity.category.name}
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-800">
                                                    {activity.name}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed line-clamp-2">
                                                    {activity.description}
                                                </p>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                    {activity.location && (
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span>{activity.location}</span>
                                                        </div>
                                                    )}
                                                    {activity.instructor && (
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            <span>{activity.instructor}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Availability & Action */}
                                            <div className="lg:col-span-1 flex flex-col justify-center items-center lg:items-end gap-4">
                                                <div className="text-center lg:text-right">
                                                    <div className="text-sm text-gray-500 mb-1">Cupos disponibles</div>
                                                    <div className="text-2xl font-bold text-[#B22222]">
                                                        {activity.max_participants > 0 
                                                            ? `${activity.max_participants - activity.current_participants}/${activity.max_participants}`
                                                            : 'Ilimitados'
                                                        }
                                                    </div>
                                                </div>
                                                <Link
                                                    href="/register"
                                                    className="bg-[#B22222] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#8B0000] transition-all duration-200 transform hover:scale-105 shadow-md text-center w-full lg:w-auto"
                                                >
                                                    Inscribirse
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📅</div>
                                <p className="text-xl text-gray-600">
                                    La agenda de actividades se publicará próximamente
                                </p>
                            </div>
                        )}

                        <div className="text-center mt-12">
                            <Link
                                href="/activities"
                                className="inline-block border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-3 rounded-xl font-semibold hover:bg-[#D4AF37] hover:text-white transition-all duration-200"
                            >
                                Ver Todas las Actividades
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Featured Speakers Section */}
                <section id="ponentes" className="px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold text-gray-800 font-['Playfair_Display'] mb-6">
                                Ponentes Destacados
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Aprende de expertos reconocidos en la industria tecnológica
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {activities.filter(a => a.instructor).slice(0, 6).map((activity) => (
                                <div 
                                    key={activity.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                                >
                                    <div className="bg-gradient-to-br from-[#1E5A96] to-[#2C7CC1] h-32 relative">
                                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg border-4 border-white">
                                                👨‍💻
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-16 pb-8 px-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            {activity.instructor}
                                        </h3>
                                        <p className="text-sm text-[#D4AF37] font-semibold mb-4">
                                            {activity.name}
                                        </p>
                                        {activity.instructor_bio && (
                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                {activity.instructor_bio}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Career Information Section */}
                <section id="carrera" className="px-6 py-20 bg-gradient-to-br from-[#1E5A96] to-[#2C7CC1] text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold font-['Playfair_Display'] mb-6">
                                Ingeniería en Sistemas de Información y 
                                <span className="block text-[#D4AF37] mt-2">Ciencias de la Computación</span>
                            </h2>
                            <p className="text-xl text-white/90 max-w-3xl mx-auto">
                                Una carrera con futuro ilimitado en la era digital
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        <span className="text-3xl">🎓</span>
                                        ¿Qué es la Carrera?
                                    </h3>
                                    <p className="text-white/90 leading-relaxed">
                                        La Ingeniería en Sistemas de Información y Ciencias de la Computación es una 
                                        disciplina que combina el conocimiento técnico de la informática con la capacidad 
                                        de resolver problemas complejos mediante el desarrollo de software, sistemas y 
                                        soluciones tecnológicas innovadoras.
                                    </p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        <span className="text-3xl">💼</span>
                                        Campo Laboral
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <span className="text-[#D4AF37] mt-1">✓</span>
                                            <span className="text-white/90">Desarrollo de Software y Aplicaciones</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-[#D4AF37] mt-1">✓</span>
                                            <span className="text-white/90">Ciencia de Datos e Inteligencia Artificial</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-[#D4AF37] mt-1">✓</span>
                                            <span className="text-white/90">Ciberseguridad y Redes</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-[#D4AF37] mt-1">✓</span>
                                            <span className="text-white/90">Administración de Bases de Datos</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-[#D4AF37] mt-1">✓</span>
                                            <span className="text-white/90">Arquitectura de Sistemas y Cloud Computing</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                        <span className="text-3xl">🌟</span>
                                        ¿Por Qué Estudiar con Nosotros?
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center text-2xl">
                                                1
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1">Laboratorios Especializados</h4>
                                                <p className="text-sm text-white/80">
                                                    Acceso a tecnología de punta y espacios de innovación
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center text-2xl">
                                                2
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1">Docentes Experimentados</h4>
                                                <p className="text-sm text-white/80">
                                                    Profesionales activos en la industria tecnológica
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center text-2xl">
                                                3
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1">Convenios Empresariales</h4>
                                                <p className="text-sm text-white/80">
                                                    Oportunidades de prácticas profesionales y empleo
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center text-2xl">
                                                4
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1">Certificaciones Internacionales</h4>
                                                <p className="text-sm text-white/80">
                                                    Preparación para certificaciones reconocidas mundialmente
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#D4AF37] text-gray-800 rounded-2xl p-8 text-center">
                                    <div className="text-4xl mb-3">📊</div>
                                    <div className="text-3xl font-bold mb-2">92%</div>
                                    <p className="font-semibold">
                                        De nuestros graduados consiguen empleo en los primeros 6 meses
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <Link
                                href="/register"
                                className="inline-block bg-[#D4AF37] text-gray-800 px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#F4D03F] transition-all duration-200 transform hover:scale-105 shadow-xl"
                            >
                                Descubre Tu Futuro - Inscríbete Ahora
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-6 py-20 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h3 className="text-4xl font-bold text-gray-800 font-['Playfair_Display'] mb-4">
                                ¿Qué Encontrarás en el Congreso?
                            </h3>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Experiencias diseñadas para tu crecimiento profesional
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#1E5A96] to-[#2C7CC1] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-3">Talleres Especializados</h4>
                                <p className="text-gray-600">
                                    Aprende de expertos en IA, desarrollo web, robótica y más tecnologías emergentes
                                </p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#6F42C1] to-[#8B5CF6] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-3">Competencias</h4>
                                <p className="text-gray-600">
                                    Demuestra tus habilidades y compite por premios increíbles en diversos retos
                                </p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#28A745] to-[#48C774] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-3">Asistencia con QR</h4>
                                <p className="text-gray-600">
                                    Sistema moderno de registro con códigos QR únicos para cada participante
                                </p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#B22222] to-[#DC3545] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-800 mb-3">Diplomas Digitales</h4>
                                <p className="text-gray-600">
                                    Recibe certificados verificables al completar las actividades del congreso
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-5xl font-bold text-gray-800 font-['Playfair_Display'] mb-6">
                            ¿Listo para Ser Parte del Futuro?
                        </h3>
                        <p className="text-xl text-gray-600 mb-8">
                            Únete a cientos de estudiantes y profesionales en el evento tecnológico más importante del año. 
                            La inscripción es completamente gratuita.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/register" 
                                className="bg-[#B22222] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#8B0000] transition-all duration-200 transform hover:scale-105 shadow-xl"
                            >
                                Inscribirse Ahora - ¡Es Gratis!
                            </Link>
                            <Link 
                                href="/faq" 
                                className="border-2 border-[#D4AF37] text-[#D4AF37] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#D4AF37] hover:text-white transition-all duration-200"
                            >
                                Preguntas Frecuentes
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="md:col-span-2">
                                <div className="flex items-center space-x-3 mb-4">
                                    <UMGLogo size="sm" />
                                    <div className="text-white">
                                        <h4 className="font-bold">Congreso de Tecnología</h4>
                                        <p className="text-sm text-gray-400">Universidad Mariano Gálvez</p>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm mb-4">
                                    Promoviendo la innovación y el conocimiento tecnológico desde 1966. 
                                    Un evento que inspira a la próxima generación de profesionales en tecnología.
                                </p>
                                <div className="flex gap-4">
                                    <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            
                            <div>
                                <h5 className="text-white font-semibold mb-4">Enlaces Rápidos</h5>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="#inicio" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Inicio</Link></li>
                                    <li><Link href="#agenda" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Agenda</Link></li>
                                    <li><Link href="#ponentes" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Ponentes</Link></li>
                                    <li><Link href="#carrera" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Carrera</Link></li>
                                    <li><Link href="/register" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Inscripción</Link></li>
                                    <li><Link href="/faq" className="text-gray-400 hover:text-[#D4AF37] transition-colors">FAQ</Link></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h5 className="text-white font-semibold mb-4">Contacto</h5>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li className="flex items-start gap-2">
                                        <span>📧</span>
                                        <span>congreso@umg.edu.gt</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>📞</span>
                                        <span>+502 1234-5678</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>📍</span>
                                        <span>Campus Central UMG<br/>Guatemala, Guatemala</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>🌐</span>
                                        <span>www.umg.edu.gt</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
                            <p className="text-gray-400 text-sm">
                                © 2024 Universidad Mariano Gálvez. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
