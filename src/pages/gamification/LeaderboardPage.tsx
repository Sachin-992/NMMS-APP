import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { getStudents } from '../../services/storage';
import { Trophy, Flame, Medal } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { student: currentStudent } = useAuth();
  const students = getStudents();

  const [filter, setFilter] = useState<'OVERALL' | 'CONSISTENT'>('OVERALL');

  const sorted = [...students].sort((a, b) => {
    if (filter === 'CONSISTENT') return b.streak_days - a.streak_days;
    return b.xp - a.xp;
  });

  const top3 = sorted.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center font-bold">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
              <span>{t('leaderboard')}</span>
              <span className="text-amber-400">PUM School</span>
            </h1>
            <p className="mt-1 text-slate-300 text-sm font-medium">
              {language === 'ta'
                ? 'கல்விச் செயலாக்கம் மற்றும் முயற்சியின் அடிப்படையில் அமைந்த பள்ளித் தரவரிசை.'
                : 'Recognizing academic excellence, consistency, and daily learning effort.'}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs font-bold">
        <button
          onClick={() => setFilter('OVERALL')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            filter === 'OVERALL' 
              ? 'bg-blue-600 text-white shadow-xs' 
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Overall XP Standing
        </button>

        <button
          onClick={() => setFilter('CONSISTENT')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            filter === 'CONSISTENT' 
              ? 'bg-blue-600 text-white shadow-xs' 
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Most Consistent (Streak)
        </button>
      </div>

      {/* Podium Display (Top 3) */}
      {top3.length > 0 && (
        <div className="grid grid-cols-3 gap-3 items-end pt-4 pb-2 max-w-lg mx-auto">
          
          {/* 2nd Place */}
          {top3[1] && (
            <div className="bg-white border border-slate-200 rounded-3xl p-4 text-center space-y-2 shadow-sm">
              <Medal className="w-8 h-8 text-slate-400 mx-auto fill-slate-300" />
              <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">{top3[1].name}</div>
              <div className="text-xs font-mono font-bold text-blue-700">{top3[1].xp} XP</div>
              <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">2nd</span>
            </div>
          )}

          {/* 1st Place */}
          {top3[0] && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 text-center space-y-2 shadow-md -translate-y-2">
              <Medal className="w-10 h-10 text-amber-500 mx-auto fill-amber-400" />
              <div className="font-extrabold text-slate-900 text-sm sm:text-base truncate">{top3[0].name}</div>
              <div className="text-sm font-mono font-black text-amber-800">{top3[0].xp} XP</div>
              <span className="text-xs font-extrabold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full">🥇 1st Place</span>
            </div>
          )}

          {/* 3rd Place */}
          {top3[2] && (
            <div className="bg-white border border-slate-200 rounded-3xl p-4 text-center space-y-2 shadow-sm">
              <Medal className="w-8 h-8 text-amber-700 mx-auto fill-amber-600" />
              <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">{top3[2].name}</div>
              <div className="text-xs font-mono font-bold text-blue-700">{top3[2].xp} XP</div>
              <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">3rd</span>
            </div>
          )}

        </div>
      )}

      {/* Leaderboard Table / Rest List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-500 uppercase tracking-wider grid grid-cols-12 gap-2">
          <div className="col-span-2 sm:col-span-1 text-center">Rank</div>
          <div className="col-span-6 sm:col-span-6">Student Name</div>
          <div className="col-span-2 sm:col-span-3 text-center">Level</div>
          <div className="col-span-2 sm:col-span-2 text-right pr-2">Total XP</div>
        </div>

        <div className="divide-y divide-slate-100">
          {sorted.map((std, idx) => {
            const isMe = currentStudent && (std.id === currentStudent.id || std.student_id === currentStudent.student_id);

            return (
              <div 
                key={std.id}
                className={`p-4 grid grid-cols-12 gap-2 items-center text-sm ${
                  isMe ? 'bg-blue-50/80 font-bold' : ''
                }`}
              >
                <div className="col-span-2 sm:col-span-1 text-center font-mono font-bold text-slate-600">
                  #{idx + 1}
                </div>

                <div className="col-span-6 sm:col-span-6 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {std.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{std.name} {isMe && '(You)'}</div>
                    <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <span>Class 8-{std.class_section}</span>
                      <span>•</span>
                      <span className="text-amber-700 font-bold flex items-center gap-0.5">
                        <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {std.streak_days}d Streak
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-3 text-center text-xs font-semibold text-slate-700">
                  Level {std.level}
                </div>

                <div className="col-span-2 sm:col-span-2 text-right pr-2 font-black text-blue-700 font-mono">
                  {std.xp} XP
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
