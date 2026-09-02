import {
  ArrowLeft,
  Check,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { GoldBadge } from '@/components/ui/Badge';
import { PLANS } from '@/config/constants';
import { navigateTo } from '@/hooks/useRouter';

export function CheckoutPage() {
  const params = new URLSearchParams(window.location.hash.split('?')[1] ?? '');
  const requestedPlan = params.get('plan') ?? 'pro';

  const plan =
    PLANS.find((item) => item.id === requestedPlan) ??
    PLANS.find((item) => item.id === 'pro')!;

  return (
    <main className="max-w-5xl mx-auto px-4 lg:px-8 py-12 md:py-20">
      <button
        type="button"
        onClick={() => navigateTo('/pricing')}
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white font-ui transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to pricing
      </button>

      <div className="grid lg:grid-cols-[1fr_420px] gap-8 mt-10">
        <section>
          <GoldBadge>
            <LockKeyhole className="w-3.5 h-3.5" />
            Secure checkout
          </GoldBadge>

          <h1 className="font-heading font-bold text-4xl text-white mt-5">
            Upgrade your DigiCon
          </h1>

          <p className="text-white/50 font-body text-lg mt-4 leading-relaxed">
            You have outgrown the basic introduction. Now give your
            relationships the structure they deserve.
          </p>

          <div className="glass-panel p-6 mt-8">
            <h2 className="font-heading font-semibold text-white text-xl">
              What happens next
            </h2>

            <div className="space-y-4 mt-5">
              {[
                'Choose your DigiCon plan.',
                'Complete secure payment.',
                'Return to DigiCon and continue building your network.',
              ].map((step, index) => (
                <div key={step} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 flex items-center justify-center text-xs font-ui shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-white/55 font-body pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6 text-sm text-white/35 font-body">
            <ShieldCheck className="w-4 h-4 text-success-400" />
            Payment details should be handled by the configured payment
            provider. DigiCon does not store raw card details.
          </div>
        </section>

        <aside className="glass-card rounded-2xl p-6 h-fit">
          <p className="text-xs text-white/40 uppercase tracking-wide font-ui">
            Selected plan
          </p>

          <h2 className="font-heading font-bold text-2xl text-white mt-2">
            {plan.name}
          </h2>

          <p className="text-white/40 text-sm font-body mt-1">
            {plan.tagline}
          </p>

          <div className="mt-6 pb-6 border-b border-white/10">
            <span className="font-heading font-bold text-4xl text-white">
              ${plan.price}
            </span>
            <span className="text-white/40 text-sm">
              {' '}
              / {plan.period}
            </span>
          </div>

          <div className="space-y-3 mt-6">
            {plan.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-2 text-sm text-white/55 font-body"
              >
                <Check className="w-4 h-4 text-success-400 mt-0.5 shrink-0" />
                {feature}
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="w-full mt-7"
            onClick={() => navigateTo('/signup')}
          >
            Continue to secure signup
          </Button>

          <p className="text-xs text-white/30 font-body text-center mt-4">
            You can change or cancel your plan according to the applicable
            subscription terms.
          </p>
        </aside>
      </div>
    </main>
  );
}
