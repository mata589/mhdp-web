// src/components/layouts/AgentLayout/AgentSidebar.tsx
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
  Phone as PhoneIcon,
  History as HistoryIcon,
  Analytics as AnalyticsIcon,
  MenuBook as TrainingIcon,
  Warning as EmergencyIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  ExitToApp as SignOutIcon,
  Voicemail as VoicemailIcon,
  PhoneMissed as MissedCallsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';


const agentNavItems = [
  { path: '/agent/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { path: '/agent/active-calls', label: 'Active calls', icon: PhoneIcon },
  { path: '/agent/call-history', label: 'Call history', icon: HistoryIcon },
  { path: '/agent/voicemail', label: 'Voicemail', icon: VoicemailIcon },
  { path: '/agent/missed-calls', label: 'Missed calls', icon: MissedCallsIcon },
  { path: '/agent/analytics', label: 'Analytics', icon: AnalyticsIcon },
];

const secondaryNavItems = [
  { path: '/agent/training', label: 'Training materials', icon: TrainingIcon },
  { path: '/agent/emergency', label: 'Emergency guide', icon: EmergencyIcon },
  { path: '/agent/help', label: 'Help and support', icon: HelpIcon },
];

const DRAWER_WIDTH = 320;

export const AgentSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Set dashboard as default if at root or no specific path
  const currentPath = location.pathname === '/agent' ? '/agent/dashboard' : location.pathname;

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
        display: { xs: 'none', md: 'block' },
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
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid #e5e7eb',
        mb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: '#0d9488',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'white',
            }}
          >
            BH
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: '1rem', color: '#111827' }}>
              Butabika Hospital
            </Typography>
            <Typography variant="caption" color="#9ca3af" sx={{ fontSize: '0.75rem' }}>
              Call agent portal
            </Typography>
          </Box>
        </Box>
        
        {/* Collapse/Expand Icon */}
        <Box 
          sx={{ 
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
            bgcolor: 'white',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: '#f9fafb',
            }
          }}
        >
          <Box 
            sx={{
              width: 16,
              height: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ width: '12px', height: '2px', bgcolor: '#6b7280', borderRadius: '1px' }} />
            <Box sx={{ width: '12px', height: '2px', bgcolor: '#6b7280', borderRadius: '1px' }} />
            <Box sx={{ width: '8px', height: '2px', bgcolor: '#6b7280', borderRadius: '1px' }} />
          </Box>
        </Box>
      </Box>

      {/* Main Navigation */}
      <List sx={{ px: 2, py: 0, mt: 1 }}>
        {agentNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: '2px' }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: '8px',
                  py: '10px',
                  px: '12px',
                  bgcolor: isActive ? '#0d9488' : 'transparent',
                  color: isActive ? 'white' : '#6b7280',
                  '&:hover': {
                    bgcolor: isActive ? '#0d9488' : '#f9fafb',
                  },
                  transition: 'all 0.2s ease-in-out',
                  minHeight: '44px',
                }}
              >
                <ListItemIcon sx={{ 
                  color: 'inherit', 
                  minWidth: '32px',
                  mr: '12px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '20px',
                  },
                }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    color: 'inherit',
                    lineHeight: '20px',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mx: 2, my: 3, borderColor: '#e5e7eb' }} />

      {/* Secondary Navigation */}
      {/* <List sx={{ px: 2, py: 0 }}>
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: '2px' }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: '8px',
                  py: '10px',
                  px: '12px',
                  bgcolor: isActive ? '#0d9488' : 'transparent',
                  color: isActive ? 'white' : '#6b7280',
                  '&:hover': {
                    bgcolor: isActive ? '#0d9488' : '#f9fafb',
                  },
                  transition: 'all 0.2s ease-in-out',
                  minHeight: '44px',
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: '32px',
                  mr: '12px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '20px',
                    color: 'inherit',
                  },
                }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    color: 'inherit',
                    lineHeight: '20px',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List> */}

      {/* Bottom Navigation */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ mb: 2, borderColor: '#e5e7eb' }} />
        
        <ListItemButton
          onClick={() => handleNavigation('/agent/settings')}
          sx={{
            borderRadius: '8px',
            py: '10px',
            px: '12px',
            mb: '2px',
            color: '#6b7280',
            '&:hover': {
              bgcolor: '#f9fafb',
            },
            transition: 'all 0.2s ease-in-out',
            minHeight: '44px',
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: '32px',
            mr: '12px',
            '& .MuiSvgIcon-root': {
              fontSize: '20px',
              color: '#6b7280',
            },
          }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Settings"
            primaryTypographyProps={{
              fontSize: '14px',
              color: '#6b7280',
              fontWeight: 500,
              lineHeight: '20px',
            }}
          />
        </ListItemButton>

        <ListItemButton
          onClick={handleSignOut}
          sx={{
            borderRadius: '8px',
            py: '10px',
            px: '12px',
            color: '#dc2626',
            '&:hover': {
              bgcolor: '#fef2f2',
            },
            transition: 'all 0.2s ease-in-out',
            minHeight: '44px',
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: '32px',
            mr: '12px',
            '& .MuiSvgIcon-root': {
              fontSize: '20px',
              color: '#dc2626',
            },
          }}>
            <SignOutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Sign out"
            primaryTypographyProps={{
              fontSize: '14px',
              color: '#dc2626',
              fontWeight: 500,
              lineHeight: '20px',
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};