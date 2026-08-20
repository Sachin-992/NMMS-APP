import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { Role } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated || !role) {
    // Not authenticated: redirect to appropriate login page
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Authenticated but wrong role
    if (role === 'STUDENT') {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};
