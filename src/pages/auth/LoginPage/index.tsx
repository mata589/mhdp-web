// src/pages/auth/LoginPage/index.tsx
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Alert } from '@mui/material';
import { OTPVerification } from '../../../components/common/ConsentDialog/OTPVerification';
import { LoginForm } from '../../../components/forms/LoginForm';

export const LoginPage: React.FC = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleOTPSuccess = () => {
    console.log('OTP verified successfully');
    setShowOTP(false);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

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
            Login to your account
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Please enter your details to sign in
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <LoginForm onError={handleError} />
        </CardContent>
      </Card>
    </Box>
  );
};