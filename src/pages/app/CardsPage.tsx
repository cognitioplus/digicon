import { useEffect, useState } from 'react';
import { Plus, CreditCard, QrCode, Share2, Edit3, Trash2, ExternalLink, Eye, EyeOff, Star, Crown } from 'lucide-react';
import { AppLayout } from '@/layouts/AppLayout';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { ShareSheet } from '@/components/ui/ShareSheet';
import { LoadingState, EmptyState } from '@/components/ui/States';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';
import { supabase } from '@/lib/supabase';
import { getPlanConfig } from '@/config/constants';
import type { DigitalCard } from '@/types';

export function CardsPage() {
  const { profile } = useAuth();
  const [cards, setCards] = useState<DigitalCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareCard, setShareCard] = useState<DigitalCard | null>(null);
  const [deleteCard, setDeleteCard] = useState<DigitalCard | null>(null);

  const planConfig = getPlanConfig(profile?.plan || 'free');
  const canCreateMore = cards.length < planConfig.cardLimit;

  async function loadCards() {
    if (!profile) return;
    const { data } = await supabase.from('digital_cards').select('*').order('created_at', { ascending: false });
    setCards((data as DigitalCard[]) || []);
    setLoading(false);
  }

  useEffect(() => { loadCards(); }, [profile]);

  async function togglePublish(card: DigitalCard) {
    await supabase.from('digital_cards').update({ is_published: !card.is_published }).eq('id', card.id);
    loadCards();
  }

  async function setPrimary(card: DigitalCard) {
    await supabase.from('digital_cards').update({ is_primary: false }).eq('user_id', card.user_id);
    await supabase.from('digital_cards').update({ is_primary: true }).eq('id', card.id);
    loadCards();
  }

  async function confirmDelete() {
    if (!deleteCard) return;
    await supabase.from('digital_cards').delete().eq('id', deleteCard.id);
    setDeleteCard(null);
    loadCards();
  }

  if (loading) return <AppLayout activePath="/cards"><LoadingState /></AppLayout>;

  return (
    <AppLayout activePath="/cards">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-bold text-2xl text-white">My Cards</h1>
          <p className="text-white/40 font-body text-sm mt-1">
            {cards.length} of {planConfig.cardLimit === Infinity ? 'unlimited' : planConfig.cardLimit} cards used
          </p>
        </div>
        {canCreateMore ? (
          <Button onClick={() => navigateTo('/cards/new')}>
            <Plus className="w-4 h-4" /> New Card
          </Button>
        ) : (
          <Button variant="gold" onClick={() => navigateTo('/pricing')}>
            <Crown className="w-4 h-4" /> Upgrade for More
          </Button>
        )}
      </div>

      {cards.length === 0 ? (
        <EmptyState
          title="No cards yet"
          description="Create your first DigiCon card to start sharing your professional identity."
          action={<Button onClick={() => navigateTo('/cards/new')}><Plus className="w-4 h-4" /> Create Your First Card</Button>}
          icon={<CreditCard className="w-7 h-7" />}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card.id} className="glass-card rounded-2xl overflow-hidden group">
              {/* Card preview */}
              <div className="p-5 bg-gradient-to-br from-navy-900/50 to-navy-980/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar src={card.avatar_url} name={card.name} size="md" />
                    <div>
                      <p className="font-heading font-semibold text-white text-sm">{card.name}</p>
                      <p className="text-xs text-cyan-400 font-ui">{card.job_title || '—'}</p>
                    </div>
                  </div>
                  {card.is_primary && <Badge color="bg-gold-500/20 text-gold-300 border-gold-500/30"><Star className="w-3 h-3" /> Primary</Badge>}
                </div>
                <p className="text-xs text-white/40 font-body mb-3">{card.company || '—'}</p>
                <div className="flex flex-wrap gap-1.5">
                  {card.is_published ? (
                    <Badge color="bg-success-500/20 text-success-300 border-success-500/30">Published</Badge>
                  ) : (
                    <Badge color="bg-white/10 text-white/50 border-white/20">Draft</Badge>
                  )}
                  <Badge color="bg-white/5 text-white/40 border-white/10 capitalize">{card.orientation}</Badge>
                </div>
              </div>
              {/* Actions */}
              <div className="p-3 border-t border-white/5 flex items-center gap-2">
                <button onClick={() => navigateTo(`/cards/${card.id}`)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-ui text-white/60 hover:text-white hover:bg-white/5 transition-all">
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => card.is_published ? setShareCard(card) : togglePublish(card)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-ui text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all">
                  {card.is_published ? <Share2 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {card.is_published ? 'Share' : 'Publish'}
                </button>
                <button onClick={() => togglePublish(card)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5" aria-label="Toggle publish">
                  {card.is_published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => setDeleteCard(card)} className="p-2 rounded-lg text-white/40 hover:text-error-400 hover:bg-error-500/10" aria-label="Delete">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {shareCard && (
        <ShareSheet
          open={!!shareCard}
          onClose={() => setShareCard(null)}
          url={`${window.location.origin}/#/c/${shareCard.slug}`}
          title={shareCard.name}
          qrValue={`${window.location.origin}/#/c/${shareCard.slug}`}
        />
      )}

      <Modal open={!!deleteCard} onClose={() => setDeleteCard(null)} title="Delete Card" size="sm">
        <p className="text-white/60 font-body text-sm mb-6">
          Are you sure you want to delete this card? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setDeleteCard(null)}>Cancel</Button>
          <Button variant="danger" className="flex-1" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </AppLayout>
  );
}
