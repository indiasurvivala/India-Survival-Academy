import React, { useState } from 'react';
import { Camera, Maximize2 } from 'lucide-react';
import { Lightbox } from '../components/common/Lightbox';
import { galleryData } from '../data/gallery';
import { SEO } from '../components/common/SEO';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Wilderness Landscapes', 'Outdoor Skills', 'Camp & Shelter', 'Team Experiences'];

  const filteredItems = activeCategory === 'All'
    ? galleryData
    : galleryData.filter((item) => item.category === activeCategory);

  return (
    <div className="pb-20 bg-forest-950 text-earth-100">
      <SEO
        title="Wilderness Photo Gallery | Terrains & Campcraft"
        description="View high-resolution photography of forest environments, topographic navigation, bivouac campcraft, and wilderness expedition landscapes in Rajasthan."
        canonicalPath="/gallery"
        keywords="wilderness photos, bushcraft gallery, outdoor expedition photography, Rajasthan wilderness landscapes, campcraft photos"
        schema={generateBreadcrumbSchema([
          { name: 'Gallery', path: '/gallery' }
        ])}
      />
      
      {/* Header Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-gold-500/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1800&q=80"
            alt="Wilderness ridge and expedition background"
            className="w-full h-full object-cover opacity-85 brightness-115"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/25" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
            <Camera className="w-4 h-4" />
            <span>Wilderness Archive</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Wilderness & Field Environments Gallery
          </h1>

          <p className="text-base sm:text-lg text-earth-100 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Authentic visual records representing wilderness terrain, expedition disciplines, campcraft, and outdoor group resilience.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-forest-900/60 border-b border-olive-800/40 sticky top-[68px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? galleryData.length
              : galleryData.filter((i) => i.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? 'bg-gold-500 text-forest-950 shadow-md font-bold'
                    : 'bg-forest-950/80 text-earth-300 hover:text-white border border-olive-800/60 hover:border-gold-500/30'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat ? 'bg-forest-950/20 text-forest-950 font-bold' : 'bg-forest-900 text-gold-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 wilderness-card rounded-2xl border border-gold-500/20 max-w-md mx-auto p-8">
            <Camera className="w-10 h-10 text-gold-400 mx-auto mb-3 opacity-60" />
            <h3 className="font-heading font-bold text-lg text-earth-100 mb-1">No Photos in this Category</h3>
            <p className="text-xs text-earth-300 mb-4">Select another category or view all wilderness records.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="text-xs font-semibold text-gold-400 underline"
            >
              Reset to All Photos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => {
              const isFirstFeatured = index === 0 && activeCategory === 'All';
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxIndex(index)}
                  className={`wilderness-card rounded-2xl overflow-hidden group cursor-pointer relative border border-gold-500/15 hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.7)] ${
                    isFirstFeatured ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-[4/3] sm:aspect-[16/10]'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveLightboxIndex(index);
                    }
                  }}
                  aria-label={`Open photo lightbox for ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.category}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = item.fallbackImage || 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80';
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/20 opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-gold-300 bg-forest-950/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-gold-500/30 shadow-md">
                      {item.category}
                    </span>
                    <div className="p-2 rounded-full bg-forest-950/80 border border-gold-500/40 text-earth-200 group-hover:text-gold-300 group-hover:scale-110 transition-all shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className={`font-heading font-bold text-white group-hover:text-gold-300 transition-colors drop-shadow-md ${
                      isFirstFeatured ? 'text-lg sm:text-2xl mb-1.5' : 'text-base sm:text-lg mb-1'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs text-earth-200/90 line-clamp-2 drop-shadow-sm ${
                      isFirstFeatured ? 'max-w-xl text-xs sm:text-sm' : ''
                    }`}>
                      {item.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Photography Integrity Notice */}
        <div className="mt-14 p-4 rounded-xl bg-forest-900/60 border border-olive-800/60 text-center text-xs text-earth-300 max-w-2xl mx-auto">
          Photography records represent authentic wilderness environments, field disciplines, and gear illustrative of the academy's outdoor ethos. We do not falsely portray generic stock imagery as verified operational events.
        </div>
      </section>

      {/* Accessible Lightbox Modal */}
      <Lightbox
        items={filteredItems}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(index) => setActiveLightboxIndex(index)}
      />
    </div>
  );
};
