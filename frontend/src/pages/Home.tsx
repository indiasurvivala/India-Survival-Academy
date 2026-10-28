import React from 'react';
import { Hero } from '../components/home/Hero';
import { AcademyIntro } from '../components/home/AcademyIntro';
import { FeaturedCourses } from '../components/home/FeaturedCourses';
import { WhyChoose } from '../components/home/WhyChoose';
import { RajasthanLocations } from '../components/home/RajasthanLocations';
import { ActivitiesGrid } from '../components/home/ActivitiesGrid';
import { BatchesSection } from '../components/home/BatchesSection';
import { GalleryPreview } from '../components/home/GalleryPreview';
import { FAQSection } from '../components/home/FAQSection';
import { FinalCTA } from '../components/home/FinalCTA';
import { SEO } from '../components/common/SEO';
import { generateOrganizationSchema, generateWebSiteSchema } from '../utils/schemaGenerator';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <SEO
        title="India Survival Academy | Wilderness Awareness & Outdoor Skills Training"
        description="Explore outdoor survival skills, wilderness awareness, and team resilience challenges with India Survival Academy in Rajasthan. Experiential outdoor training with disciplined self-reliance."
        canonicalPath="/"
        keywords="wilderness survival India, survival academy, outdoor skills Rajasthan, Kumbhalgarh wilderness, bushcraft skills, survival challenge, outdoor education"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            generateOrganizationSchema(),
            generateWebSiteSchema()
          ]
        }}
      />
      <Hero />
      <AcademyIntro />
      <FeaturedCourses />
      <WhyChoose />
      <RajasthanLocations />
      <ActivitiesGrid />
      <BatchesSection />
      <GalleryPreview />
      <FAQSection />
      <FinalCTA />
    </div>
  );
};
