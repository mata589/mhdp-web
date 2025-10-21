// src/components/common/Header/Header.tsx
import React, { useState } from 'react';
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
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';

const DRAWER_WIDTH = 320;

export const Header: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid #e5e7eb',
          ml: isMobile ? 0 : `${DRAWER_WIDTH}px`,
          width: isMobile ? '100%' : `calc(100% - ${DRAWER_WIDTH}px)`,
          height: isMobile ? '64px' : '102px',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            minHeight: isMobile ? '64px' : '102px',
            px: { xs: 2, md: 3 },
            alignItems: 'center',
            display: 'flex',
            height: isMobile ? '64px' : '102px',
          }}
        >
          {/* Left: Mobile Menu + Page Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', gap: 2 }}>
            {isMobile && (
              <IconButton
                onClick={handleMobileMenuToggle}
                sx={{
                  color: 'text.primary',
                  bgcolor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  '&:hover': {
                    bgcolor: '#f3f4f6',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1.125rem', md: '1.375rem' },
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
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, md: 4 }, 
            height: '100%' 
          }}>
            {/* Search Bar - Hidden on mobile unless toggled */}
            {(!isMobile || showSearch) && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                height: '100%',
                position: isMobile ? 'absolute' : 'relative',
                top: isMobile ? '100%' : 'auto',
                left: isMobile ? 0 : 'auto',
                right: isMobile ? 0 : 'auto',
                bgcolor: isMobile ? 'white' : 'transparent',
                borderBottom: isMobile ? '1px solid #e5e7eb' : 'none',
                p: isMobile ? 2 : 0,
                zIndex: isMobile ? 1000 : 'auto',
              }}>
                {isMobile && (
                  <IconButton
                    onClick={handleSearchToggle}
                    sx={{ mr: 1, color: 'text.primary' }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
                <TextField
                  placeholder="Search for anything here..."
                  size="medium"
                  sx={{
                    width: { xs: '100%', md: 450 },
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
            )}

            {/* Mobile Search Toggle */}
            {isMobile && !showSearch && (
              <IconButton
                onClick={handleSearchToggle}
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
                <SearchIcon sx={{ fontSize: '1.25rem', color: '#6b7280' }} />
              </IconButton>
            )}

            {/* Divider - Hidden on mobile */}
            {!isMobile && (
              <Box
                sx={{
                  width: '1px',
                  height: '32px',
                  bgcolor: '#e5e7eb',
                }}
              />
            )}

            {/* Notifications */}
            <IconButton
              size="medium"
              sx={{
                bgcolor: '#f9fafb',
                border: '1px solid #e5e7eb',
                width: { xs: 40, md: 44 },
                height: { xs: 40, md: 44 },
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
                <NotificationsIcon sx={{ fontSize: { xs: '1.25rem', md: '1.375rem' }, color: '#6b7280' }} />
              </Badge>
            </IconButton>

            {/* Avatar */}
            <Avatar
              sx={{
                width: { xs: 40, md: 44 },
                height: { xs: 40, md: 44 },
                bgcolor: 'primary.main',
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 600,
              }}
            >
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        variant="temporary"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #e5e7eb' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Menu
            </Typography>
            <IconButton onClick={handleMobileMenuToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        {/* Mobile menu content would go here - navigation items */}
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItemButton>
          </ListItem>
          {/* Add more menu items as needed */}
        </List>
      </Drawer>
    </>
  );
};
