import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Chip,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useLocation } from 'react-router-dom';

import type {
  StaffDetailsBasic,
  StaffPerformanceOverview,
  ConversationQualityInsights,
  ConversationQualityTrendsData,
} from '../../../types/supervisor.types';
import supervisorApi from '../../../services/api/supervisorApi';

export default function StaffDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams<{ userId: string }>();

  // State
  const [staffBasic, setStaffBasic] = useState<StaffDetailsBasic | null>(null);
  const [performanceOverview, setPerformanceOverview] = useState<StaffPerformanceOverview | null>(null);
  const [qualityInsights, setQualityInsights] = useState<ConversationQualityInsights | null>(null);
  const [qualityTrends, setQualityTrends] = useState<ConversationQualityTrendsData | null>(null);

  // Loading states
  const [loadingBasic, setLoadingBasic] = useState(true);
  const [loadingPerformance, setLoadingPerformance] = useState(true);
  const [loadingQuality, setLoadingQuality] = useState(true);
  const [loadingTrends, setLoadingTrends] = useState(true);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    if (!userId) {
      setError('No staff member selected');
      setLoadingBasic(false);
      setLoadingPerformance(false);
      setLoadingQuality(false);
      setLoadingTrends(false);
      return;
    }

    const fetchStaffDetails = async () => {
      // Fetch basic details
      try {
        setLoadingBasic(true);
        setError(null);
        const basic = await supervisorApi.getStaffDetailsBasic(userId);
        setStaffBasic(basic);
      } catch (err) {
        console.error('Error fetching basic details:', err);
        const errorMsg = err instanceof Error ? err.message : 'Failed to load staff details';
        setError(errorMsg);
      } finally {
        setLoadingBasic(false);
      }

      // Fetch performance overview
      try {
        setLoadingPerformance(true);
        const performance = await supervisorApi.getStaffPerformanceOverview(userId);
        setPerformanceOverview(performance);
      } catch (err) {
        console.error('Error fetching performance:', err);
      } finally {
        setLoadingPerformance(false);
      }

      // Fetch quality insights
      try {
        setLoadingQuality(true);
        const quality = await supervisorApi.getStaffConversationQualityInsights(userId);
        setQualityInsights(quality);
      } catch (err) {
        console.error('Error fetching quality insights:', err);
      } finally {
        setLoadingQuality(false);
      }

      // Fetch quality trends
      try {
        setLoadingTrends(true);
        const trends = await supervisorApi.getStaffConversationQualityTrends(userId);
        setQualityTrends(trends);
      } catch (err) {
        console.error('Error fetching trends:', err);
      } finally {
        setLoadingTrends(false);
      }
    };

    fetchStaffDetails();
  }, [userId]);

  // Metric icons mapping
  const metricIcons = {
    total_calls: '/phone1.png',
    calls_today: '/phone2.png',
    escalated_calls: '/phone3.png',
    average_call_duration: '/phone4.png',
    quality_score: '/phone5.png',
  };

  // Format metrics data
  const getMetrics = () => {
    if (!performanceOverview) return [];

    return [
      {
        title: 'Total Calls',
        value: performanceOverview.total_calls.value.toString(),
        icon: metricIcons.total_calls,
        change: `${performanceOverview.total_calls.percentage_change > 0 ? '+' : ''}${performanceOverview.total_calls.percentage_change}%`,
        changeText: performanceOverview.total_calls.comparison_period,
        isPositive: performanceOverview.total_calls.percentage_change > 0,
      },
      {
        title: 'Calls Today',
        value: performanceOverview.calls_today.value.toString(),
        icon: metricIcons.calls_today,
        change: `${performanceOverview.calls_today.percentage_change > 0 ? '+' : ''}${performanceOverview.calls_today.percentage_change}%`,
        changeText: performanceOverview.calls_today.comparison_period,
        isPositive: performanceOverview.calls_today.percentage_change > 0,
      },
      {
        title: 'Escalated Calls',
        value: performanceOverview.escalated_calls.value.toString(),
        icon: metricIcons.escalated_calls,
        change: `${performanceOverview.escalated_calls.percentage_change > 0 ? '+' : ''}${performanceOverview.escalated_calls.percentage_change}%`,
        changeText: performanceOverview.escalated_calls.comparison_period,
        isPositive: performanceOverview.escalated_calls.percentage_change < 0,
      },
      {
        title: 'Avg Call Duration',
        value: `${Math.floor(performanceOverview.average_call_duration.value)}:${Math.round((performanceOverview.average_call_duration.value % 1) * 60).toString().padStart(2, '0')}`,
        icon: metricIcons.average_call_duration,
        change: `${performanceOverview.average_call_duration.percentage_change > 0 ? '+' : ''}${performanceOverview.average_call_duration.percentage_change}%`,
        changeText: performanceOverview.average_call_duration.comparison_period,
        isPositive: performanceOverview.average_call_duration.percentage_change > 0,
      },
      {
        title: 'Quality Score',
        value: `${performanceOverview.quality_score.value}%`,
        icon: metricIcons.quality_score,
        change: `${performanceOverview.quality_score.percentage_change > 0 ? '+' : ''}${performanceOverview.quality_score.percentage_change}%`,
        changeText: performanceOverview.quality_score.comparison_period,
        isPositive: performanceOverview.quality_score.percentage_change > 0,
      },
    ];
  };

  // Format dialogue data
  const getDialogueData = () => {
    if (!qualityInsights) return [];

    const { quality_breakdown } = qualityInsights;
    return [
      { label: 'Rapport', value: quality_breakdown.rapport, color: '#10B981' },
      { label: 'Listening', value: quality_breakdown.listening, color: '#14B8A6' },
      { label: 'Analyzing', value: quality_breakdown.analyzing, color: '#3B82F6' },
      { label: 'Motivating', value: quality_breakdown.motivating, color: '#F59E0B' },
      { label: 'Ending', value: quality_breakdown.ending, color: '#DC2626' },
    ];
  };

  // Format chart data
  const getChartData = () => {
    if (!qualityTrends) return [];
    return qualityTrends.data_points.map(point => ({
      month: point.month,
      score: point.average_quality_score,
    }));
  };

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', p: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate('/supervisor/staff-performance')}
          sx={{
            textTransform: 'none',
            color: '#6B7280',
            fontSize: '14px',
            fontWeight: 500,
            width: { xs: '100%', sm: 'auto' },
            justifyContent: 'flex-start',
            '&:hover': {
              bgcolor: '#F3F4F6',
            },
          }}
        >
          Staff Details - {staffBasic?.full_name || 'Loading...'}
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Staff Info Card */}
      {loadingBasic ? (
        <Card sx={{ mb: 3, boxShadow: 'none', border: '1px solid #E5E7EB' }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' }, gap: { xs: 2, sm: 3 } }}>
              {[1, 2, 3, 4].map((i) => (
                <Box key={i}>
                  <Skeleton width="60%" height={16} sx={{ mb: 0.5 }} />
                  <Skeleton width="80%" height={20} />
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: { xs: 1, sm: 2 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0, sm: 2 } }}>
              <Box sx={{ flex: 1 }}>
                <Skeleton width="40%" height={16} sx={{ mb: 0.5 }} />
                <Skeleton width="60px" height={24} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Skeleton width="50%" height={16} sx={{ mb: 0.5 }} />
                <Skeleton width="70%" height={20} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : staffBasic ? (
        <Card sx={{ mb: 3, boxShadow: 'none', border: '1px solid #E5E7EB' }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' }, gap: { xs: 2, sm: 3 } }}>
              <Box>
                <Typography sx={{ fontSize: '12px', color: '#6B7280', mb: 0.5 }}>
                  Full Name
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: '#CCE5E5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {staffBasic.full_name.charAt(0).toUpperCase()}
                  </Box>
                  <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>
                    {staffBasic.full_name}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '12px', color: '#6B7280', mb: 0.5 }}>
                  Email
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#111827' }}>
                  {staffBasic.email}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '12px', color: '#6B7280', mb: 0.5 }}>
                  Role
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#111827' }}>
                  {staffBasic.role}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '12px', color: '#6B7280', mb: 0.5 }}>
                  Date Joined
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#111827' }}>
                  {new Date(staffBasic.date_joined).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: { xs: 1, sm: 2 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0, sm: 2 }, justifyContent: { xs: 'flex-start', sm: 'space-between' } }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '12px', color: '#6B7280', mb: 0.5 }}>
                  Status
                </Typography>
                <Chip
                  label={staffBasic.status.replace('_', ' ')}
                  size="small"
                  sx={{
                    bgcolor: staffBasic.status === 'on_call' ? '#FEE2E2' : '#D1FAE5',
                    color: staffBasic.status === 'on_call' ? '#DC2626' : '#10B981',
                    fontSize: '12px',
                    fontWeight: 600,
                    height: '24px',
                    textTransform: 'capitalize',
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '12px', color: '#6B7280', mb: 0.5 }}>
                  Last Active
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#111827' }}>
                  {new Date(staffBasic.last_active).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : null}

      {/* Tabs */}
      <Box sx={{ mb: 3, borderBottom: '1px solid #E5E7EB' }}>
        <Tabs
          value={location.pathname.includes('call-history') ? 1 : 0}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              color: '#6B7280',
              '&.Mui-selected': {
                color: '#00897b',
              },
            },
            '& .MuiTabs-indicator': {
              bgcolor: '#00897b',
            },
          }}
        >
          <Tab 
            label="Performance metrics" 
            onClick={() => navigate(`/supervisor/staff-details/${userId}`)}
          />
          <Tab 
            label="Call history" 
            onClick={() => navigate(`/supervisor/staff-details/${userId}/call-history`)}
          />
        </Tabs>
      </Box>

      {/* Performance Summary Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}
      >
        <Typography sx={{ fontSize: { xs: '16px', sm: '18px' }, fontWeight: 600, color: '#111827' }}>
          Performance Summary
        </Typography>
        <Button
          variant="contained"
          startIcon={<Download size={16} />}
          disabled={!performanceOverview}
          sx={{
            bgcolor: '#00897b',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: 500,
            width: { xs: '100%', sm: 'auto' },
            '&:hover': {
              bgcolor: '#00796b',
            },
            '&:disabled': {
              bgcolor: '#E5E7EB',
              color: '#9CA3AF',
            },
          }}
        >
          Download Performance report
        </Button>
      </Box>

      {/* Metrics Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(5, 1fr)' },
          gap: 2,
          mb: 3,
        }}
      >
        {loadingPerformance ? (
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <Card
                key={i}
                sx={{
                  boxShadow: 'none',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              >
                <CardContent sx={{ p: { xs: 1.5, sm: 2.5 }, '&:last-child': { pb: { xs: 1.5, sm: 2.5 } } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, mb: 2 }}>
                    <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: '8px' }} />
                    <Skeleton width="60%" height={16} />
                  </Box>
                  <Skeleton width="50%" height={32} sx={{ mb: 1 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Skeleton width="30%" height={16} />
                    <Skeleton width="40%" height={16} />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </>
        ) : performanceOverview ? (
          getMetrics().map((metric, index) => (
            <Card
              key={index}
              sx={{
                boxShadow: 'none',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 2.5 }, '&:last-child': { pb: { xs: 1.5, sm: 2.5 } } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, mb: 2 }}>
                  <Box
                    sx={{
                      width: { xs: 32, sm: 40 },
                      height: { xs: 32, sm: 40 },
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={metric.icon}
                      alt={metric.title}
                      sx={{
                        width: { xs: 16, sm: 20 },
                        height: { xs: 16, sm: 20 },
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '11px', sm: '13px' },
                      fontWeight: 500,
                      color: '#6B7280',
                    }}
                  >
                    {metric.title}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: '24px', sm: '28px' },
                    fontWeight: 700,
                    color: '#111827',
                    lineHeight: 1,
                    mb: 1,
                  }}
                >
                  {metric.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {metric.isPositive ? (
                    <TrendingUp size={14} color="#10B981" />
                  ) : (
                    <TrendingDown size={14} color="#DC2626" />
                  )}
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: metric.isPositive ? '#10B981' : '#DC2626',
                    }}
                  >
                    {metric.change}
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>
                    {metric.changeText}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 4 }}>
            <Typography sx={{ color: '#6B7280' }}>
              Performance data not available
            </Typography>
          </Box>
        )}
      </Box>

      {/* Charts Section */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
        }}
      >
        {/* Conversation Quality */}
        {loadingQuality ? (
          <Card sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <Skeleton width="60%" height={24} />
                <Skeleton width={60} height={28} sx={{ borderRadius: '14px' }} />
              </Box>
              <Box>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Box key={i} sx={{ mb: { xs: 1.5, sm: 2.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Skeleton width="30%" height={16} />
                      <Skeleton width="20%" height={16} />
                    </Box>
                    <Skeleton variant="rectangular" width="100%" height={8} sx={{ borderRadius: '4px' }} />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        ) : qualityInsights ? (
          <Card sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 0 },
                }}
              >
                <Typography sx={{ fontSize: { xs: '14px', sm: '16px' }, fontWeight: 600, color: '#111827' }}>
                  Conversation quality
                </Typography>
                <Chip
                  label={`${qualityInsights.quality_breakdown.overall_quality}%`}
                  sx={{
                    bgcolor: '#D1FAE5',
                    color: '#10B981',
                    fontSize: '14px',
                    fontWeight: 700,
                    height: '28px',
                  }}
                />
              </Box>
              <Box>
                {getDialogueData().map((item, index) => (
                  <Box key={index} sx={{ mb: { xs: 1.5, sm: 2.5 } }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>
                        {item.label}
                      </Typography>
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                        {item.value}%
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        height: '8px',
                        bgcolor: '#F3F4F6',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${item.value}%`,
                          height: '100%',
                          bgcolor: item.color,
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
              <Typography sx={{ color: '#6B7280', py: 4 }}>
                Conversation quality data not available
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Conversation Quality Trends */}
        {loadingTrends ? (
          <Card sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Skeleton width="60%" height={24} sx={{ mb: 3 }} />
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: '8px' }} />
            </CardContent>
          </Card>
        ) : qualityTrends && getChartData().length > 0 ? (
          <Card sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography sx={{ fontSize: { xs: '14px', sm: '16px' }, fontWeight: 600, color: '#111827', mb: 3 }}>
                Conversation quality trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#9CA3AF' }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                      fontSize: '13px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#14B8A6"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
              <Typography sx={{ color: '#6B7280', py: 4 }}>
                Quality trends data not available
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}