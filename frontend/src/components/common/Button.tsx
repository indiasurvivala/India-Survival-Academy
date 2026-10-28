import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon,
  iconPosition = 'right',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 rounded select-none cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 min-h-[36px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-7 py-3.5 gap-2.5 min-h-[50px]'
  }[size];

  const variantStyles = {
    primary: 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-forest-950 font-bold hover:shadow-[0_0_20px_rgba(203,163,88,0.35)] hover:brightness-105 active:scale-[0.98]',
    secondary: 'bg-forest-900/90 text-earth-100 border border-olive-700/60 hover:border-gold-500/60 hover:text-gold-400 hover:bg-forest-850 active:scale-[0.98]',
    outline: 'bg-transparent text-gold-400 border border-gold-500/50 hover:bg-gold-500/10 hover:border-gold-400 active:scale-[0.98]',
    ghost: 'bg-transparent text-earth-200 hover:text-gold-400 hover:bg-white/5 active:scale-[0.98]'
  }[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
      {content}
    </button>
  );
};
