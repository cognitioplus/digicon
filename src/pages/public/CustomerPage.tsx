import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Handshake,
  Rocket,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { GoldBadge } from '@/components/ui/Badge';
import { navigateTo } from '@/hooks/useRouter';

const PERSONAS = [
  {
    icon: BriefcaseBusiness,
    title: 'Consultants & independent professionals',
    description:
      'Give every introduction context and create a simple system for remembering the people who matter to your practice.',
    outcomes: [
      'Professional identity in one place',
      'Context-rich contacts',
      'Simple follow-up workflow',
    ],
  },
  {
    icon: Rocket,
    title: 'Founders & startup teams',
    description:
      'Turn investor, partner, customer, and ecosystem conversations into relationships your team can continue developing.',
    outcomes: [
      'Networking without scattered notes',
      'Opportunity-oriented relationship tracking',
      'Shared professional presence',
    ],
  },
  {
    icon: Handshake,
    title: 'Sales & business development',
    description:
      'Move beyond collecting contacts. Know who you met, what matters to them, and what should happen next.',
    outcomes: [
      'Follow-up visibility',
      'Relationship status',
      'Opportunity pipeline',
    ],
  },
  {
    icon: Users,
    title: 'Growing organizations',
    description:
      'Create a consistent professional identity across people while giving teams better visibility into relationship activity.',
    outcomes: [
      'Consistent digital identity',
      'Team-ready workflows',
      'Relationship insights',
    ],
  },
];

export function CustomersPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-grid border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <GoldBadge>Built around real professional relationships</GoldBadge>

            <h1 className="font-heading font-bold text-4xl md:text-6xl text-white leading-tight mt-5">
              Your network is already valuable.
              <span className="gradient-text"> DigiCon helps you use it.</span>
            </h1>

            <p className="text-xl text-white/55 font-body leading-relaxed mt-6 max-w-2xl">
              Whether you are building a company, selling a service, leading a
              community, or growing your career, DigiCon helps you preserve the
              context behind every important introduction.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Button size="lg" onClick={() => navigateTo('/signup')}>
                Start free
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigateTo('/pricing')}
              >
                See plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <section>
          <div className="max-w-2xl">
            <p className="text-cyan-400 font-ui text-sm font-semibold uppercase tracking-wide">
              Who DigiCon is for
            </p>

            <h2 className="section-title text-3xl md:text-4xl mt-2">
              For people whose relationships create momentum.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {PERSONAS.map((persona) => {
              const Icon = persona.icon;

              return (
                <div
                  key={persona.title}
                  className="glass-card rounded-2xl p-6 md:p-7"
                >
                  <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>

                  <h3 className="font-heading font-semibold text-xl text-white mt-5">
                    {persona.title}
                  </h3>

                  <p className="text-white/50 font-body leading-relaxed mt-3">
                    {persona.description}
                  </p>

                  <div className="space-y-2 mt-5">
                    {persona.outcomes.map((outcome) => (
                      <div
                        key={outcome}
                        className="flex items-center gap-2 text-sm text-white/55 font-body"
                      >
                        <CheckCircle2 className="w-4 h-4 text-success-400 shrink-0" />
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20 glass-panel p-7 md:p-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <p className="text-gold-400 font-ui text-sm font-semibold uppercase tracking-wide">
                The DigiCon difference
              </p>

              <h2 className="font-heading font-bold text-3xl text-white mt-2">
                The card is the entry point. The relationship is the product.
              </h2>

              <p className="text-white/50 font-body leading-relaxed mt-4 max-w-2xl">
                Traditional business cards help people exchange information.
                DigiCon is designed to help you remember what happened next.
              </p>
            </div>

            <Button size="lg" onClick={() => navigateTo('/signup')}>
              Create your identity
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
