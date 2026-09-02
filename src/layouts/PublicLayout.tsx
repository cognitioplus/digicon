import { type ReactNode } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { navigateTo } from '@/hooks/useRouter';
import { useAuth } from '@/hooks/useAuth';

interface PublicLayoutProps {
  children: ReactNode;
  activePath: string;
}

const PUBLIC_NAV = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/#features' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
  { label: 'Customers', path: '/customers' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
];

export function PublicLayout({ children, activePath }: PublicLayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-navy-980 text-white">
      <header className="sticky top-0 z-40 glass-nav border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
         <button
  type="button"
  aria-label="DigiCon home"
  onClick={() => navigateTo('/')}
  className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
>
  <Logo size={36} />
</button>
          <nav className="hidden md:flex items-center gap-6">
            {PUBLIC_NAV.map((item) => (
              <button
                key={item.path}
                onClick={() => navigateTo(item.path)}
                className={`text-sm font-ui font-medium transition-colors ${
                  activePath === item.path ? 'text-cyan-400' : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <Button size="sm" onClick={() => navigateTo('/dashboard')}>Dashboard</Button>
            ) : (
              <>
                <button onClick={() => navigateTo('/login')} className="text-sm font-ui font-medium text-white/60 hover:text-white hidden sm:block">
                  Sign In
                </button>
                <Button size="sm" onClick={() => navigateTo('/signup')}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <Logo size={36} />
              <p className="mt-3 text-sm text-white/40 font-body max-w-xs">
                Your professional identity. Your connections. Your network.
              </p>
            </div>
            <div>
              <h4 className="font-ui font-semibold text-sm text-white mb-3">Product</h4>
              <div className="space-y-2">
                <button onClick={() => navigateTo('/pricing')} className="block text-sm text-white/40 hover:text-white/70">Pricing</button>
                <button onClick={() => navigateTo('/#features')} className="block text-sm text-white/40 hover:text-white/70">Features</button>
                <button onClick={() => navigateTo('/blog')} className="block text-sm text-white/40 hover:text-white/70">Blog</button>
              </div>
            </div>
            <div>
              <h4 className="font-ui font-semibold text-sm text-white mb-3">Company</h4>
              <div className="space-y-2">
                <button onClick={() => navigateTo('/about')} className="block text-sm text-white/40 hover:text-white/70">About</button>
                <button onClick={() => navigateTo('/customers')} className="block text-sm text-white/40 hover:text-white/70">Customers</button>
                <button onClick={() => navigateTo('/support')} className="block text-sm text-white/40 hover:text-white/70">Support</button>
              </div>
            </div>
            <div>
              <h4 className="font-ui font-semibold text-sm text-white mb-3">Legal</h4>
              <div className="space-y-2">
                <button onClick={() => navigateTo('/terms')} className="block text-sm text-white/40 hover:text-white/70">Terms of Service</button>
                <button onClick={() => navigateTo('/privacy')} className="block text-sm text-white/40 hover:text-white/70">Privacy Policy</button>
                <button onClick={() => navigateTo('/cookies')} className="block text-sm text-white/40 hover:text-white/70">Cookie Policy</button>
                <button onClick={() => navigateTo('/accessibility')} className="block text-sm text-white/40 hover:text-white/70">Accessibility</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30 font-body">© 2026 DigiCon. Digital Connections. All rights reserved.</p>
            <p className="text-xs text-white/30 font-body">Create. Share. Connect. Remember. Follow Up. Grow.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
