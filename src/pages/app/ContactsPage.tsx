import { useEffect, useState, useMemo } from 'react';
import { Plus, Search, Users, ArrowLeft, Mail, Phone, Building2, Tag, Calendar, MessageSquare, CheckSquare, TrendingUp, Heart, Trash2, Edit3 } from 'lucide-react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Drawer } from '@/components/ui/Drawer';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';
import { supabase } from '@/lib/supabase';
import { RELATIONSHIP_STATUSES, CATEGORIES, getRelationshipStatusInfo, getHealthInfo } from '@/config/constants';
import type { Contact, Relationship, RelationshipInteraction, FollowUp } from '@/types';

export function ContactsPage({ contactId }: { contactId?: string }) {
  const { profile } = useAuth();
  const [contacts, setContacts] = useState<(Contact & { relationship?: Relationship })[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAdd, setShowAdd] = useState(!contactId && window.location.hash.includes('new'));

  async function loadContacts() {
    if (!profile) return;
    const { data: contactData } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    const { data: relData } = await supabase.from('relationships').select('*, contact:contacts(*)').eq('is_archived', false);
    const rels = relData as Relationship[] || [];
    const contactList = (contactData as Contact[] || []).map(c => ({
      ...c,
      relationship: rels.find(r => r.contact_id === c.id),
    }));
    setContacts(contactList);
    setLoading(false);
  }

  useEffect(() => { loadContacts(); }, [profile]);

  const filtered = useMemo(() => {
    return contacts.filter(c => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.company?.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter && c.relationship?.status !== statusFilter) return false;
      return true;
    });
  }, [contacts, search, statusFilter]);

  if (contactId) return <ContactDetail contactId={contactId} />;

  return (
    <AppLayout activePath="/contacts">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="font-heading font-bold text-2xl text-white">Network</h1><p className="text-white/40 font-body text-sm mt-1">{contacts.length} connections</p></div>
        <Button onClick={() => setShowAdd(true)}><Plus className="w-4 h-4" /> Add Contact</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" /><input className="input-field pl-10" placeholder="Search by name or company..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <select className="input-field sm:w-48 cursor-pointer" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          {RELATIONSHIP_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {loading ? <LoadingState /> : filtered.length === 0 ? (
        <EmptyState title="You haven't added anyone yet." description="Start building your network by adding your first connection." action={<Button onClick={() => setShowAdd(true)}><Plus className="w-4 h-4" /> Add Your First Connection</Button>} icon={<Users className="w-7 h-7" />} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(c => {
            const statusInfo = c.relationship ? getRelationshipStatusInfo(c.relationship.status) : null;
            return (
              <button key={c.id} onClick={() => navigateTo(`/contacts/${c.id}`)} className="glass-card rounded-2xl p-4 text-left group">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar src={c.avatar_url} name={c.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="font-ui font-medium text-white truncate">{c.name}</p>
                    <p className="text-xs text-white/40 truncate">{c.position}{c.company ? ` at ${c.company}` : ''}</p>
                  </div>
                </div>
                {c.tags.length > 0 && <div className="flex flex-wrap gap-1 mb-2">{c.tags.slice(0, 3).map(t => <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-ui text-white/40">{t}</span>)}</div>}
                {statusInfo && <Badge color={statusInfo.color}>{statusInfo.label}</Badge>}
              </button>
            );
          })}
        </div>
      )}

      <AddContactModal open={showAdd} onClose={() => setShowAdd(false)} onSaved={loadContacts} />
    </AppLayout>
  );
}

function AddContactModal({ open, onClose, onSaved }: { open: boolean; onClose: () => void; onSaved: () => void }) {
  const { profile } = useAuth();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whereMet, setWhereMet] = useState('');
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('new');
  const [interest, setInterest] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!profile || !name.trim()) return;
    setSaving(true);
    const { data: contact } = await supabase.from('contacts').insert({
      user_id: profile.id, name, company, position, email, phone, where_met: whereMet, event_name: eventName, category, tags: [],
    }).select('*').maybeSingle();

    if (contact) {
      await supabase.from('relationships').insert({
        user_id: profile.id, contact_id: (contact as Contact).id, status, interest, notes,
      });
    }
    setSaving(false);
    setName(''); setCompany(''); setPosition(''); setEmail(''); setPhone(''); setWhereMet(''); setEventName(''); setCategory(''); setStatus('new'); setInterest(''); setNotes('');
    onSaved();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Connection" size="lg">
      <div className="space-y-4">
        <Input label="Name *" value={name} onChange={(e) => setName(e.target.value)} placeholder="David Lim" />
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="NovaTech Solutions" />
          <Input label="Position" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="CTO" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="david@novatech.io" />
          <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+63 917 555 1234" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Where Met" value={whereMet} onChange={(e) => setWhereMet(e.target.value)} placeholder="Conference" />
          <Input label="Event" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Startup Expo 2026" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select category...</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Select label="Relationship Status" value={status} onChange={(e) => setStatus(e.target.value)}>
            {RELATIONSHIP_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
        </div>
        <Input label="Interest" value={interest} onChange={(e) => setInterest(e.target.value)} placeholder="Partnership" />
        <Textarea label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What did you discuss?" rows={3} />
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button className="flex-1" onClick={handleSave} disabled={saving || !name.trim()}>{saving ? 'Saving...' : 'Add Connection'}</Button>
        </div>
      </div>
    </Modal>
  );
}

function ContactDetail({ contactId }: { contactId: string }) {
  const { profile } = useAuth();
  const [contact, setContact] = useState<Contact | null>(null);
  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [interactions, setInteractions] = useState<RelationshipInteraction[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInteraction, setShowInteraction] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [interactionSummary, setInteractionSummary] = useState('');
  const [followUpTitle, setFollowUpTitle] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  async function loadDetail() {
    if (!profile) return;
    const { data: contactData } = await supabase.from('contacts').select('*').eq('id', contactId).maybeSingle();
    setContact(contactData as Contact | null);
    const { data: relData } = await supabase.from('relationships').select('*').eq('contact_id', contactId).maybeSingle();
    setRelationship(relData as Relationship | null);
    if (relData) {
      const { data: intData } = await supabase.from('relationship_interactions').select('*').eq('relationship_id', (relData as Relationship).id).order('interaction_date', { ascending: false });
      setInteractions(intData as RelationshipInteraction[] || []);
      const { data: fuData } = await supabase.from('follow_ups').select('*, contact:contacts(*)').eq('relationship_id', (relData as Relationship).id).order('due_date', { ascending: true });
      setFollowUps(fuData as FollowUp[] || []);
    }
    setLoading(false);
  }

  useEffect(() => { loadDetail(); }, [contactId, profile]);

  const updateStatus = async (newStatus: string) => {
    if (!relationship) return;
    await supabase.from('relationships').update({ status: newStatus, updated_at: new Date().toISOString() }).eq('id', relationship.id);
    loadDetail();
  };

  const addInteraction = async () => {
    if (!relationship || !interactionSummary.trim()) return;
    await supabase.from('relationship_interactions').insert({
      relationship_id: relationship.id, user_id: profile!.id, type: 'note', summary: interactionSummary, interaction_date: new Date().toISOString().slice(0, 10),
    });
    await supabase.from('relationships').update({ last_interaction: new Date().toISOString().slice(0, 10) }).eq('id', relationship.id);
    setInteractionSummary('');
    setShowInteraction(false);
    loadDetail();
  };

  const addFollowUp = async () => {
    if (!relationship || !followUpTitle.trim()) return;
    await supabase.from('follow_ups').insert({
      user_id: profile!.id, relationship_id: relationship.id, contact_id: contactId, title: followUpTitle, due_date: followUpDate || null,
    });
    setFollowUpTitle(''); setFollowUpDate('');
    setShowFollowUp(false);
    loadDetail();
  };

  if (loading) return <AppLayout activePath="/contacts"><LoadingState /></AppLayout>;
  if (!contact) return <AppLayout activePath="/contacts"><EmptyState title="Contact not found" /></AppLayout>;

  const statusInfo = relationship ? getRelationshipStatusInfo(relationship.status) : null;
  const healthInfo = relationship ? getHealthInfo(relationship.relationship_health) : null;

  return (
    <AppLayout activePath="/contacts">
      <button onClick={() => navigateTo('/contacts')} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-4 font-ui"><ArrowLeft className="w-4 h-4" /> Back to Network</button>

      <div className="glass-strong rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <Avatar src={contact.avatar_url} name={contact.name} size="xl" />
          <div className="flex-1">
            <h1 className="font-heading font-bold text-2xl text-white">{contact.name}</h1>
            <p className="text-cyan-400 font-ui text-sm">{contact.position}{contact.company ? ` at ${contact.company}` : ''}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {statusInfo && <Badge color={statusInfo.color}>{statusInfo.label}</Badge>}
              {healthInfo && <Badge color={healthInfo.color}><Heart className="w-3 h-3" /> {healthInfo.label}</Badge>}
              {contact.category && <Badge>{contact.category}</Badge>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Drawer label="Contact Information" icon={<Mail className="w-4 h-4" />} defaultOpen>
            <div className="space-y-2">
              {contact.email && <div className="flex items-center gap-2 text-sm text-white/60 font-body"><Mail className="w-4 h-4 text-cyan-400" /> {contact.email}</div>}
              {contact.phone && <div className="flex items-center gap-2 text-sm text-white/60 font-body"><Phone className="w-4 h-4 text-cyan-400" /> {contact.phone}</div>}
              {contact.company && <div className="flex items-center gap-2 text-sm text-white/60 font-body"><Building2 className="w-4 h-4 text-cyan-400" /> {contact.company}</div>}
            </div>
          </Drawer>
          <Drawer label="How We Met" icon={<Calendar className="w-4 h-4" />}>
            <div className="space-y-1 text-sm text-white/60 font-body">
              {contact.where_met && <p>Where: {contact.where_met}</p>}
              {contact.event_name && <p>Event: {contact.event_name}</p>}
              {contact.date_met && <p>Date: {contact.date_met}</p>}
            </div>
          </Drawer>
          {relationship?.notes && <Drawer label="Notes" icon={<MessageSquare className="w-4 h-4" />} defaultOpen><p className="text-sm text-white/60 font-body">{relationship.notes}</p></Drawer>}
          {relationship?.conversation_context && <Drawer label="Conversation Context" icon={<MessageSquare className="w-4 h-4" />}><p className="text-sm text-white/60 font-body">{relationship.conversation_context}</p></Drawer>}
          <Drawer label="Relationship Status" icon={<Tag className="w-4 h-4" />}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {RELATIONSHIP_STATUSES.map(s => (
                <button key={s.value} onClick={() => updateStatus(s.value)} className={`px-3 py-2 rounded-lg text-xs font-ui font-medium border transition-all ${relationship?.status === s.value ? s.color : 'bg-white/5 text-white/40 border-white/10 hover:bg-white/10'}`}>{s.label}</button>
              ))}
            </div>
          </Drawer>
        </div>

        <div className="space-y-4">
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-white">Interactions</h2>
              <Button size="sm" variant="secondary" onClick={() => setShowInteraction(true)}><Plus className="w-3.5 h-3.5" /> Log</Button>
            </div>
            {interactions.length === 0 ? <p className="text-sm text-white/30 font-body text-center py-6">No interactions logged yet.</p> : (
              <div className="space-y-2">{interactions.map(i => <div key={i.id} className="glass-card rounded-xl p-3"><p className="text-sm text-white/70 font-body">{i.summary}</p><p className="text-xs text-white/30 mt-1">{i.interaction_date}</p></div>)}</div>
            )}
          </div>
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-white">Follow-ups</h2>
              <Button size="sm" variant="secondary" onClick={() => setShowFollowUp(true)}><Plus className="w-3.5 h-3.5" /> Add</Button>
            </div>
            {followUps.length === 0 ? <p className="text-sm text-white/30 font-body text-center py-6">No follow-ups yet. Keep the relationship moving.</p> : (
              <div className="space-y-2">{followUps.map(f => <div key={f.id} className="glass-card rounded-xl p-3 flex items-center gap-2"><CheckSquare className="w-4 h-4 text-gold-400" /><div className="flex-1"><p className="text-sm text-white/70 font-body">{f.title}</p>{f.due_date && <p className="text-xs text-white/30">Due: {f.due_date}</p>}</div></div>)}</div>
            )}
          </div>
          {relationship && relationship.opportunity_value > 0 && (
            <div className="glass-panel p-5">
              <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-gold-400" /><h2 className="font-heading font-semibold text-white">Opportunity</h2></div>
              <p className="text-2xl font-heading font-bold text-gold-400">${relationship.opportunity_value.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>

      <Modal open={showInteraction} onClose={() => setShowInteraction(false)} title="Log Interaction" size="sm">
        <div className="space-y-4">
          <Textarea label="What happened?" value={interactionSummary} onChange={(e) => setInteractionSummary(e.target.value)} rows={3} placeholder="Met for coffee, discussed partnership..." />
          <Button className="w-full" onClick={addInteraction} disabled={!interactionSummary.trim()}>Save Interaction</Button>
        </div>
      </Modal>
      <Modal open={showFollowUp} onClose={() => setShowFollowUp(false)} title="Add Follow-up" size="sm">
        <div className="space-y-4">
          <Input label="Task" value={followUpTitle} onChange={(e) => setFollowUpTitle(e.target.value)} placeholder="Send partnership proposal" />
          <Input label="Due Date" type="date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} />
          <Button className="w-full" onClick={addFollowUp} disabled={!followUpTitle.trim()}>Add Follow-up</Button>
        </div>
      </Modal>
    </AppLayout>
  );
}
