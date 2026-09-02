import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { useRouter, matchRoute, navigateTo } from '@/hooks/useRouter';
import { PublicLayout, InfoPage } from '@/layouts/PublicLayout';

import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';
import { OnboardingPage } from '@/pages/auth/OnboardingPage';

import { LandingPage } from '@/pages/public/LandingPage';
import { PricingPage } from '@/pages/public/PricingPage';
import { BlogPage } from '@/pages/public/BlogPage';
import { BlogPostPage } from '@/pages/public/BlogPostPage';
import { CustomersPage } from '@/pages/public/CustomersPage';
import { CheckoutPage } from '@/pages/public/CheckoutPage';
import { PublicCardPage } from '@/pages/public/PublicCardPage';

import { DashboardPage } from '@/pages/app/DashboardPage';
import { CardsPage } from '@/pages/app/CardsPage';
import { CardBuilderPage } from '@/pages/app/CardBuilderPage';
import { ContactsPage } from '@/pages/app/ContactsPage';
import { FollowUpsPage } from '@/pages/app/FollowUpsPage';
import { CRMPage } from '@/pages/app/CRMPage';
import { AnalyticsPage } from '@/pages/app/AnalyticsPage';
import { ProfilePage } from '@/pages/app/ProfilePage';

import { LoadingState } from '@/components/ui/States';

function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingState />;
  }

  if (!user) {
    navigateTo('/login');
    return null;
  }

  return <>{children}</>;
}

function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout activePath={window.location.hash.slice(1) || '/'}>{children}</PublicLayout>;
}

function AppContent() {
  const { route } = useRouter();
  const path = route.path;

  if (path === '/login') {
    return <LoginPage />;
  }

  if (path === '/signup') {
    return <SignupPage />;
  }

  if (path === '/onboarding') {
    return (
      <Protected>
        <OnboardingPage />
      </Protected>
    );
  }

  if (path === '/') {
    return (
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    );
  }

  if (path === '/pricing') {
    return (
      <PublicRoute>
        <PricingPage />
      </PublicRoute>
    );
  }

  if (path === '/blog') {
    return (
      <PublicRoute>
        <BlogPage />
      </PublicRoute>
    );
  }

  const blogPost = matchRoute(path, '/blog/:slug');

  if (blogPost) {
    return (
      <PublicRoute>
        <BlogPostPage slug={blogPost.slug} />
      </PublicRoute>
    );
  }

  if (path === '/customers') {
    return (
      <PublicRoute>
        <CustomersPage />
      </PublicRoute>
    );
  }

  if (path === '/checkout') {
    return (
      <PublicRoute>
        <CheckoutPage />
      </PublicRoute>
    );
  }

  if (path === '/about') {
    return (
      <PublicRoute>
        <InfoPage
          title="Built for the relationships that move you forward"
          eyebrow="About DigiCon"
        />
      </PublicRoute>
    );
  }

  if (path === '/faq') {
    return (
      <PublicRoute>
        <InfoPage
          title="Everything you need to keep connections moving"
          eyebrow="Frequently asked questions"
        />
      </PublicRoute>
    );
  }

  if (path === '/support') {
    return (
      <PublicRoute>
        <InfoPage
          title="Help for your next valuable connection"
          eyebrow="Support"
        />
      </PublicRoute>
    );
  }

  if (path === '/terms') {
    return (
      <PublicRoute>
        <InfoPage title="Terms of Service" eyebrow="Legal" />
      </PublicRoute>
    );
  }

  if (path === '/privacy') {
    return (
      <PublicRoute>
        <InfoPage
          title="Privacy that respects your relationships"
          eyebrow="Privacy Policy"
        />
      </PublicRoute>
    );
  }

  if (path === '/cookies') {
    return (
      <PublicRoute>
        <InfoPage title="Cookie Policy" eyebrow="Legal" />
      </PublicRoute>
    );
  }

  if (path === '/accessibility') {
    return (
      <PublicRoute>
        <InfoPage title="Designed for everyone" eyebrow="Accessibility" />
      </PublicRoute>
    );
  }

  const publicCard = matchRoute(path, '/c/:slug');

  if (publicCard) {
    return <PublicCardPage slug={publicCard.slug} />;
  }

  if (path === '/dashboard') {
    return (
      <Protected>
        <DashboardPage />
      </Protected>
    );
  }

  if (path === '/cards') {
    return (
      <Protected>
        <CardsPage />
      </Protected>
    );
  }

  if (path === '/cards/new') {
    return (
      <Protected>
        <CardBuilderPage />
      </Protected>
    );
  }

  const cardEdit = matchRoute(path, '/cards/:id');

  if (cardEdit) {
    return (
      <Protected>
        <CardBuilderPage cardId={cardEdit.id} />
      </Protected>
    );
  }

  if (path === '/contacts' || path === '/contacts/new') {
    return (
      <Protected>
        <ContactsPage />
      </Protected>
    );
  }

  const contactDetail = matchRoute(path, '/contacts/:id');

  if (contactDetail) {
    return (
      <Protected>
        <ContactsPage contactId={contactDetail.id} />
      </Protected>
    );
  }

  if (path === '/follow-ups') {
    return (
      <Protected>
        <FollowUpsPage />
      </Protected>
    );
  }

  if (path === '/crm') {
    return (
      <Protected>
        <CRMPage />
      </Protected>
    );
  }

  if (path === '/analytics') {
    return (
      <Protected>
        <AnalyticsPage />
      </Protected>
    );
  }

  if (path === '/profile' || path === '/settings') {
    return (
      <Protected>
        <ProfilePage />
      </Protected>
    );
  }

  return (
    <PublicRoute>
      <InfoPage
        title="We couldn't find that page"
        eyebrow="404"
      />
    </PublicRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
