import React from 'react';

interface SiyaLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const SiyaLogo: React.FC<SiyaLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
}) => {
  const isLight = variant === 'light';
  const isGold = variant === 'gold';

  const textColor = isLight 
    ? 'text-[#fbfaf8]' 
    : isGold 
      ? 'text-[#c6a76c]' 
      : 'text-[#161514]';

  const subColor = isLight 
    ? 'text-[#a39e93]' 
    : isGold 
      ? 'text-[#e2caa0]' 
      : 'text-[#7d786d]';

  const emblemStroke = isLight 
    ? '#fbfaf8' 
    : isGold 
      ? '#c6a76c' 
      : '#161514';

  const sizeClasses = {
    sm: {
      wrap: 'gap-1',
      emblem: 'w-4 h-4 sm:w-5 sm:h-5',
      text: 'text-base sm:text-lg tracking-[0.22em] sm:tracking-[0.3em]',
      sub: 'text-[6px] sm:text-[7px] tracking-[0.2em] sm:tracking-[0.25em]',
    },
    md: {
      wrap: 'gap-0.5 sm:gap-1.5',
      emblem: 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7',
      text: 'text-lg sm:text-xl md:text-2xl tracking-[0.22em] sm:tracking-[0.3em] md:tracking-[0.35em]',
      sub: 'text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em]',
    },
    lg: {
      wrap: 'gap-1.5 sm:gap-2.5',
      emblem: 'w-8 h-8 sm:w-10 sm:h-10',
      text: 'text-2xl sm:text-3xl tracking-[0.3em] sm:tracking-[0.4em]',
      sub: 'text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.35em]',
    },
    xl: {
      wrap: 'gap-2 sm:gap-3',
      emblem: 'w-10 h-10 sm:w-14 sm:h-14',
      text: 'text-3xl sm:text-5xl tracking-[0.3em] sm:tracking-[0.45em]',
      sub: 'text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em]',
    },
  }[size];

  return (
    <div 
      id="siya-brand-logo" 
      className={`inline-flex flex-col items-center justify-center select-none cursor-pointer group flex-shrink-0 ${sizeClasses.wrap} ${className}`}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Custom Haute Couture Monogram Emblem */}
        <svg 
          viewBox="0 0 100 100" 
          className={`${sizeClasses.emblem} transition-transform duration-700 ease-out group-hover:rotate-180`}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Diamond Ring */}
          <rect 
            x="50" 
            y="7" 
            width="60.8" 
            height="60.8" 
            rx="2"
            transform="rotate(45 50 7)" 
            stroke={emblemStroke} 
            strokeWidth="1.2" 
            strokeOpacity="0.35"
          />
          {/* Stylized 'S' Silhouette with Couture Needle & Fluid Drapery Ribbon */}
          <path 
            d="M68 28C64 22 55 20 48 22C38 25 32 33 34 42C36 50 45 53 54 56C64 59 70 65 67 74C64 83 53 87 43 85C34 83 28 76 26 70" 
            stroke={emblemStroke} 
            strokeWidth="3.2" 
            strokeLinecap="round"
          />
          {/* Needle Eye accent */}
          <circle cx="50" cy="50" r="3" fill={emblemStroke} />
          <path 
            d="M50 15V85" 
            stroke={emblemStroke} 
            strokeWidth="1" 
            strokeDasharray="2 3" 
            strokeOpacity="0.5" 
          />
        </svg>

        {/* Brand Typographic Wordmark */}
        <span className={`font-editorial font-medium uppercase transition-colors duration-300 ${textColor} ${sizeClasses.text}`}>
          S I Y A
        </span>
      </div>

      {showSubtitle && (
        <span className={`font-sans uppercase font-medium transition-colors duration-300 ${subColor} ${sizeClasses.sub}`}>
          Couture &bull; Atelier
        </span>
      )}
    </div>
  );
};
