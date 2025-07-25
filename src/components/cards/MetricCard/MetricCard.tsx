// src/components/cards/MetricCard/MetricCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Skeleton,
} from '@mui/material';
import { TrendingUp, TrendingDown, Info } from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  isLoading = false,
  onClick,
  color = 'primary',
}) => {
  if (isLoading) {
    return (
      <Card sx={{ height: '100%', cursor: onClick ? 'pointer' : 'default' }}>
        <CardContent>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" height={40} />
          <Skeleton variant="text" width="30%" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        height: '100%', 
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { boxShadow: 4 } : {},
        transition: 'box-shadow 0.2s ease-in-out',
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={`${color}.main`}>
              {value}
            </Typography>
            {change && (
              <Box display="flex" alignItems="center" mt={1}>
                {change.type === 'increase' ? (
                  <TrendingUp color="success" sx={{ fontSize: 16, mr: 0.5 }} />
                ) : (
                  <TrendingDown color="error" sx={{ fontSize: 16, mr: 0.5 }} />
                )}
                <Typography
                  variant="body2"
                  color={change.type === 'increase' ? 'success.main' : 'error.main'}
                >
                  {Math.abs(change.value)}% {change.period}
                </Typography>
              </Box>
            )}
          </Box>
          {icon && (
            <Box ml={2}>
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};