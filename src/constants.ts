import type { PlanConfig, RelationshipStatus, FollowUpStatus, OpportunityStage, RelationshipHealth } from '@/types';

export const PLANS: PlanConfig[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    tagline: 'Start your professional identity journey',
    features: [
      '1 Digital business card',
      'QR code sharing',
      'Shareable URL',
      'Up to 50 contacts',
      'Basic relationship tracking',
      'Follow-up reminders',
      'Save contact exchange',
    ],
    cardLimit: 1,
    hasCRM: false,
    hasAnalytics: false,
    hasLandingPWA: false,
    hasWallet: false,
    hasImageExport: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 12,
    period: 'month',
    tagline: 'For active networkers who never lose a connection',
    features: [
      '5 Digital business cards',
      'Unlimited contacts',
      'Full relationship CRM',
      'Pipeline & opportunities',
      'Analytics dashboard',
      'Follow-up automation',
      'Image export',
      'Apple & Google Wallet',
      'Priority support',
    ],
    cardLimit: 5,
    hasCRM: true,
    hasAnalytics: true,
    hasLandingPWA: false,
    hasWallet: true,
    hasImageExport: true,
    isPopular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 29,
    period: 'month',
    tagline: 'For teams and agencies managing relationships at scale',
    features: [
      'Unlimited digital cards',
      'Everything in Pro',
      'Personal landing PWA',
      'Advanced analytics & insights',
      'Custom templates',
      'Team collaboration',
      'API access',
      'Dedicated support',
    ],
    cardLimit: Infinity,
    hasCRM: true,
    hasAnalytics: true,
    hasLandingPWA: true,
    hasWallet: true,
    hasImageExport: true,
  },
];

export const RELATIONSHIP_STATUSES: { value: RelationshipStatus; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
  { value: 'connected', label: 'Connected', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  { value: 'follow_up', label: 'Follow Up', color: 'bg-gold-500/20 text-gold-300 border-gold-500/30' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-electric-500/20 text-electric-300 border-electric-500/30' },
  { value: 'active', label: 'Active', color: 'bg-success-500/20 text-success-300 border-success-500/30' },
  { value: 'partner', label: 'Partner', color: 'bg-electric-500/20 text-electric-300 border-electric-500/30' },
  { value: 'customer', label: 'Customer', color: 'bg-success-500/20 text-success-300 border-success-500/30' },
  { value: 'prospect', label: 'Prospect', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
  { value: 'opportunity', label: 'Opportunity', color: 'bg-gold-500/20 text-gold-300 border-gold-500/30' },
  { value: 'dormant', label: 'Dormant', color: 'bg-white/10 text-white/40 border-white/20' },
];

export const FOLLOW_UP_STATUSES: { value: FollowUpStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pending', color: 'bg-gold-500/20 text-gold-300 border-gold-500/30' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-electric-500/20 text-electric-300 border-electric-500/30' },
  { value: 'completed', label: 'Completed', color: 'bg-success-500/20 text-success-300 border-success-500/30' },
  { value: 'overdue', label: 'Overdue', color: 'bg-error-500/20 text-error-300 border-error-500/30' },
];

export const OPPORTUNITY_STAGES: { value: OpportunityStage; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
  { value: 'connected', label: 'Connected', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  { value: 'qualified', label: 'Qualified', color: 'bg-electric-500/20 text-electric-300 border-electric-500/30' },
  { value: 'follow_up', label: 'Follow Up', color: 'bg-gold-500/20 text-gold-300 border-gold-500/30' },
  { value: 'opportunity', label: 'Opportunity', color: 'bg-gold-500/20 text-gold-300 border-gold-500/30' },
  { value: 'active', label: 'Active', color: 'bg-success-500/20 text-success-300 border-success-500/30' },
  { value: 'won', label: 'Won', color: 'bg-success-500/30 text-success-200 border-success-500/40' },
  { value: 'lost', label: 'Lost', color: 'bg-white/10 text-white/40 border-white/20' },
];

export const HEALTH_STATUSES: { value: RelationshipHealth; label: string; color: string }[] = [
  { value: 'healthy', label: 'Healthy', color: 'bg-success-500/20 text-success-300 border-success-500/30' },
  { value: 'good', label: 'Good', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
  { value: 'attention', label: 'Needs Attention', color: 'bg-gold-500/20 text-gold-300 border-gold-500/30' },
  { value: 'at_risk', label: 'At Risk', color: 'bg-error-500/20 text-error-300 border-error-500/30' },
  { value: 'dormant', label: 'Dormant', color: 'bg-white/10 text-white/40 border-white/20' },
];

export const PIPELINE_STAGES: OpportunityStage[] = [
  'new', 'connected', 'qualified', 'follow_up', 'opportunity', 'active', 'won'
];

export const NETWORKING_GOALS = [
  'Find new clients',
  'Build partnerships',
  'Find investors',
  'Hire talent',
  'Find a job',
  'Grow my network',
  'Industry connections',
  'Business development',
];

export const CATEGORIES = [
  'Client', 'Partner', 'Investor', 'Vendor', 'Colleague',
  'Mentor', 'Prospect', 'Recruit', 'Industry', 'Personal',
];

export function getPlanConfig(plan: string): PlanConfig {
  return PLANS.find(p => p.id === plan) || PLANS[0];
}

export function getRelationshipStatusInfo(status: RelationshipStatus) {
  return RELATIONSHIP_STATUSES.find(s => s.value === status) || RELATIONSHIP_STATUSES[0];
}

export function getFollowUpStatusInfo(status: FollowUpStatus) {
  return FOLLOW_UP_STATUSES.find(s => s.value === status) || FOLLOW_UP_STATUSES[0];
}

export function getOpportunityStageInfo(stage: OpportunityStage) {
  return OPPORTUNITY_STAGES.find(s => s.value === stage) || OPPORTUNITY_STAGES[0];
}

export function getHealthInfo(health: RelationshipHealth) {
  return HEALTH_STATUSES.find(s => s.value === health) || HEALTH_STATUSES[1];
}
