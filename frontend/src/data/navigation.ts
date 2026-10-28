export interface NavItem {
  label: string;
  path: string;
  isCta?: boolean;
}

export const mainNavLinks: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Courses', path: '/courses' },
  { label: 'Batches', path: '/batches' },
  { label: 'Activities', path: '/activities' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Resources', path: '/resources' },
  { label: 'Blog', path: '/blog' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' }
];

export const footerQuickLinks: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Activities', path: '/activities' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Resources', path: '/resources' },
  { label: 'Wilderness Journal', path: '/blog' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact Us', path: '/contact' }
];

export const footerCourseLinks: NavItem[] = [
  { label: '24-Hour Survival Challenge', path: '/courses#24h-survival-challenge' },
  { label: '48-Hour Wilderness Challenge', path: '/courses#48h-wilderness-challenge' },
  { label: '72-Hour Expedition Challenge', path: '/courses#72h-expedition-challenge' },
  { label: 'Upcoming Batches', path: '/batches' },
  { label: 'Enrolment Consultation', path: '/enroll' }
];
