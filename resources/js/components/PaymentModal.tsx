import React, { useState, useEffect } from 'react';

export interface PaymentData {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
    email: string;
    phone: string;
}

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    activity: {
        id: number;
        name: string;
        price: number;
        currency: string;
    } | null;
    onPaymentSuccess: (paymentData: PaymentData) => void;
    loading?: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    activity,
    onPaymentSuccess,
    loading = false
}) => {
    const [paymentData, setPaymentData] = useState<PaymentData>({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState<Partial<PaymentData>>({});
    const [isProcessing, setIsProcessing] = useState(false);

    // Limpiar formulario al cerrar
    useEffect(() => {
        if (!isOpen) {
            setPaymentData({
                cardNumber: '',
                expiryDate: '',
                cvv: '',
                cardholderName: '',
                email: '',
                phone: ''
            });
            setErrors({});
        }
    }, [isOpen]);

    // Prevenir scroll del body
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Cerrar con ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const validateCardNumber = (cardNumber: string) => {
        const cleanNumber = cardNumber.replace(/\s/g, '');
        // Aceptar longitudes comunes de tarjetas (12-19 dígitos)
        return cleanNumber.length >= 12 && cleanNumber.length <= 19;
    };

    const validateExpiryDate = (expiryDate: string) => {
        const [month, year] = expiryDate.split('/');
        if (!month || !year) return false;
        
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        const expMonth = parseInt(month);
        const expYear = parseInt(year);
        
        if (expMonth < 1 || expMonth > 12) return false;
        if (expYear < currentYear) return false;
        if (expYear === currentYear && expMonth < currentMonth) return false;
        
        return true;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^[0-9]{8}$/;
        return phoneRegex.test(phone);
    };

    const validateForm = () => {
        const newErrors: Partial<PaymentData> = {};

        if (!paymentData.cardNumber || !validateCardNumber(paymentData.cardNumber)) {
            newErrors.cardNumber = 'Número de tarjeta debe tener entre 12 y 19 dígitos';
        }

        if (!paymentData.expiryDate || !validateExpiryDate(paymentData.expiryDate)) {
            newErrors.expiryDate = 'Fecha de vencimiento inválida';
        }

        if (!paymentData.cvv || paymentData.cvv.length < 3 || paymentData.cvv.length > 4) {
            newErrors.cvv = 'CVV inválido';
        }

        if (!paymentData.cardholderName || paymentData.cardholderName.length < 2) {
            newErrors.cardholderName = 'Nombre del titular requerido';
        }

        if (!paymentData.email || !validateEmail(paymentData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!paymentData.phone || !validatePhone(paymentData.phone)) {
            newErrors.phone = 'Teléfono debe tener 8 dígitos';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof PaymentData, value: string) => {
        let formattedValue = value;

        if (field === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (field === 'expiryDate') {
            formattedValue = formatExpiryDate(value);
        } else if (field === 'cvv') {
            formattedValue = value.replace(/[^0-9]/g, '');
        } else if (field === 'cardholderName') {
            formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
        } else if (field === 'phone') {
            formattedValue = value.replace(/[^0-9]/g, '');
        }

        setPaymentData(prev => ({
            ...prev,
            [field]: formattedValue
        }));

        // Limpiar error del campo
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);
        
        // Simular procesamiento de pago
        setTimeout(() => {
            setIsProcessing(false);
            onPaymentSuccess(paymentData);
        }, 2000);
    };

    const handleClose = () => {
        setPaymentData({
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardholderName: '',
            email: '',
            phone: ''
        });
        setErrors({});
        onClose();
    };

    if (!isOpen || !activity) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-modal-backdrop">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-gradient-to-br from-black/60 via-gray-900/50 to-black/60 backdrop-blur-sm transition-opacity duration-300" 
                onClick={handleClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-modal-slide">
                {/* Header */}
                <div className="h-3 w-full bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-white px-8 pt-8 pb-6">
                    {/* Icon and Title */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                            <svg className="h-10 w-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="text-center mb-6">
                        <h3 className="text-3xl leading-tight font-bold text-gray-900 font-['Playfair_Display'] mb-2">
                            Procesar Pago
                        </h3>
                        <p className="text-lg text-gray-600 font-medium">
                            Completa los datos de tu tarjeta
                        </p>
                        <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full mt-3"></div>
                    </div>

                    {/* Activity Summary */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-200 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-lg font-bold text-green-800">{activity.name}</h4>
                                <p className="text-sm text-green-600">Taller/Competencia</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-green-800">
                                    {activity.currency} {Number(activity.price).toFixed(2)}
                                </p>
                                <p className="text-sm text-green-600">Total a pagar</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Card Number */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Número de Tarjeta *
                            </label>
                            <input
                                type="text"
                                value={paymentData.cardNumber}
                                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                                    errors.cardNumber ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-green-300'
                                }`}
                                disabled={isProcessing}
                            />
                            {errors.cardNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                            )}
                        </div>

                        {/* Cardholder Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nombre del Titular *
                            </label>
                            <input
                                type="text"
                                value={paymentData.cardholderName}
                                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                                placeholder="Juan Pérez"
                                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                                    errors.cardholderName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-green-300'
                                }`}
                                disabled={isProcessing}
                            />
                            {errors.cardholderName && (
                                <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
                            )}
                        </div>

                        {/* Expiry Date and CVV */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Fecha de Vencimiento *
                                </label>
                                <input
                                    type="text"
                                    value={paymentData.expiryDate}
                                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                    placeholder="MM/AA"
                                    maxLength={5}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                                        errors.expiryDate ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-green-300'
                                    }`}
                                    disabled={isProcessing}
                                />
                                {errors.expiryDate && (
                                    <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    CVV *
                                </label>
                                <input
                                    type="text"
                                    value={paymentData.cvv}
                                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                                    placeholder="123"
                                    maxLength={4}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                                        errors.cvv ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-green-300'
                                    }`}
                                    disabled={isProcessing}
                                />
                                {errors.cvv && (
                                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                                )}
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={paymentData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-green-300'
                                    }`}
                                    disabled={isProcessing}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Teléfono *
                                </label>
                                <input
                                    type="tel"
                                    value={paymentData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    placeholder="12345678"
                                    maxLength={8}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-green-300'
                                    }`}
                                    disabled={isProcessing}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <div>
                                    <h5 className="font-semibold text-blue-900">Pago Seguro</h5>
                                    <p className="text-sm text-blue-800">Tus datos están protegidos con encriptación SSL</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                
                {/* Footer */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            type="button"
                            className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl border-2 border-gray-300 shadow-sm px-8 py-4 bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:scale-105"
                            onClick={handleClose}
                            disabled={isProcessing}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancelar
                        </button>
                        
                        <button
                            type="button"
                            className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl border border-transparent shadow-lg px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-base font-bold text-white hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            onClick={handleSubmit}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Pagar {activity.currency} {Number(activity.price).toFixed(2)}
                                </>
                            )}
                        </button>
                    </div>
                    
                    {/* Security badges */}
                    <div className="mt-4 flex items-center justify-center space-x-4">
                        <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            SSL Seguro
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Protegido
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;