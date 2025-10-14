import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Avatar,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Phone,
  Business,
  People,
  BarChart,
  FileDownload,
} from '@mui/icons-material';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  iconBg: string;
}

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
  const metrics: MetricCard[] = [
    {
      title: 'Calls Today',
      value: '1247',
      change: '+3% vs yesterday',
      trend: 'up',
      icon: <Phone sx={{ fontSize: 20 }} />,
      iconBg: '#00897b',
    },
    {
      title: 'Total Facilities',
      value: '2',
      change: '+3% vs last month',
      trend: 'up',
      icon: <Business sx={{ fontSize: 20 }} />,
      iconBg: '#5e6fd8',
    },
    {
      title: 'Total Users',
      value: '281',
      change: '-1% vs last week',
      trend: 'down',
      icon: <People sx={{ fontSize: 20 }} />,
      iconBg: '#00897b',
    },
    {
      title: 'System Uptime',
      value: '99%',
      change: '-1% vs last 30 days',
      trend: 'down',
      icon: <BarChart sx={{ fontSize: 20 }} />,
      iconBg: '#ffa726',
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
      icon: <People sx={{ fontSize: 16 }} />,
      iconBg: '#00897b',
    },
    {
      role: 'Supervisors',
      count: 156,
      icon: <People sx={{ fontSize: 16 }} />,
      iconBg: '#ffa726',
    },
    {
      role: 'Facility Admins',
      count: 48,
      icon: <People sx={{ fontSize: 16 }} />,
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

        {/* Metrics Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
          {metrics.map((metric, index) => (
            <Paper key={index} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: metric.iconBg,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  {metric.icon}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  {metric.title}
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="600" sx={{ mb: 0.5 }}>
                {metric.value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {metric.trend === 'up' ? (
                  <TrendingUp sx={{ fontSize: 16, color: '#2e7d32' }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 16, color: '#d32f2f' }} />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.75rem',
                    color: metric.trend === 'up' ? '#2e7d32' : '#d32f2f',
                  }}
                >
                  {metric.change}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Main Content */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
          {/* Call Volume Trends */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1rem', mb: 0.5 }}>
                  a. Call volume trends
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  Hourly call distribution
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#00897b' }} />
                <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
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
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1rem', mb: 2 }}>
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
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        sx={{
                          bgcolor: facility.avatarBg,
                          width: 32,
                          height: 32,
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        }}
                      >
                        {facility.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                          {facility.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                          {facility.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1rem' }}>
                        {facility.totalCalls}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        Total Calls
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* User Distribution */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1rem', mb: 2 }}>
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
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: user.iconBg,
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        {user.icon}
                      </Box>
                      <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                        {user.role}
                      </Typography>
                    </Box>
                    <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1rem' }}>
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