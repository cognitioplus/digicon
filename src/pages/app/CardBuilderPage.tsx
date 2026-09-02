import { useEffect, useState } from 'react';
import { Save, Eye, ArrowLeft, Plus, X, Sparkles, Crown } from 'lucide-react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { LoadingState } from '@/components/ui/States';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';
import { supabase } from '@/lib/supabase';
import type { DigitalCard, CardOrientation, SocialLink } from '@/types';

interface CardBuilderPageProps {
  cardId?: string;
}

export function CardBuilderPage({ cardId }: CardBuilderPageProps) {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(!!cardId);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(profile?.full_name || '');
  const [jobTitle, setJobTitle] = useState(profile?.job_title || '');
  const [company, setCompany] = useState(profile?.company || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [website, setWebsite] = useState(profile?.website || '');
  const [bookingLink, setBookingLink] = useState('');
  const [orientation, setOrientation] = useState<CardOrientation>('portrait');
  const [services, setServices] = useState<string[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [newService, setNewService] = useState('');
  const [newSocial, setNewSocial] = useState({ platform: '', url: '' });
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (!cardId) return;
    (async () => {
      const { data } = await supabase.from('digital_cards').select('*').eq('id', cardId).maybeSingle();
      if (data) {
        const c = data as DigitalCard;
        setName(c.name); setJobTitle(c.job_title || ''); setCompany(c.company || '');
        setBio(c.bio || ''); setPhone(c.phone || ''); setEmail(c.email || '');
        setWebsite(c.website || ''); setBookingLink(c.booking_link || '');
        setOrientation(c.orientation); setServices(c.services || []);
        setSocialLinks(c.social_links || []); setIsPublished(c.is_published);
      }
      setLoading(false);
    })();
  }, [cardId]);

  const addService = () => { if (newService.trim()) { setServices([...services, newService.trim()]); setNewService(''); } };
  const removeService = (i: number) => setServices(services.filter((_, idx) => idx !== i));
  const addSocial = () => { if (newSocial.platform && newSocial.url) { setSocialLinks([...socialLinks, { ...newSocial }]); setNewSocial({ platform: '', url: '' }); } };
  const removeSocial = (i: number) => setSocialLinks(socialLinks.filter((_, idx) => idx !== i));

  const handleSave = async (publish?: boolean) => {
    if (!profile) return;
    setSaving(true);
    const payload = {
      name, job_title: jobTitle, company, bio, phone, email, website, booking_link: bookingLink,
      orientation, services, social_links: socialLinks, is_published: publish ?? isPublished,
      updated_at: new Date().toISOString(),
    };

    if (cardId) {
      await supabase.from('digital_cards').update(payload).eq('id', cardId);
    } else {
      const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).slice(2, 6);
      const { data } = await supabase.from('digital_cards').insert({
        ...payload, user_id: profile.id, slug, is_primary: false,
      }).select('*').maybeSingle();
      if (data) { navigateTo(`/cards/${(data as DigitalCard).id}`); }
    }
    setIsPublished(publish ?? isPublished);
    setSaving(false);
  };

  if (loading) return <AppLayout activePath="/cards"><LoadingState /></AppLayout>;

  return (
    <AppLayout activePath="/cards">
      <button onClick={() => navigateTo('/cards')} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-4 font-ui"><ArrowLeft className="w-4 h-4" /> Back to Cards</button>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-5">
          <div className="glass-panel p-5">
            <h2 className="font-heading font-semibold text-white mb-4">Card Information</h2>
            <div className="space-y-4">
              <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Maria Santos" />
              <Input label="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Founder & CEO" />
              <Input label="Company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Neora Solutions" />
              <Textarea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Brief professional bio" rows={3} />
            </div>
          </div>
          <div className="glass-panel p-5">
            <h2 className="font-heading font-semibold text-white mb-4">Contact</h2>
            <div className="space-y-4">
              <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+63 917 123 4567" />
              <Input label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yoursite.com" />
              <Input label="Booking Link" value={bookingLink} onChange={(e) => setBookingLink(e.target.value)} placeholder="https://cal.com/you" />
            </div>
          </div>
          <div className="glass-panel p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-white">Services</h2>
              <Badge>{services.length}</Badge>
            </div>
            <div className="flex gap-2 mb-3">
              <Input value={newService} onChange={(e) => setNewService(e.target.value)} placeholder="Add a service" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addService())} />
              <Button variant="secondary" onClick={addService}><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="flex flex-wrap gap-2">{services.map((s, i) => <span key={i} className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs font-ui text-cyan-300">{s}<button onClick={() => removeService(i)}><X className="w-3 h-3" /></button></span>)}</div>
          </div>
          <div className="glass-panel p-5">
            <h2 className="font-heading font-semibold text-white mb-4">Social Links</h2>
            <div className="space-y-2 mb-3">{socialLinks.map((s, i) => <div key={i} className="flex items-center gap-2 glass rounded-xl p-2"><span className="text-xs font-ui text-cyan-300 flex-1">{s.platform}</span><span className="text-xs text-white/40 truncate flex-1">{s.url}</span><button onClick={() => removeSocial(i)}><X className="w-3.5 h-3.5 text-white/40" /></button></div>)}</div>
            <div className="grid grid-cols-2 gap-2">
              <Input value={newSocial.platform} onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })} placeholder="Platform" />
              <Input value={newSocial.url} onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })} placeholder="URL" />
            </div>
            <Button variant="secondary" className="w-full mt-2" onClick={addSocial}><Plus className="w-4 h-4" /> Add Social</Button>
          </div>
          <div className="glass-panel p-5">
            <h2 className="font-heading font-semibold text-white mb-4">Layout</h2>
            <Select label="Orientation" value={orientation} onChange={(e) => setOrientation(e.target.value as CardOrientation)}>
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </Select>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => handleSave(false)} disabled={saving}>{saving ? 'Saving...' : 'Save Draft'}</Button>
            <Button className="flex-1" onClick={() => handleSave(true)} disabled={saving || !name}><Sparkles className="w-4 h-4" /> Publish</Button>
          </div>
        </div>
        {/* Live preview */}
        <div className="lg:sticky lg:top-8 self-start">
          <div className="flex items-center justify-between mb-3"><span className="text-sm font-ui text-white/50">Live Preview</span><Eye className="w-4 h-4 text-cyan-400" /></div>
          <div className={`glass-strong rounded-2xl p-6 ${orientation === 'landscape' ? 'max-w-lg' : 'max-w-xs mx-auto'}`}>
            <div className="flex items-center gap-3 mb-4">
              <Avatar src={profile?.avatar_url} name={name || 'Your Name'} size="lg" />
              <div><p className="font-heading font-semibold text-white">{name || 'Your Name'}</p><p className="text-xs text-cyan-400 font-ui">{jobTitle || 'Your Title'}</p><p className="text-xs text-white/40">{company || 'Your Company'}</p></div>
            </div>
            {bio && <p className="text-sm text-white/50 font-body mb-4">{bio}</p>}
            {services.length > 0 && <div className="flex flex-wrap gap-1.5 mb-4">{services.map((s) => <span key={s} className="px-2.5 py-1 rounded-full glass text-xs font-ui text-cyan-300">{s}</span>)}</div>}
            <div className="space-y-2">
              {email && <div className="flex items-center gap-2 text-xs text-white/50"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{email}</div>}
              {phone && <div className="flex items-center gap-2 text-xs text-white/50"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{phone}</div>}
              {website && <div className="flex items-center gap-2 text-xs text-white/50"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{website}</div>}
            </div>
            {socialLinks.length > 0 && <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">{socialLinks.map((s, i) => <span key={i} className="text-xs text-white/40 font-ui">{s.platform}</span>)}</div>}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
