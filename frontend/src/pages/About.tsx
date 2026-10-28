import React from 'react';
import { ShieldCheck, Compass, HeartHandshake, Trees, Globe, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';
import { groupWebsites } from '../data/siteConfig';

export const About: React.FC = () => {
  return (
    <div className="pb-20 bg-forest-950 text-earth-100">
      <SEO
        title="About Us | Wilderness Ethics & Field Philosophy"
        description="Learn about India Survival Academy: our wilderness philosophy, conservation ethics, mentor safety standards, and commitment to disciplined outdoor skills training in Rajasthan."
        canonicalPath="/about"
        keywords="about India survival academy, wilderness philosophy, outdoor ethics, conservation Rajasthan, wilderness instructors"
        schema={generateBreadcrumbSchema([
          { name: 'About Us', path: '/about' }
        ])}
      />
      
      {/* Header Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-gold-500/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1800&q=80"
            alt="Forest trail and wilderness backdrop"
            className="w-full h-full object-cover opacity-85 brightness-115"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/25" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
            <Compass className="w-4 h-4" />
            <span>Our Origin & Philosophy</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            The Philosophy Behind India Survival Academy
          </h1>

          <p className="text-base sm:text-lg text-earth-100 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Cultivating self-reliance, grounded observation, and environmental respect through deliberate outdoor wilderness learning.
          </p>
        </div>
      </section>

      {/* Main Philosophy & Mission Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              align="left"
              kicker="Core Mission"
              title="Stepping Beyond Artificial Comfort"
              className="mb-4"
            />

            <p className="text-sm sm:text-base text-earth-200 leading-relaxed">
              India Survival Academy was founded on a simple conviction: modern comfort often distances us from our innate ability to observe, adapt, and remain resilient in the face of uncertainty. Our programs bring individuals and teams into natural, uncontrolled environments where practical competency matters far more than theoretical posturing.
            </p>

            <p className="text-sm sm:text-base text-earth-300 leading-relaxed">
              Whether participants are learning to read cardinal directions from solar shadows, construct an emergency rain-shedding bivouac, or pace a dehydrated companion along a steep ridge, the lessons transcend wilderness survival. They translate into calmer leadership, mental clarity, and genuine self-reliance in everyday life.
            </p>

            <div className="p-4 rounded-xl bg-forest-900/80 border border-gold-500/25 space-y-2">
              <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Our Teaching Methodology:</span>
              </div>
              <p className="text-xs text-earth-300 leading-relaxed">
                We believe in structured demonstration followed by direct, hands-on student execution under safe mentor observation. No shortcuts, no simulated gimmicks.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                alt="Wilderness teamwork and expedition trekking"
                className="w-full h-[400px] sm:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* Pillars of Integrity Grid */}
      <section className="py-16 bg-forest-900/30 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            kicker="Guiding Commitments"
            title="The Pillars of Academy Integrity"
            description="Our non-negotiable operational principles ensure safe training and absolute respect for natural habitats."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="wilderness-card p-6 sm:p-8 rounded-xl border border-olive-800/60">
              <div className="w-12 h-12 rounded-lg bg-forest-950 border border-gold-500/30 flex items-center justify-center mb-5 text-gold-400">
                <Trees className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-earth-100 mb-2">
                Habitat Conservation & Leave-No-Trace
              </h3>
              <p className="text-xs sm:text-sm text-earth-300 leading-relaxed">
                We respect protected flora and fauna. Every campfire is safely contained and erased; all waste is packed out; and wildlife habitats are left completely undisturbed.
              </p>
            </div>

            <div className="wilderness-card p-6 sm:p-8 rounded-xl border border-olive-800/60">
              <div className="w-12 h-12 rounded-lg bg-forest-950 border border-gold-500/30 flex items-center justify-center mb-5 text-gold-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-lg text-earth-100 mb-2">
                Statutory Regulatory Compliance
              </h3>
              <p className="text-xs sm:text-sm text-earth-300 leading-relaxed">
                We never conduct training without required forest clearances and district administrative permissions. Safety, legality, and conservation always supersede operational convenience.
              </p>
            </div>

            <div className="wilderness-card p-6 sm:p-8 rounded-xl border border-olive-800/60">
              <div className="w-12 h-12 rounded-lg bg-forest-950 border border-gold-500/30 flex items-center justify-center mb-5 text-gold-400">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-earth-100 mb-2">
                Ego-Free Mentorship
              </h3>
              <p className="text-xs sm:text-sm text-earth-300 leading-relaxed">
                True wilderness mastery does not boast. Our instructors prioritize student psychological safety, patient skill progression, and constructive team communication.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Explore Our Other Websites Section */}
      <section className="py-14 bg-forest-900/40 border-b border-gold-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Our Group Websites</span>
          </div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-earth-100 mb-6">
            Explore Our Other Websites
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {groupWebsites.map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest-900/90 border border-gold-500/30 hover:border-gold-400 hover:bg-forest-800 text-earth-100 hover:text-gold-300 text-sm font-semibold transition-all group focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-md"
                aria-label={`${site.name} (opens in a new tab)`}
              >
                <span>{site.name}</span>
                <ExternalLink className="w-4 h-4 text-gold-400 group-hover:text-gold-300 transition-colors shrink-0" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-earth-100 mb-4">
          Experience Structured Outdoor Learning
        </h2>
        <p className="text-sm text-earth-300 mb-8">
          Explore our challenge levels or reach out to our team to discuss customized team or corporate wilderness workshops.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/courses" variant="primary" size="lg">
            Explore Courses
          </Button>
          <Button to="/contact" variant="secondary" size="lg">
            Contact Academy Team
          </Button>
        </div>
      </section>

    </div>
  );
};
