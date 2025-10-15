import React from 'react';

interface UMGLogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const UMGLogo: React.FC<UMGLogoProps> = ({ className = '', size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-20 h-20',
        md: 'w-28 h-28',
        lg: 'w-36 h-36',
        xl: 'w-56 h-56'
    };

    return (
        <div className={`${sizeClasses[size]} ${className} overflow-hidden`}>
            <img
                src="/logo-umg.png"
                alt="Universidad Mariano Gálvez Logo"
                className="w-full h-full object-cover"
                style={{ 
                    backgroundColor: 'transparent',
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                    borderRadius: '50%'
                }}
                onError={(e) => {
                    // Fallback si la imagen no existe
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                        <div class="w-full h-full bg-transparent rounded-full flex items-center justify-center text-xs font-bold text-gray-800">
                            UMG
                        </div>
                    `;
                }}
            />
        </div>
    );
};

export default UMGLogo;
