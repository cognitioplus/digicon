import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'gold' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: 'bg-gradient-to-r from-electric-500 to-sky-500 text-white hover:from-electric-600 hover:to-sky-600 hover:shadow-lg hover:shadow-electric-500/25',
  secondary: 'glass text-white hover:bg-white/10',
  gold: 'bg-gradient-to-r from-gold-400 to-gold-600 text-navy-980 font-semibold hover:from-gold-500 hover:to-gold-700 hover:shadow-lg hover:shadow-gold-500/25',
  ghost: 'text-white/60 hover:text-white hover:bg-white/5',
  danger: 'bg-error-500/20 text-error-300 border border-error-500/30 hover:bg-error-500/30',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5',
  lg: 'px-6 py-3 text-lg',
};

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-ui font-medium rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
