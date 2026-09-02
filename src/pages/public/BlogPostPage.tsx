import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Share2,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { GoldBadge } from '@/components/ui/Badge';
import { navigateTo } from '@/hooks/useRouter';

interface BlogPostPageProps {
  slug: string;
}

interface ArticleContent {
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  paragraphs: string[];
}

const POSTS: Record<string, ArticleContent> = {
  'from-digital-business-card-to-relationship': {
    title:
      'From Digital Business Card to Relationship: What Happens After You Connect?',
    category: 'DigiCon Insights',
    date: 'September 3, 2026',
    readTime: '7 min read',
    excerpt:
      'A business card creates an introduction. A relationship creates possibility.',
    tags: ['Digital Business Cards', 'Relationships', 'Networking'],
    paragraphs: [
      'A digital business card solves an old problem elegantly: how do I introduce myself without carrying a stack of paper? But the introduction is only the beginning.',
      'The more important question comes immediately afterward: what happens to the relationship?',
      'You meet someone at a conference. You exchange contact information. You promise to stay in touch. Then the event ends, the conversations blur together, and a few weeks later that potentially valuable connection is sitting somewhere inside your phone with no context.',
      'That is where networking starts to break down.',
      'The problem is not a lack of contacts. Most professionals already have hundreds or thousands. The problem is the absence of relationship memory.',
      'Who was this person? Where did we meet? What did we discuss? What were they interested in? Did I promise to send something? When should I reach out again?',
      'A useful professional identity should therefore do more than present information. It should help preserve the context around the people you meet.',
      'That is the idea behind DigiCon: the card is the entry point, but the relationship is the product.',
      'When a connection becomes a structured relationship, the next action becomes visible. A promising introduction can become a follow-up. A follow-up can become a conversation. A conversation can become an opportunity, partnership, client relationship, or long-term professional connection.',
      'The objective is not to turn every person you meet into a sales lead. It is to make sure the relationships that matter do not disappear simply because life became busy.',
    ],
  },

  'never-lose-a-valuable-connection-again': {
    title: 'Never Lose a Valuable Connection Again',
    category: 'Networking',
    date: 'September 1, 2026',
    readTime: '6 min read',
    excerpt:
      'The real cost of networking is not meeting the wrong people. It is forgetting the right ones.',
    tags: ['Contact Management', 'Networking', 'CRM'],
    paragraphs: [
      'Networking is often measured by how many people you meet. A better measure is how many meaningful relationships you are able to remember and develop.',
      'The moment after an introduction is where value is either preserved or lost.',
      'Capture the person. Capture the context. Capture the next action.',
      'That simple sequence transforms a contact list into a living network.',
      'The goal is not bureaucracy. It is memory.',
      'When your professional network contains context, follow-up becomes easier, more relevant, and more human.',
    ],
  },

  '24-hour-follow-up-system': {
    title: 'The 24-Hour Follow-Up System for Better Networking',
    category: 'Productivity',
    date: 'August 28, 2026',
    readTime: '5 min read',
    excerpt:
      'A simple framework for turning a promising introduction into a meaningful next conversation.',
    tags: ['Follow-up', 'Productivity', 'Relationships'],
    paragraphs: [
      'The best time to follow up after a valuable introduction is while the conversation is still fresh for both people.',
      'Within 24 hours, record who you met, where you met, what you discussed, and what should happen next.',
      'Then send a short message that proves you remember the conversation.',
      'Good follow-up is not persistence for its own sake. It is continuity.',
      'When people feel remembered, relationships become easier to develop.',
    ],
  },
};

export function BlogPostPage({ slug }: BlogPostPageProps) {
  const post = POSTS[slug];

  if (!post) {
    return (
      <section className="max-w-3xl mx-auto px-4 lg:px-8 py-20 text-center">
        <p className="text-cyan-400 font-ui text-sm uppercase tracking-wide">
          Article unavailable
        </p>

        <h1 className="font-heading font-bold text-4xl text-white mt-3">
          We couldn't find that article.
        </h1>

        <p className="text-white/50 font-body mt-4">
          The article may have moved or is not published yet.
        </p>

        <Button className="mt-7" onClick={() => navigateTo('/blog')}>
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Button>
      </section>
    );
  }

  return (
    <article>
      <header className="border-b border-white/10 bg-grid">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16 md:py-24">
          <button
            type="button"
            onClick={() => navigateTo('/blog')}
            className="inline-flex items-center gap-2 text-sm font-ui text-white/40 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>

          <div className="mt-10">
            <GoldBadge>
              <Sparkles className="w-3.5 h-3.5" />
              {post.category}
            </GoldBadge>

            <h1 className="font-heading font-bold text-4xl md:text-6xl text-white leading-tight mt-5 text-balance">
              {post.title}
            </h1>

            <p className="text-xl text-white/55 font-body leading-relaxed mt-6 max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-5 mt-7 text-sm text-white/40 font-body">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                {post.date}
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock3 className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 lg:px-8 py-14">
        <div className="prose prose-invert max-w-none">
          {post.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-lg text-white/65 font-body leading-[1.85] mb-7"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-ui text-white/45"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <Button
            variant="secondary"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  text: post.excerpt,
                  url: window.location.href,
                }).catch(() => undefined);
              }
            }}
          >
            <Share2 className="w-4 h-4" />
            Share article
          </Button>

          <Button onClick={() => navigateTo('/signup')}>
            Build your DigiCon
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
