import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { getMockExams, getStudentExamAttempts } from '../../services/storage';
import { EmptyState } from '../../components/ui/EmptyState';
import { Award, Clock, FileCheck, ArrowRight, Trophy, CheckCircle2 } from 'lucide-react';

export const MockExamListPage: React.FC = () => {
  const { language } = useLanguage();
  const { student } = useAuth();
  const navigate = useNavigate();

  const mockExams = getMockExams();
  const attempts = student ? getStudentExamAttempts(student.id) : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-7 h-7 text-purple-600" />
            <span>{language === 'ta' ? 'அதிகாரப்பூர்வ மாதிரித் தேர்வுகள்' : 'Official Mock Exams'}</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            {language === 'ta'
              ? 'அதிகாரப்பூர்வ 45 நிமிட மாதிரித் தேர்வு சூழல் (45 வினாக்கள் | 45 மதிப்பெண்).'
              : 'Authentic 45-minute timed NMMS examination simulations (45 Qs | 45 Marks).'}
          </p>
        </div>

        <button
          onClick={() => navigate('/mock/readiness')}
          className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Trophy className="w-4 h-4 text-indigo-600" />
          <span>Am I Ready? Status</span>
        </button>
      </div>

      {mockExams.length === 0 ? (
        <EmptyState
          icon={FileCheck}
          title="No Mock Exams Published"
          description="Official mock exams will appear here after academic publication."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {mockExams.map(exam => {
            const examAttempts = attempts.filter(a => a.mock_exam_id === exam.id);
            const bestScore = examAttempts.length > 0
              ? Math.max(...examAttempts.map(a => Math.round((a.score / a.total_questions) * 100)))
              : null;

            return (
              <div
                key={exam.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${
                      exam.type === 'MAT' 
                        ? 'bg-blue-100 text-blue-800' 
                        : exam.type === 'SAT' 
                        ? 'bg-indigo-100 text-indigo-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {exam.type}
                    </span>

                    <div className="flex items-center gap-1 text-xs text-slate-500 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{exam.duration_minutes} Mins</span>
                    </div>
                  </div>

                  <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
                    {language === 'ta' ? exam.title_ta : exam.title_en}
                  </h2>

                  <div className="flex items-center gap-4 text-xs text-slate-600 font-semibold pt-1">
                    <span>{exam.total_questions} Questions</span>
                    <span>•</span>
                    <span>Pass: {exam.pass_percentage}%</span>
                  </div>
                </div>

                {/* Best score or start button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  {bestScore !== null ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Best Score: {bestScore}%</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Not attempted yet</span>
                  )}

                  <button
                    onClick={() => navigate(`/mock/${exam.id}/exam`)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Start Exam</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
