import { type ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DrawerProps {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
  defaultOpen?: boolean;
}

export function Drawer({ label, children, icon, defaultOpen = false }: DrawerProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-2.5">
          {icon && <span className="text-cyan-400">{icon}</span>}
          <span className="font-ui font-medium text-white">{label}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 animate-slide-down">
          {children}
        </div>
      )}
    </div>
  );
}
