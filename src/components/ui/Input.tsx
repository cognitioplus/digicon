import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div>
      {label && <label className="label-field">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">{icon}</div>}
        <input
          className={`input-field ${icon ? 'pl-10' : ''} ${error ? 'border-error-500/50' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-error-400">{error}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div>
      {label && <label className="label-field">{label}</label>}
      <textarea
        className={`input-field resize-none ${error ? 'border-error-500/50' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error-400">{error}</p>}
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export function Select({ label, error, className = '', children, ...props }: SelectProps) {
  return (
    <div>
      {label && <label className="label-field">{label}</label>}
      <select
        className={`input-field appearance-none cursor-pointer ${error ? 'border-error-500/50' : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-error-400">{error}</p>}
    </div>
  );
}
