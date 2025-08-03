// src/config/navigation/adminNav.ts
import {
    Dashboard as DashboardIcon,
    People as UsersIcon,
    Analytics as AnalyticsIcon,
    Security as SecurityIcon,
    Storage as SystemIcon,
  } from '@mui/icons-material';
import type { NavItem } from './agentNav';
  
  export const adminPrimaryNav: NavItem[] = [
    { path: '/admin', label: 'Dashboard', icon: DashboardIcon },
    { path: '/admin/users', label: 'User Management', icon: UsersIcon },
    { path: '/admin/system', label: 'System Health', icon: SystemIcon },
    { path: '/admin/analytics', label: 'Analytics', icon: AnalyticsIcon },
    { path: '/admin/security', label: 'Security', icon: SecurityIcon },
  ];
  
  export const adminSecondaryNav: NavItem[] = [];