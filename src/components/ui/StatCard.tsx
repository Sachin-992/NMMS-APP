import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendText?: string;
  dark?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-50',
  trend,
  trendText,
  dark = false,
}) => {
  const trendColor = trend === 'up'
    ? 'text-emerald-600'
    : trend === 'down'
    ? 'text-red-500'
    : 'text-slate-500';

  if (dark) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</span>
          <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
        </div>
        <div className="text-3xl font-black text-white tracking-tight">{value}</div>
        {(subtitle || trendText) && (
          <div className={`text-xs mt-1 font-semibold ${trendText ? trendColor : 'text-slate-400'}`}>
            {trendText || subtitle}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
        <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
      </div>
      <div className="text-2xl font-black text-slate-900 tracking-tight">{value}</div>
      {(subtitle || trendText) && (
        <div className={`text-xs mt-1 font-semibold ${trendText ? trendColor : 'text-slate-500'}`}>
          {trendText || subtitle}
        </div>
      )}
    </div>
  );
};
