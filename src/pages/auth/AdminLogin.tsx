import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Lock, Mail, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@pum.edu.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await loginAdmin(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Invalid admin credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-semibold mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Login</span>
        </Link>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-600 text-white font-black text-2xl shadow-xl mb-3">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Admin & Teacher Portal
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          PUM NMMS Champion Content & Student Management
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-950/60 border border-red-800 text-red-300 px-4 py-2.5 rounded-xl text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Admin / Teacher Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 block w-full rounded-xl border border-slate-700 bg-slate-800 text-white font-medium placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm py-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 block w-full rounded-xl border border-slate-700 bg-slate-800 text-white font-medium placeholder-slate-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm py-2.5"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-xl shadow-lg text-white font-bold bg-purple-600 hover:bg-purple-700 transition-all text-sm cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Admin Portal'}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1">
            <p className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Test Admin Credentials:</p>
            <p>Admin: <code className="text-purple-300 font-mono">admin@pum.edu.in</code> / <code className="text-purple-300 font-mono">admin123</code></p>
            <p>Teacher: <code className="text-purple-300 font-mono">teacher@pum.edu.in</code> / <code className="text-purple-300 font-mono">teacher123</code></p>
          </div>

        </div>
      </div>
    </div>
  );
};
