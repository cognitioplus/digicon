import { type ReactNode } from 'react';
import { Loader2, Inbox, AlertCircle, CheckCircle2 } from 'lucide-react';

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      <p className="text-white/50 font-body text-sm">{message}</p>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4 text-white/30">
        {icon || <Inbox className="w-8 h-8" />}
      </div>
      <h3 className="font-heading font-semibold text-white text-lg mb-1">{title}</h3>
      {description && <p className="text-white/40 font-body text-sm max-w-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-error-500/10 border border-error-500/20 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-error-400" />
      </div>
      <h3 className="font-heading font-semibold text-white text-lg mb-1">Something went wrong</h3>
      <p className="text-white/40 font-body text-sm max-w-sm mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary text-sm">Try Again</button>
      )}
    </div>
  );
}

export function SuccessState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-success-500/10 border border-success-500/20 flex items-center justify-center mb-3">
        <CheckCircle2 className="w-7 h-7 text-success-400" />
      </div>
      <p className="text-white font-ui text-sm">{message}</p>
    </div>
  );
}
