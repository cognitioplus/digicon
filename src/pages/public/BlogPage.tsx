import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Sparkles,
  Tag,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { GoldBadge } from '@/components/ui/Badge';
import { navigateTo } from '@/hooks/useRouter';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const ARTICLES: Article[] = [
  {
    slug: 'from-digital-business-card-to-relationship',
    title: 'From Digital Business Card to Relationship: What Happens After You Connect?',
    excerpt:
      'A business card creates an introduction. A relationship creates possibility. Here is how to make sure the people you meet do not disappear into your contact list.',
    category: 'DigiCon Insights',
    date: 'September 3, 2026',
    readTime: '7 min read',
    tags: ['Digital Business Cards', 'Relationships', 'Networking'],
    featured: true,
  },
  {
    slug: 'never-lose-a-valuable-connection-again',
    title: 'Never Lose a Valuable Connection Again',
    excerpt:
      'The real cost of networking is not meeting the wrong people. It is forgetting the right ones.',
    category: 'Networking',
    date: 'September 1, 2026',
    readTime: '6 min read',
    tags: ['Contact Management', 'Networking', 'CRM'],
  },
  {
    slug: '24-hour-follow-up-system',
    title: 'The 24-Hour Follow-Up System for Better Networking',
    excerpt:
      'A simple framework for turning a promising introduction into a meaningful next conversation.',
    category: 'Productivity',
    date: 'August 28, 2026',
    readTime: '5 min read',
    tags: ['Follow-up', 'Productivity', 'Relationships'],
  },
  {
    slug: 'lightweight-relationship-crm',
    title: 'Why SMEs Need a Lightweight Relationship CRM',
    excerpt:
      'You do not need an enterprise CRM to manage valuable relationships. You need enough structure to remember what matters.',
    category: 'SMEs & Startups',
    date: 'August 25, 2026',
    readTime: '8 min read',
    tags: ['SME', 'CRM', 'Business Development'],
  },
  {
    slug: 'conference-badge-to-business-relationship',
    title: 'From Conference Badge to Business Relationship',
    excerpt:
      'What happens after the event determines whether a networking opportunity becomes a real relationship.',
    category: 'Events',
    date: 'August 21, 2026',
    readTime: '6 min read',
    tags: ['Events', 'Networking', 'Follow-up'],
  },
  {
    slug: 'professional-identity-is-more-than-a-card',
    title: 'Your Professional Identity Is More Than a Card',
    excerpt:
      'Your identity is not only what people see when they meet you. It is also what they remember after you leave.',
    category: 'Professional Identity',
    date: 'August 18, 2026',
    readTime: '5 min read',
    tags: ['Personal Branding', 'Digital Presence', 'Identity'],
  },
];

const CATEGORIES = [
  'All',
  'DigiCon Insights',
  'Networking',
  'Productivity',
  'SMEs & Startups',
  'Events',
  'Professional Identity',
];

const POPULAR_TAGS = [
  'Digital Business Cards',
  'Relationships',
  'Networking',
  'CRM',
  'Follow-up',
  'Contact Management',
  'SME',
  'Startup',
  'Business Development',
  'Personal Branding',
];

