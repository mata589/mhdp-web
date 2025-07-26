// src/pages/auth/LoginPage/index.tsx
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Tabs, Tab, Alert } from '@mui/material';
import { OTPVerification } from '../../../components/common/ConsentDialog/OTPVerification';
import { LoginForm } from '../../../components/forms/LoginForm';
import { UserManagementForm } from '../../../components/forms/UserManagementForm';

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
  const [tabValue, setTabValue] = useState(0);
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const handleRegistrationSuccess = (email: string) => {
    setUserEmail(email);
    setShowOTP(true);
  };

  const handleOTPSuccess = () => {
    // Handle successful OTP verification
    console.log('OTP verified successfully');
    // You might want to auto-login the user here or redirect to login tab
    setShowOTP(false);
    setTabValue(0); // Switch to login tab
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  // Common container styles for both OTP and main login
  const containerStyles = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: '#f8f9fa',
    p: 2,
    margin: 0,
    overflow: 'auto',
  };

  if (showOTP) {
    return (
      <Box sx={containerStyles}>
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
    <Box sx={containerStyles}>
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
            {tabValue === 0 ? 'Welcome Back' : 'Create your account'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {tabValue === 0 
              ? 'Please enter your details to sign in' 
              : 'Please fill in your information to get started'
            }
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
            <LoginForm onError={handleError} />
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