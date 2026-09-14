import React, { useState } from 'react';

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // e.g. 'aspect-[3/4]', 'aspect-square'
  objectFit?: 'cover' | 'contain';
  onClick?: () => void;
}

export const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[3/4]',
  objectFit = 'cover',
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // High-res fallback image if original link ever encounters network errors
  const fallbackSrc = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80';

  return (
    <div 
      className={`relative overflow-hidden bg-[#f4f2ec] ${aspectRatio} ${className}`}
      onClick={onClick}
    >
      {/* Luxury shimmer skeleton placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f4f2ec] text-[#a8a396]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
          <div className="relative z-10 flex flex-col items-center gap-1.5 opacity-60">
            <svg 
              className="w-6 h-6 animate-spin text-[#a8a396]" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="9" strokeOpacity="0.2" />
              <path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans">SIYA Atelier</span>
          </div>
        </div>
      )}

      {/* Actual Image with smooth fade-in */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full transition-all duration-700 ease-out ${
          objectFit === 'cover' ? 'object-cover' : 'object-contain'
        } ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
      />
    </div>
  );
};
