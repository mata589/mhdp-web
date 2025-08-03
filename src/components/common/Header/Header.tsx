// src/components/common/Header/Header.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';

const DRAWER_WIDTH = 320;

export const Header: React.FC = () => {
  const { user } = useAuth();

  const getHeaderTitle = () => {
    if (!user) return 'Dashboard';

    switch (user.role) {
      case 'agent':
      case 'supervisor':
        return 'Dashboard';
      case 'admin':
        return 'Admin Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'white',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid #e5e7eb',
        ml: `${DRAWER_WIDTH}px`,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        height: '102px',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: '102px',
          px: 3,
          alignItems: 'center',
          display: 'flex',
          height: '102px',
        }}
      >
        {/* Left: Page Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '1.375rem',
              lineHeight: '1.4',
              fontFamily: 'Inter, sans-serif',
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}
          >
            {getHeaderTitle()}
          </Typography>
        </Box>

        {/* Right: Search + Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, height: '100%' }}>
          {/* Search Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <TextField
              placeholder="Search for anything here..."
              size="medium"
              sx={{
                width: 450,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  height: '48px',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d1d5db',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: '1px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: '0.9375rem',
                  '&::placeholder': {
                    color: '#9ca3af',
                    opacity: 1,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#9ca3af', fontSize: '1.375rem' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: '1px',
              height: '32px',
              bgcolor: '#e5e7eb',
            }}
          />

          {/* Notifications */}
          <IconButton
            size="medium"
            sx={{
              bgcolor: '#f9fafb',
              border: '1px solid #e5e7eb',
              width: 44,
              height: 44,
              '&:hover': {
                bgcolor: '#f3f4f6',
              },
            }}
          >
            <Badge
              badgeContent={user?.role === 'supervisor' ? 2 : 0}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.75rem',
                  minWidth: '18px',
                  height: '18px',
                },
              }}
            >
              <NotificationsIcon sx={{ fontSize: '1.375rem', color: '#6b7280' }} />
            </Badge>
          </IconButton>

          {/* Avatar */}
          <Avatar
            sx={{
              width: 44,
              height: 44,
              bgcolor: 'primary.main',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
