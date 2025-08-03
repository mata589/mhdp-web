// src/config/navigation/agentNav.ts
import {
    Dashboard as DashboardIcon,
    Phone as PhoneIcon,
    History as HistoryIcon,
    Analytics as AnalyticsIcon,
    MenuBook as TrainingIcon,
    Warning as EmergencyIcon,
    Help as HelpIcon,
  } from '@mui/icons-material';
  
  export interface NavItem {
    path: string;
    label: string;
    icon: React.ComponentType;
    badge?: number;
    disabled?: boolean;
  }
  
  export const agentPrimaryNav: NavItem[] = [
    { path: '/agent/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { path: '/agent/active-calls', label: 'Active calls', icon: PhoneIcon },
    { path: '/agent/call-history', label: 'Call history', icon: HistoryIcon },
    { path: '/agent/analytics', label: 'Analytics', icon: AnalyticsIcon },
  ];
  
  export const agentSecondaryNav: NavItem[] = [
    { path: '/agent/training', label: 'Training materials', icon: TrainingIcon },
    { path: '/agent/emergency', label: 'Emergency guide', icon: EmergencyIcon },
    { path: '/agent/help', label: 'Help and support', icon: HelpIcon },
  ];
  