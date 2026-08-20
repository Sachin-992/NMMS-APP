import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { INITIAL_ACHIEVEMENTS } from '../../services/mockData';
import { Award, Lock, CheckCircle2, Star, Trophy, BookOpen, Flame } from 'lucide-react';

const iconMap: Record<string, any> = {
  Award,
  Star,
  CheckCircle2,
  Trophy,
  BookOpen,
  Flame,
};

export const AchievementsPage: React.FC = () => {
  const { language } = useLanguage();
  const { student } = useAuth();

  const achievements = INITIAL_ACHIEVEMENTS;

  const unlockedCount = achievements.filter(a => {
    if (!student) return false;
    if (a.code === 'ACH_FIRST_LOGIN') return true;
    if (a.code === 'ACH_PRACTICE_50' && student.xp >= 100) return true;
    if (a.code === 'ACH_MOCK_FINISHER' && student.xp >= 200) return true;
    return a.unlocked || false;
  }).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-7 h-7 text-amber-500" />
            <span>{language === 'ta' ? 'கல்விச் சாதனைகள்' : 'Academic Badges'}</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            {language === 'ta'
              ? 'NMMS தயாரிப்பில் உங்கள் சாதனைகளுக்கான சிறப்புப் பதக்கங்கள்.'
              : 'Earn special academic badges as you master concepts, complete missions, and attempt mock exams.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs bg-amber-50 text-amber-800 font-extrabold px-3.5 py-1.5 rounded-full border border-amber-200">
            {unlockedCount} / {achievements.length} Unlocked
          </span>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map(ach => {
          const Icon = iconMap[ach.icon] || Award;

          // Determine unlock status dynamically
          let isUnlocked = ach.unlocked || false;
          if (student) {
            if (ach.code === 'ACH_FIRST_LOGIN') isUnlocked = true;
            if (ach.code === 'ACH_PRACTICE_50' && student.xp >= 100) isUnlocked = true;
            if (ach.code === 'ACH_MOCK_FINISHER' && student.xp >= 200) isUnlocked = true;
          }

          return (
            <div
              key={ach.code}
              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between space-y-4 ${
                isUnlocked
                  ? 'bg-white border-amber-200 shadow-sm hover:shadow-md'
                  : 'bg-slate-50/70 border-slate-200 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                  isUnlocked ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-400'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>

                {isUnlocked ? (
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Locked
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                  {language === 'ta' ? ach.title_ta : ach.title_en}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                  {language === 'ta' ? ach.description_ta : ach.description_en}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-amber-700 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>+{ach.xp_reward} XP</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
