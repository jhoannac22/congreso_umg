import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navigation from '../components/Navigation';

interface Participant {
    id: number;
    name: string;
    email: string;
    phone?: string;
    institution?: string;
}

interface Activity {
    id: number;
    name: string;
    description: string;
    type: string;
}

interface Winner {
    id: number;
    position: number;
    project_name: string;
    project_description: string;
    project_image: string;
    judges_notes?: string;
    score: number;
    year: number;
    is_published: boolean;
    participant: Participant;
    activity: Activity;
}

interface WinnersProps {
    winners: Winner[];
    years: number[];
}

export default function Winners({ winners = [], years = [] }: WinnersProps) {
    const [selectedYear, setSelectedYear] = useState<number | 'all'>(
        years.length > 0 ? years[0] : 'all'
    );
    const [selectedActivity, setSelectedActivity] = useState<number | 'all'>('all');

    // Filtrar ganadores según selección
    const filteredWinners = winners.filter(winner => {
        const yearMatch = selectedYear === 'all' || winner.year === selectedYear;
        const activityMatch = selectedActivity === 'all' || winner.activity.id === selectedActivity;
        return yearMatch && activityMatch;
    });

    // Agrupar por actividad
    const winnersByActivity = filteredWinners.reduce((acc, winner) => {
        const activityId = winner.activity.id;
        if (!acc[activityId]) {
            acc[activityId] = {
                activity: winner.activity,
                winners: []
            };
        }
        acc[activityId].winners.push(winner);
        return acc;
    }, {} as Record<number, { activity: Activity; winners: Winner[] }>);

    // Obtener lista única de actividades
    const activities = Array.from(
        new Map(winners.map(w => [w.activity.id, w.activity])).values()
    );

    const getPositionBadge = (position: number) => {
        const badges: Record<number, { emoji: string; color: string; label: string }> = {
            1: { emoji: '🥇', color: 'from-yellow-400 to-yellow-600', label: '1er Lugar' },
            2: { emoji: '🥈', color: 'from-gray-300 to-gray-500', label: '2do Lugar' },
            3: { emoji: '🥉', color: 'from-orange-400 to-orange-600', label: '3er Lugar' },
        };
        return badges[position] || { emoji: '🏆', color: 'from-blue-400 to-blue-600', label: `${position}° Lugar` };
    };

    const getImageUrl = (imagePath: string | null) => {
        if (!imagePath) {
            return 'https://via.placeholder.com/400x300/1E5A96/FFFFFF?text=Proyecto+Ganador';
        }
        // Si la imagen ya es una URL completa, retornarla
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        // Si es una ruta relativa, agregar el prefijo del storage
        return `/storage/${imagePath}`;
    };

    return (
        <>
            <Head title="Ganadores - Congreso de Tecnología UMG">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link 
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap" 
                    rel="stylesheet" 
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <Navigation />

                {/* Hero Section */}
                <section className="relative px-6 py-20 overflow-hidden bg-gradient-to-br from-[#1E5A96] to-[#2C7CC1]">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
                        <div className="inline-block bg-[#D4AF37] text-gray-900 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            🏆 Reconociendo la Excelencia
                        </div>
                        <h1 className="text-6xl lg:text-7xl font-bold font-['Playfair_Display'] mb-6">
                            Salón de la Fama
                        </h1>
                        <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-8">
                            Celebramos el talento, la innovación y el esfuerzo de nuestros participantes destacados
                        </p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                                <div className="text-4xl font-bold mb-2">{winners.length}</div>
                                <div className="text-sm text-white/80">Ganadores</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                                <div className="text-4xl font-bold mb-2">{activities.length}</div>
                                <div className="text-sm text-white/80">Competencias</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                                <div className="text-4xl font-bold mb-2">{years.length}</div>
                                <div className="text-sm text-white/80">Ediciones</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                                <div className="text-4xl font-bold mb-2">{new Set(winners.map(w => w.participant.institution)).size}</div>
                                <div className="text-sm text-white/80">Instituciones</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters Section */}
                <section className="px-6 py-12 bg-white border-b border-gray-200 sticky top-0 z-40 shadow-md">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                                {/* Year Filter */}
                                <div className="flex-1 md:flex-none">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Año
                                    </label>
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                                        className="w-full md:w-48 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1E5A96] transition-colors"
                                    >
                                        <option value="all">Todos los años</option>
                                        {years.map(year => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Activity Filter */}
                                <div className="flex-1 md:flex-none">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Competencia
                                    </label>
                                    <select
                                        value={selectedActivity}
                                        onChange={(e) => setSelectedActivity(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                                        className="w-full md:w-64 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1E5A96] transition-colors"
                                    >
                                        <option value="all">Todas las competencias</option>
                                        {activities.map(activity => (
                                            <option key={activity.id} value={activity.id}>
                                                {activity.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600">
                                Mostrando <span className="font-bold text-[#B22222]">{filteredWinners.length}</span> ganadores
                            </div>
                        </div>
                    </div>
                </section>

                {/* Winners Display */}
                <section className="px-6 py-20">
                    <div className="max-w-7xl mx-auto">
                        {filteredWinners.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-8xl mb-6">🏆</div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                                    No hay ganadores para mostrar
                                </h3>
                                <p className="text-xl text-gray-600 mb-8">
                                    Ajusta los filtros para ver más resultados
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedYear('all');
                                        setSelectedActivity('all');
                                    }}
                                    className="bg-[#B22222] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-colors"
                                >
                                    Ver Todos los Ganadores
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-16">
                                {Object.values(winnersByActivity).map(({ activity, winners: activityWinners }) => (
                                    <div key={activity.id} className="space-y-8">
                                        {/* Activity Header */}
                                        <div className="text-center">
                                            <div className="inline-block bg-gradient-to-r from-[#1E5A96] to-[#2C7CC1] text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                                                🏆 Competencia
                                            </div>
                                            <h2 className="text-4xl font-bold text-gray-800 font-['Playfair_Display']">
                                                {activity.name}
                                            </h2>
                                            <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
                                                {activity.description}
                                            </p>
                                        </div>

                                        {/* Winners Grid */}
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {activityWinners.map((winner) => {
                                                const badge = getPositionBadge(winner.position);
                                                return (
                                                    <div
                                                        key={winner.id}
                                                        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                                                    >
                                                        {/* Image */}
                                                        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                                                            <img
                                                                src={getImageUrl(winner.project_image)}
                                                                alt={winner.project_name || 'Proyecto ganador'}
                                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                                onError={(e) => {
                                                                    e.currentTarget.src = 'https://via.placeholder.com/400x300/1E5A96/FFFFFF?text=Proyecto+Ganador';
                                                                }}
                                                            />
                                                            
                                                            {/* Position Badge */}
                                                            <div className={`absolute top-4 left-4 bg-gradient-to-r ${badge.color} text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2`}>
                                                                <span className="text-2xl">{badge.emoji}</span>
                                                                <span>{badge.label}</span>
                                                            </div>

                                                            {/* Year Badge */}
                                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full font-semibold text-sm shadow-md">
                                                                {winner.year}
                                                            </div>

                                                            {/* Score Badge */}
                                                            {winner.score && (
                                                                <div className="absolute bottom-4 right-4 bg-[#D4AF37] text-white px-3 py-1 rounded-full font-bold text-sm shadow-md">
                                                                    ⭐ {winner.score}/100
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Content */}
                                                        <div className="p-6 space-y-4">
                                                            {/* Project Name */}
                                                            <h3 className="text-2xl font-bold text-gray-800 line-clamp-2">
                                                                {winner.project_name || 'Proyecto Ganador'}
                                                            </h3>

                                                            {/* Participant Info */}
                                                            <div className="flex items-center gap-3 text-gray-600">
                                                                <div className="w-10 h-10 bg-gradient-to-br from-[#1E5A96] to-[#2C7CC1] rounded-full flex items-center justify-center text-white font-bold">
                                                                    {winner.participant?.name?.charAt(0)?.toUpperCase() || '?'}
                                                                </div>
                                                                <div>
                                                                    <div className="font-semibold text-gray-800">
                                                                        {winner.participant?.name || 'Participante no disponible'}
                                                                    </div>
                                                                    {winner.participant?.institution && (
                                                                        <div className="text-sm text-gray-500">
                                                                            {winner.participant.institution}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Project Description */}
                                                            {winner.project_description && (
                                                                <p className="text-gray-600 leading-relaxed line-clamp-4">
                                                                    {winner.project_description}
                                                                </p>
                                                            )}

                                                            {/* Judges Notes */}
                                                            {winner.judges_notes && (
                                                                <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#F4D03F]/10 border-l-4 border-[#D4AF37] p-4 rounded-r-lg">
                                                                    <div className="text-sm font-semibold text-gray-700 mb-1">
                                                                        💬 Comentarios del Jurado:
                                                                    </div>
                                                                    <p className="text-sm text-gray-600 italic line-clamp-3">
                                                                        "{winner.judges_notes}"
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-20 bg-gradient-to-br from-[#1E5A96] to-[#2C7CC1]">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h3 className="text-5xl font-bold font-['Playfair_Display'] mb-6">
                            ¿Quieres Ser el Próximo Ganador?
                        </h3>
                        <p className="text-xl text-white/90 mb-8">
                            Únete al congreso, participa en las competencias y demuestra tu talento. 
                            ¡Tu nombre podría estar aquí en la próxima edición!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/register" 
                                className="bg-[#D4AF37] text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#F4D03F] transition-all duration-200 transform hover:scale-105 shadow-xl"
                            >
                                Inscríbete Ahora
                            </Link>
                            <Link 
                                href="/activities" 
                                className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#1E5A96] transition-all duration-200"
                            >
                                Ver Competencias
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h5 className="text-white font-semibold mb-4">Congreso de Tecnología UMG</h5>
                                <p className="text-gray-400 text-sm">
                                    Reconociendo y celebrando la excelencia en innovación tecnológica.
                                </p>
                            </div>
                            
                            <div>
                                <h5 className="text-white font-semibold mb-4">Enlaces Rápidos</h5>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Inicio</Link></li>
                                    <li><Link href="/activities" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Actividades</Link></li>
                                    <li><Link href="/register" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Inscripción</Link></li>
                                    <li><Link href="/faq" className="text-gray-400 hover:text-[#D4AF37] transition-colors">FAQ</Link></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h5 className="text-white font-semibold mb-4">Contacto</h5>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li>📧 congreso@umg.edu.gt</li>
                                    <li>📞 +502 1234-5678</li>
                                    <li>📍 Universidad Mariano Gálvez</li>
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

