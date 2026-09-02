export type UserRole = 'user' | 'admin' | 'super_admin';
export type Plan = 'free' | 'pro' | 'business';

export type RelationshipStatus =
  | 'new'
  | 'connected'
  | 'follow_up'
  | 'in_progress'
  | 'active'
  | 'partner'
  | 'customer'
  | 'prospect'
  | 'opportunity'
  | 'dormant';

export type FollowUpStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';
export type FollowUpPriority = 'low' | 'medium' | 'high';

export type RelationshipHealth = 'healthy' | 'good' | 'attention' | 'at_risk' | 'dormant';

export type OpportunityStage = 'new' | 'connected' | 'qualified' | 'follow_up' | 'opportunity' | 'active' | 'won' | 'lost';

export type CardOrientation = 'portrait' | 'landscape';

export type BlogPostStatus = 'draft' | 'published' | 'unpublished';

export type InteractionType = 'note' | 'meeting' | 'call' | 'email' | 'message' | 'event' | 'other';

export interface Profile {
  id: string;
  full_name: string | null;
  job_title: string | null;
  company: string | null;
  bio: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  avatar_url: string | null;
  company_logo_url: string | null;
  role: UserRole;
  plan: Plan;
  networking_goal: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface DigitalCard {
  id: string;
  user_id: string;
  slug: string;
  name: string;
  job_title: string | null;
  company: string | null;
  bio: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  avatar_url: string | null;
  company_logo_url: string | null;
  social_links: SocialLink[];
  services: string[];
  portfolio_links: string[];
  booking_link: string | null;
  template_id: string | null;
  theme: CardTheme;
  orientation: CardOrientation;
  is_published: boolean;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface CardTheme {
  primaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  fontHeading?: string;
  fontBody?: string;
}

export interface CardTemplate {
  id: string;
  name: string;
  description: string | null;
  category: string;
  orientation: CardOrientation;
  preview_config: Record<string, unknown>;
  is_premium: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface Contact {
  id: string;
  user_id: string;
  name: string;
  company: string | null;
  position: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  avatar_url: string | null;
  social_links: SocialLink[];
  where_met: string | null;
  event_name: string | null;
  date_met: string | null;
  tags: string[];
  category: string | null;
  created_at: string;
  updated_at: string;
}

export interface Relationship {
  id: string;
  user_id: string;
  contact_id: string;
  contact?: Contact;
  status: RelationshipStatus;
  interest: string | null;
  notes: string | null;
  conversation_context: string | null;
  shared_purpose: string | null;
  last_interaction: string | null;
  next_action: string | null;
  follow_up_date: string | null;
  opportunity_value: number;
  relationship_health: RelationshipHealth;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface RelationshipInteraction {
  id: string;
  relationship_id: string;
  user_id: string;
  type: InteractionType;
  summary: string;
  details: string | null;
  interaction_date: string;
  created_at: string;
}

export interface FollowUp {
  id: string;
  user_id: string;
  relationship_id: string | null;
  relationship?: Relationship;
  contact_id: string | null;
  contact?: Contact;
  title: string;
  description: string | null;
  due_date: string | null;
  status: FollowUpStatus;
  priority: FollowUpPriority;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Opportunity {
  id: string;
  user_id: string;
  relationship_id: string | null;
  relationship?: Relationship;
  contact_id: string | null;
  contact?: Contact;
  title: string;
  description: string | null;
  value: number;
  stage: OpportunityStage;
  expected_close_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category_id: string | null;
  category?: BlogCategory;
  tags: string[];
  featured_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: BlogPostStatus;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Badge {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  criteria: Record<string, unknown>;
  tier: 'bronze' | 'silver' | 'gold';
  is_active: boolean;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  badge?: Badge;
  awarded_at: string;
}

export interface PlanConfig {
  id: Plan;
  name: string;
  price: number;
  period: string;
  tagline: string;
  features: string[];
  cardLimit: number;
  hasCRM: boolean;
  hasAnalytics: boolean;
  hasLandingPWA: boolean;
  hasWallet: boolean;
  hasImageExport: boolean;
  isPopular?: boolean;
}
