import { type ReactNode } from 'react';
import { Crown, Lock } from 'lucide-react';
import { getPlanConfig } from '@/config/constants';
import type { Plan } from '@/types';

interface UpgradeGateProps {
  plan: Plan;
  feature: 'crm' | 'analytics' | 'landingPWA' | 'wallet' | 'imageExport' | 'cardLimit';
  children: ReactNode;
  onUpgrade?: () => void;
}

export function UpgradeGate({ plan, feature, children, onUpgrade }: UpgradeGateProps) {
  const config = getPlanConfig(plan);

  const hasFeature = () => {
    switch (feature) {
      case 'crm': return config.hasCRM;
      case 'analytics': return config.hasAnalytics;
      case 'landingPWA': return config.hasLandingPWA;
      case 'wallet': return config.hasWallet;
      case 'imageExport': return config.hasImageExport;
      case 'cardLimit': return true;
      default: return false;
    }
  };

  if (hasFeature()) return <>{children}</>;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4">
        <Crown className="w-8 h-8 text-gold-400" />
      </div>
      <h3 className="font-heading font-bold text-white text-xl mb-2">Premium Feature</h3>
      <p className="text-white/50 font-body text-sm max-w-md mb-6">
        This feature is available on higher plans. Upgrade to unlock {feature.replace(/([A-Z])/g, ' $1').toLowerCase()} and more.
      </p>
      {onUpgrade && (
        <button onClick={onUpgrade} className="btn-gold inline-flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Upgrade Now
        </button>
      )}
    </div>
  );
}
