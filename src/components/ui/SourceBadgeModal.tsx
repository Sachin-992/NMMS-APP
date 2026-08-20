import React, { useState } from 'react';
import type { OfficialSource } from '../../types';
import { ShieldCheck, ExternalLink, X, Info } from 'lucide-react';

import type { GuideSourceType } from '../../types';

interface SourceBadgeModalProps {
  source?: OfficialSource;
  sourceType?: GuideSourceType;
  label?: string;
  className?: string;
}

export const SourceBadgeModal: React.FC<SourceBadgeModalProps> = ({ source, sourceType, label, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Styling based on sourceType
  const getBadgeStyle = () => {
    switch (sourceType) {
      case 'CURRENT_NOTIFICATION':
        return 'text-blue-800 bg-blue-50 border-blue-300 hover:bg-blue-100';
      case 'PREVIOUS_PAPER_PATTERN':
        return 'text-indigo-800 bg-indigo-50 border-indigo-300 hover:bg-indigo-100';
      case 'OFFICIAL_RULE':
        return 'text-emerald-800 bg-emerald-50 border-emerald-300 hover:bg-emerald-100';
      case 'RECOMMENDED_STRATEGY':
        return 'text-amber-800 bg-amber-50 border-amber-300 hover:bg-amber-100';
      case 'UNCONFIRMED':
      default:
        return 'text-slate-600 bg-slate-100 border-slate-300';
    }
  };

  const defaultLabel = () => {
    switch (sourceType) {
      case 'CURRENT_NOTIFICATION':
        return '✓ 2026–27 Official Notification';
      case 'PREVIOUS_PAPER_PATTERN':
        return '✓ Previous-Year Official Paper Pattern';
      case 'OFFICIAL_RULE':
        return '⚠️ Important Official Rule';
      case 'RECOMMENDED_STRATEGY':
        return '💡 Recommended Strategy';
      default:
        return label || (source ? `Official Source (${source.document_year})` : 'Not confirmed in current source');
    }
  };

  if (!source && !sourceType) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
        <Info className="w-3 h-3" />
        <span>{label || 'Not confirmed in available official source'}</span>
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => source && setIsOpen(true)}
        className={`inline-flex items-center gap-1 text-[11px] font-extrabold border px-2.5 py-1 rounded-full transition-colors ${
          source ? 'cursor-pointer' : 'cursor-default'
        } ${getBadgeStyle()} ${className}`}
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>{label || defaultLabel()}</span>
      </button>

      {isOpen && source && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-slate-200 relative">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Verified Official Source</h3>
                  <div className="text-[11px] text-slate-500 font-semibold">{source.organization}</div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">Document Title</span>
                <p className="font-bold text-slate-900 mt-0.5">{source.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block">Year</span>
                  <span className="font-bold text-slate-800">{source.document_year}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block">Type</span>
                  <span className="font-bold text-slate-800">{source.document_type.replace(/_/g, ' ')}</span>
                </div>
                {source.page_reference && (
                  <div className="col-span-2 pt-1 border-t border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 block">Page Reference</span>
                    <span className="font-bold text-slate-800">{source.page_reference}</span>
                  </div>
                )}
              </div>

              {source.notes && (
                <div className="text-slate-600 font-medium leading-relaxed bg-blue-50/70 p-3 rounded-xl border border-blue-100">
                  {source.notes}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-slate-100">
              <span className="text-[10px] text-slate-400 font-semibold">
                Last Verified: {new Date(source.retrieved_at).toLocaleDateString()}
              </span>

              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  <span>Official URL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
