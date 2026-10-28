import React from 'react';
import { Eye, Compass, Tent, Shield, Users, Flame, Info, CheckCircle2 } from 'lucide-react';
import { activitiesData } from '../data/activities';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';

export const Activities: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Eye': return <Eye className="w-6 h-6 text-gold-400" />;
      case 'Compass': return <Compass className="w-6 h-6 text-gold-400" />;
      case 'Tent': return <Tent className="w-6 h-6 text-gold-400" />;
      case 'Shield': return <Shield className="w-6 h-6 text-gold-400" />;
      case 'Users': return <Users className="w-6 h-6 text-gold-400" />;
      case 'Flame': return <Flame className="w-6 h-6 text-gold-400" />;
      default: return <Compass className="w-6 h-6 text-gold-400" />;
    }
  };

  return (
    <div className="pb-20 bg-forest-950 text-earth-100">
      <SEO
        title="Wilderness Skills & Bushcraft Activities"
        description="Hands-on wilderness modules: firecraft, map and compass navigation, emergency bivouac shelter, outdoor preparedness, and collaborative team leadership drills."
        canonicalPath="/activities"
        keywords="bushcraft activities, wilderness skills India, firecraft training, bivouac shelter building, topographic navigation training"
        schema={generateBreadcrumbSchema([
          { name: 'Activities', path: '/activities' }
        ])}
      />
      
      {/* Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-gold-500/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1800&q=80"
            alt="Campfire and bushcraft tools background"
            className="w-full h-full object-cover opacity-85 brightness-115"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/25" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
            <Shield className="w-4 h-4" />
            <span>Field Disciplines</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Wilderness Skills & Field Training Modules
          </h1>

          <p className="text-base sm:text-lg text-earth-100 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Hands-on, time-tested outdoor competencies designed to cultivate situational focus, environmental understanding, and mental resilience.
          </p>
        </div>
      </section>

      {/* Main Activities In-Depth Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Illustrative Notice */}
        <div className="p-4 rounded-xl bg-forest-900/80 border border-gold-500/25 max-w-3xl mx-auto text-xs text-earth-300 flex items-start gap-3">
          <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <p>
            <strong>Illustrative Curriculum Notice:</strong> The skill themes below outline the educational scope of the academy's training approach. Specific modules conducted during any batch depend on local habitat regulations, seasonal weather conditions, and statutory clearances.
          </p>
        </div>

        {/* Detailed Activity Modules */}
        <div className="space-y-12">
          {activitiesData.map((activity, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={activity.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center wilderness-card p-6 sm:p-8 md:p-10 rounded-2xl border border-gold-500/20 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Column (5 cols) */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative rounded-xl overflow-hidden border border-gold-500/30 h-64 sm:h-80 shadow-lg">
                    <img
                      src={activity.image}
                      alt={`${activity.title} outdoor learning module`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const fallback = activity.fallbackImage || 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80';
                        if (target.src !== fallback) {
                          target.src = fallback;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4 p-2.5 rounded-lg bg-forest-950/90 border border-gold-500/40">
                      {getIcon(activity.iconName)}
                    </div>

                    <div className="absolute bottom-3 left-4">
                      <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider bg-forest-950/90 px-2.5 py-1 rounded border border-olive-800">
                        {activity.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Column (7 cols) */}
                <div className={`lg:col-span-7 space-y-4 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl text-earth-100">
                    {activity.title}
                  </h2>

                  <p className="text-sm sm:text-base text-earth-200 leading-relaxed">
                    {activity.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h4 className="font-heading text-xs uppercase tracking-wider text-gold-400 font-bold">
                      Key Competencies Mastered:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activity.learningOutcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-earth-200 bg-forest-950/60 p-2.5 rounded border border-olive-800/40">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-earth-400 pt-2 italic">
                    {activity.illustrativeNote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Button to="/enroll" variant="primary" size="lg">
            Enquire About Challenge Modules
          </Button>
        </div>

      </section>

    </div>
  );
};
