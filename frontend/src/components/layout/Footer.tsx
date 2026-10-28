import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Mail, Phone, Instagram, Globe, ExternalLink } from 'lucide-react';
import { Logo } from '../common/Logo';
import { footerQuickLinks, footerCourseLinks } from '../../data/navigation';
import { siteConfig, groupWebsites } from '../../data/siteConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 border-t border-gold-500/15 text-earth-200 pt-16 pb-12 relative overflow-hidden">
      {/* Background Topo Accent */}
      <div className="absolute inset-0 bg-topo-pattern pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-olive-800/60">
          
          {/* Col 1: Brand & Philosophy (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-earth-300 leading-relaxed max-w-sm mt-3">
              India Survival Academy is dedicated to structured wilderness awareness, outdoor self-reliance, practical bushcraft skills, and respectful environmental stewardship.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-gold-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Strict Leave-No-Trace environmental & safety compliance.</span>
            </div>

            {/* Official Instagram Badge */}
            <div className="pt-2">
              <a
                href={siteConfig.instagramUrl || 'https://www.instagram.com/india_survivalacademy'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-forest-900/90 border border-gold-500/30 text-earth-200 hover:text-gold-300 hover:border-gold-400 hover:bg-forest-800 transition-all text-xs group shadow-md"
                aria-label="Follow India Survival Academy on Instagram"
              >
                <Instagram className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-earth-100 group-hover:text-gold-300">
                  Follow on Instagram:
                </span>
                <span className="text-[11px] text-gold-400 font-mono">
                  @india_survivalacademy
                </span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-gold-400 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {footerQuickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-gold-300 transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Programs & Challenges (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-gold-400 font-bold">
              Challenges
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {footerCourseLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="hover:text-gold-300 transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Verified Contact Placeholders & Status (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-gold-400 font-bold">
              Academy Registry
            </h4>
            
            <div className="space-y-2.5 text-xs text-earth-300 bg-forest-900/60 p-4 rounded-lg border border-olive-800/40">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Field Operations:</strong> Candidate regions in Kumbhalgarh, Mount Abu, Sariska, & Thar Desert, Rajasthan.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div className="leading-tight">
                  <strong className="block text-earth-100">Official Email:</strong>
                  <a
                    href={`mailto:${siteConfig.officialEmail}`}
                    className="text-gold-400 hover:text-gold-300 transition-colors break-all underline-offset-2 hover:underline"
                    aria-label={`Email India Survival Academy at ${siteConfig.officialEmail}`}
                  >
                    {siteConfig.officialEmail}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div className="leading-tight">
                  <strong className="block text-earth-100">Official Phone:</strong>
                  <a
                    href={`tel:${siteConfig.phoneTel}`}
                    className="text-gold-400 hover:text-gold-300 transition-colors underline-offset-2 hover:underline font-medium"
                    aria-label={`Call India Survival Academy at ${siteConfig.officialPhone}`}
                  >
                    {siteConfig.officialPhone}
                  </a>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-earth-400 italic">
              {siteConfig.contactNote}
            </p>
          </div>
        </div>

        {/* Our Group Websites Section */}
        <div className="py-6 border-b border-olive-800/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gold-400 shrink-0" aria-hidden="true" />
              <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-gold-400 font-bold">
                Our Group Websites
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {groupWebsites.map((site) => (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-forest-900/80 border border-gold-500/25 hover:border-gold-400 hover:bg-forest-900 text-earth-200 hover:text-gold-300 text-xs sm:text-sm font-medium transition-all group focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm"
                  aria-label={`${site.name} (opens in a new tab)`}
                >
                  <span>{site.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gold-400/80 group-hover:text-gold-300 transition-colors shrink-0" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Instagram & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-earth-400">
          <p>
            &copy; {currentYear} {siteConfig.academyName}. An outdoor learning initiative. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2">
            <a
              href={siteConfig.instagramUrl || 'https://www.instagram.com/india_survivalacademy'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-earth-300 hover:text-gold-400 transition-colors"
              aria-label="India Survival Academy Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-gold-400" />
              <span>Instagram</span>
            </a>
            <span className="hidden sm:inline text-olive-800">•</span>
            <span>Illustrative syllabus & candidate venues</span>
            <span className="hidden sm:inline text-olive-800">•</span>
            <span>Subject to forest permits</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
