import React, { useState, useEffect } from 'react';
import { 
  getSystemSettings, saveSystemSettings, getStudents, 
  getQuestions, getConcepts, getMockExams, getStudentExamAttempts 
} from '../../services/storage';
import type { SystemSettings } from '../../types';
import { StatCard } from '../../components/ui/StatCard';
import { 
  Users, FileCheck, Award, BookOpen, Calendar, 
  Save, CheckCircle2, TrendingUp, AlertTriangle, Info, ShieldCheck
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings>(getSystemSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Real stats state
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeToday: 0,
    verifiedQuestions: 0,
    publishedConcepts: 0,
    mockExamsCount: 0,
    avgMockScore: null as number | null,
  });

  useEffect(() => {
    const students = getStudents();
    const today = new Date().toISOString().split('T')[0];
    const active = students.filter(s => s.last_active_date === today).length;

    const allQuestions = getQuestions({ verificationStatus: 'ALL' });
    const verifiedCount = allQuestions.filter(q => q.verification_status === 'VERIFIED' || q.verification_status === 'PUBLISHED').length;

    const conceptsCount = getConcepts().length;
    const examsCount = getMockExams().length;

    // Calculate average mock score across all attempts
    const allAttempts = students.flatMap(s => getStudentExamAttempts(s.id));
    const avgScore = allAttempts.length > 0
      ? Math.round(allAttempts.reduce((sum, a) => sum + ((a.score / a.total_questions) * 100), 0) / allAttempts.length)
      : null;

    setStats({
      totalStudents: students.length,
      activeToday: active,
      verifiedQuestions: verifiedCount,
      publishedConcepts: conceptsCount,
      mockExamsCount: examsCount,
      avgMockScore: avgScore,
    });
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSystemSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          PUM NMMS Admin Overview
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          PUM School, Echampatti • Official Academic Management & Verification Control
        </p>
      </div>

      {/* Real Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        
        <StatCard
          label="Total Students"
          value={stats.totalStudents}
          subtitle={stats.totalStudents > 0 ? `${stats.activeToday} Active Today` : 'No registered students'}
          icon={Users}
          iconColor="text-purple-400"
          iconBg="bg-purple-950 border border-purple-800"
          dark
        />

        <StatCard
          label="Verified Questions"
          value={stats.verifiedQuestions}
          subtitle="TN DGE Referenced"
          icon={FileCheck}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-950 border border-emerald-800"
          dark
        />

        <StatCard
          label="Concepts Published"
          value={stats.publishedConcepts}
          subtitle="MAT & SAT Syllabus"
          icon={BookOpen}
          iconColor="text-blue-400"
          iconBg="bg-blue-950 border border-blue-800"
          dark
        />

        <StatCard
          label="Mock Exams"
          value={stats.mockExamsCount}
          subtitle="Full 90-min Simulations"
          icon={Award}
          iconColor="text-amber-400"
          iconBg="bg-amber-950 border border-amber-800"
          dark
        />

        <StatCard
          label="Average Mock Score"
          value={stats.avgMockScore !== null ? `${stats.avgMockScore}%` : '—'}
          subtitle={stats.avgMockScore !== null ? 'Across all student attempts' : 'No mock attempts yet'}
          icon={TrendingUp}
          iconColor="text-indigo-400"
          iconBg="bg-indigo-950 border border-indigo-800"
          dark
        />

      </div>

      {/* Official TN DGE Exam Date Configurator */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 font-bold text-white text-base">
          <Calendar className="w-5 h-5 text-purple-400" />
          <span>Official TN DGE Examination Date Configurator</span>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Announcement Status
              </label>
              <select
                value={settings.exam_date_status}
                onChange={(e) => setSettings({ ...settings, exam_date_status: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="NOT_ANNOUNCED">NOT ANNOUNCED (Official Date Pending)</option>
                <option value="TENTATIVE">TENTATIVE (Expected Date)</option>
                <option value="OFFICIAL">OFFICIAL (TN DGE Notification Confirmed)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Official / Tentative Exam Date
              </label>
              <input
                type="date"
                value={settings.exam_date || ''}
                disabled={settings.exam_date_status === 'NOT_ANNOUNCED'}
                onChange={(e) => setSettings({ ...settings, exam_date: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white disabled:opacity-50 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Official Notification Source / URL
              </label>
              <input
                type="text"
                placeholder="e.g. TN DGE Notification Circular No. 2026/NMMS"
                value={settings.exam_date_source || ''}
                disabled={settings.exam_date_status === 'NOT_ANNOUNCED'}
                onChange={(e) => setSettings({ ...settings, exam_date_source: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white placeholder-slate-500 disabled:opacity-50 focus:border-purple-500 focus:outline-none"
              />
            </div>

          </div>

          {/* Status Explanation Banner */}
          {settings.exam_date_status === 'NOT_ANNOUNCED' && (
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Students will see "Official exam date will be updated after TN DGE announcement" on their dashboard.</span>
            </div>
          )}

          {settings.exam_date_status === 'TENTATIVE' && (
            <div className="p-3 bg-amber-950/60 rounded-xl border border-amber-800 text-xs text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>This is a tentative expected date. It will be clearly marked as tentative to students.</span>
            </div>
          )}

          {settings.exam_date_status === 'OFFICIAL' && (
            <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Official date active. Countdown active for students.</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2.5 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>

        {savedSuccess && (
          <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Official Exam Date settings saved! Settings updated across all student dashboards.</span>
          </div>
        )}
      </div>

    </div>
  );
};
