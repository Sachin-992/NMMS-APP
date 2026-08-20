import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { getStudentExamAttempts, getMistakes, getDailyMission } from '../../services/storage';
import { User, Star, Flame, Trophy, BookCheck, ShieldCheck, Target } from 'lucide-react';
import { ProgressBar } from '../../components/ui/ProgressBar';

const LEVEL_NAMES: Record<number, string> = {
  1: 'NMMS Starter', 2: 'Concept Explorer', 3: 'Active Learner',
  4: 'Achiever', 5: 'NMMS Scholar', 6: 'Expert', 7: 'Champion', 8: 'NMMS Master'
};

const XP_THRESHOLDS = [0, 100, 250, 500, 800, 1200, 1700, 2500, 9999];

export const StudentProfilePage: React.FC = () => {
  const { student } = useAuth();
  const { language } = useLanguage();

  if (!student) return null;

  const attempts = getStudentExamAttempts(student.id);
  const mistakes = getMistakes(student.id);
  const mission = getDailyMission(student.id);
  const unresolvedMistakes = mistakes.filter(m => !m.resolved).length;

  // XP progress to next level
  const currentThreshold = XP_THRESHOLDS[student.level - 1] ?? 0;
  const nextThreshold = XP_THRESHOLDS[student.level] ?? 2500;
  const xpInLevel = student.xp - currentThreshold;
  const xpNeeded = nextThreshold - currentThreshold;
  const levelProgress = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

  // Stats
  const totalAttempts = attempts.length;
  const avgScore = totalAttempts > 0
    ? Math.round(attempts.reduce((sum, a) => sum + (a.score / a.total_questions * 100), 0) / totalAttempts)
    : null;

  const missionProgress = mission
    ? Math.round(((mission.concepts_completed + mission.practice_completed + mission.revision_completed) /
        (mission.concepts_target + mission.practice_target + mission.revision_target)) * 100)
    : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-8">

      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center font-black text-3xl border-2 border-white/30 shrink-0">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold truncate">{student.name}</h1>
            <div className="text-blue-200 text-sm font-medium">{student.student_id}</div>
            <div className="text-blue-200 text-xs">Class 8 — PUM School, Echampatti</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-blue-200">Level {student.level} — {LEVEL_NAMES[student.level]}</span>
            <span className="text-xs font-bold text-blue-100">{student.xp} / {nextThreshold} XP</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-amber-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          {student.level < 8 && (
            <div className="text-xs text-blue-200 mt-1">
              {nextThreshold - student.xp} XP to Level {student.level + 1}
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Learning Streak</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{student.streak_days}</div>
          <div className="text-xs text-slate-500 mt-0.5">consecutive days</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Academic XP</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{student.xp}</div>
          <div className="text-xs text-slate-500 mt-0.5">total points earned</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Mock Exams</span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalAttempts}</div>
          <div className="text-xs text-slate-500 mt-0.5">completed attempts</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Avg Score</span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {avgScore !== null ? `${avgScore}%` : '—'}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">{avgScore !== null ? 'across mock exams' : 'No exams yet'}</div>
        </div>
      </div>

      {/* Today's Mission Progress */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-amber-600" />
          <h2 className="font-bold text-slate-900">
            {language === 'ta' ? 'இன்றைய இலக்கு' : "Today's Mission"}
          </h2>
        </div>
        {mission ? (
          <div className="space-y-3">
            <ProgressBar
              label={language === 'ta' ? 'கருத்துகள்' : 'Concepts Learned'}
              value={mission.concepts_completed}
              max={mission.concepts_target}
              labelRight={`${mission.concepts_completed}/${mission.concepts_target}`}
              color="blue"
            />
            <ProgressBar
              label={language === 'ta' ? 'பயிற்சி' : 'Practice Questions'}
              value={mission.practice_completed}
              max={mission.practice_target}
              labelRight={`${mission.practice_completed}/${mission.practice_target}`}
              color="indigo"
            />
            <ProgressBar
              label={language === 'ta' ? 'மீள்பார்வை' : 'Revision'}
              value={mission.revision_completed}
              max={mission.revision_target}
              labelRight={`${mission.revision_completed}/${mission.revision_target}`}
              color="emerald"
            />
            <div className="mt-2">
              <ProgressBar
                label={language === 'ta' ? 'ஒட்டுமொத்த முன்னேற்றம்' : 'Overall Progress'}
                value={missionProgress}
                color="amber"
                showPercent
                size="lg"
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">No mission data for today.</p>
        )}
      </div>

      {/* Pending Mistakes */}
      {unresolvedMistakes > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <BookCheck className="w-5 h-5 text-amber-600" />
            <span className="font-bold text-amber-900 text-sm">
              {unresolvedMistakes} question{unresolvedMistakes > 1 ? 's' : ''} in your Mistake Book
            </span>
          </div>
          <p className="text-xs text-amber-700 mt-1">Review and resolve them to strengthen your understanding.</p>
        </div>
      )}

      {/* Account Info */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-slate-600" />
          <h2 className="font-bold text-slate-900">Account Details</h2>
        </div>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500 font-medium">Student ID</dt>
            <dd className="font-mono font-bold text-slate-900">{student.student_id}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500 font-medium">Class</dt>
            <dd className="font-bold text-slate-900">Class 8 — {student.class_section}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500 font-medium">Medium</dt>
            <dd className="font-bold text-slate-900">{student.medium === 'TA' ? 'Tamil' : student.medium === 'EN' ? 'English' : 'Both'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500 font-medium">Status</dt>
            <dd>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                student.status === 'ACTIVE'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-red-50 text-red-600 border-red-200'
              }`}>
                {student.status}
              </span>
            </dd>
          </div>
        </dl>
      </div>

    </div>
  );
};
