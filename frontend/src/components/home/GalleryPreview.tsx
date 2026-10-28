import React, { useState } from 'react';
import { Maximize2, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Lightbox } from '../common/Lightbox';
import { galleryData } from '../../data/gallery';
import { Button } from '../common/Button';

export const GalleryPreview: React.FC = () => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Show first 6 items on the homepage preview
  const previewItems = galleryData.slice(0, 6);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-forest-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          kicker="Visual Field Notes"
          title="Wilderness & Training Environments"
          description="A glimpse into the authentic terrains, bushcraft disciplines, and rugged outdoor landscapes that shape our training ethos."
        />

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {previewItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="wilderness-card rounded-xl overflow-hidden group cursor-pointer relative h-64 border border-gold-500/15 hover:border-gold-500/40"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveLightboxIndex(index);
                }
              }}
              aria-label={`View ${item.title} in full screen`}
            >
              <img
                src={item.image}
                alt={`${item.title} - ${item.category}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = item.fallbackImage || 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80';
                  if (target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-forest-950/80 border border-gold-500/30 text-earth-200 group-hover:text-gold-400 group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Title & Category Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-gold-400 bg-forest-950/80 px-2 py-0.5 rounded border border-olive-800 inline-block mb-1.5">
                  {item.category}
                </span>
                <h3 className="font-heading font-semibold text-base text-earth-100 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button to="/gallery" variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Explore Full Wilderness Gallery (12+ Photos)
          </Button>
        </div>

      </div>

      {/* Accessible Lightbox */}
      <Lightbox
        items={previewItems}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(index) => setActiveLightboxIndex(index)}
      />
    </section>
  );
};
