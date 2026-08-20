import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { getConcepts, updateDailyMissionProgress } from '../../services/storage';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  ArrowLeft, Lightbulb, HelpCircle, 
  Sparkles, ArrowRight, RefreshCw, BookOpen 
} from 'lucide-react';

export const ConceptViewPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { language } = useLanguage();
  const { student, updateCurrentStudentXP } = useAuth();
  const navigate = useNavigate();

  const concepts = getConcepts(topicId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTryOption, setSelectedTryOption] = useState<number | null>(null);
  const [isTrySubmitted, setIsTrySubmitted] = useState(false);
  const [completedConcepts, setCompletedConcepts] = useState<Record<string, boolean>>({});

  const concept = concepts[currentIndex];

  if (!concept) {
    return (
      <EmptyState
        icon={BookOpen}
        title="No Concepts Found"
        description="Concepts for this topic are under academic verification."
        action={{ label: 'Back to Subjects', onClick: () => navigate('/learn') }}
      />
    );
  }

  const solved = concept.solved_question;

  const handleOptionSelect = (idx: number) => {
    if (!isTrySubmitted) {
      setSelectedTryOption(idx);
    }
  };

  const handleTrySubmit = () => {
    if (selectedTryOption === null) return;
    setIsTrySubmitted(true);

    if (student && solved && selectedTryOption === solved.correct_index) {
      if (!completedConcepts[concept.id]) {
        updateCurrentStudentXP(10);
        updateDailyMissionProgress(student.id, 'concept', 1);
        setCompletedConcepts(prev => ({ ...prev, [concept.id]: true }));
      }
    }
  };

  const handleResetTry = () => {
    setSelectedTryOption(null);
    setIsTrySubmitted(false);
  };

  const handleNextConcept = () => {
    if (currentIndex < concepts.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedTryOption(null);
      setIsTrySubmitted(false);
    }
  };

  const handlePrevConcept = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSelectedTryOption(null);
      setIsTrySubmitted(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
          Concept {currentIndex + 1} of {concepts.length}
        </div>
      </div>

      {/* Concept Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        
        {/* Title */}
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
            {concept.title_en}
          </h1>
          <p className="text-base font-bold text-blue-800 font-tamil mt-1">
            {concept.title_ta}
          </p>
        </div>

        {/* Explanation Section */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>English Explanation</span>
            </h3>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {concept.explanation_en}
            </p>
          </div>

          <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 font-tamil">
              <Lightbulb className="w-4 h-4 text-blue-600" />
              <span>தமிழ்ப் பாட விளக்கம்</span>
            </h3>
            <p className="text-sm text-slate-900 leading-relaxed font-semibold font-tamil">
              {concept.explanation_ta}
            </p>
          </div>

        </div>

        {/* Worked Example */}
        {(concept.example_en || concept.example_ta) && (
          <div className="p-5 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
              Worked Example / மாதிரி எடுத்துக்காட்டு
            </h3>
            <p className="text-xs font-semibold text-slate-800 whitespace-pre-line leading-relaxed">
              {concept.example_en}
            </p>
            {concept.example_ta && (
              <p className="text-xs font-bold text-slate-900 whitespace-pre-line leading-relaxed font-tamil">
                {concept.example_ta}
              </p>
            )}
          </div>
        )}

        {/* Interactive Try Yourself Solved Question */}
        {solved && (
          <div className="p-6 bg-indigo-50/50 border border-indigo-200 rounded-3xl space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {language === 'ta' ? 'நீங்களே முயலுங்கள்' : 'Try Yourself Question'}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full">
                +10 XP Reward
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-900">{solved.question_en}</p>
              <p className="text-xs font-bold text-indigo-950 font-tamil">{solved.question_ta}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {solved.options_en.map((optEn, idx) => {
                const optTa = solved.options_ta[idx];
                const isSelected = selectedTryOption === idx;
                const isCorrect = idx === solved.correct_index;

                let style = 'bg-white border-slate-200 hover:border-indigo-300 text-slate-900';
                if (isTrySubmitted) {
                  if (isCorrect) {
                    style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    style = 'bg-red-100 border-red-500 text-red-950 font-bold';
                  }
                } else if (isSelected) {
                  style = 'bg-indigo-100 border-indigo-600 text-indigo-950 font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${style}`}
                  >
                    <div className="font-semibold">{optEn}</div>
                    {optTa && optTa.trim() !== optEn.trim() && (
                      <div className="font-tamil font-bold opacity-90 mt-0.5">{optTa}</div>
                    )}
                  </button>
                );
              })}
            </div>

            {!isTrySubmitted ? (
              <button
                onClick={handleTrySubmit}
                disabled={selectedTryOption === null}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Check Answer
              </button>
            ) : (
              <div className="space-y-3 pt-2">
                <div className={`p-4 rounded-xl text-xs font-semibold ${
                  selectedTryOption === solved.correct_index 
                    ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                    : 'bg-red-100 text-red-950 border border-red-300'
                }`}>
                  <div className="font-bold mb-1">
                    {selectedTryOption === solved.correct_index ? 'Correct! +10 XP Earned 🎉' : 'Incorrect. Review explanation below:'}
                  </div>
                  <p className="mt-1 font-medium">{solved.explanation_en}</p>
                  <p className="mt-1 font-bold font-tamil">{solved.explanation_ta}</p>
                </div>

                <button
                  onClick={handleResetTry}
                  className="text-xs font-bold text-indigo-700 hover:underline flex items-center gap-1 cursor-pointer mx-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Try Question Again
                </button>
              </div>
            )}

          </div>
        )}

        {/* Bottom Concept Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={handlePrevConcept}
            disabled={currentIndex === 0}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Previous Concept
          </button>

          {currentIndex < concepts.length - 1 ? (
            <button
              onClick={handleNextConcept}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Concept</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => navigate('/practice')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Practice Questions</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
