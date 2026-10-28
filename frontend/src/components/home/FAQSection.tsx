import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { faqsData } from '../../data/faqs';
import { Button } from '../common/Button';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Display top 6 questions on homepage
  const homepageFaqs = faqsData.slice(0, 6);

  return (
    <section id="faq" className="py-20 md:py-28 bg-forest-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          kicker="Common Inquiries"
          title="Frequently Asked Questions"
          description="Transparent, straightforward answers regarding academy schedules, candidate destinations, gear, and regulatory compliance."
        />

        <div className="space-y-4 mb-12">
          {homepageFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`wilderness-card rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-gold-500/40 bg-forest-900/90' : 'border-olive-800/40 hover:border-gold-500/20'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-gold-400' : 'text-earth-400'}`} />
                    <span className="font-heading font-semibold text-base sm:text-lg text-earth-100">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-gold-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-earth-200 leading-relaxed border-t border-olive-800/40 animate-fadeIn"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button to="/faq" variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Browse All Questions & Safety Policies
          </Button>
        </div>

      </div>
    </section>
  );
};
