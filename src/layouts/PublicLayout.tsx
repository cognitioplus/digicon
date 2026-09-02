import {
  Accessibility,
  ArrowRight,
  CheckSquare,
  CreditCard,
  HelpCircle,
  Lock,
  Mail,
  Network,
  QrCode,
  Scale,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  WalletCards,
  Zap,
  type LucideIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { navigateTo, useRouter } from '@/hooks/useRouter';

interface Block {
  heading: string;
  body: string[];
  icon?: LucideIcon;
}

interface Content {
  eyebrow: string;
  title: string;
  intro: string;
  blocks: Block[];
  ctaLabel?: string;
  ctaPath?: string;
  secondaryCtaLabel?: string;
  secondaryCtaPath?: string;
}

interface InfoPageProps {
  /**
   * Optional route-specific title supplied by App.tsx.
   * When omitted, the title defined in CONTENT is used.
   */
  title?: string;

  /**
   * Optional route-specific eyebrow supplied by App.tsx.
   * When omitted, the eyebrow defined in CONTENT is used.
   */
  eyebrow?: string;
}

const CONTENT: Record<string, Content> = {
  '/about': {
    eyebrow: 'About DigiCon',
    title: 'We built the part that comes after the handshake',
    intro:
      'Introductions are easy. Remembering what matters about the people you meet is harder. DigiCon exists to turn a moment of connection into a relationship you can actually build.',
    blocks: [
      {
        heading: 'The card is the beginning',
        icon: Sparkles,
        body: [
          'A digital business card solves one problem: sharing who you are. DigiCon starts there, then keeps going.',
          'Your identity becomes the doorway into a living network of people, conversations, opportunities and next actions.',
        ],
      },
      {
        heading: 'The relationship is the product',
        icon: Network,
        body: [
          'DigiCon sits between a digital business card and a full CRM: more useful than a static identity page, but much lighter than enterprise sales software.',
          'Every valuable connection can become a structured relationship with context, interaction history, notes, opportunity information and follow-up actions.',
        ],
      },
      {
        heading: 'Built for people whose network matters',
        icon: Users,
        body: [
          'We build for founders, SME owners, consultants, freelancers, sales and business-development professionals, recruiters, agency owners and community leaders.',
          'If the people you meet can influence your next client, partnership, opportunity, hire or idea, DigiCon is designed for you.',
        ],
      },
      {
        heading: 'Our guiding principle',
        icon: Target,
        body: [
          'Never lose a valuable connection again.',
          'Every product decision should make it easier to move from “Nice meeting you” to “This person is now a meaningful, actionable relationship in my network.”',
        ],
      },
    ],
    ctaLabel: 'Create Your DigiCon',
    ctaPath: '/signup',
    secondaryCtaLabel: 'Explore Features',
    secondaryCtaPath: '/#features',
  },

  '/faq': {
    eyebrow: 'Frequently Asked Questions',
    title: 'Everything you need to keep connections moving',
    intro:
      'DigiCon is designed to be simple at the moment you meet someone and powerful after the conversation ends.',
    blocks: [
      {
        heading: 'Is DigiCon just a digital business card?',
        icon: CreditCard,
        body: [
          'No. The card is the entry point. DigiCon is built around what happens after the exchange: connection capture, relationship organisation, interaction history, follow-up and measurable networking value.',
        ],
      },
      {
        heading: 'What can I do with DigiCon?',
        icon: Zap,
        body: [
          'Create a professional digital identity, share it through QR, link and other supported channels, receive contact information from people you meet, organise relationships and manage follow-up actions from one workspace.',
        ],
      },
      {
        heading: 'What can I do on the free plan?',
        icon: Sparkles,
        body: [
          'The free experience is designed to let you discover the core DigiCon workflow before committing to a paid plan. Available limits and included features are defined by the current pricing configuration.',
          'For the latest plan limits and feature comparison, visit the pricing page.',
        ],
      },
      {
        heading: 'What does Pro add?',
        icon: TrendingUp,
        body: [
          'Pro is designed for professionals who have moved beyond simply sharing an identity and need more capacity for cards, relationship workflows, analytics, exports and advanced professional identity capabilities.',
          'Exact inclusions should always be verified against the current pricing configuration.',
        ],
      },
      {
        heading: 'Can people see my private notes?',
        icon: Lock,
        body: [
          'No. Information intended for your private relationship workspace should never be exposed through a public card.',
          'Public identity information and private relationship intelligence should remain separate concerns in the product architecture.',
        ],
      },
      {
        heading: 'Does the person I meet need a DigiCon account?',
        icon: Users,
        body: [
          'No. The goal is to make connection exchange frictionless. A person should be able to interact with your public identity without being forced through unnecessary registration.',
        ],
      },
      {
        heading: 'How do I get help?',
        icon: HelpCircle,
        body: [
          'Visit the Support page for common guidance or contact the DigiCon support team for account, product or access issues.',
        ],
      },
    ],
    ctaLabel: 'Get Started',
    ctaPath: '/signup',
    secondaryCtaLabel: 'View Pricing',
    secondaryCtaPath: '/pricing',
  },

  '/use-cases': {
    eyebrow: 'Customers & Use Cases',
    title: 'Where DigiCon earns its place',
    intro:
      'The same simple loop — share, capture, remember and follow up — becomes valuable in very different professional environments.',
    blocks: [
      {
        heading: 'Conferences and trade shows',
        icon: QrCode,
        body: [
          'Use QR and digital sharing to make introductions faster, capture the context of each conversation and leave the event with meaningful next actions instead of a stack of cards.',
        ],
      },
      {
        heading: 'Sales and business development',
        icon: TrendingUp,
        body: [
          'Track interest, opportunity context and next actions without forcing every professional relationship into a heavyweight CRM workflow.',
        ],
      },
      {
        heading: 'Recruiting and job fairs',
        icon: Users,
        body: [
          'Capture candidates with role, event and shared purpose while the conversation is still fresh, then follow up before promising opportunities disappear.',
        ],
      },
      {
        heading: 'Consultants, freelancers and agencies',
        icon: Target,
        body: [
          'Maintain one professional identity while keeping relationship context organised across prospects, clients, partners and referral sources.',
        ],
      },
      {
        heading: 'Founders and SME owners',
        icon: Network,
        body: [
          'Turn networking into an owned relationship asset instead of leaving valuable introductions scattered across Messenger, email, phone contacts, spreadsheets and notes.',
        ],
      },
      {
        heading: 'Community and business leaders',
        icon: Share2,
        body: [
          'Build continuity between events and conversations by remembering who you met, what mattered and what should happen next.',
        ],
      },
    ],
    ctaLabel: 'Build Your Network',
    ctaPath: '/signup',
    secondaryCtaLabel: 'See Customer Stories',
    secondaryCtaPath: '/customers',
  },

  '/resources': {
    eyebrow: 'Resources',
    title: 'Get more value from the people you meet',
    intro:
      'Practical ideas for turning introductions into relationships you can remember, organise and grow.',
    blocks: [
      {
        heading: 'The five-minute follow-up habit',
        icon: CheckSquare,
        body: [
          'At the end of every event or networking session, capture three things per person: where you met, what they need and the single most useful next action.',
          'Small moments of structured memory can prevent valuable relationships from disappearing into an inbox.',
        ],
      },
      {
        heading: 'Relationship health signals',
        icon: TrendingUp,
        body: [
          'Relationships become easier to manage when you can see the signals: recent interactions, open actions, shared purpose and whether a conversation has gone quiet.',
        ],
      },
      {
        heading: 'The sharing checklist',
        icon: Share2,
        body: [
          'Use QR at events, a link in chat, contact exchange when appropriate, NFC where supported and Wallet for the professional identity you want to keep close.',
        ],
      },
      {
        heading: 'From contact to relationship',
        icon: Network,
        body: [
          'A contact record becomes valuable when it has context. Record where you met, why the relationship matters and what should happen next.',
        ],
      },
    ],
    ctaLabel: 'Explore the DigiCon Blog',
    ctaPath: '/blog',
    secondaryCtaLabel: 'Create Your DigiCon',
    secondaryCtaPath: '/signup',
  },

  '/support': {
    eyebrow: 'Support',
    title: 'Help for your next valuable connection',
    intro:
      'Whether you are setting up your first card, managing relationships or reviewing your plan, we are here to help you get the most from DigiCon.',
    blocks: [
      {
        heading: 'Get in touch',
        icon: Mail,
        body: [
          'For product or account assistance, contact support@digicon.app and include the email associated with your DigiCon account.',
          'When reporting a problem, include the page you were using, what you expected to happen and what happened instead. This helps the team investigate faster.',
        ],
      },
      {
        heading: 'Your card is not opening publicly',
        icon: QrCode,
        body: [
          'First check that the card has been published in the card builder and that you are sharing the intended public card URL.',
          'If the problem persists, verify the exact URL and contact support with the affected card information.',
        ],
      },
      {
        heading: 'A paid feature appears locked',
        icon: CreditCard,
        body: [
          'Subscription access should be verified against the account state rather than trusted solely from client-side UI state.',
          'If a recently purchased feature remains unavailable, refresh your session and contact support if the issue continues.',
        ],
      },
      {
        heading: 'Privacy or security concern',
        icon: ShieldCheck,
        body: [
          'Do not send passwords, authentication tokens, payment credentials or other secrets to support.',
          'Describe the issue without including sensitive credentials. Security-related concerns should be escalated through the appropriate support channel.',
        ],
      },
    ],
    ctaLabel: 'Create Your DigiCon',
    ctaPath: '/signup',
    secondaryCtaLabel: 'Read Privacy Policy',
    secondaryCtaPath: '/privacy',
  },

  '/terms': {
    eyebrow: 'Legal',
    title: 'Terms of Service',
    intro:
      'This page provides a concise, human-readable overview. The applicable legal agreement should be treated as the authoritative terms governing use of DigiCon.',
    blocks: [
      {
        heading: 'Your account',
        icon: Users,
        body: [
          'You are responsible for the accuracy of the professional identity information you publish and for maintaining the security of your account credentials.',
          'Do not share credentials or knowingly provide inaccurate information that could mislead other users.',
        ],
      },
      {
        heading: 'Acceptable use',
        icon: ShieldCheck,
        body: [
          'Do not use DigiCon to store or process information you have no right to hold, impersonate another person or organisation, abuse the service, or conduct unlawful activity.',
          'Do not use DigiCon as a mechanism for unsolicited bulk communication or other abusive networking practices.',
        ],
      },
      {
        heading: 'Subscriptions and payments',
        icon: CreditCard,
        body: [
          'Paid plans are subject to the pricing and billing terms presented at the time of purchase.',
          'Subscription entitlements should be activated only after payment has been appropriately verified by the service.',
        ],
      },
      {
        heading: 'Your responsibility',
        icon: Scale,
        body: [
          'You remain responsible for the information you choose to publish, the relationships you record and your compliance with applicable laws and professional obligations.',
        ],
      },
    ],
    ctaLabel: 'Create Your DigiCon',
    ctaPath: '/signup',
    secondaryCtaLabel: 'Read Privacy Policy',
    secondaryCtaPath: '/privacy',
  },

  '/privacy': {
    eyebrow: 'Privacy Policy',
    title: 'Privacy that respects your relationships',
    intro:
      'DigiCon handles professional identity and relationship information, so privacy should be treated as a product and architecture principle—not merely a legal requirement.',
    blocks: [
      {
        heading: 'Public identity information',
        icon: Share2,
        body: [
          'Information deliberately published on a public card may be visible to people who receive or discover that card.',
          'Users should only publish professional information they are comfortable making publicly accessible.',
        ],
      },
      {
        heading: 'Private relationship information',
        icon: Lock,
        body: [
          'Relationship notes, conversation context, follow-up information, opportunity details and other private workspace information should remain protected from public card access.',
          'The public identity layer and private relationship layer should remain separate throughout the application architecture.',
        ],
      },
      {
        heading: 'Your controls',
        icon: ShieldCheck,
        body: [
          'Users should be able to manage, edit, remove or unpublish information they control, subject to applicable legal and operational requirements.',
          'Account deletion requests should be handled through the appropriate account-management or support process.',
        ],
      },
      {
        heading: 'Security by design',
        icon: Network,
        body: [
          'Sensitive access decisions must be enforced server-side. Client-side visibility, route guards and UI state should never be treated as sufficient authorization controls.',
          'Authentication credentials and privileged server-side secrets must never be exposed through the client application.',
        ],
      },
    ],
    ctaLabel: 'Manage Your DigiCon',
    ctaPath: '/dashboard',
    secondaryCtaLabel: 'Contact Support',
    secondaryCtaPath: '/support',
  },

  '/cookies': {
    eyebrow: 'Legal',
    title: 'Cookie Policy',
    intro:
      'DigiCon should use cookies and similar technologies only where they are necessary for the service or otherwise appropriately disclosed and controlled.',
    blocks: [
      {
        heading: 'Essential session technology',
        icon: Lock,
        body: [
          'Authentication and session management may require browser storage or cookies so that the application can maintain a secure signed-in experience.',
          'The exact implementation should follow the authentication provider and current application architecture.',
        ],
      },
      {
        heading: 'No unnecessary tracking',
        icon: ShieldCheck,
        body: [
          'DigiCon should avoid advertising, cross-site tracking and other unnecessary tracking technologies unless they are deliberately introduced with appropriate disclosure and consent mechanisms.',
        ],
      },
      {
        heading: 'Third-party services',
        icon: Network,
        body: [
          'Services such as payment providers may operate their own cookies or technologies when you interact with their hosted experiences. Their own policies govern those technologies.',
        ],
      },
    ],
    ctaLabel: 'Return to DigiCon',
    ctaPath: '/',
    secondaryCtaLabel: 'Read Privacy Policy',
    secondaryCtaPath: '/privacy',
  },

  '/accessibility': {
    eyebrow: 'Accessibility',
    title: 'Designed for everyone',
    intro:
      'DigiCon should make professional connection easier—not create new barriers. Accessibility is treated as part of product quality and functional correctness.',
    blocks: [
      {
        heading: 'Accessible by default',
        icon: Accessibility,
        body: [
          'The interface should use semantic HTML, meaningful headings, properly labelled controls, logical focus order and keyboard-accessible interactions.',
        ],
      },
      {
        heading: 'Visible focus and usable controls',
        icon: Target,
        body: [
          'Interactive controls should provide a visible focus indicator and sufficient touch target size for comfortable interaction across desktop and mobile devices.',
        ],
      },
      {
        heading: 'Motion and visual comfort',
        icon: Sparkles,
        body: [
          'Decorative motion should respect reduced-motion preferences. Visual effects should enhance hierarchy without becoming necessary for understanding or operating the product.',
        ],
      },
      {
        heading: 'Reporting an accessibility barrier',
        icon: Mail,
        body: [
          'If something prevents you from using DigiCon, contact support@digicon.app and describe the affected page and interaction.',
          'Accessibility barriers should be treated as functional product issues and prioritised accordingly.',
        ],
      },
    ],
    ctaLabel: 'Get Started',
    ctaPath: '/signup',
    secondaryCtaLabel: 'Contact Support',
    secondaryCtaPath: '/support',
  },
};

const FALLBACK_CONTENT: Content = {
  eyebrow: 'DigiCon',
  title: "We couldn't find that page",
  intro:
    'The page you requested does not exist or may have moved. Your professional network is still waiting for you.',
  blocks: [
    {
      heading: 'Start from your professional identity',
      icon: Sparkles,
      body: [
        'Create a DigiCon identity, share it instantly and start turning introductions into relationships you can remember and manage.',
      ],
    },
  ],
  ctaLabel: 'Go Home',
  ctaPath: '/',
  secondaryCtaLabel: 'Create Your DigiCon',
  secondaryCtaPath: '/signup',
};

function getBlockId(heading: string): string {
  return `info-${heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;
}

function InfoBlock({
  block,
  index,
}: {
  block: Block;
  index: number;
}) {
  const Icon = block.icon ?? Network;

  return (
    <article
      id={getBlockId(block.heading)}
      className={[
        'group relative overflow-hidden',
        'rounded-2xl border border-white/10',
        'bg-white/[0.035] p-6',
        'shadow-lg shadow-black/5',
        'transition-all duration-300',
        'hover:border-white/15 hover:bg-white/[0.055]',
      ].join(' ')}
      data-testid={`info-block-${index + 1}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-electric-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative">
        <div className="flex items-start gap-4">
          <div
            className={[
              'flex h-11 w-11 shrink-0 items-center justify-center',
              'rounded-xl border border-cyan-400/15',
              'bg-cyan-400/10 text-cyan-400',
            ].join(' ')}
          >
            <Icon
              size={20}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <p className="mb-1 font-ui text-xs font-medium uppercase tracking-[0.16em] text-cyan-400/70">
              {String(index + 1).padStart(2, '0')}
            </p>

            <h2 className="font-heading text-lg font-bold leading-snug text-white">
              {block.heading}
            </h2>
          </div>
        </div>

        <div className="mt-5 space-y-3 pl-0 sm:pl-[3.75rem]">
          {block.body.map((paragraph, paragraphIndex) => (
            <p
              key={`${block.heading}-${paragraphIndex}`}
              className="font-body text-sm leading-7 text-white/55"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

function InfoHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="text-center">
      <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/5 px-3 py-1.5">
        <Sparkles
          size={14}
          className="text-cyan-400"
          aria-hidden="true"
        />

        <span className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
          {eyebrow}
        </span>
      </div>

      <h1
        className={[
          'mx-auto max-w-4xl',
          'font-heading text-3xl font-bold leading-tight',
          'text-white sm:text-4xl lg:text-5xl',
        ].join(' ')}
        data-testid="info-heading"
      >
        {title}
      </h1>

      <p
        className="mx-auto mt-6 max-w-2xl font-body text-base leading-7 text-white/55 sm:text-lg sm:leading-8"
        data-testid="info-intro"
      >
        {intro}
      </p>
    </header>
  );
}

function InfoActions({
  content,
}: {
  content: Content;
}) {
  if (!content.ctaLabel && !content.secondaryCtaLabel) {
    return null;
  }

  return (
    <div
      className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
      data-testid="info-actions"
    >
      {content.ctaLabel && content.ctaPath && (
        <Button
          type="button"
          size="lg"
          onClick={() => navigateTo(content.ctaPath!)}
          data-testid="info-cta"
        >
          {content.ctaLabel}
          <ArrowRight
            size={17}
            aria-hidden="true"
          />
        </Button>
      )}

      {content.secondaryCtaLabel && content.secondaryCtaPath && (
        <Button
          type="button"
          size="lg"
          variant="secondary"
          onClick={() => navigateTo(content.secondaryCtaPath!)}
          data-testid="info-secondary-cta"
        >
          {content.secondaryCtaLabel}
        </Button>
      )}
    </div>
  );
}

function RelationshipCallout() {
  return (
    <aside
      className={[
        'relative mt-12 overflow-hidden rounded-2xl',
        'border border-electric-500/15',
        'bg-gradient-to-br from-electric-500/[0.10] via-cyan-400/[0.05] to-transparent',
        'p-6 sm:p-8',
      ].join(' ')}
      aria-label="DigiCon product principle"
    >
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric-500/10 blur-3xl"
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
            The DigiCon principle
          </p>

          <p className="mt-2 font-heading text-xl font-bold leading-snug text-white sm:text-2xl">
            The card gets someone into DigiCon.
            <span className="text-cyan-400">
              {' '}
              The relationship gives them a reason to stay.
            </span>
          </p>
        </div>

        <Network
          size={42}
          strokeWidth={1.4}
          className="shrink-0 text-cyan-400/70"
          aria-hidden="true"
        />
      </div>
    </aside>
  );
}

export function InfoPage({
  title: titleOverride,
  eyebrow: eyebrowOverride,
}: InfoPageProps) {
  const { route } = useRouter();

  const routeContent = CONTENT[route.path] ?? FALLBACK_CONTENT;

  const content: Content = {
    ...routeContent,
    title: titleOverride ?? routeContent.title,
    eyebrow: eyebrowOverride ?? routeContent.eyebrow,
  };

  const isNotFound = !CONTENT[route.path];

  return (
    <div className="relative min-h-[70vh] overflow-hidden">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-electric-500/[0.06] blur-3xl" />

        <div className="absolute -left-32 top-96 h-64 w-64 rounded-full bg-cyan-400/[0.035] blur-3xl" />

        <div className="absolute -right-32 top-[32rem] h-72 w-72 rounded-full bg-electric-500/[0.035] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:py-16 lg:px-8 lg:py-20">
        <InfoHero
          eyebrow={content.eyebrow}
          title={content.title}
          intro={content.intro}
        />

        {isNotFound && (
          <div
            className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center"
            role="status"
          >
            <HelpCircle
              size={17}
              className="shrink-0 text-cyan-400"
              aria-hidden="true"
            />

            <span className="font-body text-sm text-white/50">
              The requested page could not be found.
            </span>
          </div>
        )}

        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {content.blocks.map((block, index) => (
            <InfoBlock
              key={block.heading}
              block={block}
              index={index}
            />
          ))}
        </div>

        <RelationshipCallout />

        <InfoActions content={content} />

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => navigateTo('/')}
            className={[
              'inline-flex items-center gap-2 rounded-lg',
              'px-3 py-2',
              'font-ui text-sm font-medium',
              'text-white/40 transition-colors',
              'hover:text-white/75',
              'focus:outline-none',
              'focus-visible:ring-2 focus-visible:ring-cyan-400',
              'focus-visible:ring-offset-2',
              'focus-visible:ring-offset-navy-980',
            ].join(' ')}
          >
            <WalletCards
              size={15}
              aria-hidden="true"
            />
            Return to DigiCon
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
