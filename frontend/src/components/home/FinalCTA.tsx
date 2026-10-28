import React from 'react';
import { Compass, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '../common/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-forest-950 border-t border-gold-500/15">
      {/* Background Image with Clear Mountain Landscape Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
          alt="Atmospheric mountain and wilderness ridge"
          className="w-full h-full object-cover object-center scale-105 brightness-[0.9]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-forest-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/35 to-forest-950/20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/80 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-6">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          <span>Step Into The Wilderness</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-earth-100 tracking-tight leading-tight mb-6">
          Ready to Test Your Limits in the Rugged Outdoors?
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-earth-200 max-w-2xl mx-auto leading-relaxed mb-10">
          Whether you are taking your first steps in outdoor preparedness or seeking a multi-day wilderness immersion across Rajasthan's wild landscapes, India Survival Academy provides structured, respectful, and safe challenge experiences.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            to="/enroll"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-xl"
            icon={<Compass className="w-5 h-5" />}
          >
            Enquire For A Challenge
          </Button>

          <Button
            to="/contact"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            icon={<Mail className="w-5 h-5" />}
          >
            Contact Academy Helpdesk
          </Button>
        </div>

        <div className="mt-8 text-xs text-earth-400 font-mono">
          Advance registration registry open for 2026 Rajasthan schedules.
        </div>
      </div>
    </section>
  );
};
