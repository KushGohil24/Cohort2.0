import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const Protected = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show a beautifully styled loading screen while checking authentication status
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-[#c9a96e] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs uppercase tracking-[3px] text-[#c9a96e] font-medium">Verifying Session...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home if user does not have the required role (e.g. 'seller')
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Protected;
