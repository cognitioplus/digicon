import { type ReactNode, useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { navigateTo } from '@/hooks/useRouter';
import { useAuth } from '@/hooks/useAuth';

interface PublicLayoutProps {
  children: ReactNode;
  activePath: string;
}

interface NavItem {
  label: string;
  path: string;
  mobileOnly?: boolean;
}

const PUBLIC_NAV: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/#features' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
  { label: 'Customers', path: '/customers' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
];

const PRODUCT_LINKS = [
  { label: 'Features', path: '/#features' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
];

const COMPANY_LINKS = [
  { label: 'About DigiCon', path: '/about' },
  { label: 'Customers', path: '/customers' },
  { label: 'Support', path: '/support' },
];

const LEGAL_LINKS = [
  { label: 'Terms of Service', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Cookie Policy', path: '/cookies' },
  { label: 'Accessibility', path: '/accessibility' },
];

function normalizePath(path: string): string {
  if (!path) return '/';

  const withoutHash = path.split('#')[0];

  if (!withoutHash || withoutHash === '/') {
    return '/';
  }

  return withoutHash.replace(/\/+$/, '');
}

function isNavItemActive(itemPath: string, activePath: string): boolean {
  const normalizedItemPath = normalizePath(itemPath);
  const normalizedActivePath = normalizePath(activePath);

  if (normalizedItemPath === '/') {
    return normalizedActivePath === '/';
  }

  return normalizedItemPath === normalizedActivePath;
}

function handleNavigation(path: string, closeMenu?: () => void) {
  closeMenu?.();
  navigateTo(path);
}

function NavigationLink({
  item,
  activePath,
  onNavigate,
}: {
  item: NavItem;
  activePath: string;
  onNavigate: (path: string) => void;
}) {
  const isActive = isNavItemActive(item.path, activePath);

  return (
    <button
      type="button"
      onClick={() => onNavigate(item.path)}
      aria-current={isActive ? 'page' : undefined}
      className={[
        'relative rounded-lg px-2 py-2',
        'text-sm font-ui font-medium',
        'transition-colors duration-200',
        'focus:outline-none focus-visible:ring-2',
        'focus-visible:ring-cyan-400 focus-visible:ring-offset-2',
        'focus-visible:ring-offset-navy-980',
        isActive
          ? 'text-cyan-400'
          : 'text-white/65 hover:text-white',
      ].join(' ')}
    >
      {item.label}

      <span
        aria-hidden="true"
        className={[
          'absolute inset-x-2 -bottom-0.5 h-px rounded-full',
          'transition-opacity duration-200',
          isActive ? 'bg-cyan-400 opacity-100' : 'opacity-0',
        ].join(' ')}
      />
    </button>
  );
}

function FooterNavigation({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; path: string }>;
}) {
  return (
    <div>
      <h2 className="font-ui text-sm font-semibold text-white">
        {title}
      </h2>

      <nav aria-label={`${title} links`} className="mt-4">
        <ul className="space-y-2.5">
          {links.map((link) => (
            <li key={link.path}>
              <button
                type="button"
                onClick={() => navigateTo(link.path)}
                className={[
                  'text-left text-sm text-white/45',
                  'transition-colors duration-200',
                  'hover:text-white/80',
                  'focus:outline-none focus-visible:text-white',
                  'focus-visible:ring-2 focus-visible:ring-cyan-400',
                  'focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-navy-980',
                  'rounded-sm',
                ].join(' ')}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function PublicLayout({
  children,
  activePath,
}: PublicLayoutProps) {
  const { user } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activePath]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const goHome = () => {
    handleNavigation('/', closeMobileMenu);
  };

  const goToDashboard = () => {
    handleNavigation('/dashboard', closeMobileMenu);
  };

  const goToLogin = () => {
    handleNavigation('/login', closeMobileMenu);
  };

  const goToSignup = () => {
    handleNavigation('/signup', closeMobileMenu);
  };

  return (
    <div className="min-h-screen bg-navy-980 text-white">
      {/* Accessibility: keyboard users can bypass navigation. */}
      <a
        href="#main-content"
        className={[
          'sr-only focus:not-sr-only',
          'fixed left-4 top-4 z-[100]',
          'rounded-lg bg-navy-900 px-4 py-3',
          'text-sm font-ui font-semibold text-white',
          'shadow-xl ring-2 ring-cyan-400',
        ].join(' ')}
      >
        Skip to main content
      </a>

      <header
        className={[
          'sticky top-0 z-50',
          'glass-nav border-b border-white/10',
        ].join(' ')}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          {/* Brand */}
          <button
            type="button"
            onClick={goHome}
            aria-label="DigiCon home"
            className={[
              'shrink-0 rounded-lg',
              'focus:outline-none',
              'focus-visible:ring-2',
              'focus-visible:ring-cyan-400',
              'focus-visible:ring-offset-2',
              'focus-visible:ring-offset-navy-980',
            ].join(' ')}
          >
            <Logo size={36} />
          </button>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {PUBLIC_NAV.map((item) => (
              <NavigationLink
                key={item.path}
                item={item}
                activePath={activePath}
                onNavigate={navigateTo}
              />
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <Button
                type="button"
                size="sm"
                onClick={goToDashboard}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={goToLogin}
                  className={[
                    'rounded-lg px-3 py-2',
                    'text-sm font-ui font-medium',
                    'text-white/65 transition-colors',
                    'hover:text-white',
                    'focus:outline-none',
                    'focus-visible:ring-2',
                    'focus-visible:ring-cyan-400',
                    'focus-visible:ring-offset-2',
                    'focus-visible:ring-offset-navy-980',
                  ].join(' ')}
                >
                  Sign In
                </button>

                <Button
                  type="button"
                  size="sm"
                  onClick={goToSignup}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={
              mobileMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className={[
              'inline-flex items-center justify-center',
              'rounded-lg p-2 md:hidden',
              'text-white/80 hover:text-white',
              'transition-colors duration-200',
              'focus:outline-none',
              'focus-visible:ring-2',
              'focus-visible:ring-cyan-400',
              'focus-visible:ring-offset-2',
              'focus-visible:ring-offset-navy-980',
            ].join(' ')}
          >
            {mobileMenuOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-white/10 bg-navy-980/95 backdrop-blur-xl md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto max-w-7xl px-4 py-4 lg:px-8"
            >
              <div className="flex flex-col gap-1">
                {PUBLIC_NAV.map((item) => (
                  <NavigationLink
                    key={item.path}
                    item={item}
                    activePath={activePath}
                    onNavigate={(path) =>
                      handleNavigation(path, closeMobileMenu)
                    }
                  />
                ))}
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                {user ? (
                  <Button
                    type="button"
                    size="sm"
                    className="w-full justify-center"
                    onClick={goToDashboard}
                  >
                    Dashboard
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                    />
                  </Button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={goToLogin}
                      className={[
                        'rounded-lg border border-white/15',
                        'px-4 py-2.5',
                        'text-sm font-ui font-medium',
                        'text-white/80 hover:text-white',
                        'hover:border-white/25',
                        'transition-colors duration-200',
                        'focus:outline-none',
                        'focus-visible:ring-2',
                        'focus-visible:ring-cyan-400',
                      ].join(' ')}
                    >
                      Sign In
                    </button>

                    <Button
                      type="button"
                      size="sm"
                      onClick={goToSignup}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-2">
              <button
                type="button"
                onClick={goHome}
                aria-label="DigiCon home"
                className={[
                  'rounded-lg',
                  'focus:outline-none',
                  'focus-visible:ring-2',
                  'focus-visible:ring-cyan-400',
                  'focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-navy-980',
                ].join(' ')}
              >
                <Logo size={36} />
              </button>

              <p className="mt-4 max-w-sm font-body text-sm leading-6 text-white/45">
                Your professional identity. Your connections.
                Your network.
              </p>

              <p className="mt-4 max-w-sm font-body text-sm leading-6 text-white/35">
                Create your professional identity, share it
                instantly, capture the people you meet, and turn
                everyday networking into relationships you can
                actually manage.
              </p>

              <button
                type="button"
                onClick={goToSignup}
                className={[
                  'mt-6 inline-flex items-center gap-2',
                  'font-ui text-sm font-semibold',
                  'text-cyan-400 hover:text-cyan-300',
                  'transition-colors duration-200',
                  'focus:outline-none',
                  'focus-visible:ring-2',
                  'focus-visible:ring-cyan-400',
                  'focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-navy-980',
                  'rounded-sm',
                ].join(' ')}
              >
                Start building your network
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Product */}
            <FooterNavigation
              title="Product"
              links={PRODUCT_LINKS}
            />

            {/* Company */}
            <FooterNavigation
              title="Company"
              links={COMPANY_LINKS}
            />

            {/* Legal */}
            <FooterNavigation
              title="Legal"
              links={LEGAL_LINKS}
            />
          </div>

          {/* Bottom footer */}
          <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="font-body text-xs leading-5 text-white/30">
              © {new Date().getFullYear()} DigiCon. Digital
              Connections. All rights reserved.
            </p>

            <p className="font-body text-xs leading-5 text-white/30 md:text-right">
              Create. Share. Connect. Remember. Follow Up. Grow.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
