import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  getDailyMission, getMistakes, getSystemSettings, 
  getStudents, getStudentExamAttempts 
} from '../../services/storage';
import type { DailyMission, SystemSettings, ExamAttempt } from '../../types';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { 
  Target, BookOpen, Brain, ShieldAlert, Award, 
  Trophy, ArrowRight, Flame, Clock, Sparkles, AlertCircle
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { student, updateCurrentStudentXP } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [mission, setMission] = useState<DailyMission | null>(null);
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [studentRank, setStudentRank] = useState<number | null>(null);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);

  useEffect(() => {
    if (student) {
      setMission(getDailyMission(student.id));
      const mistakes = getMistakes(student.id).filter(m => !m.resolved);
      setMistakesCount(mistakes.length);

      // Real rank calculation
      const allStudents = getStudents().sort((a, b) => b.xp - a.xp);
      setTotalStudents(allStudents.length);
      const rankIdx = allStudents.findIndex(s => s.id === student.id || s.student_id === student.student_id);
      setStudentRank(rankIdx >= 0 ? rankIdx + 1 : null);

      // Real attempts
      const attempts = getStudentExamAttempts(student.id);
      setExamAttempts(attempts);
    }
    setSettings(getSystemSettings());
  }, [student]);

  if (!student) return null;

  const calculateDaysRemaining = () => {
    if (!settings?.exam_date || settings.exam_date_status === 'NOT_ANNOUNCED') return null;
    const target = new Date(settings.exam_date).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const daysLeft = calculateDaysRemaining();

  const isMissionComplete = mission && 
    mission.concepts_completed >= mission.concepts_target &&
    mission.practice_completed >= mission.practice_target &&
    mission.revision_completed >= mission.revision_target;

  const handleClaimMissionReward = () => {
    if (mission && isMissionComplete && !mission.is_claimed) {
      updateCurrentStudentXP(mission.xp_reward);
      const updated = { ...mission, is_claimed: true };
      setMission(updated);
    }
  };

  // Calculate real MAT & SAT averages from attempts
  const matAttempts = examAttempts.filter(a => a.mat_score !== undefined);
  const satAttempts = examAttempts.filter(a => a.sat_score !== undefined);

  const matAvg = matAttempts.length > 0
    ? Math.round(matAttempts.reduce((acc, curr) => acc + (curr.mat_score || 0), 0) / matAttempts.length)
    : null;

  const satAvg = satAttempts.length > 0
    ? Math.round(satAttempts.reduce((acc, curr) => acc + (curr.sat_score || 0), 0) / satAttempts.length)
    : null;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner & Welcome */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-blue-200 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-1">
              <span>{t('school_name')}</span>
              <span>•</span>
              <span>Class 8-{student.class_section}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
              <span>{t('vanakkam')}, {student.name}</span>
              <span>👋</span>
            </h1>
            <p className="mt-1 text-slate-200 text-sm sm:text-base font-medium">
              {language === 'ta' 
                ? 'உங்கள் NMMS கல்விப் பயணம் சிறப்பாகத் தொடர்கிறது. இன்றைய இலக்குகளைப் பூர்த்தி செய்க!' 
                : 'Your NMMS preparation journey is on track. Master today’s concepts and crack the exam!'}
            </p>
          </div>

          {/* Exam Countdown Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shrink-0 text-center flex flex-col justify-center min-w-[220px]">
            <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-bold uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" />
              <span>TN NMMS Examination</span>
            </div>
            {settings?.exam_date_status === 'NOT_ANNOUNCED' ? (
              <div className="text-xs text-slate-200 font-semibold py-1">
                Official exam date will be updated after TN DGE announcement
              </div>
            ) : daysLeft !== null ? (
              <div className="text-3xl font-black text-white tracking-tight">
                {daysLeft} Days
              </div>
            ) : (
              <div className="text-sm font-bold text-slate-200">Date Update Pending</div>
            )}
            <div className="text-[11px] text-slate-300 mt-1">
              {settings?.exam_date_status === 'OFFICIAL' 
                ? 'Official Exam Date' 
                : settings?.exam_date_status === 'TENTATIVE'
                ? 'Tentative Expected Date'
                : 'Target Session 2026–27'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Today's Mission & Performance */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Mission Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-base sm:text-lg">
                    {t('todays_mission')}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'ta' ? 'இன்றைய கற்றல் இலக்குகள்' : 'Daily recommended study targets for maximum retention'}
                  </p>
                </div>
              </div>
              
              <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                +50 XP Reward
              </span>
            </div>

            {mission && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <ProgressBar
                  label="Learn Concept"
                  value={mission.concepts_completed}
                  max={mission.concepts_target}
                  labelRight={`${mission.concepts_completed}/${mission.concepts_target}`}
                  color="blue"
                />
                <ProgressBar
                  label="Practice MCQs"
                  value={mission.practice_completed}
                  max={mission.practice_target}
                  labelRight={`${mission.practice_completed}/${mission.practice_target}`}
                  color="indigo"
                />
                <ProgressBar
                  label="Revision & Mistakes"
                  value={mission.revision_completed}
                  max={mission.revision_target}
                  labelRight={`${mission.revision_completed}/${mission.revision_target}`}
                  color="emerald"
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {isMissionComplete ? (
                mission?.is_claimed ? (
                  <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Mission Completed Today! +50 XP Claimed</span>
                  </div>
                ) : (
                  <button
                    onClick={handleClaimMissionReward}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Claim +50 XP Reward!</span>
                  </button>
                )
              ) : (
                <button
                  onClick={() => navigate('/learn')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t('start_mission')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Action Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <Link 
              to="/learn"
              className="bg-white hover:bg-blue-50/50 p-4 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all text-center group shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="font-bold text-slate-900 text-sm">{t('learn')}</div>
              <div className="text-[11px] text-slate-500">Step-by-step</div>
            </Link>

            <Link 
              to="/practice"
              className="bg-white hover:bg-indigo-50/50 p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all text-center group shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <div className="font-bold text-slate-900 text-sm">{t('practice')}</div>
              <div className="text-[11px] text-slate-500">Official Qs</div>
            </Link>

            <Link 
              to="/mistakes"
              className="bg-white hover:bg-amber-50/50 p-4 rounded-2xl border border-slate-200 hover:border-amber-300 transition-all text-center group shadow-sm relative"
            >
              {mistakesCount > 0 && (
                <span className="absolute top-2 right-2 bg-amber-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {mistakesCount}
                </span>
              )}
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="font-bold text-slate-900 text-sm">{t('mistakes')}</div>
              <div className="text-[11px] text-slate-500">{mistakesCount} Pending</div>
            </Link>

            <Link 
              to="/mock"
              className="bg-white hover:bg-purple-50/50 p-4 rounded-2xl border border-slate-200 hover:border-purple-300 transition-all text-center group shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <div className="font-bold text-slate-900 text-sm">{t('mock_exams')}</div>
              <div className="text-[11px] text-slate-500">90 Min Simulation</div>
            </Link>

          </div>

          {/* Real MAT & SAT Subject Performance */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h2 className="font-bold text-slate-900 text-base sm:text-lg mb-4 flex items-center gap-2">
              <span>{t('performance_summary')}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* MAT Card */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-800 text-sm">MAT — Mental Ability Test</span>
                  <span className="font-extrabold text-blue-700 text-base">
                    {matAvg !== null ? `${matAvg}%` : '—'}
                  </span>
                </div>
                {matAvg !== null ? (
                  <ProgressBar value={matAvg} color="blue" />
                ) : (
                  <div className="text-xs text-slate-500 mt-2 font-medium">
                    Attempt a MAT mock exam to see your accuracy score.
                  </div>
                )}
              </div>

              {/* SAT Card */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-800 text-sm">SAT — Scholastic Aptitude</span>
                  <span className="font-extrabold text-indigo-700 text-base">
                    {satAvg !== null ? `${satAvg}%` : '—'}
                  </span>
                </div>
                {satAvg !== null ? (
                  <ProgressBar value={satAvg} color="indigo" />
                ) : (
                  <div className="text-xs text-slate-500 mt-2 font-medium">
                    Attempt a SAT mock exam to see your accuracy score.
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Rank, Weak Area, Level Status */}
        <div className="space-y-6">
          
          {/* Rank & Level Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-indigo-800/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                {t('school_rank')}
              </span>
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-black text-amber-300">
                {studentRank !== null ? `#${studentRank}` : '—'}
              </span>
              {totalStudents > 0 && (
                <span className="text-sm text-slate-300">out of {totalStudents} students</span>
              )}
            </div>

            <div className="pt-4 border-t border-indigo-800/60 mt-4 flex items-center justify-between text-xs">
              <div>
                <div className="text-slate-400">Current Level</div>
                <div className="font-bold text-white text-sm">Level {student.level}</div>
              </div>
              <div className="text-right">
                <div className="text-slate-400">Total Academic XP</div>
                <div className="font-extrabold text-amber-300 text-sm">{student.xp} XP</div>
              </div>
            </div>
          </div>

          {/* Weak Area Alert Box */}
          <div className="bg-amber-50 rounded-3xl p-5 border border-amber-200 text-amber-900">
            <div className="flex items-center gap-2 font-bold text-sm mb-2 text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>{t('weak_areas')}</span>
            </div>
            {mistakesCount > 0 ? (
              <>
                <p className="text-xs text-amber-800 leading-relaxed mb-3">
                  You have {mistakesCount} unresolved question{mistakesCount > 1 ? 's' : ''} in your Mistake Book.
                </p>
                <button
                  onClick={() => navigate('/mistakes')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all w-full cursor-pointer text-center"
                >
                  Revise Pending Mistakes Now
                </button>
              </>
            ) : (
              <p className="text-xs text-amber-800 leading-relaxed">
                Start practicing questions to identify areas needing attention!
              </p>
            )}
          </div>

          {/* Learning Streak Widget */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <Flame className="w-6 h-6 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">
                  {student.streak_days} Days Streak! 🔥
                </div>
                <div className="text-xs text-slate-500">Consistent daily study</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
