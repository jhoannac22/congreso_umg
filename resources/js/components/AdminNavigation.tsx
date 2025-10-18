import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import UMGLogo from './UMGLogo';

interface AdminNavigationProps {
    className?: string;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        localStorage.removeItem('participant');
        window.location.href = '/login';
    };

    return (
        <nav className={`relative z-10 px-6 py-4 backdrop-blur-sm bg-gradient-to-r from-[#1E5A96] to-[#2C7CC1] shadow-lg ${className}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo and Title */}
                <Link href="/" className="flex items-center space-x-4">
                    <UMGLogo size="sm" />
                    <div className="text-white">
                        <h1 className="text-xl font-bold font-['Inter']">Panel de Administración</h1>
                        <p className="text-sm opacity-90">Congreso de Tecnología UMG</p>
                    </div>
                </Link>
                
                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link 
                        href="/" 
                        className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                    >
                        🏠 Inicio
                    </Link>
                    
                    <Link 
                        href="/admin/dashboard" 
                        className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                    >
                        📊 Dashboard
                    </Link>
                    
                    <Link 
                        href="/admin/diplomas" 
                        className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                    >
                        🎓 Diplomas
                    </Link>
                    
                    <Link 
                        href="/admin/attendance" 
                        className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                    >
                        📊 Asistencia
                    </Link>
                    
                    <Link 
                        href="/admin/winners" 
                        className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                    >
                        🏆 Ganadores
                    </Link>
                    
                    <Link 
                        href="/qr-scanner" 
                        className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                    >
                        📱 Scanner QR
                    </Link>
                    
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 font-medium"
                    >
                        🚪 Salir
                    </button>
                </div>
                
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white hover:text-yellow-300 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 pb-4 space-y-2">
                    <Link 
                        href="/" 
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        🏠 Inicio
                    </Link>
                    <Link 
                        href="/admin/dashboard" 
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        📊 Dashboard
                    </Link>
                    <Link 
                        href="/admin/diplomas" 
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        🎓 Diplomas
                    </Link>
                    <Link 
                        href="/admin/attendance" 
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        📊 Asistencia
                    </Link>
                    <Link 
                        href="/admin/winners" 
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        🏆 Ganadores
                    </Link>
                    <Link 
                        href="/qr-scanner" 
                        className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        📱 Scanner QR
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    >
                        🚪 Salir
                    </button>
                </div>
            )}
        </nav>
    );
};

export default AdminNavigation;

