// src/config/navigation/supervisorNav.ts
import {
    Dashboard as DashboardIcon,
    Visibility as MonitorIcon,
    Warning as EscalationIcon,
    History as HistoryIcon,
    People as StaffIcon,
    Analytics as AnalyticsIcon,
    MenuBook as TrainingIcon,
    Help as HelpIcon,
  } from '@mui/icons-material';
import type { NavItem } from './agentNav';
  
  export const supervisorPrimaryNav: NavItem[] = [
    { path: '/supervisor', label: 'Dashboard', icon: DashboardIcon },
    { path: '/supervisor/live-monitoring', label: 'Live monitoring', icon: MonitorIcon },
    { path: '/supervisor/escalations', label: 'Escalations', icon: EscalationIcon },
    { path: '/supervisor/call-history', label: 'Call history', icon: HistoryIcon },
    { path: '/supervisor/staff-performance', label: 'Staff performance', icon: StaffIcon },
    { path: '/supervisor/analytics', label: 'Analytics', icon: AnalyticsIcon },
  ];
  
  export const supervisorSecondaryNav: NavItem[] = [
    { path: '/supervisor/training', label: 'Training materials', icon: TrainingIcon },
    { path: '/supervisor/help', label: 'Help and support', icon: HelpIcon },
  ];
  