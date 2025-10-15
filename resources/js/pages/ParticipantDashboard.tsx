import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import UMGLogo from '../components/UMGLogo';
import Button from '../components/Button';
import Navigation from '../components/Navigation';

interface Participant {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    type: 'interno' | 'externo';
    school?: string;
    student_id?: string;
    created_at: string;
    qr_code?: string;
}

interface Activity {
    id: number;
    name: string;
    type: string;
    start_date: string;
    end_date: string;
    location: string;
    instructor?: string;
    category?: {
        name: string;
        color: string;
    };
    registration: {
        status: string;
        registered_at: string;
        notes?: string;
    };
}

interface DashboardStats {
    totalActivities: number;
    completedActivities: number;
    upcomingActivities: number;
    daysUntilEvent: number;
    participationScore: number;
}

export default function ParticipantDashboard() {
    const [participant, setParticipant] = useState<Participant | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [stats, setStats] = useState<DashboardStats>({
        totalActivities: 0,
        completedActivities: 0,
        upcomingActivities: 0,
        daysUntilEvent: 0,
        participationScore: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'calendar'>('overview');

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                // Obtener datos del participante desde localStorage
                const participantData = localStorage.getItem('participant');
                if (!participantData) {
                    setError('No se encontraron datos del participante. Por favor, regístrate primero.');
                    setLoading(false);
                    return;
                }

                const participant = JSON.parse(participantData);
                setParticipant(participant);

                // Cargar actividades del participante
                const response = await fetch(`/api/v1/my-activities?participant_id=${participant.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setActivities(data.data || []);
                    
                    // Calcular estadísticas
                    const totalActivities = data.data?.length || 0;
                    const completedActivities = data.data?.filter((activity: Activity) => 
                        activity.registration.status === 'attended'
                    ).length || 0;
                    const upcomingActivities = data.data?.filter((activity: Activity) => 
                        new Date(activity.start_date) > new Date() && 
                        ['registered', 'confirmed'].includes(activity.registration.status)
                    ).length || 0;
                    
                    // Calcular días hasta el evento (asumiendo que es el 15 de noviembre)
                    const eventDate = new Date('2025-11-15');
                    const today = new Date();
                    const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
                    
                    // Calcular puntuación de participación
                    const participationScore = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
                    
                    setStats({
                        totalActivities,
                        completedActivities,
                        upcomingActivities,
                        daysUntilEvent: Math.max(0, daysUntilEvent),
                        participationScore
                    });
                }
                
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los datos del dashboard');
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const downloadQRCode = () => {
        if (participant?.qr_code) {
            const link = document.createElement('a');
            link.href = participant.qr_code;
            link.download = `QR_${participant.first_name}_${participant.last_name}.png`;
            link.click();
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

    const getUpcomingActivities = () => {
        return activities.filter(activity => 
            new Date(activity.start_date) > new Date() && 
            ['registered', 'confirmed'].includes(activity.registration.status)
        ).slice(0, 3);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'registered': return 'bg-blue-100 text-blue-800';
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'attended': return 'bg-purple-100 text-purple-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'registered': return 'Registrado';
            case 'confirmed': return 'Confirmado';
            case 'attended': return 'Asistió';
            case 'cancelled': return 'Cancelado';
            default: return status;
        }
    };

    if (loading) {
        return (
            <>
                <Head title="Mi Perfil - Congreso de Tecnología UMG" />
                <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B22222] mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando perfil...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error || !participant) {
        return (
            <>
                <Head title="Error - Congreso de Tecnología UMG" />
                <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Button href="/register" variant="primary">
                            Regístrate Ahora
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Mi Perfil - Congreso de Tecnología UMG">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link 
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" 
                    rel="stylesheet" 
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                    <div className="absolute top-40 left-10 w-72 h-72 bg-[#B22222] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#1E5A96] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
                </div>

                {/* Navigation */}
                <Navigation />

                {/* Main Content */}
                <div className="px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        {/* Welcome Header */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full shadow-2xl mb-6 animate-bounce-slow">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 font-['Playfair_Display'] mb-6 leading-tight">
                                ¡Bienvenido,
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#B22222] to-[#D4AF37]">
                                    {participant.first_name}!
                                </span>
                            </h2>
                            <p className="text-xl lg:text-2xl text-gray-600 font-light max-w-2xl mx-auto mb-8">
                                Tu centro de control del Congreso de Tecnología UMG
                            </p>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#D4AF37] mx-auto rounded-full shadow-lg"></div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setActiveTab('overview')}
                                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center ${
                                            activeTab === 'overview'
                                                ? 'bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white shadow-lg'
                                                : 'text-gray-600 hover:text-[#B22222] hover:bg-gray-50'
                                        }`}
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Resumen
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('activities')}
                                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center ${
                                            activeTab === 'activities'
                                                ? 'bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white shadow-lg'
                                                : 'text-gray-600 hover:text-[#B22222] hover:bg-gray-50'
                                        }`}
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                        Mis Actividades
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('calendar')}
                                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center ${
                                            activeTab === 'calendar'
                                                ? 'bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white shadow-lg'
                                                : 'text-gray-600 hover:text-[#B22222] hover:bg-gray-50'
                                        }`}
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Calendario
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'overview' && (
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Main Content */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Statistics Cards */}
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600">Total Actividades</p>
                                                    <p className="text-3xl font-bold text-[#B22222]">{stats.totalActivities}</p>
                                                </div>
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#B22222] to-[#8B1A1A] rounded-xl flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600">Próximas</p>
                                                    <p className="text-3xl font-bold text-[#D4AF37]">{stats.upcomingActivities}</p>
                                                </div>
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-xl flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600">Completadas</p>
                                                    <p className="text-3xl font-bold text-green-600">{stats.completedActivities}</p>
                                                </div>
                                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-600">Puntuación</p>
                                                    <p className="text-3xl font-bold text-purple-600">{stats.participationScore}%</p>
                                                </div>
                                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Upcoming Activities */}
                                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                                <svg className="w-6 h-6 mr-3 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Próximas Actividades
                                            </h3>
                                            <Button href="/my-activities" variant="outline" size="sm">
                                                Ver Todas
                                            </Button>
                                        </div>
                                        
                                        {getUpcomingActivities().length > 0 ? (
                                            <div className="space-y-4">
                                                {getUpcomingActivities().map((activity) => (
                                                    <div key={activity.id} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-[#D4AF37]/30 transition-colors duration-200">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-xl flex items-center justify-center mr-4">
                                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-800">{activity.name}</h4>
                                                            <p className="text-sm text-gray-600">{formatDate(activity.start_date)}</p>
                                                            <p className="text-sm text-gray-500">{activity.location}</p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(activity.registration.status)}`}>
                                                                {getStatusText(activity.registration.status)}
                                                            </span>
                                                            <Link href={`/activities/${activity.id}`} className="text-[#B22222] hover:text-[#8B1A1A] transition-colors">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <h4 className="text-lg font-semibold text-gray-800 mb-2">No hay actividades próximas</h4>
                                                <p className="text-gray-600 mb-4">Explora las actividades disponibles e inscríbete en las que te interesen.</p>
                                                <Button href="/activities" variant="primary">
                                                    Explorar Actividades
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                            <svg className="w-6 h-6 mr-3 text-[#B22222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Acciones Rápidas
                                        </h3>
                                        
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <Button href="/activities" variant="primary" className="w-full h-16 flex items-center justify-center">
                                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                                </svg>
                                                Explorar Actividades
                                            </Button>
                                            
                                            <Button href="/my-activities" variant="secondary" className="w-full h-16 flex items-center justify-center">
                                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                </svg>
                                                Mis Actividades
                                            </Button>
                                            
                                            <Button href="/faq" variant="outline" className="w-full h-16 flex items-center justify-center">
                                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Preguntas Frecuentes
                                            </Button>
                                            
                                            <Button href="/" variant="outline" className="w-full h-16 flex items-center justify-center">
                                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                Página Principal
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-8">
                                    {/* Profile Info */}
                                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                            <svg className="w-6 h-6 mr-3 text-[#B22222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Mi Perfil
                                        </h3>
                                        
                                        <div className="space-y-4">
                                            <div className="text-center mb-6">
                                                <div className="w-20 h-20 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <span className="text-2xl font-bold text-white">
                                                        {participant.first_name[0]}{participant.last_name[0]}
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-gray-800">{participant.first_name} {participant.last_name}</h4>
                                                <p className="text-sm text-gray-600">{participant.email}</p>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">Tipo</span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        participant.type === 'interno' 
                                                            ? 'bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white' 
                                                            : 'bg-gradient-to-r from-[#D4AF37] to-[#B22222] text-white'
                                                    }`}>
                                                        {participant.type === 'interno' ? 'Estudiante UMG' : 'Estudiante Externo'}
                                                    </span>
                                                </div>
                                                
                                                {participant.student_id && (
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-600">Carnet</span>
                                                        <span className="text-sm font-mono text-gray-800">{participant.student_id}</span>
                                                    </div>
                                                )}
                                                
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-600">Registrado</span>
                                                    <span className="text-sm text-gray-800">
                                                        {new Date(participant.created_at).toLocaleDateString('es-GT', {
                                                            day: 'numeric',
                                                            month: 'short'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* QR Code */}
                                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                            <svg className="w-6 h-6 mr-3 text-[#B22222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                            </svg>
                                            Mi Código QR
                                        </h3>
                                        
                                        <div className="text-center">
                                            {participant.qr_code ? (
                                                <>
                                                    <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block mb-4">
                                                        <img 
                                                            src={participant.qr_code} 
                                                            alt="Código QR del participante"
                                                            className="w-32 h-32 mx-auto"
                                                        />
                                                    </div>
                                                    
                                                    <p className="text-gray-600 text-sm mb-4">
                                                        Presenta este código en el evento
                                                    </p>
                                                    
                                                    <Button 
                                                        onClick={downloadQRCode}
                                                        variant="outline"
                                                        className="w-full"
                                                    >
                                                        📱 Descargar QR
                                                    </Button>
                                                </>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl inline-block mb-4 border-2 border-dashed border-gray-300">
                                                        <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">
                                                        Tu código QR se generará pronto
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Event Countdown */}
                                    <div className="bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-2xl p-8 shadow-lg text-white">
                                        <h3 className="text-2xl font-bold mb-6 flex items-center">
                                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Días Restantes
                                        </h3>
                                        
                                        <div className="text-center">
                                            <div className="text-5xl font-bold mb-2">{stats.daysUntilEvent}</div>
                                            <p className="text-lg opacity-90">Hasta el evento</p>
                                            <p className="text-sm opacity-75 mt-2">15 de Noviembre, 2025</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'activities' && (
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-3xl font-bold text-gray-800 flex items-center">
                                        <svg className="w-8 h-8 mr-3 text-[#B22222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                        Todas Mis Actividades
                                    </h3>
                                    <Button href="/activities" variant="primary">
                                        Explorar Más
                                    </Button>
                                </div>
                                
                                {activities.length > 0 ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {activities.map((activity) => (
                                            <div key={activity.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        activity.type === 'taller' 
                                                            ? 'bg-[#E1D1CE] text-[#1C6E9A]' 
                                                            : 'bg-[#1C6E9A] text-white'
                                                    }`}>
                                                        {activity.type === 'taller' ? 'Taller' : 'Competencia'}
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(activity.registration.status)}`}>
                                                        {getStatusText(activity.registration.status)}
                                                    </span>
                                                </div>
                                                
                                                <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">{activity.name}</h4>
                                                
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {formatDate(activity.start_date)}
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {activity.location}
                                                    </div>
                                                </div>
                                                
                                                <Link
                                                    href={`/activities/${activity.id}`}
                                                    className="block w-full bg-[#B22222] text-white px-4 py-3 rounded-lg font-semibold text-center hover:bg-[#8B1A1A] transition-colors duration-200"
                                                >
                                                    Ver Detalles
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B22222] rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Aún no te has inscrito en actividades</h3>
                                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                            Explora nuestra lista de talleres y competencias disponibles y regístrate en las que más te interesen.
                                        </p>
                                        <Button href="/activities" variant="primary" size="lg">
                                            Explorar Actividades
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'calendar' && (
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                                    <svg className="w-8 h-8 mr-3 text-[#B22222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Calendario de Actividades
                                </h3>
                                
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B22222] rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Calendario en Desarrollo</h3>
                                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                        Próximamente podrás ver todas tus actividades en un calendario interactivo con fechas y horarios.
                                    </p>
                                    <Button href="/my-activities" variant="primary" size="lg">
                                        Ver Mis Actividades
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
