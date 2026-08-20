import React from 'react';

interface ProgressBarProps {
  value: number; // 0–100
  max?: number;
  label?: string;
  labelRight?: string;
  color?: 'blue' | 'indigo' | 'emerald' | 'amber' | 'red' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  showPercent?: boolean;
  className?: string;
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-600',
  indigo: 'bg-indigo-600',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  purple: 'bg-purple-600',
};

const sizeMap: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  labelRight,
  color = 'blue',
  size = 'md',
  showPercent = false,
  className = '',
}) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const fill = colorMap[color] ?? 'bg-blue-600';
  const h = sizeMap[size] ?? 'h-2';

  return (
    <div className={`w-full ${className}`}>
      {(label || labelRight || showPercent) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs font-semibold text-slate-600">{label}</span>}
          <span className="text-xs font-bold text-slate-700 ml-auto">
            {labelRight ?? (showPercent ? `${Math.round(pct)}%` : undefined)}
          </span>
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${h}`}>
        <div
          className={`${fill} ${h} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
