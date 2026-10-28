import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'olive' | 'forest' | 'outline' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className = ''
}) => {
  const baseStyles = 'inline-flex items-center font-medium uppercase tracking-wider rounded';

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1'
  }[size];

  const variantStyles = {
    gold: 'bg-gold-500/15 text-gold-400 border border-gold-500/30',
    olive: 'bg-olive-800/40 text-olive-300 border border-olive-600/40',
    forest: 'bg-forest-800/80 text-earth-200 border border-forest-600/50',
    outline: 'bg-transparent text-earth-300 border border-earth-600/40',
    danger: 'bg-red-950/40 text-red-300 border border-red-800/40'
  }[variant];

  return (
    <span className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}>
      {children}
    </span>
  );
};
