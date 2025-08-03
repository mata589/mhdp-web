// src/components/layouts/BaseLayout/BaseLayout.tsx
import React from 'react';
import { Box } from '@mui/material';

interface BaseLayoutProps {
  sidebar: React.ComponentType;
  header: React.ComponentType;
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ 
  sidebar: Sidebar, 
  header: Header, 
  children 
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          ml: { sm: '240px' }, // sidebar width
          mt: '64px', // header height
          minHeight: 'calc(100vh - 64px)',
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
