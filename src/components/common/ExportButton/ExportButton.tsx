// ExportButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import { FileDown } from 'lucide-react';

interface ExportButtonProps {
  onClick?: () => void;
  label?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  sx?: any;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  onClick,
  label = 'Export report',
  fullWidth = false,
  icon,
  variant = 'contained',
  sx = {}
}) => {
  const handleClick = () => {
    console.log('Export button clicked');
    onClick?.();
  };

  return (
    <Button
      startIcon={icon || <FileDown size={18} />}
      variant={variant}
      onClick={handleClick}
      sx={{
        bgcolor: variant === 'contained' ? '#0d9488' : 'transparent',
        color: variant === 'contained' ? '#ffffff' : '#0d9488',
        border: variant === 'outlined' ? '1px solid #0d9488' : 'none',
        '&:hover': { 
          bgcolor: variant === 'contained' ? '#0f766e' : '#0d948810',
          borderColor: variant === 'outlined' ? '#0f766e' : undefined,
        },
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.875rem',
        px: 3,
        py: 1,
        borderRadius: '8px',
        width: fullWidth ? '100%' : 'auto',
        transition: 'all 0.2s ease',
        ...sx
      }}
    >
      {label}
    </Button>
  );
};