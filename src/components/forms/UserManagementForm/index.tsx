// 3. src/components/forms/UserManagementForm/index.tsx
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  CircularProgress,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: 'agent',
    firstName: 'James',
    lastName: 'Gipir',
    email: 'james.gipir@butabikahospital.go.ug',
    password: 'james1@0.89q17',
    ...initialData
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {mode === 'register' && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
            Select your role
          </Typography>
          <RadioGroup
            row
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <FormControlLabel
              value="agent"
              control={<Radio sx={{ color: '#008080', '&.Mui-checked': { color: '#008080' } }} />}
              label="Call Agent"
              sx={{ mr: 3, '& .MuiFormControlLabel-label': { fontSize: '0.95rem' } }}
            />
            <FormControlLabel
              value="supervisor"
              control={<Radio sx={{ color: '#008080', '&.Mui-checked': { color: '#008080' } }} />}
              label="Supervisor"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.95rem' } }}
            />
          </RadioGroup>
        </Box>
      )}

      <TextField
        fullWidth
        label="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        sx={{ mb: 3 }}
        required
      />

      <TextField
        fullWidth
        label="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        sx={{ mb: 3 }}
        required
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        sx={{ mb: 3 }}
        required
      />

      {mode === 'register' && (
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
          required
        />
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{
          bgcolor: '#008080',
          color: 'white',
          py: 1.5,
          fontSize: '1rem',
          fontWeight: 500,
          textTransform: 'none',
          borderRadius: 2,
          '&:hover': { bgcolor: '#006666' },
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