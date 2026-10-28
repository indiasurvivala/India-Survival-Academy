import { FAQItem } from '../types';
import { siteConfig } from './siteConfig';

/**
 * Frequently Asked Questions for India Survival Academy
 *
 * Honest answers addressing course logistics, permissions, gear, and booking.
 */
export const faqsData: FAQItem[] = [
  {
    id: 'course-durations',
    question: 'What are the available course durations?',
    answer: 'The academy has designed three primary immersive program formats: a 24-Hour Survival Challenge (introductory foundation), a 48-Hour Wilderness Challenge (extended outdoor learning and teamwork), and a 72-Hour Expedition Challenge (multi-day wilderness immersion). Full syllabi and schedules will be confirmed upon formal release.',
    category: 'Courses'
  },
  {
    id: 'what-to-bring',
    question: 'What should participants bring to training programs?',
    answer: 'Standard recommendations include broken-in trekking footwear, weather-appropriate layered outdoor apparel, personal hydration equipment, a headlamp, and a mess kit. A mandatory, comprehensive packing list and prohibited items list will be officially issued to confirmed participants prior to each batch commencement.',
    category: 'Preparation & Gear'
  },
  {
    id: 'how-to-enquire',
    question: 'How can I enquire about a course or register interest?',
    answer: `You can submit an initial enquiry through our online Enquiry Form or the dedicated Enroll page. Our team records your course interest and preferred timeframe, and will reach out with confirmed schedules, venue briefings, and eligibility guidelines as soon as batch dates are opened. You can also contact our admissions desk directly via phone at ${siteConfig.officialPhone} or email at ${siteConfig.officialEmail}.`,
    category: 'Enquiry & Safety'
  },
  {
    id: 'locations-confirmed',
    question: 'Where are training locations confirmed?',
    answer: 'Locations in Rajasthan (including candidate areas around Kumbhalgarh, Mount Abu, Sariska, and the Thar Desert) are currently suggested destinations. Exact operational basecamps and training routes are confirmed only after final administrative clearances, environmental reviews, and weather assessments are completed.',
    category: 'Venues & Permissions'
  },
  {
    id: 'when-batches-announced',
    question: 'When will new batches be announced?',
    answer: 'The official training calendar is currently under formulation. Interested participants can join the advance enquiry registry through our website to receive priority notifications once batch dates and registration openings are finalized.',
    category: 'Courses'
  },
  {
    id: 'location-permissions',
    question: 'Are outdoor activities subject to location permissions?',
    answer: 'Yes, strictly. Survival training, bushcraft learning, and overnight camping inside or adjacent to protected forests, wildlife sanctuaries, or national parks are never automatic. Every academy activity strictly complies with State Forest Department permissions, local district administration rules, and wildlife protection protocols.',
    category: 'Venues & Permissions'
  },
  {
    id: 'physical-fitness',
    question: 'What physical fitness level is required for these challenges?',
    answer: 'The 24-hour program requires a moderate baseline of cardiovascular endurance and outdoor mobility. The 48-hour and 72-hour challenges involve sustained walking over uneven terrain with field packs, exposure to natural elements, and night camp discipline. A basic medical disclosure is required before field enrollment.',
    category: 'Enquiry & Safety'
  },
  {
    id: 'leave-no-trace',
    question: 'What environmental ethics does the academy enforce?',
    answer: 'India Survival Academy strictly follows Leave-No-Trace (LNT) principles. All trash is packed out, fires are built only in designated safety pits with complete suppression and natural restoration, vegetation is respected, and wildlife habitats remain undisturbed.',
    category: 'Venues & Permissions'
  }
];
