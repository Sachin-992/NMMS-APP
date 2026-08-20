import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = '' }) => (
  <div className={`skeleton rounded-lg ${className}`} aria-hidden="true" />
);

export const SkeletonCard: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3" aria-hidden="true">
    <div className="flex items-center gap-3">
      <SkeletonLoader className="w-10 h-10 rounded-xl" />
      <div className="flex-1 space-y-2">
        <SkeletonLoader className="h-4 w-3/4" />
        <SkeletonLoader className="h-3 w-1/2" />
      </div>
    </div>
    {Array.from({ length: lines - 1 }, (_, i) => (
      <SkeletonLoader key={i} className={`h-3 ${i === lines - 2 ? 'w-2/3' : 'w-full'}`} />
    ))}
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; cols?: number }> = ({ rows = 5, cols = 4 }) => (
  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm" aria-hidden="true">
    {/* Header */}
    <div className="p-4 bg-slate-50 border-b border-slate-200 flex gap-4">
      {Array.from({ length: cols }, (_, i) => (
        <SkeletonLoader key={i} className="h-4 flex-1" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }, (_, r) => (
      <div key={r} className="p-4 border-b border-slate-100 flex gap-4 last:border-0">
        {Array.from({ length: cols }, (_, c) => (
          <SkeletonLoader key={c} className={`h-4 ${c === 1 ? 'flex-[2]' : 'flex-1'}`} />
        ))}
      </div>
    ))}
  </div>
);
