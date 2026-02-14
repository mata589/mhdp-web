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
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  ExitToApp as SignOutIcon,
  Business as FacilityIcon,
  HealthAndSafety as SystemHealthIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const adminNavItems = [
  { path: '/admin/admin', label: 'Dashboard', icon: DashboardIcon },
  { path: '/admin/FacilitiesManagement2', label: 'Facility management', icon: FacilityIcon },
  { path: '/admin/FacilityUsersPage', label: 'User management', icon: UsersIcon },
  { path: '/admin/DashboardOverviewPage', label: 'System health', icon: SystemHealthIcon },
  { path: '/admin/admin/DashboardOverviewPage', label: 'Analytics', icon: AnalyticsIcon },
];

const DRAWER_WIDTH = 280;

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

  // Check if settings route is active
  const isSettingsActive = location.pathname === '/admin/settings';

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          height: '100vh',
          borderRight: '1px solid #E5E7EB',
          bgcolor: '#FFFFFF',
        },
      }}
    >
      {/* Hospital Logo and Title */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          component="img"
          src="/hosiptal.png"
          alt="Hospital Logo"
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <Box>
          <Typography 
            variant="subtitle1" 
            fontWeight={600}
            sx={{ 
              fontSize: '0.95rem',
              lineHeight: 1.2,
              color: '#1F2937'
            }}
          >
            Butabika Hospital
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#6B7280',
              fontSize: '0.75rem'
            }}
          >
            Admin portal
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: '#E5E7EB' }} />

      {/* Main Navigation */}
      <List sx={{ px: 2, py: 3, flexGrow: 1 }}>
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;       
          
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 1.25,
                  bgcolor: isActive ? '#0D9488' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#6B7280',
                  '&:hover': {
                    bgcolor: isActive ? '#0F766E' : '#E3F2FD',
                    color: isActive ? '#FFFFFF' : '#1976D2',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: 'inherit', 
                    minWidth: 36,
                  }}
                >
                  <Icon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                    color: 'inherit',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Navigation */}
      <Box sx={{ p: 2, pb: 3 }}>
        <Divider sx={{ mb: 2, borderColor: '#E5E7EB' }} />
        
        <ListItemButton
          onClick={() => handleNavigation('/admin/settings')}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1.25,
            mb: 1,
            bgcolor: isSettingsActive ? '#0D9488' : 'transparent',
            color: isSettingsActive ? '#FFFFFF' : '#6B7280',
            '&:hover': {
              bgcolor: isSettingsActive ? '#0F766E' : '#F3F4F6',
              color: isSettingsActive ? '#FFFFFF' : '#1F2937',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
            <SettingsIcon sx={{ fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText 
            primary="Settings"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: isSettingsActive ? 600 : 500,
              color: 'inherit',
            }}
          />
        </ListItemButton>

        <ListItemButton
          onClick={handleSignOut}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1.25,
            color: '#6B7280',
            '&:hover': {
              bgcolor: '#FEF2F2',
              color: '#DC2626',
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
            <SignOutIcon sx={{ fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText 
            primary="Sign out"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'inherit',
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};