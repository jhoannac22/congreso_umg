import React from 'react';
import { Link } from '@inertiajs/react';
import { clsx } from 'clsx';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    className = '',
    disabled = false,
    type = 'button'
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantClasses = {
        primary: 'bg-[#B22222] text-white hover:bg-[#8B1A1A] shadow-lg focus:ring-[#B22222]',
        secondary: 'bg-[#D4AF37] text-white hover:bg-[#B8955A] shadow-lg focus:ring-[#D4AF37]',
        outline: 'border-2 border-[#B22222] text-[#B22222] hover:bg-[#B22222] hover:text-white focus:ring-[#B22222]',
        ghost: 'text-[#B22222] hover:bg-gray-100 focus:ring-[#B22222]'
    };
    
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };
    
    const classes = clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed transform-none',
        className
    );
    
    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }
    
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {children}
        </button>
    );
};

export default Button;
