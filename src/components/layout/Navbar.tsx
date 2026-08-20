import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BookOpen, Flame, Trophy, Award, 
  LogOut, ShieldAlert, LayoutDashboard, Brain, FileCheck, Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t, toggleLanguage } = useLanguage();
  const { student, role, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = role === 'STUDENT' ? [
    { path: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { path: '/learn', label: t('learn'), icon: BookOpen },
    { path: '/practice', label: t('practice'), icon: Brain },
    { path: '/revision', label: t('revision'), icon: Layers },
    { path: '/mistakes', label: t('mistakes'), icon: ShieldAlert },
    { path: '/mock', label: t('mock_exams'), icon: FileCheck },
    { path: '/leaderboard', label: t('leaderboard'), icon: Trophy },
    { path: '/achievements', label: t('achievements'), icon: Award }
  ] : [];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to={role === 'STUDENT' ? '/dashboard' : '/admin/dashboard'} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              NMMS
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-tight text-base sm:text-lg flex items-center gap-2">
                <span>PUM NMMS Champion</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium hidden sm:inline-block">
                  2026–27
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">PUM School, Echampatti</p>
            </div>
          </Link>

          {isAuthenticated && role === 'STUDENT' && (
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map(link => {
                const Icon = link.icon;
                const active = location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      active 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          <div className="flex items-center gap-3">
            
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-3 py-1.5 rounded-lg transition-all border border-slate-300"
              title="Toggle Language"
            >
              <span className="text-blue-600 font-black">🌐</span>
              <span>{t('switch_lang')}</span>
            </button>

            {isAuthenticated && role === 'STUDENT' && student && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-bold" title="Learning Streak">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{student.streak_days} Days</span>
                </div>

                <div className="flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-lg text-xs font-bold" title="Total Academic XP">
                  <Trophy className="w-4 h-4 text-indigo-600" />
                  <span>{student.xp} XP</span>
                </div>
              </div>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                {role === 'STUDENT' ? (
                  <Link to="/profile" className="flex items-center gap-2 hover:opacity-80">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                      {student?.name?.charAt(0) || 'S'}
                    </div>
                  </Link>
                ) : (
                  <span className="text-xs bg-purple-100 text-purple-800 font-bold px-2.5 py-1 rounded-md">
                    {role}
                  </span>
                )}

                <button
                  onClick={handleLogout}
                  className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title={t('logout')}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-xs"
              >
                Login
              </Link>
            )}

          </div>

        </div>
      </div>

      {isAuthenticated && role === 'STUDENT' && (
        <div className="lg:hidden bg-slate-50 border-t border-slate-200 px-2 py-2 overflow-x-auto flex items-center gap-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const active = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  active 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-700 bg-white border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
