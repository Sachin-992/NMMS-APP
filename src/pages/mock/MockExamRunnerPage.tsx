import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { getMockExams, getQuestions, saveExamAttempt, updateDailyMissionProgress } from '../../services/storage';
import type { Question, ExamAnswer, ExamAttempt } from '../../types';
import { Clock, ArrowLeft, ArrowRight, Bookmark, LayoutGrid, X } from 'lucide-react';

export const MockExamRunnerPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const { student, updateCurrentStudentXP } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const mockExams = getMockExams();
  const exam = mockExams.find(e => e.id === examId) || mockExams[0];

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ExamAnswer>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(90 * 60);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load published questions for exam
    const loaded = getQuestions({ verificationStatus: 'ALL' }).slice(0, exam?.total_questions || 90);
    setQuestions(loaded);
    setTimeLeftSeconds((exam?.duration_minutes || 90) * 60);

    // Initial answers map
    const initialMap: Record<string, ExamAnswer> = {};
    loaded.forEach(q => {
      initialMap[q.id] = {
        question_id: q.id,
        selected_option: null,
        marked_for_review: false,
        time_spent_seconds: 0
      };
    });
    setAnswers(initialMap);
  }, [examId]);

  // Timer countdown
  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeftSeconds]);

  const currentQ = questions[currentIndex];

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selected_option: prev[currentQ.id]?.selected_option === option ? null : option
      }
    }));
  };

  const handleToggleReview = () => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        marked_for_review: !prev[currentQ.id]?.marked_for_review
      }
    }));
  };

  const handleFinalSubmit = () => {
    if (!student || !exam || isSubmitting) return;
    setIsSubmitting(true);

    let score = 0;
    let matScore = 0;
    let satScore = 0;

    questions.forEach(q => {
      const ans = answers[q.id];
      if (ans && ans.selected_option === q.correct_option) {
        score += 1;
        if (q.subject_id === 'subj-mat') matScore += 1;
        else satScore += 1;
      }
    });

    const attempt: ExamAttempt = {
      id: `attempt-${Date.now()}`,
      student_id: student.id,
      mock_exam_id: exam.id,
      started_at: new Date(Date.now() - ((exam.duration_minutes * 60) - timeLeftSeconds) * 1000).toISOString(),
      completed_at: new Date().toISOString(),
      score: score,
      total_questions: questions.length,
      time_taken_seconds: (exam.duration_minutes * 60) - timeLeftSeconds,
      mat_score: matScore,
      sat_score: satScore,
      detailed_analysis: {
        topic_accuracy: {},
        strongest_topic: 'Mental Ability',
        weakest_topic: 'Civics'
      }
    };

    saveExamAttempt(attempt);
    updateCurrentStudentXP(100);
    updateDailyMissionProgress(student.id, 'revision', 5);

    navigate(`/mock/${exam.id}/result`, { state: { attempt } });
  };

  const answeredCount = Object.values(answers).filter(a => a.selected_option !== null).length;
  const reviewCount = Object.values(answers).filter(a => a.marked_for_review).length;

  return (
    <div className="exam-shell font-sans">
      
      {/* Exam Header */}
      <header className="bg-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="font-extrabold text-sm sm:text-base text-white">
            {language === 'ta' ? exam?.title_ta : exam?.title_en}
          </div>
          <span className="hidden sm:inline-block text-xs bg-slate-800 text-slate-300 font-bold px-2.5 py-0.5 rounded-full border border-slate-700">
            Q {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex items-center gap-1.5 bg-amber-950 text-amber-300 border border-amber-800 px-3 py-1 rounded-xl text-xs font-mono font-bold">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>

          {/* Palette button for mobile */}
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="lg:hidden p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-200 cursor-pointer"
            title="Question Palette"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Submit button */}
          <button
            onClick={handleFinalSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Submit Exam
          </button>
        </div>
      </header>

      {/* Exam Body: Split View Desktop, Single View Mobile */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Question Area (3 Cols Desktop) */}
        <div className="lg:col-span-3 space-y-6">
          
          {currentQ ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              
              {/* Question metadata header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs font-bold text-slate-500">
                <span>Question #{currentIndex + 1}</span>
                
                <button
                  onClick={handleToggleReview}
                  className={`flex items-center gap-1 px-3 py-1 rounded-xl transition-all cursor-pointer ${
                    answers[currentQ.id]?.marked_for_review
                      ? 'bg-amber-100 text-amber-800 border border-amber-300 font-extrabold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{answers[currentQ.id]?.marked_for_review ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>
              </div>

              {/* Question Text (Strictly NO answers/explanations during exam) */}
              <div className="space-y-3">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {currentQ.question_en}
                </h2>
                {currentQ.question_ta && currentQ.question_ta.trim() !== currentQ.question_en.trim() && (
                  <p className="text-base font-semibold text-blue-950 bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 font-tamil leading-relaxed">
                    {currentQ.question_ta}
                  </p>
                )}

                {currentQ.image_url && (
                  <div className="my-4 p-3 bg-slate-50 border border-slate-200 rounded-2xl flex justify-center">
                    <img src={currentQ.image_url} alt="Figure reasoning" className="max-h-48 rounded-lg" />
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(['A', 'B', 'C', 'D'] as const).map(key => {
                  const optEn = currentQ[`option_${key.toLowerCase()}_en` as keyof Question] as string;
                  const optTa = currentQ[`option_${key.toLowerCase()}_ta` as keyof Question] as string;
                  const isSelected = answers[currentQ.id]?.selected_option === key;

                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectOption(key)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-600 text-blue-950 ring-2 ring-blue-500/20 font-bold' 
                          : 'bg-slate-50 border-slate-200 hover:border-blue-300 text-slate-900'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-xl border font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300'
                      }`}>
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

              {/* Next/Prev Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentIndex === questions.length - 1}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : null}

        </div>

        {/* Question Palette Sidebar (Desktop) */}
        <div className="hidden lg:block space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 sticky top-20">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Question Navigator ({answeredCount}/{questions.length} Answered)
            </h3>

            {/* Grid Palette */}
            <div className="grid grid-cols-5 gap-2 max-h-[360px] overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const ans = answers[q.id];
                const isCurrent = idx === currentIndex;
                const isAnswered = ans?.selected_option !== null;
                const isMarked = ans?.marked_for_review;

                let style = 'bg-slate-100 text-slate-600 border-slate-200';
                if (isCurrent) style = 'bg-blue-600 text-white font-black ring-2 ring-blue-400';
                else if (isMarked) style = 'bg-amber-400 text-slate-950 font-bold border-amber-500';
                else if (isAnswered) style = 'bg-emerald-500 text-white font-bold border-emerald-600';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl border text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${style}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0" />
                <span>Marked for Review ({reviewCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-200 border shrink-0" />
                <span>Unanswered</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Question Palette Drawer (Mobile Slide-over) */}
      {isPaletteOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setIsPaletteOpen(false)} />
          <div className="drawer-panel p-6 space-y-4 max-h-[85vh]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">
                Question Navigator ({answeredCount}/{questions.length} Answered)
              </h3>
              <button onClick={() => setIsPaletteOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 max-h-[50vh] overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const ans = answers[q.id];
                const isCurrent = idx === currentIndex;
                const isAnswered = ans?.selected_option !== null;
                const isMarked = ans?.marked_for_review;

                let style = 'bg-slate-100 text-slate-600 border-slate-200';
                if (isCurrent) style = 'bg-blue-600 text-white font-black ring-2 ring-blue-400';
                else if (isMarked) style = 'bg-amber-400 text-slate-950 font-bold border-amber-500';
                else if (isAnswered) style = 'bg-emerald-500 text-white font-bold border-emerald-600';

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsPaletteOpen(false);
                    }}
                    className={`h-10 rounded-xl border text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${style}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

    </div>
  );
};
