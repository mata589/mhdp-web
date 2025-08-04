// src/components/layouts/SupervisorLayout/SupervisorSidebar.tsx
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
  Visibility as MonitorIcon,
  Warning as EscalationIcon,
  History as HistoryIcon,
  People as StaffIcon,
  Analytics as AnalyticsIcon,
  MenuBook as TrainingIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  ExitToApp as SignOutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';


const supervisorNavItems = [
  { path: '/supervisor', label: 'Dashboard', icon: DashboardIcon },
  { path: '/supervisor/live-monitoring', label: 'Live monitoring', icon: MonitorIcon },
  { path: '/supervisor/escalations', label: 'Escalations', icon: EscalationIcon },
  { path: '/supervisor/call-history', label: 'Call history', icon: HistoryIcon },
  { path: '/supervisor/staff-performance', label: 'Staff performance', icon: StaffIcon },
  { path: '/supervisor/analytics', label: 'Analytics', icon: AnalyticsIcon },
];

const secondaryNavItems = [
  { path: '/supervisor/training', label: 'Training materials', icon: TrainingIcon },
  { path: '/supervisor/help', label: 'Help and support', icon: HelpIcon },
];

const DRAWER_WIDTH = 240;

export const SupervisorSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

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
          height: '100vh',
          borderRight: '1px solid #e5e7eb',
          bgcolor: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
        },
      }}
    >
      {/* Hospital Logo and Title */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{ 
            width: 40, 
            height: 40, 
            bgcolor: '#10b981',
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          BH
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: '1rem' }}>
            Butabika Hospital
          </Typography>
          <Typography variant="caption" color="#6b7280" sx={{ fontSize: '0.75rem' }}>
            Supervisor portal
          </Typography>
        </Box>
      </Box>

      {/* Main Navigation */}
      <List sx={{ px: 2, py: 0, mt: 1 }}>
        {supervisorNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  bgcolor: isActive ? '#10b981' : 'transparent',
                  color: isActive ? 'white' : '#374151',
                  '&:hover': {
                    bgcolor: isActive ? '#059669' : '#f9fafb',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ListItemIcon sx={{ 
                  color: 'inherit', 
                  minWidth: 36,
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.25rem',
                  },
                }}>
                  <Icon />
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

      <Divider sx={{ mx: 2, my: 2, borderColor: '#e5e7eb' }} />

      {/* Secondary Navigation */}
      <List sx={{ px: 2, py: 0 }}>
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  bgcolor: isActive ? '#10b981' : 'transparent',
                  color: isActive ? 'white' : '#6b7280',
                  '&:hover': {
                    bgcolor: isActive ? '#059669' : '#f9fafb',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 36,
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.25rem',
                    color: 'inherit',
                  },
                }}>
                  <Icon />
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
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ mb: 2, borderColor: '#e5e7eb' }} />
        
        <ListItemButton
          onClick={() => handleNavigation('/supervisor/settings')}
          sx={{
            borderRadius: 2,
            py: 1.5,
            px: 2,
            mb: 1,
            color: '#6b7280',
            '&:hover': {
              bgcolor: '#f9fafb',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: 36,
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
              color: '#6b7280',
            },
          }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Settings"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              color: '#6b7280',
              fontWeight: 500,
            }}
          />
        </ListItemButton>

        <ListItemButton
          onClick={handleSignOut}
          sx={{
            borderRadius: 2,
            py: 1.5,
            px: 2,
            color: '#dc2626',
            '&:hover': {
              bgcolor: '#fef2f2',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: 36,
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
              color: '#dc2626',
            },
          }}>
            <SignOutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Sign out"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              color: '#dc2626',
              fontWeight: 500,
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};