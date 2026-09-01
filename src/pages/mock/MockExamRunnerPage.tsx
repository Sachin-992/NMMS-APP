import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  getMockExams, saveExamAttempt, updateDailyMissionProgress,
  getActiveMockState, saveActiveMockState, clearActiveMockState
} from '../../services/storage';
import type { Question, ExamAttempt, MockExam } from '../../types';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  Clock, ArrowLeft, ArrowRight, Bookmark, LayoutGrid, X, 
  ShieldCheck, Play, Award, FileCheck, CheckCircle2
} from 'lucide-react';

export const MockExamRunnerPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const { student, updateCurrentStudentXP } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const mockExams = getMockExams();
  const exam: MockExam | undefined = mockExams.find(e => e.id === examId) || mockExams[0];

  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | null>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(45 * 60);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Load questions and restore active state from localStorage
  useEffect(() => {
    if (!exam) return;

    const examQuestions = exam.questions && exam.questions.length > 0 ? exam.questions : [];
    setQuestions(examQuestions);

    if (student) {
      const savedState = getActiveMockState(exam.id, student.id);
      if (savedState && savedState.started) {
        setHasStarted(true);
        setCurrentIndex(savedState.currentIndex || 0);
        setAnswers(savedState.answers || {});
        setMarkedForReview(savedState.markedForReview || {});
        setTimeLeftSeconds(savedState.timeLeftSeconds ?? exam.duration_minutes * 60);
      } else {
        setTimeLeftSeconds(exam.duration_minutes * 60);
      }
    } else {
      setTimeLeftSeconds(exam.duration_minutes * 60);
    }
  }, [examId, student]);

  // Persist state to localStorage while exam is active
  useEffect(() => {
    if (hasStarted && student && exam) {
      saveActiveMockState(exam.id, student.id, {
        started: true,
        currentIndex,
        answers,
        markedForReview,
        timeLeftSeconds
      });
    }
  }, [hasStarted, currentIndex, answers, markedForReview, timeLeftSeconds, exam, student]);

  // Real Countdown Timer
  useEffect(() => {
    if (!hasStarted || isSubmitting) return;

    if (timeLeftSeconds <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, timeLeftSeconds, isSubmitting]);

  if (!exam) {
    return (
      <EmptyState
        icon={FileCheck}
        title="Mock Exam Not Found"
        description="The requested mock examination is unavailable."
        action={{ label: 'Back to Mock Exams', onClick: () => navigate('/mock-exams') }}
      />
    );
  }

  const currentQ = questions[currentIndex];

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    setHasStarted(true);
  };

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: prev[currentQ.id] === option ? null : option
    }));
  };

  const handleClearAnswer = () => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: null
    }));
  };

  const handleToggleReview = () => {
    if (!currentQ) return;
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleFinalSubmit = () => {
    if (!student || !exam || isSubmitting) return;
    setIsSubmitting(true);

    let score = 0;
    let matScore = 0;
    let satScore = 0;

    const topicAccuracy: Record<string, { total: number; correct: number }> = {};

    questions.forEach(q => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correct_option;

      if (isCorrect) {
        score += 1;
        if (q.subject_id === 'subj-mat') matScore += 1;
        else satScore += 1;
      }

      if (q.topic_id) {
        if (!topicAccuracy[q.topic_id]) {
          topicAccuracy[q.topic_id] = { total: 0, correct: 0 };
        }
        topicAccuracy[q.topic_id].total += 1;
        if (isCorrect) topicAccuracy[q.topic_id].correct += 1;
      }
    });

    const timeSpent = Math.max(1, (exam.duration_minutes * 60) - timeLeftSeconds);
    const passed = score >= Math.ceil((exam.pass_percentage / 100) * exam.total_questions);

    // Compute weakest topic
    let weakestTopic = 'General Logic';
    let lowestPct = 100;
    Object.entries(topicAccuracy).forEach(([tId, stat]) => {
      const pct = (stat.correct / stat.total) * 100;
      if (pct < lowestPct) {
        lowestPct = pct;
        weakestTopic = tId;
      }
    });

    const attempt: ExamAttempt = {
      id: `attempt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      mock_exam_id: exam.id,
      student_id: student.id,
      attempted_at: new Date().toISOString(),
      score,
      total_questions: exam.total_questions,
      time_taken_seconds: timeSpent,
      passed,
      answers: questions.map(q => ({
        question_id: q.id,
        selected_option: answers[q.id] || null,
        marked_for_review: !!markedForReview[q.id],
        time_spent_seconds: 60
      })),
      detailed_analysis: {
        mat_score: matScore,
        sat_score: satScore,
        weakest_topic: weakestTopic,
        topic_accuracy: Object.fromEntries(
          Object.entries(topicAccuracy).map(([k, v]) => [k, Math.round((v.correct / v.total) * 100)])
        )
      }
    };

    saveExamAttempt(attempt);
    clearActiveMockState(exam.id, student.id);
    updateCurrentStudentXP(score * 3);
    updateDailyMissionProgress(student.id, 'revision', 5);

    navigate(`/mock-exam/result/${exam.id}`, { state: { attempt } });
  };

  // Pre-Exam Instruction Screen Modal
  if (!hasStarted) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                Official NMMS Practice Simulation
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {language === 'ta' ? exam.title_ta : exam.title_en}
              </h1>
            </div>
          </div>

          {/* Exam Specs Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <div>
              <div className="text-xs text-slate-500 font-extrabold uppercase">Questions</div>
              <div className="text-lg font-black text-slate-900">{exam.total_questions} Qs</div>
            </div>
            <div className="border-x border-slate-200">
              <div className="text-xs text-slate-500 font-extrabold uppercase">Time Allowed</div>
              <div className="text-lg font-black text-indigo-600">{exam.duration_minutes} Mins</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-extrabold uppercase">Total Marks</div>
              <div className="text-lg font-black text-emerald-600">{exam.total_questions} Marks</div>
            </div>
          </div>

          {/* Instructions List */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Examination Rules & Instructions:</span>
            </h3>

            <ul className="space-y-2 text-xs font-medium text-slate-700 leading-relaxed list-disc list-inside bg-amber-50/60 border border-amber-200 p-4 rounded-2xl">
              <li>Each question carries <strong>1 mark</strong>. There is <strong>no negative marking</strong>.</li>
              <li>You can move freely between questions using the Question Palette or Next/Previous controls.</li>
              <li>Use the <strong>"Mark for Review"</strong> button to flag difficult questions for checking later.</li>
              <li>The 45-minute countdown timer runs continuously. If page refreshes, your progress is automatically saved.</li>
              <li>Answers are hidden during the examination and will be revealed upon final submission.</li>
              <li>When the timer reaches 00:00, your exam will be automatically submitted.</li>
            </ul>
          </div>

          {/* Start CTA */}
          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => navigate('/mock-exams')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Cancel & Exit
            </button>

            <button
              onClick={handleStartExam}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Examination Now</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Answer Statistics for Question Palette
  const answeredCount = Object.values(answers).filter(v => v !== null).length;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;

  // Question Palette Component (reused both fixed inline & mobile overlay)
  const PaletteContent = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-indigo-600" />
          <h3 className="font-extrabold text-slate-900 text-base">Question Palette</h3>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold p-3 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="text-emerald-700">
          <div className="text-base font-black">{answeredCount}</div>
          <div>Answered</div>
        </div>
        <div className="text-slate-500 border-x border-slate-200">
          <div className="text-base font-black">{questions.length - answeredCount}</div>
          <div>Left</div>
        </div>
        <div className="text-purple-700">
          <div className="text-base font-black">{reviewCount}</div>
          <div>Reviewed</div>
        </div>
      </div>

      {/* Color Legend */}
      <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-600 inline-block"></span>
          <span>Reviewed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-white border-2 border-indigo-600 inline-block"></span>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-200 inline-block"></span>
          <span>Not Answered</span>
        </div>
      </div>

      {/* Palette Buttons Grid (1 to 45) */}
      <div className="grid grid-cols-5 gap-2 max-h-[340px] overflow-y-auto pr-1">
        {questions.map((q, idx) => {
          const isAns = answers[q.id] !== null && answers[q.id] !== undefined;
          const isRev = !!markedForReview[q.id];
          const isCurr = idx === currentIndex;

          let btnBg = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200';
          if (isAns && isRev) btnBg = 'bg-purple-600 text-white font-extrabold ring-2 ring-emerald-400';
          else if (isAns) btnBg = 'bg-emerald-600 text-white font-extrabold';
          else if (isRev) btnBg = 'bg-purple-600 text-white font-extrabold';

          return (
            <button
              key={q.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsMobilePaletteOpen(false);
              }}
              className={`h-9 rounded-xl text-xs font-extrabold flex items-center justify-center transition-all cursor-pointer ${btnBg} ${
                isCurr ? 'ring-3 ring-indigo-600 shadow-md scale-105 z-10' : ''
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleFinalSubmit}
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>Submit Examination</span>
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-20 relative">
      
      {/* Top Header Bar */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-3xl flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase bg-white/20 px-2 py-0.5 rounded-md">
              {exam.type} Mock Exam
            </span>
            <h1 className="text-sm sm:text-base font-extrabold truncate max-w-[200px] sm:max-w-md mt-0.5">
              {language === 'ta' ? exam.title_ta : exam.title_en}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Palette Toggle Button (visible only on small screens < lg) */}
          <button
            onClick={() => setIsMobilePaletteOpen(true)}
            className="lg:hidden px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Palette</span>
          </button>

          {/* Timer Pill */}
          <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 border font-mono text-sm sm:text-base font-black ${
            timeLeftSeconds < 300 
              ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse' 
              : 'bg-white/10 border-white/20 text-white'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>

          <button
            onClick={handleFinalSubmit}
            className="hidden sm:block px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout (Question on Left, FIXED Palette on Right on lg+) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Question Card (Col-span 7 or 8) */}
        <div className="lg:col-span-7 xl:col-span-8">
          {currentQ && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
              
              {/* Question Metadata Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold bg-indigo-600 text-white px-3 py-1 rounded-full">
                    Question {currentIndex + 1} of {questions.length}
                  </span>

                  {markedForReview[currentQ.id] && (
                    <span className="font-extrabold bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full border border-purple-200 flex items-center gap-1">
                      <Bookmark className="w-3 h-3 text-purple-600 fill-purple-600" />
                      <span>Marked for Review</span>
                    </span>
                  )}
                </div>

                <button
                  onClick={handleToggleReview}
                  className={`font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1 ${
                    markedForReview[currentQ.id]
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{markedForReview[currentQ.id] ? 'Unmark' : 'Mark for Review'}</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                  {currentQ.question_en}
                </h2>
                {currentQ.question_ta && (
                  <p className="text-sm font-bold text-indigo-950 font-tamil leading-relaxed bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
                    {currentQ.question_ta}
                  </p>
                )}
              </div>

              {/* Options List */}
              <div className="grid grid-cols-1 gap-3">
                {(['A', 'B', 'C', 'D'] as const).map(optionKey => {
                  const optionTextEn = currentQ[`option_${optionKey.toLowerCase()}_en` as keyof Question] as string;
                  const optionTextTa = currentQ[`option_${optionKey.toLowerCase()}_ta` as keyof Question] as string;
                  
                  const isSelected = answers[currentQ.id] === optionKey;

                  return (
                    <button
                      key={optionKey}
                      onClick={() => handleSelectOption(optionKey)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                        isSelected ? 'bg-white text-indigo-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {optionKey}
                      </span>

                      <div className="flex-1 space-y-0.5">
                        <p className="text-sm font-semibold">{optionTextEn}</p>
                        {optionTextTa && optionTextTa !== optionTextEn && (
                          <p className={`text-xs font-medium font-tamil ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                            {optionTextTa}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Navigation & Clear Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold">
                <button
                  onClick={handleClearAnswer}
                  disabled={!answers[currentQ.id]}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-600 rounded-xl transition-all cursor-pointer"
                >
                  Clear Answer
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    disabled={currentIndex === questions.length - 1}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-extrabold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: FIXED QUESTION PALETTE ON DESKTOP (Col-span 5 or 4) */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
            <PaletteContent />
          </div>
        </div>

      </div>

      {/* Mobile Drawer (Only for small screens < lg) */}
      {isMobilePaletteOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end">
          <div className="bg-white w-full max-w-xs h-full p-6 space-y-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2">
              <span className="font-extrabold text-xs text-slate-500 uppercase">Exam Navigation</span>
              <button
                onClick={() => setIsMobilePaletteOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <PaletteContent />
          </div>
        </div>
      )}

    </div>
  );
};
