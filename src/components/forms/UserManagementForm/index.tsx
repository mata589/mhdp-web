// src/components/forms/UserManagementForm/index.tsx
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  CircularProgress,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface UserManagementFormProps {
  mode: 'register' | 'edit';
  onSuccess: (email: string) => void;
  onError: (error: string) => void;
  initialData?: any;
}

export const UserManagementForm: React.FC<UserManagementFormProps> = ({ 
  mode, 
  onSuccess, 
  onError,
  initialData 
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    ...initialData
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      onError('Please fill in all required fields');
      return;
    }
    
    if (mode === 'register' && (!formData.role || !formData.password)) {
      onError('Please select a role and enter a password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      onSuccess(formData.email);
    } catch (err) {
      onError('Operation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {mode === 'register' && (
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 2, 
              fontWeight: 500,
              color: 'text.primary',
              fontSize: '0.95rem'
            }}
          >
            Select your role
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Call Agent Option */}
            <Box
              onClick={() => setFormData({ ...formData, role: 'agent' })}
              sx={{
                flex: 1,
                border: formData.role === 'agent' ? `2px solid ${theme.palette.primary.main}` : '1px solid #d1d5db',
                borderRadius: typeof theme.shape.borderRadius === 'number' ? theme.shape.borderRadius : 4, // Safe theme border radius
                p: 2,
                cursor: 'pointer',
                backgroundColor: formData.role === 'agent' ? `${theme.palette.primary.main}08` : 'background.paper',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: `${theme.palette.primary.main}08`,
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: formData.role === 'agent' ? `6px solid ${theme.palette.primary.main}` : '2px solid #d1d5db',
                    backgroundColor: formData.role === 'agent' ? theme.palette.primary.main : 'transparent',
                    transition: 'all 0.2s ease-in-out',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: formData.role === 'agent' ? 'primary.main' : 'text.primary',
                  }}
                >
                  Call Agent
                </Typography>
              </Box>
            </Box>

            {/* Supervisor Option */}
            <Box
              onClick={() => setFormData({ ...formData, role: 'supervisor' })}
              sx={{
                flex: 1,
                border: formData.role === 'supervisor' ? `2px solid ${theme.palette.primary.main}` : '1px solid #d1d5db',
                borderRadius: typeof theme.shape.borderRadius === 'number' ? theme.shape.borderRadius : 4, // Safe theme border radius
                p: 2,
                cursor: 'pointer',
                backgroundColor: formData.role === 'supervisor' ? `${theme.palette.primary.main}08` : 'background.paper',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: `${theme.palette.primary.main}08`,
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: formData.role === 'supervisor' ? `6px solid ${theme.palette.primary.main}` : '2px solid #d1d5db',
                    backgroundColor: formData.role === 'supervisor' ? theme.palette.primary.main : 'transparent',
                    transition: 'all 0.2s ease-in-out',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: formData.role === 'supervisor' ? 'primary.main' : 'text.primary',
                  }}
                >
                  Supervisor
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <TextField
        fullWidth
        label="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        margin="normal"
        required
        disabled={isLoading}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        margin="normal"
        required
        disabled={isLoading}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        margin="normal"
        required
        disabled={isLoading}
        sx={{ mb: 2 }}
      />

      {mode === 'register' && (
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          margin="normal"
          required
          disabled={isLoading}
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
          sx={{ mb: 3 }}
        />
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        disabled={isLoading}
        sx={{
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          mode === 'register' ? 'Create account' : 'Update'
        )}
      </Button>
    </Box>
  );
};