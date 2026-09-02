import { useEffect, useState } from 'react';
import { Users, TrendingUp, CheckSquare, Target, Award, Crown, Activity, Clock } from 'lucide-react';
import { AppLayout } from '@/layouts/AppLayout';
import { MetricCard } from '@/components/ui/MetricCard';
import { Badge } from '@/components/ui/Badge';
import { GoldBadge } from '@/components/ui/Badge';
import { UpgradeGate } from '@/components/ui/UpgradeGate';
import { LoadingState } from '@/components/ui/States';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';
import { supabase } from '@/lib/supabase';
import type { Contact, Relationship, FollowUp, Opportunity } from '@/types';

export function AnalyticsPage() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContacts: 0, activeRelationships: 0, followUpsDue: 0, completedFollowUps: 0,
    overdueFollowUps: 0, opportunities: 0, wonValue: 0, dormantRels: 0,
  });
  const [badgeData, setBadgeData] = useState<{ name: string; description: string; earned: boolean; icon: string }[]>([]);

  useEffect(() => {
    if (!profile) return;
    (async () => {
      const [contactsRes, relsRes, followUpsRes, oppRes] = await Promise.all([
        supabase.from('contacts').select('*'),
        supabase.from('relationships').select('*'),
        supabase.from('follow_ups').select('*'),
        supabase.from('opportunities').select('*'),
      ]);

      const contacts = (contactsRes.data as Contact[]) || [];
      const rels = (relsRes.data as Relationship[]) || [];
      const followUps = (followUpsRes.data as FollowUp[]) || [];
      const opps = (oppRes.data as Opportunity[]) || [];
      const today = new Date().toISOString().slice(0, 10);

      setStats({
        totalContacts: contacts.length,
        activeRelationships: rels.filter(r => !r.is_archived && r.status !== 'dormant').length,
        followUpsDue: followUps.filter(f => f.status === 'pending' || f.status === 'in_progress').length,
        completedFollowUps: followUps.filter(f => f.status === 'completed').length,
        overdueFollowUps: followUps.filter(f => f.due_date && f.due_date < today && f.status !== 'completed').length,
        opportunities: opps.length,
        wonValue: opps.filter(o => o.stage === 'won').reduce((s, o) => s + (o.value || 0), 0),
        dormantRels: rels.filter(r => r.status === 'dormant').length,
      });

      setBadgeData([
        { name: 'Growing Network', description: 'Reached 25 connections', earned: contacts.length >= 25, icon: 'Users' },
        { name: 'Follow-up Champion', description: 'Completed 10 follow-ups', earned: followUps.filter(f => f.status === 'completed').length >= 10, icon: 'CheckCircle' },
        { name: 'Highly Connected', description: 'Reached 100 connections', earned: contacts.length >= 100, icon: 'Network' },
        { name: 'Relationship Builder', description: '20+ active relationships', earned: rels.filter(r => !r.is_archived).length >= 20, icon: 'Heart' },
        { name: 'Opportunity Creator', description: 'Created 5 opportunities', earned: opps.length >= 5, icon: 'TrendingUp' },
        { name: 'Consistent Networker', description: 'Networked 7 days in a row', earned: false, icon: 'Flame' },
      ]);
      setLoading(false);
    })();
  }, [profile]);

  if (loading) return <AppLayout activePath="/analytics"><LoadingState /></AppLayout>;

  if (profile && profile.plan === 'free') {
    return <AppLayout activePath="/analytics"><UpgradeGate plan={profile.plan} feature="analytics" onUpgrade={() => navigateTo('/pricing')}><div /></UpgradeGate></AppLayout>;
  }

  const conversionRate = stats.totalContacts > 0 ? Math.round((stats.activeRelationships / stats.totalContacts) * 100) : 0;
  const completionRate = stats.completedFollowUps + stats.followUpsDue > 0 ? Math.round((stats.completedFollowUps / (stats.completedFollowUps + stats.followUpsDue)) * 100) : 0;

  return (
    <AppLayout activePath="/analytics">
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-white">Analytics</h1>
        <p className="text-white/40 font-body text-sm mt-1">Your networking intelligence dashboard</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Total Connections" value={stats.totalContacts} icon={<Users className="w-4 h-4" />} />
        <MetricCard label="Active Relationships" value={stats.activeRelationships} icon={<Target className="w-4 h-4" />} accentColor="text-sky-400" />
        <MetricCard label="Follow-ups Due" value={stats.followUpsDue} icon={<Clock className="w-4 h-4" />} accentColor="text-gold-400" />
        <MetricCard label="Overdue" value={stats.overdueFollowUps} icon={<CheckSquare className="w-4 h-4" />} accentColor="text-error-400" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard label="Completed Follow-ups" value={stats.completedFollowUps} icon={<CheckSquare className="w-4 h-4" />} accentColor="text-success-400" />
        <MetricCard label="Opportunities" value={stats.opportunities} icon={<TrendingUp className="w-4 h-4" />} accentColor="text-gold-400" />
        <MetricCard label="Won Value" value={`$${stats.wonValue.toLocaleString()}`} icon={<TrendingUp className="w-4 h-4" />} accentColor="text-success-400" />
        <MetricCard label="Dormant" value={stats.dormantRels} icon={<Activity className="w-4 h-4" />} accentColor="text-white/40" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-panel p-5">
          <h2 className="font-heading font-semibold text-white mb-4">Conversion Rates</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1"><span className="text-sm text-white/50 font-ui">Connection to Relationship</span><span className="text-sm font-ui font-bold text-cyan-400">{conversionRate}%</span></div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full transition-all" style={{ width: `${conversionRate}%` }} /></div>
            </div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-sm text-white/50 font-ui">Follow-up Completion</span><span className="text-sm font-ui font-bold text-gold-400">{completionRate}%</span></div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full transition-all" style={{ width: `${completionRate}%` }} /></div>
            </div>
          </div>
        </div>
        <div className="glass-panel p-5">
          <h2 className="font-heading font-semibold text-white mb-2">Insights</h2>
          <div className="space-y-2">
            {stats.overdueFollowUps > 0 && <div className="glass-card rounded-xl p-3 flex items-center gap-2"><Clock className="w-4 h-4 text-error-400" /><p className="text-sm text-white/60 font-body">You have {stats.overdueFollowUps} overdue follow-up{stats.overdueFollowUps > 1 ? 's' : ''}. Reach out today.</p></div>}
            {stats.dormantRels > 0 && <div className="glass-card rounded-xl p-3 flex items-center gap-2"><Activity className="w-4 h-4 text-white/40" /><p className="text-sm text-white/60 font-body">{stats.dormantRels} dormant relationship{stats.dormantRels > 1 ? 's' : ''}. Consider re-engaging.</p></div>}
            {stats.opportunities > 0 && <div className="glass-card rounded-xl p-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-gold-400" /><p className="text-sm text-white/60 font-body">{stats.opportunities} active opportunit{stats.opportunities > 1 ? 'ies' : 'y'} in your pipeline.</p></div>}
            {stats.followUpsDue === 0 && stats.overdueFollowUps === 0 && <div className="glass-card rounded-xl p-3 flex items-center gap-2"><CheckSquare className="w-4 h-4 text-success-400" /><p className="text-sm text-white/60 font-body">You're all caught up on follow-ups.</p></div>}
          </div>
        </div>
      </div>

      <div className="glass-panel p-5">
        <div className="flex items-center gap-2 mb-4"><Award className="w-5 h-5 text-gold-400" /><h2 className="font-heading font-semibold text-white">Badges</h2></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {badgeData.map(b => (
            <div key={b.name} className={`glass-card rounded-xl p-4 text-center ${b.earned ? 'border-gold-500/30' : 'opacity-50'}`}>
              <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${b.earned ? 'bg-gold-500/15' : 'bg-white/5'}`}>
                {b.earned ? <Award className="w-6 h-6 text-gold-400" /> : <Crown className="w-6 h-6 text-white/20" />}
              </div>
              <p className="text-sm font-ui font-semibold text-white">{b.name}</p>
              <p className="text-xs text-white/40 mt-0.5">{b.description}</p>
              {b.earned && <div className="mt-2"><GoldBadge>Earned</GoldBadge></div>}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
