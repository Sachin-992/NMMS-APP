import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getOfficialPapers } from '../../services/storage';
import { OFFICIAL_DGE_PORTAL_URL } from '../../data/official_dge_papers';
import { ShieldCheck, ExternalLink, Filter, Info } from 'lucide-react';

export const OfficialPaperLibraryPage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const allPapers = getOfficialPapers();

  const filteredPapers = allPapers.filter(paper => {
    const matchSubject = selectedSubject === 'ALL' || paper.subject_code === selectedSubject || paper.subject_code === 'ALL';
    const matchYear = selectedYear === 'ALL' || paper.year.toString() === selectedYear;
    const matchType = selectedType === 'ALL' || paper.paper_type === selectedType;
    return matchSubject && matchYear && matchType;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-300 font-semibold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>TN DGE Authenticated Materials</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              {language === 'ta' ? 'அதிகாரப்பூர்வ வினாத்தாள்கள்' : 'Official Question Papers'}
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              {language === 'ta'
                ? 'தமிழ்நாடு அரசுத் தேர்வுகள் இயக்ககத்தின் உண்மையான NMMS வினாத்தாள்களுடன் பயிற்சி பெறுங்கள்.'
                : 'Practice with authentic NMMS question papers and model papers from the Tamil Nadu Directorate of Government Examinations.'}
            </p>
          </div>

          <a
            href={OFFICIAL_DGE_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-sm transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>DGE Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Filter Question Papers / வடிகட்டி</span>
          </h3>
          <span className="text-xs font-bold text-slate-500">
            {filteredPapers.length} Papers Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
          
          {/* Subject Filter */}
          <div>
            <label className="block text-slate-500 font-bold mb-1 text-[10px] uppercase tracking-wider">Subject / பாடம்</label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Subjects (அனைத்தும்)</option>
              <option value="MAT">MAT (மனத்திறன் தேர்வு)</option>
              <option value="SAT">SAT (படிப்புத் திறன்)</option>
              <option value="OMR">OMR Sheet</option>
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-slate-500 font-bold mb-1 text-[10px] uppercase tracking-wider">Year / ஆண்டு</label>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Years (அனைத்து ஆண்டுகள்)</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-slate-500 font-bold mb-1 text-[10px] uppercase tracking-wider">Paper Type / வகை</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-bold focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Types (அனைத்தும்)</option>
              <option value="OFFICIAL_PAPER">Official Question Paper</option>
              <option value="MODEL_PAPER">Model Question Paper</option>
              <option value="OMR_SHEET">OMR Sheet</option>
            </select>
          </div>

        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPapers.map(paper => (
          <div key={paper.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Official DGE Source</span>
                </span>

                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                  {paper.year}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base leading-snug">{paper.title_en}</h3>
                <div className="text-xs font-bold text-blue-900 font-tamil mt-0.5">{paper.title_ta}</div>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {language === 'ta' ? paper.description_ta : paper.description_en}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <a
                href={paper.original_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>View PDF ↗</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <button
                onClick={() => navigate(`/classroom/${paper.id}`)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{language === 'ta' ? 'வகுப்பறையைத் திற →' : 'Open Classroom →'}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Official Notice Footer */}
      <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="font-medium">
          Source Attribution: All question papers displayed in this library are published by the <strong>Tamil Nadu Directorate of Government Examinations (TN DGE)</strong>. Original document attribution and PDFs are preserved. Answer keys are strictly omitted to encourage authentic problem solving.
        </p>
      </div>

    </div>
  );
};
