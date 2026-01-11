import React from 'react';
import { Card, Avatar, Typography, Box } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import type { SxProps, Theme } from '@mui/material/styles';

interface MetricCardProps {
  icon?: React.ReactNode;
  iconSrc?: string;
  iconBgColor: string;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  sx?: SxProps<Theme>;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  iconSrc,
  iconBgColor,
  label,
  value,
  trend,
  sx,
}) => {
  return (
    <Card
      sx={{
        p: 3,
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        ...sx,
      }}
    >
      {/* Label Row: Icon + Label + Right Arrow */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 2,
        }}
      >
        <Avatar
          sx={{
            backgroundColor: iconBgColor,
            width: 32,
            height: 32,
            borderRadius: '6px',
            '& .MuiSvgIcon-root': { fontSize: 18 },
          }}
        >
          {iconSrc ? (
            <img src={iconSrc} alt="" style={{ width: '18px', height: '18px' }} />
          ) : (
            icon && React.cloneElement(icon as React.ReactElement)
          )}
        </Avatar>

        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: '#008080',
            fontSize: '0.875rem',
          }}
        >
          {label}
        </Typography>

        <ArrowRightIcon
          sx={{
            fontSize: 16,
            color: '#008080',
          }}
        />
      </Box>

      {/* Value + Trend Row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#212121',
            fontSize: { xs: '2rem', sm: '2.5rem' },
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>

        {trend && (
          <Typography
            component="div"
            sx={{
              fontWeight: 500,
              color: trend.isPositive ? '#22c55e' : '#ef4444',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.75rem',
              ml: 1,
            }}
          >
            {trend.isPositive ? (
              <ArrowDropUpIcon sx={{ fontSize: 14 }} />
            ) : (
              <ArrowDropDownIcon sx={{ fontSize: 14 }} />
            )}
            {trend.value}
          </Typography>
        )}
      </Box>
    </Card>
  );
};