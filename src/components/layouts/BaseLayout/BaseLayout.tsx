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
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Fixed Sidebar */}
      <Box sx={{ width: 240, flexShrink: 0 }}>
        <Sidebar />
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Fixed Header */}
        <Box sx={{ height: 64, flexShrink: 0 }}>
          <Header />
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
