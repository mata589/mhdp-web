// src/components/common/Header/Header.tsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Badge,
  Divider,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Notifications,
  AccountCircle,
  Logout,
  Settings,
  Help,
  Language,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import { useNotifications } from '../../../hooks/useNotifications';

interface HeaderProps {
  onToggleTheme?: () => void;
  isDarkMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onToggleTheme,
  isDarkMode = false 
}) => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState<null | HTMLElement>(null);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationMenuAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchor(null);
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  const handleLogout = () => {
    handleAccountMenuClose();
    logout();
  };

  const getStatusChipColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'success';
      case 'busy':
        return 'warning';
      case 'away':
        return 'default';
      default:
        return 'default';
    }
  };

  const getNotificationIcon = (type: string) => {
    // You can customize icons based on notification type
    return '🔔';
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              M
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              MHDP Platform
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Mental Health Dashboard
            </Typography>
          </Box>
        </Box>

        {/* Status Indicator */}
        {user?.role === 'agent' && (
          <Box sx={{ mr: 3 }}>
            <Chip
              label="Available"
              color={getStatusChipColor('online')}
              size="small"
              variant="outlined"
            />
          </Box>
        )}

        {/* Language Selector */}
        <IconButton
          size="large"
          color="inherit"
          onClick={handleLanguageMenuOpen}
          sx={{ mr: 1 }}
        >
          <Language />
        </IconButton>

        {/* Theme Toggle */}
        {onToggleTheme && (
          <IconButton
            size="large"
            color="inherit"
            onClick={onToggleTheme}
            sx={{ mr: 1 }}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        )}

        {/* Notifications */}
        <IconButton
          size="large"
          color="inherit"
          onClick={handleNotificationMenuOpen}
          sx={{ mr: 1 }}
        >
          <Badge badgeContent={unreadCount} color="error">
            <Notifications />
          </Badge>
        </IconButton>

        {/* User Account */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={handleAccountMenuOpen}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: theme.palette.primary.main,
              fontSize: '0.875rem',
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>

        {/* Account Menu */}
        <Menu
          anchorEl={accountMenuAnchor}
          open={Boolean(accountMenuAnchor)}
          onClose={handleAccountMenuClose}
          onClick={handleAccountMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 200,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {user?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleAccountMenuClose}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleAccountMenuClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleAccountMenuClose}>
            <ListItemIcon>
              <Help fontSize="small" />
            </ListItemIcon>
            <ListItemText>Help & Support</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>

        {/* Language Menu */}
        <Menu
          anchorEl={languageMenuAnchor}
          open={Boolean(languageMenuAnchor)}
          onClose={handleLanguageMenuClose}
          onClick={handleLanguageMenuClose}
        >
          <MenuItem>
            <ListItemText>English</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>Luganda</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>Swahili</ListItemText>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationMenuAnchor}
          open={Boolean(notificationMenuAnchor)}
          onClose={handleNotificationMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              maxWidth: 360,
              maxHeight: 400,
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
              Notifications
            </Typography>
          </Box>
          
          {notifications.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No new notifications
              </Typography>
            </Box>
          ) : (
            notifications.slice(0, 5).map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => {
                  markAsRead(notification.id);
                  handleNotificationMenuClose();
                }}
                sx={{
                  whiteSpace: 'normal',
                  alignItems: 'flex-start',
                  py: 1.5,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box sx={{ mr: 2 }}>
                  {getNotificationIcon(notification.type)}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {notification.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.message}
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
                {!notification.isRead && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      ml: 1,
                    }}
                  />
                )}
              </MenuItem>
            ))
          )}
          
          {notifications.length > 5 && (
            <MenuItem sx={{ justifyContent: 'center', py: 1 }}>
              <Typography variant="body2" color="primary">
                View all notifications
              </Typography>
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};