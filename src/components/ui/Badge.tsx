import React from 'react';
import type { VerificationStatus } from '../../types';

type BadgeVariant = 
  | 'DRAFT' 
  | 'SOURCE_CHECK' 
  | 'TEACHER_REVIEW' 
  | 'VERIFIED' 
  | 'PUBLISHED'
  | 'ACTIVE'
  | 'INACTIVE'
  | 'OFFICIAL'
  | 'TENTATIVE'
  | 'NOT_ANNOUNCED'
  | 'EASY'
  | 'MEDIUM'
  | 'HARD';

const variantStyles: Record<string, string> = {
  DRAFT: 'bg-slate-100 text-slate-700 border-slate-200',
  SOURCE_CHECK: 'bg-amber-50 text-amber-700 border-amber-200',
  TEACHER_REVIEW: 'bg-blue-50 text-blue-700 border-blue-200',
  VERIFIED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  PUBLISHED: 'bg-green-100 text-green-800 border-green-300',
  ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  INACTIVE: 'bg-red-50 text-red-600 border-red-200',
  OFFICIAL: 'bg-blue-100 text-blue-800 border-blue-300',
  TENTATIVE: 'bg-amber-100 text-amber-800 border-amber-300',
  NOT_ANNOUNCED: 'bg-slate-100 text-slate-600 border-slate-200',
  EASY: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  MEDIUM: 'bg-amber-50 text-amber-700 border-amber-200',
  HARD: 'bg-red-50 text-red-700 border-red-200',
};

const variantDotColors: Record<string, string> = {
  DRAFT: 'bg-slate-400',
  SOURCE_CHECK: 'bg-amber-500',
  TEACHER_REVIEW: 'bg-blue-500',
  VERIFIED: 'bg-emerald-500',
  PUBLISHED: 'bg-green-600',
  ACTIVE: 'bg-emerald-500',
  INACTIVE: 'bg-red-500',
  OFFICIAL: 'bg-blue-600',
  TENTATIVE: 'bg-amber-600',
  NOT_ANNOUNCED: 'bg-slate-400',
  EASY: 'bg-emerald-500',
  MEDIUM: 'bg-amber-500',
  HARD: 'bg-red-500',
};

interface BadgeProps {
  variant: BadgeVariant | VerificationStatus | string;
  label?: string;
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, label, dot = false, className = '' }) => {
  const styles = variantStyles[variant] ?? 'bg-slate-100 text-slate-700 border-slate-200';
  const dotColor = variantDotColors[variant] ?? 'bg-slate-400';

  const displayLabel = label ?? variant.replace(/_/g, ' ');

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor} shrink-0`} />}
      {displayLabel}
    </span>
  );
};
