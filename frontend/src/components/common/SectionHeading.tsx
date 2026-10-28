import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  description,
  align = 'center',
  className = '',
  as = 'h2'
}) => {
  const alignmentStyles = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const Component = as;

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignmentStyles} ${className}`}>
      {kicker && (
        <div className="flex items-center gap-2 mb-3 justify-center">
          <span className="h-[1px] w-6 bg-gold-500/40" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
            {kicker}
          </span>
          <span className="h-[1px] w-6 bg-gold-500/40" />
        </div>
      )}

      <Component className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-earth-100 tracking-wide leading-tight mb-4">
        {title}
      </Component>

      {description && (
        <p className="text-sm md:text-base text-earth-300 leading-relaxed font-normal max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};
