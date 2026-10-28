import { ActivityTheme } from '../types';

/**
 * Illustrative Outdoor Learning Activities for India Survival Academy
 *
 * Notice:
 * These themes represent illustrative concepts and candidate learning modules
 * until the academy officially confirms its syllabus and operational schedule.
 */
export const activitiesData: ActivityTheme[] = [
  {
    id: 'wilderness-awareness',
    title: 'Wilderness Awareness & Observation',
    category: 'Situational Mindset',
    description: 'Training the senses to interpret natural audio cues, animal alerts, wind direction, weather changes, and terrain markers.',
    iconName: 'Eye',
    image: '/images/activity-wilderness-awareness.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    learningOutcomes: [
      '360-degree situational awareness',
      'Early identification of weather shifts and environmental hazards',
      'Calm, analytical decision-making under outdoor stress'
    ],
    illustrativeNote: 'Core foundation for all outdoor learning modules.'
  },
  {
    id: 'navigation-fundamentals',
    title: 'Navigation Fundamentals',
    category: 'Field Orientation',
    description: 'Practical orientation using topographic maps, magnetic compasses, celestial reference points, and solar shadow-stick techniques.',
    iconName: 'Compass',
    image: '/images/activity-navigation.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=800&q=80',
    learningOutcomes: [
      'Basic bearing calculation & triangulation',
      'Terrain association with paper contour lines',
      'Orientation without digital reliance or GPS signals'
    ],
    illustrativeNote: 'Illustrative field module subject to venue conditions.'
  },
  {
    id: 'shelter-awareness',
    title: 'Shelter Awareness & Bivouac Setup',
    category: 'Environmental Protection',
    description: 'Understanding wind factors, ground moisture, thermal regulation, and structural safety when constructing emergency bivouacs.',
    iconName: 'Tent',
    image: '/images/activity-shelter-setup.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80',
    learningOutcomes: [
      'Site selection away from flash flood corridors and deadfall trees',
      'Tarp configurations for heavy rain and solar deflection',
      'Leave-No-Trace site remediation upon pack-down'
    ],
    illustrativeNote: 'Practical shelter drills using minimal environmental impact techniques.'
  },
  {
    id: 'outdoor-preparedness',
    title: 'Outdoor Preparedness & Gear Maintenance',
    category: 'Field Readiness',
    description: 'Mastery of essential survival tins, emergency signaling devices, personal hydration planning, and responsible tool safety.',
    iconName: 'Shield',
    image: '/images/activity-outdoor-preparedness.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
    learningOutcomes: [
      'Assembly of a reliable 10-essential personal survival pack',
      'Safe knife handling, sheath discipline, and maintenance',
      'Signaling protocols for emergency search and rescue'
    ],
    illustrativeNote: 'Standardized workshop protocol for outdoor field entry.'
  },
  {
    id: 'team-challenges',
    title: 'Team Challenges & Wilderness Leadership',
    category: 'Collaborative Problem-Solving',
    description: 'Group-based scenario drills including improvised patient carries, resource allocation, collective pacing, and night watch rotations.',
    iconName: 'Users',
    image: '/images/activity-team-challenges.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    learningOutcomes: [
      'Clear, ego-free communication under fatigue',
      'Rotational field leadership and task delegation',
      'Collective responsibility for group morale and safety'
    ],
    illustrativeNote: 'Designed to foster personal growth, leadership, and camaraderie.'
  },
  {
    id: 'camping-skills',
    title: 'Bushcraft & Camping Skills',
    category: 'Campcraft Essentials',
    description: 'Hands-on practice with friction and spark firecraft, water boiling and filtration principles, cordage knots, and campsite hygiene.',
    iconName: 'Flame',
    image: '/images/activity-camping-skills.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    learningOutcomes: [
      'Reliable spark creation using ferrocerium rods in moist conditions',
      'Mechanical filtration vs chemical purification basics',
      'Essential outdoor hitches (taut-line, bowline, clove hitch)'
    ],
    illustrativeNote: 'Conducted under strict fire-safety guidelines and local environmental rules.'
  }
];
