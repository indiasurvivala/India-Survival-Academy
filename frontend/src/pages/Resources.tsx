import React from 'react';
import { BookOpen, CheckCircle, Clock, ArrowRight, Compass } from 'lucide-react';
import { resourcesData } from '../data/resources';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';

export const Resources: React.FC = () => {
  return (
    <div className="pb-20 bg-forest-950 text-earth-100">
      <SEO
        title="Wilderness Resources & Field Guides"
        description="Free outdoor education guides: The 10 Wilderness Essentials packing checklist, Leave-No-Trace principles for Indian habitats, and heat illness management protocols."
        canonicalPath="/resources"
        keywords="wilderness packing checklist, outdoor field guides, 10 survival essentials, Leave No Trace India, heat illness outdoor management"
        schema={generateBreadcrumbSchema([
          { name: 'Resources', path: '/resources' }
        ])}
      />
      
      {/* Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-gold-500/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1800&q=80"
            alt="Survival handbook and field gear background"
            className="w-full h-full object-cover opacity-85 brightness-115"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/25" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
            <BookOpen className="w-4 h-4" />
            <span>Field Knowledge Base</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Educational Resources & Field Guides
          </h1>

          <p className="text-base sm:text-lg text-earth-100 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Foundational outdoor guides, packing protocols, and conservation principles to foster responsible wilderness exploration.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resourcesData.map((res) => (
            <div
              key={res.id}
              className="wilderness-card p-6 sm:p-8 rounded-xl border border-gold-500/20 hover:border-gold-500/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="gold">{res.category}</Badge>
                  <div className="flex items-center gap-1.5 text-xs text-earth-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    <span>{res.readTime}</span>
                  </div>
                </div>

                <h2 className="font-heading font-bold text-xl sm:text-2xl text-earth-100 mb-3">
                  {res.title}
                </h2>

                <p className="text-xs sm:text-sm text-earth-300 leading-relaxed mb-5">
                  {res.summary}
                </p>

                <div className="space-y-2 bg-forest-950/70 p-4 rounded-lg border border-olive-800/40 mb-4">
                  <div className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider mb-1">
                    Key Educational Takeaways:
                  </div>
                  <ul className="space-y-2 text-xs text-earth-200">
                    {res.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-olive-800/50 flex items-center justify-between gap-4">
                <span className="text-[11px] text-earth-400 italic">
                  {res.disclaimer}
                </span>
                <Button to="/enroll" variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Learn In Field
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Responsible Explorer Pledge */}
        <div className="wilderness-card p-8 rounded-2xl border border-gold-500/30 text-center max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-forest-900 border border-gold-500/40 flex items-center justify-center mx-auto text-gold-400">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-earth-100">
            The Wilderness Explorer's Creed
          </h3>
          <p className="text-sm text-earth-200 leading-relaxed max-w-xl mx-auto">
            "Take only knowledge, leave only footprints, burn only dead wood with safe suppression, and carry home a quiet mind and a stronger spirit."
          </p>
          <div className="pt-2">
            <Button to="/blog" variant="primary" size="sm" icon={<BookOpen className="w-4 h-4" />}>
              Read All Wilderness Journal Articles
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};
