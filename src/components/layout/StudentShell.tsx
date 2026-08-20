import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  LayoutDashboard, BookOpen, Brain, FileCheck, 
  Trophy, MoreHorizontal, LogOut, Globe,
  Flame, Star, ChevronRight, BookOpenCheck, FileText,
  ShieldAlert, Layers, Award, User
} from 'lucide-react';
import { AppLogo } from '../ui/AppLogo';

// ── Primary nav (shown in sidebar desktop / bottom nav mobile) ──
const PRIMARY_NAV = [
  { path: '/dashboard',       labelKey: 'dashboard',       icon: LayoutDashboard },
  { path: '/learn',           labelKey: 'learn',           icon: BookOpen },
  { path: '/practice',        labelKey: 'practice',        icon: Brain },
  { path: '/official-papers', labelKey: 'official_papers', icon: FileText },
  { path: '/mock',            labelKey: 'mock_exams',      icon: FileCheck },
  { path: '/guide',           labelKey: 'exam_guide',      icon: BookOpenCheck },
  { path: '/leaderboard',     labelKey: 'leaderboard',     icon: Trophy },
];

// ── Secondary nav (inside "More" drawer on mobile) ──
const SECONDARY_NAV = [
  { path: '/revision',      labelKey: 'revision',      icon: Layers },
  { path: '/mistakes',      labelKey: 'mistakes',      icon: ShieldAlert },
  { path: '/achievements',  labelKey: 'achievements',  icon: Award },
  { path: '/profile',       labelKey: 'profile',       icon: User },
];

const LEVEL_NAMES: Record<number, string> = {
  1: 'Starter', 2: 'Explorer', 3: 'Learner', 4: 'Achiever',
  5: 'Scholar', 6: 'Expert', 7: 'Champion', 8: 'Master'
};

// ── More Drawer (Mobile) ──────────────────────────────────────────
const MoreDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { t, toggleLanguage, language } = useLanguage();
  const { student, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onClose();
    logout();
    navigate('/login');
  };

  if (!open) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer-panel pb-safe">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>

        {/* Student info header */}
        {student && (
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
            <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-base shrink-0">
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-900 text-sm truncate">{student.name}</div>
              <div className="text-xs text-slate-500 font-medium">{student.student_id} • Class 8</div>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-lg text-xs font-bold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{student.xp} XP</span>
            </div>
          </div>
        )}

        {/* Secondary nav items */}
        <div className="p-3 space-y-1">
          {SECONDARY_NAV.map(item => {
            const Icon = item.icon;
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{t(item.labelKey)}</span>
                <ChevronRight className="w-4 h-4 ml-auto text-slate-400" />
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="px-3 pb-3 border-t border-slate-100 pt-3 space-y-2">
          <button
            onClick={toggleLanguage}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Globe className="w-5 h-5 text-slate-500" />
            <span>{language === 'ta' ? 'Switch to English' : 'தமிழில் மாற்று'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>
    </>
  );
};

// ── Student Shell ─────────────────────────────────────────────────
export const StudentShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, toggleLanguage, language } = useLanguage();
  const { student, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="student-shell">

      {/* ─── Desktop Sidebar ───────────────────────────────────────── */}
      <aside className="student-sidebar">
        {/* Logo */}
        <div className="p-4 border-b border-slate-100">
          <Link to="/dashboard">
            <AppLogo size="sm" />
          </Link>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 p-3 space-y-0.5">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2 mt-1">Study</div>
          {PRIMARY_NAV.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{t(item.labelKey)}</span>
              </Link>
            );
          })}

          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2 mt-4">Review</div>
          {SECONDARY_NAV.slice(0, 3).map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Language + Profile + XP */}
        <div className="p-3 border-t border-slate-100 space-y-2">

          {/* XP & Streak row */}
          {student && (
            <div className="flex items-center gap-2 px-1">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-lg text-xs font-bold flex-1">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{student.xp} XP</span>
              </div>
              <div className="flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 px-2 py-1 rounded-lg text-xs font-bold flex-1">
                <Flame className="w-3 h-3 fill-orange-500 text-orange-500" />
                <span>{student.streak_days}d</span>
              </div>
            </div>
          )}

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-slate-500" />
            <span>{language === 'ta' ? 'English' : 'தமிழ்'}</span>
          </button>

          {/* Profile row */}
          {student && (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                  {student.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{student.name}</div>
                  <div className="text-[10px] text-slate-400 font-medium">Level {student.level} · {LEVEL_NAMES[student.level] || 'Scholar'}</div>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                title={t('logout')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ─── Mobile Top Bar ──────────────────────────────────────────── */}
      <header className="student-mobile-topbar fixed top-0 left-0 right-0 z-30 bg-white border-b border-slate-200 px-4" style={{ height: 'var(--topbar-height)', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/dashboard">
          <AppLogo size="sm" showSubtitle={false} />
        </Link>

        <div className="flex items-center gap-2">
          {student && (
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-lg text-xs font-bold">
              <Flame className="w-3 h-3 fill-orange-500 text-orange-500" />
              <span>{student.streak_days}d</span>
            </div>
          )}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'EN' : 'தமிழ்'}</span>
          </button>
        </div>
      </header>

      {/* ─── Main Content ─────────────────────────────────────────────── */}
      <main className="student-main">
        {children}
      </main>

      {/* ─── Mobile Bottom Navigation ─────────────────────────────────── */}
      <nav
        className="student-mobile-bottomnav fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200"
        style={{ height: 'var(--bottomnav-height)' }}
      >
        <div className="w-full h-full flex">
          {PRIMARY_NAV.slice(0, 4).map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 px-1 min-w-0 transition-colors ${
                  active ? 'text-blue-600' : 'text-slate-500'
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${active ? 'text-blue-600' : 'text-slate-400'}`}
                  strokeWidth={active ? 2.5 : 1.75}
                />
                <span className="w-full text-center text-[9px] font-bold leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                  {t(item.labelKey)}
                </span>
              </Link>
            );
          })}
          {/* More button */}
          <button
            onClick={() => setMoreOpen(true)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 px-1 min-w-0 text-slate-500 cursor-pointer"
          >
            <MoreHorizontal className="w-5 h-5 shrink-0 text-slate-400" strokeWidth={1.75} />
            <span className="w-full text-center text-[9px] font-bold leading-none whitespace-nowrap">More</span>
          </button>
        </div>
      </nav>

      {/* ─── More Drawer ──────────────────────────────────────────────── */}
      <MoreDrawer open={moreOpen} onClose={() => setMoreOpen(false)} />

    </div>
  );
};
