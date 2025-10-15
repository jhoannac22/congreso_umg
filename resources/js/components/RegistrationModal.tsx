import React, { useState, useEffect } from 'react';
import PaymentModal, { PaymentData } from './PaymentModal';

export interface Activity {
    id: number;
    name: string;
    type: string;
    start_date: string;
    location?: string;
    instructor?: string;
    requires_payment?: boolean;
    price?: number;
    currency?: string;
    payment_description?: string;
}

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    activity: Activity | null;
    onConfirm: (notes: string, paymentData?: PaymentData) => void;
    loading?: boolean;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
    isOpen,
    onClose,
    activity,
    onConfirm,
    loading = false
}) => {
    const [notes, setNotes] = useState('');
    const [showPaymentInfo, setShowPaymentInfo] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

    // Verificar si la actividad requiere pago
    const requiresPayment = activity?.requires_payment && activity?.price && activity.price > 0;

    // Prevenir scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup al desmontar
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Cerrar modal con ESC
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen]);

    if (!isOpen || !activity) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (requiresPayment) {
            // Si requiere pago, abrir el modal de pago
            setIsPaymentModalOpen(true);
        } else {
            // Si no requiere pago, confirmar directamente
            onConfirm(notes);
        }
    };

    const handlePaymentSuccess = (paymentData: PaymentData) => {
        setPaymentData(paymentData);
        setIsPaymentModalOpen(false);
        // Confirmar registro con datos de pago
        onConfirm(notes, paymentData);
    };

    const handlePaymentCancel = () => {
        setIsPaymentModalOpen(false);
    };

    const handleClose = () => {
        setNotes('');
        onClose();
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

    return (
        <>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-modal-backdrop">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-gradient-to-br from-black/60 via-gray-900/50 to-black/60 backdrop-blur-sm transition-opacity duration-300" 
                onClick={handleClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-modal-slide">
                    {/* Header with enhanced gradient */}
                    <div className="h-3 w-full bg-gradient-to-r from-[#B22222] via-[#D4AF37] to-[#B22222] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-50 to-white px-8 pt-8 pb-6">
                        <div className="flex items-center justify-center mb-6">
                            {/* Enhanced Icon */}
                            <div className="relative">
                                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#B22222] to-[#D4AF37] shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                                    <svg className="h-10 w-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                {/* Floating particles effect */}
                                <div className="absolute -top-2 -right-2 h-4 w-4 bg-[#D4AF37] rounded-full animate-pulse"></div>
                                <div className="absolute -bottom-1 -left-1 h-3 w-3 bg-[#B22222] rounded-full animate-bounce"></div>
                            </div>
                        </div>
                        
                        {/* Enhanced Title */}
                        <div className="text-center mb-6">
                            <h3 className="text-3xl leading-tight font-bold text-gray-900 font-['Playfair_Display'] mb-2" id="modal-title">
                                Confirmar Inscripción
                            </h3>
                            <p className="text-lg text-gray-600 font-medium">
                                Estás a punto de inscribirte en:
                            </p>
                            <div className="w-20 h-1 bg-gradient-to-r from-[#B22222] to-[#D4AF37] mx-auto rounded-full mt-3"></div>
                        </div>
                        
                        {/* Enhanced Activity Details */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 mb-6 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-4">
                                <div className="h-12 w-12 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-xl flex items-center justify-center mr-4 shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800 leading-tight">
                                        {activity.name}
                                    </h4>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white mt-1">
                                        {activity.type === 'taller' ? '🎓 Taller' : '🏆 Competencia'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-[#B22222]/30 transition-colors duration-200">
                                        <div className="h-8 w-8 bg-[#B22222]/10 rounded-lg flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-[#B22222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Fecha y Hora</p>
                                            <p className="text-sm font-semibold text-gray-800">{formatDate(activity.start_date)}</p>
                                        </div>
                                    </div>
                                    
                                    {activity.location && (
                                        <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-[#B22222]/30 transition-colors duration-200">
                                            <div className="h-8 w-8 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Ubicación</p>
                                                <p className="text-sm font-semibold text-gray-800">{activity.location}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="space-y-3">
                                    {activity.instructor && (
                                        <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-[#B22222]/30 transition-colors duration-200">
                                            <div className="h-8 w-8 bg-[#B22222]/10 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-4 h-4 text-[#B22222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Instructor</p>
                                                <p className="text-sm font-semibold text-gray-800">{activity.instructor}</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Price Information */}
                                    <div className={`flex items-center p-3 rounded-lg border transition-colors duration-200 ${
                                        requiresPayment 
                                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300' 
                                            : 'bg-gradient-to-r from-[#D4AF37]/5 to-[#B8860B]/5 border-[#D4AF37]/20 hover:border-[#D4AF37]/30'
                                    }`}>
                                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center mr-3 ${
                                            requiresPayment 
                                                ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                                                : 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B]'
                                        }`}>
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Costo</p>
                                            <p className={`text-sm font-bold ${
                                                requiresPayment ? 'text-green-700' : 'text-[#D4AF37]'
                                            }`}>
                                                {requiresPayment 
                                                    ? `${activity.currency} ${Number(activity.price || 0).toFixed(2)}`
                                                    : 'Gratis'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center p-3 bg-gradient-to-r from-[#B22222]/5 to-[#D4AF37]/5 rounded-lg border border-[#B22222]/20">
                                        <div className="h-8 w-8 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-lg flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 font-medium">Estado</p>
                                            <p className="text-sm font-bold text-[#B22222]">Disponible</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information Section */}
                        {requiresPayment && (
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-200 shadow-lg">
                                <div className="flex items-center mb-4">
                                    <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-green-800">Información de Pago</h4>
                                        <p className="text-sm text-green-600">Esta actividad requiere pago para completar la inscripción</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="bg-white rounded-xl p-4 border border-green-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-green-700 font-medium">Monto a pagar:</p>
                                                <p className="text-2xl font-bold text-green-800">
                                                    {activity.currency} {Number(activity.price || 0).toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-green-600">Métodos aceptados:</p>
                                                <div className="flex space-x-1 mt-1">
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Efectivo</span>
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Transferencia</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                                        <h5 className="font-semibold text-blue-900 mb-2 flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Proceso de Pago
                                        </h5>
                                        <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                                            <li>Confirma tu inscripción primero</li>
                                            <li>Recibirás instrucciones de pago por email</li>
                                            <li>Realiza el pago según el método elegido</li>
                                            <li>Sube tu comprobante de pago</li>
                                            <li>Tu inscripción será confirmada</li>
                                        </ol>
                                    </div>

                                    {activity.payment_description && (
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <p className="text-sm text-yellow-800">
                                                <strong>Nota:</strong> {activity.payment_description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {/* Enhanced Notes Input */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 mb-6 border border-gray-200 shadow-lg">
                            <div className="flex items-center mb-4">
                                <div className="h-10 w-10 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-xl flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800">Notas Adicionales</h4>
                                    <p className="text-sm text-gray-600">Comparte algo específico que te interese</p>
                                </div>
                            </div>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="relative">
                                    <textarea
                                        id="notes"
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B22222] focus:border-transparent resize-none transition-all duration-200 hover:border-[#B22222]/30"
                                        placeholder="Ej: Me interesa especialmente el tema de seguridad en redes y me gustaría aprender sobre..."
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        maxLength={500}
                                        disabled={loading}
                                    />
                                    <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                                        <div className={`text-xs font-medium ${notes.length > 450 ? 'text-red-500' : 'text-gray-400'}`}>
                                            {notes.length}/500
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    {/* Enhanced Footer with action buttons */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl border-2 border-gray-300 shadow-sm px-8 py-4 bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:scale-105"
                                onClick={handleClose}
                                disabled={loading}
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancelar
                            </button>
                            
                            <button
                                type="button"
                                className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl border border-transparent shadow-lg px-8 py-4 bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-base font-bold text-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B22222] transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Confirmar Inscripción
                                    </>
                                )}
                            </button>
                        </div>
                        
                        {/* Additional info */}
                        <div className="mt-4 text-center">
                            <p className="text-xs text-gray-500 flex items-center justify-center">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Recibirás una confirmación por email
                            </p>
                        </div>
                    </div>
            </div>
        </div>

        {/* Payment Modal */}
        <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={handlePaymentCancel}
            activity={activity ? {
                id: activity.id,
                name: activity.name,
                price: activity.price || 0,
                currency: activity.currency || 'GTQ'
            } : null}
            onPaymentSuccess={handlePaymentSuccess}
            loading={loading}
        />
    </>
    );
};

export default RegistrationModal;

