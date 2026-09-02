import { type ReactNode } from 'react';
import { Logo } from '@/components/ui/Logo';
import { navigateTo } from '@/hooks/useRouter';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-navy-980 bg-grid flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-8">
          <button onClick={() => navigateTo('/')}>
            <Logo size={56} />
          </button>
        </div>
        <div className="glass-strong rounded-2xl p-8">
          <h1 className="font-heading font-bold text-2xl text-white text-center mb-1">{title}</h1>
          <p className="text-white/50 font-body text-sm text-center mb-6">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
