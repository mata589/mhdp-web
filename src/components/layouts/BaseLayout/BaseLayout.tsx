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
      {/* Fixed Sidebar - Hidden on mobile */}
      <Box sx={{ 
        width: { xs: 0, md: 320 }, 
        flexShrink: 0,
        display: { xs: 'none', md: 'block' }
      }}>
        <Sidebar />
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Fixed Header */}
        <Box sx={{ 
          height: { xs: 64, md: 102 }, 
          flexShrink: 0 
        }}>
          <Header />
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
         
            overflow: 'auto',
            mt: { xs: 0, md: 0 }, // Account for header height difference
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
