import React, { useState } from 'react';
import { Compass, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../common/Button';
import { siteConfig } from '../../data/siteConfig';

export const Hero: React.FC = () => {
  const [heroImgSrc, setHeroImgSrc] = useState(siteConfig.heroImagePath || '/images/hero-jungle.jpg');

  const scrollToExplore = () => {
    const target = document.getElementById('academy-intro');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen lg:min-h-[108vh] flex flex-col justify-center pt-32 pb-16 sm:pt-36 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Jungle Wilderness Image - Real Daylight Trees & Survival Shelter */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImgSrc}
          alt="Wilderness survival camp with trees and tarp shelter in Indian jungle"
          className="w-full h-full object-cover object-center scale-100 brightness-110 transition-opacity duration-500"
          loading="eager"
          onError={() => {
            if (heroImgSrc !== siteConfig.heroFallbackImage && siteConfig.heroFallbackImage) {
              setHeroImgSrc(siteConfig.heroFallbackImage);
            } else {
              setHeroImgSrc('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80');
            }
          }}
        />
        {/* Soft, light gradient overlay so the green jungle canopy is completely visible and bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
      </div>

      {/* Hero Content - Shifted slightly lower for better tree visibility */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-10 sm:mt-16 md:mt-20">
        <div className="max-w-2xl lg:max-w-3xl text-left flex flex-col items-start">
          {/* Expedition Kicker Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/90 border border-gold-500/40 text-gold-300 text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-5 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span>Expedition Field Training • Rajasthan</span>
          </div>

          {/* Cinematic Headline with Deep Drop Shadows */}
          <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-4 sm:mb-5 drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
            Beyond the Wild.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 filter drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">
              Discover What You're Capable Of.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xs sm:text-sm md:text-base text-earth-100 font-medium max-w-2xl leading-relaxed mb-6 sm:mb-7 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Primitive firecraft, solar & topographic navigation, emergency bivouac shelter, and psychological composure in unscripted wilderness terrains.
          </p>

          {/* Primary and Secondary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 w-full sm:w-auto mb-6">
            <Button
              to="/courses"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Explore Courses
            </Button>

            <Button
              to="/about"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              icon={<Compass className="w-5 h-5" />}
            >
              Discover the Academy
            </Button>
          </div>

          {/* Expedition Field Highlights */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-earth-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              Mentor-Supervised Safety
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              Strict Leave-No-Trace Ethics
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              Real Aravali & Thar Terrains
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        onClick={scrollToExplore}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-xs text-earth-300 hover:text-gold-400 transition-colors cursor-pointer group"
        aria-label="Scroll to academy introduction"
      >
        <span className="text-[10px] uppercase tracking-widest text-earth-400 group-hover:text-gold-400 mb-1">Explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce text-gold-400" />
      </button>
    </section>
  );
};
