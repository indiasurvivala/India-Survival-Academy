import { BlogPost } from '../types';

/**
 * Wilderness Journal Blog Posts — India Survival Academy
 *
 * Centralized, authentic, educational dispatches covering survival skills,
 * bushcraft fundamentals, terrain safety, map navigation, and ecological ethics.
 */
export const blogPosts: BlogPost[] = [
  {
    id: 'essential-survival-skills',
    slug: 'essential-survival-skills-every-beginner-should-learn',
    title: 'Essential Survival Skills Every Beginner Should Learn',
    excerpt: 'From mastering the physiological Rule of Threes to constructing wind-shedding bivouac shelters and sourcing clean water, discover the foundational outdoor disciplines that keep you safe.',
    category: 'Survival Skills',
    publishedDate: '2026-01-15',
    updatedDate: '2026-03-10',
    readTime: '7 min read',
    coverImage: '/images/hero-jungle-survival.jpg',
    fallbackImage: '/images/hero-jungle.jpg',
    altText: 'Wilderness survival instructor demonstrating field sheltercraft in rugged outdoor terrain',
    author: {
      name: 'India Survival Academy Editorial Team',
      role: 'Outdoor Education & Field Instruction'
    },
    featured: true,
    tags: ['Survival Basics', 'Sheltercraft', 'Water Purification', 'Emergency Signaling'],
    relatedCourseId: '24h-survival-challenge',
    relatedSlugs: [
      'how-to-prepare-for-a-wilderness-adventure',
      'essential-items-for-an-outdoor-survival-kit',
      'understanding-navigation-without-relying-only-on-gps'
    ],
    sections: [
      {
        id: 'psychological-anchor',
        heading: '1. The Psychological Anchor: The Survival Rule of Threes',
        subheading: 'Prioritizing threats under physiological stress',
        paragraphs: [
          'In an unexpected wilderness emergency, panic and disorientation are far deadlier than the elements. The human nervous system, when confronted with being stranded or losing a marked route, instinctively triggers an acute stress response. The seasoned outdoorsperson counteracts this using the foundational Rule of Threes.',
          'As a general survival baseline: you can survive 3 minutes without breathable air or in icy immersion, 3 hours without adequate thermal shelter in harsh environmental extremes, 3 days without potable water, and 3 weeks without caloric intake. Notice that shelter and temperature stabilization rank far above finding food.'
        ],
        bulletPoints: [
          'Stop, Think, Observe, and Plan (S.T.O.P.) before burning physical stamina.',
          'Assess current body temperature: shivering or profuse uncooled perspiration are early danger signals.',
          'Prioritize immediate shelter before twilight dims ambient visibility.'
        ],
        proTip: 'Whenever you realize you are disoriented, sit down immediately, take three deep diaphragmatic breaths, drink a sip of water, and evaluate your situation before taking another step.'
      },
      {
        id: 'sheltercraft-fundamentals',
        heading: '2. Thermoregulation & Emergency Bivouac Construction',
        subheading: 'Defeating windchill and conductive ground heat loss',
        paragraphs: [
          'Hypothermia and hyperthermia are two sides of the same thermoregulatory coin. The ground acts as an enormous thermal sponge that pulls body heat away via conduction up to dozens of times faster than ambient still air.',
          'Your first priority when crafting an emergency field bivy is ground insulation. Gather dry leaf litter, pine needles, or dead grasses to form a thick insulating mattress of at least 8 to 12 inches between your sleeping bag or emergency foil space blanket and the bare soil.',
          'Construct your shelter profile low to the earth to minimize wind resistance. An A-frame or lean-to using a downed sturdy ridgepole angled against the prevailing wind will shed drafts and retain your radiant body heat.'
        ],
        bulletPoints: [
          'Never sleep directly on bare rock or damp earth.',
          'Orient the opening of your shelter 90 degrees away from the prevailing wind direction.',
          'Inspect the overhead canopy for "widow-makers" — dead hanging branches that can fall in high winds.'
        ]
      },
      {
        id: 'water-sourcing-and-purification',
        heading: '3. Water Sourcing, Filtration, and Disinfection',
        subheading: 'Separating clear water from biologically safe water',
        paragraphs: [
          'In outdoor environments, crystal-clear water can still harbor pathogenic protozoa (Giardia lamblia, Cryptosporidium) and enteric bacteria. Clear water does not equal potable water.',
          'Always practice a two-stage purification method when possible: first, clarify turbid water by pouring it through a tight cotton bandana or millbank bag to eliminate suspended sediment; second, bring the water to a rolling boil for a minimum of 1 full minute (or 3 minutes at elevations over 2,000 meters).'
        ],
        bulletPoints: [
          'Avoid stagnant pools with algal scums or decomposing organic matter.',
          'Morning dew can be collected by sweeping clean absorbent cotton cloth over tall grasses before sunrise.',
          'Carry chemical purification tablets (chlorine dioxide or iodine) as lightweight backups to your boiling pot.'
        ]
      },
      {
        id: 'firecraft-and-signaling',
        heading: '4. Dependable Firecraft & Ground-to-Air Signaling',
        subheading: 'Tinder preparation and high-visibility contrast signals',
        paragraphs: [
          'Fire delivers warmth, psychological morale, dry clothes, purified water, and emergency rescue signaling. However, relying solely on standard matches or disposable butane lighters in windy downpours is a common beginner pitfall.',
          'Carry a ferrocerium flint rod and prepare your tinder bundle before you strike a single spark. Collect tinder (fine dry bark shavings, dry cattail fluff, or cotton balls soaked in petroleum jelly), kindling (dry twigs pencil-lead to thumb-thick), and fuel logs before initiating combustion.',
          'For signaling rescue aircraft or search parties, create geometric contrast patterns (a triangle of three small fires, or an SOS spelled out with rocks on a gravel bar). In daylight, green vegetation thrown onto an established fire creates dense white smoke visible for miles.'
        ],
        proTip: 'Three of anything — three whistle blasts, three smoke puffs, three mirror flashes — is the internationally recognized emergency distress signal in wilderness zones.'
      }
    ]
  },
  {
    id: 'prepare-wilderness-adventure',
    slug: 'how-to-prepare-for-a-wilderness-adventure',
    title: 'How to Prepare for a Wilderness Adventure: The Complete Field Guide',
    excerpt: 'Thorough route reconnaissance, realistic physical conditioning, emergency communication buffers, and gear break-in protocols form the bedrock of safe backcountry exploration.',
    category: 'Outdoor Safety',
    publishedDate: '2026-02-02',
    updatedDate: '2026-03-14',
    readTime: '8 min read',
    coverImage: '/images/junal_first.jpg',
    fallbackImage: '/images/hero-jungle.jpg',
    altText: 'Trekker inspecting topographic maps and field gear at dawn before embarking on a remote trail',
    author: {
      name: 'India Survival Academy Editorial Team',
      role: 'Expedition Planning Desk'
    },
    featured: false,
    tags: ['Trip Planning', 'Conditioning', 'Trail Prep', 'Gear Protocol'],
    relatedCourseId: '48h-wilderness-challenge',
    relatedSlugs: [
      'essential-survival-skills-every-beginner-should-learn',
      'essential-items-for-an-outdoor-survival-kit',
      'heat-safety-and-hydration-in-rajasthan-outdoors'
    ],
    sections: [
      {
        id: 'route-reconnaissance',
        heading: '1. Route Reconnaissance & Terrain Intelligence',
        subheading: 'Understanding boundaries, water sources, and escape routes',
        paragraphs: [
          'An adventure should test your adaptability, but never your ignorance of basic terrain parameters. Before stepping onto unpaved trails in rugged tracts like Rajasthan\'s Aravali hills or rocky scrublands, study official Survey of India toposheets or verified open terrain maps.',
          'Identify key geographical "handrails" such as prominent ridgelines, dry riverbeds (nullahs), or paved roads that run parallel to your route. Crucially, establish bail-out corridors — predetermined exit bearings you can follow if weather deteriorates or an injury occurs.'
        ],
        bulletPoints: [
          'Verify seasonal water points: seasonal springs marked on maps often run dry after October.',
          'Check local administrative and forest department permits required for nature reserves.',
          'Note mobile dead zones where cellular connectivity drops out completely.'
        ]
      },
      {
        id: 'the-flight-plan',
        heading: '2. The Trip Itinerary: Leaving a Wilderness Flight Plan',
        subheading: 'Your most vital emergency lifeline before departure',
        paragraphs: [
          'Never venture into remote backcountry without filing an explicit trip plan with at least two responsible individuals who will remain outside the trail area.',
          'Your trip plan must state: exact entry and planned exit coordinates, vehicle registration details left at the trailhead, names and emergency contacts for all party members, medical conditions, and a strict "Drop-Dead Time".'
        ],
        bulletPoints: [
          'Drop-Dead Time: The precise hour at which your emergency contact must notify local authorities if they have not heard from you.',
          'Stick to your designated route; deviations delay search and rescue teams significantly.',
          'Carry a secondary analog signaling device: high-decibel pea-less whistle and sighting signaling mirror.'
        ],
        proTip: 'Leave a printed copy of your map with your route marked in bright highlighter in the glove compartment or under the front seat of your vehicle at the trailhead.'
      },
      {
        id: 'physical-conditioning-and-footwear',
        heading: '3. Physical Conditioning & Footwear Break-In',
        subheading: 'Preventing trail-ending blisters and musculoskeletal strain',
        paragraphs: [
          'The greatest gear in the world is useless if your feet develop debilitating friction blisters within the first five kilometers. Breaking in your trekking footwear across diverse surfaces months before an expedition is non-negotiable.',
          'Condition your ankles and spine by taking progressive training walks wearing a weighted backpack equal to 15-20% of your body weight. Practice walking both uphill (engaging calves and glutes) and downhill (controlling knee impacts with hiking poles).'
        ],
        bulletPoints: [
          'Always pair breathable merino wool or synthetic socks with synthetic moisture-wicking liners.',
          'Treat "hot spots" on heels or balls of feet immediately with zinc oxide tape or blister patches before they burst into fluid blisters.',
          'Trim toenails flat across several days prior to departure to prevent bruising on steep descents.'
        ]
      }
    ]
  },
  {
    id: 'analog-navigation-skills',
    slug: 'understanding-navigation-without-relying-only-on-gps',
    title: 'Understanding Navigation Without Relying Only on GPS',
    excerpt: 'Battery drainage, satellite occlusion, and electronic failure can leave you blind. Master topographic contour interpretation, magnetic compass bearings, and celestial orienting.',
    category: 'Navigation',
    publishedDate: '2026-02-18',
    updatedDate: '2026-03-15',
    readTime: '7 min read',
    coverImage: '/images/junal_second.jpg',
    fallbackImage: '/images/hero-jungle.jpg',
    altText: 'Explorers taking a magnetic azimuth compass bearing against a topographic contour map',
    author: {
      name: 'India Survival Academy Editorial Team',
      role: 'Navigation & Topography Desk'
    },
    featured: false,
    tags: ['Navigation', 'Compass Skills', 'Topographic Maps', 'Dead Reckoning'],
    relatedCourseId: '72h-expedition-challenge',
    relatedSlugs: [
      'essential-survival-skills-every-beginner-should-learn',
      'how-to-prepare-for-a-wilderness-adventure',
      'leave-no-trace-responsible-outdoor-adventures'
    ],
    sections: [
      {
        id: 'fragility-of-digital-tools',
        heading: '1. The Inherent Fragility of Digital Gadgets in Deep Terrain',
        subheading: 'Why screens and lithium cells are supplementary, not primary',
        paragraphs: [
          'Smartphones, GPS watches, and satellite handhelds have revolutionized outdoor travel. However, they introduce dangerous single points of failure: intense heat degrades lithium batteries rapidly, dense tree canopies or steep slot canyons attenuate satellite fixes, and screen glass easily shatters on quartzite rock.',
          'An analog baseplate compass weighs less than 70 grams, requires no electricity, functions in freezing or scorching temperatures, and never loses signal. Knowing how to pair a magnetic needle with a topographic map is true self-reliance.'
        ],
        bulletPoints: [
          'Keep your primary paper map inside a clear, sealed waterproof pouch.',
          'Never store your magnetic compass near iron carabiners, radios, or cellphones to prevent reverse needle polarity.',
          'Always cross-check electronic coordinates against visible terrain features.'
        ]
      },
      {
        id: 'topographic-contour-interpretation',
        heading: '2. Topographic Map Anatomy: Seeing 3D Terrain on Flat Paper',
        subheading: 'Reading contour intervals, ridgelines, saddles, and spurs',
        paragraphs: [
          'Contour lines connect points of equal elevation above sea level. When contour lines are packed tightly together, the terrain is steep and cliff-like. When lines are spaced widely apart, the slope is gentle.',
          'Learning to recognize terrain landforms on paper saves immense physical energy. A "V" shape in contour lines pointing uphill indicates a valley, stream cut, or dry gully. A "V" pointing downhill indicates a spur or projecting ridge.'
        ],
        bulletPoints: [
          'Index Contours: Darker, labeled contour lines appearing every fifth interval to calculate elevation changes.',
          'Saddles / Cols: A low dip along a ridge between two peaks — ideal low-effort transit routes.',
          'Handrails: Linear terrain features (a distinct canyon rim, a dry watercourse, a fence line) that guide your general travel direction.'
        ]
      },
      {
        id: 'taking-field-bearings',
        heading: '3. The Magnetic Sighting Compass & Dead Reckoning',
        subheading: 'Shooting azimuths and pacing distance',
        paragraphs: [
          'To travel on a bearing: place your compass on the map connecting your current location with your destination, rotate the compass bezel until the orienting lines align with the map’s north-south grid lines, account for local magnetic declination, and lift the compass to eye level.',
          'Sight a distinct distant landmark (a lone dead acacia, a rock spire, or a notch in a ridge) that lies precisely on your travel arrow. Walk directly toward that reference landmark rather than staring at the compass needle constantly.',
          'Practice dead reckoning: calibrate your personal pace count. Count every time your left foot strikes the ground over a measured 100-meter flat course. For most adults carrying a daypack, 100 meters averages between 60 and 68 double-paces.'
        ],
        proTip: 'When terrain forces you to divert around a thorn thicket or deep boulder field, use 90-degree box offsets: turn 90° right, walk 50 paces, turn 90° left to resume your course, walk past the obstacle, turn 90° left for 50 paces, and turn 90° right to resume your original travel line.'
      }
    ]
  },
  {
    id: 'leave-no-trace-ethics',
    slug: 'leave-no-trace-responsible-outdoor-adventures',
    title: 'Leave No Trace: Responsible Outdoor Adventures in India\'s Sanctuaries',
    excerpt: 'Explore ecologically fragile forest reserves, desert sand systems, and rocky sanctuaries with minimal environmental footprint while respecting indigenous communities.',
    category: 'Wilderness Ethics',
    publishedDate: '2026-03-01',
    updatedDate: '2026-03-20',
    readTime: '6 min read',
    coverImage: '/images/kumbhalgarh-wildlife.png',
    fallbackImage: '/images/sariska alwar.jpg',
    altText: 'Lush biodiversity and leopard habitat in Kumbhalgarh wildlife sanctuary, Rajasthan',
    author: {
      name: 'India Survival Academy Editorial Team',
      role: 'Conservation & Ethics Desk'
    },
    featured: false,
    tags: ['LNT Principles', 'Conservation', 'Eco Ethics', 'Sanctuary Rules'],
    relatedCourseId: '24h-survival-challenge',
    relatedSlugs: [
      'essential-survival-skills-every-beginner-should-learn',
      'how-to-prepare-for-a-wilderness-adventure',
      'heat-safety-and-hydration-in-rajasthan-outdoors'
    ],
    sections: [
      {
        id: 'conservation-ethos',
        heading: '1. The Ethos of Modern Backcountry Stewardship',
        subheading: 'Leaving nature intact for future generations and wildlife',
        paragraphs: [
          'Wilderness travel in India is an immense privilege. From the thorn scrub and leopard zones of Kumbhalgarh to the dry deciduous woodlands of Sariska and the high montane forests of Mount Abu, wild spaces are under severe pressure from human encroachment and plastic litter.',
          'Leave-No-Trace (LNT) is not a set of rigid laws, but an ethical outdoor mindset. The true wilderness practitioner leaves zero trace of human occupation: no chopped living timber, no fire rings left blackened on bedrock, and no single-use plastics discarded in bushes.'
        ],
        bulletPoints: [
          'Pack It In, Pack It Out: Every piece of candy wrapper, tin foil, and plastic seal must return in your trash pouch.',
          'Never bury plastic or foil wrappers; animals unearth them and ingest toxic materials.',
          'Carry a dedicated trash bag and pick up pre-existing litter found along the trail.'
        ]
      },
      {
        id: 'durable-surfaces-and-waste',
        heading: '2. Durable Surface Travel & Sanitation Protocols',
        subheading: 'Protecting fragile biological crusts and pristine water bodies',
        paragraphs: [
          'In arid and semi-arid terrain, fragile desert soil crusts (cryptobiotic soil) can take decades to recover once crushed by boot soles or vehicle tires. Stay on established game trails, rocky washes, or hard-packed gravel beds.',
          'For human waste: dig a proper "cat-hole" 6 to 8 inches deep, located at least 200 feet (approx. 70 adult paces) away from any spring, dry creek bed, trail, or camp area. Cover the hole with natural soil and camouflage it with twigs after use.'
        ],
        bulletPoints: [
          'Carry toilet paper out in double-ziplocked bags; burying paper often leads to animals unearthing it.',
          'Wash mess kits 200 feet away from streams using biodegradable soap and scatter rinse water widely.',
          'Avoid clearing native shrubs or displacing natural rock shelters that house reptiles and ground-nesting birds.'
        ]
      },
      {
        id: 'wildlife-and-community-respect',
        heading: '3. Wildlife Distance Etiquette & Local Community Respect',
        subheading: 'Observing fauna safely without provoking defensive attacks',
        paragraphs: [
          'Indian forest tracts host formidable predators, including leopards, sloth bears, striped hyenas, and venomous pit vipers. Always maintain a respectful observation distance. If an animal alters its natural behavior in response to your presence, you are too close.',
          'Rural pastoral communities (such as the Rabari herders of western Rajasthan) have coexisted with native wildlife for centuries. Always seek permission before setting camp near village commons or grazing pathways, and treat local elders with deep courtesy.'
        ],
        proTip: 'Use the "Rule of Thumb" for wildlife distance: stretch your arm straight out and close one eye. If you cannot completely cover the wild animal with your thumb, you are too close and must slowly back away.'
      }
    ]
  },
  {
    id: 'essential-survival-kit-items',
    slug: 'essential-items-for-an-outdoor-survival-kit',
    title: 'Essential Items for an Outdoor Survival Kit: The Layered Pack System',
    excerpt: 'Avoid gimmicky gadgets. Learn how experienced wilderness instructors build reliable, multi-redundant survival kits tailored to Indian backcountry environments.',
    category: 'Bushcraft',
    publishedDate: '2026-03-12',
    updatedDate: '2026-03-22',
    readTime: '7 min read',
    coverImage: '/images/junal_third.jpg',
    fallbackImage: '/images/hero-jungle.jpg',
    altText: 'Field survival gear including ferrocerium rod, full-tang blade, water filter, and paracord neatly arranged',
    author: {
      name: 'India Survival Academy Editorial Team',
      role: 'Gear & Bushcraft Protocol'
    },
    featured: false,
    tags: ['Gear Kit', 'Bushcraft Tools', 'EDC', 'Field Preparation'],
    relatedCourseId: '48h-wilderness-challenge',
    relatedSlugs: [
      'essential-survival-skills-every-beginner-should-learn',
      'how-to-prepare-for-a-wilderness-adventure',
      'heat-safety-and-hydration-in-rajasthan-outdoors'
    ],
    sections: [
      {
        id: 'layered-pack-philosophy',
        heading: '1. The Philosophy of Functional Redundancy',
        subheading: 'Why lightweight multi-use tools outperform heavy multi-tools',
        paragraphs: [
          'Many beginners burden their backpacks with 15-in-1 gadget knives, hollow-handle decorative survival blades, and excessive gear that adds dead weight. When fatigue sets in on hour twenty of an expedition, heavy packs cause missteps and ankle rolls.',
          'A professional outdoor kit operates on layered redundancy: core life-support items reside directly on your body in cargo pockets, while shelter, cooking, and reserve gear reside inside your modular backpack.'
        ],
        bulletPoints: [
          'On-Body EDC (Everyday Carry): Items you retain even if you slip and lose your primary backpack down a slope.',
          'Multi-Use Value: Every piece of equipment should serve at least two independent functions.',
          'Simplicity & Durability: Mechanical simplicity means fewer points of catastrophic failure.'
        ]
      },
      {
        id: 'the-critical-5-cs',
        heading: '2. The Core 5 Cs of Field Survivability',
        subheading: 'Cutting, Combustion, Cover, Container, and Cordage',
        paragraphs: [
          'Coined in classic bushcraft instruction, the 5 Cs represent survival elements that are extraordinarily time-consuming or physically impossible to manufacture from scratch in the wild.',
          '1. Cutting Tool: A robust full-tang carbon or stainless fixed-blade knife (4 to 5-inch blade) capable of feathering damp wood and batoning kindling.',
          '2. Combustion Device: A 1/2-inch thick ferrocerium flint rod coupled with stormproof matches in an airtight vial.',
          '3. Cover: An ultralight 2-person reinforced foil emergency bivy sack or 3x3 meter sil-nylon tarp.',
          '4. Container: A single-walled stainless steel or titanium 1-liter bottle that can be placed directly on open flames to boil water.',
          '5. Cordage: 15 to 20 meters of commercial 550 nylon paracord (which contains 7 internal strands for fishing or snare craft).'
        ],
        proTip: 'Never use an insulated double-walled thermos bottle to boil water over a campfire — the sealed vacuum chamber will overpressurize and burst.'
      },
      {
        id: 'first-aid-and-repairs',
        heading: '3. Field Medical & Equipment Repair Supplies',
        subheading: 'Treating real wilderness trauma and ruptured gear',
        paragraphs: [
          'Wilderness injuries rarely match Hollywood movie plots. The most common medical events are sprained ankles, deep lacerations from thorn vines or sharp schist rock, dehydration headaches, and bee or scorpion stings.',
          'Pack high-tensile pressure bandages, sterile gauze, sterile irrigation saline, antiseptic povidone-iodine swabs, rehydration salts, antihistamines, and moleskin for blister relief. Wrap three meters of industrial duct tape around your water bottle for quick gear repairs.'
        ],
        bulletPoints: [
          'Include a compact metal tick/splinter tweezer and magnifying lens.',
          'Carry heavy-duty sailcloth needles and high-strength braided fishing line for boot and rucksack stitching.',
          'Include a high-decibel safety whistle attached to your pack’s sternum strap.'
        ]
      }
    ]
  },
  {
    id: 'heat-safety-hydration-rajasthan',
    slug: 'heat-safety-and-hydration-in-rajasthan-outdoors',
    title: 'Heat Safety and Hydration in Rajasthan\'s Outdoor Environments',
    excerpt: 'Extreme solar radiation, low atmospheric humidity, and arid desert winds demand disciplined pacing, electrolyte balance, and acute thermal awareness.',
    category: 'Outdoor Safety',
    publishedDate: '2026-03-22',
    updatedDate: '2026-03-24',
    readTime: '8 min read',
    coverImage: '/images/jaisalmar.jpg',
    fallbackImage: '/images/hero-jungle.jpg',
    altText: 'Expedition trekker walking across golden desert dunes during early morning low solar angles in Rajasthan',
    author: {
      name: 'India Survival Academy Editorial Team',
      role: 'Arid Climate Safety Desk'
    },
    featured: false,
    tags: ['Desert Safety', 'Hydration', 'Heat Stroke', 'Electrolytes'],
    relatedCourseId: '24h-survival-challenge',
    relatedSlugs: [
      'essential-survival-skills-every-beginner-should-learn',
      'how-to-prepare-for-a-wilderness-adventure',
      'essential-items-for-an-outdoor-survival-kit'
    ],
    sections: [
      {
        id: 'arid-climate-mechanics',
        heading: '1. The Physiology of Heat Loss in Arid Terrains',
        subheading: 'How rapid perspiration evaporation masks dangerous fluid loss',
        paragraphs: [
          'In western Rajasthan and the arid scrublands of the Thar and Aravali fringes, relative humidity frequently drops below 20%, while ambient midday temperatures can soar past 42°C. In such dry air, sweat evaporates almost instantaneously from your skin without leaving visible wet patches.',
          'This "invisible perspiration" gives explorers a deceptive illusion of coolness, leading them to underestimate fluid loss. A human performing moderate trail movement in arid heat can easily lose 1.0 to 1.5 liters of water per hour through respiration and sweating.'
        ],
        bulletPoints: [
          'Monitor Urine Color: Pale straw indicates proper hydration; dark amber warns of dangerous fluid deficits.',
          'Wear loose, tightly-woven, light-colored long-sleeve cotton or linen shirts to block direct solar radiation.',
          'Protect the neck and temples with a wide-brim desert bush hat or traditional cotton safa / shemagh.'
        ]
      },
      {
        id: 'electrolyte-replenishment',
        heading: '2. The Danger of Hyponatremia: Why Pure Water Alone is Not Enough',
        subheading: 'Balancing sodium, potassium, and magnesium during heavy exertion',
        paragraphs: [
          'A critical medical error made by beginners in high heat is chugging liters of pure distilled or filtered water without replenishing salts. Excessive pure water dilutes the blood’s sodium concentration, causing exercise-associated hyponatremia — a life-threatening condition characterized by nausea, muscle cramping, confusion, and cerebral edema.',
          'Always consume Oral Rehydration Salts (ORS) or electrolyte solutions alongside your water intake. For every 2 liters of water consumed under intense sun, dissolve one packet of standard WHO-formula ORS.'
        ],
        bulletPoints: [
          'Sip steadily in 150-200ml increments every 15 to 20 minutes rather than chugging a full liter at once.',
          'Add a pinch of salt and lemon to water bottles to encourage continuous hydration.',
          'Avoid alcohol, sugary sodas, and excessive caffeine which act as mild diuretics.'
        ]
      },
      {
        id: 'pacing-and-heat-illness-triage',
        heading: '3. The Desert Siesta Protocol & Heat Illness Triage',
        subheading: 'Recognizing heat exhaustion before it escalates to life-threatening heat stroke',
        paragraphs: [
          'Follow the age-old wisdom of desert desert nomads: schedule movement during the early morning dawn (05:30 AM to 09:30 AM) and late afternoon dusk (04:30 PM to 07:30 PM). Cease vigorous physical activity and rest in deep rock or tree shade during peak solar radiation (11:30 AM to 03:30 PM).',
          'Learn the critical boundary between Heat Exhaustion and Heat Stroke. Heat exhaustion presents with heavy sweating, cold clammy pale skin, dizziness, and rapid pulse. If untreated, it progresses to Heat Stroke — a true medical emergency marked by hot dry red skin (sweating mechanism fails), body temperatures exceeding 40°C, delirium, and loss of consciousness.'
        ],
        bulletPoints: [
          'Immediate Heat Triage: Move the patient to deep shade, remove outer boots and heavy layers, and elevate legs.',
          'Active Cooling: Fan the victim continuously while applying damp cloths to the neck, armpits, and groin where major blood vessels run near the skin.',
          'Never force an unconscious or delirious patient to drink liquids, as it risks aspiration into the lungs.'
        ],
        proTip: 'In deep arid scrub where trees are sparse, seek the northern shadows of steep cliff faces or rocky overhangs, where rocks stay up to 8°C cooler than open sand.'
      }
    ]
  }
];

export const blogCategories: string[] = [
  'All',
  'Survival Skills',
  'Bushcraft',
  'Outdoor Safety',
  'Navigation',
  'Wilderness Ethics'
];

/**
 * Helper to fetch a post by its unique URL slug
 */
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

/**
 * Helper to retrieve related posts for a given post
 */
export const getRelatedBlogPosts = (currentPost: BlogPost, limit = 3): BlogPost[] => {
  if (currentPost.relatedSlugs && currentPost.relatedSlugs.length > 0) {
    const directMatches = blogPosts.filter((p) => currentPost.relatedSlugs?.includes(p.slug));
    if (directMatches.length > 0) return directMatches.slice(0, limit);
  }
  return blogPosts
    .filter((p) => p.slug !== currentPost.slug && p.category === currentPost.category)
    .slice(0, limit);
};
