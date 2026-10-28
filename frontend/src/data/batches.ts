import { Batch } from '../types';

/**
 * Batches Data for India Survival Academy
 *
 * Accuracy Policy:
 * In accordance with academy guidelines, confirmed dates, deadlines, and seat counts
 * are NOT fabricated. "Schedule to be announced" and "Venue to be confirmed" are displayed
 * until official administrative confirmation is published.
 */
export const batchesData: Batch[] = [
  {
    id: 'batch-24h-alpha',
    courseId: '24h-survival-challenge',
    courseTitle: '24-Hour Survival Challenge',
    duration: '24 Hours',
    batchDate: 'Schedule to be announced',
    venueStatus: 'Venue to be confirmed (Rajasthan region)',
    status: 'Upcoming Calendar'
  },
  {
    id: 'batch-48h-bravo',
    courseId: '48h-wilderness-challenge',
    courseTitle: '48-Hour Wilderness Challenge',
    duration: '48 Hours',
    batchDate: 'Schedule to be announced',
    venueStatus: 'Venue to be confirmed (Suggested: Kumbhalgarh region)',
    status: 'Waitlist Enquiries Open'
  },
  {
    id: 'batch-72h-charlie',
    courseId: '72h-expedition-challenge',
    courseTitle: '72-Hour Expedition Challenge',
    duration: '72 Hours',
    batchDate: 'Schedule to be announced',
    venueStatus: 'Venue to be confirmed (Rajasthan terrain)',
    status: 'Schedule to be announced'
  }
];
