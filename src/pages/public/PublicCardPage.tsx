import { useEffect, useState } from 'react';
import { Mail, Phone, Globe, Briefcase, Share2, UserPlus, Calendar, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { QRCode } from '@/components/ui/QRCode';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { LoadingState } from '@/components/ui/States';
import { Logo } from '@/components/ui/Logo';
import { navigateTo } from '@/hooks/useRouter';
import type { DigitalCard } from '@/types';

export function PublicCardPage({ slug }: { slug: string }) {
  const [card, setCard] = useState<DigitalCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConnect, setShowConnect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('digital_cards').select('*').eq('slug', slug).eq('is_published', true).maybeSingle();
      setCard(data as DigitalCard | null);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-navy-980 flex items-center justify-center"><LoadingState /></div>;
  if (!card) return <div className="min-h-screen bg-navy-980 flex flex-col items-center justify-center gap-4"><p className="text-white/50 font-body">Card not found.</p><Button onClick={() => navigateTo('/')}>Go Home</Button></div>;

  const shareUrl = `${window.location.origin}/#/c/${card.slug}`;

  const handleConnect = async () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-navy-980 bg-grid">
      <header className="glass-nav px-4 py-3"><div className="max-w-2xl mx-auto flex items-center justify-between"><Logo size={32} /><Share2 className="w-5 h-5 text-white/40" /></div></header>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="glass-strong rounded-3xl p-8 text-center">
          <Avatar src={card.avatar_url} name={card.name} size="xl" className="mx-auto mb-4" />
          <h1 className="font-heading font-bold text-2xl text-white">{card.name}</h1>
          <p className="text-cyan-400 font-ui font-medium mt-1">{card.job_title}</p>
          <p className="text-white/40 text-sm font-body mt-1">{card.company}</p>
          {card.bio && <p className="text-white/50 font-body text-sm mt-4 max-w-md mx-auto">{card.bio}</p>}
          {card.services?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">{card.services.map((s) => <span key={s} className="px-3 py-1 rounded-full glass text-xs font-ui text-cyan-300">{s}</span>)}</div>
          )}
          <div className="space-y-2 mt-6 max-w-xs mx-auto text-left">
            {card.email && <a href={`mailto:${card.email}`} className="flex items-center gap-3 glass rounded-xl p-3 hover:bg-white/10"><Mail className="w-4 h-4 text-cyan-400" /><span className="text-sm text-white/70 font-body truncate">{card.email}</span></a>}
            {card.phone && <a href={`tel:${card.phone}`} className="flex items-center gap-3 glass rounded-xl p-3 hover:bg-white/10"><Phone className="w-4 h-4 text-cyan-400" /><span className="text-sm text-white/70 font-body truncate">{card.phone}</span></a>}
            {card.website && <a href={card.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 glass rounded-xl p-3 hover:bg-white/10"><Globe className="w-4 h-4 text-cyan-400" /><span className="text-sm text-white/70 font-body truncate">{card.website}</span></a>}
            {card.booking_link && <a href={card.booking_link} target="_blank" rel="noreferrer" className="flex items-center gap-3 glass rounded-xl p-3 hover:bg-white/10"><Calendar className="w-4 h-4 text-cyan-400" /><span className="text-sm text-white/70 font-body truncate">Book a meeting</span></a>}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 max-w-xs mx-auto">
            <Button className="flex-1" onClick={() => setShowConnect(true)}><UserPlus className="w-4 h-4" /> Connect</Button>
            <Button variant="secondary" className="flex-1" onClick={() => navigator.clipboard?.writeText(shareUrl)}><Share2 className="w-4 h-4" /> Share</Button>
          </div>
          <div className="mt-6 flex justify-center"><QRCode value={shareUrl} size={140} /></div>
        </div>
        <p className="text-center text-xs text-white/30 font-body mt-6">Powered by DigiCon — Your professional identity. Your connections. Your network.</p>
      </div>
      <Modal open={showConnect} onClose={() => setShowConnect(false)} title="Connect with me" size="sm">
        {submitted ? (
          <div className="text-center py-6"><div className="w-14 h-14 rounded-full bg-success-500/10 border border-success-500/20 flex items-center justify-center mx-auto mb-3"><Check className="w-7 h-7 text-success-400" /></div><p className="text-white font-ui text-sm">Thank you! Your contact info has been shared.</p></div>
        ) : (
          <div className="space-y-4"><p className="text-sm text-white/50 font-body">Share your contact details and we'll get back to you.</p><Input label="Your Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" /><Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /><Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone" /><Button className="w-full" onClick={handleConnect}>Share My Contact</Button></div>
        )}
      </Modal>
    </div>
  );
}
