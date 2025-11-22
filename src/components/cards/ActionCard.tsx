import React from 'react';
import { Card, Avatar, Typography, Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

interface ActionCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  subtitle: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  iconBgColor,
  title,
  subtitle,
  onClick,
  sx,
}) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        p: 3,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': onClick
          ? { boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }
          : undefined,
        ...sx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ backgroundColor: iconBgColor, width: 48, height: 48 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.75rem' }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
