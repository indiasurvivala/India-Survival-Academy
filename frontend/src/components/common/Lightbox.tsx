import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../../types';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex!] : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex! + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex! - 1 + items.length) % items.length);
      }
    },
    [isOpen, currentIndex, items.length, onClose, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery Image: ${currentItem.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-forest-900/90 border border-gold-500/40 text-earth-200 hover:text-gold-300 transition-colors shadow-lg focus:ring-2 focus:ring-gold-500"
        aria-label="Close Lightbox"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Prev Button */}
      <button
        onClick={() => onNavigate((currentIndex! - 1 + items.length) % items.length)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-forest-900/80 border border-olive-700/60 text-earth-200 hover:text-gold-300 hover:border-gold-500/50 transition-colors flex items-center justify-center shadow-lg"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={() => onNavigate((currentIndex! + 1) % items.length)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-forest-900/80 border border-olive-700/60 text-earth-200 hover:text-gold-300 hover:border-gold-500/50 transition-colors flex items-center justify-center shadow-lg"
        aria-label="Next Image"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Image Container */}
      <div 
        className="relative max-w-5xl max-h-[92vh] flex flex-col items-center px-8 sm:px-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-xl border border-gold-500/25 max-h-[60vh] sm:max-h-[72vh] flex items-center justify-center">
          <img
            src={currentItem.image}
            alt={`${currentItem.title} - ${currentItem.category}`}
            className="w-full h-auto max-h-[60vh] sm:max-h-[72vh] object-contain select-none"
            onError={(e) => {
              const target = e.currentTarget;
              const fallback = currentItem.fallbackImage || 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80';
              if (target.src !== fallback) {
                target.src = fallback;
              }
            }}
          />
        </div>

        {/* Caption bar */}
        <div className="w-full text-center mt-3 sm:mt-4 px-2">
          <div className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded mb-1">
            {currentItem.category}
          </div>
          <h3 className="font-heading font-semibold text-sm sm:text-base md:text-lg text-earth-100 mb-0.5 sm:mb-1">
            {currentItem.title}
          </h3>
          <p className="text-xs text-earth-300 max-w-xl mx-auto line-clamp-2 sm:line-clamp-none">
            {currentItem.caption}
          </p>
          <div className="text-[10px] sm:text-[11px] text-earth-400 mt-1 sm:mt-2 font-mono">
            {currentIndex! + 1} of {items.length}
          </div>
        </div>
      </div>
    </div>
  );
};
