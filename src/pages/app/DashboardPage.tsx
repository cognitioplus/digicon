import { useEffect, useState } from 'react';
import { CreditCard, Users, CheckSquare, TrendingUp, ArrowRight, Plus, Share2, UserPlus, BarChart3, Clock, Target, AlertCircle } from 'lucide-react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';
import { supabase } from '@/lib/supabase';
import { getRelationshipStatusInfo, getFollowUpStatusInfo } from '@/config/constants';
import type { Contact, Relationship, FollowUp, DigitalCard } from '@/types';

interface DashboardData {
  contacts: Contact[];
  relationships: Relationship[];
  followUps: FollowUp[];
  primaryCard: DigitalCard | null;
}

export function DashboardPage() {
  const { profile } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    (async () => {
      const [contactsRes, relsRes, followUpsRes, cardRes] = await Promise.all([
        supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('relationships').select('*, contact:contacts(*)').order('updated_at', { ascending: false }).limit(5),
        supabase.from('follow_ups').select('*, contact:contacts(*), relationship:relationships(*)').eq('status', 'pending').order('due_date', { ascending: true }).limit(5),
        supabase.from('digital_cards').select('*').eq('is_primary', true).maybeSingle(),
      ]);

      setData({
        contacts: contactsRes.data as Contact[] || [],
        relationships: relsRes.data as Relationship[] || [],
        followUps: followUpsRes.data as FollowUp[] || [],
        primaryCard: cardRes.data as DigitalCard | null,
      });
      setLoading(false);
    })();
  }, [profile]);

  if (loading) return <AppLayout activePath="/dashboard"><LoadingState /></AppLayout>;

  const today = new Date().toISOString().slice(0, 10);
  const overdueFollowUps = data?.followUps.filter(f => f.due_date && f.due_date < today) || [];
  const dueToday = data?.followUps.filter(f => f.due_date === today) || [];
  const activeRels = data?.relationships.filter(r => !r.is_archived) || [];
  const opportunities = data?.relationships.filter(r => r.status === 'opportunity' || r.opportunity_value > 0) || [];

  const QUICK_ACTIONS = [
    { icon: CreditCard, label: 'Create Card', path: '/cards/new' },
    { icon: Share2, label: 'Share Card', path: '/cards' },
    { icon: UserPlus, label: 'Add Contact', path: '/contacts/new' },
    { icon: CheckSquare, label: 'Add Follow-up', path: '/follow-ups' },
    { icon: Users, label: 'View Network', path: '/contacts' },
    { icon: BarChart3, label: 'View Analytics', path: '/analytics' },
  ];

  return (
    <AppLayout activePath="/dashboard">
      {/* Welcome */}
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-white">
          Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}
        </h1>
        <p className="text-white/40 font-body text-sm mt-1">Here's what needs your attention today.</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => navigateTo(action.path)}
            className="glass-card rounded-xl p-3 flex flex-col items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-lg bg-electric-500/10 border border-electric-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <action.icon className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-xs text-white/60 font-ui text-center">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Connections" value={data?.contacts.length || 0} icon={<Users className="w-4 h-4" />} accentColor="text-cyan-400" />
        <MetricCard label="Active Relations" value={activeRels.length} icon={<Target className="w-4 h-4" />} accentColor="text-sky-400" />
        <MetricCard label="Follow-ups Due" value={dueToday.length + overdueFollowUps.length} icon={<Clock className="w-4 h-4" />} accentColor="text-gold-400" />
        <MetricCard label="Opportunities" value={opportunities.length} icon={<TrendingUp className="w-4 h-4" />} accentColor="text-gold-400" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Follow-ups due */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-white">Follow-ups Due</h2>
            <button onClick={() => navigateTo('/follow-ups')} className="text-xs text-cyan-400 hover:text-cyan-300 font-ui font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          {(dueToday.length + overdueFollowUps.length) === 0 ? (
            <EmptyState title="You're all caught up!" description="No follow-ups due right now." icon={<CheckSquare className="w-7 h-7" />} />
          ) : (
            <div className="space-y-2">
              {overdueFollowUps.map((f) => (
                <FollowUpItem key={f.id} followUp={f} overdue />
              ))}
              {dueToday.map((f) => (
                <FollowUpItem key={f.id} followUp={f} />
              ))}
            </div>
          )}
        </div>

        {/* Recent relationships */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-white">Recent Relationships</h2>
            <button onClick={() => navigateTo('/contacts')} className="text-xs text-cyan-400 hover:text-cyan-300 font-ui font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          {activeRels.length === 0 ? (
            <EmptyState
              title="You haven't added anyone yet."
              description="Start building your network by adding your first connection."
              action={<Button size="sm" onClick={() => navigateTo('/contacts/new')}><Plus className="w-3.5 h-3.5" /> Add Your First Connection</Button>}
              icon={<Users className="w-7 h-7" />}
            />
          ) : (
            <div className="space-y-2">
              {activeRels.slice(0, 5).map((rel) => {
                const statusInfo = getRelationshipStatusInfo(rel.status);
                return (
                  <button
                    key={rel.id}
                    onClick={() => navigateTo(`/contacts/${rel.contact_id}`)}
                    className="w-full glass-card rounded-xl p-3 flex items-center gap-3 text-left"
                  >
                    <Avatar src={rel.contact?.avatar_url} name={rel.contact?.name || 'Unknown'} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-ui font-medium text-white truncate">{rel.contact?.name}</p>
                      <p className="text-xs text-white/40 truncate">{rel.contact?.company} · {rel.interest || rel.contact?.position}</p>
                    </div>
                    <Badge color={statusInfo.color}>{statusInfo.label}</Badge>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Card preview */}
      {data?.primaryCard && (
        <div className="mt-6 glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-white">Your DigiCon Card</h2>
            <button onClick={() => navigateTo('/cards')} className="text-xs text-cyan-400 hover:text-cyan-300 font-ui font-medium flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="glass-strong rounded-2xl p-5 w-full sm:w-auto sm:min-w-[280px]">
              <div className="flex items-center gap-3">
                <Avatar src={data.primaryCard.avatar_url} name={data.primaryCard.name} size="lg" />
                <div>
                  <p className="font-heading font-semibold text-white">{data.primaryCard.name}</p>
                  <p className="text-xs text-cyan-400 font-ui">{data.primaryCard.job_title}</p>
                  <p className="text-xs text-white/40">{data.primaryCard.company}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-2">
                {data.primaryCard.is_published ? (
                  <Badge color="bg-success-500/20 text-success-300 border-success-500/30">Published</Badge>
                ) : (
                  <Badge color="bg-gold-500/20 text-gold-300 border-gold-500/30">Draft</Badge>
                )}
              </div>
              <p className="text-sm text-white/50 font-body mb-3">
                {data.primaryCard.is_published ? 'Your card is live and shareable.' : 'Publish your card to start sharing.'}
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => navigateTo(`/cards/${data.primaryCard!.id}`)}>Edit Card</Button>
                {data.primaryCard.is_published && (
                  <Button size="sm" variant="secondary" onClick={() => navigateTo(`/c/${data.primaryCard!.slug}`)}>View Public Card</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

function FollowUpItem({ followUp, overdue }: { followUp: FollowUp; overdue?: boolean }) {
  const statusInfo = getFollowUpStatusInfo(followUp.status);
  return (
    <button
      onClick={() => navigateTo('/follow-ups')}
      className={`w-full glass-card rounded-xl p-3 flex items-center gap-3 text-left ${overdue ? 'border-error-500/30' : ''}`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${overdue ? 'bg-error-500/15' : 'bg-gold-500/15'}`}>
        {overdue ? <AlertCircle className="w-4 h-4 text-error-400" /> : <Clock className="w-4 h-4 text-gold-400" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-ui font-medium text-white truncate">{followUp.title}</p>
        <p className="text-xs text-white/40 truncate">
          {followUp.contact?.name || 'No contact'} · {followUp.due_date || 'No date'}
        </p>
      </div>
      {overdue && <Badge color="bg-error-500/20 text-error-300 border-error-500/30">Overdue</Badge>}
    </button>
  );
}
