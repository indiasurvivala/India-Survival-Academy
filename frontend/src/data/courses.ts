import { Course } from '../types';

/**
 * Courses Configuration for India Survival Academy
 *
 * Developers:
 * Edit this array to modify course names, durations, learning themes,
 * or replace course images.
 * Note: Descriptions represent provisional sample content until the academy confirms its exact syllabus.
 */
export const coursesData: Course[] = [
  {
    id: '24h-survival-challenge',
    title: '24-Hour Survival Challenge',
    duration: '24 Hours',
    durationHours: 24,
    level: 'Introductory / Foundational',
    badge: 'Foundation',
    shortDescription: 'Introductory outdoor skills and wilderness awareness designed to build basic self-reliance and environmental respect.',
    fullDescription: 'A focused, immersive 24-hour entry into essential wilderness disciplines. Participants are introduced to natural navigation, firecraft basics, emergency water sourcing, safe campcraft, and situational alertness in a controlled outdoor environment.',
    learningThemes: [
      'Wilderness awareness & trail psychology',
      'Basic firecraft & emergency warmth',
      'Water sourcing fundamentals & filtration concepts',
      'Simple emergency shelter setup',
      'Outdoor knife safety & camp etiquette'
    ],
    physicalDemand: 'Moderate',
    studentGearPlaceholder: [
      'Sturdy trekking boots / closed trail footwear',
      'Weather-appropriate layered outdoor clothing',
      'Personal water canteen & basic mess kit',
      'Detailed packing advisory shared upon batch confirmation'
    ],
    venueStatus: 'Suggested destinations in Rajasthan (e.g. Kumbhalgarh region) — specific venue to be confirmed.',
    image: '/images/junal_first.jpg',
    featured: true
  },
  {
    id: '48h-wilderness-challenge',
    title: '48-Hour Wilderness Challenge',
    duration: '48 Hours',
    durationHours: 48,
    level: 'Intermediate / Team Intensive',
    badge: 'Endurance',
    shortDescription: 'Extended outdoor learning, team coordination, and practical field problem-solving across two realistic wilderness days.',
    fullDescription: 'An extended immersion requiring mental resilience, teamwork, and deeper situational adaptability. Over 48 hours, participants tackle night-time camp discipline, navigation checkpoints, bivouac shelter resilience, and group coordination under changing field conditions.',
    learningThemes: [
      'Map & compass orienteering fundamentals',
      'Night-time camp discipline & perimeter watch',
      'Advanced natural shelter & knotcraft',
      'Field water purification & resource conservation',
      'Team problem-solving & emergency field communication'
    ],
    physicalDemand: 'Challenging',
    studentGearPlaceholder: [
      'Technical trail pack (30-40L)',
      'Sub-zero / thermal rated layers according to season',
      'Headlamp with red light mode & spare batteries',
      'Full gear checklist provided upon provisional enrolment'
    ],
    venueStatus: 'Suggested destinations in Rajasthan — specific venue to be confirmed upon authority approvals.',
    image: '/images/junal_second.jpg',
    featured: true
  },
  {
    id: '72h-expedition-challenge',
    title: '72-Hour Expedition Challenge',
    duration: '72 Hours',
    durationHours: 72,
    level: 'Advanced / Multi-day Immersion',
    badge: 'Expedition',
    shortDescription: 'Multi-day expedition-style learning emphasizing high endurance, autonomous navigation, and comprehensive wilderness self-sufficiency.',
    fullDescription: 'The academy’s most comprehensive challenge. Spanning three consecutive days and nights, this multi-stage wilderness expedition tests self-reliance, leadership rotation, terrain adaptation, improvised field solutions, and deep environmental awareness under rigorous safety oversight.',
    learningThemes: [
      'Multi-stage route planning & topographic reading',
      'Autonomous emergency bivouac construction',
      'Improvised field problem-solving & stretcher carry principles',
      'Endurance pacing & thermal stress management',
      'Wilderness ethics & Leave-No-Trace adherence'
    ],
    physicalDemand: 'High Endurance',
    studentGearPlaceholder: [
      'Expedition grade backpack (50L+)',
      'High-durability trail trousers & moisture-wicking apparel',
      'Personal hydration bladder & electrolyte reserves',
      'Mandatory medical disclosure & gear inspection before field entry'
    ],
    venueStatus: 'Suggested rugged terrain in Rajasthan — specific venue to be confirmed following formal regulatory clearances.',
    image: '/images/junal_third.jpg',
     featured: true
  }
];
