export interface Course {
  id: string;
  title: string;
  duration: string;
  durationHours: number;
  level: string;
  badge: string;
  shortDescription: string;
  fullDescription: string;
  learningThemes: string[];
  physicalDemand: 'Moderate' | 'Challenging' | 'High Endurance';
  studentGearPlaceholder: string[];
  venueStatus: string;
  image: string;
  fallbackImage?: string;
  featured: boolean;
}

export interface Batch {
  id: string;
  courseId: string;
  courseTitle: string;
  duration: string;
  batchDate: string;
  venueStatus: string;
  status: 'Schedule to be announced' | 'Waitlist Enquiries Open' | 'Upcoming Calendar';
}

export interface LocationDestination {
  id: string;
  name: string;
  region: string;
  isPreferred: boolean;
  description: string;
  landscape: string;
  keyFeatures: string[];
  permissionsNote: string;
  image: string;
  fallbackImage?: string;
}

export interface ActivityTheme {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  image: string;
  fallbackImage?: string;
  learningOutcomes: string[];
  illustrativeNote: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Courses' | 'Preparation & Gear' | 'Venues & Permissions' | 'Enquiry & Safety';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Outdoor Skills' | 'Wilderness Landscapes' | 'Camp & Shelter' | 'Team Experiences';
  image: string;
  fallbackImage?: string;
  caption: string;
}

export interface EducationalResource {
  id: string;
  title: string;
  category: 'Checklist' | 'Field Guide' | 'Ethics & Safety';
  readTime: string;
  summary: string;
  keyPoints: string[];
  disclaimer: string;
}

export interface EnquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  preferredBatch: string;
  message: string;
  consent: boolean;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  courseId?: string;
  message?: string;
  consent?: string;
}

export interface GroupWebsite {
  name: string;
  url: string;
}

export interface SiteConfig {
  academyName: string;
  parentBrand: string;
  siteUrl: string;
  officialEmail: string;
  officialPhone: string;
  phoneTel: string;
  defaultTitle?: string;
  defaultDescription?: string;
  heroHeadline: string;
  heroSupportingText: string;
  logoPath: string;
  heroImagePath?: string;
  heroFallbackImage?: string;
  instagramUrl?: string;
  contactNote: string;
  socialLinks: {
    platform: string;
    url: string;
    label: string;
  }[];
  groupWebsites?: GroupWebsite[];
}

export type BlogCategory =
  | 'Survival Skills'
  | 'Bushcraft'
  | 'Outdoor Safety'
  | 'Navigation'
  | 'Wilderness Ethics';

export interface BlogPostSection {
  id: string;
  heading: string;
  subheading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  proTip?: string;
  keyTakeaways?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  publishedDate: string;
  updatedDate?: string;
  readTime: string;
  coverImage: string;
  fallbackImage?: string;
  altText: string;
  author: {
    name: string;
    role: string;
  };
  featured?: boolean;
  sections: BlogPostSection[];
  relatedCourseId?: string;
  relatedSlugs?: string[];
  tags: string[];
}
