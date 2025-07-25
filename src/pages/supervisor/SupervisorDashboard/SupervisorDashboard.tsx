// File: src/pages/supervisor/SupervisorDashboard/SupervisorDashboard.tsx
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Avatar,
  LinearProgress,
  IconButton,
  Badge
} from '@mui/material';
import {
  TrendingUp,
  People,
  Phone,
  Warning,
  Visibility,
  Assignment
} from '@mui/icons-material';

export const SupervisorDashboard: React.FC = () => {
  const metrics = {
    totalCalls: 1247,
    activeCalls: 23,
    escalatedCalls: 8,
    avgWaitTime: '2:45',
    agentPerformance: 87
  };

  const agents = [
    { id: 1, name: 'James Gipir', status: 'available', calls: 12, avgRating: 4.5 },
    { id: 2, name: 'Sarah Mukasa', status: 'busy', calls: 8, avgRating: 4.8 },
    { id: 3, name: 'David Okello', status: 'break', calls: 15, avgRating: 4.2 },
    { id: 4, name: 'Grace Nalongo', status: 'available', calls: 10, avgRating: 4.6 }
  ];

  const escalatedCalls = [
    { id: 'ESC-001', caller: 'John Doe', agent: 'James Gipir', reason: 'Complex medical query', time: '5 min ago' },
    { id: 'ESC-002', caller: 'Mary Smith', agent: 'Sarah Mukasa', reason: 'Billing dispute', time: '15 min ago' },
    { id: 'ESC-003', caller: 'Peter Kato', agent: 'David Okello', reason: 'Emergency consultation', time: '30 min ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'busy': return 'error';
      case 'break': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Supervisor Dashboard
      </Typography>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Phone sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {metrics.totalCalls}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Calls Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Badge badgeContent={metrics.activeCalls} color="success">
                <TrendingUp sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
              </Badge>
              <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }}>
                {metrics.activeCalls}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Calls
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Badge badgeContent={metrics.escalatedCalls} color="error">
                <Warning sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
              </Badge>
              <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }}>
                {metrics.escalatedCalls}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Escalated Calls
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <People sx={{ fontSize: 40, color: '#9c27b0', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {metrics.avgWaitTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Wait Time
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Assignment sx={{ fontSize: 40, color: '#f44336', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {metrics.agentPerformance}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg Performance
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Agent Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Agent Status
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Agent</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Calls</TableCell>
                      <TableCell>Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {agents.map((agent) => (
                      <TableRow key={agent.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {agent.name.split(' ').map(n => n[0]).join('')}
                            </Avatar>
                            {agent.name}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={agent.status}
                            color={getStatusColor(agent.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{agent.calls}</TableCell>
                        <TableCell>{agent.avgRating}/5</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Escalated Calls */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Escalated Calls
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Call ID</TableCell>
                      <TableCell>Caller</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {escalatedCalls.map((call) => (
                      <TableRow key={call.id}>
                        <TableCell>{call.id}</TableCell>
                        <TableCell>{call.caller}</TableCell>
                        <TableCell>
                          <Typography variant="body2" noWrap>
                            {call.reason}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {call.time}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" color="primary">
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Overview */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Today's Performance Overview
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Call Resolution Rate
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={92}
                      sx={{ height: 8, borderRadius: 4, mb: 1 }}
                    />
                    <Typography variant="caption">92%</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Customer Satisfaction
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={88}
                      color="success"
                      sx={{ height: 8, borderRadius: 4, mb: 1 }}
                    />
                    <Typography variant="caption">88%</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      First Call Resolution
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={75}
                      color="warning"
                      sx={{ height: 8, borderRadius: 4, mb: 1 }}
                    />
                    <Typography variant="caption">75%</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Agent Utilization
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={85}
                      color="info"
                      sx={{ height: 8, borderRadius: 4, mb: 1 }}
                    />
                    <Typography variant="caption">85%</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
