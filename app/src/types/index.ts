// App Discovery Platform - Type Definitions

export type ItemType = 'app' | 'idea';

export interface Item {
  id: string;
  type: ItemType;
  name: string;
  developer_name: string;
  description: string;
  categories: string[];
  platforms: string[];
  target_audience: string;
  scale_info: string;
  hero_image_url: string;
  gallery_image_urls: string[];
  app_link?: string;
  is_published: boolean;
  is_featured: boolean;
  view_count: number;
  like_count: number;
  interest_count: number;
  created_at: string;
  updated_at: string;
  // Idea-specific fields
  problem?: string;
  solution?: string;
  // Awards/Accolades
  accolades?: string[];
}

export interface Submission {
  id: string;
  email: string;
  type: ItemType;
  name: string;
  developer_name: string;
  description: string;
  categories: string[];
  platforms: string[];
  target_audience: string;
  scale_info: string;
  app_link?: string;
  uploaded_image_urls: string[];
  why_exceptional?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Like {
  id: string;
  item_id: string;
  fingerprint: string;
  created_at: string;
}

export type Category = 
  | 'All'
  | 'AI'
  | 'Productivity'
  | 'Design'
  | 'Health'
  | 'Finance'
  | 'Education'
  | 'Entertainment'
  | 'Developer Tools';

export type Platform = 
  | 'Web App'
  | 'iOS';

export const CATEGORIES: Category[] = [
  'All',
  'AI',
  'Productivity',
  'Design',
  'Health',
  'Finance',
  'Education',
  'Entertainment',
  'Developer Tools'
];

export const PLATFORMS: Platform[] = [
  'Web App',
  'iOS'
];

export interface AdminStats {
  totalApps: number;
  totalIdeas: number;
  pending: number;
  weeklyViews: string;
}
