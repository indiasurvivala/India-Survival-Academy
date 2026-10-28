import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Clock, MessageSquare, Instagram } from 'lucide-react';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { siteConfig } from '../data/siteConfig';
import { SEO } from '../components/common/SEO';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';

export const Contact: React.FC = () => {
  return (
    <div className="pb-20 bg-forest-950 text-earth-100">
      <SEO
        title="Contact & Consultation Desk"
        description="Get in touch with India Survival Academy for course inquiries, corporate wilderness challenge briefings, and candidate venue clarifications. Direct enquiry and consultation desk."
        canonicalPath="/contact"
        keywords="contact India Survival Academy, survival course inquiry, Rajasthan wilderness consultation"
        schema={generateBreadcrumbSchema([
          { name: 'Contact Us', path: '/contact' }
        ])}
      />
      
      {/* Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-gold-500/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=1800&q=80"
            alt="Field communication and navigation map"
            className="w-full h-full object-cover opacity-85 brightness-115"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/25" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
            <MessageSquare className="w-4 h-4" />
            <span>Academy Communications</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Contact & Consultation Desk
          </h1>

          <p className="text-base sm:text-lg text-earth-100 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Reach out with program inquiries, group challenge consultations, or candidate venue briefings.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Cards & Operational Disclosures (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="wilderness-card p-6 sm:p-8 rounded-xl border border-gold-500/20 space-y-6">
              <h2 className="font-heading font-bold text-xl text-earth-100 border-b border-olive-800/60 pb-3">
                Academy Desk Information
              </h2>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-earth-100 block">Candidate Operations Base:</strong>
                    <span className="text-earth-300">
                      Field exercises centered around Kumbhalgarh, Mount Abu, Sariska, & Thar Desert candidate zones, Rajasthan.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-earth-100 block">Official Academy Email:</strong>
                    <a
                      href={`mailto:${siteConfig.officialEmail}`}
                      className="text-gold-400 hover:text-gold-300 font-medium underline underline-offset-2 transition-colors text-xs sm:text-sm break-all"
                      aria-label={`Send email to ${siteConfig.officialEmail}`}
                    >
                      {siteConfig.officialEmail}
                    </a>
                    
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-earth-100 block">Telephone Helpdesk:</strong>
                    <a
                      href={`tel:${siteConfig.phoneTel}`}
                      className="text-gold-400 hover:text-gold-300 font-semibold underline underline-offset-2 transition-colors text-xs sm:text-sm"
                      aria-label={`Call India Survival Academy at ${siteConfig.officialPhone}`}
                    >
                      {siteConfig.officialPhone}
                    </a>
                    
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-earth-100 block">Consultation Window:</strong>
                    <span className="text-earth-300">
                      Monday to Saturday: 09:30 AM – 05:00 PM IST.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-earth-100 block">Official Instagram:</strong>
                    <a
                      href={siteConfig.instagramUrl || 'https://www.instagram.com/india_survivalacademy'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-400 hover:text-gold-300 underline underline-offset-2 transition-colors font-medium text-xs sm:text-sm"
                    >
                      @india_survivalacademy
                    </a>
                  </div>
                </div>
              </div>

              
            </div>

            {/* Environmental Compliance Banner */}
            <div className="wilderness-card p-6 rounded-xl border border-olive-800/60 text-xs text-earth-300 space-y-2">
              <div className="flex items-center gap-2 text-gold-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Statutory Permissions & Safety Advisory</span>
              </div>
              <p>
                All academy outdoor modules are strictly conducted under applicable permissions and forest department guidelines. No activities are conducted within prohibited sanctuary zones.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>

        </div>
      </section>

    </div>
  );
};
