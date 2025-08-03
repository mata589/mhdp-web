// // src/components/common/Sidebar/Sidebar.tsx
// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Divider,
//   Typography,
//   Box,
//   useTheme,
//   Badge,
// } from '@mui/material';
// import {
//   Dashboard,
//   Call,
//   Assessment,
//   SupervisorAccount,
//   Escalator,
//   People,
//   Settings,
//   HealthAndSafety,
//   Analytics,
//   RecordVoiceOver,
// } from '@mui/icons-material';
// import { useAuth } from '../../../contexts/AuthContext';
// import { useNotifications } from '../../../hooks/useNotifications';

// const DRAWER_WIDTH = 240;

// interface MenuItem {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
//   path: string;
//   roles: string[];
//   badge?: number;
// }

// const menuItems: MenuItem[] = [
//   // Agent items
//   {
//     id: 'dashboard',
//     label: 'Dashboard',
//     icon: <Dashboard />,
//     path: '/dashboard',
//     roles: ['agent', 'supervisor', 'admin'],
//   },
//   {
//     id: 'live-call',
//     label: 'Live Call',
//     icon: <RecordVoiceOver />,
//     path: '/live-call',
//     roles: ['agent'],
//   },
  
//   // Supervisor items
//   {
//     id: 'supervisor-dashboard',
//     label: 'Supervisor Dashboard',
//     icon: <SupervisorAccount />,
//     path: '/supervisor',
//     roles: ['supervisor'],
//   },
//   {
//     id: 'escalated-reviews',
//     label: 'Escalated Calls',
//     icon: <Escalator />,
//     path: '/escalated-reviews',
//     roles: ['supervisor'],
//   },
//   {
//     id: 'agent-performance',
//     label: 'Agent Performance',
//     icon: <Analytics />,
//     path: '/agent-performance',
//     roles: ['supervisor'],
//   },

//   // Admin items
//   {
//     id: 'admin-dashboard',
//     label: 'System Overview',
//     icon: <Dashboard />,
//     path: '/admin',
//     roles: ['admin'],
//   },
//   {
//     id: 'user-management',
//     label: 'User Management',
//     icon: <People />,
//     path: '/admin/users',
//     roles: ['admin'],
//   },
//   {
//     id: 'system-health',
//     label: 'System Health',
//     icon: <HealthAndSafety />,
//     path: '/admin/system',
//     roles: ['admin'],
//   },
//   {
//     id: 'settings',
//     label: 'Settings',
//     icon: <Settings />,
//     path: '/admin/settings',
//     roles: ['admin'],
//   },
// ];

// export const Sidebar: React.FC = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useAuth();
//   const { escalatedCallsCount, systemAlertsCount } = useNotifications();

//   const filteredMenuItems = menuItems.filter(item =>
//     user?.role && item.roles.includes(user.role)
//   );

//   const getBadgeCount = (itemId: string): number | undefined => {
//     switch (itemId) {
//       case 'escalated-reviews':
//         return escalatedCallsCount;
//       case 'system-health':
//         return systemAlertsCount;
//       default:
//         return undefined;
//     }
//   };

//   const handleNavigation = (path: string) => {
//     navigate(path);
//   };

//   const isActive = (path: string): boolean => {
//     return location.pathname === path;
//   };

//   const getMenuSections = () => {
//     const sections: { title: string; items: MenuItem[] }[] = [];

//     if (user?.role === 'agent') {
//       sections.push({
//         title: 'Agent Tools',
//         items: filteredMenuItems,
//       });
//     } else if (user?.role === 'supervisor') {
//       sections.push({
//         title: 'Overview',
//         items: filteredMenuItems.filter(item => 
//           ['dashboard', 'supervisor-dashboard'].includes(item.id)
//         ),
//       });
//       sections.push({
//         title: 'Management',
//         items: filteredMenuItems.filter(item => 
//           ['escalated-reviews', 'agent-performance'].includes(item.id)
//         ),
//       });
//     } else if (user?.role === 'admin') {
//       sections.push({
//         title: 'Administration',
//         items: filteredMenuItems,
//       });
//     }

//     return sections;
//   };

//   const renderMenuItem = (item: MenuItem) => {
//     const badgeCount = getBadgeCount(item.id);
//     const active = isActive(item.path);

//     return (
//       <ListItem key={item.id} disablePadding>
//         <ListItemButton
//           onClick={() => handleNavigation(item.path)}
//           selected={active}
//           sx={{
//             minHeight: 48,
//             '&.Mui-selected': {
//               backgroundColor: theme.palette.primary.main + '20',
//               borderRight: `3px solid ${theme.palette.primary.main}`,
//               '&:hover': {
//                 backgroundColor: theme.palette.primary.main + '30',
//               },
//             },
//             '&:hover': {
//               backgroundColor: theme.palette.action.hover,
//             },
//           }}
//         >
//           <ListItemIcon
//             sx={{
//               minWidth: 0,
//               mr: 3,
//               justifyContent: 'center',
//               color: active ? theme.palette.primary.main : 'inherit',
//             }}
//           >
//             {badgeCount ? (
//               <Badge badgeContent={badgeCount} color="error">
//                 {item.icon}
//               </Badge>
//             ) : (
//               item.icon
//             )}
//           </ListItemIcon>
//           <ListItemText
//             primary={item.label}
//             primaryTypographyProps={{
//               fontSize: '0.875rem',
//               fontWeight: active ? 600 : 400,
//               color: active ? theme.palette.primary.main : 'inherit',
//             }}
//           />
//         </ListItemButton>
//       </ListItem>
//     );
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: DRAWER_WIDTH,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: DRAWER_WIDTH,
//           boxSizing: 'border-box',
//           borderRight: `1px solid ${theme.palette.divider}`,
//         },
//       }}
//     >
//       <Toolbar />
      
//       <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
//         {/* User Info Section */}
//         <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
//           <Typography variant="subtitle2" color="text.secondary">
//             Logged in as
//           </Typography>
//           <Typography variant="body2" fontWeight={600}>
//             {user?.name}
//           </Typography>
//           <Typography variant="caption" color="text.secondary">
//             {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} • {user?.hospital}
//           </Typography>
//         </Box>

//         {/* Navigation Sections */}
//         {getMenuSections().map((section, index) => (
//           <Box key={section.title}>
//             {index > 0 && <Divider sx={{ my: 1 }} />}
//             <Box sx={{ px: 2, py: 1 }}>
//               <Typography
//                 variant="overline"
//                 display="block"
//                 gutterBottom
//                 sx={{
//                   fontSize: '0.75rem',
//                   fontWeight: 600,
//                   color: 'text.secondary',
//                   letterSpacing: '0.08333em',
//                 }}
//               >
//                 {section.title}
//               </Typography>
//             </Box>
//             <List dense>
//               {section.items.map(renderMenuItem)}
//             </List>
//           </Box>
//         ))}
//       </Box>

//       {/* Footer */}
//       <Box
//         sx={{
//           p: 2,
//           borderTop: `1px solid ${theme.palette.divider}`,
//           backgroundColor: theme.palette.background.paper,
//         }}
//       >
//         <Typography variant="caption" color="text.secondary" align="center" display="block">
//           MHDP Platform v1.0
//         </Typography>
//         <Typography variant="caption" color="text.secondary" align="center" display="block">
//           Mental Health Services
//         </Typography>
//       </Box>
//     </Drawer>
//   );
// };