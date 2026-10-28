import React from 'react';
import { Compass, ShieldCheck, HeartHandshake, Zap, Trees, Eye } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export const WhyChoose: React.FC = () => {
  const values = [
    {
      icon: <Eye className="w-6 h-6 text-gold-400" />,
      title: 'Heightened Situational Awareness',
      description: 'Moving beyond city autopilot. Students learn to observe subtle environmental changes, ground contour shifts, wind shifts, and potential trail hazards with calm clarity.'
    },
    {
      icon: <Compass className="w-6 h-6 text-gold-400" />,
      title: 'Pragmatic Outdoor Preparedness',
      description: 'Understanding that true confidence stems from thorough preparation, disciplined gear readiness, and knowledge of basic navigation rather than bravado.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-gold-400" />,
      title: 'Authentic Team Camaraderie',
      description: 'Wilderness challenges remove artificial status. Groups learn shared pacing, ego-free communication, and collective accountability under fatigue.'
    },
    {
      icon: <Zap className="w-6 h-6 text-gold-400" />,
      title: 'Adaptability Under Pressure',
      description: 'When sudden rain arrives or a path becomes impassable, students practice analytical problem-solving and psychological grit rather than panic.'
    },
    {
      icon: <Trees className="w-6 h-6 text-gold-400" />,
      title: 'Leave-No-Trace Stewardship',
      description: 'We impart profound respect for fragile ecosystems. Every training module instills strict adherence to sanctuary rules, waste pack-out, and minimal disturbance.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-400" />,
      title: 'Structured Safety Framework',
      description: 'Challenges are designed to test individual resilience while strictly operating within conservative safety thresholds and emergency extraction protocols.'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-forest-900/30 border-y border-gold-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          kicker="The Value of Wilderness Learning"
          title="Why Train with India Survival Academy"
          description="Developing foundational life skills through structured exposure to nature, teamwork, and deliberate challenges."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="wilderness-card p-6 sm:p-7 rounded-2xl border border-gold-500/15 hover:border-gold-500/40 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-forest-950 border border-gold-500/30 flex items-center justify-center mb-5 shadow-md">
                  {val.icon}
                </div>

                <h3 className="font-heading font-semibold text-lg text-earth-100 mb-2">
                  {val.title}
                </h3>

                <p className="text-xs sm:text-sm text-earth-300 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};
