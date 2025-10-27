// src/pages/supervisor/LiveMonitoring/LiveMonitoring.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
} from '@mui/material';
import { Phone as PhoneIcon } from '@mui/icons-material';
import { SearchFilterBar } from '../../../components/common/SearchBar/SearchFilterBar';
import CustomChip from '../../../components/common/CustomChip/CustomChip';

// Map urgency levels to our CustomChip risk levels
type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low';

const mapUrgencyToRisk = (urgency: UrgencyLevel): 'High' | 'Medium' | 'Low' => {
  switch (urgency) {
    case 'critical':
      return 'High';
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return 'Low';
  }
};

const mockActiveCalls = [
  {
    id: '1031',
    agent: 'Sarah Mukasa',
    urgency: 'critical' as UrgencyLevel,
    startTime: '10:15 AM',
    duration: '08:42',
  },
  {
    id: '1045',
    agent: 'Sarah Mukasa',
    urgency: 'high' as UrgencyLevel,
    startTime: '10:15 AM',
    duration: '08:42',
  },
  {
    id: '1050',
    agent: 'Sarah Mukasa',
    urgency: 'low' as UrgencyLevel,
    startTime: '10:15 AM',
    duration: '08:42',
  },
  {
    id: '1053',
    agent: 'Sarah Mukasa',
    urgency: 'medium' as UrgencyLevel,
    startTime: '10:15 AM',
    duration: '08:42',
  },
];

const statusFilterOptions = [
  { value: 'all', label: 'All status' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const LiveMonitoring: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <Box sx={{ p: 3, bgcolor: '#f9fafb', minHeight: '100vh' }}>
      {/* Search and Filter Bar */}
      <SearchFilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by agent..."
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={statusFilterOptions}
      />

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

                {/* Urgency Badge - Now using CustomChip */}
                <Box sx={{ mx: 3 }}>
                  <CustomChip 
                    label={mapUrgencyToRisk(call.urgency)} 
                    variant="risk" 
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