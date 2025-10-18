import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navigation from '../components/Navigation';
import { getParticipantDiplomas, downloadDiploma, Diploma } from '../lib/diploma-api';

export default function MyDiplomas() {
    const [diplomas, setDiplomas] = useState<Diploma[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);

    useEffect(() => {
        fetchDiplomas();
    }, []);

    const fetchDiplomas = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Obtener el participante del localStorage
            const participantData = localStorage.getItem('participant');
            if (!participantData) {
                setError('No se encontró información del participante. Por favor, inicia sesión nuevamente.');
                setLoading(false);
                return;
            }

            const participant = JSON.parse(participantData);
            const response = await getParticipantDiplomas(participant.id);
            
            setDiplomas(Array.isArray(response.data) ? response.data : [response.data]);
        } catch (err: any) {
            console.error('Error fetching diplomas:', err);
            setError(err.response?.data?.message || 'Error al cargar los diplomas');
        } finally {
            setLoading(false);
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

    const getTemplateLabel = (type: string) => {
        switch (type) {
            case 'winner':
                return { icon: '🏆', label: 'Reconocimiento al Mérito', color: 'from-yellow-400 to-yellow-600' };
            case 'special':
                return { icon: '⭐', label: 'Reconocimiento Especial', color: 'from-purple-400 to-purple-600' };
            default:
                return { icon: '🎓', label: 'Participación', color: 'from-blue-400 to-blue-600' };
        }
    };

    return (
        <>
            <Head title="Mis Diplomas - Congreso de Tecnología UMG">
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
                <section className="relative px-6 py-16 overflow-hidden bg-gradient-to-br from-[#1E5A96] to-[#2C7CC1]">
                    <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
                        <div className="text-6xl mb-4">🎓</div>
                        <h1 className="text-5xl lg:text-6xl font-bold font-['Playfair_Display'] mb-4">
                            Mis Diplomas
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Descarga y comparte tus certificados de participación
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="px-6 py-16">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E5A96]"></div>
                                <p className="mt-4 text-gray-600">Cargando diplomas...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">⚠️</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Error</h3>
                                <p className="text-gray-600 mb-6">{error}</p>
                                <Link
                                    href="/register"
                                    className="inline-block bg-[#B22222] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-colors"
                                >
                                    Volver al Registro
                                </Link>
                            </div>
                        ) : diplomas.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-8xl mb-6">📜</div>
                                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                                    Aún no tienes diplomas
                                </h3>
                                <p className="text-xl text-gray-600 mb-8">
                                    Los diplomas se generan automáticamente después de completar las actividades
                                </p>
                                <Link
                                    href="/my-activities"
                                    className="inline-block bg-[#B22222] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#8B0000] transition-colors"
                                >
                                    Ver Mis Actividades
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        {diplomas.length} {diplomas.length === 1 ? 'Diploma' : 'Diplomas'} Disponibles
                                    </h2>
                                    <p className="text-gray-600">
                                        Descarga tus certificados y compártelos en tus redes profesionales
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {diplomas.map((diploma) => {
                                        const template = getTemplateLabel(diploma.template_type);
                                        return (
                                            <div
                                                key={diploma.id}
                                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                            >
                                                {/* Header */}
                                                <div className={`bg-gradient-to-r ${template.color} p-6 text-white`}>
                                                    <div className="text-4xl mb-3">{template.icon}</div>
                                                    <h3 className="font-semibold text-lg">{template.label}</h3>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6 space-y-4">
                                                    <div>
                                                        <h4 className="font-bold text-gray-800 mb-1">
                                                            {diploma.activity?.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            {diploma.activity?.type === 'taller' ? 'Taller' : 'Competencia'}
                                                        </p>
                                                    </div>

                                                    <div className="pt-4 border-t border-gray-200">
                                                        <div className="flex items-center justify-between text-sm mb-2">
                                                            <span className="text-gray-600">Número:</span>
                                                            <span className="font-mono text-gray-800">{diploma.diploma_number}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Fecha:</span>
                                                            <span className="text-gray-800">
                                                                {new Date(diploma.issue_date).toLocaleDateString('es-GT', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {diploma.is_sent && (
                                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                                                            <div className="flex items-center gap-2 text-green-700">
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                <span className="font-medium">Enviado por email</span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Actions */}
                                                    <button
                                                        onClick={() => handleDownload(diploma)}
                                                        disabled={downloadingId === diploma.id}
                                                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                                                            downloadingId === diploma.id
                                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                                : 'bg-[#1E5A96] text-white hover:bg-[#164070] active:scale-95'
                                                        }`}
                                                    >
                                                        {downloadingId === diploma.id ? (
                                                            <>
                                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                                <span>Descargando...</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                                <span>Descargar PDF</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Tips Section */}
                                <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                        💡 ¿Qué hacer con tus diplomas?
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                                                💼
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">Agrega a LinkedIn</h4>
                                                <p className="text-sm text-gray-600">
                                                    Comparte tus logros en tu perfil profesional
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                                                📄
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">Incluye en tu CV</h4>
                                                <p className="text-sm text-gray-600">
                                                    Fortalece tu currículum con certificaciones
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                                                🖼️
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">Imprime y Enmarca</h4>
                                                <p className="text-sm text-gray-600">
                                                    Dale un lugar especial a tus certificados
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xl">
                                                📱
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">Comparte en Redes</h4>
                                                <p className="text-sm text-gray-600">
                                                    Etiquétanos @CongresoTecUMG
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h5 className="text-white font-semibold mb-4">Congreso de Tecnología UMG</h5>
                                <p className="text-gray-400 text-sm">
                                    Certificando la excelencia en innovación tecnológica.
                                </p>
                            </div>
                            
                            <div>
                                <h5 className="text-white font-semibold mb-4">Enlaces Rápidos</h5>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Inicio</Link></li>
                                    <li><Link href="/my-activities" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Mis Actividades</Link></li>
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

