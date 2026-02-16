import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Avatar,
  Alert,
} from '@mui/material';
import {
  Phone,
  Business,
  People,
  FileDownload,
} from '@mui/icons-material';
import { MetricCard } from '../../../components/cards/MetricCard/MetricCard';
import systemAdminApi from '../../../services/api/systemAdminApi';
import type {
  FullOverview,
  HourlyCallTrendsResponse,
  FacilitiesPerformanceResponse,
  UsersDistributionResponse,
} from '../../../types/systemAdmin.types';
import { MetricCardSkeleton } from '../../supervisor/SupervisorDashboard/components';
import { CallVolumeChartSkeleton, FacilityPerformanceCardSkeleton, UserDistributionCardSkeleton } from '../../../components/common/Shimmer/Shimmer';
// import {
//   MetricCardSkeleton,
//   CallVolumeChartSkeleton,
//   FacilityPerformanceCardSkeleton,
//   UserDistributionCardSkeleton,
// } from './Shimmer';

interface FacilityPerformance {
  facility_id: string;
  facility_name: string;
  country: string;
  total_calls: number;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overview, setOverview] = useState<FullOverview | null>(null);
  const [callTrends, setCallTrends] = useState<HourlyCallTrendsResponse | null>(null);
  const [facilityPerformance, setFacilityPerformance] = useState<FacilitiesPerformanceResponse | null>(null);
  const [userDistribution, setUserDistribution] = useState<UsersDistributionResponse | null>(null);

  // Date range - you can make this dynamic with date pickers later
  const [startDate] = useState('2024-01-01');
  const [endDate] = useState('2024-12-31');

  useEffect(() => {
    fetchAllData();
  }, [startDate, endDate]);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [overviewData, trendsData, performanceData, distributionData] = await Promise.all([
        systemAdminApi.getFullOverview(startDate, endDate),
        systemAdminApi.getCallsHourlyTrends(startDate, endDate),
        systemAdminApi.getFacilitiesPerformance(startDate, endDate),
        systemAdminApi.getUsersDistribution(startDate, endDate),
      ]);

      setOverview(overviewData);
      setCallTrends(trendsData);
      setFacilityPerformance(performanceData);
      setUserDistribution(distributionData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getChangeType = (percentage: number): 'increase' | 'decrease' => {
    return percentage >= 0 ? 'increase' : 'decrease';
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const formatOptions: Intl.DateTimeFormatOptions = { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    };
    return `${startDate.toLocaleDateString('en-US', formatOptions)} - ${endDate.toLocaleDateString('en-US', formatOptions)}`;
  };

  // Generate avatar colors based on facility name
  const getAvatarColor = (index: number) => {
    const colors = ['#ffa726', '#5e6fd8', '#00897b', '#e91e63', '#9c27b0', '#ff5722'];
    return colors[index % colors.length];
  };

  // Map user roles to icons and colors
  const getUserRoleConfig = (role: string): { icon: React.ReactNode; iconBg: string } => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('agent')) {
      return {
        icon: <People sx={{ fontSize: 20 }} />,
        iconBg: '#00897b',
      };
    } else if (roleLower.includes('supervisor')) {
      return {
        icon: <People sx={{ fontSize: 20 }} />,
        iconBg: '#ffa726',
      };
    } else if (roleLower.includes('admin')) {
      return {
        icon: <People sx={{ fontSize: 20 }} />,
        iconBg: '#5e6fd8',
      };
    } else {
      return {
        icon: <People sx={{ fontSize: 20 }} />,
        iconBg: '#9e9e9e',
      };
    }
  };

  // Shimmer Loading State
  if (loading) {
    return (
      <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 3 }}>
        <Container maxWidth="xl">
          {/* Header Skeleton */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 32,
                  bgcolor: '#e0e0e0',
                  borderRadius: 1,
                  animation: 'shimmer 1.5s infinite',
                  '@keyframes shimmer': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 150,
                  height: 20,
                  bgcolor: '#e0e0e0',
                  borderRadius: 1,
                  animation: 'shimmer 1.5s infinite',
                }}
              />
              <Box
                sx={{
                  width: 120,
                  height: 36,
                  bgcolor: '#e0e0e0',
                  borderRadius: 1,
                  animation: 'shimmer 1.5s infinite',
                }}
              />
            </Box>
          </Box>

          {/* Metrics Cards Skeleton - 3 rows of 4 cards */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3 }}>
            {Array.from({ length: 3 }).map((_, rowIndex) => (
              <Box key={rowIndex} sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
                {Array.from({ length: 4 }).map((_, cardIndex) => (
                  <MetricCardSkeleton key={cardIndex} />
                ))}
              </Box>
            ))}
          </Box>

          {/* Main Content Skeleton */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
            {/* Call Volume Chart Skeleton */}
            <CallVolumeChartSkeleton />

            {/* Right Column Skeleton */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FacilityPerformanceCardSkeleton />
              <UserDistributionCardSkeleton />
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error || !overview) {
    return (
      <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Failed to load dashboard data'}
        </Alert>
        <Button
          variant="contained"
          onClick={fetchAllData}
          sx={{
            bgcolor: '#00897b',
            '&:hover': { bgcolor: '#00796b' },
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  // Build metrics array from API data - only after confirming overview exists
  const metrics = [
    // Row 1 - Facilities
    {
      title: 'Total Facilities',
      value: overview.total_facilities.value.toString(),
      change: {
        value: Math.abs(overview.total_facilities.percentage_change),
        type: getChangeType(overview.total_facilities.percentage_change),
        period: overview.total_facilities.change_label,
      },
      icon: <Business sx={{ fontSize: 18 }} />,
      color: 'blue' as const,
    },
    {
      title: 'Active Facilities',
      value: overview.active_facilities.value.toString(),
      change: {
        value: Math.abs(overview.active_facilities.percentage_change),
        type: getChangeType(overview.active_facilities.percentage_change),
        period: overview.active_facilities.change_label,
      },
      icon: <Business sx={{ fontSize: 18 }} />,
      color: 'green' as const,
    },
    {
      title: 'Inactive Facilities',
      value: overview.inactive_facilities.value.toString(),
      change: {
        value: Math.abs(overview.inactive_facilities.percentage_change),
        type: getChangeType(overview.inactive_facilities.percentage_change),
        period: overview.inactive_facilities.change_label,
      },
      icon: <Business sx={{ fontSize: 18 }} />,
      color: 'red' as const,
    },
    {
      title: 'Facilities Added Today',
      value: overview.facilities_added_today.value.toString(),
      change: {
        value: Math.abs(overview.facilities_added_today.percentage_change),
        type: getChangeType(overview.facilities_added_today.percentage_change),
        period: overview.facilities_added_today.change_label,
      },
      icon: <Business sx={{ fontSize: 18 }} />,
      color: 'blue' as const,
    },
    // Row 2 - Users
    {
      title: 'Total Users',
      value: overview.total_users.value.toString(),
      change: {
        value: Math.abs(overview.total_users.percentage_change),
        type: getChangeType(overview.total_users.percentage_change),
        period: overview.total_users.change_label,
      },
      icon: <People sx={{ fontSize: 18 }} />,
      color: 'blue' as const,
    },
    {
      title: 'Active Users',
      value: overview.active_users.value.toString(),
      change: {
        value: Math.abs(overview.active_users.percentage_change),
        type: getChangeType(overview.active_users.percentage_change),
        period: overview.active_users.change_label,
      },
      icon: <People sx={{ fontSize: 18 }} />,
      color: 'green' as const,
    },
    {
      title: 'Inactive Users',
      value: overview.inactive_users.value.toString(),
      change: {
        value: Math.abs(overview.inactive_users.percentage_change),
        type: getChangeType(overview.inactive_users.percentage_change),
        period: overview.inactive_users.change_label,
      },
      icon: <People sx={{ fontSize: 18 }} />,
      color: 'red' as const,
    },
    {
      title: 'Users Added Today',
      value: overview.users_added_today.value.toString(),
      change: {
        value: Math.abs(overview.users_added_today.percentage_change),
        type: getChangeType(overview.users_added_today.percentage_change),
        period: overview.users_added_today.change_label,
      },
      icon: <People sx={{ fontSize: 18 }} />,
      color: 'blue' as const,
    },
    // Row 3 - Calls
    {
      title: 'Total Calls',
      value: overview.total_calls.value.toString(),
      change: {
        value: Math.abs(overview.total_calls.percentage_change),
        type: getChangeType(overview.total_calls.percentage_change),
        period: overview.total_calls.change_label,
      },
      icon: <Phone sx={{ fontSize: 18 }} />,
      color: 'blue' as const,
    },
    {
      title: 'Calls Today',
      value: overview.calls_today.value.toString(),
      change: {
        value: Math.abs(overview.calls_today.percentage_change),
        type: getChangeType(overview.calls_today.percentage_change),
        period: overview.calls_today.change_label,
      },
      icon: <Phone sx={{ fontSize: 18 }} />,
      color: 'teal' as const,
    },
    {
      title: 'Incoming Calls',
      value: overview.incoming_calls.value.toString(),
      change: {
        value: Math.abs(overview.incoming_calls.percentage_change),
        type: getChangeType(overview.incoming_calls.percentage_change),
        period: overview.incoming_calls.change_label,
      },
      icon: <Phone sx={{ fontSize: 18 }} />,
      color: 'orange' as const,
    },
    {
      title: 'Outgoing Calls',
      value: overview.outgoing_calls.value.toString(),
      change: {
        value: Math.abs(overview.outgoing_calls.percentage_change),
        type: getChangeType(overview.outgoing_calls.percentage_change),
        period: overview.outgoing_calls.change_label,
      },
      icon: <Phone sx={{ fontSize: 18 }} />,
      color: 'red' as const,
    },
  ];

  // Map facility performance data
  const facilities: FacilityPerformance[] = facilityPerformance?.data.map((facility, index) => ({
    facility_id: facility.facility_id,
    facility_name: facility.facility_name,
    country: facility.country,
    total_calls: facility.total_calls,
    avatar: facility.facility_name.charAt(0).toUpperCase(),
    avatarBg: getAvatarColor(index),
  })) || [];

  // Map user distribution data
  const users: UserDistribution[] = userDistribution?.data.map((user) => ({
    role: user.role,
    count: user.count,
    ...getUserRoleConfig(user.role),
  })) || [];

  // Process call trends data
  const callVolumeData = callTrends?.data.map((trend) => ({
    time: trend.hour,
    calls: trend.total_calls,
  })) || [];

  const maxCalls = callVolumeData.length > 0 
    ? Math.max(...callVolumeData.map(d => d.calls))
    : 0;

  // Calculate max value for Y-axis (round up to nearest 20)
  const maxYAxis = Math.ceil(maxCalls / 20) * 20 || 180;

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
              {formatDateRange(startDate, endDate)}
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
            {callVolumeData.length === 0 ? (
              <Box sx={{ 
                height: 300, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Typography variant="body2" color="text.secondary">
                  No call data available for the selected period
                </Typography>
              </Box>
            ) : (
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
                  {Array.from({ length: 10 }, (_, i) => maxYAxis - (i * maxYAxis / 9)).map((val) => (
                    <Typography key={val} variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                      {Math.round(val)}
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
                    const barHeight = maxYAxis > 0 ? (data.calls / maxYAxis) * 250 : 0;
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
                        {isHighest && data.calls > 0 && (
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
                            minHeight: data.calls > 0 ? 5 : 0,
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
            )}
          </Paper>

          {/* Right Column */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Facility Performance */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1.125rem', mb: 3, color: '#1F2937' }}>
                b. Facility performance
              </Typography>
              {facilities.length === 0 ? (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No facility data available
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {facilities.map((facility, index) => (
                    <Box
                      key={facility.facility_id}
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
                            {facility.facility_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                            {facility.country}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h5" fontWeight="700" sx={{ fontSize: '1.5rem', color: '#1F2937', mb: 0.25 }}>
                          {facility.total_calls.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          Total Calls
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>

            {/* User Distribution */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="600" sx={{ fontSize: '1.125rem', mb: 3, color: '#1F2937' }}>
                c. User distribution
              </Typography>
              {users.length === 0 ? (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No user data available
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {users.map((user, index) => (
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
                        {user.count.toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}