import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import UMGLogo from '../components/UMGLogo';
import ActivityCard from '../components/ActivityCard';
import Button from '../components/Button';
import RegistrationModal, { Activity } from '../components/RegistrationModal';
import PaymentModal, { PaymentData } from '../components/PaymentModal';
import Toast from '../components/Toast';
import Navigation from '../components/Navigation';

// Extending the Activity interface for Activities page specific fields
interface ExtendedActivity extends Activity {
    description: string;
    type: 'taller' | 'competencia';
    end_date: string;
    max_participants: number;
    current_participants: number;
    cost: number;
    category: {
        id: number;
        name: string;
        color: string;
    };
}

interface Category {
    id: number;
    name: string;
    color: string;
}

export default function Activities() {
    const [activities, setActivities] = useState<ExtendedActivity[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<'all' | 'taller' | 'competencia'>('all');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    
    // Modal and Toast states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<ExtendedActivity | null>(null);
    const [registering, setRegistering] = useState(false);
    const [toast, setToast] = useState<{message: string; type: 'success' | 'error' | 'info'; isVisible: boolean}>({
        message: '',
        type: 'info',
        isVisible: false
    });

    useEffect(() => {
        fetchActivities();
        fetchCategories();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await fetch('/api/v1/activities');
            const data = await response.json();
            setActivities(data.data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/v1/categories');
            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleRegisterClick = (activity: ExtendedActivity) => {
        setSelectedActivity(activity);
        setIsModalOpen(true);
    };

    const handleConfirmRegistration = async (notes: string, paymentData?: PaymentData) => {
        if (!selectedActivity) return;

        try {
            setRegistering(true);

            // Obtener el participant_id del localStorage
            const participantData = localStorage.getItem('participant');
            console.log('Participant data from localStorage:', participantData);
            
            if (!participantData) {
                console.error('No participant data found in localStorage');
                setToast({
                    message: 'Por favor, inicia sesión o regístrate primero',
                    type: 'error',
                    isVisible: true
                });
                setIsModalOpen(false);
                setRegistering(false);
                return;
            }

            let participant;
            try {
                participant = JSON.parse(participantData);
                console.log('Parsed participant:', participant);
                
                if (!participant || !participant.id) {
                    throw new Error('Participant data is invalid or missing ID');
                }

                // Verificar si necesitamos actualizar los datos del participante
                const userData = localStorage.getItem('user');
                if (userData) {
                    const user = JSON.parse(userData);
                    console.log('Checking if participant data needs refresh for email:', user.email);
                    
                    // Intentar obtener los datos más recientes del servidor
                    try {
                        const token = localStorage.getItem('auth_token');
                        if (token) {
                            const response = await fetch(`/api/v1/participants/by-email/${encodeURIComponent(user.email)}`, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Accept': 'application/json'
                                }
                            });

                            if (response.ok) {
                                const freshData = await response.json();
                                console.log('Fresh participant data from server:', freshData.data);
                                
                                // Actualizar localStorage con los datos frescos
                                localStorage.setItem('participant', JSON.stringify(freshData.data));
                                participant = freshData.data;
                                console.log('Updated participant data in localStorage');
                            }
                        }
                    } catch (refreshError) {
                        console.warn('Could not refresh participant data, using cached data:', refreshError);
                    }
                }
            } catch (parseError) {
                console.error('Error parsing participant data:', parseError);
                setToast({
                    message: 'Error al cargar los datos del participante. Por favor, inicia sesión nuevamente.',
                    type: 'error',
                    isVisible: true
                });
                setIsModalOpen(false);
                setRegistering(false);
                return;
            }

            const requestBody = {
                participant_id: participant.id,
                notes: notes,
                payment_data: paymentData ? {
                    card_number: paymentData.cardNumber.replace(/\s/g, ''), // Remover espacios
                    expiry_date: paymentData.expiryDate,
                    cvv: paymentData.cvv,
                    cardholder_name: paymentData.cardholderName,
                    email: paymentData.email,
                    phone: paymentData.phone,
                    amount: selectedActivity.price || 0,
                    currency: selectedActivity.currency || 'GTQ'
                } : null
            };

            console.log('Registration request body:', requestBody);
            console.log('Registering for activity:', selectedActivity.id);

            const response = await fetch(`/api/v1/activities/${selectedActivity.id}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Registration response status:', response.status);
            console.log('Registration response ok:', response.ok);

            const data = await response.json();
            console.log('Registration response data:', data);

            if (response.ok && data.success) {
                setToast({
                    message: paymentData 
                        ? `¡Inscripción exitosa! Se procesó el pago de ${selectedActivity.currency} ${Number(selectedActivity.price || 0).toFixed(2)}`
                        : '¡Inscripción exitosa! Revisa "Mis Actividades" para ver los detalles.',
                    type: 'success',
                    isVisible: true
                });
                
                // Actualizar la lista de actividades
                fetchActivities();
            } else {
                console.error('Registration failed:', data);
                setToast({
                    message: data.message || data.errors?.participant_id?.[0] || 'Error al procesar la inscripción',
                    type: 'error',
                    isVisible: true
                });
            }
        } catch (error) {
            setToast({
                message: 'Error de conexión. Por favor, intenta nuevamente.',
                type: 'error',
                isVisible: true
            });
        } finally {
            setIsModalOpen(false);
            setRegistering(false);
            setSelectedActivity(null);
        }
    };

    const filteredActivities = activities.filter(activity => {
        const typeMatch = selectedType === 'all' || activity.type === selectedType;
        const categoryMatch = selectedCategory === null || activity.category.id === selectedCategory;
        return typeMatch && categoryMatch;
    });

    if (loading) {
        return (
            <>
                <Head title="Actividades - Congreso de Tecnología UMG" />
                <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B22222] mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando actividades...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Actividades - Congreso de Tecnología UMG">
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
                    <div className="max-w-7xl mx-auto text-center">
                        {/* Icon Badges */}
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#B22222] to-[#8B0000] rounded-full shadow-xl animate-bounce-slow">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full shadow-xl animate-bounce-slow animation-delay-2000">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                        </div>
                        
                        <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 font-['Playfair_Display'] mb-6 leading-tight">
                            Actividades del
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#B22222] to-[#D4AF37]">
                                Congreso
                            </span>
                        </h2>
                        <p className="text-xl lg:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-8">
                            Descubre todos los talleres y competencias disponibles. 
                            Elige las actividades que más te interesen y comienza tu viaje tecnológico.
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#B22222] to-[#D4AF37] mx-auto rounded-full shadow-lg"></div>
                    </div>
                </section>

                {/* Filters */}
                <section className="relative px-6 mb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-2xl border border-gray-200">
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Type Filter */}
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                            </svg>
                                        </div>
                                        <h3 className="text-gray-800 font-bold text-lg">Tipo de Actividad</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setSelectedType('all')}
                                            className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                                                selectedType === 'all'
                                                    ? 'bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                                            }`}
                                        >
                                            Todas
                                        </button>
                                        <button
                                            onClick={() => setSelectedType('taller')}
                                            className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                                                selectedType === 'taller'
                                                    ? 'bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                                            }`}
                                        >
                                            Talleres
                                        </button>
                                        <button
                                            onClick={() => setSelectedType('competencia')}
                                            className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                                                selectedType === 'competencia'
                                                    ? 'bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                                            }`}
                                        >
                                            Competencias
                                        </button>
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-gray-800 font-bold text-lg">Categoría</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setSelectedCategory(null)}
                                            className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                                                selectedCategory === null
                                                    ? 'bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                                            }`}
                                        >
                                            Todas
                                        </button>
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                                                    selectedCategory === category.id
                                                        ? 'bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white shadow-lg'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                                                }`}
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Activities Grid */}
                <section className="px-6 pb-20">
                    <div className="max-w-7xl mx-auto">
                        {filteredActivities.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.708-2.5M15 6.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">No se encontraron actividades</h3>
                                <p className="text-gray-600 mb-8">
                                    No hay actividades que coincidan con los filtros seleccionados.
                                </p>
                                <Button
                                    onClick={() => {
                                        setSelectedType('all');
                                        setSelectedCategory(null);
                                    }}
                                    variant="outline"
                                >
                                    Limpiar Filtros
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                        {filteredActivities.length} Actividad{filteredActivities.length !== 1 ? 'es' : ''} Encontrada{filteredActivities.length !== 1 ? 's' : ''}
                                    </h3>
                                    <p className="text-gray-600">
                                        {selectedType !== 'all' && `Tipo: ${selectedType === 'taller' ? 'Talleres' : 'Competencias'}`}
                                        {selectedCategory && ` • Categoría: ${categories.find(c => c.id === selectedCategory)?.name}`}
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredActivities.map((activity) => (
                                        <ActivityCard
                                            key={activity.id}
                                            id={activity.id}
                                            name={activity.name}
                                            description={activity.description}
                                            type={activity.type}
                                            startDate={activity.start_date}
                                            endDate={activity.end_date}
                                            location={activity.location}
                                            maxParticipants={activity.max_participants}
                                            currentParticipants={activity.current_participants}
                                            cost={activity.cost}
                                            instructor={activity.instructor}
                                            category={activity.category}
                                            onRegisterClick={() => handleRegisterClick(activity)}
                                            requiresPayment={activity.requires_payment}
                                            price={activity.price}
                                            currency={activity.currency}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
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

                {/* Registration Modal */}
                <RegistrationModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedActivity(null);
                    }}
                    activity={selectedActivity}
                    onConfirm={handleConfirmRegistration}
                    loading={registering}
                />

                {/* Toast Notification */}
                <Toast
                    message={toast.message}
                    type={toast.type}
                    isVisible={toast.isVisible}
                    onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
                />
            </div>
        </>
    );
}
