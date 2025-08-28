// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from './theme';
import { useAuth } from './contexts/AuthContext';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Layout Components
import { AgentLayout } from './components/layouts/AgentLayout/AgentLayout';
import { SupervisorLayout } from './components/layouts/SupervisorLayout/SupervisorLayout';
import { AdminLayout } from './components/layouts/AdminLayout/AdminLayout';

// Components
import { ProtectedRoute } from './components/common/ProtectedRoute/ProtectedRoute';

// Pages
import { AgentDashboard } from './pages/agent/AgentDashboard/AgentDashboard';
import { LoginPage } from './pages/auth/LoginPage';
import { LiveCallInterface } from './pages/agent/LiveCallInterface/LiveCallInterface';
import { CallSummaryScreen } from './pages/agent/CallSummaryScreen/CallSummaryScreen';
import { SupervisorDashboard } from './pages/supervisor/SupervisorDashboard/SupervisorDashboard';
import { EscalatedCallReview } from './pages/supervisor/EscalatedCallReview/EscalatedCallReview';
import { AdminDashboard } from './pages/admin/AdminDashboard/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement/UserManagement';
import { CallReviewScreen } from './pages/shared/CallReviewScreen/CallReviewScreen';
import { LandingPage } from './pages/public/LandingPage';
import { CallHistory } from './pages/agent/CallHistory/CallHistory';
import { Analytics } from './pages/agent/Analytics/Analytics';
import { LiveMonitoring } from './pages/supervisor/LiveMonitoring/LiveMonitoring';
import { VoicemailListPage } from './pages/agent/VoicemailListPage/VoicemailListPage';
import { VoicemailPage } from './pages/agent/VoicemailPage/VoicemailPage';
import { MissedCallsPage } from './pages/agent/MissedCallsPage/MissedCallsPage';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Role-based route components
const AgentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AgentDashboard />} />
      <Route path="/active-calls" element={<LiveCallInterface />} />
      <Route path="/live-call" element={<LiveCallInterface />} />
      <Route path="/call-summary/:callId" element={<CallSummaryScreen />} />
      <Route path="/call-history" element={<CallHistory />} />
      <Route path="/voicemail" element={<VoicemailListPage />} />
      <Route path="/voicemail/:voicemailId" element={<VoicemailPage />} />
      <Route path="/missed-calls" element={<MissedCallsPage />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/training" element={<div>Training Materials Page</div>} />
      <Route path="/emergency" element={<div>Emergency Guide Page</div>} />
      <Route path="/help" element={<div>Help and Support Page</div>} />
      <Route path="/settings" element={<div>Settings Page</div>} />
      <Route path="/call-review/:callId" element={<CallReviewScreen />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const SupervisorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/supervisor" element={<SupervisorDashboard />} />
      <Route path="/live-monitoring" element={<LiveMonitoring />} />
      <Route path="/escalations" element={<EscalatedCallReview />} />
      <Route path="/escalated-reviews" element={<EscalatedCallReview />} />
      <Route path="/call-history" element={<div>Call History Page</div>} />
      <Route path="/staff-performance" element={<div>Staff Performance Page</div>} />
      <Route path="/analytics" element={<div>Analytics Page</div>} />
      <Route path="/training" element={<div>Training Materials Page</div>} />
      <Route path="/help" element={<div>Help and Support Page</div>} />
      <Route path="/settings" element={<div>Settings Page</div>} />
      <Route path="/call-review/:callId" element={<CallReviewScreen />} />
      <Route path="*" element={<Navigate to="/supervisor" replace />} />
    </Routes>
  );
};

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/system" element={<div>System Health Page</div>} />
      <Route path="/admin/analytics" element={<div>Analytics Page</div>} />
      <Route path="/admin/security" element={<div>Security Page</div>} />
      <Route path="/admin/settings" element={<div>Settings Page</div>} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <NotificationProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Agent routes with Agent Layout */}
                <Route
                  path="/agent/*"
                  element={
                    <ProtectedRoute roles={['agent']}>
                      <AgentLayout>
                        <AgentRoutes />
                      </AgentLayout>
                    </ProtectedRoute>
                  }
                />
                
                {/* Legacy agent routes - redirect to new structure */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute roles={['agent']}>
                      <Navigate to="/agent/dashboard" replace />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/live-call"
                  element={
                    <ProtectedRoute roles={['agent']}>
                      <Navigate to="/agent/live-call" replace />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/call-summary/:callId"
                  element={
                    <ProtectedRoute roles={['agent']}>
                      <Navigate to="/agent/call-summary/:callId" replace />
                    </ProtectedRoute>
                  }
                />

                {/* Supervisor routes with Supervisor Layout */}
                <Route
                  path="/supervisor/*"
                  element={
                    <ProtectedRoute roles={['supervisor']}>
                      <SupervisorLayout>
                        <SupervisorRoutes />
                      </SupervisorLayout>
                    </ProtectedRoute>
                  }
                />
                
                {/* Legacy supervisor routes - redirect to new structure */}
                <Route
                  path="/escalated-reviews"
                  element={
                    <ProtectedRoute roles={['supervisor']}>
                      <Navigate to="/supervisor/escalated-reviews" replace />
                    </ProtectedRoute>
                  }
                />

                {/* Admin routes with Admin Layout */}
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute roles={['admin']}>
                      <AdminLayout>
                        <AdminRoutes />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Shared routes - determine layout based on user role */}
                <Route
                  path="/call-review/:callId"
                  element={
                    <ProtectedRoute roles={['agent', 'supervisor']}>
                      <RoleBasedCallReview />
                    </ProtectedRoute>
                  }
                />

                {/* Default redirects based on role */}
                <Route
                  path="/dashboard-redirect"
                  element={
                    <ProtectedRoute>
                      <RoleBasedDashboardRedirect />
                    </ProtectedRoute>
                  }
                />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/dashboard-redirect" replace />} />
              </Routes>
            </Router>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Helper component to redirect based on user role
const RoleBasedDashboardRedirect: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  switch (user.role) {
    case 'agent':
      return <Navigate to="/agent/dashboard" replace />;
    case 'supervisor':
      return <Navigate to="/supervisor" replace />;
    case 'admin':
      return <Navigate to="/admin" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

// Helper component for shared call review with role-based layout
const RoleBasedCallReview: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role === 'agent') {
    return (
      <AgentLayout>
        <CallReviewScreen />
      </AgentLayout>
    );
  }
  
  if (user.role === 'supervisor') {
    return (
      <SupervisorLayout>
        <CallReviewScreen />
      </SupervisorLayout>
    );
  }
  
  return <Navigate to="/login" replace />;
};

export default App;