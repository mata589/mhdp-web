// 4. src/components/common/ConsentDialog/OTPVerification.tsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

interface OTPVerificationProps {
  email: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({ 
  email, 
  onSuccess, 
  onError 
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(269);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length === 6) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('OTP Verified:', code);
        onSuccess();
      } catch (err) {
        onError('Invalid OTP code');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('OTP Resent');
      setTimeLeft(269);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        Verify your email
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        An OTP code has been sent to <strong>{email}</strong>
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 3 }}>
        {otp.map((digit, index) => (
          <TextField
            key={index}
            id={`otp-${index}`}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            inputProps={{
              maxLength: 1,
              style: { 
                textAlign: 'center', 
                fontSize: '1.5rem',
                fontWeight: 600,
              }
            }}
            sx={{
              width: 56,
              height: 56,
              '& .MuiOutlinedInput-root': {
                height: 56,
                borderRadius: 2,
                '&.Mui-focused': {
                  '& fieldset': {
                    borderColor: '#008080',
                    borderWidth: 2,
                  }
                }
              }
            }}
          />
        ))}
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Code expires in <strong>{formatTime(timeLeft)}</strong>
      </Typography>
      
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleVerify}
        disabled={otp.join('').length !== 6 || isLoading}
        sx={{
          bgcolor: '#008080',
          color: 'white',
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 500,
          textTransform: 'none',
          borderRadius: 2,
          mb: 2,
          '&:hover': { bgcolor: '#006666' },
          '&:disabled': { bgcolor: '#cccccc' }
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verify'}
      </Button>
      
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Didn't get verification code?{' '}
          <Button
            variant="text"
            onClick={handleResend}
            sx={{
              color: '#008080',
              textTransform: 'none',
              p: 0,
              minWidth: 'auto',
              textDecoration: 'underline',
              '&:hover': {
                bgcolor: 'transparent',
                textDecoration: 'underline',
              }
            }}
          >
            Resend
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};
