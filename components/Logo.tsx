'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  customLogoUrl?: string;
  customTitle?: string;
  customTagline?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  customLogoUrl,
  customTitle,
  customTagline,
}) => {
  const iconSizes = {
    sm: 44,
    md: 56,
    lg: 72,
  };

  const titleSizes = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
  };

  const logoSrc = customLogoUrl || '/assets/aistudio/___________Tricolour_News_Logo__1__1507f5db.png';
  const siteTitle = customTitle || 'నేటి భారతం';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      {/* Official Emblem Logo */}
      <div className="relative shrink-0 flex items-center justify-center rounded-full overflow-hidden bg-white shadow-md ring-2 ring-amber-400/90 p-0.5">
        <Image
          src={logoSrc}
          alt={`${siteTitle} లోగో`}
          width={iconSizes[size]}
          height={iconSizes[size]}
          className="rounded-full drop-shadow-xs object-cover"
          priority
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight text-red-800 ${titleSizes[size]} drop-shadow-xs font-serif`}
          >
            {siteTitle}
          </span>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-300">
            NEWS
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[11px] sm:text-xs font-bold text-slate-700 tracking-wider uppercase">
            NETI BHARATHAM
          </span>
          {showTagline && (
            <>
              <span className="w-1 h-1 rounded-full bg-red-600" />
              <span className="hidden sm:inline text-[11px] font-medium text-red-700">
                {customTagline || 'ప్రజా గొంతుక • సత్య నివేదిక'}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
