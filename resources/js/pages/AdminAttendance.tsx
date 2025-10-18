import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminNavigation from '../components/AdminNavigation';
import { apiClient } from '../lib/api-client';

interface Participant {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    type: string;
}

interface Activity {
    id: number;
    name: string;
    type: string;
}

interface Attendance {
    id: number;
    participant_id: number;
    activity_id: number | null;
    check_in_time: string;
    check_out_time: string | null;
    type: string;
    participant?: Participant;
    activity?: Activity;
}

interface Stats {
    total: number;
    today: number;
    by_type: {
        general: number;
        activity: number;
    };
    by_activity: Array<{
        activity: string;
        count: number;
    }>;
    recent: Attendance[];
}

export default function AdminAttendance() {
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Filtros
    const [filters, setFilters] = useState({
        search: '',
        activity_id: '',
        date_from: '',
        date_to: '',
        type: ''
    });

    useEffect(() => {
        fetchData();
        fetchActivities();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Obtener asistencias y estadísticas
            const params = new URLSearchParams();
            if (filters.date_from) params.append('date_from', filters.date_from);
            if (filters.date_to) params.append('date_to', filters.date_to);
            if (filters.activity_id) params.append('activity_id', filters.activity_id);
            
            const [attendanceResponse, statsResponse] = await Promise.all([
                apiClient.get(`/v1/admin/reports/attendance?${params.toString()}`),
                apiClient.get('/v1/admin/attendance/stats')
            ]);
            
            setAttendances(attendanceResponse.data.data || []);
            setStats(statsResponse.data.data);
        } catch (err: any) {
            console.error('Error fetching data:', err);
            setError(err.response?.data?.message || 'Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const fetchActivities = async () => {
        try {
            const response = await apiClient.get('/v1/activities');
            setActivities(response.data.data || []);
        } catch (err) {
            console.error('Error fetching activities:', err);
        }
    };

    const handleExportExcel = async () => {
        try {
            const params = new URLSearchParams();
            if (filters.date_from) params.append('date_from', filters.date_from);
            if (filters.date_to) params.append('date_to', filters.date_to);
            if (filters.activity_id) params.append('activity_id', filters.activity_id);
            
            const response = await apiClient.get(`/v1/admin/attendance/export-excel?${params.toString()}`);
            
            // Crear CSV y descargar
            const csvContent = response.data.data.map((row: any[]) => row.join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = response.data.filename;
            link.click();
            URL.revokeObjectURL(link.href);
            
            alert('Reporte exportado exitosamente');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error al exportar reporte');
        }
    };

    const applyFilters = () => {
        fetchData();
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            activity_id: '',
            date_from: '',
            date_to: '',
            type: ''
        });
    };

    // Filtrar asistencias en el frontend
    const filteredAttendances = attendances.filter(attendance => {
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const participantName = `${attendance.participant?.first_name} ${attendance.participant?.last_name}`.toLowerCase();
            const email = attendance.participant?.email?.toLowerCase() || '';
            if (!participantName.includes(searchLower) && !email.includes(searchLower)) {
                return false;
            }
        }
        
        if (filters.type && attendance.type !== filters.type) {
            return false;
        }
        
        return true;
    });

    return (
        <>
            <Head title="Dashboard de Asistencia - Congreso UMG" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <AdminNavigation />

                {/* Header */}
                <section className="relative px-6 py-16 overflow-hidden bg-gradient-to-br from-[#1E5A96] to-[#2C7CC1]">
                    <div className="max-w-7xl mx-auto relative z-10 text-white">
                        <div className="text-6xl mb-4">📊</div>
                        <h1 className="text-5xl lg:text-6xl font-bold font-['Playfair_Display'] mb-4">
                            Dashboard de Asistencia
                        </h1>
                        <p className="text-xl text-white/90">
                            Reportes y estadísticas de asistencia al congreso
                        </p>
                    </div>
                </section>

                {/* Stats Cards */}
                {stats && (
                    <section className="px-6 py-8 -mt-8 relative z-10">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm font-medium">Total Asistencias</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                                        </div>
                                        <div className="text-4xl">👥</div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm font-medium">Asistencias Hoy</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.today}</p>
                                        </div>
                                        <div className="text-4xl">📅</div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm font-medium">Asist. General</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.by_type.general}</p>
                                        </div>
                                        <div className="text-4xl">🏛️</div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm font-medium">Asist. Actividades</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.by_type.activity}</p>
                                        </div>
                                        <div className="text-4xl">🎯</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Asistencia por Actividad */}
                {stats && stats.by_activity.length > 0 && (
                    <section className="px-6 py-4">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">📈 Asistencia por Actividad</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {stats.by_activity.map((item, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-700 truncate">{item.activity}</p>
                                                    <p className="text-2xl font-bold text-blue-600 mt-1">{item.count}</p>
                                                </div>
                                                <div className="text-3xl ml-2">🎓</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Filters and Actions */}
                <section className="px-6 py-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                            <div className="space-y-4">
                                {/* Fila 1: Búsqueda y tipo */}
                                <div className="flex flex-wrap gap-4">
                                    <input
                                        type="text"
                                        placeholder="Buscar por nombre o email..."
                                        value={filters.search}
                                        onChange={(e) => setFilters({...filters, search: e.target.value})}
                                        className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    
                                    <select
                                        value={filters.type}
                                        onChange={(e) => setFilters({...filters, type: e.target.value})}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Todos los tipos</option>
                                        <option value="general">General</option>
                                        <option value="activity">Actividad</option>
                                    </select>
                                    
                                    <select
                                        value={filters.activity_id}
                                        onChange={(e) => setFilters({...filters, activity_id: e.target.value})}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Todas las actividades</option>
                                        {activities.map(activity => (
                                            <option key={activity.id} value={activity.id}>
                                                {activity.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                {/* Fila 2: Fechas y acciones */}
                                <div className="flex flex-wrap gap-4 items-center">
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-gray-700">Desde:</label>
                                        <input
                                            type="date"
                                            value={filters.date_from}
                                            onChange={(e) => setFilters({...filters, date_from: e.target.value})}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-gray-700">Hasta:</label>
                                        <input
                                            type="date"
                                            value={filters.date_to}
                                            onChange={(e) => setFilters({...filters, date_to: e.target.value})}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div className="flex gap-2 ml-auto">
                                        <button
                                            onClick={applyFilters}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                        >
                                            🔍 Aplicar Filtros
                                        </button>
                                        
                                        <button
                                            onClick={clearFilters}
                                            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                                        >
                                            ✖️ Limpiar
                                        </button>
                                        
                                        <button
                                            onClick={handleExportExcel}
                                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                        >
                                            📊 Exportar Excel
                                        </button>
                                        
                                        <button
                                            onClick={fetchData}
                                            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                                        >
                                            🔄 Refrescar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Table */}
                <section className="px-6 pb-16">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E5A96]"></div>
                                <p className="mt-4 text-gray-600">Cargando asistencias...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">⚠️</div>
                                <p className="text-xl text-gray-700">{error}</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Registros de Asistencia ({filteredAttendances.length})
                                    </h3>
                                </div>
                                
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ID
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Participante
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tipo Part.
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actividad
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tipo Asist.
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fecha y Hora
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredAttendances.map((attendance) => (
                                                <tr key={attendance.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        #{attendance.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {attendance.participant?.first_name} {attendance.participant?.last_name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">{attendance.participant?.email}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            attendance.participant?.type === 'interno' 
                                                                ? 'bg-blue-100 text-blue-800' 
                                                                : 'bg-green-100 text-green-800'
                                                        }`}>
                                                            {attendance.participant?.type === 'interno' ? '🎓 Interno' : '🏫 Externo'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900 max-w-xs truncate">
                                                            {attendance.activity?.name || 'Asistencia General'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            attendance.type === 'general' 
                                                                ? 'bg-gray-100 text-gray-800' 
                                                                : 'bg-purple-100 text-purple-800'
                                                        }`}>
                                                            {attendance.type === 'general' ? '🏛️ General' : '🎯 Actividad'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(attendance.check_in_time).toLocaleString('es-ES', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {filteredAttendances.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🔍</div>
                                        <p className="text-xl text-gray-600">No se encontraron registros de asistencia</p>
                                        <p className="text-sm text-gray-500 mt-2">Intenta ajustar los filtros o escanea algunos códigos QR</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}

