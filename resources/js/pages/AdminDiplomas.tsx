import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminNavigation from '../components/AdminNavigation';
import { 
    getDiplomas, 
    getDiplomaStats, 
    downloadDiploma, 
    sendDiplomaByEmail, 
    sendBulkEmails,
    generateBulkDiplomas,
    Diploma 
} from '../lib/diploma-api';

interface Stats {
    total: number;
    sent: number;
    pending: number;
    by_type: {
        participation: number;
        winner: number;
        special: number;
    };
    recent: Diploma[];
}

interface Activity {
    id: number;
    name: string;
    type: string;
}

export default function AdminDiplomas() {
    const [diplomas, setDiplomas] = useState<Diploma[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDiplomas, setSelectedDiplomas] = useState<number[]>([]);
    
    // Filtros
    const [filters, setFilters] = useState({
        search: '',
        template_type: '',
        sent: ''
    });
    
    // Estados de acción
    const [sendingBulk, setSendingBulk] = useState(false);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);
    const [sendingEmailId, setSendingEmailId] = useState<number | null>(null);
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [bulkGenerating, setBulkGenerating] = useState(false);
    
    // Datos para generación masiva
    const [bulkData, setBulkData] = useState({
        activity_id: '',
        template_type: 'participation' as 'participation' | 'winner' | 'special',
        issue_date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchData();
        fetchActivities();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Obtener diplomas y estadísticas en paralelo
            const [diplomasResponse, statsResponse] = await Promise.all([
                getDiplomas(),
                getDiplomaStats()
            ]);
            
            setDiplomas(Array.isArray(diplomasResponse.data) ? diplomasResponse.data : [diplomasResponse.data]);
            setStats(statsResponse.data);
        } catch (err: any) {
            console.error('Error fetching data:', err);
            setError(err.response?.data?.message || 'Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };
    
    const fetchActivities = async () => {
        try {
            const response = await fetch('/api/v1/activities');
            const data = await response.json();
            setActivities(Array.isArray(data.data) ? data.data : []);
        } catch (err) {
            console.error('Error fetching activities:', err);
        }
    };
    
    const handleBulkGenerate = async () => {
        if (!bulkData.activity_id) {
            alert('Selecciona una actividad');
            return;
        }
        
        if (!confirm('¿Generar diplomas para todos los participantes de esta actividad?')) return;
        
        try {
            setBulkGenerating(true);
            const response = await generateBulkDiplomas(parseInt(bulkData.activity_id), {
                template_type: bulkData.template_type,
                issue_date: bulkData.issue_date
            });
            
            alert(`Generados: ${response.data.generated}\nOmitidos: ${response.data.skipped}\nErrores: ${response.data.errors.length}`);
            setShowBulkModal(false);
            fetchData(); // Refrescar datos
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error al generar diplomas masivos');
        } finally {
            setBulkGenerating(false);
        }
    };

    const handleDownload = async (diploma: Diploma) => {
        try {
            setDownloadingId(diploma.id);
            await downloadDiploma(diploma.id, diploma.diploma_number);
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error al descargar el diploma');
        } finally {
            setDownloadingId(null);
        }
    };

    const handleSendEmail = async (diploma: Diploma) => {
        if (!confirm(`¿Enviar diploma a ${diploma.participant?.email}?`)) return;
        
        try {
            setSendingEmailId(diploma.id);
            await sendDiplomaByEmail(diploma.id);
            alert('Email enviado exitosamente');
            fetchData(); // Refrescar datos
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error al enviar el email');
        } finally {
            setSendingEmailId(null);
        }
    };

    const handleBulkEmail = async () => {
        if (selectedDiplomas.length === 0) {
            alert('Selecciona al menos un diploma');
            return;
        }
        
        if (!confirm(`¿Enviar ${selectedDiplomas.length} diplomas por email?`)) return;
        
        try {
            setSendingBulk(true);
            const response = await sendBulkEmails(selectedDiplomas);
            alert(`Enviados: ${response.data.sent}/${response.data.total}\nErrores: ${response.data.errors.length}`);
            setSelectedDiplomas([]);
            fetchData(); // Refrescar datos
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error al enviar emails masivos');
        } finally {
            setSendingBulk(false);
        }
    };

    const toggleSelectDiploma = (id: number) => {
        setSelectedDiplomas(prev => 
            prev.includes(id) ? prev.filter(diplomaId => diplomaId !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedDiplomas.length === filteredDiplomas.length) {
            setSelectedDiplomas([]);
        } else {
            setSelectedDiplomas(filteredDiplomas.map(d => d.id));
        }
    };

    // Filtrar diplomas
    const filteredDiplomas = diplomas.filter(diploma => {
        if (filters.search && !diploma.participant?.first_name?.toLowerCase().includes(filters.search.toLowerCase()) &&
            !diploma.participant?.last_name?.toLowerCase().includes(filters.search.toLowerCase()) &&
            !diploma.diploma_number.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }
        
        if (filters.template_type && diploma.template_type !== filters.template_type) {
            return false;
        }
        
        if (filters.sent === 'true' && !diploma.is_sent) return false;
        if (filters.sent === 'false' && diploma.is_sent) return false;
        
        return true;
    });

    const getTemplateLabel = (type: string) => {
        switch (type) {
            case 'winner':
                return { icon: '🏆', label: 'Ganador', color: 'yellow' };
            case 'special':
                return { icon: '⭐', label: 'Especial', color: 'purple' };
            default:
                return { icon: '🎓', label: 'Participación', color: 'blue' };
        }
    };

    return (
        <>
            <Head title="Administración de Diplomas - Congreso UMG" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <AdminNavigation />

                {/* Header */}
                <section className="relative px-6 py-16 overflow-hidden bg-gradient-to-br from-[#1E5A96] to-[#2C7CC1]">
                    <div className="max-w-7xl mx-auto relative z-10 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-6xl mb-4">🎓</div>
                                <h1 className="text-5xl lg:text-6xl font-bold font-['Playfair_Display'] mb-4">
                                    Administración de Diplomas
                                </h1>
                                <p className="text-xl text-white/90">
                                    Gestiona todos los diplomas del congreso
                                </p>
                            </div>
                        </div>
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
                                            <p className="text-gray-600 text-sm font-medium">Total Diplomas</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                                        </div>
                                        <div className="text-4xl">📊</div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm font-medium">Enviados</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.sent}</p>
                                        </div>
                                        <div className="text-4xl">✅</div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm font-medium">Pendientes</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pending}</p>
                                        </div>
                                        <div className="text-4xl">⏳</div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm font-medium">Seleccionados</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">{selectedDiplomas.length}</p>
                                        </div>
                                        <div className="text-4xl">☑️</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Filters and Actions */}
                <section className="px-6 py-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                            <div className="flex flex-wrap gap-4 items-center justify-between">
                                {/* Filtros */}
                                <div className="flex flex-wrap gap-4 flex-1">
                                    <input
                                        type="text"
                                        placeholder="Buscar por nombre o número..."
                                        value={filters.search}
                                        onChange={(e) => setFilters({...filters, search: e.target.value})}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    
                                    <select
                                        value={filters.template_type}
                                        onChange={(e) => setFilters({...filters, template_type: e.target.value})}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Todos los tipos</option>
                                        <option value="participation">Participación</option>
                                        <option value="winner">Ganador</option>
                                        <option value="special">Especial</option>
                                    </select>
                                    
                                    <select
                                        value={filters.sent}
                                        onChange={(e) => setFilters({...filters, sent: e.target.value})}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Todos los estados</option>
                                        <option value="true">Enviados</option>
                                        <option value="false">Pendientes</option>
                                    </select>
                                </div>
                                
                                {/* Acciones masivas */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowBulkModal(true)}
                                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                                    >
                                        ➕ Generar Masivo
                                    </button>
                                    
                                    <button
                                        onClick={handleBulkEmail}
                                        disabled={selectedDiplomas.length === 0 || sendingBulk}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                                    >
                                        {sendingBulk ? 'Enviando...' : `📧 Enviar ${selectedDiplomas.length} emails`}
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
                </section>

                {/* Table */}
                <section className="px-6 pb-16">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E5A96]"></div>
                                <p className="mt-4 text-gray-600">Cargando diplomas...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">⚠️</div>
                                <p className="text-xl text-gray-700">{error}</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedDiplomas.length === filteredDiplomas.length && filteredDiplomas.length > 0}
                                                        onChange={toggleSelectAll}
                                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Número
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Participante
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actividad
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tipo
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Estado
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fecha
                                                </th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredDiplomas.map((diploma) => {
                                                const template = getTemplateLabel(diploma.template_type);
                                                return (
                                                    <tr key={diploma.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedDiplomas.includes(diploma.id)}
                                                                onChange={() => toggleSelectDiploma(diploma.id)}
                                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="text-sm font-mono text-gray-900">{diploma.diploma_number}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {diploma.participant?.first_name} {diploma.participant?.last_name}
                                                                </div>
                                                                <div className="text-sm text-gray-500">{diploma.participant?.email}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-gray-900 max-w-xs truncate">
                                                                {diploma.activity?.name}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-${template.color}-100 text-${template.color}-800`}>
                                                                {template.icon} {template.label}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {diploma.is_sent ? (
                                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                    ✅ Enviado
                                                                </span>
                                                            ) : (
                                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                                    ⏳ Pendiente
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(diploma.issue_date).toLocaleDateString('es-ES')}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex gap-2 justify-end">
                                                                <button
                                                                    onClick={() => handleDownload(diploma)}
                                                                    disabled={downloadingId === diploma.id}
                                                                    className="text-blue-600 hover:text-blue-900"
                                                                    title="Descargar"
                                                                >
                                                                    {downloadingId === diploma.id ? '⏳' : '📥'}
                                                                </button>
                                                                <button
                                                                    onClick={() => handleSendEmail(diploma)}
                                                                    disabled={sendingEmailId === diploma.id}
                                                                    className="text-green-600 hover:text-green-900"
                                                                    title="Enviar por email"
                                                                >
                                                                    {sendingEmailId === diploma.id ? '⏳' : '📧'}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {filteredDiplomas.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🔍</div>
                                        <p className="text-xl text-gray-600">No se encontraron diplomas</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
                
                {/* Modal de Generación Masiva */}
                {showBulkModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Generación Masiva de Diplomas</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Actividad
                                    </label>
                                    <select
                                        value={bulkData.activity_id}
                                        onChange={(e) => setBulkData({...bulkData, activity_id: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="">Seleccionar actividad...</option>
                                        {activities.map(activity => (
                                            <option key={activity.id} value={activity.id}>
                                                {activity.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipo de Diploma
                                    </label>
                                    <select
                                        value={bulkData.template_type}
                                        onChange={(e) => setBulkData({...bulkData, template_type: e.target.value as any})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="participation">🎓 Participación</option>
                                        <option value="winner">🏆 Ganador</option>
                                        <option value="special">⭐ Especial</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fecha de Emisión
                                    </label>
                                    <input
                                        type="date"
                                        value={bulkData.issue_date}
                                        onChange={(e) => setBulkData({...bulkData, issue_date: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleBulkGenerate}
                                    disabled={bulkGenerating}
                                    className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 font-medium"
                                >
                                    {bulkGenerating ? 'Generando...' : 'Generar Diplomas'}
                                </button>
                                <button
                                    onClick={() => setShowBulkModal(false)}
                                    disabled={bulkGenerating}
                                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 font-medium"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

