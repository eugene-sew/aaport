export interface Supervision {
  id: string;
  title: string;
  supervisee_name: string;
  organization?: string;
  start_date?: string;
  end_date?: string;
  is_ongoing: boolean;
  description?: string;
  supervision_type: string;
  hours?: number;
  location?: string;
  outcomes?: string;
  is_featured: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface SpeakingEngagement {
  id: string;
  title: string;
  event_name: string;
  organization: string;
  date?: string;
  location?: string;
  description?: string;
  audience_size?: string;
  audience_type?: string;
  engagement_type: string;
  topics?: string[];
  feedback?: string;
  is_featured: boolean;
  featured_image?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const supervisionTypes = [
  'Clinical',
  'Academic',
  'Research',
  'Professional',
  'Peer',
  'Group'
];

export const engagementTypes = [
  'Keynote',
  'Workshop',
  'Panel',
  'Presentation',
  'Webinar',
  'Guest Lecture',
  'Roundtable',
  'Conference Talk'
];

export const audienceTypes = [
  'Academic',
  'Professional',
  'Community',
  'Students',
  'Mixed'
];

export const audienceSizes = [
  'Under 25',
  '25-50',
  '50-100',
  '100-250',
  '250-500',
  '500+'
];
