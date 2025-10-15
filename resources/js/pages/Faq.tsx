import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import UMGLogo from '../components/UMGLogo';
import Button from '../components/Button';
import Navigation from '../components/Navigation';

interface Faq {
    id: number;
    question: string;
    answer: string;
    category: string;
    order: number;
}

export default function Faq() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const response = await fetch('/api/v1/faqs');
            const data = await response.json();
            setFaqs(data.data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { key: 'all', name: 'Todas', color: '#1C6E9A' },
        { key: 'general', name: 'General', color: '#8E99A3' },
        { key: 'inscripcion', name: 'Inscripción', color: '#E1D1CE' },
        { key: 'actividades', name: 'Actividades', color: '#1C6E9A' },
        { key: 'diplomas', name: 'Diplomas', color: '#8E99A3' }
    ];

    const filteredFaqs = faqs.filter(faq => {
        const categoryMatch = selectedCategory === 'all' || faq.category === selectedCategory;
        const searchMatch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });

    const toggleFaq = (id: number) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    if (loading) {
        return (
            <>
                <Head title="FAQ - Congreso de Tecnología UMG" />
                <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B22222] mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando preguntas frecuentes...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Preguntas Frecuentes - Congreso de Tecnología UMG">
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

                {/* Hero Section */}
                <section className="relative px-6 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Icon Badge */}
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full shadow-xl mb-6 animate-bounce-slow">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        
                        <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 font-['Playfair_Display'] mb-6 leading-tight">
                            Preguntas
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#B22222] to-[#D4AF37]">
                                Frecuentes
                            </span>
                        </h2>
                        <p className="text-xl lg:text-2xl text-gray-600 font-light max-w-2xl mx-auto mb-8">
                            Encuentra respuestas a las preguntas más comunes sobre el congreso
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#D4AF37] mx-auto rounded-full shadow-lg"></div>
                    </div>
                </section>

                {/* Search and Filters */}
                <section className="px-6 mb-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            {/* Search */}
                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar preguntas..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:border-transparent focus:bg-white transition-all duration-200"
                                    />
                                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Category Filters */}
                            <div>
                                <h3 className="text-gray-700 font-semibold mb-3">Categorías</h3>
                                <div className="flex flex-wrap gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category.key}
                                            onClick={() => setSelectedCategory(category.key)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                selectedCategory === category.key
                                                    ? 'bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ List */}
                <section className="px-6 pb-20">
                    <div className="max-w-4xl mx-auto">
                        {filteredFaqs.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">No se encontraron preguntas</h3>
                                <p className="text-gray-600 mb-8">
                                    No hay preguntas que coincidan con tu búsqueda o filtros seleccionados.
                                </p>
                                <Button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSearchTerm('');
                                    }}
                                    variant="outline"
                                >
                                    Limpiar Filtros
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredFaqs.map((faq, index) => (
                                    <div
                                        key={faq.id}
                                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <button
                                            onClick={() => toggleFaq(faq.id)}
                                            className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200 group"
                                        >
                                            <div className="flex items-start space-x-4 flex-1">
                                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${expandedFaq === faq.id ? 'bg-gradient-to-br from-[#B22222] to-[#D4AF37]' : 'bg-gray-100'} transition-all duration-300`}>
                                                    <svg className={`w-5 h-5 ${expandedFaq === faq.id ? 'text-white' : 'text-gray-600'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#B22222] transition-colors">
                                                    {faq.question}
                                                </h3>
                                                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white text-xs font-semibold rounded-full shadow-sm">
                                                    {categories.find(c => c.key === faq.category)?.name || faq.category}
                                                </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${expandedFaq === faq.id ? 'bg-gradient-to-br from-[#B22222] to-[#D4AF37]' : 'bg-gray-100'} transition-all duration-300`}>
                                                <svg
                                                        className={`w-5 h-5 ${expandedFaq === faq.id ? 'text-white' : 'text-gray-600'} transition-transform duration-300 ${
                                                        expandedFaq === faq.id ? 'rotate-180' : ''
                                                    }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                                </div>
                                            </div>
                                        </button>
                                        
                                        {expandedFaq === faq.id && (
                                            <div className="px-6 pb-6 animate-fadeIn">
                                                <div className="border-t border-gradient-to-r from-[#B22222] to-[#D4AF37] pt-4 pl-14">
                                                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border-l-4 border-[#D4AF37]">
                                                        <p className="text-gray-700 leading-relaxed text-base">
                                                        {faq.answer}
                                                    </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Contact Section */}
                <section className="relative px-6 pb-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 shadow-2xl border border-gray-200 text-center relative overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37] rounded-full opacity-10 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#B22222] rounded-full opacity-10 blur-3xl"></div>
                            
                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full shadow-lg mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                
                                <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 font-['Playfair_Display'] mb-4">
                                ¿No encontraste tu respuesta?
                            </h3>
                                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-light">
                                    Contáctanos directamente y te ayudaremos con cualquier duda que tengas
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a 
                                        href="mailto:congreso@umg.edu.gt" 
                                        className="bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>Enviar Email</span>
                                    </a>
                                    <a 
                                        href="tel:+50212345678" 
                                        className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#D4AF37] hover:text-white transition-all duration-200 transform hover:scale-105 inline-flex items-center justify-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>Llamar Ahora</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 px-6 py-12">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <UMGLogo size="sm" />
                            <div className="text-white">
                                <h4 className="font-bold">Congreso de Tecnología</h4>
                                <p className="text-sm text-gray-400">Universidad Mariano Gálvez</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                            © 2025 Universidad Mariano Gálvez. Todos los derechos reservados.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
