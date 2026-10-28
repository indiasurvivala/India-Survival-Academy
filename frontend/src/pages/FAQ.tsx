import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, Mail, Phone } from 'lucide-react';
import { faqsData } from '../data/faqs';
import { siteConfig } from '../data/siteConfig';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/schemaGenerator';

export const FAQ: React.FC = () => {

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'course-durations': true,
    'location-permissions': true
  });

  const categories = ['All', 'Courses', 'Preparation & Gear', 'Venues & Permissions', 'Enquiry & Safety'];

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = faqsData.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-20 bg-forest-950 text-earth-100">
      <SEO
        title="Frequently Asked Questions"
        description="Find transparent answers regarding course durations, packing essentials, candidate training venues in Rajasthan, safety guidelines, and enrollment."
        canonicalPath="/faq"
        keywords="survival academy FAQ, outdoor survival questions, wilderness permits Rajasthan, survival gear questions"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            generateFAQSchema(),
            generateBreadcrumbSchema([{ name: 'FAQ', path: '/faq' }])
          ]
        }}
      />
      
      {/* Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-gold-500/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=80"
            alt="Forest mist background"
            className="w-full h-full object-cover opacity-85 brightness-115"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/25" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
            <HelpCircle className="w-4 h-4" />
            <span>Support & Policies</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Frequently Asked Questions
          </h1>

          <p className="text-base sm:text-lg text-earth-100 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Honest, transparent guidance regarding training durations, gear requirements, sanctuary regulations, and batch alerts.
          </p>

          {/* Search Bar with Clear Button */}
          <div className="max-w-md mx-auto mt-8 relative">
            <Search className="w-5 h-5 text-gold-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. gear, permissions, 24h)..."
              className="w-full pl-12 pr-10 py-3 rounded-xl bg-forest-900/90 border border-gold-500/30 text-earth-100 text-sm focus:ring-2 focus:ring-gold-500 backdrop-blur-md placeholder:text-earth-400"
              aria-label="Search frequently asked questions"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-earth-400 hover:text-gold-300 p-1"
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 bg-forest-900/60 border-b border-olive-800/40 sticky top-[68px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? faqsData.length
              : faqsData.filter((f) => f.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? 'bg-gold-500 text-forest-950 shadow-md font-bold'
                    : 'bg-forest-950/80 text-earth-300 hover:text-white border border-olive-800/60 hover:border-gold-500/30'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat ? 'bg-forest-950/20 text-forest-950 font-bold' : 'bg-forest-900 text-gold-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Accordion Questions */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className={`wilderness-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-gold-500/50 bg-forest-900/90 shadow-[0_8px_24px_rgba(0,0,0,0.4)]' : 'border-olive-800/50 hover:border-gold-500/30'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  aria-expanded={isOpen}
                  aria-controls={`faq-body-${faq.id}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 bg-forest-950/90 px-2.5 py-1 rounded-md border border-gold-500/25 shrink-0 mt-0.5 hidden sm:inline-block">
                      {faq.category}
                    </span>
                    <span className="font-heading font-semibold text-base sm:text-lg text-earth-100">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-gold-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-gold-300' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-body-${faq.id}`}
                    className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-earth-200 leading-relaxed border-t border-olive-800/40 animate-fadeIn"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 wilderness-card rounded-2xl border border-gold-500/20 max-w-md mx-auto p-8">
            <HelpCircle className="w-10 h-10 text-gold-400 mx-auto mb-3 opacity-60" />
            <h3 className="font-heading font-bold text-lg text-earth-100 mb-1">No Questions Found</h3>
            <p className="text-xs text-earth-300 mb-4">No FAQ entries match "{searchQuery}". Try another keyword or browse all topics.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="text-xs font-semibold text-gold-400 underline"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Bottom Help Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-xl bg-forest-900/80 border border-gold-500/20 text-center space-y-3">
          <h3 className="font-heading font-bold text-lg text-earth-100">
            Have a question not listed here?
          </h3>
          <p className="text-xs sm:text-sm text-earth-300 max-w-md mx-auto">
            Our team is available through the enquiry desk to address corporate, collegiate, or individual inquiries.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 flex-wrap">
            <Button to="/contact" variant="primary" size="sm">
              Contact Academy Helpdesk
            </Button>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-forest-950 border border-gold-500/40 text-gold-300 hover:text-white hover:border-gold-300 text-xs font-semibold transition-all"
              aria-label={`Call India Survival Academy directly at ${siteConfig.officialPhone}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{siteConfig.officialPhone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.officialEmail}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-forest-950 border border-gold-500/40 text-gold-300 hover:text-white hover:border-gold-300 text-xs font-semibold transition-all"
              aria-label={`Email India Survival Academy directly at ${siteConfig.officialEmail}`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{siteConfig.officialEmail}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
