import { type ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  accentColor?: string;
}

export function MetricCard({ label, value, icon, trend, trendValue, accentColor = 'text-cyan-400' }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="flex items-center justify-between">
        <span className="text-white/40 font-body text-xs uppercase tracking-wide">{label}</span>
        {icon && <span className={accentColor}>{icon}</span>}
      </div>
      <div className="flex items-end justify-between mt-1">
        <span className="font-heading font-bold text-2xl text-white">{value}</span>
        {trend && trendValue && (
          <div className={`flex items-center gap-0.5 text-xs font-ui ${trend === 'up' ? 'text-success-400' : trend === 'down' ? 'text-error-400' : 'text-white/40'}`}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  );
}
