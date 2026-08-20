import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Shield, LayoutDashboard, Users, FileCheck, Upload,
  Award, BarChart3, LogOut, Globe, Menu, X,
  ChevronRight, GraduationCap, BookOpenCheck, FileText
} from 'lucide-react';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    label: 'Academic',
    items: [
      { path: '/admin/papers', label: 'Official Papers CMS', icon: FileText },
      { path: '/admin/content-review', label: 'Content & Verification', icon: FileCheck },
      { path: '/admin/guide', label: 'Exam Guide CMS', icon: BookOpenCheck },
      { path: '/admin/import', label: 'Import Questions', icon: Upload },
      { path: '/admin/mock-creator', label: 'Mock Exams', icon: Award },
    ]
  },
  {
    label: 'Management',
    items: [
      { path: '/admin/students', label: 'Students', icon: Users },
      { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    ]
  }
];

export const AdminLayout: React.FC = () => {
  const { user, role, logout } = useAuth();
  const { toggleLanguage, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center shadow-md shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-white text-sm leading-tight">PUM Admin</div>
            <div className="text-xs text-purple-400 font-semibold leading-tight">{role} Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation groups */}
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {NAV_GROUPS.map(group => (
          <div key={group.label}>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 mb-1.5">
              {group.label}
            </div>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom: User + Actions */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        {/* School badge */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-xl">
          <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-200 truncate">PUM School</div>
            <div className="text-[10px] text-slate-400 font-medium">Echampatti</div>
          </div>
        </div>

        {/* Language toggle */}
        <button
          onClick={toggleLanguage}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Globe className="w-4 h-4" />
          <span>{language === 'ta' ? 'Switch to English' : 'தமிழில் மாற்று'}</span>
        </button>

        {/* User row + logout */}
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0 px-1">
            <div className="text-xs font-bold text-slate-200 truncate">{user?.full_name || 'Admin'}</div>
            <div className="text-[10px] text-slate-500 truncate">{user?.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-950/50 hover:bg-red-900/80 text-red-400 rounded-lg border border-red-800/50 transition-colors cursor-pointer shrink-0"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Current page breadcrumb label
  const currentLabel = NAV_GROUPS.flatMap(g => g.items).find(i => isActive(i.path))?.label ?? 'Overview';

  return (
    <div className="admin-shell">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex w-[220px] bg-slate-900 border-r border-slate-800 shrink-0 flex-col fixed top-0 left-0 bottom-0 z-30">
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-950/70 z-40 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 w-[260px] bg-slate-900 z-50 lg:hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
              <div className="font-extrabold text-white text-sm">Admin Panel</div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col lg:ml-[220px] min-h-screen">
        {/* Top Header (visible on all sizes) */}
        <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center gap-4 sticky top-0 z-20">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="text-purple-400 font-bold">PUM NMMS</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-200">{currentLabel}</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs bg-purple-900/60 text-purple-300 font-bold px-2.5 py-1 rounded-md border border-purple-800/50">
              {role}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
