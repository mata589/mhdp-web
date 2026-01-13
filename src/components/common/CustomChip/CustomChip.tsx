// src/components/common/CustomChip/CustomChip.tsx
import React from 'react';
import { Chip } from '@mui/material';

// ─── Type Definitions ──────────────────────────────────────────────────────

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type CallOutcome = 'Advice Given' | 'Escalated' | 'Referred';
export type AgentStatus = 'Available' | 'On Call' | 'On Break' | 'Offline';
export type CallerType = 'Patient' | 'Other'; // Added 'Other' as common fallback
export type Sentiment = 'Positive' | 'Neutral' | 'Negative';

export type ChipVariant =
  | RiskLevel
  | CallOutcome
  | AgentStatus
  | CallerType
  | Sentiment;

interface StyleConfig {
  bg: string;
  border: string;
  text: string;
  dot: string;
}

interface CustomChipProps {
  /** Text displayed inside the chip */
  label: string; // Changed to string for more flexibility (with safe fallback)
  /** Controls color scheme & default dot visibility */
  variant: 'risk' | 'outcome' | 'status' | 'caller' | 'sentiment';
  size?: 'small' | 'medium';
  /** Force show/hide the dot indicator (overrides default behavior) */
  showDot?: boolean;
  /** Additional MUI sx prop for custom styling */
  sx?: React.ComponentProps<typeof Chip>['sx'];
}

// ─── Style Mapping ─────────────────────────────────────────────────────────

const variantStyles: Record<ChipVariant, StyleConfig> = {
  // Risk levels
  Low: { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d', dot: '#22c55e' },
  Medium: { bg: '#fef3c7', border: '#fcd34d', text: '#d97706', dot: '#f59e0b' },
  High: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626', dot: '#ef4444' },
  Critical: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b', dot: '#b91c1c' },

  // Call outcomes
  'Advice Given': { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d', dot: '#22c55e' },
  Escalated: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626', dot: '#ef4444' },
  Referred: { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb', dot: '#3b82f6' },

  // Agent status
  Available: { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d', dot: '#22c55e' },
  'On Call': { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af', dot: '#3b82f6' },
  'On Break': { bg: '#fef3c7', border: '#fcd34d', text: '#d97706', dot: '#f59e0b' },
  Offline: { bg: '#f3f4f6', border: '#e5e7eb', text: '#4b5563', dot: '#6b7280' },

  // Caller types
  Patient: { bg: '#e0f2fe', border: '#7dd3fc', text: '#0369a1', dot: '#0ea5e9' },
  Other: { bg: '#f3f4f6', border: '#e5e7eb', text: '#4b5563', dot: '#9ca3af' },

  // Sentiments
  Positive: { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d', dot: '#22c55e' },
  Neutral: { bg: '#fefce8', border: '#fef08a', text: '#a16207', dot: '#f59e0b' },
  Negative: { bg: '#fef2f2', border: '#fecaca', text: '#b91c1c', dot: '#ef4444' },
};

const CustomChip: React.FC<CustomChipProps> = ({
  label,
  variant,
  size = 'medium',
  showDot,
  sx = {},
}) => {
  // Get style config or fallback to neutral gray
  const style = variantStyles[label as ChipVariant] ?? {
    bg: '#f3f4f6',
    border: '#e5e7eb',
    text: '#4b5563',
    dot: '#9ca3af',
  };

  // Decide whether to show the dot indicator
  const defaultShowDot = ['risk', 'status', 'caller', 'sentiment'].includes(variant);
  const finalShowDot = showDot ?? defaultShowDot;

  return (
    <Chip
      label={label}
      size={size}
      sx={{
        backgroundColor: style.bg,
        border: `1px solid ${style.border}`,
        color: style.text,
        fontWeight: 600,
        fontSize: size === 'small' ? '0.75rem' : '0.8125rem',
        height: size === 'small' ? 24 : 32,
        '& .MuiChip-label': {
          px: size === 'small' ? 1.25 : 1.75,
          display: 'flex',
          alignItems: 'center',
          gap: finalShowDot ? 1 : 0,
          ...(finalShowDot && {
            '&::before': {
              content: '""',
              width: size === 'small' ? 6 : 8,
              height: size === 'small' ? 6 : 8,
              borderRadius: '50%',
              backgroundColor: style.dot,
              display: 'inline-block',
            },
          }),
        },
        ...sx,
      }}
    />
  );
};

export default CustomChip;