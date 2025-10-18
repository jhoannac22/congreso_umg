import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AdminNavigation from '../components/AdminNavigation';
import { apiClient } from '../lib/api-client';

interface Participant {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

interface Activity {
    id: number;
    name: string;
    type: string;
}

interface Winner {
    id: number;
    activity_id: number;
    participant_id: number;
    position: number;
    project_name: string | null;
    project_description: string | null;
    project_image: string | null;
    judges_notes: string | null;
    score: number | null;
    year: number;
    is_published: boolean;
    participant?: Participant;
    activity?: Activity;
}

export default function AdminWinners() {
    const [winners, setWinners] = useState<Winner[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [editingWinner, setEditingWinner] = useState<Winner | null>(null);
    const [saving, setSaving] = useState(false);
    
    // Form data
    const [formData, setFormData] = useState({
        activity_id: '',
        participant_id: '',
        position: '1',
        project_name: '',
        project_description: '',
        judges_notes: '',
        score: '',
        year: new Date().getFullYear().toString(),
        is_published: false
    });
    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [winnersRes, activitiesRes, participantsRes] = await Promise.all([
                apiClient.get('/v1/winners?published=false'),
                apiClient.get('/v1/activities'),
                apiClient.get('/v1/participants')
            ]);
            
            setWinners(winnersRes.data.data.data || winnersRes.data.data || []);
            setActivities(activitiesRes.data.data || []);
            setParticipants(participantsRes.data.data || []);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al cargar datos');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('activity_id', formData.activity_id);
            formDataToSend.append('participant_id', formData.participant_id);
            formDataToSend.append('position', formData.position);
            formDataToSend.append('project_name', formData.project_name);
            formDataToSend.append('project_description', formData.project_description);
            formDataToSend.append('judges_notes', formData.judges_notes);
            formDataToSend.append('score', formData.score);
            formDataToSend.append('year', formData.year);
            formDataToSend.append('is_published', formData.is_published ? '1' : '0');
            
            if (imageFile) {
                formDataToSend.append('project_image', imageFile);
            }

            if (editingWinner) {
                formDataToSend.append('_method', 'PUT');
                await apiClient.post(`/v1/winners/${editingWinner.id}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await apiClient.post('/v1/winners', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            alert(editingWinner ? 'Ganador actualizado exitosamente' : 'Ganador registrado exitosamente');
            resetForm();
            fetchData();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error al guardar ganador');
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (winner: Winner) => {
        setEditingWinner(winner);
        setFormData({
            activity_id: winner.activity_id.toString(),
            participant_id: winner.participant_id.toString(),
            position: winner.position.toString(),
            project_name: winner.project_name || '',
            project_description: winner.project_description || '',
            judges_notes: winner.judges_notes || '',
            score: winner.score?.toString() || '',
            year: winner.year.toString(),
            is_published: winner.is_published
        });
        setImagePreview(winner.project_image ? `/storage/${winner.project_image}` : null);
        setShowModal(true);
    };

    const handleDelete = async (winner: Winner) => {
        if (!confirm(`¿Eliminar ganador ${winner.participant?.first_name} ${winner.participant?.last_name}?`)) return;
        
        try {
            await apiClient.delete(`/v1/winners/${winner.id}`);
            alert('Ganador eliminado exitosamente');
            fetchData();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error al eliminar ganador');
        }
    };

    const handleTogglePublish = async (winner: Winner) => {
        try {
            const endpoint = winner.is_published 
                ? `/v1/judge/winners/unpublish/${winner.id}`
                : `/v1/judge/winners/publish/${winner.id}`;
            
            await apiClient.post(endpoint);
            alert(winner.is_published ? 'Ganador despublicado' : 'Ganador publicado');
            fetchData();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error al cambiar estado');
        }
    };

    const resetForm = () => {
        setEditingWinner(null);
        setFormData({
            activity_id: '',
            participant_id: '',
            position: '1',
            project_name: '',
            project_description: '',
            judges_notes: '',
            score: '',
            year: new Date().getFullYear().toString(),
            is_published: false
        });
        setImageFile(null);
        setImagePreview(null);
        setShowModal(false);
    };

    const getPositionLabel = (position: number) => {
        const labels: Record<number, string> = {
            1: '🥇 1er Lugar',
            2: '🥈 2do Lugar',
            3: '🥉 3er Lugar'
        };
        return labels[position] || `🏆 ${position}° Lugar`;
    };

    return (
        <>
            <Head title="Administración de Ganadores - Congreso UMG" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <AdminNavigation />

                {/* Header */}
                <section className="relative px-6 py-16 overflow-hidden bg-gradient-to-br from-[#D4AF37] to-[#B8860B]">
                    <div className="max-w-7xl mx-auto relative z-10 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-6xl mb-4">🏆</div>
                                <h1 className="text-5xl lg:text-6xl font-bold font-['Playfair_Display'] mb-4">
                                    Administración de Ganadores
                                </h1>
                                <p className="text-xl text-white/90">
                                    Gestiona los ganadores de competencias
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Actions */}
                <section className="px-6 py-8 -mt-8 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <button
                            onClick={() => { resetForm(); setShowModal(true); }}
                            className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white rounded-lg hover:shadow-lg transition-all font-semibold text-lg"
                        >
                            ➕ Registrar Nuevo Ganador
                        </button>
                    </div>
                </section>

                {/* Table */}
                <section className="px-6 pb-16">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
                                <p className="mt-4 text-gray-600">Cargando ganadores...</p>
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
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Año</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Competencia</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ganador</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proyecto</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posición</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Puntuación</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {winners.map((winner) => (
                                                <tr key={winner.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {winner.year}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900 max-w-xs truncate">
                                                            {winner.activity?.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {winner.participant?.first_name} {winner.participant?.last_name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">{winner.participant?.email}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900 max-w-xs truncate">
                                                            {winner.project_name || 'Sin nombre'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm font-semibold">
                                                            {getPositionLabel(winner.position)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {winner.score ? `${winner.score}/100` : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {winner.is_published ? (
                                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                                ✅ Publicado
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                                ⏳ Borrador
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                        <div className="flex gap-2 justify-end">
                                                            <button
                                                                onClick={() => handleEdit(winner)}
                                                                className="text-blue-600 hover:text-blue-900"
                                                                title="Editar"
                                                            >
                                                                ✏️
                                                            </button>
                                                            <button
                                                                onClick={() => handleTogglePublish(winner)}
                                                                className="text-green-600 hover:text-green-900"
                                                                title={winner.is_published ? 'Despublicar' : 'Publicar'}
                                                            >
                                                                {winner.is_published ? '👁️' : '👁️‍🗨️'}
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(winner)}
                                                                className="text-red-600 hover:text-red-900"
                                                                title="Eliminar"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {winners.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🏆</div>
                                        <p className="text-xl text-gray-600">No hay ganadores registrados</p>
                                        <p className="text-sm text-gray-500 mt-2">Registra el primer ganador usando el botón superior</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8 my-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                {editingWinner ? '✏️ Editar Ganador' : '➕ Nuevo Ganador'}
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Columna izquierda */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Competencia *
                                            </label>
                                            <select
                                                required
                                                value={formData.activity_id}
                                                onChange={(e) => setFormData({...formData, activity_id: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Seleccionar...</option>
                                                {activities.filter(a => a.type === 'competencia').map(activity => (
                                                    <option key={activity.id} value={activity.id}>
                                                        {activity.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Participante *
                                            </label>
                                            <select
                                                required
                                                value={formData.participant_id}
                                                onChange={(e) => setFormData({...formData, participant_id: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Seleccionar...</option>
                                                {participants.map(participant => (
                                                    <option key={participant.id} value={participant.id}>
                                                        {participant.first_name} {participant.last_name} - {participant.email}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Posición *
                                                </label>
                                                <select
                                                    required
                                                    value={formData.position}
                                                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="1">🥇 1er Lugar</option>
                                                    <option value="2">🥈 2do Lugar</option>
                                                    <option value="3">🥉 3er Lugar</option>
                                                    {[4,5,6,7,8,9,10].map(pos => (
                                                        <option key={pos} value={pos}>🏆 {pos}° Lugar</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Año *
                                                </label>
                                                <input
                                                    type="number"
                                                    required
                                                    min="2020"
                                                    max={new Date().getFullYear() + 1}
                                                    value={formData.year}
                                                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Puntuación
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    step="0.01"
                                                    value={formData.score}
                                                    onChange={(e) => setFormData({...formData, score: e.target.value})}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    placeholder="0-100"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nombre del Proyecto
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.project_name}
                                                onChange={(e) => setFormData({...formData, project_name: e.target.value})}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="Ej: Sistema de IA para..."
                                            />
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.is_published}
                                                    onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm font-medium text-gray-700">
                                                    Publicar inmediatamente
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Columna derecha */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Imagen del Proyecto
                                            </label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                                {imagePreview ? (
                                                    <div className="space-y-2">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-full h-48 object-cover rounded-lg"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => { setImageFile(null); setImagePreview(null); }}
                                                            className="text-red-600 text-sm hover:text-red-900"
                                                        >
                                                            ✖️ Quitar imagen
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="py-8">
                                                        <div className="text-6xl mb-2">📸</div>
                                                        <label className="cursor-pointer">
                                                            <span className="text-blue-600 hover:text-blue-800 font-medium">
                                                                Click para subir imagen
                                                            </span>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleImageChange}
                                                                className="hidden"
                                                            />
                                                        </label>
                                                        <p className="text-xs text-gray-500 mt-2">JPG, PNG o GIF (max 5MB)</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Descripción del Proyecto
                                            </label>
                                            <textarea
                                                value={formData.project_description}
                                                onChange={(e) => setFormData({...formData, project_description: e.target.value})}
                                                rows={4}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="Describe el proyecto ganador..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Notas de los Jueces
                                            </label>
                                            <textarea
                                                value={formData.judges_notes}
                                                onChange={(e) => setFormData({...formData, judges_notes: e.target.value})}
                                                rows={3}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="Comentarios de los jueces..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white rounded-lg hover:shadow-lg disabled:opacity-50 font-semibold"
                                    >
                                        {saving ? 'Guardando...' : (editingWinner ? '💾 Actualizar Ganador' : '➕ Crear Ganador')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        disabled={saving}
                                        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 font-medium"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

