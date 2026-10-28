import { EducationalResource } from '../types';

/**
 * Educational Resources & Guides for India Survival Academy
 *
 * Provides valuable, honest wilderness education for students and outdoor enthusiasts.
 */
export const resourcesData: EducationalResource[] = [
  {
    id: 'ten-essentials-checklist',
    title: 'The 10 Essentials: Wilderness Packing Protocol',
    category: 'Checklist',
    readTime: '4 min read',
    summary: 'A field-tested breakdown of the mandatory survival systems every explorer must carry into remote landscapes.',
    keyPoints: [
      'Navigation: Magnetic sighting compass and physical topographic map in a waterproof pouch.',
      'Hydration: Minimum 2-3 liters carrying capacity plus water purification tablets / mechanical filter.',
      'Illumination: Reliable LED headlamp with red night-vision mode and sealed spare lithium cells.',
      'Firecraft: Waterproof matches, windproof ferrocerium flint rod, and dry tinder kit.',
      'First Aid & Repair: Sterile compression dressing, blister care, tweezers, duct tape, and multi-tool.',
      'Emergency Shelter: Ultralight foil space bivy or sil-nylon emergency tarp.',
      'Sun & Thermal Protection: Wide-brim hat, UV sunglasses, mineral sunscreen, and thermal windshell.'
    ],
    disclaimer: 'Illustrative checklist for educational preparedness. Specific mandatory gear will be defined per academy course.'
  },
  {
    id: 'leave-no-trace-india',
    title: 'Leave-No-Trace (LNT) Principles in Sensitive Indian Habitats',
    category: 'Ethics & Safety',
    readTime: '6 min read',
    summary: 'Essential environmental protocols for exploring sanctuaries, reserve forests, and fragile arid habitats with zero lasting impact.',
    keyPoints: [
      'Plan Ahead & Prepare: Verify boundary permissions, seasonal fire restrictions, and wildlife movement hours.',
      'Travel on Durable Surfaces: Stay on established game tracks or rock outcrops; avoid crushing delicate desert crusts.',
      'Dispose of Waste Properly: Pack it in, pack it all out. Cat-holes for human waste must be dug 6-8 inches deep and 200 feet from water.',
      'Minimize Campfire Impacts: Use camp stoves wherever possible. Where campfires are permitted, use existing fire rings and drown completely.',
      'Respect Wildlife: Observe fauna from a safe distance. Never feed wild animals or leave food scents near sleep areas.',
      'Be Considerate of Other Visitors: Respect silence, keep noise levels minimal, and leave natural artifacts untouched.'
    ],
    disclaimer: 'Strict compliance with state wildlife protection laws and local forest guidelines is mandatory on all academy expeditions.'
  },
  {
    id: 'heat-hydration-management',
    title: 'Heat Illness & Hydration Management in Arid Terrains',
    category: 'Field Guide',
    readTime: '5 min read',
    summary: 'Preventing dehydration, heat exhaustion, and electrolyte depletion in the high-heat environments of Western India.',
    keyPoints: [
      'Pacing Strategy: Conduct heavy physical movement during early morning twilight and late dusk; rest in shade during peak solar hours (11:30 AM - 3:30 PM).',
      'Hydration Schedule: Sip water steadily in small regular volumes rather than gulping large amounts intermittently.',
      'Electrolyte Balance: Water alone is insufficient in extreme sweat conditions; supplement with oral rehydration salts (ORS).',
      'Recognizing Symptoms: Dizziness, cessation of sweating, confusion, and dark urine indicate immediate medical danger.',
      'Cooling Protocol: Loosen clothing, seek deep rock shade, elevate legs, and apply damp cloths to arterial pulse points.'
    ],
    disclaimer: 'This guide offers educational wilderness awareness and does not replace certified wilderness medical training.'
  },
  {
    id: 'first-aid-triage-fundamentals',
    title: 'Wilderness First-Aid & Emergency Signaling Fundamentals',
    category: 'Field Guide',
    readTime: '5 min read',
    summary: 'Basic field protocols for stabilizing injuries and communicating emergency distress in areas with zero cellular reception.',
    keyPoints: [
      'Scene Safety First: Ensure the area is safe from rockfall, animal hazards, or wildfire before approaching a casualty.',
      'ABCDE Primary Assessment: Airway, Breathing, Circulation, Disability, and Environmental Exposure.',
      'Sprain & Fracture Immobilization: Improvised splinting using trekking poles, padded foliage, and tubular webbing.',
      'Emergency Whistle Signaling: The universal wilderness distress code is three blasts on a whistle, paused for one minute, then repeated.',
      'Mirror & Ground Signals: Using sunlight reflection towards overhead aircraft or laying out high-contrast "X" markers on open clearings.'
    ],
    disclaimer: 'India Survival Academy emphasizes professional medical oversight; full emergency extraction protocols are briefed prior to each batch.'
  }
];
