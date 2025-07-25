// src/components/common/ProtectedRoute/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Alert, AlertTitle } from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[]; // If provided, user must have one of these roles
  requireAuth?: boolean; // Default: true
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
  requireAuth = true,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  // Redirect to login if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access if roles are specified
  if (roles && user && !roles.includes(user.role)) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
        p={3}
      >
        <Alert severity="error" sx={{ maxWidth: 400 }}>
          <AlertTitle>Access Denied</AlertTitle>
          You don't have permission to access this page. Your role ({user.role}) 
          is not authorized for this resource.
        </Alert>
      </Box>
    );
  }

  // If user is authenticated and authorized, render the protected component
  return <>{children}</>;
};

// Higher-order component for route protection
export const withProtection = (
  Component: React.ComponentType<any>,
  options: { roles?: string[]; requireAuth?: boolean } = {}
) => {
  const ProtectedComponent: React.FC<any> = (props) => (
    <ProtectedRoute {...options}>
      <Component {...props} />
    </ProtectedRoute>
  );

  ProtectedComponent.displayName = `withProtection(${Component.displayName || Component.name})`;
  
  return ProtectedComponent;
};