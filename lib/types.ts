export type Language = 'te' | 'en' | 'hi';

export type NewsCategory = 
  | 'all'
  | 'national'
  | 'state'
  | 'district'
  | 'mandal'
  | 'video'
  | 'politics'
  | 'agriculture'
  | 'crime'
  | 'cinema'
  | 'sports'
  | 'business';

export interface MultiLingualText {
  te: string;
  en: string;
  hi: string;
}

export interface NewsArticle {
  id: string;
  title: MultiLingualText;
  content: MultiLingualText;
  summary: MultiLingualText;
  category: NewsCategory;
  state: string;
  district: string;
  mandal: string;
  imageUrl: string;
  galleryUrls?: string[];
  youtubeUrl?: string;
  views: number;
  publishedAt: string;
  authorName: string;
  authorRole: 'Admin' | 'Reporter';
  authorMandal?: string;
  reporterId?: string;
  isBreaking?: boolean;
  status: 'published' | 'pending' | 'rejected';
}

export interface Reporter {
  id: string;
  fullName: string;
  username: string;
  password?: string;
  mobile: string;
  email?: string;
  address?: string;
  pincode?: string;
  bloodGroup?: string;
  designation?: string;
  emergencyContact?: string;
  education?: string;
  state: string;
  district: string;
  mandal: string;
  photoUrl: string;
  aadhaarNumber: string;
  aadhaarDocUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  registeredAt: string;
  approvedAt?: string;
  idCardNumber?: string;
}

export type AdCategory = 
  | 'real_estate'
  | 'jobs'
  | 'business'
  | 'education'
  | 'matrimony'
  | 'events'
  | 'other';

export interface PrivateAd {
  id: string;
  title: string;
  category: AdCategory;
  state: string;
  district: string;
  mandal: string; // "All" or specific mandal
  bannerUrl: string;
  galleryUrls?: string[];
  youtubeUrl?: string;
  advertiserName: string;
  contactPhone: string;
  contactWhatsApp: string;
  description: string;
  validTill: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface AdSenseConfig {
  enabled: boolean;
  publisherId: string;
  topBannerSlot: string;
  sidebarSlot: string;
  inFeedSlot: string;
}

export interface UserFeedback {
  id: string;
  userName: string;
  userPhone: string;
  rating: number;
  type: 'content_quality' | 'bug_report' | 'suggestion' | 'ad_inquiry' | 'other';
  message: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
  articleId?: string;
  type: 'breaking' | 'mandal' | 'video';
  read?: boolean;
}

export interface LocationHierarchy {
  [state: string]: {
    [district: string]: string[]; // array of mandals
  };
}

export interface PortalBranding {
  logoUrl?: string;
  bannerUrl?: string;
  siteName: string;
  tagline: string;
}

