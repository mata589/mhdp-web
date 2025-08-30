// src/components/common/ActionButtonsGroup/ActionButtonsGroup.tsx
import React from 'react';
import { Box } from '@mui/material';
import { PlayButton } from '../PlayButton/PlayButton';
import { ViewButton } from '../ViewButton/ViewButton';

interface ActionButtonsGroupProps {
  onPlay?: () => void;
  onView?: () => void;
  playDisabled?: boolean;
  viewDisabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  gap?: number;
}

export const ActionButtonsGroup: React.FC<ActionButtonsGroupProps> = ({
  onPlay,
  onView,
  playDisabled = false,
  viewDisabled = false,
  size = 'small',
  gap = 1
}) => {
  return (
    <Box sx={{ display: 'flex', gap }}>
      <PlayButton 
        onClick={onPlay} 
        disabled={playDisabled} 
        size={size} 
      />
      <ViewButton 
        onClick={onView} 
        disabled={viewDisabled} 
        size={size} 
      />
    </Box>
  );
};