import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import UMGLogo from '../components/UMGLogo';
import Button from '../components/Button';

interface Activity {
    id: number;
    name: string;
    description: string;
    type: 'taller' | 'competencia';
    start_date: string;
    end_date: string;
    location: string;
    instructor: string;
    category: string;
    registration: {
        status: string;
        registered_at: string;
        notes: string | null;
    };
}

export default function MyActivities() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadMyActivities();
    }, []);

    const loadMyActivities = async () => {
        try {
            setLoading(true);
            
            // Obtener el participant_id del localStorage (guardado al registrarse)
            const participantData = localStorage.getItem('participant');
            if (!participantData) {
                setError('No se encontró información del participante. Por favor, inicia sesión nuevamente.');
                setLoading(false);
                return;
            }

            const participant = JSON.parse(participantData);
            const participantId = participant.id;

            const response = await fetch(`/api/v1/my-activities?participant_id=${participantId}`, {
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar las actividades');
            }

            const data = await response.json();
            setActivities(data.data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar las actividades');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-GT', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            registered: { text: 'Registrado', color: 'bg-blue-100 text-blue-800' },
            confirmed: { text: 'Confirmado', color: 'bg-green-100 text-green-800' },
            cancelled: { text: 'Cancelado', color: 'bg-red-100 text-red-800' },
            attended: { text: 'Asistido', color: 'bg-purple-100 text-purple-800' },
        };

        const badge = badges[status as keyof typeof badges] || badges.registered;

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                {badge.text}
            </span>
        );
    };

    return (
        <>
            <Head title="Mis Actividades - Congreso de Tecnología UMG">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link 
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" 
                    rel="stylesheet" 
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                {/* Decorative background elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#B22222]/10 to-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#D4AF37]/10 to-[#B22222]/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
                </div>

                {/* Navigation */}
                <nav className="relative z-10 px-6 py-4 backdrop-blur-sm bg-white/70 border-b border-gray-200">
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
                            <Link href="/my-activities" className="text-[#B22222] font-medium">
                                Mis Actividades
                            </Link>
                            <Link href="/faq" className="text-gray-800 hover:text-[#B22222] transition-colors duration-200 font-medium">
                                FAQ
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative px-6 py-20">
                    <div className="max-w-7xl mx-auto text-center">
                        {/* Icon Badge */}
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full shadow-xl mb-6 animate-bounce-slow">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        
                        <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 font-['Playfair_Display'] mb-6 leading-tight">
                            Mis
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#B22222] to-[#D4AF37]">
                                Actividades
                            </span>
                        </h2>
                        <p className="text-xl lg:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-8">
                            Aquí puedes ver todas las actividades en las que te has inscrito
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#D4AF37] mx-auto rounded-full shadow-lg"></div>
                    </div>
                </section>

                {/* Activities Section */}
                <section className="relative px-6 pb-20">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B22222]"></div>
                                <p className="mt-4 text-gray-600">Cargando tus actividades...</p>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="h-6 w-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="text-red-800 font-semibold">Error al cargar actividades</h3>
                                        <p className="text-red-700 text-sm mt-1">{error}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Button href="/activities" variant="outline" size="sm">
                                        Explorar Actividades
                                    </Button>
                                </div>
                            </div>
                        ) : activities.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">No tienes actividades inscritas</h3>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                    Explora nuestro catálogo de talleres y competencias para comenzar tu viaje tecnológico
                                </p>
                                <Button href="/activities" variant="primary" size="lg">
                                    Explorar Actividades
                                </Button>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {activities.map((activity) => (
                                    <div 
                                        key={activity.id}
                                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                                    >
                                        {/* Header with gradient */}
                                        <div className="h-2 w-full bg-gradient-to-r from-[#B22222] to-[#D4AF37]"></div>
                                        
                                        <div className="p-6">
                                            {/* Type and Status Badges */}
                                            <div className="flex items-center justify-between mb-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                                                    activity.type === 'taller' 
                                                        ? 'bg-blue-100 text-blue-800' 
                                                        : 'bg-purple-100 text-purple-800'
                                                }`}>
                                                    {activity.type === 'taller' ? 'Taller' : 'Competencia'}
                                                </span>
                                                
                                                {getStatusBadge(activity.registration.status)}
                                            </div>
                                            
                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                                {activity.name}
                                            </h3>
                                            
                                            {/* Category */}
                                            <div className="flex items-center text-sm text-gray-600 mb-3">
                                                <svg className="w-4 h-4 mr-2 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                                {activity.category}
                                            </div>
                                            
                                            {/* Details */}
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-start text-sm text-gray-600">
                                                    <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="line-clamp-2">{formatDate(activity.start_date)}</span>
                                                </div>
                                                
                                                {activity.location && (
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {activity.location}
                                                    </div>
                                                )}
                                                
                                                {activity.instructor && (
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        {activity.instructor}
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Registration Info */}
                                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 mb-4">
                                                <div className="text-xs text-gray-600 mb-1">Inscrito el:</div>
                                                <div className="text-sm font-semibold text-gray-800">
                                                    {new Date(activity.registration.registered_at).toLocaleDateString('es-GT', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                                {activity.registration.notes && (
                                                    <div className="mt-2 text-xs text-gray-600 italic">
                                                        "{activity.registration.notes}"
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Action Button */}
                                            <Link
                                                href={`/activities/${activity.id}`}
                                                className="block w-full bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white px-4 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                                            >
                                                Ver Detalles
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="relative px-6 pb-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-[#B22222] to-[#D4AF37] rounded-3xl p-8 shadow-2xl text-white">
                            <div className="text-center">
                                <h3 className="text-3xl font-bold mb-4">¿Buscas más actividades?</h3>
                                <p className="text-lg mb-6 opacity-90">
                                    Explora nuestro catálogo completo de talleres y competencias
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button 
                                        href="/activities" 
                                        className="bg-white text-[#B22222] hover:bg-gray-100"
                                    >
                                        Ver Todas las Actividades
                                    </Button>
                                    <Button 
                                        href="/" 
                                        variant="outline"
                                        className="border-2 border-white text-white hover:bg-white/10"
                                    >
                                        Volver al Inicio
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

