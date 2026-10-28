import React from 'react';
import { ShieldAlert, Compass } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { LocationCard } from '../locations/LocationCard';
import { locationsData } from '../../data/locations';

export const RajasthanLocations: React.FC = () => {
  return (
    <section id="locations" className="py-20 md:py-28 bg-forest-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          kicker="Terrain Exploration"
          title="Candidate Destinations in Rajasthan"
          description="Exploring diverse wilderness terrains across the Aravali hills and Thar desert. Kumbhalgarh serves as the primary candidate focus for our upcoming programs."
        />

        {/* Prominent Disclaimer Banner */}
        <div className="max-w-4xl mx-auto mb-12 p-4 sm:p-5 rounded-xl bg-forest-900/80 border border-gold-500/30 text-xs sm:text-sm text-earth-200">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-gold-400 font-semibold block">
                Statutory Clearances & Venue Accuracy Policy:
              </strong>
              <p className="text-earth-300 leading-relaxed text-xs">
                The areas listed below represent <strong>suggested candidate destinations</strong> currently under operational review, not confirmed academy-operated training facilities. Survival training, bivouac camping, or trail expeditions inside or adjoining wildlife sanctuaries and protected reserves are strictly subject to formal forest department permissions, local sanctuary rules, and environmental compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Anchor Location (Kumbhalgarh) */}
        {(() => {
          const featuredLocation = locationsData.find((loc) => loc.id === 'kumbhalgarh') || locationsData[0];
          const candidateLocations = locationsData.filter((loc) => loc.id !== featuredLocation.id);

          return (
            <div className="space-y-12">
              <LocationCard location={featuredLocation} featured={true} />

              <div className="space-y-4">
                <div className="text-center sm:text-left border-b border-olive-800/60 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-earth-100">
                      Additional Evaluated Rajasthan Wilderness Terrains
                    </h3>
                    <p className="text-xs sm:text-sm text-earth-300">
                      Granite cliffs, deciduous tiger reserve borders, and extreme arid sand dune ecosystems under candidate assessment.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-gold-400 shrink-0">
                    3 Candidate Zones
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-2">
                  {candidateLocations.map((location) => (
                    <LocationCard key={location.id} location={location} />
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Preferred Location Summary Pill */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-900 border border-gold-500/30 text-xs text-earth-200">
            <Compass className="w-4 h-4 text-gold-400" />
            <span>
              <strong>Kumbhalgarh Wildlife Sanctuary</strong> is the user-preferred anchor candidate for academy field trials.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
