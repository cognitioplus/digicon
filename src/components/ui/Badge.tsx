import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function Badge({ children, color = 'bg-white/10 text-white/70 border-white/20', className = '' }: BadgeProps) {
  return (
    <span className={`status-badge border ${color} ${className}`}>
      {children}
    </span>
  );
}

interface GoldBadgeProps {
  children: ReactNode;
  className?: string;
}

export function GoldBadge({ children, className = '' }: GoldBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-ui font-semibold bg-gradient-to-r from-gold-400 to-gold-600 text-navy-980 ${className}`}>
      {children}
    </span>
  );
}
