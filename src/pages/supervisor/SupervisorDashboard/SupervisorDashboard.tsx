// File: src/pages/supervisor/SupervisorDashboard/SupervisorDashboard.tsx
import React, { useState } from 'react';
import { GridLegacy as Grid } from '@mui/material';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Phone,
  Warning,
  Star,
  Visibility,
  Refresh,
  PlayArrow,
  PhoneInTalk,
  FilterList,
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import { MetricCard } from '../../../components/cards/MetricCard/MetricCard';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ToggleTabs from '../../../components/common/ToggleTabs/ToggleTabs';

export const SupervisorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState('all');

  const tabOptions = [
    { label: 'Overview', value: 0 },
    { label: 'Alerts & Escalations', value: 1 },
    { label: 'Staff Performance', value: 2 },
  ];

  const metrics = [
    {
      icon: <Phone sx={{ fontSize: 24, color: 'white' }} />,
      color: 'teal' as const,
      title: 'Total Calls',
      value: '489',
      change: {
        value: 5,
        type: 'increase' as const,
        period: 'vs last month',
      },
    },
    {
      icon: <Phone sx={{ fontSize: 24, color: 'white' }} />,
      color: 'amber' as const,
      title: 'Calls Today',
      value: '156',
      change: {
        value: -1,
        type: 'decrease' as const,
        period: 'vs yesterday',
      },
    },
    {
      icon: <Warning sx={{ fontSize: 24, color: 'white' }} />,
      color: 'red' as const,
      title: 'Escalated Calls',
      value: '7',
      change: {
        value: -1,
        type: 'decrease' as const,
        period: 'vs yesterday',
      },
    },
    {
      icon: <Star sx={{ fontSize: 24, color: 'white' }} />,
      color: 'blue' as const,
      title: 'Avg. Quality Score',
      value: '82%',
      change: {
        value: 5,
        type: 'increase' as const,
        period: 'vs last month',
      },
    },
  ];

  const callVolumeData = [
    { time: '07:00', calls: 98 },
    { time: '08:00', calls: 89 },
    { time: '09:00', calls: 92 },
    { time: '10:00', calls: 32 },
    { time: '11:00', calls: 68 },
    { time: '12:00', calls: 78 },
    { time: '13:00', calls: 132 },
    { time: '14:00', calls: 142 },
    { time: '15:00', calls: 118 },
    { time: '16:00', calls: 98 },
    { time: '17:00', calls: 78 },
  ];

  const agents = [
    { 
      id: 1, 
      name: 'James Gipir', 
      status: 'In call', 
      statusColor: '#ef4444',
      duration: '2:31',
      performance: 78,
      avatar: 'J',
      avatarBg: '#14b8a6'
    },
    { 
      id: 2, 
      name: 'Sarah Mukasa', 
      status: 'In call', 
      statusColor: '#ef4444',
      duration: '2:31',
      performance: 80,
      avatar: 'S',
      avatarBg: '#f59e0b'
    },
    { 
      id: 3, 
      name: 'Mary Namu', 
      status: 'Available', 
      statusColor: '#10b981',
      duration: null,
      performance: 78,
      avatar: 'M',
      avatarBg: '#3b82f6'
    },
    { 
      id: 4, 
      name: 'Flavia Nabukenya', 
      status: 'In call', 
      statusColor: '#ef4444',
      duration: '18:31',
      performance: 92,
      avatar: 'F',
      avatarBg: '#f59e0b'
    },
    { 
      id: 5, 
      name: 'Amooti Sam', 
      status: 'Break', 
      statusColor: '#f59e0b',
      duration: null,
      performance: 78,
      avatar: 'A',
      avatarBg: '#14b8a6'
    },
  ];

  const escalations = [
    {
      id: '2031',
      type: 'Suicidal intent',
      severity: 'Critical',
      severityColor: '#ef4444',
      agent: 'James Gipir',
      date: 'Jul 13, 2025',
      time: '10:43AM',
    },
    {
      id: '1921',
      type: 'Severe depression',
      severity: 'High',
      severityColor: '#f59e0b',
      agent: 'Emma Sseki',
      date: 'Jul 13, 2025',
      time: '10:43AM',
    },
    {
      id: '2031',
      type: 'Suicidal intent',
      severity: 'Critical',
      severityColor: '#ef4444',
      agent: 'James Gipir',
      date: 'Jul 13, 2025',
      time: '10:43AM',
    },
  ];

  const staffPerformance = [
    {
      name: 'James Gipir',
      avatar: 'J',
      avatarBg: '#14b8a6',
      status: 'On call',
      statusColor: '#ef4444',
      lastActive: 'Mon, July 13, 2025',
      lastActiveTime: '10:43 AM',
      callsHandled: 150,
      escalations: 12,
      qualityScore: 72,
    },
    {
      name: 'Sarah Mukasa',
      avatar: 'S',
      avatarBg: '#f59e0b',
      status: 'Available',
      statusColor: '#10b981',
      lastActive: 'Mon, July 13, 2025',
      lastActiveTime: '10:43 AM',
      callsHandled: 150,
      escalations: 12,
      qualityScore: 72,
    },
    {
      name: 'Mary Namu',
      avatar: 'M',
      avatarBg: '#3b82f6',
      status: 'On call',
      statusColor: '#ef4444',
      lastActive: 'Mon, July 13, 2025',
      lastActiveTime: '10:43 AM',
      callsHandled: 150,
      escalations: 12,
      qualityScore: 72,
    },
    {
      name: 'Flavia Nabukenya',
      avatar: 'F',
      avatarBg: '#f59e0b',
      status: 'Break',
      statusColor: '#f59e0b',
      lastActive: 'Mon, July 13, 2025',
      lastActiveTime: '10:43 AM',
      callsHandled: 150,
      escalations: 12,
      qualityScore: 72,
    },
    {
      name: 'James Gipir',
      avatar: 'J',
      avatarBg: '#14b8a6',
      status: 'Break',
      statusColor: '#f59e0b',
      lastActive: 'Mon, July 13, 2025',
      lastActiveTime: '10:43 AM',
      callsHandled: 150,
      escalations: 12,
      qualityScore: 72,
    },
  ];

  return (
    <Box sx={{ 
      p: { xs: 2, md: 3 }, 
      bgcolor: '#f9fafb', 
      minHeight: '100vh' 
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
          Hello, {user?.name || 'Bosco Kimuli'}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Visibility />}
          sx={{
            bgcolor: '#008080',
            color: 'white',
            textTransform: 'none',
            px: 3,
            py: 1,
            borderRadius: 2,
            '&:hover': {
              bgcolor: '#0d9488',
            },
          }}
        >
          Monitor live calls
        </Button>
      </Box>

      {/* Metrics Cards - Using MetricCard Component */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MetricCard
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
              color={metric.color}
              onClick={() => console.log(`Clicked ${metric.title}`)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Toggle Tabs */}
      <Box sx={{ mb: 3 }}>
        <ToggleTabs
          tabs={tabOptions}
          value={activeTab}
          onChange={(value) => setActiveTab(value as number)}
          sx={{ width: '100%' }}
        />
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Call Volume Trends */}
          <Grid item xs={12} lg={7}>
            <Card sx={{ 
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}>
                      Call Volume Trends
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      Hourly call distribution
                    </Typography>
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={callVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#111827',
                        border: 'none',
                        borderRadius: 8,
                        color: 'white',
                      }}
                      cursor={{ fill: '#f3f4f6' }}
                    />
                    <Bar 
                      dataKey="calls" 
                      fill="#008080" 
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Agent Status Monitor */}
          <Grid item xs={12} lg={5}>
            <Card sx={{ 
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}>
                      Agent Status Monitor
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      Current availability
                    </Typography>
                  </Box>
                  <IconButton 
                    size="small" 
                    sx={{ 
                      border: '1px solid #e5e7eb',
                      borderRadius: 1.5,
                      '&:hover': { bgcolor: '#f9fafb' }
                    }}
                  >
                    <Refresh sx={{ fontSize: 18, color: '#14b8a6' }} />
                  </IconButton>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {agents.map((agent) => (
                    <Box
                      key={agent.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        bgcolor: '#f9fafb',
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: '#f3f4f6',
                        },
                        transition: 'all 0.2s',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: agent.avatarBg,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1rem',
                          }}
                        >
                          {agent.avatar}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 600, 
                              color: '#111827',
                              mb: 0.5,
                              fontSize: '0.875rem'
                            }}
                          >
                            {agent.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: agent.statusColor,
                              }}
                            />
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: '#6b7280',
                                fontSize: '0.75rem'
                              }}
                            >
                              {agent.status}
                              {agent.duration && ` • ${agent.duration}`}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Star sx={{ fontSize: 14, color: '#fbbf24' }} />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600, 
                            color: '#111827',
                            fontSize: '0.875rem'
                          }}
                        >
                          {agent.performance}%
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Escalations Tab */}
      {activeTab === 1 && (
        <Card sx={{ 
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}>
                  Escalations Overview
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Manage and review flagged calls
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    displayEmpty
                    sx={{
                      bgcolor: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e5e7eb',
                      },
                    }}
                  >
                    <MenuItem value="all">All status</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  sx={{
                    textTransform: 'none',
                    borderColor: '#e5e7eb',
                    color: '#6b7280',
                    '&:hover': {
                      borderColor: '#d1d5db',
                      bgcolor: '#f9fafb',
                    },
                  }}
                >
                  Filters
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {escalations.map((escalation, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2.5,
                    border: '1px solid #e5e7eb',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: '#f9fafb',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flex: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PhoneInTalk sx={{ fontSize: 20, color: '#6b7280' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#111827' }}>
                          {escalation.type}
                        </Typography>
                        <Chip
                          label={escalation.severity}
                          size="small"
                          sx={{
                            bgcolor: `${escalation.severityColor}15`,
                            color: escalation.severityColor,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: 22,
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                          <span style={{ fontWeight: 500, color: '#374151' }}>Caller ID:</span> {escalation.id}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                          <span style={{ fontWeight: 500, color: '#374151' }}>Agent:</span> {escalation.agent}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                          <span style={{ fontWeight: 500, color: '#374151' }}>Sent:</span> {escalation.date} | {escalation.time}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="text"
                      startIcon={<PlayArrow />}
                      sx={{
                        textTransform: 'none',
                        color: '#14b8a6',
                        fontWeight: 500,
                        '&:hover': {
                          bgcolor: '#14b8a615',
                        },
                      }}
                    >
                      Play
                    </Button>
                    <Button
                      variant="text"
                      startIcon={<Visibility />}
                      sx={{
                        textTransform: 'none',
                        color: '#14b8a6',
                        fontWeight: 500,
                        '&:hover': {
                          bgcolor: '#14b8a615',
                        },
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<PhoneInTalk />}
                      sx={{
                        textTransform: 'none',
                        bgcolor: '#14b8a6',
                        color: 'white',
                        fontWeight: 500,
                        '&:hover': {
                          bgcolor: '#0d9488',
                        },
                      }}
                    >
                      Call
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Page <span style={{ color: '#14b8a6', fontWeight: 600 }}>1-10</span> of 60 results
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  borderColor: '#e5e7eb',
                  color: '#14b8a6',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: '#14b8a6',
                    bgcolor: '#14b8a615',
                  },
                }}
              >
                View All
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Staff Performance Tab */}
      {activeTab === 2 && (
        <Card sx={{ 
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 0.5 }}>
                  Staff Performance Overview
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Quality scores and call metrics by agents
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    displayEmpty
                    sx={{
                      bgcolor: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e5e7eb',
                      },
                    }}
                  >
                    <MenuItem value="all">All status</MenuItem>
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="oncall">On call</MenuItem>
                    <MenuItem value="break">Break</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  sx={{
                    textTransform: 'none',
                    borderColor: '#e5e7eb',
                    color: '#6b7280',
                    '&:hover': {
                      borderColor: '#d1d5db',
                      bgcolor: '#f9fafb',
                    },
                  }}
                >
                  Filters
                </Button>
              </Box>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9fafb' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>Last Active</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>Calls Handled</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>Escalations</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>Quality Score</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffPerformance.map((staff, index) => (
                    <TableRow 
                      key={index}
                      sx={{
                        '&:hover': {
                          bgcolor: '#f9fafb',
                        },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: staff.avatarBg,
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                            }}
                          >
                            {staff.avatar}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827' }}>
                            {staff.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={staff.status}
                          size="small"
                          icon={<Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: staff.statusColor, ml: 1 }} />}
                          sx={{
                            bgcolor: `${staff.statusColor}15`,
                            color: staff.statusColor,
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            '& .MuiChip-icon': {
                              ml: 1,
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#111827', fontWeight: 500 }}>
                          {staff.lastActive}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280' }}>
                          {staff.lastActiveTime}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#111827', fontWeight: 600 }}>
                          {staff.callsHandled}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#111827', fontWeight: 600 }}>
                          {staff.escalations}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Star sx={{ fontSize: 14, color: '#fbbf24' }} />
                          <Typography variant="body2" sx={{ color: '#111827', fontWeight: 600 }}>
                            {staff.qualityScore}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          sx={{
                            textTransform: 'none',
                            color: '#14b8a6',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            '&:hover': {
                              bgcolor: '#14b8a615',
                            },
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Page <span style={{ color: '#14b8a6', fontWeight: 600 }}>1-10</span> of 60 results
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  borderColor: '#e5e7eb',
                  color: '#14b8a6',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: '#14b8a6',
                    bgcolor: '#14b8a615',
                  },
                }}
              >
                View All
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};