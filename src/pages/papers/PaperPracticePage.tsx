import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getOfficialPapers, getPaperQuestions } from '../../services/storage';
import type { OfficialPaper, PaperQuestion } from '../../types';
import { 
  ArrowLeft, ExternalLink, FileText, 
  ChevronLeft, ChevronRight
} from 'lucide-react';

export const PaperPracticePage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [paper, setPaper] = useState<OfficialPaper | null>(null);
  const [questions, setQuestions] = useState<PaperQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!paperId) return;
    const all = getOfficialPapers();
    const found = all.find(p => p.id === paperId);
    if (found) {
      setPaper(found);
      const qList = getPaperQuestions(paperId);
      setQuestions(qList);
    }
  }, [paperId]);

  if (!paper) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Paper not found</h2>
        <button
          onClick={() => navigate('/official-papers')}
          className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
        >
          Back to Paper Library
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  const handleSelectOption = (qId: string, opt: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/official-papers')}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Official DGE Paper
              </span>
              <span className="text-xs font-bold text-slate-500">{paper.year}</span>
            </div>
            <h1 className="text-lg font-extrabold text-slate-900 leading-tight mt-0.5">
              {language === 'ta' ? paper.title_ta : paper.title_en}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={paper.original_pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Original PDF</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => navigate(`/classroom/${paper.id}`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{language === 'ta' ? 'வகுப்பறையைத் திற →' : 'Open Classroom →'}</span>
          </button>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-extrabold text-slate-800 text-base">Questions Under Verification</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            The questions for this official paper are currently undergoing admin/teacher verification against the original PDF.
          </p>
          <a
            href={paper.original_pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
          >
            <span>View Original DGE PDF</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Question Display Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            
            {/* Question Top Info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="font-mono font-black text-blue-700 text-base">
                Question {currentQ.question_number} / {questions.length}
              </span>

              {currentQ.source_page && (
                <span className="text-xs text-slate-400 font-semibold">
                  Source Page: {currentQ.source_page}
                </span>
              )}
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                {currentQ.question_en}
              </div>
              <div className="text-sm sm:text-base font-bold text-blue-950 font-tamil leading-relaxed whitespace-pre-line">
                {currentQ.question_ta}
              </div>
            </div>

            {/* Question Image (if figure question) */}
            {currentQ.question_image && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <img
                  src={currentQ.question_image}
                  alt={`Official Question ${currentQ.question_number}`}
                  className="max-h-64 object-contain mx-auto"
                />
              </div>
            )}

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { key: 'A', en: currentQ.option_a_en, ta: currentQ.option_a_ta },
                { key: 'B', en: currentQ.option_b_en, ta: currentQ.option_b_ta },
                { key: 'C', en: currentQ.option_c_en, ta: currentQ.option_c_ta },
                { key: 'D', en: currentQ.option_d_en, ta: currentQ.option_d_ta },
              ].map(opt => {
                const isSelected = selectedAnswers[currentQ.id] === opt.key;

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(currentQ.id, opt.key)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-600 border-blue-700 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-white text-blue-700' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {opt.key}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold">{opt.en}</div>
                      {opt.ta && opt.ta.trim() !== opt.en.trim() && (
                        <div className={`text-xs font-bold font-tamil mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-600'}`}>
                          {opt.ta}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-2xl font-bold text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Question</span>
            </button>

            <span className="text-xs font-bold text-slate-500 font-mono">
              {currentIndex + 1} of {questions.length}
            </span>

            <button
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-2xl font-bold text-xs hover:bg-blue-700 disabled:opacity-40 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Question Navigator Grid */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-3">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
              Question Navigator Grid
            </h4>
            <div className="flex flex-wrap gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = !!selectedAnswers[q.id];

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-9 h-9 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm scale-105'
                        : isAnswered
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {q.question_number}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
