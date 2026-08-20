import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { LogIn, KeyRound, UserCheck, ShieldCheck, School } from 'lucide-react';
import { AppLogo } from '../../components/ui/AppLogo';

export const StudentLogin: React.FC = () => {
  const { loginStudent } = useAuth();
  const { t, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState('PUM26001');
  const [pin, setPin] = useState('4821');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await loginStudent(studentId, pin);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Invalid Student ID or PIN.');
    }
  };

  const handleQuickDemo = (id: string, p: string) => {
    setStudentId(id);
    setPin(p);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-slate-950">
      
      {/* Top Bar Language Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          onClick={toggleLanguage}
          className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all border border-white/20 flex items-center gap-1.5"
        >
          <span>🌐</span>
          <span>{t('switch_lang')}</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <div className="inline-flex justify-center mb-3">
          <AppLogo size="xl" showText={false} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          PUM NMMS Champion
        </h1>
        <p className="mt-2 text-sm text-slate-300 font-medium">
          Learn Smart. Practice Daily. Crack NMMS.
        </p>
        <div className="mt-2 inline-flex items-center gap-1 text-xs text-blue-300 bg-blue-900/50 px-3 py-1 rounded-full border border-blue-700/50">
          <School className="w-3.5 h-3.5" />
          <span>PUM School, Echampatti</span>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white/95 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl border border-slate-200 sm:px-10">
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Student ID / மாணவர் எண்
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. PUM26001"
                  className="pl-10 block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-slate-900 font-semibold placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-base"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">Assigned by your school teacher.</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                PIN Code / கடவுச்சொல்
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="e.g. 4821"
                  className="pl-10 block w-full rounded-xl border border-slate-300 px-3 py-2.5 text-slate-900 font-semibold placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-base tracking-widest"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-lg text-white font-bold bg-blue-600 hover:bg-blue-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all text-base disabled:opacity-50 cursor-pointer"
            >
              <LogIn className="w-5 h-5" />
              <span>{loading ? 'Logging in...' : 'Login & Start Learning'}</span>
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <p className="text-xs text-slate-500 font-bold mb-2 text-center uppercase tracking-wider">
              Quick Test Credentials
            </p>
            <button
              type="button"
              onClick={() => handleQuickDemo('PUM26001', '4821')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2 px-3 rounded-lg border border-slate-300 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Arun Kumar (8-A)</span>
              <span className="font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                PUM26001 / 4821
              </span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/admin/login" className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline">
              Are you a Teacher or Admin? Login here →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
