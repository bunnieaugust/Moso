import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'glass';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  isLoading = false,
  icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-sm tracking-wide uppercase";
  
  const variants = {
    primary: "bg-gradient-to-r from-gold-600 to-gold-400 text-white hover:shadow-[0_0_20px_rgba(212,138,39,0.4)] hover:-translate-y-0.5 border border-gold-400/20",
    outline: "border border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-400",
    ghost: "text-stone-300 hover:text-gold-300 hover:bg-white/5",
    glass: "bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:border-white/20 hover:shadow-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;