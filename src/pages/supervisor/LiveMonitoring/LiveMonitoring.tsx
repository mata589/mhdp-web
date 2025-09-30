// src/pages/supervisor/LiveMonitoring/LiveMonitoring.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import {
  Search as SearchIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

const mockActiveCalls = [
  {
    id: '1031',
    agent: 'Sarah Mukasa',
    urgency: 'critical',
    startTime: '10:15 AM',
    duration: '08:42',
  },
  {
    id: '1045',
    agent: 'Sarah Mukasa',
    urgency: 'high',
    startTime: '10:15 AM',
    duration: '08:42',
  },
  {
    id: '1050',
    agent: 'Sarah Mukasa',
    urgency: 'low',
    startTime: '10:15 AM',
    duration: '08:42',
  },
  {
    id: '1053',
    agent: 'Sarah Mukasa',
    urgency: 'medium',
    startTime: '10:15 AM',
    duration: '08:42',
  },
];

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'critical':
      return { bgcolor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' };
    case 'high':
      return { bgcolor: '#fff7ed', color: '#ea580c', border: '1px solid #fed7aa' };
    case 'medium':
      return { bgcolor: '#fefce8', color: '#ca8a04', border: '1px solid #fef08a' };
    case 'low':
      return { bgcolor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' };
    default:
      return { bgcolor: '#f3f4f6', color: '#6b7280', border: '1px solid #e5e7eb' };
  }
};

export const LiveMonitoring: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <Box sx={{ p: 3, bgcolor: '#f9fafb', minHeight: '100vh' }}>
      {/* Search and Filter Bar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search by agent..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            flex: 1,
            bgcolor: 'white',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#9ca3af' }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 150, bgcolor: 'white', borderRadius: 2 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: 2,
            }}
          >
            <MenuItem value="all">All status</MenuItem>
            <MenuItem value="critical">Critical</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Active Calls Section */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
              Active calls
            </Typography>
            <Box
              sx={{
                bgcolor: '#f3f4f6',
                color: '#6b7280',
                px: 2,
                py: 0.5,
                borderRadius: 10,
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              3
            </Box>
          </Box>

          {/* Call List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {mockActiveCalls.map((call) => (
              <Box
                key={call.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2.5,
                  border: '1px solid #e5e7eb',
                  borderRadius: 2,
                  bgcolor: 'white',
                  '&:hover': {
                    bgcolor: '#f9fafb',
                    cursor: 'pointer',
                  },
                }}
              >
                {/* Phone Icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: '#dbeafe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <PhoneIcon sx={{ color: '#3b82f6' }} />
                </Box>

                {/* Call Info */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}>
                    Call #{call.id}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Agent: <span style={{ fontWeight: 500, color: '#111827' }}>{call.agent}</span>
                  </Typography>
                </Box>

                {/* Urgency Badge */}
                <Box sx={{ mx: 3 }}>
                  <Chip
                    label={call.urgency.charAt(0).toUpperCase() + call.urgency.slice(1)}
                    sx={{
                      ...getUrgencyColor(call.urgency),
                      fontWeight: 500,
                      fontSize: '0.813rem',
                      height: 28,
                      '& .MuiChip-label': {
                        px: 2,
                      },
                    }}
                  />
                </Box>

                {/* Time Info */}
                <Box sx={{ display: 'flex', gap: 4, mr: 2 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#6b7280', display: 'block' }}>
                      Started:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                      {call.startTime}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#6b7280', display: 'block' }}>
                      Duration:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
                      {call.duration}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 3,
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Page 1-1 of 3 results
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box
              sx={{
                px: 2,
                py: 1,
                border: '1px solid #e5e7eb',
                borderRadius: 1,
                color: '#9ca3af',
                fontSize: '0.875rem',
                cursor: 'not-allowed',
              }}
            >
              ‹ Previous
            </Box>
            <Box
              sx={{
                px: 2,
                py: 1,
                border: '1px solid #e5e7eb',
                borderRadius: 1,
                color: '#111827',
                fontSize: '0.875rem',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#f9fafb',
                },
              }}
            >
              Next ›
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};