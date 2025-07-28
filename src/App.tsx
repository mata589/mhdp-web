// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from './theme';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Components
import { Header } from './components/common/Header/Header';
import { Sidebar } from './components/common/Sidebar/Sidebar';
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


// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          ml: { sm: '240px' }, // sidebar width
          mt: '64px', // header height
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Moved CssBaseline here to apply globally */}
        <AuthProvider>
          <NotificationProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected routes with layout */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Navigate to="/dashboard" replace />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                
                {/* Agent routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute roles={['agent']}>
                      <AppLayout>
                        <AgentDashboard />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/live-call"
                  element={
                    <ProtectedRoute roles={['agent']}>
                      <AppLayout>
                        <LiveCallInterface />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/call-summary/:callId"
                  element={
                    <ProtectedRoute roles={['agent']}>
                      <AppLayout>
                        <CallSummaryScreen />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Supervisor routes */}
                <Route
                  path="/supervisor"
                  element={
                    <ProtectedRoute roles={['supervisor']}>
                      <AppLayout>
                        <SupervisorDashboard />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/escalated-reviews"
                  element={
                    <ProtectedRoute roles={['supervisor']}>
                      <AppLayout>
                        <EscalatedCallReview />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Admin routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute roles={['admin']}>
                      <AppLayout>
                        <AdminDashboard />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute roles={['admin']}>
                      <AppLayout>
                        <UserManagement />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Shared routes */}
                <Route
                  path="/call-review/:callId"
                  element={
                    <ProtectedRoute roles={['agent', 'supervisor']}>
                      <AppLayout>
                        <CallReviewScreen />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Router>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;