import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Bell } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { batchesData } from '../../data/batches';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const BatchesSection: React.FC = () => {
  return (
    <section id="batches" className="py-20 md:py-28 bg-forest-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          kicker="Training Calendar Status"
          title="Upcoming Batches & Schedule Status"
          description="Official batch schedules and operational venues are published following administrative approvals. Register your interest for priority alerts."
        />

        {/* Batch Cards / Table Interface */}
        <div className="wilderness-card rounded-xl border border-gold-500/20 overflow-hidden mb-10">
          
          {/* Header Bar */}
          <div className="bg-forest-900 px-6 py-4 border-b border-olive-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold-400" />
              <span className="font-heading font-bold text-sm tracking-wider uppercase text-earth-100">
                Official Batch Registry (Asia / Kolkata)
              </span>
            </div>

            <div className="text-xs text-earth-400 font-mono">
              Status: Formulating Calendar
            </div>
          </div>

          {/* Batches List */}
          <div className="divide-y divide-olive-900/60">
            {batchesData.map((batch) => (
              <div
                key={batch.id}
                className="p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-forest-900/40 transition-colors"
              >
                {/* Course Name & Meta */}
                <div className="space-y-2 lg:max-w-md">
                  <div className="flex items-center gap-2">
                    <Badge variant="gold">{batch.duration}</Badge>
                    <Badge variant="outline">{batch.status}</Badge>
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-earth-100">
                    {batch.courseTitle}
                  </h3>
                </div>

                {/* Date & Venue Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 text-xs text-earth-300">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-gold-500 uppercase tracking-wider block">
                      Batch Date:
                    </span>
                    <div className="flex items-center gap-1.5 font-medium text-earth-200">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      <span>{batch.batchDate}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-gold-500 uppercase tracking-wider block">
                      Operational Venue:
                    </span>
                    <div className="flex items-center gap-1.5 font-medium text-earth-200">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      <span>{batch.venueStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Enquiry CTA */}
                <div className="lg:shrink-0">
                  <Button
                    to={`/enroll?course=${batch.courseId}`}
                    variant="primary"
                    size="sm"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Register Interest
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Honest Disclosure Banner */}
        <div className="max-w-3xl mx-auto p-4 rounded-lg bg-forest-900/60 border border-olive-700/50 text-xs text-earth-300 flex items-start gap-3">
          <Bell className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-gold-400">Strict Non-Fabrication Commitment:</span>
            <p>
              In accordance with academy standards, we do not fabricate registration deadlines, seat counts, or provisional fees. All operational schedules are officially communicated once statutory clearances and weather safety assessments are concluded.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
