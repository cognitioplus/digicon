import { ArrowRight, Check, CreditCard, Share2, Users, CheckSquare, TrendingUp, QrCode, Sparkles, Network, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { navigateTo } from '@/hooks/useRouter';

const LIFECYCLE = [
  { icon: CreditCard, label: 'Identity', desc: 'Create your professional digital card' },
  { icon: Share2, label: 'Share', desc: 'Exchange contacts instantly via QR or link' },
  { icon: Users, label: 'Connect', desc: 'Capture the people you meet' },
  { icon: Target, label: 'Remember', desc: 'Record what you discussed and why it matters' },
  { icon: CheckSquare, label: 'Follow Up', desc: 'Never miss a next action or reminder' },
  { icon: TrendingUp, label: 'Grow', desc: 'Measure your networking impact and grow' },
];

const FEATURES = [
  {
    icon: CreditCard,
    title: 'Digital Business Cards',
    desc: 'Create stunning portrait or landscape cards with your professional identity, services, and social links. Share via QR, URL, or SMS.',
  },
  {
    icon: Users,
    title: 'Relationship Workspace',
    desc: 'Go beyond contacts. Track relationship status, conversation context, shared purpose, and interaction history for every connection.',
  },
  {
    icon: CheckSquare,
    title: 'Smart Follow-Ups',
    desc: 'Create tasks, reminders, and next actions. Know exactly who to follow up with and when, so no valuable connection slips away.',
  },
  {
    icon: Target,
    title: 'Lightweight CRM',
    desc: 'A simple pipeline from New to Won. Track opportunities, values, and stages without the complexity of enterprise CRMs.',
  },
  {
    icon: TrendingUp,
    title: 'Networking Analytics',
    desc: 'See your networking activity, conversion rates, and relationship health. Earn badges for consistent networking.',
  },
  {
    icon: QrCode,
    title: 'Instant Sharing',
    desc: 'Generate QR codes, shareable URLs, and contact exchange forms. Mobile-first, fast, and optimized for real-world networking.',
  },
];

const TESTIMONIALS = [
  {
    quote: "DigiCon replaced three apps for me. My card, my contacts, and my follow-ups in one place.",
    name: "Maria Santos",
    role: "Founder & CEO, Neora Solutions",
  },
  {
    quote: "I met 40 people at a conference and actually followed up with all of them. That never happened before.",
    name: "David Lim",
    role: "CTO, NovaTech Solutions",
  },
  {
    quote: "The relationship memory is what keeps me here. I know exactly where every connection stands.",
    name: "Aisha Rahman",
    role: "HR Director, PeopleFirst",
  },
];

export function LandingPage() {
  return (
    <div className="bg-navy-980">
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-electric-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-xs font-ui font-medium text-white/70">Relationship-first professional networking</span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl text-white leading-[1.1] mb-4 text-balance">
              Your professional identity.
              <br />
              <span className="gradient-text">Your connections.</span>{' '}
              <span className="gold-text">Your network.</span>
            </h1>
            <p className="font-body text-lg text-white/60 max-w-2xl mx-auto mb-8">
              Create your professional identity, share it instantly, capture the people you meet, and turn everyday networking into relationships you can actually manage.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => navigateTo('/signup')}>
                Create Your DigiCon
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigateTo('/#how')}>
                See How It Works
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/30 font-body">
              Free to start. No credit card required.
            </p>
          </div>

          {/* Hero visual: phone mockup + network */}
          <div className="mt-16 relative max-w-4xl mx-auto">
            <div className="glass-strong rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Card mockup */}
                <div className="relative">
                  <div className="glass-strong rounded-2xl p-6 max-w-xs mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-electric-600 flex items-center justify-center font-heading font-bold text-white text-lg">
                        MS
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-white">Maria Santos</p>
                        <p className="text-xs text-cyan-400 font-ui">Founder & CEO</p>
                      </div>
                    </div>
                    <p className="text-sm text-white/50 font-body mb-4">Neora Solutions — Building the future of SME technology</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> maria@neora.io
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> neora.io
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> +63 917 123 4567
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="inline-flex items-center gap-1.5 glass rounded-lg px-3 py-1.5">
                        <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-ui text-white/60">Scan to connect</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Network visualization */}
                <div className="space-y-3">
                  <div className="text-left">
                    <h3 className="font-heading font-bold text-xl text-white mb-1">A connection is not just a contact.</h3>
                    <p className="text-sm text-white/50 font-body">It can become a relationship. A relationship can become an opportunity.</p>
                  </div>
                  {[
                    { icon: Users, label: 'David Lim — CTO, NovaTech', status: 'Follow Up', color: 'text-gold-400' },
                    { icon: Users, label: 'Miguel Reyes — Founder, GreenGrid', status: 'Partner', color: 'text-success-400' },
                    { icon: Users, label: 'Jessica Chen — Investor, NextWave', status: 'Opportunity', color: 'text-cyan-400' },
                  ].map((c) => (
                    <div key={c.label} className="glass-card rounded-xl p-3 flex items-center gap-3">
                      <c.icon className="w-4 h-4 text-white/30 flex-shrink-0" />
                      <span className="text-sm text-white/70 font-body flex-1 truncate">{c.label}</span>
                      <span className={`text-xs font-ui font-medium ${c.color}`}>{c.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle */}
      <section id="how" className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">
              From introduction to <span className="gradient-text">measurable relationship</span>
            </h2>
            <p className="text-white/50 font-body max-w-2xl mx-auto">
              The card is the entry point. The relationship is the product.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {LIFECYCLE.map((step, i) => (
              <div key={step.label} className="glass-card rounded-2xl p-5 text-center relative group">
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-navy-900 border border-electric-500/30 flex items-center justify-center text-xs font-ui font-bold text-cyan-400">
                  {i + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <step.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-ui font-semibold text-white text-sm mb-1">{step.label}</h3>
                <p className="text-xs text-white/40 font-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 lg:px-8 bg-navy-980/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-ui font-medium text-white/70">Everything you need</span>
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">
              More than a card. A <span className="gradient-text">relationship workspace</span>.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass-card rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 font-body leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">
              Trusted by <span className="gradient-text">growth-oriented professionals</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-card rounded-2xl p-6">
                <p className="text-white/70 font-body text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-electric-500/20 border border-white/10 flex items-center justify-center text-sm font-ui font-semibold text-cyan-300">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-ui font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <Network className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3 text-balance">
                Never lose a valuable connection again.
              </h2>
              <p className="text-white/50 font-body mb-8 max-w-xl mx-auto">
                Start free. Create your card, share it, and discover why DigiCon is the missing middle between a business card and a CRM.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" onClick={() => navigateTo('/signup')}>
                  Create Your DigiCon
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigateTo('/pricing')}>
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
