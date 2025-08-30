// src/components/common/PlayButton/PlayButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';

interface PlayButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const PlayButton: React.FC<PlayButtonProps> = ({ 
  onClick, 
  disabled = false,
  size = 'small'
}) => {
  return (
    <Button
      variant="outlined"
      size={size}
      startIcon={<PlayArrow />}
      onClick={onClick}
      disabled={disabled}
      sx={{
        color: '#008080',
        borderColor: '#e0e0e0',
        backgroundColor: '#f8f9fa',
        textTransform: 'none',
        fontSize: '0.75rem',
        fontWeight: 500,
        minWidth: 'auto',
        px: 1.5,
        py: 0.5,
        '&:hover': {
          borderColor: '#008080',
          backgroundColor: 'rgba(0, 128, 128, 0.04)',
        },
        '&:disabled': {
          color: '#9e9e9e',
          borderColor: '#e0e0e0',
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      Play
    </Button>
  );
};