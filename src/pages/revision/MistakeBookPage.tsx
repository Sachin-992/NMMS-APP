import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getMistakes, markMistakeResolved, recordMistake, 
  updateDailyMissionProgress 
} from '../../services/storage';
import type { MistakeItem, Question } from '../../types';
import { EmptyState } from '../../components/ui/EmptyState';
import { ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react';

export const MistakeBookPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { student, updateCurrentStudentXP } = useAuth();
  
  const [mistakes, setMistakes] = useState<MistakeItem[]>(() => 
    student ? getMistakes(student.id) : []
  );

  const [activeRetryMistake, setActiveRetryMistake] = useState<MistakeItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  if (!student) return null;

  const pendingMistakes = mistakes.filter(m => !m.resolved && m.question);

  const handleStartRetry = (item: MistakeItem) => {
    setActiveRetryMistake(item);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const handleOptionSelect = (option: 'A' | 'B' | 'C' | 'D') => {
    if (!isAnswerSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmitRetry = () => {
    if (!selectedOption || !activeRetryMistake || !activeRetryMistake.question) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === activeRetryMistake.question.correct_option;

    if (isCorrect) {
      markMistakeResolved(student.id, activeRetryMistake.question_id);
      updateCurrentStudentXP(5);
      updateDailyMissionProgress(student.id, 'revision', 1);

      // Refresh list
      setMistakes(getMistakes(student.id));
    } else {
      recordMistake(student.id, activeRetryMistake.question_id, selectedOption);
    }
  };

  const handleCloseRetry = () => {
    setActiveRetryMistake(null);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-7 h-7 text-amber-600" />
            <span>{t('mistakes')}</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            {language === 'ta'
              ? 'நீங்கள் தவறாக அளித்த வினாக்கள் தானாக இங்கே சேகரிக்கப்படுகின்றன. மீண்டும் முயன்று சரிசெய்க!'
              : 'Interactive personal notebook capturing incorrect practice & mock exam answers.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs bg-amber-50 text-amber-800 font-extrabold px-3.5 py-1.5 rounded-full border border-amber-200">
            {pendingMistakes.length} Pending
          </span>
        </div>
      </div>

      {/* Main Container */}
      {activeRetryMistake && activeRetryMistake.question ? (
        /* Interactive Retry Mode */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Interactive Retry Mode (+5 XP)
            </span>
            <button
              onClick={handleCloseRetry}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
              {activeRetryMistake.question.question_en}
            </h2>
            {activeRetryMistake.question.question_ta && activeRetryMistake.question.question_ta.trim() !== activeRetryMistake.question.question_en.trim() && (
              <p className="text-base font-semibold text-blue-950 bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 font-tamil leading-relaxed">
                {activeRetryMistake.question.question_ta}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {(['A', 'B', 'C', 'D'] as const).map(key => {
              const optEn = activeRetryMistake.question![`option_${key.toLowerCase()}_en` as keyof Question] as string;
              const optTa = activeRetryMistake.question![`option_${key.toLowerCase()}_ta` as keyof Question] as string;
              const isSelected = selectedOption === key;
              const isCorrect = key === activeRetryMistake.question!.correct_option;

              let style = 'bg-slate-50 border-slate-200 hover:border-blue-400 text-slate-900';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected) {
                  style = 'bg-red-100 border-red-500 text-red-950 font-bold';
                }
              } else if (isSelected) {
                style = 'bg-blue-50 border-blue-600 text-blue-900 font-bold ring-2 ring-blue-500/20';
              }

              return (
                <button
                  key={key}
                  onClick={() => handleOptionSelect(key)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${style}`}
                >
                  <span className="w-7 h-7 rounded-xl bg-white border font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-2xs">
                    {key}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{optEn}</div>
                    {optTa && optTa.trim() !== optEn.trim() && (
                      <div className="text-xs opacity-90 font-bold mt-0.5 font-tamil">{optTa}</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Submit / Close Controls */}
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitRetry}
              disabled={!selectedOption}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl shadow-md transition-all text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Retry</span>
            </button>
          ) : (
            <div className="space-y-4 pt-2">
              <div className={`p-4 rounded-2xl text-xs font-semibold ${
                selectedOption === activeRetryMistake.question.correct_option
                  ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                  : 'bg-red-50 text-red-950 border border-red-200'
              }`}>
                <div className="font-extrabold text-sm mb-1">
                  {selectedOption === activeRetryMistake.question.correct_option 
                    ? '🎉 Resolved & Removed from Mistake Book! +5 XP' 
                    : 'Incorrect. Review explanation below:'}
                </div>
                <p className="mt-1 font-medium">{activeRetryMistake.question.explanation_en}</p>
                <p className="mt-1 font-bold font-tamil">{activeRetryMistake.question.explanation_ta}</p>
              </div>

              <button
                onClick={handleCloseRetry}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Back to Mistake List
              </button>
            </div>
          )}

        </div>
      ) : pendingMistakes.length === 0 ? (
        <EmptyState
          icon={CheckCircle2}
          title="No Pending Mistakes!"
          description="Awesome job! Every mistake has been reviewed and resolved."
        />
      ) : (
        <div className="space-y-3">
          {pendingMistakes.map(item => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                    {item.attempt_count} Attempts
                  </span>
                  <span className="text-xs text-slate-400">
                    Last tried: {new Date(item.last_attempted_at).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-900 truncate">
                  {item.question?.question_en}
                </p>
                <p className="text-xs font-bold text-blue-900 font-tamil truncate">
                  {item.question?.question_ta}
                </p>
              </div>

              <button
                onClick={() => handleStartRetry(item)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('retry_mistake')}</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
