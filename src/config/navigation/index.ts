// src/config/navigation/index.ts
// src/config/navigation/index.ts
import type { UserRole } from '../../utils/roleUtils';
import { agentPrimaryNav, agentSecondaryNav, type NavItem } from './agentNav';
import { supervisorPrimaryNav, supervisorSecondaryNav } from './supervisorNav';
import { adminPrimaryNav, adminSecondaryNav } from './adminNav';

export interface NavigationConfig {
  primary: NavItem[];
  secondary: NavItem[];
}

export const getNavigationConfig = (role: UserRole): NavigationConfig => {
  switch (role) {
    case 'agent':
      return {
        primary: agentPrimaryNav,
        secondary: agentSecondaryNav,
      };
    case 'supervisor':
      return {
        primary: supervisorPrimaryNav,
        secondary: supervisorSecondaryNav,
      };
    case 'admin':
      return {
        primary: adminPrimaryNav,
        secondary: adminSecondaryNav,
      };
    default:
      return {
        primary: [],
        secondary: [],
      };
  }
};