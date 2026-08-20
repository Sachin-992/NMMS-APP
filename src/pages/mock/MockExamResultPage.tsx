import React from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { getMockExams, getStudentExamAttempts } from '../../services/storage';
import type { ExamAttempt } from '../../types';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Award, CheckCircle2, XCircle, ArrowRight, Sparkles, BookOpen, Clock, RotateCcw } from 'lucide-react';

export const MockExamResultPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const { language } = useLanguage();
  const { student } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const mockExams = getMockExams();
  const exam = mockExams.find(e => e.id === examId) || mockExams[0];

  // Get attempt from state or local storage
  const attempts = student ? getStudentExamAttempts(student.id) : [];
  const attempt: ExamAttempt | undefined = location.state?.attempt || attempts[0];

  if (!attempt) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No examination attempt recorded yet.</h2>
        <Link to="/mock" className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl inline-block">
          View Mock Exams
        </Link>
      </div>
    );
  }

  const scorePct = Math.round((attempt.score / attempt.total_questions) * 100);
  const isPassed = scorePct >= (exam?.pass_percentage || 40);

  const correctCount = attempt.score;
  const incorrectCount = attempt.total_questions - correctCount;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Hero Result Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl relative overflow-hidden ${
        isPassed 
          ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900' 
          : 'bg-gradient-to-br from-amber-600 via-orange-700 to-slate-900'
      }`}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-extrabold uppercase tracking-wider mb-3">
          <Award className="w-4 h-4" />
          <span>{isPassed ? 'Passed Examination' : 'Good Attempt — Needs Practice'}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
          {attempt.score} / {attempt.total_questions}
        </h1>

        <p className="text-lg font-bold opacity-90">
          Score: {scorePct}% Accuracy
        </p>

        <p className="text-xs text-slate-200 mt-2 font-medium">
          {language === 'ta'
            ? 'அதிகாரப்பூர்வ மாதிரித் தேர்வு வெற்றிகரமாக முடிந்தது.'
            : 'Completed official NMMS 90-minute examination simulation.'}
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-1 font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900">{correctCount}</div>
          <div className="text-xs text-slate-500 font-semibold">Correct</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-1 font-bold">
            <XCircle className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900">{incorrectCount}</div>
          <div className="text-xs text-slate-500 font-semibold">Incorrect</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-1 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900">+100 XP</div>
          <div className="text-xs text-slate-500 font-semibold">Reward Earned</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-1 font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {Math.floor(attempt.time_taken_seconds / 60)}m
          </div>
          <div className="text-xs text-slate-500 font-semibold">Time Spent</div>
        </div>

      </div>

      {/* MAT & SAT Split breakdown if available */}
      {(attempt.mat_score !== undefined || attempt.sat_score !== undefined) && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Subject Score Breakdown</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border rounded-2xl space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>MAT — Mental Ability</span>
                <span className="text-blue-700">{attempt.mat_score || 0} Correct</span>
              </div>
              <ProgressBar value={(attempt.mat_score || 0) * 10} color="blue" />
            </div>

            <div className="p-4 bg-slate-50 border rounded-2xl space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>SAT — Scholastic Aptitude</span>
                <span className="text-indigo-700">{attempt.sat_score || 0} Correct</span>
              </div>
              <ProgressBar value={(attempt.sat_score || 0) * 10} color="indigo" />
            </div>
          </div>
        </div>
      )}

      {/* Recommended Next Steps */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
        <h3 className="font-extrabold text-white text-base flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-400" />
          <span>Recommended Next Steps</span>
        </h3>

        <div className="space-y-2 text-xs text-slate-300">
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 font-medium">
            1. Review incorrect answers in your <Link to="/mistakes" className="text-purple-400 font-bold underline">Mistake Book</Link>.
          </div>
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 font-medium">
            2. Re-read weak concepts under the <Link to="/learn" className="text-purple-400 font-bold underline">Learn</Link> tab.
          </div>
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 font-medium">
            3. Attempt another formal mock simulation next week.
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => navigate(`/mock/${exam.id}/exam`)}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Exam</span>
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
