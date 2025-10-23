import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Avatar,
  Chip,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToggleTabs } from '../common/ToggleTabs/ToggleTabs';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Profile form state
  const [firstName, setFirstName] = useState('James');
  const [lastName, setLastName] = useState('Gipir');
  const [email, setEmail] = useState('james.gipir@gmail.com');
  const [phoneCode, setPhoneCode] = useState('+256');
  const [phoneNumber, setPhoneNumber] = useState('708 345 890');
  const [address, setAddress] = useState('Kawempe, Ttula');
  
  // Security form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleTabChange = (newValue: string | number) => {
    setActiveTab(newValue as string);
  };

  const handleSaveChanges = () => {
    console.log('Save profile changes');
  };

  const handleUpdatePassword = () => {
    console.log('Update password');
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', p: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header Card with User Info */}
        <Card sx={{ 
          p: 3, 
          mb: 3, 
          boxShadow: 'none',
          borderRadius: 3,
          border: '1px solid #CCE5E5',
          //bgcolor: '#CCE5E5'
        }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: 3,
            mb: 2.5
          }}>
            {/* Full Name */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontSize: '0.75rem', color: '#6b7280' }}>
                Full Name
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
                <Avatar sx={{ 
                  bgcolor: '#e0f2f1', 
                  color: '#008080',
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}>
                  J
                </Avatar>
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.9rem', color: '#111827' }}>
                  James Gipir
                </Typography>
              </Box>
            </Box>

            {/* Role */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontSize: '0.75rem', color: '#6b7280' }}>
                Role
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.9rem', color: '#111827', mt: 1 }}>
                Call agent
              </Typography>
            </Box>

            {/* Designation */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontSize: '0.75rem', color: '#6b7280' }}>
                Designation
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.9rem', color: '#111827', mt: 1 }}>
                Peer Support Worker
              </Typography>
            </Box>

            {/* Facility */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontSize: '0.75rem', color: '#6b7280' }}>
                Facility
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.9rem', color: '#111827', mt: 1 }}>
                Butabika Hospital
              </Typography>
            </Box>
          </Box>

          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: 3,
            pt: 2.5
          }}>
            {/* Gender */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontSize: '0.75rem', color: '#6b7280' }}>
                Gender
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.9rem', color: '#111827', mt: 1 }}>
                Male
              </Typography>
            </Box>

            {/* Nationality */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontSize: '0.75rem', color: '#6b7280' }}>
                Nationality
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.9rem', color: '#111827', mt: 1 }}>
                Ugandan
              </Typography>
            </Box>

            {/* Status */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontSize: '0.75rem', color: '#6b7280' }}>
                Status
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip 
                  label="Active" 
                  size="small"
                  icon={<Box sx={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    bgcolor: '#10b981',
                    ml: 1
                  }} />}
                  sx={{ 
                    bgcolor: '#d1fae5',
                    color: '#065f46',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 22,
                    '& .MuiChip-icon': {
                      ml: 0
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Date Joined */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block', fontSize: '0.75rem', color: '#6b7280' }}>
                Date Joined
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.9rem', color: '#111827', mt: 1 }}>
                Mon, Jul 13, 2025 | 10:43 AM
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Tabs positioned on the left side */}
        <Box sx={{ mb: 4, maxWidth: 300 }}>
          <ToggleTabs
            tabs={[
              { label: 'Profile', value: 'profile' },
              { label: 'Security', value: 'security' }
            ]}
            value={activeTab}
            onChange={handleTabChange}
          />
        </Box>

        {/* Profile Tab Content */}
        {activeTab === 'profile' && (
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              Profile information
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Update your personal information and preferences
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* First Name and Last Name */}
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3
              }}>
                <Box>
                  <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                    First Name
                  </Typography>
                  <TextField
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                    Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Box>
              </Box>

              {/* Email */}
              <Box>
                <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>

              {/* Phone Number */}
              <Box>
                <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                  Phone Number
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <FormControl sx={{ width: 120 }}>
                    <Select
                      value={phoneCode}
                      onChange={(e) => setPhoneCode(e.target.value)}
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      <MenuItem value="+256">+256</MenuItem>
                      <MenuItem value="+254">+254</MenuItem>
                      <MenuItem value="+255">+255</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Box>
              </Box>

              {/* Address */}
              <Box>
                <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                  Address
                </Typography>
                <TextField
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>

              {/* Save Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSaveChanges}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  bgcolor: '#008080',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#005959'
                  }
                }}
              >
                Save changes
              </Button>
            </Box>
          </Box>
        )}

        {/* Security Tab Content */}
        {activeTab === 'security' && (
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              Security settings
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Manage your account security and access controls
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Current Password */}
              <Box>
                <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                  Current password
                </Typography>
                <TextField
                  fullWidth
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="********"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          edge="end"
                        >
                          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>

              {/* New Password */}
              <Box>
                <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                  New password
                </Typography>
                <TextField
                  fullWidth
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="********"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>

              {/* Confirm Password */}
              <Box>
                <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
                  Confirm Password
                </Typography>
                <TextField
                  fullWidth
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>

              {/* Update Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleUpdatePassword}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  bgcolor: '#008080',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#005959'
                  }
                }}
              >
                Update password
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Settings;