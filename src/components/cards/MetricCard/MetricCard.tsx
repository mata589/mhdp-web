import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Avatar,
} from '@mui/material';
import {
  ChangeHistoryRounded, // Use this instead
  ChevronRight,
} from '@mui/icons-material';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
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
  color?: 'teal' | 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'amber';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  isLoading = false,
  onClick,
  color = 'teal',
}) => {
  const colorMap = {
    teal: '#0d9488',
    blue: '#3b82f6',
    purple: '#a855f7',
    green: '#22c55e',
    orange: '#FFA500',
    red: '#D32F2F',
    amber: '#FFA500',
  };

  const bgColor = colorMap[color];

  if (isLoading) {
    return (
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box display="flex" alignItems="flex-start" mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 1.5 }} />
              <Skeleton variant="text" width={120} height={24} />
            </Box>
          </Box>
          <Skeleton variant="text" width={80} height={40} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        border: '1px solid',
        borderColor: 'grey.200',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': onClick ? {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        } : {},
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header Section */}
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: bgColor,
                borderRadius: 1.5,
              }}
            >
              {icon}
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'text.primary',
              }}
            >
              {title}
            </Typography>
            <ChevronRight sx={{ color: 'grey.400', fontSize: 18, mt: 0.5 }} />
          </Box>
        </Box>

        {/* Value and Change Section */}
        <Box display="flex" alignItems="flex-end" justifyContent="space-between">
          <Typography
            variant="h2"
            sx={{
              fontSize: '2rem',
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1,
            }}
          >
            {value}
          </Typography>

          {change && (
            <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
              <ChangeHistoryIcon  
                sx={{ 
                  fontSize: 14, 
                  color: change.type === 'increase' ? 'success.main' : 'error.main',
                  transform: change.type === 'decrease' ? 'rotate(180deg)' : 'none',
                }} 
              />
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: change.type === 'increase' ? 'success.main' : 'error.main',
                }}
              >
                +{change.value}%
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.8rem',
                  color: 'grey.500',
                  ml: 0.5,
                }}
              >
                {change.period}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};