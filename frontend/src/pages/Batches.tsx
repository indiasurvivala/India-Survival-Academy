import React from 'react';
import { Calendar, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { batchesData } from '../data/batches';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';

export const Batches: React.FC = () => {
  return (
    <div className="pb-20 bg-forest-950 text-earth-100">
      <SEO
        title="Upcoming Batches & Training Calendar"
        description="Check official batch status for India Survival Academy. Schedules and operational venues in Rajasthan are confirmed following formal forest department clearances."
        canonicalPath="/batches"
        keywords="survival batches, training calendar, upcoming outdoor courses, wilderness schedules Rajasthan"
        schema={generateBreadcrumbSchema([
          { name: 'Batches', path: '/batches' }
        ])}
      />
      
      {/* Header Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-gold-500/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1800&q=80"
            alt="Compass orienteering background"
            className="w-full h-full object-cover opacity-85 brightness-115"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/25" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
            <Calendar className="w-4 h-4" />
            <span>Training Calendar Status</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Upcoming Batches & Enrollment Status
          </h1>

          <p className="text-base sm:text-lg text-earth-100 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            We operate in accordance with strict safety and statutory approvals. Batch dates and operational basecamps are confirmed after thorough site assessments.
          </p>
        </div>
      </section>

      {/* Main Batches List Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Notice of Non-Fabrication */}
        <div className="max-w-4xl mx-auto mb-12 p-5 rounded-xl bg-forest-900/80 border border-gold-500/30 text-xs sm:text-sm text-earth-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-gold-400 block font-semibold">
              Official Schedule Transparency Policy:
            </strong>
            <p className="text-earth-300 leading-relaxed text-xs">
              Unlike commercial tour operators, India Survival Academy does not fabricate false batch dates, countdown timers, seat limits, or fees before administrative and environmental permits are formally issued. Registering your interest below places you on the advance priority registry.
            </p>
          </div>
        </div>

        {/* Batches Table / Cards */}
        <div className="wilderness-card rounded-xl border border-gold-500/20 overflow-hidden mb-12">
          <div className="bg-forest-900 px-6 py-4 border-b border-olive-800/60 flex items-center justify-between">
            <span className="font-heading font-bold text-sm tracking-wider uppercase text-earth-100">
              Active Challenge Tracks
            </span>
            <span className="text-xs text-earth-400 font-mono">
              Status: Pre-announcement Registry
            </span>
          </div>

          <div className="divide-y divide-olive-900/60">
            {batchesData.map((batch) => (
              <div
                key={batch.id}
                className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-forest-900/40 transition-colors"
              >
                <div className="space-y-2 lg:max-w-md">
                  <div className="flex items-center gap-2">
                    <Badge variant="gold">{batch.duration}</Badge>
                    <Badge variant="outline">{batch.status}</Badge>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-earth-100">
                    {batch.courseTitle}
                  </h3>
                  <p className="text-xs text-earth-300">
                    Candidate Basecamp: {batch.venueStatus}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-earth-300">
                  <span className="text-[11px] font-semibold text-gold-500 uppercase tracking-wider block">
                    Calendar Timeline:
                  </span>
                  <div className="flex items-center gap-1.5 font-medium text-earth-200">
                    <Clock className="w-4 h-4 text-gold-400" />
                    <span>{batch.batchDate}</span>
                  </div>
                </div>

                <div className="lg:shrink-0">
                  <Button
                    to={`/enroll?course=${batch.courseId}`}
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Enquire & Join Waitlist
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How Batch Allocation Works */}
        <div className="space-y-4 max-w-5xl mx-auto">
          <div className="text-center sm:text-left border-b border-olive-800/60 pb-3">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-earth-100">
              How the Batch Allocation Process Works
            </h3>
            <p className="text-xs sm:text-sm text-earth-300">
              Step-by-step admissions from advance inquiry to active basecamp deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="wilderness-card p-6 rounded-2xl border border-gold-500/20 hover:border-gold-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-forest-950 border border-gold-500/30 flex items-center justify-center mb-4 text-gold-400 font-bold text-sm">
                01
              </div>
              <h4 className="font-heading font-bold text-earth-100 text-base mb-2">
                Advance Registration
              </h4>
              <p className="text-xs text-earth-300 leading-relaxed">
                Submit your outdoor background and preferred challenge track (24h, 48h, or 72h) through our secure online registration desk.
              </p>
            </div>

            <div className="wilderness-card p-6 rounded-2xl border border-gold-500/20 hover:border-gold-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-forest-950 border border-gold-500/30 flex items-center justify-center mb-4 text-gold-400 font-bold text-sm">
                02
              </div>
              <h4 className="font-heading font-bold text-earth-100 text-base mb-2">
                Medical & Route Briefing
              </h4>
              <p className="text-xs text-earth-300 leading-relaxed">
                Following statutory forest approvals, shortlisted candidates receive fitness questionnaires, gear advisories, and terrain safety briefings.
              </p>
            </div>

            <div className="wilderness-card p-6 rounded-2xl border border-gold-500/20 hover:border-gold-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-forest-950 border border-gold-500/30 flex items-center justify-center mb-4 text-gold-400 font-bold text-sm">
                03
              </div>
              <h4 className="font-heading font-bold text-earth-100 text-base mb-2">
                Basecamp Coordinates
              </h4>
              <p className="text-xs text-earth-300 leading-relaxed">
                Confirmed participants receive precise rendezvous coordinates, emergency radio protocols, and mentor check-in schedules.
              </p>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
