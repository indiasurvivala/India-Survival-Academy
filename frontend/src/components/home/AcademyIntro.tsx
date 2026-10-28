import React from 'react';
import { Compass, Eye, ShieldCheck, Users } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

export const AcademyIntro: React.FC = () => {
  return (
    <section id="academy-intro" className="py-20 md:py-28 bg-forest-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Atmospheric Wilderness Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/25 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80"
                alt="Wilderness campcraft and outdoor bushcraft training"
                className="w-full h-[380px] sm:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
              
              {/* Floating Philosophy Tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-forest-950/90 backdrop-blur-md p-4 rounded-xl border border-olive-700/50">
                <div className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span>The Academy Ethos</span>
                </div>
                <p className="text-xs sm:text-sm text-earth-200">
                  "Survival is not about conquering nature; it is about humility, acute observation, disciplined teamwork, and deep environmental harmony."
                </p>
              </div>
            </div>

            {/* Subtle Accent Frame */}
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t-2 border-l-2 border-gold-500/40 rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-2 border-r-2 border-gold-500/40 rounded-br-xl pointer-events-none" />
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              align="left"
              kicker="Academy Purpose"
              title="Transformative Wilderness Learning & Outdoor Awareness"
              className="mb-6"
            />

            <p className="text-sm sm:text-base text-earth-200 leading-relaxed">
              India Survival Academy was conceived to reconnect individuals with the fundamental skills of outdoor self-sufficiency. In an era dominated by digital comfort, wilderness training offers a rigorous, grounded environment where clear observation, resource management, and emotional calm are cultivated.
            </p>

            <p className="text-sm sm:text-base text-earth-300 leading-relaxed">
              Our training framework emphasizes experiential outdoor awareness over passive instruction. Whether navigating unfamiliar ridgelines or learning emergency bivouac setup, participants develop situational discipline, collective accountability, and lasting confidence.
            </p>

            {/* Four Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="wilderness-card p-4 rounded-xl border border-gold-500/15 hover:border-gold-500/35 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm mb-1.5">
                  <Eye className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Wilderness Awareness</span>
                </div>
                <p className="text-xs text-earth-300 leading-relaxed">
                  Reading terrain markers, weather signs, and wildlife buffer awareness.
                </p>
              </div>

              <div className="wilderness-card p-4 rounded-xl border border-gold-500/15 hover:border-gold-500/35 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm mb-1.5">
                  <Compass className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Practical Field Skills</span>
                </div>
                <p className="text-xs text-earth-300 leading-relaxed">
                  Map and compass orientation, basic shelter craft, and water sourcing concepts.
                </p>
              </div>

              <div className="wilderness-card p-4 rounded-xl border border-gold-500/15 hover:border-gold-500/35 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm mb-1.5">
                  <Users className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Team Coordination</span>
                </div>
                <p className="text-xs text-earth-300 leading-relaxed">
                  Shared pacing, group accountability, and calm crisis problem-solving.
                </p>
              </div>

              <div className="wilderness-card p-4 rounded-xl border border-gold-500/15 hover:border-gold-500/35 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Personal Growth</span>
                </div>
                <p className="text-xs text-earth-300 leading-relaxed">
                  Stepping outside comfort zones to uncover genuine resilience and focus.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Button to="/about" variant="secondary" size="md">
                Read More About Our Mission
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
