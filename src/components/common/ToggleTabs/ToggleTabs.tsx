import React from 'react';
import { Box, Button } from '@mui/material';

interface ToggleTab {
  label: string;
  value: string | number;
}

interface ToggleTabsProps {
  tabs: ToggleTab[];
  value: string | number;
  onChange: (value: string | number) => void;
  sx?: object;
}

export const ToggleTabs: React.FC<ToggleTabsProps> = ({ 
  tabs, 
  value, 
  onChange,
  sx = {}
}) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        bgcolor: '#E8E8E8',
        borderRadius: 2,
        p: 0.5,
        gap: 0,
        ...sx
      }}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          sx={{
            px: 3,
            py: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: 1.5,
            minWidth: 100,
            transition: 'all 0.2s ease',
            border: 'none',
            outline: 'none',
            '&:focus': {
              outline: 'none',
            },
            ...(value === tab.value
              ? {
                  bgcolor: '#ffffff',
                  color: '#008B8B',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#ffffff',
                  }
                }
              : {
                  bgcolor: 'transparent',
                  color: '#808080',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  }
                }),
          }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  );
};

export default ToggleTabs;