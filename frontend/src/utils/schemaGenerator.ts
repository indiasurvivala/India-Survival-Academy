import { siteConfig } from '../data/siteConfig';
import { coursesData } from '../data/courses';
import { faqsData } from '../data/faqs';
import { BlogPost } from '../types';

/**
 * Valid Schema.org JSON-LD Generators for India Survival Academy
 *
 * Strict Compliance:
 * - Uses only verified organization data, official parent brand, and confirmed domain.
 * - No fabricated reviews, aggregate ratings, phone numbers, addresses, prices, or fake credentials.
 */

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${siteConfig.siteUrl}/#organization`,
  name: siteConfig.academyName,
  url: siteConfig.siteUrl,
  email: siteConfig.officialEmail,
  telephone: siteConfig.officialPhone,
  logo: `${siteConfig.siteUrl}${siteConfig.logoPath}`,
  image: `${siteConfig.siteUrl}${siteConfig.heroImagePath || siteConfig.logoPath}`,
  description: siteConfig.heroSupportingText,
  parentOrganization: {
    '@type': 'Organization',
    name: siteConfig.parentBrand
  },
  sameAs: siteConfig.socialLinks.map((s) => s.url),
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Rajasthan, India'
  },
  knowsAbout: [
    'Wilderness Survival',
    'Outdoor Bushcraft',
    'Topographic Navigation',
    'Emergency Bivouac Shelters',
    'Leave-No-Trace Conservation Ethics',
    'Team Outdoor Resilience'
  ]
});

export const generateWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.siteUrl}/#website`,
  url: siteConfig.siteUrl,
  name: siteConfig.academyName,
  description: siteConfig.defaultDescription,
  publisher: {
    '@id': `${siteConfig.siteUrl}/#organization`
  },
  inLanguage: 'en-IN'
});

export const generateCoursesSchema = () => {
  return coursesData.map((course) => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${siteConfig.siteUrl}/courses#${course.id}`,
    name: course.title,
    description: course.fullDescription,
    provider: {
      '@type': 'EducationalOrganization',
      name: siteConfig.academyName,
      sameAs: siteConfig.siteUrl
    },
    educationalLevel: course.level,
    timeRequired: `PT${course.durationHours}H`,
    teaches: course.learningThemes,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseWorkload: `PT${course.durationHours}H`,
      location: {
        '@type': 'Place',
        name: 'Rajasthan Field Terrains (Candidate basecamps subject to forest permits)',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Rajasthan',
          addressCountry: 'IN'
        }
      }
    },
    url: `${siteConfig.siteUrl}/courses`
  }));
};

export const generateFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${siteConfig.siteUrl}/faq#faqpage`,
  mainEntity: faqsData.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export interface BreadcrumbCrumb {
  name: string;
  path: string;
}

export const generateBreadcrumbSchema = (crumbs: BreadcrumbCrumb[]) => {
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteConfig.siteUrl}/`
    },
    ...crumbs.map((crumb, idx) => {
      const cleanPath = crumb.path.startsWith('/') ? crumb.path : `/${crumb.path}`;
      return {
        '@type': 'ListItem',
        position: idx + 2,
        name: crumb.name,
        item: `${siteConfig.siteUrl}${cleanPath}`
      };
    })
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  };
};

export const generateArticleSchema = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${siteConfig.siteUrl}/blog/${post.slug}#article`,
  headline: post.title,
  description: post.excerpt,
  image: post.coverImage.startsWith('http')
    ? post.coverImage
    : `${siteConfig.siteUrl}${post.coverImage.startsWith('/') ? post.coverImage : `/${post.coverImage}`}`,
  datePublished: post.publishedDate,
  dateModified: post.updatedDate || post.publishedDate,
  author: {
    '@type': 'Organization',
    name: post.author.name,
    url: siteConfig.siteUrl
  },
  publisher: {
    '@type': 'EducationalOrganization',
    name: siteConfig.academyName,
    url: siteConfig.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.siteUrl}${siteConfig.logoPath}`
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${siteConfig.siteUrl}/blog/${post.slug}`
  },
  articleSection: post.category,
  keywords: post.tags.join(', ')
});
