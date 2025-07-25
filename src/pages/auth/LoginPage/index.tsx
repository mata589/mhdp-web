// 1. src/pages/auth/LoginPage/index.tsx
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Tabs, Tab, Alert } from '@mui/material';
import { OTPVerification } from '../../../components/common/ConsentDialog/OTPVerification';
import { LoginForm } from '../../../components/forms/LoginForm';
import { UserManagementForm } from '../../../components/forms/UserManagementForm';
// import { LoginForm } from '../../../components/forms/LoginForm';
// import { UserManagementForm } from '../../../components/forms/UserManagementForm';
// import { OTPVerification } from '../../../components/common/ConsentDialog/OTPVerification';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export const LoginPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(1);
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const handleLoginSuccess = () => {
    // Handle successful login
    console.log('Login successful');
  };

  const handleRegistrationSuccess = (email: string) => {
    setUserEmail(email);
    setShowOTP(true);
  };

  const handleOTPSuccess = () => {
    // Handle successful OTP verification
    console.log('OTP verified successfully');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (showOTP) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f8f9fa',
          p: 2,
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 440,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <OTPVerification
              email={userEmail}
              onSuccess={handleOTPSuccess}
              onError={handleError}
            />
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f8f9fa',
        p: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 440,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
            Create your account
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Welcome Back! Please enter your details
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                '& .MuiTabs-indicator': { display: 'none' },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  borderRadius: 2,
                  color: '#666',
                  bgcolor: '#f5f5f5',
                  mr: 1,
                  minWidth: 120,
                  '&.Mui-selected': {
                    color: '#333',
                    bgcolor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  },
                },
              }}
            >
              <Tab label="Login" value={0} />
              <Tab label="Sign Up" value={1} />
            </Tabs>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <TabPanel value={tabValue} index={0}>
            <LoginForm onSuccess={handleLoginSuccess} onError={handleError} />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <UserManagementForm 
              mode="register" 
              onSuccess={handleRegistrationSuccess} 
              onError={handleError} 
            />
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
};
