import { LocationDestination } from '../types';

/**
 * Suggested Locations in Rajasthan for India Survival Academy
 *
 * Accuracy Note:
 * These are suggested destinations for exploration and illustrative terrain study,
 * NOT confirmed academy training venues.
 * Survival training and camping inside protected forests or sanctuaries are strictly subject
 * to applicable forest department permissions, local sanctuary rules, and environmental clearances.
 */
export const locationsData: LocationDestination[] = [
  {
    id: 'kumbhalgarh',
    name: 'Kumbhalgarh Wildlife Sanctuary',
    region: 'Rajsamand / Pali / Udaipur Districts, Rajasthan',
    isPreferred: true, // Primary visual emphasis
    description: 'Encompassing the rugged Aravali ranges, ancient stone battlements, and dry deciduous forests. Kumbhalgarh offers complex rocky ridges and varied canopy that make it a compelling candidate for wilderness training.',
    landscape: 'Steep hill slopes, rocky escarpments, mixed deciduous woodlands, and seasonal river beds.',
    keyFeatures: [
      'Preferred candidate destination for academy programs',
      'Extensive Aravali ridgelines and elevation shifts',
      'Rich biodiversity requiring keen situational awareness',
      'Historic outdoor lore and ancient path networks'
    ],
    permissionsNote: 'Suggested candidate venue. Formal training is subject to necessary forest department permits and strictly follows sanctuary regulations.',
    image: '/images/kumbhalgarh-wildlife.png',
    fallbackImage: 'https://images.unsplash.com/photo-1599827552599-eadf5e042738?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'mount-abu',
    name: 'Mount Abu Wildlife Sanctuary',
    region: 'Sirohi District, Rajasthan',
    isPreferred: false,
    description: 'The sole hill station of Rajasthan, Mount Abu presents granitic rock plateaus, subtropical bamboo groves, and cooler microclimates distinct from the surrounding plains.',
    landscape: 'High-altitude granite boulders, subtropical vegetation, deep ravines, and perennial water pools.',
    keyFeatures: [
      'Granite boulder navigation and terrain reading',
      'Unique high-elevation microclimate in Rajasthan',
      'Dense bamboo brakes and shaded valley routes'
    ],
    permissionsNote: 'Suggested destination for elevation-based outdoor learning, pending official venue confirmation and statutory compliance.',
    image: '/images/mount abu.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sariska',
    name: 'Sariska Tiger Reserve Region',
    region: 'Alwar District, Rajasthan',
    isPreferred: false,
    description: 'A classic dry deciduous thorn forest nestled within the northern Aravali hills, defined by narrow valleys, dry riverbeds, and historic ruins.',
    landscape: 'Dry deciduous Dhok forests, steep cliff faces, rocky plateaus, and seasonal nullahs.',
    keyFeatures: [
      'Sharpened awareness of wildlife behavior and buffer protocols',
      'Arid woodland tracking and environmental sign reading',
      'Challenging sun and heat management scenarios'
    ],
    permissionsNote: 'Illustrative destination. All activities in reserve peripheral buffer zones strictly adhere to National Tiger Conservation Authority (NTCA) rules and local forest permissions.',
    image: '/images/sariska alwar.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'jaisalmer-thar',
    name: 'Jaisalmer & The Thar Desert',
    region: 'Jaisalmer District, Western Rajasthan',
    isPreferred: false,
    description: 'The vast expanse of the Great Indian Desert tests water conservation discipline, orientation across rolling shifting sands, and desert thermal shifts.',
    landscape: 'Rolling sand dunes (Dhris), arid scrubland, extreme day-to-night temperature swings, and open horizon expanses.',
    keyFeatures: [
      'Celestial and shadow-stick desert navigation',
      'Critical dehydration prevention and shade generation',
      'Night-time movement under crystal-clear stellar skies'
    ],
    permissionsNote: 'Candidate landscape for desert resilience drills. Regulated under local administration and desert zone guidelines.',
    image: '/images/jaisalmar.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'
  }
];
