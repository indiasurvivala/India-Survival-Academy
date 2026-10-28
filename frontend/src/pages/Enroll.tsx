import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, FileText, UserCheck, PackageCheck, Mail, Phone } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { siteConfig } from '../data/siteConfig';
import { SEO } from '../components/common/SEO';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';

export const Enroll: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedCourseId = searchParams.get('course') || '';

  const steps = [
    {
      icon: <FileText className="w-5 h-5 text-gold-400" />,
      title: '1. Course Selection & Enquiry',
      description: 'Choose your desired challenge format (24h, 48h, or 72h) and submit your background details via the registration form.'
    },
    {
      icon: <UserCheck className="w-5 h-5 text-gold-400" />,
      title: '2. Fitness Disclosure & Screening',
      description: 'Our team evaluates applicant outdoor mobility and reviews mandatory medical disclosures to ensure participant safety.'
    },
    {
      icon: <PackageCheck className="w-5 h-5 text-gold-400" />,
      title: '3. Batch Allocation & Gear Protocol',
      description: 'Once forest permits are cleared and dates open, registered candidates receive basecamp coordinates and detailed packing lists.'
    }
  ];

  return (
    <div className="pb-20 bg-forest-950 text-earth-100">
      <SEO
        title="Enroll & Register Interest | Challenge Admissions"
        description="Register interest for upcoming India Survival Academy wilderness challenges in Rajasthan. Transparent admission screening and gear advisory process."
        canonicalPath="/enroll"
        keywords="enroll survival academy, outdoor course registration, wilderness challenge admissions, Rajasthan outdoor booking"
        schema={generateBreadcrumbSchema([
          { name: 'Enroll', path: '/enroll' }
        ])}
      />
      
      {/* Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-gold-500/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1800&q=80"
            alt="Wilderness campcraft"
            className="w-full h-full object-cover opacity-85 brightness-115"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/25" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
            <Compass className="w-4 h-4" />
            <span>Admissions & Inquiries</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Enroll in an Academy Challenge
          </h1>

          <p className="text-base sm:text-lg text-earth-100 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Begin your journey towards outdoor self-reliance and wilderness awareness. Submit an advance registration to join priority calendar notifications.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step-by-Step Guidance */}
        <div className="mb-16">
          <SectionHeading
            kicker="Admission Protocol"
            title="How the Enrollment Process Works"
            description="Our admissions model prioritizes safety, medical screening, and regulatory compliance over automated ticket sales."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="wilderness-card p-6 rounded-xl border border-gold-500/20">
                <div className="w-10 h-10 rounded-lg bg-forest-950 border border-gold-500/30 flex items-center justify-center mb-4 text-gold-400">
                  {step.icon}
                </div>
                <h3 className="font-heading font-bold text-base text-earth-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-earth-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Enquiry Form */}
        <div className="max-w-3xl mx-auto space-y-6">
          <EnquiryForm initialCourseId={preselectedCourseId} />

          <div className="p-4 sm:p-5 rounded-xl wilderness-card border border-gold-500/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest-900 border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-sm text-earth-100">Direct Admissions Inquiries</strong>
                <span className="text-xs text-earth-300">Questions about physical fitness prerequisites or customized challenges?</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 shrink-0">
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest-900 border border-gold-500/40 text-gold-300 hover:text-white hover:border-gold-300 text-xs font-semibold transition-all"
                aria-label={`Call academy admissions at ${siteConfig.officialPhone}`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{siteConfig.officialPhone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.officialEmail}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest-900 border border-gold-500/40 text-gold-300 hover:text-white hover:border-gold-300 text-xs font-semibold transition-all"
                aria-label={`Email academy admissions at ${siteConfig.officialEmail}`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{siteConfig.officialEmail}</span>
              </a>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
