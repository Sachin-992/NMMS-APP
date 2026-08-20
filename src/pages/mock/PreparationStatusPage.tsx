import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { getStudentExamAttempts, getMistakes } from '../../services/storage';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Trophy, Award, ShieldAlert, Flame, ArrowRight } from 'lucide-react';

export const PreparationStatusPage: React.FC = () => {
  const { student } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  if (!student) return null;

  const attempts = getStudentExamAttempts(student.id);
  const mistakes = getMistakes(student.id).filter(m => !m.resolved);

  // Calculate readiness metrics
  const avgMockScore = attempts.length > 0
    ? Math.round(attempts.reduce((sum, a) => sum + ((a.score / a.total_questions) * 100), 0) / attempts.length)
    : 0;

  const mistakeResolutionScore = Math.max(0, 100 - (mistakes.length * 10));
  const consistencyScore = Math.min(100, student.streak_days * 15);

  const overallReadiness = Math.round((avgMockScore * 0.5) + (mistakeResolutionScore * 0.3) + (consistencyScore * 0.2));

  let readinessBadge = 'Getting Ready';
  let badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
  if (overallReadiness >= 75) {
    readinessBadge = 'NMMS Ready! 🎉';
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  } else if (overallReadiness >= 50) {
    readinessBadge = 'Good Progress';
    badgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Trophy className="w-7 h-7 text-amber-500" />
          <span>{language === 'ta' ? 'NMMS தயார்நிலை மதிப்பீடு' : 'Am I Ready for NMMS?'}</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500 font-medium">
          {language === 'ta'
            ? 'உங்கள் மாதிரித் தேர்வுகள், பிழைகள் தீர்ப்பு மற்றும் படிப்புத் தொடர்ச்சி அடிப்படையிலான தயார்நிலை.'
            : 'Readiness evaluation calculated from mock exams, mistake book resolution, and daily study consistency.'}
        </p>
      </div>

      {/* Hero Readiness Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4 border border-indigo-800/50">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-black border ${badgeColor}`}>
          {readinessBadge}
        </span>

        <div className="text-5xl sm:text-6xl font-black text-amber-300 tracking-tight">
          {overallReadiness}%
        </div>

        <p className="text-sm font-bold text-slate-200">
          Overall NMMS Examination Readiness Rating
        </p>

        <ProgressBar value={overallReadiness} color="amber" size="lg" className="max-w-md mx-auto pt-2" />
      </div>

      {/* 3 Preparation Pillars */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <h3 className="font-extrabold text-slate-900 text-base">Preparation Pillars</h3>

        <div className="space-y-4">
          
          <div className="p-4 bg-slate-50 border rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-800">
                <Award className="w-4 h-4 text-purple-600" />
                <span>Mock Exam Accuracy ({attempts.length} attempts)</span>
              </span>
              <span className="text-purple-700">{avgMockScore}%</span>
            </div>
            <ProgressBar value={avgMockScore} color="purple" />
          </div>

          <div className="p-4 bg-slate-50 border rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-800">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Mistake Book Resolution ({mistakes.length} pending)</span>
              </span>
              <span className="text-amber-700">{mistakeResolutionScore}%</span>
            </div>
            <ProgressBar value={mistakeResolutionScore} color="amber" />
          </div>

          <div className="p-4 bg-slate-50 border rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="flex items-center gap-1.5 text-slate-800">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Daily Consistency ({student.streak_days} days streak)</span>
              </span>
              <span className="text-emerald-700">{consistencyScore}%</span>
            </div>
            <ProgressBar value={consistencyScore} color="emerald" />
          </div>

        </div>
      </div>

      {/* Action CTA */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/mock')}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Attempt Mock Exam to Improve Rating</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
