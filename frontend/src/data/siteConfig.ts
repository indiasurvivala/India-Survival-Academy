import { SiteConfig, GroupWebsite } from '../types';

export const groupWebsites: GroupWebsite[] = [
  {
    name: 'Vayam Group',
    url: 'https://www.vayamgroup.com/'
  },
  {
    name: 'Book My Adventure',
    url: 'https://bookmyadventure.co.in/'
  }
];

/**
 * Site Configuration for India Survival Academy
 *
 * Developers & Site Administrators:
 * Update this file to change brand copy, contact details, and site metadata.
 */
export const siteConfig: SiteConfig = {
  academyName: 'India Survival Academy',
  parentBrand: 'Vayam Adventure',
  siteUrl: 'https://indiasurvivalacademy.com',
  officialEmail: 'INDIASURVIVALA@GMAIL.COM',
  officialPhone: '+91 83199 63922',
  phoneTel: '+918319963922',
  defaultTitle: 'India Survival Academy | Wilderness Awareness & Outdoor Skills Training',
  defaultDescription: 'Explore outdoor survival skills, wilderness awareness, and team resilience challenges with India Survival Academy in Rajasthan. Experiential outdoor training with disciplined self-reliance.',
  heroHeadline: 'Beyond the Wild. Discover What You\'re Capable Of.',
  heroSupportingText: 'Explore outdoor survival skills, wilderness awareness, and challenging experiences with India Survival Academy.',
  logoPath: '/images/india-survival-academy-logo.png',
  heroImagePath: '/images/hero-jungle.jpg',
  heroFallbackImage: '/images/hero-jungle-survival.jpg',
  instagramUrl: 'https://www.instagram.com/india_survivalacademy',
  contactNote: 'Operational basecamps and candidate briefing zones in Rajasthan. Direct desk support available via official email and telephone.',
  socialLinks: [
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/india_survivalacademy',
      label: 'Instagram (@india_survivalacademy)'
    }
  ],
  groupWebsites
};
