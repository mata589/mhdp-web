// src/utils/roleUtils.ts
export type UserRole = 'agent' | 'supervisor' | 'admin';

export const getDefaultRoute = (role: UserRole | undefined): string => {
  switch (role) {
    case 'agent':
      return '/agent/dashboard';
    case 'supervisor':
      return '/supervisor';
    case 'admin':
      return '/admin';
    default:
      return '/login';
  }
};

export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case 'agent':
      return 'Call Agent';
    case 'supervisor':
      return 'Supervisor';
    case 'admin':
      return 'Administrator';
    default:
      return 'User';
  }
};

export const canAccessRoute = (userRole: UserRole, allowedRoles: UserRole[]): boolean => {
  return allowedRoles.includes(userRole);
};