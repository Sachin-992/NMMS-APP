import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getQuestions, getSubjects, recordMistake, 
  updateDailyMissionProgress 
} from '../../services/storage';
import type { Question } from '../../types';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  CheckCircle2, XCircle, ArrowRight, ShieldCheck, 
  Sparkles, HelpCircle, FileText, Brain
} from 'lucide-react';

export const PracticePage: React.FC = () => {
  const { t, language } = useLanguage();
  const { student, updateCurrentStudentXP } = useAuth();
  
  const subjects = getSubjects();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('ALL');
  const [pyqOnly, setPyqOnly] = useState<boolean>(false);
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [scoreCount, setScoreCount] = useState<number>(0);

  useEffect(() => {
    const loaded = getQuestions({
      subjectId: selectedSubjectId === 'ALL' ? undefined : selectedSubjectId,
      pyqOnly: pyqOnly
    });
    setQuestions(loaded);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  }, [selectedSubjectId, pyqOnly]);

  const currentQ = questions[currentIndex];

  const handleOptionSelect = (option: 'A' | 'B' | 'C' | 'D') => {
    if (!isAnswerSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !currentQ || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOption === currentQ.correct_option;

    if (isCorrect) {
      setScoreCount(prev => prev + 1);
      if (student) {
        updateCurrentStudentXP(2);
        updateDailyMissionProgress(student.id, 'practice', 1);
      }
    } else {
      if (student) {
        recordMistake(student.id, currentQ.id, selectedOption);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Brain className="w-7 h-7 text-indigo-600" />
            <span>{t('practice')}</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            {language === 'ta'
              ? 'அரசு NMMS வினாத்தாளின் அதிகாரப்பூர்வ மாதிரிகள் மற்றும் முந்தைய ஆண்டு வினாக்கள்.'
              : 'Relaxed practice session with immediate explanations & Tamil support.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs bg-emerald-50 text-emerald-800 font-extrabold px-3 py-1.5 rounded-full border border-emerald-200">
            Score: {scoreCount} Correct
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        
        {/* Subject Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            onClick={() => setSelectedSubjectId('ALL')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedSubjectId === 'ALL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Subjects
          </button>
          {subjects.map(subj => (
            <button
              key={subj.id}
              onClick={() => setSelectedSubjectId(subj.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedSubjectId === subj.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {subj.code}
            </button>
          ))}
        </div>

        {/* PYQ Filter Toggle */}
        <button
          onClick={() => setPyqOnly(!pyqOnly)}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
            pyqOnly
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
              : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Previous Year Qs Only</span>
        </button>

      </div>

      {/* Main Question Card */}
      {currentQ ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          
          {/* Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                {currentQ.difficulty}
              </span>
            </div>

            {/* Official Source Evidence Badge */}
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentQ.source_name} ({currentQ.source_year})</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
              {currentQ.question_en}
            </h2>
            {currentQ.question_ta && currentQ.question_ta.trim() !== currentQ.question_en.trim() && (
              <p className="text-base font-semibold text-blue-950 bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 font-tamil leading-relaxed">
                {currentQ.question_ta}
              </p>
            )}

            {/* Image Question handling */}
            {currentQ.image_url && (
              <div className="my-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl flex justify-center">
                <img src={currentQ.image_url} alt="Figure reasoning" className="max-h-48 rounded-lg" />
              </div>
            )}
          </div>

          {/* Options Grid: Full width on mobile, 2-col on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {(['A', 'B', 'C', 'D'] as const).map(key => {
              const optEn = currentQ[`option_${key.toLowerCase()}_en` as keyof Question] as string;
              const optTa = currentQ[`option_${key.toLowerCase()}_ta` as keyof Question] as string;
              const isSelected = selectedOption === key;
              const isCorrect = key === currentQ.correct_option;

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
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between cursor-pointer ${style}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white border font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-2xs">
                      {key}
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{optEn}</div>
                      {optTa && optTa.trim() !== optEn.trim() && (
                        <div className="text-xs opacity-90 font-bold mt-0.5 font-tamil">{optTa}</div>
                      )}
                    </div>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submit / Next Controls */}
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl shadow-md transition-all text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Answer</span>
            </button>
          ) : (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              
              {/* Answer Feedback Banner */}
              <div className={`p-4 rounded-2xl border text-sm leading-relaxed ${
                selectedOption === currentQ.correct_option 
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-200' 
                  : 'bg-amber-50 text-amber-950 border-amber-200'
              }`}>
                <div className="font-extrabold text-base mb-1.5 flex items-center gap-2">
                  {selectedOption === currentQ.correct_option ? (
                    <>
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span>{t('correct')}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-amber-600" />
                      <span>Saved to Mistake Book for Revision</span>
                    </>
                  )}
                </div>

                <div className="space-y-2 mt-2">
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-600 block">Explanation (English)</span>
                    <p className="text-xs font-medium">{currentQ.explanation_en}</p>
                  </div>
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-600 block">விளக்கம் (தமிழ்)</span>
                    <p className="text-xs font-semibold font-tamil">{currentQ.explanation_ta}</p>
                  </div>
                </div>
              </div>

              {/* Next Question Button */}
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-md transition-all text-base flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t('next_question')}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <div className="p-4 bg-blue-50 text-blue-900 rounded-2xl text-center font-bold text-sm">
                  🎉 Session Finished! Excellent effort. Select another subject to keep practicing.
                </div>
              )}

            </div>
          )}

        </div>
      ) : (
        <EmptyState
          icon={HelpCircle}
          title="No questions found matching your filter"
          description="Try selecting 'All Subjects' or clearing the PYQ filter."
        />
      )}

    </div>
  );
};
