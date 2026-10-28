import React from 'react';
import { Compass, Home } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 pt-32 pb-20 bg-forest-950 text-earth-100 relative overflow-hidden">
      <SEO
        title="404 — Off Trail"
        description="The path you are looking for does not exist or has been reclaimed by the wilderness. Return safely to basecamp."
        noIndex={true}
      />
      <div className="absolute inset-0 bg-topo-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto text-center wilderness-card p-8 sm:p-12 rounded-2xl border border-gold-500/30">
        <div className="w-16 h-16 rounded-full bg-forest-900 border border-gold-500/40 flex items-center justify-center mx-auto mb-6 text-gold-400">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="text-xs font-mono font-semibold tracking-widest text-gold-500 uppercase mb-2">
          Error 404 • Coordinate Lost
        </div>

        <h1 className="font-heading font-black text-3xl sm:text-4xl text-earth-100 mb-4">
          You Have Wandered Off Trail
        </h1>

        <p className="text-sm text-earth-300 leading-relaxed mb-8">
          The path you are looking for does not exist or has been reclaimed by the wilderness. Use your compass to return safely to basecamp.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/" variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            Return to Basecamp (Home)
          </Button>
          <Button to="/courses" variant="secondary" size="md">
            View Challenge Courses
          </Button>
        </div>
      </div>
    </div>
  );
};
