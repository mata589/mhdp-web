// src/components/common/CustomChip/CustomChip.tsx
import React from 'react';
import { Chip } from '@mui/material';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type CallOutcome = 'Advice Given' | 'Escalated' | 'Referred';
export type AgentStatus = 'Available' | 'On Call' | 'On Break' | 'Offline';
export type CallerType = 'Patient';
export type Sentiment = 'Positive' | 'Neutral';

type ChipVariant = RiskLevel | CallOutcome | AgentStatus | CallerType | Sentiment;

interface CustomChipProps {
  label: ChipVariant;
  variant: 'risk' | 'outcome' | 'status' | 'caller' | 'sentiment';
  size?: 'small' | 'medium';
  showDot?: boolean;
}

const CustomChip: React.FC<CustomChipProps> = ({
  label,
  variant,
  size = 'medium',
  showDot
}) => {
  // Determine if dot should be shown based on variant
  const shouldShowDot = showDot !== undefined ? showDot : (variant === 'risk' || variant === 'status' || variant === 'caller' || variant === 'sentiment');
  
  const chipStyles: Record<string, {
    backgroundColor: string;
    borderColor: string;
    color: string;
    dotColor: string;
  }> = {
    // Risk Level Styles
    'Low': {
      backgroundColor: 'rgba(74, 222, 128, 0.1)',
      borderColor: '#22c55e',
      color: '#15803d',
      dotColor: '#22c55e',
    },
    'Medium': {
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: '#f59e0b',
      color: '#d97706',
      dotColor: '#f59e0b',
    },
    'High': {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: '#ef4444',
      color: '#dc2626',
      dotColor: '#ef4444',
    },
    'Critical': {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: '#ef4444',
      color: '#dc2626',
      dotColor: '#ef4444',
    },
    // Outcome Styles
    'Advice Given': {
      backgroundColor: 'rgba(74, 222, 128, 0.1)',
      borderColor: '#22c55e',
      color: '#15803d',
      dotColor: '#22c55e',
    },
    'Escalated': {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: '#ef4444',
      color: '#dc2626',
      dotColor: '#ef4444',
    },
    'Referred': {
      backgroundColor: 'rgba(96, 125, 139, 0.1)',
      borderColor: '#607d8b',
      color: '#455a64',
      dotColor: '#607d8b',
    },
    // Status Styles
    'Available': {
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      borderColor: '#22c55e',
      color: '#15803d',
      dotColor: '#22c55e',
    },
    'On Call': {
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: '#3b82f6',
      color: '#1e40af',
      dotColor: '#3b82f6',
    },
    'On Break': {
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: '#f59e0b',
      color: '#d97706',
      dotColor: '#f59e0b',
    },
    'Offline': {
      backgroundColor: 'rgba(107, 114, 128, 0.1)',
      borderColor: '#6b7280',
      color: '#374151',
      dotColor: '#6b7280',
    },
    // Caller Type Styles
    'Patient': {
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
      borderColor: '#0ea5e9',
      color: '#0369a1',
      dotColor: '#0ea5e9',
    },
    // Sentiment Styles
    'Positive': {
      backgroundColor: 'rgba(74, 222, 128, 0.1)',
      borderColor: '#22c55e',
      color: '#15803d',
      dotColor: '#22c55e',
    },
    'Neutral': {
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
      borderColor: '#f59e0b',
      color: '#d97706',
      dotColor: '#f59e0b',
    },
  };

  const currentStyle = chipStyles[label];

  return (
    <Chip
      label={label}
      size={size}
      sx={{
        backgroundColor: currentStyle.backgroundColor,
        color: currentStyle.color,
        border: `2px solid ${currentStyle.borderColor}`,
        fontWeight: 700,
        fontSize: size === 'small' ? '0.7rem' : '0.75rem',
        width: 'fit-content',
        '& .MuiChip-label': {
          display: 'flex',
          alignItems: 'center',
          gap: shouldShowDot ? '6px' : '0',
          fontWeight: 700,
          px: size === 'small' ? 1 : 1.5,
          ...(shouldShowDot && {
            '&::before': {
              content: '""',
              width: size === 'small' ? '6px' : '8px',
              height: size === 'small' ? '6px' : '8px',
              backgroundColor: currentStyle.dotColor,
              borderRadius: '50%',
            },
          }),
        },
      }}
    />
  );
};

export default CustomChip;