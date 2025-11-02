import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Phone,
  Business,
  People,
  BarChart,
  FileDownload,
} from '@mui/icons-material';
import { MetricCard } from '../../../components/cards/MetricCard/MetricCard';

interface FacilityPerformance {
  name: string;
  location: string;
  totalCalls: number;
  avatar: string;
  avatarBg: string;
}

interface UserDistribution {
  role: string;
  count: number;
  icon: React.ReactNode;
  iconBg: string;
}

export default function DashboardOverview() {
  const metrics = [
    // Row 1 - Facilities
    {
      title: 'Total Facilities',
      value: '2',
      change: {
        value: 5,
        type: 'increase' as const,
        period: 'vs last month',
      },
      icon: <Business sx={{ fontSize: 18 }} />,
      color: 'blue' as const,
    },
    {
      title: 'Active Facilities',
      value: '1',
      change: {
        value: 1,
        type: 'decrease' as const,
        period: 'vs last week',
      },
      icon: <Business sx={{ fontSize: 18 }} />,
      color: 'green' as const,
    },
    {
      title: 'Inactive Facilities',
      value: '1',
      change: {
        value: 1,
        type: 'decrease' as const,
        period: 'vs last week',
      },
      icon: <Business sx={{ fontSize: 18 }} />,
      color: 'red' as const,
    },
    {
      title: 'Facilities Added today',
      value: '2',
      change: {
        value: 5,
        type: 'increase' as const,
        period: 'vs last month',
      },
      icon: <Business sx={{ fontSize: 18 }} />,
      color: 'blue' as const,
    },
    // Row 2 - Users
    {
      title: 'Total Users',
      value: '2',
      change: {
        value: 5,
        type: 'increase' as const,
        period: 'vs last month',
      },
      icon: <People sx={{ fontSize: 18 }} />,
      color: 'blue' as const,
    },
    {
      title: 'Active Users',
      value: '281',
      change: {
        value: 1,
        type: 'decrease' as const,
        period: 'vs last week',
      },
      icon: <People sx={{ fontSize: 18 }} />,
      color: 'green' as const,
    },
    {
      title: 'Inactive Users',
      value: '281',
      change: {
        value: 1,
        type: 'decrease' as const,
        period: 'vs last week',
      },
      icon: <People sx={{ fontSize: 18 }} />,
      color: 'red' as const,
    },
    {
      title: 'Users Added today',
      value: '2',
      change: {
        value: 5,
        type: 'increase' as const,
        period: 'vs last month',
      },
      icon: <People sx={{ fontSize: 18 }} />,
      color: 'blue' as const,
    },
    // Row 3 - Calls
    {
      title: 'Total Calls',
      value: '2',
      change: {
        value: 5,
        type: 'increase' as const,
        period: 'vs last month',
      },
      icon: <Phone sx={{ fontSize: 18 }} />,
      color: 'blue' as const,
    },
    {
      title: 'Calls Today',
      value: '1247',
      change: {
        value: 5,
        type: 'increase' as const,
        period: 'vs yesterday',
      },
      icon: <Phone sx={{ fontSize: 18 }} />,
      color: 'teal' as const,
    },
    {
      title: 'Incoming Calls',
      value: '281',
      change: {
        value: 1,
        type: 'decrease' as const,
        period: 'vs last week',
      },
      icon: <Phone sx={{ fontSize: 18 }} />,
      color: 'green' as const,
    },
    {
      title: 'Outgoing Calls',
      value: '281',
      change: {
        value: 1,
        type: 'decrease' as const,
        period: 'vs last week',
      },
      icon: <Phone sx={{ fontSize: 18 }} />,
      color: 'orange' as const,
    },
  ];

  const facilities: FacilityPerformance[] = [
    {
      name: 'Butabika Hospital',
      location: 'Uganda',
      totalCalls: 1250,
      avatar: 'B',
      avatarBg: '#ffa726',
    },
    {
      name: 'Mirembe Hospital',
      location: 'Tanzania',
      totalCalls: 1250,
      avatar: 'M',
      avatarBg: '#5e6fd8',
    },
  ];

  const userDistribution: UserDistribution[] = [
    {
      role: 'Agents',
      count: 892,
      icon: <People sx={{ fontSize: 20 }} />,
      iconBg: '#00897b',
    },
    {
      role: 'Supervisors',
      count: 156,
      icon: <People sx={{ fontSize: 20 }} />,
      iconBg: '#ffa726',
    },
    {
      role: 'Facility Admins',
      count: 48,
      icon: <People sx={{ fontSize: 20 }} />,
      iconBg: '#5e6fd8',
    },
  ];

  const callVolumeData = [
    { time: '07:00', calls: 105 },
    { time: '08:00', calls: 85 },
    { time: '09:00', calls: 85 },
    { time: '10:00', calls: 50 },
    { time: '11:00', calls: 100 },
    { time: '12:00', calls: 75 },
    { time: '13:00', calls: 130 },
    { time: '14:00', calls: 142 },
    { time: '15:00', calls: 85 },
    { time: '16:00', calls: 100 },
    { time: '17:00', calls: 65 },
  ];

  const maxCalls = Math.max(...callVolumeData.map(d => d.calls));

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography
              sx={{
                color: '#00897b',
                fontWeight: 600,
                fontSize: '0.875rem',
                borderBottom: '2px solid #00897b',
                pb: 1,
                cursor: 'pointer',
              }}
            >
              Overview
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
              04/08/2025 - 04/08/2025
            </Typography>
            <Button
              variant="contained"
              startIcon={<FileDownload />}
              sx={{
                bgcolor: '#00897b',
                textTransform: 'none',
                fontSize: '0.875rem',
                '&:hover': { bgcolor: '#00796b' },
              }}
            >
              Export report
            </Button>
          </Box>
        </Box>

        {/* Metrics Cards - Using MetricCard Component */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3 }}>
          {/* Row 1 - Facilities */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {metrics.slice(0, 4).map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </Box>
          
          {/* Row 2 - Users */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {metrics.slice(4, 8).map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </Box>
          
          {/* Row 3 - Calls */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {metrics.slice(8, 12).map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
          {/* Call Volume Trends */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1.125rem', mb: 0.5, color: '#1F2937' }}>
                  a. Call volume trends
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  Hourly call distribution
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#00897b' }} />
                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                  Total calls
                </Typography>
              </Box>
            </Box>

            {/* Chart */}
            <Box sx={{ height: 300, position: 'relative', display: 'flex' }}>
              {/* Y-axis labels */}
              <Box
                sx={{
                  width: 30,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  pt: 1,
                  pb: 4,
                }}
              >
                {[180, 160, 140, 120, 100, 80, 60, 40, 20, 0].map((val) => (
                  <Typography key={val} variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                    {val}
                  </Typography>
                ))}
              </Box>

              {/* Chart bars */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 0.5,
                  pb: 3,
                  pt: 1,
                }}
              >
                {callVolumeData.map((data, index) => {
                  const isHighest = data.calls === maxCalls;
                  const barHeight = (data.calls / 180) * 250; // 250px is chart height
                  return (
                    <Box
                      key={index}
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: 270,
                        justifyContent: 'flex-end',
                      }}
                    >
                      {isHighest && (
                        <Box
                          sx={{
                            bgcolor: '#00897b',
                            color: 'white',
                            px: 1,
                            py: 1,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            mb: 1,
                            minWidth: 40,
                          }}
                        >
                          <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)' }}>
                            At {data.time}
                          </Typography>
                          <Typography sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
                            Total calls
                          </Typography>
                          <Typography sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
                            {data.calls}
                          </Typography>
                        </Box>
                      )}
                      <Box
                        sx={{
                          width: '100%',
                          height: `${barHeight}px`,
                          bgcolor: '#00897b',
                          borderRadius: '4px 4px 0 0',
                          minHeight: 5,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ mt: 0.5, fontSize: '0.65rem', color: 'text.secondary' }}
                      >
                        {data.time}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Paper>

          {/* Right Column */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Facility Performance */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1.125rem', mb: 3, color: '#1F2937' }}>
                b. Facility performance
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {facilities.map((facility, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: '#F9FAFB',
                      border: '1px solid #F3F4F6',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: facility.avatarBg,
                          width: 48,
                          height: 48,
                          fontSize: '1.125rem',
                          fontWeight: 600,
                        }}
                      >
                        {facility.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight="600" sx={{ fontSize: '1rem', color: '#1F2937', mb: 0.25 }}>
                          {facility.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          {facility.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h5" fontWeight="700" sx={{ fontSize: '1.5rem', color: '#1F2937', mb: 0.25 }}>
                        {facility.totalCalls}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Total Calls
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* User Distribution */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1.125rem', mb: 3, color: '#1F2937' }}>
                c. User distribution
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {userDistribution.map((user, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: '#F9FAFB',
                      border: '1px solid #F3F4F6',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: user.iconBg,
                          borderRadius: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        {user.icon}
                      </Box>
                      <Typography variant="body1" fontWeight="600" sx={{ fontSize: '1rem', color: '#1F2937' }}>
                        {user.role}
                      </Typography>
                    </Box>
                    <Typography variant="h5" fontWeight="700" sx={{ fontSize: '1.5rem', color: '#1F2937' }}>
                      {user.count}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}