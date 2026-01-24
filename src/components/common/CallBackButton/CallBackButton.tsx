// src/components/common/CallBackButton/CallBackButton.tsx
import React from 'react';
import { Phone as CallBackIcon } from '@mui/icons-material';
import { Button, type ButtonProps } from '@mui/material';

interface CallBackButtonProps {
  /**
   * Callback function triggered when button is clicked
   */
  onClick: () => void;
  
  /**
   * Button variant - 'contained' | 'outlined' | 'text'
   * @default 'contained'
   */
  variant?: 'contained' | 'outlined' | 'text';
  
  /**
   * Button size - 'small' | 'medium' | 'large'
   * @default 'small'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether to show the icon
   * @default true
   */
  showIcon?: boolean;
  
  /**
   * Custom button text
   * @default 'Call back'
   */
  label?: string;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Whether the button should take full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Custom background color (for contained variant)
   * @default '#0d9488'
   */
  bgcolor?: string;
  
  /**
   * Custom hover background color (for contained variant)
   * @default '#0f766e'
   */
  hoverBgColor?: string;
  
  /**
   * Custom border/text color (for outlined/text variants)
   * @default '#0d9488'
   */
  color?: string;
  
  /**
   * Additional sx styles to override defaults
   */
  sx?: ButtonProps['sx'];
  
  /**
   * Additional props to pass to the MUI Button
   */
  buttonProps?: Partial<ButtonProps>;
}

export const CallBackButton: React.FC<CallBackButtonProps> = ({
  onClick,
  variant = 'contained',
  size = 'small',
  showIcon = true,
  label = 'Call back',
  disabled = false,
  fullWidth = false,
  bgcolor = '#0d9488',
  hoverBgColor = '#0f766e',
  color = '#0d9488',
  sx,
  buttonProps,
}) => {
  const getButtonStyles = (): ButtonProps['sx'] => {
    const baseStyles: ButtonProps['sx'] = {
      fontSize: size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px',
      textTransform: 'none',
      fontWeight: 500,
      ...sx,
    };

    if (variant === 'contained') {
      return {
        ...baseStyles,
        bgcolor,
        color: '#ffffff',
        '&:hover': {
          bgcolor: hoverBgColor,
        },
        '&:disabled': {
          bgcolor: '#d1d5db',
          color: '#9ca3af',
        },
      };
    }

    if (variant === 'outlined') {
      return {
        ...baseStyles,
        borderColor: color,
        color,
        '&:hover': {
          bgcolor: `${color}08`, // 8% opacity
          borderColor: color,
        },
        '&:disabled': {
          borderColor: '#d1d5db',
          color: '#9ca3af',
        },
      };
    }

    // text variant
    return {
      ...baseStyles,
      color,
      '&:hover': {
        bgcolor: `${color}08`,
      },
      '&:disabled': {
        color: '#9ca3af',
      },
    };
  };

  return (
    <Button
      variant={variant}
      size={size}
      startIcon={showIcon ? <CallBackIcon /> : undefined}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={getButtonStyles()}
      {...buttonProps}
    >
      {label}
    </Button>
  );
};

export default CallBackButton;