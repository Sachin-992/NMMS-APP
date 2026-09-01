import React from 'react';
import { getStudentExamAttempts, getMistakes, getTopics } from '../../services/storage';
import type { Student } from '../../types';
import { 
  X, Award, Flame, CheckCircle2, 
  XCircle, Clock, Brain, ShieldAlert 
} from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';

interface StudentDrillDownModalProps {
  student: Student | null;
  onClose: () => void;
}

export const StudentDrillDownModal: React.FC<StudentDrillDownModalProps> = ({ student, onClose }) => {
  if (!student) return null;

  const attempts = getStudentExamAttempts(student.id);
  const mistakes = getMistakes(student.id);
  const allTopics = getTopics();

  // Aggregate student stats across all attempts
  let totalAttempted = 0;
  let totalCorrect = 0;
  let matAttempted = 0;
  let matCorrect = 0;
  let satMathAttempted = 0;
  let satMathCorrect = 0;
  let satSciAttempted = 0;
  let satSciCorrect = 0;
  let satSocAttempted = 0;
  let satSocCorrect = 0;

  attempts.forEach(att => {
    totalAttempted += att.total_questions;
    totalCorrect += att.score;

    if (att.detailed_analysis?.topic_accuracy) {
      Object.entries(att.detailed_analysis.topic_accuracy).forEach(([topicId, acc]) => {
        const topic = allTopics.find(t => t.id === topicId);
        const subjId = topic?.subject_id || '';
        const Qs = acc.total || 0;
        const correct = acc.correct || 0;

        if (subjId === 'subj-mat') {
          matAttempted += Qs;
          matCorrect += correct;
        } else if (subjId === 'subj-math') {
          satMathAttempted += Qs;
          satMathCorrect += correct;
        } else if (subjId === 'subj-science') {
          satSciAttempted += Qs;
          satSciCorrect += correct;
        } else if (subjId === 'subj-social') {
          satSocAttempted += Qs;
          satSocCorrect += correct;
        }
      });
    }
  });

  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const matAccuracy = matAttempted > 0 ? Math.round((matCorrect / matAttempted) * 100) : 0;
  const satMathAccuracy = satMathAttempted > 0 ? Math.round((satMathCorrect / satMathAttempted) * 100) : 0;
  const satSciAccuracy = satSciAttempted > 0 ? Math.round((satSciCorrect / satSciAttempted) * 100) : 0;
  const satSocAccuracy = satSocAttempted > 0 ? Math.round((satSocCorrect / satSocAttempted) * 100) : 0;

  // Identify weak & strong topics
  const unresolvedMistakeTopicIds = new Set(mistakes.filter(m => !m.resolved).map(m => m.question_id));
  const weakTopics = allTopics.filter(t => unresolvedMistakeTopicIds.has(t.id)).slice(0, 4);
  const strongTopics = allTopics.filter(t => !unresolvedMistakeTopicIds.has(t.id)).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white rounded-t-3xl flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold">{student.name}</h2>
                <span className="text-[10px] font-extrabold bg-purple-500/30 border border-purple-400/40 text-purple-200 px-2 py-0.5 rounded-md">
                  Section: {student.class_section}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Student ID: {student.student_id || student.id} • Last Active: {student.last_active_date || 'Today'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Level & XP</div>
              <div className="text-lg font-extrabold text-purple-600 mt-1 flex items-center justify-center gap-1">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Lvl {student.level} ({student.xp} XP)</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Accuracy</div>
              <div className="text-lg font-extrabold text-blue-600 mt-1">
                {overallAccuracy}%
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daily Streak</div>
              <div className="text-lg font-extrabold text-amber-600 mt-1 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{student.streak_days} Days</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mock Exams</div>
              <div className="text-lg font-extrabold text-emerald-600 mt-1">
                {attempts.length} Taken
              </div>
            </div>
          </div>

          {/* Subject Accuracy Gauges */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-blue-600" />
              <span>Subject Performance Breakdown</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Mental Ability (MAT)</span>
                  <span className="text-blue-600">{matAccuracy}%</span>
                </div>
                <ProgressBar value={matAccuracy} color="blue" size="sm" />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>SAT — Mathematics</span>
                  <span className="text-indigo-600">{satMathAccuracy}%</span>
                </div>
                <ProgressBar value={satMathAccuracy} color="indigo" size="sm" />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>SAT — Science</span>
                  <span className="text-emerald-600">{satSciAccuracy}%</span>
                </div>
                <ProgressBar value={satSciAccuracy} color="emerald" size="sm" />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>SAT — Social Science</span>
                  <span className="text-amber-600">{satSocAccuracy}%</span>
                </div>
                <ProgressBar value={satSocAccuracy} color="amber" size="sm" />
              </div>
            </div>
          </div>

          {/* Weak & Strong Topics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Weak Topics */}
            <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-2xl space-y-2">
              <h4 className="text-xs font-extrabold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Weak Areas & Unresolved Mistakes</span>
              </h4>
              {weakTopics.length === 0 ? (
                <p className="text-xs text-rose-700 font-medium">No weak topics flagged. Great performance!</p>
              ) : (
                <ul className="space-y-1.5 text-xs text-rose-950 font-medium">
                  {weakTopics.map(t => (
                    <li key={t.id} className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-rose-200/80">
                      <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{t.title_en}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Strong Topics */}
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2">
              <h4 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Strong Mastery Topics</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                {strongTopics.map(t => (
                  <li key={t.id} className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-emerald-200/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{t.title_en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mock Exam History */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Mock Exam Attempt History</span>
            </h3>

            {attempts.length === 0 ? (
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xs text-slate-500">
                No mock exam attempts recorded yet.
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {attempts.map(att => {
                  const isPassed = (att.score / att.total_questions) >= 0.4;
                  return (
                    <div key={att.id} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="font-extrabold text-slate-800">{att.mock_exam_id}</div>
                        <div className="text-slate-500 font-medium">{new Date(att.completed_at || att.attempted_at || Date.now()).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-purple-700 text-sm">
                          {att.score} / {att.total_questions} ({Math.round((att.score / att.total_questions) * 100)}%)
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {isPassed ? 'PASSED' : 'NEEDS PRACTICE'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-3xl text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Close Student Profile
          </button>
        </div>

      </div>
    </div>
  );
};
