// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from './theme';
import { useAuth } from './contexts/AuthContext';
import { FacilityAdminLayout } from './components/layouts/FacilityAdminLayout/FacilityAdminLayout';

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

import { LiveCallInterface } from './pages/agent/LiveCallInterface/LiveCallInterface';
import { CallSummaryScreen } from './pages/agent/CallSummaryScreen/CallSummaryScreen';
import { SupervisorDashboard } from './pages/supervisor/SupervisorDashboard/SupervisorDashboard';
import Demographics from './pages/supervisor/Demographics/Demographics';
import StaffPerformance from './pages/supervisor/StaffPerformance/StaffPerformance';
import SupervisorAnalytics from './pages/supervisor/Analytics/Analytics';
import TopicAnalysis from './pages/supervisor/TopicAnalysis/TopicAnalysis';
import QualityMetrics from './pages/supervisor/QualityMetrics/QualityMetrics';
import CallAgentLeaderboard from './pages/supervisor/SuperviserPopup/CallAgentLeaderboard';
import AreasForImprovementDrawer from './pages/supervisor/SuperviserPopup/AreasForImprovementDrawer';
import CallHistoryTab from './pages/supervisor/CallHistoryTab/CallHistoryTab';
import EscalatedCallReview from './pages/supervisor/EscalatedCallReview/EscalatedCallReview';
import StaffDetailsPage from './pages/supervisor/StaffDetailsPage/StaffDetailsPage';
import { CallHistory as SupervisorCallHistory } from './pages/supervisor/CallHistory/CallHistory';
import { CallDetails as SupervisorCallDetails } from './pages/supervisor/CallDetails/CallDetails';
import AdminDashboard from './pages/admin/AdminDashboard/AdminDashboard';
import FacilityUsersPage from './pages/admin/FacilityUsersPage/FacilityUsersPage';
import DashboardOverviewPage from './pages/admin/DashboardOverviewPage/DashboardOverviewPage';
import { UserManagement } from './pages/admin/UserManagement/UserManagement';
import FacilitiesManagement from './pages/admin/FacilitiesManagement/FacilitiesManagement';
import FacilitiesManagement2 from './pages/admin/FacilitiesManagement2/FacilitiesManagement2';
import FacilityUserManagement from './pages/admin/FacilityUserManagement/FacilityUserManagement';
import FacilityDetails from './pages/admin/FacilityDetails/FacilityDetails';
import { LandingPage } from './pages/public/LandingPage';
import { CallHistory } from './pages/agent/CallHistory/CallHistory';
import { Analytics } from './pages/agent/Analytics/Analytics';
import { LiveMonitoring } from './pages/supervisor/LiveMonitoring/LiveMonitoring';
import { VoicemailListPage } from './pages/agent/VoicemailListPage/VoicemailListPage';
import { VoicemailPage } from './pages/agent/VoicemailPage/VoicemailPage';
import { MissedCallsPage } from './pages/agent/MissedCallsPage/MissedCallsPage';
import ViewFacilityAdmin from './pages/FacilityAdmin/ViewFacilityAdmin/ViewFacilityAdmin';
import { AgentDashboard } from './pages/agent/AgentDashboard/AgentDashboard';
import { CallDetailsPage } from './components/common/CallDetailsPage';
import { CallReviewScreen } from './pages/shared/CallReviewScreen/CallReviewScreen';
import Settings from './components/Settings/settings';
import { LoginPage } from './pages/auth/LoginPage';
import Escalations from './pages/agent/Escalations/Escalations';

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
      <Route path="/escalations" element={<Escalations />} />
      <Route path="/live-call" element={<LiveCallInterface />} />
      <Route path="/call-details/:callId" element={<CallDetailsPage />} />
      <Route path="/call-summary/:callId" element={<CallSummaryScreen />} />
      <Route path="/call-history" element={<CallHistory />} />
      <Route path="/voicemail" element={<VoicemailListPage />} />
      <Route path="/voicemail/:voicemailId" element={<VoicemailPage />} />
      <Route path="/missed-calls" element={<MissedCallsPage />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/training" element={<div>Training Materials Page</div>} />
      <Route path="/emergency" element={<div>Emergency Guide Page</div>} />
      <Route path="/help" element={<div>Help and Support Page</div>} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/call-review/:callId" element={<CallReviewScreen />} />
      <Route path="*" element={<Navigate to="/agent/dashboard" replace />} />
    </Routes>
  );
};

const SupervisorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<SupervisorDashboard />} />
      <Route path="live-monitoring" element={<LiveMonitoring />} />
      <Route path="escalations" element={<EscalatedCallReview />} />
      <Route path="escalated-reviews" element={<EscalatedCallReview />} />
      <Route path="call-history" element={<SupervisorCallHistory />} />
      <Route path="call-detail" element={<SupervisorCallDetails />} />
      <Route path="staff-performance" element={<StaffPerformance />} />
      
      {/* Staff Details with dynamic userId parameter */}
      <Route path="staff-details/:userId" element={<StaffDetailsPage />} />
      <Route path="staff-details/:userId/call-history" element={<CallHistoryTab />} />
      
      <Route path="analytics" element={<SupervisorAnalytics />} />
      <Route path="Demographics" element={<Demographics />} />
      <Route path="TopicAnalysis" element={<TopicAnalysis />} />
      <Route path="QualityMetrics" element={<QualityMetrics />} />
      <Route path="training" element={<div>Training Materials Page</div>} />
      <Route path="help" element={<div>Help and Support Page</div>} />
      <Route path="settings" element={<Settings />} />
      <Route path="call-review/:callId" element={<CallReviewScreen />} />
      <Route path="*" element={<Navigate to="/supervisor" replace />} />
    </Routes>
  );
};

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="FacilitiesManagement" element={<FacilitiesManagement />} />
      <Route path="FacilitiesManagement2" element={<FacilitiesManagement2 />} />
      <Route path="FacilityDetails" element={<FacilityDetails />} />
      <Route path="FacilityUsersPage" element={<FacilityUsersPage />} />
      <Route path="FacilityUserManagement" element={<FacilityUserManagement />} />
      <Route path="DashboardOverviewPage" element={<DashboardOverviewPage />} />
      <Route path="system" element={<div>System Health Page</div>} />
      <Route path="analytics" element={<div>Analytics Page</div>} />
      <Route path="security" element={<div>Security Page</div>} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

const FacilityAdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ViewFacilityAdmin />} />
      <Route path="dashboard" element={<ViewFacilityAdmin />} />
      <Route path="users" element={<div>Manage Facility Users</div>} />
      <Route path="reports" element={<div>Reports Page</div>} />
      <Route path="analytics" element={<div>Facility Analytics</div>} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/facility-admin/dashboard" replace />} />
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
                <Route
                  path="/CallHistory"
                  element={
                    <ProtectedRoute roles={['supervisor']}>
                      <Navigate to="/supervisor/CallHistory" replace />
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

                {/* Facility Admin routes with Facility Admin Layout */}
                <Route
                  path="/facility-admin/*"
                  element={
                    <ProtectedRoute roles={['facility_admin']}>
                      <FacilityAdminLayout>
                        <FacilityAdminRoutes />
                      </FacilityAdminLayout>
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
    case 'facility_admin':
      return <Navigate to="/facility-admin/dashboard" replace />;
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