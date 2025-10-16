// src/components/layouts/AdminLayout/AdminHeader.tsx
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

const DRAWER_WIDTH = 240;

export const FacilityAdminHeader: React.FC = () => {
  const { user } = useAuth();

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
        height: '93px',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: '64px',
        
          px: 3,
          alignItems: 'center',
          display: 'flex',
          height: '64px',
        }}
      >
        {/* Left: Page Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '1.25rem',
              lineHeight: '1.4',
              fontFamily: 'Inter, sans-serif',
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              mt:3
            }}
          >
            Admin Dashboard
          </Typography>
        </Box>

        {/* Right: Search + Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' ,mt:4}}>
          {/* Search Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <TextField
              placeholder="Search for anything here..."
              size="small"
              sx={{
                width: 350,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  height: '40px',
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
                  fontSize: '0.875rem',
                  '&::placeholder': {
                    color: '#9ca3af',
                    opacity: 1,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#9ca3af', fontSize: '1.25rem' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: '1px',
              height: '24px',
              bgcolor: '#e5e7eb',
            }}
          />

          {/* Notifications */}
          <IconButton
            size="small"
            sx={{
              bgcolor: '#f9fafb',
              border: '1px solid #e5e7eb',
              width: 40,
              height: 40,
              '&:hover': {
                bgcolor: '#f3f4f6',
              },
            }}
          >
            <Badge
              badgeContent={2}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.625rem',
                  minWidth: '16px',
                  height: '16px',
                },
              }}
            >
              <NotificationsIcon sx={{ fontSize: '1.25rem', color: '#6b7280' }} />
            </Badge>
          </IconButton>

          {/* Avatar */}
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {user?.name?.charAt(0) || 'A'}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};