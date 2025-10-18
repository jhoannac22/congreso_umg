import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminNavigation from '../components/AdminNavigation';
import { apiClient } from '../lib/api-client';

interface DashboardStats {
    participants: {
        total: number;
        internal: number;
        external: number;
        verified: number;
    };
    attendance: {
        total: number;
        today: number;
        general: number;
        activities: number;
    };
    activities: {
        total: number;
        workshops: number;
        competitions: number;
        upcoming: number;
    };
    diplomas: {
        total: number;
        sent: number;
        pending: number;
    };
    winners: {
        total: number;
        published: number;
        draft: number;
        current_year: number;
    };
    top_activities: Array<{
        id: number;
        name: string;
        type: string;
        participants: number;
        max_capacity: number;
        percentage: number;
    }>;
    alerts: {
        diplomas_pending: number;
        winners_draft: number;
        activities_full: number;
    };
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStats();
        
        // Actualizar cada 30 segundos
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchStats = async () => {
        try {
            setError(null);
            const response = await apiClient.get('/v1/admin/dashboard/stats');
            setStats(response.data.data);
        } catch (err: any) {
            console.error('Error fetching stats:', err);
            setError(err.response?.data?.message || 'Error al cargar estadísticas');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#1E5A96]"></div>
                    <p className="mt-4 text-gray-600 text-lg">Cargando dashboard...</p>
                </div>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <p className="text-xl text-gray-700">{error || 'Error al cargar datos'}</p>
                    <button
                        onClick={fetchStats}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    const totalAlerts = stats.alerts.diplomas_pending + stats.alerts.winners_draft + stats.alerts.activities_full;

    return (
        <>
            <Head title="Dashboard Admin - Congreso UMG" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <AdminNavigation />

                {/* Hero Header */}
                <section className="relative px-6 py-12 overflow-hidden bg-gradient-to-br from-[#1E5A96] to-[#2C7CC1]">
                    <div className="max-w-7xl mx-auto relative z-10 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold font-['Playfair_Display'] mb-2">
                                    Dashboard Principal
                                </h1>
                                <p className="text-xl text-white/90">
                                    Centro de Control del Congreso de Tecnología
                                </p>
                            </div>
                            <button
                                onClick={fetchStats}
                                className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all font-medium"
                            >
                                🔄 Actualizar
                            </button>
                        </div>
                    </div>
                </section>

                {/* Main Metrics */}
                <section className="px-6 py-8 -mt-6 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {/* Participantes */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                                <div className="text-4xl mb-2">👥</div>
                                <div className="text-3xl font-bold text-gray-900">{stats.participants.total}</div>
                                <div className="text-sm text-gray-600">Participantes</div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {stats.participants.internal} internos • {stats.participants.external} externos
                                </div>
                            </div>

                            {/* Asistencia Hoy */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                                <div className="text-4xl mb-2">📅</div>
                                <div className="text-3xl font-bold text-gray-900">{stats.attendance.today}</div>
                                <div className="text-sm text-gray-600">Asistieron Hoy</div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {stats.attendance.total} total
                                </div>
                            </div>

                            {/* Actividades */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                                <div className="text-4xl mb-2">🎯</div>
                                <div className="text-3xl font-bold text-gray-900">{stats.activities.total}</div>
                                <div className="text-sm text-gray-600">Actividades</div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {stats.activities.upcoming} próximas
                                </div>
                            </div>

                            {/* Diplomas */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
                                <div className="text-4xl mb-2">🎓</div>
                                <div className="text-3xl font-bold text-gray-900">{stats.diplomas.sent}</div>
                                <div className="text-sm text-gray-600">Diplomas Enviados</div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {stats.diplomas.total} total
                                </div>
                            </div>

                            {/* Ganadores */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                                <div className="text-4xl mb-2">🏆</div>
                                <div className="text-3xl font-bold text-gray-900">{stats.winners.published}</div>
                                <div className="text-sm text-gray-600">Ganadores</div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {stats.winners.current_year} este año
                                </div>
                            </div>

                            {/* Pendientes */}
                            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                                <div className="text-4xl mb-2">⚠️</div>
                                <div className="text-3xl font-bold text-gray-900">{totalAlerts}</div>
                                <div className="text-sm text-gray-600">Pendientes</div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {stats.diplomas.pending} diplomas
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Alerts Section */}
                {totalAlerts > 0 && (
                    <section className="px-6 py-4">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6">
                                <div className="flex items-center mb-3">
                                    <div className="text-2xl mr-3">⚠️</div>
                                    <h3 className="text-lg font-bold text-orange-900">Tareas Pendientes</h3>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {stats.alerts.diplomas_pending > 0 && (
                                        <Link
                                            href="/admin/diplomas"
                                            className="bg-white rounded-lg p-4 hover:shadow-lg transition-all border border-orange-200"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-2xl font-bold text-orange-600">{stats.alerts.diplomas_pending}</div>
                                                    <div className="text-sm text-gray-700">Diplomas por enviar</div>
                                                </div>
                                                <div className="text-3xl">🎓</div>
                                            </div>
                                        </Link>
                                    )}
                                    
                                    {stats.alerts.winners_draft > 0 && (
                                        <Link
                                            href="/admin/winners"
                                            className="bg-white rounded-lg p-4 hover:shadow-lg transition-all border border-orange-200"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-2xl font-bold text-orange-600">{stats.alerts.winners_draft}</div>
                                                    <div className="text-sm text-gray-700">Ganadores sin publicar</div>
                                                </div>
                                                <div className="text-3xl">🏆</div>
                                            </div>
                                        </Link>
                                    )}
                                    
                                    {stats.alerts.activities_full > 0 && (
                                        <div className="bg-white rounded-lg p-4 border border-orange-200">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-2xl font-bold text-orange-600">{stats.alerts.activities_full}</div>
                                                    <div className="text-sm text-gray-700">Actividades llenas</div>
                                                </div>
                                                <div className="text-3xl">🎯</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <div className="px-6 py-8">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
                        {/* Top Activities */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span>📈</span> Actividades Más Populares
                            </h2>
                            <div className="space-y-4">
                                {stats.top_activities.map((activity, index) => (
                                    <div key={activity.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                                                <span className="font-medium text-gray-900">{activity.name}</span>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-600">
                                                {activity.participants}/{activity.max_capacity || '∞'}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${
                                                    activity.percentage >= 100 ? 'bg-red-500' :
                                                    activity.percentage >= 80 ? 'bg-orange-500' :
                                                    activity.percentage >= 50 ? 'bg-yellow-500' :
                                                    'bg-green-500'
                                                }`}
                                                style={{ width: `${Math.min(activity.percentage, 100)}%` }}
                                            ></div>
                                        </div>
                                        {activity.percentage >= 100 && (
                                            <div className="text-xs text-red-600 font-semibold">⚠️ CUPO LLENO</div>
                                        )}
                                    </div>
                                ))}
                                
                                {stats.top_activities.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        No hay actividades con inscripciones
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span>🚀</span> Accesos Rápidos
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    href="/qr-scanner"
                                    className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-xl transition-all group"
                                >
                                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📱</div>
                                    <div className="font-semibold">Scanner QR</div>
                                    <div className="text-xs text-white/80">Registrar asistencia</div>
                                </Link>

                                <Link
                                    href="/admin/diplomas"
                                    className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 hover:shadow-xl transition-all group"
                                >
                                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🎓</div>
                                    <div className="font-semibold">Diplomas</div>
                                    <div className="text-xs text-white/80">Gestionar diplomas</div>
                                </Link>

                                <Link
                                    href="/admin/attendance"
                                    className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-xl transition-all group"
                                >
                                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📊</div>
                                    <div className="font-semibold">Asistencia</div>
                                    <div className="text-xs text-white/80">Ver reportes</div>
                                </Link>

                                <Link
                                    href="/admin/winners"
                                    className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6 hover:shadow-xl transition-all group"
                                >
                                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🏆</div>
                                    <div className="font-semibold">Ganadores</div>
                                    <div className="text-xs text-white/80">Gestionar ganadores</div>
                                </Link>

                                <Link
                                    href="/activities"
                                    className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-xl transition-all group"
                                >
                                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
                                    <div className="font-semibold">Actividades</div>
                                    <div className="text-xs text-white/80">Ver actividades</div>
                                </Link>

                                <Link
                                    href="/"
                                    className="bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-xl p-6 hover:shadow-xl transition-all group"
                                >
                                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🏠</div>
                                    <div className="font-semibold">Inicio</div>
                                    <div className="text-xs text-white/80">Página principal</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Stats */}
                <section className="px-6 py-4">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
                        {/* Distribución de Participantes */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">👥 Distribución de Participantes</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">🎓 Estudiantes Internos</span>
                                    <span className="font-bold text-blue-600">{stats.participants.internal}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">🏫 Estudiantes Externos</span>
                                    <span className="font-bold text-green-600">{stats.participants.external}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">✅ Emails Verificados</span>
                                    <span className="font-bold text-purple-600">{stats.participants.verified}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tipos de Actividades */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">🎯 Tipos de Actividades</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">📚 Talleres</span>
                                    <span className="font-bold text-blue-600">{stats.activities.workshops}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">🏆 Competencias</span>
                                    <span className="font-bold text-yellow-600">{stats.activities.competitions}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">📅 Próximas</span>
                                    <span className="font-bold text-purple-600">{stats.activities.upcoming}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Info */}
                <section className="px-6 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gradient-to-r from-[#1E5A96] to-[#2C7CC1] rounded-xl p-6 text-white text-center">
                            <p className="text-sm">
                                💡 Este dashboard se actualiza automáticamente cada 30 segundos
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

