import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import UMGLogo from './UMGLogo';
import Button from './Button';

interface NavigationProps {
    showLogin?: boolean;
    className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ showLogin = true, className = '' }) => {
    const [isActivitiesDropdownOpen, setIsActivitiesDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsActivitiesDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className={`relative z-10 px-6 py-4 backdrop-blur-sm bg-white/70 shadow-md ${className}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo and Title */}
                <Link href="/" className="flex items-center space-x-4">
                    <UMGLogo size="sm" />
                    <div className="text-gray-800">
                        <h1 className="text-xl font-bold font-['Inter']">Congreso de Tecnología</h1>
                        <p className="text-sm opacity-90">Universidad Mariano Gálvez</p>
                    </div>
                </Link>
                
                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link 
                        href="/" 
                        className="text-gray-800 hover:text-[#B22222] transition-colors duration-200 font-medium"
                    >
                        Inicio
                    </Link>
                    
                    {/* Activities Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsActivitiesDropdownOpen(!isActivitiesDropdownOpen)}
                            className="text-gray-800 hover:text-[#B22222] transition-colors duration-200 font-medium flex items-center space-x-1 focus:outline-none"
                        >
                            <span>Actividades</span>
                            <svg 
                                className={`w-4 h-4 transition-transform duration-200 ${isActivitiesDropdownOpen ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        {/* Dropdown Menu */}
                        {isActivitiesDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-dropdown-fade">
                                <div className="py-2">
                                    <Link
                                        href="/activities"
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#B22222]/5 hover:to-[#D4AF37]/5 hover:text-[#B22222] transition-all duration-200 group"
                                        onClick={() => setIsActivitiesDropdownOpen(false)}
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#B22222] to-[#D4AF37] rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm">Ver Actividades</div>
                                            <div className="text-xs text-gray-500">Explora talleres y competencias</div>
                                        </div>
                                    </Link>
                                    
                                    <div className="border-t border-gray-100 my-1"></div>
                                    
                                    <Link
                                        href="/my-activities"
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#D4AF37]/5 hover:to-[#B22222]/5 hover:text-[#D4AF37] transition-all duration-200 group"
                                        onClick={() => setIsActivitiesDropdownOpen(false)}
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm">Mis Actividades</div>
                                            <div className="text-xs text-gray-500">Tus inscripciones y registros</div>
                                        </div>
                                    </Link>
                                    
                                    <div className="border-t border-gray-100 my-1"></div>
                                    
                                    <Link
                                        href="/qr-scanner"
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-indigo-500/5 hover:text-blue-600 transition-all duration-200 group"
                                        onClick={() => setIsActivitiesDropdownOpen(false)}
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm">Registro de Asistencia</div>
                                            <div className="text-xs text-gray-500">Escanear código QR</div>
                                        </div>
                                    </Link>
                                    
                                </div>
                                
                                {/* Footer del dropdown */}
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 text-center">
                                        💡 <span className="font-medium">Tip:</span> Inscríbete en múltiples actividades
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <Link 
                        href="/register" 
                        className="text-gray-800 hover:text-[#B22222] transition-colors duration-200 font-medium"
                    >
                        Inscripción
                    </Link>
                    <Link 
                        href="/faq" 
                        className="text-gray-800 hover:text-[#B22222] transition-colors duration-200 font-medium"
                    >
                        FAQ
                    </Link>
                    <Link 
                        href="/winners" 
                        className="text-gray-800 hover:text-[#D4AF37] transition-colors duration-200 font-medium flex items-center gap-1"
                    >
                        <span>🏆</span>
                        <span>Ganadores</span>
                    </Link>
                    
                    {showLogin && (
                        <Button href="/login" variant="outline" size="sm">
                            Iniciar Sesión
                        </Button>
                    )}
                </div>
                
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button className="text-gray-800 hover:text-[#B22222] transition-colors duration-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
