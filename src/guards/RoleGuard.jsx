import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';












/**
 * Route guard that checks authentication and role.
 *
 * Usage in Router:
 *   <Route element={<RoleGuard allowedRoles={['school_admin', 'branch_admin']} />}>
 *     <Route path="dashboard" element={<Dashboard />} />
 *   </Route>
 */
const RoleGuard = ({
  allowedRoles,
  loginPath = '/auth/login',
  unauthorizedPath = '/auth/403',
  children
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Still loading auth state — show nothing to avoid flash
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>);

  }

  // Not authenticated → redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to={loginPath} replace />;
  }

  // Check role if allowedRoles specified
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={unauthorizedPath} replace />;
  }

  return <>{children ?? <Outlet />}</>;
};

export default RoleGuard;