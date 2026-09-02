import { type ReactNode, useState } from 'react';
import { Home, CreditCard, Users, CheckSquare, User as UserIcon, LogOut, Settings, BarChart3, Crown, Menu, X, LayoutGrid, FileText, Shield } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { navigateTo } from '@/hooks/useRouter';
import { getPlanConfig } from '@/config/constants';

interface AppLayoutProps {
  children: ReactNode;
  activePath: string;
}

const NAV_ITEMS = [
  { label: 'Home', icon: Home, path: '/dashboard' },
  { label: 'Cards', icon: CreditCard, path: '/cards' },
  { label: 'Network', icon: Users, path: '/contacts' },
  { label: 'Follow Up', icon: CheckSquare, path: '/follow-ups' },
  { label: 'Profile', icon: UserIcon, path: '/profile' },
];

const SIDEBAR_ITEMS = [
  { label: 'Dashboard', icon: Home, path: '/dashboard' },
  { label: 'My Cards', icon: CreditCard, path: '/cards' },
  { label: 'Contacts', icon: Users, path: '/contacts' },
  { label: 'Follow Ups', icon: CheckSquare, path: '/follow-ups' },
  { label: 'CRM Pipeline', icon: LayoutGrid, path: '/crm' },
  { label: 'Analytics', icon: BarChart3, path: '/analytics' },
  { label: 'Profile', icon: UserIcon, path: '/profile' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export function AppLayout({ children, activePath }: AppLayoutProps) {
  const { profile, signOut } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const planConfig = getPlanConfig(profile?.plan || 'free');
  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';

  const handleSignOut = async () => {
    await signOut();
    navigateTo('/');
  };

  const isActive = (path: string) => activePath === path || (path !== '/dashboard' && activePath.startsWith(path));

  return (
    <div className="min-h-screen bg-navy-980 text-white">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 glass-nav flex-col z-30">
        <div className="p-5 border-b border-white/10">
          <button onClick={() => navigateTo('/dashboard')}>
            <Logo size={36} />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-ui font-medium text-sm transition-all ${
                isActive(item.path)
                  ? 'bg-electric-500/15 text-cyan-300 border border-electric-500/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}
          {isAdmin && (
            <button
              onClick={() => navigateTo('/admin')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-ui font-medium text-sm transition-all ${
                isActive('/admin')
                  ? 'bg-gold-500/15 text-gold-300 border border-gold-500/20'
                  : 'text-gold-400/60 hover:text-gold-300 hover:bg-gold-500/10'
              }`}
            >
              <Shield className="w-4 h-4 flex-shrink-0" />
              Admin Panel
            </button>
          )}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="glass-card p-3 flex items-center gap-3">
            <Avatar src={profile?.avatar_url} name={profile?.full_name || 'User'} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-ui font-medium text-white truncate">{profile?.full_name || 'User'}</p>
              <p className="text-xs text-white/40 truncate">{planConfig.name} Plan</p>
            </div>
            <button onClick={handleSignOut} className="text-white/40 hover:text-error-400 p-1" aria-label="Sign out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
          {profile?.plan === 'free' && (
            <button
              onClick={() => navigateTo('/pricing')}
              className="w-full mt-2 btn-gold text-sm flex items-center justify-center gap-2"
            >
              <Crown className="w-3.5 h-3.5" />
              Upgrade
            </button>
          )}
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 glass-nav px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigateTo('/dashboard')}>
          <Logo size={32} showText={false} />
        </button>
        <div className="flex items-center gap-2">
          {profile?.plan === 'free' && (
            <button onClick={() => navigateTo('/pricing')} className="text-gold-400 text-sm font-ui font-medium">
              Upgrade
            </button>
          )}
          <button onClick={() => setDrawerOpen(true)} className="p-2 text-white/60" aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-navy-980/80 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 glass-strong p-5 overflow-y-auto animate-slide-down">
            <div className="flex items-center justify-between mb-6">
              <Logo size={32} />
              <button onClick={() => setDrawerOpen(false)} className="text-white/40 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="glass-card p-3 flex items-center gap-3 mb-4">
              <Avatar src={profile?.avatar_url} name={profile?.full_name || 'User'} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-ui font-medium text-white truncate">{profile?.full_name || 'User'}</p>
                <p className="text-xs text-white/40 truncate">{planConfig.name} Plan</p>
              </div>
            </div>
            <nav className="space-y-1">
              {SIDEBAR_ITEMS.map((item) => (
                <button
                  key={item.path}
                  onClick={() => { navigateTo(item.path); setDrawerOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-ui font-medium text-sm transition-all ${
                    isActive(item.path) ? 'bg-electric-500/15 text-cyan-300' : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
              {isAdmin && (
                <button
                  onClick={() => { navigateTo('/admin'); setDrawerOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-ui font-medium text-sm text-gold-400/80 hover:text-gold-300 hover:bg-gold-500/10"
                >
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-ui font-medium text-sm text-error-400/70 hover:text-error-400 hover:bg-error-500/10"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="lg:ml-64 pb-20 lg:pb-8 min-h-screen">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 glass-nav border-t border-white/10">
        <div className="flex items-center justify-around px-2 py-1.5 safe-area-bottom">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`nav-item ${isActive(item.path) ? 'nav-item-active' : 'nav-item-inactive'}`}
              aria-label={item.label}
            >
              <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-cyan-400' : ''}`} />
              <span className="text-[10px] font-ui font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
