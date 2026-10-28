import React, { useState } from 'react';
import { MapPin, Info, Check, ShieldAlert } from 'lucide-react';
import { LocationDestination } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface LocationCardProps {
  location: LocationDestination;
  featured?: boolean;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, featured = false }) => {
  const [expanded, setExpanded] = useState(featured);

  if (featured) {
    return (
      <div className="wilderness-card rounded-2xl overflow-hidden border border-gold-500/50 shadow-[0_0_35px_rgba(203,163,88,0.2)] ring-1 ring-gold-500/40 grid grid-cols-1 lg:grid-cols-12">
        {/* Featured Left Panoramic Image (7 cols) */}
        <div className="relative min-h-[300px] sm:min-h-[380px] lg:col-span-7 overflow-hidden group">
          <img
            src={location.image}
            alt={`${location.name} featured wilderness landscape in Rajasthan`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              const fallback = location.fallbackImage || 'https://images.unsplash.com/photo-1599827552599-eadf5e042738?auto=format&fit=crop&w=1200&q=80';
              if (target.src !== fallback) {
                target.src = fallback;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:via-forest-950/30 lg:to-forest-950" />

          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-gold-500 text-forest-950 text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-forest-950 animate-ping" />
              Primary Anchor Candidate
            </span>
            <Badge variant="olive">Rajasthan Aravalis</Badge>
          </div>

          {/* Bottom Title Overlay for Mobile */}
          <div className="absolute bottom-4 left-4 right-4 lg:hidden">
            <div className="flex items-center gap-1.5 text-xs text-gold-300 font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{location.region}</span>
            </div>
            <h3 className="font-heading font-black text-2xl text-white drop-shadow-md">
              {location.name}
            </h3>
          </div>
        </div>

        {/* Featured Right Content (5 cols) */}
        <div className="p-6 sm:p-8 lg:p-9 lg:col-span-5 flex flex-col justify-between space-y-5 bg-gradient-to-b from-forest-900/90 to-forest-950">
          <div>
            <div className="hidden lg:block mb-3">
              <div className="flex items-center gap-1.5 text-xs text-gold-400 font-semibold mb-1 tracking-wider uppercase">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{location.region}</span>
              </div>
              <h3 className="font-heading font-black text-2xl xl:text-3xl text-white">
                {location.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-earth-200 leading-relaxed mb-4">
              {location.description}
            </p>

            <div className="text-xs text-earth-200 bg-forest-950/80 p-3.5 rounded-xl border border-gold-500/25 mb-4 shadow-sm">
              <strong className="text-gold-300 block mb-1 font-semibold">Landscape Profile:</strong>
              {location.landscape}
            </div>

            <div className="space-y-2">
              <div className="font-semibold text-gold-400 uppercase tracking-wider text-[11px]">
                Key Terrain & Ecological Features:
              </div>
              <ul className="space-y-1.5 text-xs text-earth-200">
                {location.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-olive-800/60 space-y-3">
            <div className="p-2.5 rounded-lg bg-amber-950/20 border border-gold-500/30 text-[11px] text-earth-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>{location.permissionsNote}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`wilderness-card rounded-2xl overflow-hidden flex flex-col h-full border transition-all duration-300 ${
        location.isPreferred
          ? 'border-gold-500/50 shadow-[0_0_30px_rgba(203,163,88,0.15)] ring-1 ring-gold-500/30'
          : 'border-gold-500/15 hover:border-gold-500/40 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.6)]'
      }`}
    >
      {/* Location Image & Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden group">
        <img
          src={location.image}
          alt={`${location.name} wilderness landscape in Rajasthan`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            const fallback = location.fallbackImage || 'https://images.unsplash.com/photo-1599827552599-eadf5e042738?auto=format&fit=crop&w=1200&q=80';
            if (target.src !== fallback) {
              target.src = fallback;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/20" />

        {/* Suggested Destination Notice Pill */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
          <Badge variant="olive">Candidate Landscape</Badge>
          {location.isPreferred && (
            <Badge variant="gold">Preferred Candidate</Badge>
          )}
        </div>

        {/* Region */}
        <div className="absolute bottom-3 left-3.5 right-3.5">
          <div className="flex items-center gap-1.5 text-xs text-gold-300 font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{location.region}</span>
          </div>
          <h3 className="font-heading font-bold text-xl text-white drop-shadow-sm">
            {location.name}
          </h3>
        </div>
      </div>

      {/* Location Body */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <p className="text-xs sm:text-sm text-earth-300 leading-relaxed mb-3 line-clamp-3">
            {location.description}
          </p>

          <div className="text-xs text-earth-200 bg-forest-950/70 p-3 rounded-xl border border-olive-800/50 mb-3">
            <strong className="text-gold-400 block mb-1">Landscape Profile:</strong>
            {location.landscape}
          </div>

          {/* Expanded Features */}
          {expanded && (
            <div className="space-y-3 pt-2 text-xs border-t border-olive-800/60 animate-fadeIn">
              <div className="font-semibold text-gold-400 uppercase tracking-wider text-[11px]">
                Key Terrain Features:
              </div>
              <ul className="space-y-1.5">
                {location.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-earth-200">
                    <Check className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Legal Permissions Notice */}
              <div className="p-2.5 rounded bg-amber-950/20 border border-gold-500/30 text-[11px] text-earth-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{location.permissionsNote}</span>
              </div>
            </div>
          )}
        </div>

        {/* Toggle Details CTA */}
        <div className="pt-2">
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => setExpanded(!expanded)}
            icon={<Info className="w-3.5 h-3.5" />}
            aria-label={`${expanded ? 'Hide' : 'View'} details for ${location.name}`}
          >
            {expanded ? 'Hide Details' : 'View Terrain Details'}
          </Button>
        </div>
      </div>
    </div>
  );
};
