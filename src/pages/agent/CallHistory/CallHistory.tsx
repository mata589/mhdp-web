// src/pages/agent/CallHistory/CallHistory.tsx
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  Phone as PhoneIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

const mockCallHistory = [
  {
    id: '1',
    callerName: 'John Doe',
    phoneNumber: '+256 700 123 456',
    date: '2024-01-15',
    time: '14:30',
    duration: '12:45',
    status: 'completed',
    urgency: 'medium',
    reason: 'Anxiety support',
  },
  {
    id: '2',
    callerName: 'Jane Smith',
    phoneNumber: '+256 700 789 012',
    date: '2024-01-15',
    time: '13:15',
    duration: '8:20',
    status: 'completed',
    urgency: 'high',
    reason: 'Crisis intervention',
  },
  {
    id: '3',
    callerName: 'Anonymous',
    phoneNumber: '+256 700 345 678',
    date: '2024-01-15',
    time: '11:45',
    duration: '15:30',
    status: 'escalated',
    urgency: 'high',
    reason: 'Suicide ideation',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'escalated':
      return 'warning';
    case 'missed':
      return 'error';
    default:
      return 'default';
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

export const CallHistory: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#111827' }}>
          Call History
        </Typography>
        <Typography variant="body2" color="#6b7280">
          Review your previous calls and interactions
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Search calls by caller name, phone number, or reason..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
            },
          }}
        />
      </Box>

      {/* Call History Table */}
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Caller</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Date & Time</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Duration</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Urgency</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Reason</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockCallHistory.map((call) => (
                <TableRow key={call.id} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827' }}>
                        {call.callerName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                        <PhoneIcon sx={{ fontSize: 14, color: '#6b7280' }} />
                        <Typography variant="caption" color="#6b7280">
                          {call.phoneNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="#111827">
                      {call.date}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <TimeIcon sx={{ fontSize: 14, color: '#6b7280' }} />
                      <Typography variant="caption" color="#6b7280">
                        {call.time}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="#111827">
                      {call.duration}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                      color={getStatusColor(call.status) as any}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={call.urgency.charAt(0).toUpperCase() + call.urgency.slice(1)}
                      color={getUrgencyColor(call.urgency) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="#111827">
                      {call.reason}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" sx={{ color: '#0d9488' }}>
                      <ViewIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};