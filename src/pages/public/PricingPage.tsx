import { Check, Crown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GoldBadge } from '@/components/ui/Badge';
import { PLANS } from '@/config/constants';
import { navigateTo } from '@/hooks/useRouter';

export function PricingPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <GoldBadge><Crown className="w-3.5 h-3.5" /> Grow into your network</GoldBadge>
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mt-4 mb-3">Simple plans for meaningful growth</h1>
        <p className="text-white/50 font-body">Start free. Upgrade when your relationships become infrastructure.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {PLANS.map((plan) => (
          <div key={plan.id} className={`glass-card rounded-2xl p-6 relative ${plan.isPopular ? 'border-cyan-400/40 shadow-lg shadow-cyan-500/10' : ''}`}>
            {plan.isPopular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><GoldBadge>Most popular</GoldBadge></div>}
            <h2 className="font-heading font-bold text-xl text-white">{plan.name}</h2>
            <p className="text-white/40 text-sm font-body mt-1 min-h-[40px]">{plan.tagline}</p>
            <div className="mt-5 mb-5"><span className="font-heading font-bold text-4xl text-white">${plan.price}</span><span className="text-white/40 text-sm"> / {plan.period}</span></div>
            <Button
  variant={plan.id === 'business' ? 'gold' : 'primary'}
  className="w-full"
  onClick={() =>
    navigateTo(
      plan.id === 'free'
        ? '/signup'
        : `/checkout?plan=${encodeURIComponent(plan.id)}`
    )
  }
>
  {plan.id === 'free' ? 'Start Free' : `Choose ${plan.name}`}
  <ArrowRight className="w-4 h-4" />
</Button>
            <div className="mt-6 space-y-3">{plan.features.map((feature) => <div key={feature} className="flex items-start gap-2 text-sm text-white/60 font-body"><Check className="w-4 h-4 text-success-400 mt-0.5 shrink-0" />{feature}</div>)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
