import { useEffect, useState } from 'react';
import { LayoutGrid, Plus, TrendingUp, Crown } from 'lucide-react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { UpgradeGate } from '@/components/ui/UpgradeGate';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';
import { supabase } from '@/lib/supabase';
import { PIPELINE_STAGES, OPPORTUNITY_STAGES, getOpportunityStageInfo } from '@/config/constants';
import type { Opportunity, Contact } from '@/types';

export function CRMPage() {
  const { profile } = useAuth();
  const [opportunities, setOpportunities] = useState<(Opportunity & { contact?: Contact })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newStage, setNewStage] = useState('new');

  async function loadOpp() {
    if (!profile) return;
    const { data } = await supabase.from('opportunities').select('*, contact:contacts(*)').order('updated_at', { ascending: false });
    setOpportunities((data as (Opportunity & { contact?: Contact })[]) || []);
    const { data: contactData } = await supabase.from('contacts').select('*');
    setContacts(contactData as Contact[] || []);
    setLoading(false);
  }

  useEffect(() => { loadOpp(); }, [profile]);

  const moveStage = async (id: string, direction: number) => {
    const opp = opportunities.find(o => o.id === id);
    if (!opp) return;
    const currentIdx = PIPELINE_STAGES.indexOf(opp.stage as typeof PIPELINE_STAGES[number]);
    const newIdx = Math.max(0, Math.min(PIPELINE_STAGES.length - 1, currentIdx + direction));
    const newStage = PIPELINE_STAGES[newIdx];
    await supabase.from('opportunities').update({ stage: newStage }).eq('id', id);
    loadOpp();
  };

  const addOpp = async () => {
    if (!profile || !newTitle.trim()) return;
    await supabase.from('opportunities').insert({
      user_id: profile.id, title: newTitle, value: parseFloat(newValue) || 0, contact_id: newContact || null, stage: newStage,
    });
    setNewTitle(''); setNewValue(''); setNewContact(''); setNewStage('new');
    setShowAdd(false);
    loadOpp();
  };

  const totalValue = opportunities.reduce((sum, o) => sum + (o.value || 0), 0);
  const wonValue = opportunities.filter(o => o.stage === 'won').reduce((sum, o) => sum + (o.value || 0), 0);

  return (
    <AppLayout activePath="/crm">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-heading font-bold text-2xl text-white">CRM Pipeline</h1><p className="text-white/40 font-body text-sm mt-1">{opportunities.length} opportunities · ${totalValue.toLocaleString()} total</p></div>
        <Button onClick={() => setShowAdd(true)}><Plus className="w-4 h-4" /> Add Opportunity</Button>
      </div>

      {profile && profile.plan === 'free' ? (
        <UpgradeGate plan={profile.plan} feature="crm" onUpgrade={() => navigateTo('/pricing')}>
          <div />
        </UpgradeGate>
      ) : loading ? <LoadingState /> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="glass-card rounded-xl p-4"><p className="text-xs text-white/40 font-ui uppercase">Total Pipeline</p><p className="font-heading font-bold text-2xl text-white mt-1">${totalValue.toLocaleString()}</p></div>
            <div className="glass-card rounded-xl p-4"><p className="text-xs text-white/40 font-ui uppercase">Won</p><p className="font-heading font-bold text-2xl text-success-400 mt-1">${wonValue.toLocaleString()}</p></div>
            <div className="glass-card rounded-xl p-4"><p className="text-xs text-white/40 font-ui uppercase">Active</p><p className="font-heading font-bold text-2xl text-cyan-400 mt-1">{opportunities.filter(o => o.stage !== 'won' && o.stage !== 'lost').length}</p></div>
            <div className="glass-card rounded-xl p-4"><p className="text-xs text-white/40 font-ui uppercase">Win Rate</p><p className="font-heading font-bold text-2xl text-gold-400 mt-1">{opportunities.length > 0 ? Math.round((opportunities.filter(o => o.stage === 'won').length / opportunities.length) * 100) : 0}%</p></div>
          </div>

          {opportunities.length === 0 ? (
            <EmptyState title="No opportunities yet" description="Add your first opportunity to start tracking your pipeline." action={<Button onClick={() => setShowAdd(true)}><Plus className="w-4 h-4" /> Add Opportunity</Button>} icon={<LayoutGrid className="w-7 h-7" />} />
          ) : (
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
              <div className="flex gap-3 min-w-max pb-4">
                {PIPELINE_STAGES.map(stage => {
                  const stageOpps = opportunities.filter(o => o.stage === stage);
                  const stageInfo = getOpportunityStageInfo(stage);
                  return (
                    <div key={stage} className="w-72 flex-shrink-0">
                      <div className="glass-panel p-3 mb-2 flex items-center justify-between">
                        <Badge color={stageInfo.color}>{stageInfo.label}</Badge>
                        <span className="text-xs text-white/40 font-ui">{stageOpps.length}</span>
                      </div>
                      <div className="space-y-2">
                        {stageOpps.map(o => (
                          <div key={o.id} className="glass-card rounded-xl p-3">
                            <p className="text-sm font-ui font-medium text-white mb-1">{o.title}</p>
                            {o.contact?.name && <p className="text-xs text-white/40 mb-2">{o.contact.name}</p>}
                            {o.value > 0 && <p className="text-sm font-heading font-bold text-gold-400 mb-2">${o.value.toLocaleString()}</p>}
                            <div className="flex gap-1">
                              <button onClick={() => moveStage(o.id, -1)} className="flex-1 py-1 rounded-lg text-xs glass text-white/50 hover:text-white hover:bg-white/10">←</button>
                              <button onClick={() => moveStage(o.id, 1)} className="flex-1 py-1 rounded-lg text-xs glass text-white/50 hover:text-white hover:bg-white/10">→</button>
                            </div>
                          </div>
                        ))}
                        {stageOpps.length === 0 && <p className="text-xs text-white/20 text-center py-4 font-body">Empty</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Opportunity" size="sm">
        <div className="space-y-4">
          <Input label="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Partnership with NovaTech" />
          <Input label="Value ($)" type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="5000" />
          <Select label="Contact" value={newContact} onChange={(e) => setNewContact(e.target.value)}>
            <option value="">No contact</option>
            {contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
          <Select label="Stage" value={newStage} onChange={(e) => setNewStage(e.target.value)}>
            {OPPORTUNITY_STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
          <Button className="w-full" onClick={addOpp} disabled={!newTitle.trim()}>Add Opportunity</Button>
        </div>
      </Modal>
    </AppLayout>
  );
}
