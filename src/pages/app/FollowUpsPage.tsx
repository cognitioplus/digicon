import { useEffect, useState, useMemo } from 'react';
import { Plus, CheckSquare, Clock, AlertCircle, Check, Calendar, Trash2 } from 'lucide-react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { FOLLOW_UP_STATUSES, getFollowUpStatusInfo } from '@/config/constants';
import type { FollowUp, Contact } from '@/types';

export function FollowUpsPage() {
  const { profile } = useAuth();
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newPriority, setNewPriority] = useState('medium');

  async function loadFollowUps() {
    if (!profile) return;
    const { data } = await supabase.from('follow_ups').select('*, contact:contacts(*), relationship:relationships(*)').order('due_date', { ascending: true });
    setFollowUps((data as FollowUp[]) || []);
    setLoading(false);
  }

  useEffect(() => { loadFollowUps(); }, [profile]);

  const today = new Date().toISOString().slice(0, 10);
  const filtered = useMemo(() => {
    return followUps.filter(f => {
      if (!filter) return true;
      if (filter === 'overdue') return f.due_date && f.due_date < today && f.status !== 'completed';
      if (filter === 'today') return f.due_date === today;
      if (filter === 'upcoming') return f.due_date && f.due_date > today;
      return f.status === filter;
    });
  }, [followUps, filter, today]);

  const completeFollowUp = async (id: string) => {
    await supabase.from('follow_ups').update({ status: 'completed', completed_at: new Date().toISOString() }).eq('id', id);
    loadFollowUps();
  };

  const deleteFollowUp = async (id: string) => {
    await supabase.from('follow_ups').delete().eq('id', id);
    loadFollowUps();
  };

  const addFollowUp = async () => {
    if (!profile || !newTitle.trim()) return;
    await supabase.from('follow_ups').insert({ user_id: profile.id, title: newTitle, due_date: newDate || null, priority: newPriority });
    setNewTitle(''); setNewDate(''); setNewPriority('medium');
    setShowAdd(false);
    loadFollowUps();
  };

  const counts = {
    overdue: followUps.filter(f => f.due_date && f.due_date < today && f.status !== 'completed').length,
    today: followUps.filter(f => f.due_date === today).length,
    pending: followUps.filter(f => f.status === 'pending').length,
    completed: followUps.filter(f => f.status === 'completed').length,
  };

  return (
    <AppLayout activePath="/follow-ups">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-heading font-bold text-2xl text-white">Follow-ups</h1><p className="text-white/40 font-body text-sm mt-1">What should I do next?</p></div>
        <Button onClick={() => setShowAdd(true)}><Plus className="w-4 h-4" /> Add Task</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Overdue', count: counts.overdue, icon: AlertCircle, color: 'text-error-400' },
          { label: 'Due Today', count: counts.today, icon: Clock, color: 'text-gold-400' },
          { label: 'Pending', count: counts.pending, icon: CheckSquare, color: 'text-cyan-400' },
          { label: 'Completed', count: counts.completed, icon: Check, color: 'text-success-400' },
        ].map(s => (
          <button key={s.label} onClick={() => setFilter(s.label.toLowerCase().replace(' ', '_') === 'due_today' ? 'today' : s.label.toLowerCase())} className={`glass-card rounded-xl p-4 text-left ${filter === s.label.toLowerCase() ? 'border-cyan-400/40' : ''}`}>
            <div className="flex items-center gap-2 mb-1"><s.icon className={`w-4 h-4 ${s.color}`} /><span className="text-xs text-white/40 font-ui uppercase tracking-wide">{s.label}</span></div>
            <p className="font-heading font-bold text-2xl text-white">{s.count}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
        {['', 'overdue', 'today', 'upcoming', 'pending', 'in_progress', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-ui font-medium whitespace-nowrap transition-all ${filter === f ? 'bg-electric-500/20 text-cyan-300 border border-electric-500/30' : 'glass text-white/50 hover:text-white'}`}>
            {f === '' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>

      {loading ? <LoadingState /> : filtered.length === 0 ? (
        <EmptyState title="You're all caught up!" description="No follow-ups in this view." icon={<CheckSquare className="w-7 h-7" />} />
      ) : (
        <div className="space-y-2">
          {filtered.map(f => {
            const statusInfo = getFollowUpStatusInfo(f.status);
            const isOverdue = f.due_date && f.due_date < today && f.status !== 'completed';
            return (
              <div key={f.id} className={`glass-card rounded-xl p-4 flex items-center gap-3 ${isOverdue ? 'border-error-500/30' : ''}`}>
                <button onClick={() => f.status !== 'completed' && completeFollowUp(f.id)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${f.status === 'completed' ? 'bg-success-500/30 border-success-500/50' : 'border-white/20 hover:border-cyan-400'}`}>
                  {f.status === 'completed' && <Check className="w-4 h-4 text-success-400" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-ui font-medium ${f.status === 'completed' ? 'text-white/30 line-through' : 'text-white'}`}>{f.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {f.contact?.name && <span className="text-xs text-white/40">{f.contact.name}</span>}
                    {f.due_date && <span className={`text-xs font-ui ${isOverdue ? 'text-error-400' : 'text-white/40'}`}><Calendar className="w-3 h-3 inline mr-0.5" />{f.due_date}</span>}
                  </div>
                </div>
                <Badge color={statusInfo.color}>{statusInfo.label}</Badge>
                <button onClick={() => deleteFollowUp(f.id)} className="text-white/30 hover:text-error-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Follow-up" size="sm">
        <div className="space-y-4">
          <Input label="Task" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Send proposal" />
          <Input label="Due Date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
          <Select label="Priority" value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </Select>
          <Button className="w-full" onClick={addFollowUp} disabled={!newTitle.trim()}>Add Follow-up</Button>
        </div>
      </Modal>
    </AppLayout>
  );
}
