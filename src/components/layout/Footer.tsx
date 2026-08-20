import React from 'react';
import { ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
              <span className="bg-blue-600 text-white w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black">PUM</span>
              <span>PUM NMMS Champion</span>
            </div>
            <p className="text-sm text-slate-400 mb-3">{t('tagline')}</p>
            <p className="text-xs text-slate-500">{t('school_name')} — Dedicated NMMS Preparation Platform.</p>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold text-sm mb-3 uppercase tracking-wider">Official Resources & Evidence</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://www.dge.tn.gov.in/nmms_qb.html" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  <span>TN DGE Official Question Bank</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://dsel.education.gov.in/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  <span>Ministry of Education NMMS Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold text-sm mb-3 uppercase tracking-wider">Content Integrity Notice</h4>
            <div className="flex items-start gap-2 bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 text-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-slate-300">
                100% Verified Content. All questions and answers strictly reference official Tamil Nadu DGE examination question papers. AI content is strictly checked and verified by teachers before publishing.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PUM School, Echampatti. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with care for 8th-standard aspirants</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
