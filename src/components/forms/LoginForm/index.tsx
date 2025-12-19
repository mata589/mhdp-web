// src/components/forms/LoginForm/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import type { User } from '../../../services/api/userApi';
//import type { User } from '../../../types/user.types';

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  onForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError, onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Role-based dashboard routing - updated to match App.tsx routes
  const getDashboardRoute = (userRole: string): string => {
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'supervisor':
        return '/supervisor';
      case 'agent':
        return '/agent/dashboard';
      case 'facility_admin':
        return '/facility-admin/dashboard';
      default:
        return '/dashboard-redirect'; // Use the redirect helper
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      onError?.('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const user: User = await login(email, password);
      
      console.log('[LoginForm] Login successful, user:', user);
      console.log('[LoginForm] User role:', user.role);
      
      // Navigate to role-appropriate dashboard
      const dashboardRoute = getDashboardRoute(user.role!);
      navigate(dashboardRoute, { replace: true });
      
      onSuccess?.();
    } catch (error) {
      console.error('[LoginForm] Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please check your credentials.';
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    } else {
      // Default behavior - navigate to forgot password page
      navigate('/forgot-password');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        disabled={isLoading}
        autoComplete="email"
      />
      
      <TextField
        fullWidth
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
        disabled={isLoading}
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                disabled={isLoading}
                edge="end"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Forgot Password Link */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
        <Link
          component="button"
          type="button"
          onClick={handleForgotPassword}
          disabled={isLoading}
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
              color: 'primary.dark',
            },
            '&:disabled': {
              color: 'text.disabled',
              cursor: 'not-allowed',
            },
          }}
        >
          Forgot password?
        </Link>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={isLoading}
        sx={{
          mt: 1,
          mb: 2,
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Login to your account'
        )}
      </Button>
    </Box>
  );
};

export default LoginForm;