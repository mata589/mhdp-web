// File: src/pages/admin/AdminDashboard/AdminDashboard.tsx
import React, { useState } from 'react';
import { GridLegacy as Grid } from '@mui/material';
import {
  Box,
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Dashboard,
  People,
  Phone,
  TrendingUp,
  Warning,
  Settings,
  Storage,
  Security,
  Assessment,
  Notifications,
  SystemUpdate
} from '@mui/icons-material';

export const AdminDashboard: React.FC = () => {
  const systemMetrics = {
    totalUsers: 45,
    activeAgents: 12,
    totalCalls: 2847,
    systemUptime: '99.8%',
    storageUsed: 67,
    securityAlerts: 3
  };

  const recentActivities = [
    { action: 'New user registered', user: 'Dr. Mukasa', time: '5 min ago', type: 'user' },
    { action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'system' },
    { action: 'Security policy updated', user: 'Admin', time: '2 hours ago', type: 'security' },
    { action: 'Performance report generated', user: 'System', time: '4 hours ago', type: 'report' }
  ];

  const systemHealth = [
    { component: 'Database', status: 'healthy', uptime: 99.9 },
    { component: 'API Gateway', status: 'healthy', uptime: 99.7 },
    { component: 'Call Service', status: 'warning', uptime: 98.5 },
    { component: 'Authentication', status: 'healthy', uptime: 100 },
    { component: 'File Storage', status: 'healthy', uptime: 99.6 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <People />;
      case 'system': return <SystemUpdate />;
      case 'security': return <Security />;
      case 'report': return <Assessment />;
      default: return <Notifications />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Admin Dashboard
      </Typography>

      {/* System Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <People sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {systemMetrics.totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Dashboard sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {systemMetrics.activeAgents}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Agents
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Phone sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {systemMetrics.totalCalls}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Calls
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 40, color: '#9c27b0', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {systemMetrics.systemUptime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                System Uptime
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Storage sx={{ fontSize: 40, color: '#607d8b', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {systemMetrics.storageUsed}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Storage Used
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Warning sx={{ fontSize: 40, color: '#f44336', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {systemMetrics.securityAlerts}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Security Alerts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* System Health */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Health
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Component</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Uptime</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {systemHealth.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.component}</TableCell>
                        <TableCell>
                          <Chip
                            label={item.status}
                            color={getStatusColor(item.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={item.uptime}
                              sx={{ width: 60, height: 6, borderRadius: 3 }}
                              color={item.uptime > 99 ? 'success' : item.uptime > 98 ? 'warning' : 'error'}
                            />
                            <Typography variant="caption">
                              {item.uptime}%
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {getActivityIcon(activity.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.action}
                        secondary={`${activity.user} • ${activity.time}`}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<People />}
                    sx={{ py: 1.5 }}
                  >
                    Manage Users
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Settings />}
                    sx={{ py: 1.5 }}
                  >
                    System Settings
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Assessment />}
                    sx={{ py: 1.5 }}
                  >
                    Generate Reports
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Security />}
                    sx={{ py: 1.5 }}
                  >
                    Security Audit
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
