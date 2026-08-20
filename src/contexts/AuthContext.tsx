import React, { createContext, useContext, useState } from 'react';
import type { Role, Student, UserProfile } from '../types';
import { getStudentByCredentials, saveStudent } from '../services/storage';

interface AuthState {
  user: UserProfile | null;
  student: Student | null;
  role: Role | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  loginStudent: (studentId: string, pin: string) => Promise<{ success: boolean; message?: string }>;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateCurrentStudentXP: (xpAmount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    // Restore from localStorage only if credentials were previously saved by an explicit login
    const savedUser = localStorage.getItem('pum_auth_user');
    const savedStudent = localStorage.getItem('pum_auth_student');
    const savedRole = localStorage.getItem('pum_auth_role') as Role | null;

    if (savedRole === 'STUDENT' && savedStudent) {
      try {
        const parsed = JSON.parse(savedStudent);
        // Only restore if the student object has expected fields (prevent stale/corrupt data)
        if (parsed && parsed.student_id && parsed.pin) {
          return {
            user: null,
            student: parsed,
            role: 'STUDENT',
            isAuthenticated: true
          };
        }
      } catch {
        // Corrupt storage — clear and require fresh login
        localStorage.removeItem('pum_auth_student');
        localStorage.removeItem('pum_auth_role');
      }
    }

    if ((savedRole === 'ADMIN' || savedRole === 'TEACHER' || savedRole === 'SUPER_ADMIN') && savedUser) {
      try {
        return {
          user: JSON.parse(savedUser),
          student: null,
          role: savedRole,
          isAuthenticated: true
        };
      } catch {
        localStorage.removeItem('pum_auth_user');
        localStorage.removeItem('pum_auth_role');
      }
    }

    // No valid session found — require explicit login
    return { user: null, student: null, role: null, isAuthenticated: false };
  });

  const loginStudent = async (studentId: string, pin: string) => {
    const found = getStudentByCredentials(studentId, pin);
    if (!found) {
      return { success: false, message: 'Invalid Student ID or PIN. Please check with your teacher.' };
    }

    localStorage.setItem('pum_auth_student', JSON.stringify(found));
    localStorage.setItem('pum_auth_role', 'STUDENT');
    localStorage.removeItem('pum_auth_user');

    setAuth({
      user: null,
      student: found,
      role: 'STUDENT',
      isAuthenticated: true
    });

    return { success: true };
  };

  const loginAdmin = async (email: string, pass: string) => {
    const trimmed = email.trim().toLowerCase();

    if (trimmed === 'admin@pum.edu.in' && pass === 'admin123') {
      const adminUser: UserProfile = {
        id: 'admin-usr-1',
        role: 'ADMIN',
        full_name: 'PUM Admin Teacher',
        email: 'admin@pum.edu.in',
        created_at: new Date().toISOString()
      };
      localStorage.setItem('pum_auth_user', JSON.stringify(adminUser));
      localStorage.setItem('pum_auth_role', 'ADMIN');
      localStorage.removeItem('pum_auth_student');

      setAuth({
        user: adminUser,
        student: null,
        role: 'ADMIN',
        isAuthenticated: true
      });
      return { success: true };
    }

    if (trimmed === 'teacher@pum.edu.in' && pass === 'teacher123') {
      const teacherUser: UserProfile = {
        id: 'teacher-usr-1',
        role: 'TEACHER',
        full_name: 'Subject Teacher',
        email: 'teacher@pum.edu.in',
        created_at: new Date().toISOString()
      };
      localStorage.setItem('pum_auth_user', JSON.stringify(teacherUser));
      localStorage.setItem('pum_auth_role', 'TEACHER');
      localStorage.removeItem('pum_auth_student');

      setAuth({
        user: teacherUser,
        student: null,
        role: 'TEACHER',
        isAuthenticated: true
      });
      return { success: true };
    }

    return { success: false, message: 'Invalid Admin or Teacher credentials.' };
  };

  const logout = () => {
    localStorage.removeItem('pum_auth_user');
    localStorage.removeItem('pum_auth_student');
    localStorage.removeItem('pum_auth_role');
    setAuth({ user: null, student: null, role: null, isAuthenticated: false });
  };

  const updateCurrentStudentXP = (xpAmount: number) => {
    if (!auth.student) return;
    const newXP = auth.student.xp + xpAmount;
    let newLevel = auth.student.level;
    if (newXP >= 2500) newLevel = 8;
    else if (newXP >= 1700) newLevel = 7;
    else if (newXP >= 1200) newLevel = 6;
    else if (newXP >= 800) newLevel = 5;
    else if (newXP >= 500) newLevel = 4;
    else if (newXP >= 250) newLevel = 3;
    else if (newXP >= 100) newLevel = 2;
    else newLevel = 1;

    const updated = { ...auth.student, xp: newXP, level: newLevel };
    saveStudent(updated);
    localStorage.setItem('pum_auth_student', JSON.stringify(updated));
    setAuth(prev => ({ ...prev, student: updated }));
  };

  return (
    <AuthContext.Provider value={{
      ...auth,
      loginStudent,
      loginAdmin,
      logout,
      updateCurrentStudentXP
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
