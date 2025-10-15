import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import UMGLogo from '../components/UMGLogo';
import Button from '../components/Button';

interface Participant {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    type: 'interno' | 'externo';
    school?: string;
    student_id?: string;
    created_at: string;
    qr_code?: string;
}

export default function Dashboard() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchParticipants();
    }, []);

    const deleteParticipant = async (id: number) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este participante? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            const response = await fetch(`/api/v1/participants/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar participante');
            }

            // Actualizar la lista local
            setParticipants(participants.filter(p => p.id !== id));
            alert('Participante eliminado exitosamente');
        } catch (err) {
            alert('Error al eliminar participante: ' + err.message);
            console.error('Error:', err);
        }
    };

    const fetchParticipants = async () => {
        try {
            const response = await fetch('/api/v1/dashboard/participants', {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar participantes');
            }

            const data = await response.json();
            setParticipants(data.data || []);
        } catch (err) {
            setError('Error al cargar los datos de participantes');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-GT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTypeLabel = (type: string) => {
        return type === 'interno' ? 'Estudiante UMG' : 'Estudiante Externo';
    };

    const getTypeColor = (type: string) => {
        return type === 'interno' 
            ? 'bg-gradient-to-r from-[#B22222] to-[#D4AF37]' 
            : 'bg-gradient-to-r from-[#D4AF37] to-[#B22222]';
    };

    if (loading) {
        return (
            <>
                <Head title="Dashboard - Congreso de Tecnología UMG" />
                <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B22222] mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando participantes...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Dashboard - Congreso de Tecnología UMG">
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
                <div className="px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-5xl font-bold text-gray-800 font-['Playfair_Display'] mb-6">
                                Dashboard de Participantes
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Gestiona y visualiza todos los participantes registrados
                            </p>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#D4AF37] mx-auto rounded-full"></div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid md:grid-cols-4 gap-6 mb-12">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Participantes</p>
                                        <p className="text-2xl font-bold text-gray-900">{participants.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B22222] rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Estudiantes UMG</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {participants.filter(p => p.type === 'interno').length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Estudiantes Externos</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {participants.filter(p => p.type === 'externo').length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B22222] rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Registros Hoy</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {participants.filter(p => {
                                                const today = new Date().toDateString();
                                                return new Date(p.created_at).toDateString() === today;
                                            }).length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Participants Table */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-800 font-['Playfair_Display']">
                                    Lista de Participantes
                                </h3>
                                <p className="text-gray-600 mt-1">
                                    Todos los participantes registrados en el congreso
                                </p>
                            </div>

                            {error && (
                                <div className="px-6 py-4 bg-red-50 border-l-4 border-red-400">
                                    <p className="text-red-700">{error}</p>
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Participante
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tipo
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Institución/ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Fecha de Registro
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                QR Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {participants.map((participant) => (
                                            <tr key={participant.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full flex items-center justify-center">
                                                            <span className="text-white font-bold text-sm">
                                                                {participant.first_name.charAt(0)}{participant.last_name.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {participant.first_name} {participant.last_name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                ID: {participant.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{participant.email}</div>
                                                    {participant.phone && (
                                                        <div className="text-sm text-gray-500">{participant.phone}</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getTypeColor(participant.type)}`}>
                                                        {getTypeLabel(participant.type)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {participant.type === 'externo' ? participant.school : participant.student_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatDate(participant.created_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {participant.qr_code ? (
                                                        <div className="flex items-center">
                                                            <img 
                                                                src={participant.qr_code} 
                                                                alt="QR Code" 
                                                                className="w-8 h-8 rounded"
                                                            />
                                                            <span className="ml-2 text-green-600">✓ Generado</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-yellow-600">⏳ Pendiente</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {participants.length === 0 && (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay participantes registrados</h3>
                                    <p className="mt-1 text-sm text-gray-500">Los participantes aparecerán aquí una vez que se registren.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
