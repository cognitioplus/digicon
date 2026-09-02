import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { useRouter, matchRoute, navigateTo } from '@/hooks/useRouter';
import { PublicLayout } from '@/layouts/PublicLayout';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';
import { OnboardingPage } from '@/pages/auth/OnboardingPage';
import { LandingPage } from '@/pages/public/LandingPage';
import { DashboardPage } from '@/pages/app/DashboardPage';
import { CardsPage } from '@/pages/app/CardsPage';
import { CardBuilderPage } from '@/pages/app/CardBuilderPage';
import { ContactsPage } from '@/pages/app/ContactsPage';
import { FollowUpsPage } from '@/pages/app/FollowUpsPage';
import { CRMPage } from '@/pages/app/CRMPage';
import { AnalyticsPage } from '@/pages/app/AnalyticsPage';
import { ProfilePage } from '@/pages/app/ProfilePage';
import { PricingPage } from '@/pages/public/PricingPage';
import { PublicCardPage } from '@/pages/public/PublicCardPage';
import { InfoPage } from '@/pages/public/InfoPage';
import { LoadingState } from '@/components/ui/States';

function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingState />;
  if (!user) {
    navigateTo('/login');
    return null;
  }
  return <>{children}</>;
}

function AppContent() {
  const { route } = useRouter();
  const path = route.path;

  if (path === '/login') return <LoginPage />;
  if (path === '/signup') return <SignupPage />;
  if (path === '/onboarding') return <Protected><OnboardingPage /></Protected>;

  const publicContent = () => {
    if (path === '/') return <LandingPage />;
    if (path === '/pricing') return <PricingPage />;
    if (path === '/about') return <InfoPage title="Built for the relationships that move you forward" eyebrow="About DigiCon" />;
    if (path === '/faq') return <InfoPage title="Everything you need to keep connections moving" eyebrow="Frequently asked questions" />;
    if (path === '/support') return <InfoPage title="Help for your next valuable connection" eyebrow="Support" />;
    if (path === '/terms') return <InfoPage title="Terms of Service" eyebrow="Legal" />;
    if (path === '/privacy') return <InfoPage title="Privacy that respects your relationships" eyebrow="Privacy Policy" />;
    if (path === '/cookies') return <InfoPage title="Cookie Policy" eyebrow="Legal" />;
    if (path === '/accessibility') return <InfoPage title="Designed for everyone" eyebrow="Accessibility" />;
    const publicCard = matchRoute(path, '/c/:slug');
    if (publicCard) return <PublicCardPage slug={publicCard.slug} />;
    return null;
  };

  const publicPage = publicContent();
  if (publicPage) return <PublicLayout activePath={path}>{publicPage}</PublicLayout>;

  if (path === '/dashboard') return <Protected><DashboardPage /></Protected>;
  if (path === '/cards') return <Protected><CardsPage /></Protected>;
  if (path === '/cards/new') return <Protected><CardBuilderPage /></Protected>;
  const cardEdit = matchRoute(path, '/cards/:id');
  if (cardEdit) return <Protected><CardBuilderPage cardId={cardEdit.id} /></Protected>;
  if (path === '/contacts' || path === '/contacts/new') return <Protected><ContactsPage /></Protected>;
  const contactDetail = matchRoute(path, '/contacts/:id');
  if (contactDetail) return <Protected><ContactsPage contactId={contactDetail.id} /></Protected>;
  if (path === '/follow-ups') return <Protected><FollowUpsPage /></Protected>;
  if (path === '/crm') return <Protected><CRMPage /></Protected>;
  if (path === '/analytics') return <Protected><AnalyticsPage /></Protected>;
  if (path === '/profile' || path === '/settings') return <Protected><ProfilePage /></Protected>;

  return <PublicLayout activePath="/"><InfoPage title="That page is not available" eyebrow="DigiCon" /></PublicLayout>;
}

export default function App() {
  return <AuthProvider><AppContent /></AuthProvider>;
}
