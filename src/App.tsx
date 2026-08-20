import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { StudentShell } from './components/layout/StudentShell';
import { AdminLayout } from './components/layout/AdminLayout';
import { SkeletonCard } from './components/ui/SkeletonLoader';

// ── Auth Pages (eager loaded) ────────────────────────────────────
import { StudentLogin } from './pages/auth/StudentLogin';
import { AdminLogin } from './pages/auth/AdminLogin';

// ── Student Pages (lazy loaded for performance) ──────────────────
const StudentDashboard    = lazy(() => import('./pages/student/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const StudentProfilePage  = lazy(() => import('./pages/student/StudentProfilePage').then(m => ({ default: m.StudentProfilePage })));
const SubjectListPage     = lazy(() => import('./pages/learning/SubjectListPage').then(m => ({ default: m.SubjectListPage })));
const TopicListPage       = lazy(() => import('./pages/learning/TopicListPage').then(m => ({ default: m.TopicListPage })));
const ConceptViewPage     = lazy(() => import('./pages/learning/ConceptViewPage').then(m => ({ default: m.ConceptViewPage })));
const PracticePage        = lazy(() => import('./pages/practice/PracticePage').then(m => ({ default: m.PracticePage })));
const MistakeBookPage     = lazy(() => import('./pages/revision/MistakeBookPage').then(m => ({ default: m.MistakeBookPage })));
const SmartRevisionPage   = lazy(() => import('./pages/revision/SmartRevisionPage').then(m => ({ default: m.SmartRevisionPage })));
const MockExamListPage    = lazy(() => import('./pages/mock/MockExamListPage').then(m => ({ default: m.MockExamListPage })));
const MockExamRunnerPage  = lazy(() => import('./pages/mock/MockExamRunnerPage').then(m => ({ default: m.MockExamRunnerPage })));
const MockExamResultPage  = lazy(() => import('./pages/mock/MockExamResultPage').then(m => ({ default: m.MockExamResultPage })));
const PreparationStatusPage = lazy(() => import('./pages/mock/PreparationStatusPage').then(m => ({ default: m.PreparationStatusPage })));
const LeaderboardPage     = lazy(() => import('./pages/gamification/LeaderboardPage').then(m => ({ default: m.LeaderboardPage })));
const AchievementsPage        = lazy(() => import('./pages/gamification/AchievementsPage').then(m => ({ default: m.AchievementsPage })));
const ExamGuidePage           = lazy(() => import('./pages/guide/ExamGuidePage').then(m => ({ default: m.ExamGuidePage })));
const OfficialPaperLibraryPage = lazy(() => import('./pages/papers/OfficialPaperLibraryPage').then(m => ({ default: m.OfficialPaperLibraryPage })));
const PaperPracticePage        = lazy(() => import('./pages/papers/PaperPracticePage').then(m => ({ default: m.PaperPracticePage })));
const MentorClassroomPage      = lazy(() => import('./pages/classroom/MentorClassroomPage').then(m => ({ default: m.MentorClassroomPage })));

// ── Admin Pages (lazy loaded) ────────────────────────────────────
const AdminDashboard          = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const StudentManagementPage   = lazy(() => import('./pages/admin/StudentManagementPage').then(m => ({ default: m.StudentManagementPage })));
const ContentVerificationPage = lazy(() => import('./pages/admin/ContentVerificationPage').then(m => ({ default: m.ContentVerificationPage })));
const QuestionImporterPage    = lazy(() => import('./pages/admin/QuestionImporterPage').then(m => ({ default: m.QuestionImporterPage })));
const AdminExamGuidePage      = lazy(() => import('./pages/admin/AdminExamGuidePage').then(m => ({ default: m.AdminExamGuidePage })));
const AdminPaperManagerPage   = lazy(() => import('./pages/admin/AdminPaperManagerPage').then(m => ({ default: m.AdminPaperManagerPage })));

// Loading fallback component
const PageLoader: React.FC = () => (
  <div className="space-y-4 p-4">
    <SkeletonCard lines={2} />
    <SkeletonCard lines={3} />
    <SkeletonCard lines={2} />
  </div>
);

// Wrapper: Student protected route inside StudentShell
const StudentPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute allowedRoles={['STUDENT']}>
    <StudentShell>
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </StudentShell>
  </ProtectedRoute>
);

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Routes>

            {/* ── Public Auth Routes ── */}
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ── Student Routes ── */}
            <Route path="/dashboard"     element={<StudentPage><StudentDashboard /></StudentPage>} />
            <Route path="/learn"         element={<StudentPage><SubjectListPage /></StudentPage>} />
            <Route path="/learn/:subjectCode" element={<StudentPage><TopicListPage /></StudentPage>} />
            <Route path="/concept/:topicId"   element={<StudentPage><ConceptViewPage /></StudentPage>} />
            <Route path="/practice"      element={<StudentPage><PracticePage /></StudentPage>} />
            <Route path="/official-papers"          element={<StudentPage><OfficialPaperLibraryPage /></StudentPage>} />
            <Route path="/official-papers/:paperId" element={<StudentPage><PaperPracticePage /></StudentPage>} />
            <Route path="/revision"      element={<StudentPage><SmartRevisionPage /></StudentPage>} />
            <Route path="/mistakes"      element={<StudentPage><MistakeBookPage /></StudentPage>} />
            <Route path="/mock"          element={<StudentPage><MockExamListPage /></StudentPage>} />
            <Route path="/mock/readiness" element={<StudentPage><PreparationStatusPage /></StudentPage>} />
            <Route path="/mock/:examId/result" element={<StudentPage><MockExamResultPage /></StudentPage>} />
            <Route path="/guide"         element={<StudentPage><ExamGuidePage /></StudentPage>} />
            <Route path="/leaderboard"   element={<StudentPage><LeaderboardPage /></StudentPage>} />
            <Route path="/achievements"  element={<StudentPage><AchievementsPage /></StudentPage>} />
            <Route path="/profile"       element={<StudentPage><StudentProfilePage /></StudentPage>} />

            {/* ── Mock Exam Runner (full screen — no StudentShell) ── */}
            <Route
              path="/mock/:examId/exam"
              element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-semibold text-sm">Loading exam...</div>}>
                    <MockExamRunnerPage />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            {/* ── Mentor Classroom Workspace (full screen — no StudentShell) ── */}
            <Route
              path="/classroom/:paperId"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'SUPER_ADMIN', 'STUDENT']}>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-semibold text-sm">Loading Mentor Classroom...</div>}>
                    <MentorClassroomPage />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            {/* ── Admin Routes ── */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'TEACHER', 'SUPER_ADMIN']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="papers"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <AdminPaperManagerPage />
                  </Suspense>
                }
              />
              <Route
                path="dashboard"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
              <Route
                path="students"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <StudentManagementPage />
                  </Suspense>
                }
              />
              <Route
                path="content-review"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ContentVerificationPage />
                  </Suspense>
                }
              />
              <Route
                path="guide"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <AdminExamGuidePage />
                  </Suspense>
                }
              />
              <Route
                path="import"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <QuestionImporterPage />
                  </Suspense>
                }
              />
              <Route
                path="mock-creator"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
              <Route
                path="analytics"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* ── Root redirect based on auth state ── */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* ── Catch-all: redirect to login ── */}
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