export function BlogPage() {
  const featured = ARTICLES.find((article) => article.featured);
  const remaining = ARTICLES.filter((article) => !article.featured);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10 bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-electric-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <GoldBadge>
              <Sparkles className="w-3.5 h-3.5" />
              The DigiCon Journal
            </GoldBadge>

            <h1 className="font-heading font-bold text-4xl md:text-6xl text-white leading-tight mt-5 text-balance">
              Better connections begin with
              <span className="gradient-text"> better thinking.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/60 font-body leading-relaxed max-w-2xl">
              Practical ideas for professional identity, networking,
              relationship management, follow-up, and sustainable growth.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Button onClick={() => navigateTo('/signup')}>
                Start building your network
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="secondary"
                onClick={() => {
                  document
                    .getElementById('latest')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <section aria-labelledby="featured-heading">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <p className="font-ui text-sm font-semibold text-cyan-400 uppercase tracking-wide">
              Featured
            </p>
          </div>

          {featured && (
            <button
              type="button"
              onClick={() => navigateTo(`/blog/${featured.slug}`)}
              className="w-full text-left glass-card rounded-3xl p-6 md:p-10 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
                <div>
                  <span className="inline-flex rounded-full bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 text-xs font-ui text-cyan-300">
                    {featured.category}
                  </span>

                  <h2
                    id="featured-heading"
                    className="font-heading font-bold text-3xl md:text-4xl text-white mt-5 leading-tight group-hover:text-cyan-200 transition-colors"
                  >
                    {featured.title}
                  </h2>

                  <p className="mt-5 text-white/55 font-body text-lg leading-relaxed">
                    {featured.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-white/40 font-body">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4" />
                      {featured.date}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="w-4 h-4" />
                      {featured.readTime}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-2 mt-7 text-cyan-300 font-ui font-medium">
                    Read the article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-electric-500/20 via-cyan-400/10 to-gold-400/10 border border-white/10 aspect-[4/3] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-cyan-300" />
                    </div>
                    <p className="font-heading font-semibold text-white mt-5">
                      The relationship is the product.
                    </p>
                    <p className="text-sm text-white/40 font-body mt-2">
                      Identity → Share → Connect → Remember → Follow Up → Grow
                    </p>
                  </div>
                </div>
              </div>
            </button>
          )}
        </section>

        <section
          id="latest"
          aria-labelledby="latest-heading"
          className="mt-20"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <p className="text-cyan-400 font-ui text-sm font-semibold uppercase tracking-wide">
                Latest thinking
              </p>
              <h2
                id="latest-heading"
                className="section-title text-3xl md:text-4xl mt-2"
              >
                Ideas you can put into practice.
              </h2>
            </div>

            <p className="text-white/40 font-body max-w-md">
              No productivity theater. Just practical ideas for building
              stronger professional relationships.
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
            {CATEGORIES.map((category, index) => (
              <button
                key={category}
                type="button"
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-ui border transition-colors ${
                  index === 0
                    ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-300'
                    : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {remaining.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="topics-heading"
          className="mt-20 glass-panel p-7 md:p-10"
        >
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gold-400" />
            <p
              id="topics-heading"
              className="font-ui font-semibold text-white"
            >
              Explore topics
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {POPULAR_TAGS.map((tag) => (
              <button
                type="button"
                key={tag}
                className="rounded-full px-3 py-1.5 bg-white/5 border border-white/10 text-xs font-ui text-white/50 hover:text-white hover:border-white/20 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-20 text-center">
          <GoldBadge>
            <Sparkles className="w-3.5 h-3.5" />
            Put the ideas to work
          </GoldBadge>

          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mt-5">
            Your next valuable connection is worth remembering.
          </h2>

          <p className="text-white/50 font-body max-w-2xl mx-auto mt-4">
            Create your professional identity, share it instantly, and turn
            introductions into relationships you can actually manage.
          </p>

          <div className="mt-7">
            <Button size="lg" onClick={() => navigateTo('/signup')}>
              Create your free DigiCon
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <button
      type="button"
      onClick={() => navigateTo(`/blog/${article.slug}`)}
      className="glass-card rounded-2xl p-5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
    >
      <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 flex items-center justify-center">
        <BookOpen className="w-8 h-8 text-white/20" />
      </div>

      <div className="mt-5">
        <span className="text-xs font-ui font-medium text-cyan-400">
          {article.category}
        </span>

        <h3 className="font-heading font-semibold text-xl text-white mt-2 leading-snug group-hover:text-cyan-200 transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-white/45 font-body leading-relaxed mt-3">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-3 mt-5 text-xs text-white/35 font-body">
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full bg-white/5 text-[10px] text-white/35 font-ui"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
