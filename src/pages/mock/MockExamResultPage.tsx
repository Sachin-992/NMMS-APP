import React from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { getMockExams, getStudentExamAttempts, getTopics, getSubjects } from '../../services/storage';
import type { ExamAttempt, Topic, Subject } from '../../types';
import { Award, CheckCircle2, XCircle, ArrowRight, Sparkles, BookOpen, Clock, RotateCcw, Flame } from 'lucide-react';

export const MockExamResultPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const { language } = useLanguage();
  const { student } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const mockExams = getMockExams();
  const exam = mockExams.find(e => e.id === examId) || mockExams[0];
  const allTopics: Topic[] = getTopics();
  const subjects: Subject[] = getSubjects();

  // Get attempt from state or local storage
  const attempts = student ? getStudentExamAttempts(student.id) : [];
  const attempt: ExamAttempt | undefined = location.state?.attempt || attempts[0];

  if (!attempt) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No examination attempt recorded yet.</h2>
        <Link to="/mock-exams" className="bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl inline-block">
          View Mock Exams
        </Link>
      </div>
    );
  }

  const scorePct = Math.round((attempt.score / attempt.total_questions) * 100);
  const isPassed = scorePct >= (exam?.pass_percentage || 40);

  const correctCount = attempt.score;
  const incorrectCount = attempt.total_questions - correctCount;
  const topicAccuracy = attempt.detailed_analysis?.topic_accuracy || {};

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Hero Result Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl relative overflow-hidden ${
        isPassed 
          ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900' 
          : 'bg-gradient-to-br from-amber-600 via-orange-700 to-slate-900'
      }`}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-extrabold uppercase tracking-wider mb-3">
          <Award className="w-4 h-4" />
          <span>{isPassed ? 'Passed Examination 🎉' : 'Good Attempt — Revision Needed'}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
          {attempt.score} / {attempt.total_questions}
        </h1>

        <p className="text-lg font-bold opacity-90">
          Score: {scorePct}% Accuracy
        </p>

        <p className="text-xs text-slate-200 mt-2 font-medium">
          {language === 'ta'
            ? 'அதிகாரப்பூர்வ 45 நிமிட மாதிரித் தேர்வு வெற்றிகரமாக முடிந்தது.'
            : 'Completed official 45-minute NMMS examination simulation.'}
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
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-1 font-bold">
            <XCircle className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900">{incorrectCount}</div>
          <div className="text-xs text-slate-500 font-semibold">Incorrect</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-1 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900">+{attempt.score * 3} XP</div>
          <div className="text-xs text-slate-500 font-semibold">Reward Earned</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-1 font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {Math.floor(attempt.time_taken_seconds / 60)}m {attempt.time_taken_seconds % 60}s
          </div>
          <div className="text-xs text-slate-500 font-semibold">Time Used</div>
        </div>
      </div>

      {/* Topic-Wise Performance Breakdown Table */}
      {Object.keys(topicAccuracy).length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>Topic-Level Performance Breakdown</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">
              {Object.keys(topicAccuracy).length} Topics Assessed
            </span>
          </div>

          <div className="space-y-3">
            {Object.entries(topicAccuracy).map(([tId, rawValue]) => {
              const pctNum = typeof rawValue === 'number' ? rawValue : (rawValue as any)?.percentage ?? (rawValue as any)?.accuracy ?? 0;
              const topicObj = allTopics.find(t => t.id === tId);
              const subjectObj = topicObj ? subjects.find(s => s.id === topicObj.subject_id) : null;
              
              let statusLabel = 'Strong';
              let statusStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';

              if (pctNum < 60) {
                statusLabel = 'Needs Practice';
                statusStyle = 'bg-rose-50 text-rose-800 border-rose-200';
              } else if (pctNum < 80) {
                statusLabel = 'Improving';
                statusStyle = 'bg-amber-50 text-amber-800 border-amber-200';
              }

              return (
                <div 
                  key={tId}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {subjectObj && (
                        <span className="font-extrabold text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                          {subjectObj.code}
                        </span>
                      )}
                      <span className="font-extrabold text-slate-900 text-sm">
                        {language === 'ta' ? topicObj?.title_ta || tId : topicObj?.title_en || tId}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium">
                      {topicObj?.source_evidence || 'Official NMMS Syllabus Topic'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="font-black text-sm text-slate-900 block">{pctNum}%</span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${statusStyle}`}>
                        {statusLabel}
                      </span>
                    </div>

                    {/* Direct Action Links */}
                    <div className="flex items-center gap-1">
                      {subjectObj && (
                        <button
                          onClick={() => navigate(`/learn/${subjectObj.code}`)}
                          className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-lg transition-all cursor-pointer"
                          title="Revise Topic in Learn section"
                        >
                          Revise
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/practice?topicId=${tId}`)}
                        className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all cursor-pointer"
                        title="Practice questions for this topic"
                      >
                        Practice
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommended Action Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-4">
        <h3 className="font-extrabold text-white text-base flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span>Recommended Next Steps</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 font-medium">
            <span className="font-extrabold text-white block mb-1">1. Review Mistakes</span>
            <span>Check wrong answers in your <Link to="/mistakes" className="text-purple-400 font-bold underline">Mistake Book</Link>.</span>
          </div>

          <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 font-medium">
            <span className="font-extrabold text-white block mb-1">2. Target Weak Topics</span>
            <span>Re-read weak concepts under the <Link to="/learn" className="text-purple-400 font-bold underline">Learn</Link> section.</span>
          </div>

          <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 font-medium">
            <span className="font-extrabold text-white block mb-1">3. Next Simulation</span>
            <span>Attempt another mock exam to benchmark your speed.</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigate(`/mock/runner/${exam.id}`)}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Exam</span>
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Back to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
