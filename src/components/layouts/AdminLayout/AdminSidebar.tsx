// src/components/layouts/AdminLayout/AdminSidebar.tsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Storage as SystemIcon,
  ExitToApp as SignOutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';


const adminNavItems = [
  { path: '/admin', label: 'Dashboard', icon: DashboardIcon },
  { path: '/admin/users', label: 'User Management', icon: UsersIcon },
  { path: '/admin/system', label: 'System Health', icon: SystemIcon },
  { path: '/admin/analytics', label: 'Analytics', icon: AnalyticsIcon },
  { path: '/admin/security', label: 'Security', icon: SecurityIcon },
];

const DRAWER_WIDTH = 240;

export const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          mt: '64px',
          height: 'calc(100vh - 64px)',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      {/* Hospital Logo and Title */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: 'primary.main',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          BH
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            Butabika Hospital
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Admin portal
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Main Navigation */}
      <List sx={{ px: 1, py: 2 }}>
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 3,
                  mx: 1,
                  bgcolor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: isActive ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Navigation */}
      <Box sx={{ mt: 'auto', p: 1 }}>
        <Divider sx={{ mx: 1, mb: 1 }} />
        
        <ListItemButton
          onClick={() => handleNavigation('/admin/settings')}
          sx={{
            borderRadius: 3,
            mx: 1,
            mb: 0.5,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <SettingsIcon fontSize="small" color="action" />
          </ListItemIcon>
          <ListItemText 
            primary="Settings"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              color: 'text.secondary',
            }}
          />
        </ListItemButton>

        <ListItemButton
          onClick={handleSignOut}
          sx={{
            borderRadius: 3,
            mx: 1,
            color: 'error.main',
            '&:hover': {
              bgcolor: 'error.lighter',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <SignOutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText 
            primary="Sign out"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              color: 'error.main',
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};