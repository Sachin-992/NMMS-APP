import React from 'react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtitle?: boolean;
  className?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  showText = true,
  showSubtitle = true,
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-20 h-20 text-2xl'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* SVG Crest Logo */}
      <div className={`relative ${sizeMap[size]} shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 p-0.5 shadow-lg border border-amber-400/40 flex items-center justify-center`}>
        <svg viewBox="0 0 128 128" className={`${iconSizes[size]} text-amber-300 drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 24 L104 42 L64 60 L24 42 Z" fill="currentColor" />
          <path d="M40 50.5 V68 C40 78 88 78 88 68 V50.5" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M96 45.5 V70" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
          <circle cx="96" cy="72" r="4" fill="#FDE047" />
          <text x="64" y="104" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="26" fill="#FFFFFF" letterSpacing="1">NMMS</text>
        </svg>
      </div>

      {showText && (
        <div className="text-left">
          <div className="font-black text-slate-900 leading-tight tracking-tight flex items-center gap-1.5">
            <span>PUM NMMS Champion</span>
          </div>
          {showSubtitle && (
            <div className="text-xs text-slate-500 font-bold leading-tight font-tamil mt-0.5">
              PUM School, Echampatti
            </div>
          )}
        </div>
      )}
    </div>
  );
};
