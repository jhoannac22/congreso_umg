import React from 'react';
import { Link } from '@inertiajs/react';
import { clsx } from 'clsx';

interface ActivityCardProps {
    id: number;
    name: string;
    description: string;
    type: 'taller' | 'competencia';
    startDate: string;
    endDate: string;
    location?: string;
    maxParticipants?: number;
    currentParticipants?: number;
    cost: number;
    instructor?: string;
    category?: {
        name: string;
        color: string;
    };
    className?: string;
    onRegisterClick?: () => void;
    requiresPayment?: boolean;
    price?: number;
    currency?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
    id,
    name,
    description,
    type,
    startDate,
    endDate,
    location,
    maxParticipants = 0,
    currentParticipants = 0,
    cost,
    instructor,
    category,
    className = '',
    onRegisterClick,
    requiresPayment = false,
    price = 0,
    currency = 'GTQ'
}) => {
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

    const formatPrice = () => {
        if (!requiresPayment || !price || price === 0) {
            return 'Gratis';
        }
        return `${currency} ${Number(price).toFixed(2)}`;
    };

    const getAvailableSpots = () => {
        if (maxParticipants === 0) return 'Sin límite';
        return maxParticipants - currentParticipants;
    };

    const isFull = maxParticipants > 0 && currentParticipants >= maxParticipants;

    return (
        <div className={clsx(
            'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden',
            className
        )}>
            {/* Header with category color */}
            <div 
                className="h-2 w-full"
                style={{ backgroundColor: category?.color || '#1C6E9A' }}
            ></div>
            
            <div className="p-6">
                {/* Type badge and category */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className={clsx(
                            'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
                            type === 'taller' 
                                ? 'bg-[#E1D1CE] text-[#1C6E9A]' 
                                : 'bg-[#1C6E9A] text-white'
                        )}>
                            {type === 'taller' ? 'Taller' : 'Competencia'}
                        </span>
                        
                        {/* Price badge */}
                        <span className={clsx(
                            'px-3 py-1 rounded-full text-xs font-bold flex items-center',
                            requiresPayment && price > 0
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                                : 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white'
                        )}>
                            {requiresPayment && price > 0 && (
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            {formatPrice()}
                        </span>
                    </div>
                    
                    {category && (
                        <span 
                            className="px-3 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: category.color }}
                        >
                            {category.name}
                        </span>
                    )}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {description}
                </p>
                
                {/* Details */}
                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(startDate)} - {formatDate(endDate)}
                    </div>
                    
                    {location && (
                        <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {location}
                        </div>
                    )}
                    
                    {instructor && (
                        <div className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {instructor}
                        </div>
                    )}
                </div>
                
                {/* Participants and Cost */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="text-sm">
                            <span className="text-gray-500">Participantes: </span>
                            <span className={clsx(
                                'font-semibold',
                                isFull ? 'text-red-600' : 'text-green-600'
                            )}>
                                {currentParticipants}
                                {maxParticipants > 0 && `/${maxParticipants}`}
                            </span>
                        </div>
                        
                        <div className="text-sm">
                            <span className="text-gray-500">Costo: </span>
                            <span className="font-semibold text-[#1C6E9A]">
                                {cost === 0 ? 'Gratis' : `Q${cost}`}
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex space-x-3">
                    <Link
                        href={`/activities/${id}`}
                        className="flex-1 bg-[#1C6E9A] text-white px-4 py-2 rounded-lg font-semibold text-center hover:bg-[#155A7A] transition-colors duration-200"
                    >
                        Ver Detalles
                    </Link>
                    
                    {!isFull ? (
                        onRegisterClick ? (
                            <button
                                onClick={onRegisterClick}
                                className="flex-1 bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Inscribirse
                            </button>
                        ) : (
                            <Link
                                href={`/activities/${id}/register`}
                                className="flex-1 bg-gradient-to-r from-[#B22222] to-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                            >
                                Inscribirse
                            </Link>
                        )
                    ) : (
                        <button
                            disabled
                            className="flex-1 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg font-semibold cursor-not-allowed"
                        >
                            Sin Cupos
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
