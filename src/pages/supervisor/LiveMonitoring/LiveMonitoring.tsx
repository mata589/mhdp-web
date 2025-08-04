// src/pages/supervisor/LiveMonitoring/LiveMonitoring.tsx
import React from 'react';
import { GridLegacy as Grid } from '@mui/material'
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Phone as PhoneIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const mockActiveAgents = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'AJ',
    status: 'on-call',
    currentCall: {
      caller: 'John Doe',
      duration: '05:23',
      urgency: 'medium',
    },
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: 'BS',
    status: 'available',
    currentCall: null,
  },
  {
    id: '3',
    name: 'Carol Wilson',
    avatar: 'CW',
    status: 'on-call',
    currentCall: {
      caller: 'Jane Smith',
      duration: '12:45',
      urgency: 'high',
    },
  },
  {
    id: '4',
    name: 'David Brown',
    avatar: 'DB',
    status: 'break',
    currentCall: null,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'on-call':
      return '#dc2626';
    case 'available':
      return '#059669';
    case 'break':
      return '#d97706';
    default:
      return '#6b7280';
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

export const LiveMonitoring: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#111827' }}>
          Live Monitoring
        </Typography>
        <Typography variant="body2" color="#6b7280">
          Monitor active agents and ongoing calls in real-time
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#059669', color: 'white' }}>
                  <PersonIcon />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
                    4
                  </Typography>
                  <Typography variant="body2" color="#6b7280">
                    Active Agents
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#dc2626', color: 'white' }}>
                  <PhoneIcon />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
                    2
                  </Typography>
                  <Typography variant="body2" color="#6b7280">
                    Ongoing Calls
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#7c3aed', color: 'white' }}>
                  <TimeIcon />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
                    9:04
                  </Typography>
                  <Typography variant="body2" color="#6b7280">
                    Avg Call Time
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#059669', color: 'white' }}>
                  <PersonIcon />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
                    2
                  </Typography>
                  <Typography variant="body2" color="#6b7280">
                    Available Agents
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Agent Status Table */}
      <Paper sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
            Agent Status Overview
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Agent</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Current Call</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Duration</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Urgency</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockActiveAgents.map((agent) => (
                <TableRow key={agent.id} sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#10b981', fontSize: '0.875rem' }}>
                        {agent.avatar}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827' }}>
                        {agent.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: getStatusColor(agent.status),
                        }}
                      />
                      <Typography variant="body2" color="#111827">
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1).replace('-', ' ')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {agent.currentCall ? (
                      <Typography variant="body2" color="#111827">
                        {agent.currentCall.caller}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="#9ca3af">
                        No active call
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {agent.currentCall ? (
                      <Typography variant="body2" color="#111827">
                        {agent.currentCall.duration}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="#9ca3af">
                        -
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {agent.currentCall ? (
                      <Chip
                        label={agent.currentCall.urgency.charAt(0).toUpperCase() + agent.currentCall.urgency.slice(1)}
                        color={getUrgencyColor(agent.currentCall.urgency) as any}
                        size="small"
                      />
                    ) : (
                      <Typography variant="body2" color="#9ca3af">
                        -
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {agent.currentCall && (
                      <IconButton size="small" sx={{ color: '#10b981' }}>
                        <ViewIcon fontSize="small" />
                      </IconButton>
                    )}
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