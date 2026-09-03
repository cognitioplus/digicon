interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 40, showText = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="https://cognitioplus.github.io/digicon/public/assets/images/favicon.svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="digicon-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="digicon-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        {/* Outer ring */}
        <circle cx="50" cy="50" r="44" stroke="url(#digicon-blue)" strokeWidth="3" fill="none" opacity="0.6" />
        {/* Inner ring */}
        <circle cx="50" cy="50" r="32" stroke="url(#digicon-cyan)" strokeWidth="2.5" fill="none" opacity="0.8" />
        {/* Connection nodes */}
        <circle cx="50" cy="6" r="4" fill="#22d3ee" />
        <circle cx="94" cy="50" r="4" fill="#0ea5e9" />
        <circle cx="50" cy="94" r="4" fill="#2563eb" />
        <circle cx="6" cy="50" r="4" fill="#22d3ee" />
        {/* Central D */}
        <path
          d="M 38 28 L 38 72 L 52 72 C 65 72 72 62 72 50 C 72 38 65 28 52 28 L 38 28 Z M 47 37 L 47 63 L 51 63 C 58 63 62 57 62 50 C 62 43 58 37 51 37 L 47 37 Z"
          fill="url(#digicon-cyan)"
        />
      </svg>
      {showText && (
        <span className="font-heading font-bold text-xl text-white tracking-tight">
          Digi<span className="gradient-text">Con</span>
        </span>
      )}
    </div>
  );
}
