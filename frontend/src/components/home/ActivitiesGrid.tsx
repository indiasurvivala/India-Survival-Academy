import React from 'react';
import { Eye, Compass, Tent, Shield, Users, Flame, Info, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { activitiesData } from '../../data/activities';
import { Button } from '../common/Button';

export const ActivitiesGrid: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Eye': return <Eye className="w-5 h-5 text-gold-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-gold-400" />;
      case 'Tent': return <Tent className="w-5 h-5 text-gold-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-gold-400" />;
      case 'Users': return <Users className="w-5 h-5 text-gold-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-gold-400" />;
      default: return <Compass className="w-5 h-5 text-gold-400" />;
    }
  };

  return (
    <section id="activities" className="py-20 md:py-28 bg-forest-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          kicker="Practical Field Themes"
          title="Illustrative Outdoor Learning Activities"
          description="Explore the core wilderness skill sets designed to foster observation, outdoor resilience, and practical self-reliance."
        />

        {/* Illustrative Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {activitiesData.map((activity) => (
            <div
              key={activity.id}
              className="wilderness-card rounded-xl overflow-hidden flex flex-col h-full border border-gold-500/15 hover:border-gold-500/35 group"
            >
              {/* Activity Image Banner */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={activity.image}
                  alt={`${activity.title} practical wilderness activity`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = activity.fallbackImage || 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80';
                    if (target.src !== fallback) {
                      target.src = fallback;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-forest-950/80 backdrop-blur-sm p-2 rounded-lg border border-gold-500/30">
                  {getIcon(activity.iconName)}
                </div>

                <div className="absolute bottom-2 left-3">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-gold-400 bg-forest-950/90 px-2 py-0.5 rounded border border-olive-800">
                    {activity.category}
                  </span>
                </div>
              </div>

              {/* Activity Info */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-earth-100 group-hover:text-gold-400 transition-colors mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-earth-300 leading-relaxed mb-3">
                    {activity.description}
                  </p>

                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-gold-500 uppercase tracking-wider">
                      Target Competencies:
                    </div>
                    <ul className="space-y-1 text-xs text-earth-200">
                      {activity.learningOutcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-gold-400" />
                          <span className="truncate">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-olive-800/50 text-[11px] text-earth-400 italic">
                  {activity.illustrativeNote}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Illustrative Program Notice */}
        <div className="p-4 rounded-lg bg-forest-950 border border-olive-800/60 max-w-2xl mx-auto text-center text-xs text-earth-300 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-gold-400 shrink-0" />
          <span>
            These themes illustrate potential educational modules and are subject to confirmed academy syllabi and environmental parameters.
          </span>
        </div>

        <div className="text-center mt-8">
          <Button to="/activities" variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Explore In-Depth Learning Modules
          </Button>
        </div>

      </div>
    </section>
  );
};
