import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CallAgentLeaderboard from '../SuperviserPopup/CallAgentLeaderboard';
import ToggleTabs from '../../../components/common/ToggleTabs/ToggleTabs';

import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  Skeleton,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Download,
} from 'lucide-react';
import supervisorApi from '../../../services/api/supervisorApi';

export default function CallCenterDashboard() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const navigate = useNavigate();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  // Loading states
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingCallVolume, setLoadingCallVolume] = useState(true);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
  const [loadingSentiment, setLoadingSentiment] = useState(true);

  // Data states
  const [overviewData, setOverviewData] = useState<any>(null);
  const [callVolumeData, setCallVolumeData] = useState<any[]>([]);
  const [alertDistributionData, setAlertDistributionData] = useState<any[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [sentimentData, setSentimentData] = useState<any[]>([]);

  const tabs = [
    { label: 'Overview', value: 0 },
    { label: 'Demographics', value: 1 },
    { label: 'Topic Analysis', value: 2 },
    { label: 'Quality Metrics', value: 3 },
  ];

  const tabUrls = [
    '/supervisor/Analytics',
    '/supervisor/Demographics',
    '/supervisor/TopicAnalysis',
    '/supervisor/QualityMetrics',
  ];

  const handleTabChange = (value: string | number) => {
    const tabIndex = value as number;
    setSelectedTab(tabIndex);
    navigate(tabUrls[tabIndex]);
  };

  // Fetch all data
  useEffect(() => {
    fetchOverview();
    fetchCallVolume();
    fetchAlertDistribution();
    fetchLeaderboard();
    fetchSentiment();
  }, []);

  const fetchOverview = async () => {
    try {
      setLoadingOverview(true);
      const data = await supervisorApi.getAnalyticsOverview();
      setOverviewData(data);
    } catch (error) {
      console.error('Error fetching overview:', error);
    } finally {
      setLoadingOverview(false);
    }
  };

  const fetchCallVolume = async () => {
    try {
      setLoadingCallVolume(true);
      const data = await supervisorApi.getAnalyticsCallVolumeTrends();
      setCallVolumeData(data.volumes || []);
    } catch (error) {
      console.error('Error fetching call volume:', error);
    } finally {
      setLoadingCallVolume(false);
    }
  };

  const fetchAlertDistribution = async () => {
    try {
      setLoadingAlerts(true);
      const data = await supervisorApi.getCriticalAlertDistribution();
      const formattedAlerts = data.alerts.map((alert: any) => ({
        name: alert.alert_type,
        value: alert.count,
        color: getAlertColor(alert.alert_type),
      }));
      setAlertDistributionData(formattedAlerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoadingAlerts(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      setLoadingLeaderboard(true);
      const data = await supervisorApi.getLeaderboard(5);
      const formattedLeaderboard = data.leaderboard.map((agent: any) => ({
        rank: agent.rank,
        name: `${agent.first_name} ${agent.last_name}`,
        calls: agent.total_calls,
        avatar: agent.first_name.charAt(0).toUpperCase(),
        performance: agent.average_quality_score,
        critical: agent.critical_calls,
        color: getAgentColor(agent.rank),
      }));
      setLeaderboardData(formattedLeaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  const fetchSentiment = async () => {
    try {
      setLoadingSentiment(true);
      const data = await supervisorApi.getCallerSentimentTrends();
      setSentimentData(data.sentiments || []);
    } catch (error) {
      console.error('Error fetching sentiment:', error);
    } finally {
      setLoadingSentiment(false);
    }
  };

  const getAlertColor = (alertType: string) => {
    if (alertType.toLowerCase().includes('suicidal')) return '#f44336';
    if (alertType.toLowerCase().includes('depression')) return '#ffa726';
    return '#4682B4';
  };

  const getAgentColor = (rank: number) => {
    const colors = ['#008080', '#FFE5B2', '#DBE6F0', '#E8F5E9', '#FFF3E0'];
    return colors[rank - 1] || '#E0E0E0';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'increase') return <TrendingUp size={14} color="#4CAF50" strokeWidth={2.5} />;
    if (trend === 'decrease') return <TrendingDown size={14} color="#F44336" strokeWidth={2.5} />;
    return null;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'increase') return '#4CAF50';
    if (trend === 'decrease') return '#F44336';
    return '#9E9E9E';
  };

  const kpiConfig = [
    {
      title: 'Total Calls',
      key: 'total_calls',
      iconPath: '/phone1.png',
      isPositiveGood: true,
    },
    {
      title: 'Calls Today',
      key: 'calls_today',
      iconPath: '/phone2.png',
      isPositiveGood: true,
    },
    {
      title: 'Escalated Calls',
      key: 'escalated_calls',
      iconPath: '/phone3.png',
      isPositiveGood: false,
    },
    {
      title: 'Avg Call Duration',
      key: 'avg_call_duration',
      iconPath: '/phone4.png',
      isPositiveGood: false,
    },
    {
      title: 'Avg Conversation Score',
      key: 'avg_conversation_score',
      iconPath: '/phone5.png',
      isPositiveGood: true,
    },
  ];

  const KPICardSkeleton = () => (
    <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <Skeleton variant="rectangular" width={32} height={32} sx={{ borderRadius: '6px' }} />
          <Skeleton variant="text" width={120} />
        </Box>
        <Skeleton variant="text" width={80} height={36} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={100} />
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '400px' }, maxWidth: '600px' }}>
          <ToggleTabs
            tabs={tabs}
            value={selectedTab}
            onChange={handleTabChange}
            sx={{ width: '100%' }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              p: 2,
              bgcolor: 'white',
              borderRadius: '8px',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#00897b',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#00796b',
              },
            }}
            startIcon={<Download size={16} />}
          >
            Export report
          </Button>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(5, 1fr)',
          },
          gap: 2,
          mb: 3,
        }}
      >
        {loadingOverview ? (
          <>
            {[...Array(5)].map((_, i) => <KPICardSkeleton key={i} />)}
          </>
        ) : (
          kpiConfig.map((kpi, i) => {
            const value = overviewData?.[kpi.key] || '0';
            const changeData = overviewData?.[`${kpi.key}_change`];
            const isPositive = changeData?.trend === 'increase';
            const showAsGood = kpi.isPositiveGood ? isPositive : !isPositive;

            return (
              <Card
                key={i}
                sx={{
                  boxShadow: 'none',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  '&:hover': {
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '6px',
                        bgcolor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        component="img"
                        src={kpi.iconPath}
                        alt={kpi.title}
                        sx={{
                          width: 20,
                          height: 20,
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#757575',
                        fontSize: '0.875rem',
                        fontWeight: 400,
                      }}
                    >
                      {kpi.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      fontSize: '24px',
                      color: '#212121',
                      mb: 1,
                      lineHeight: 1.2,
                    }}
                  >
                    {value}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    {getTrendIcon(changeData?.trend)}
                    <Typography
                      variant="caption"
                      sx={{
                        color: getTrendColor(changeData?.trend),
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {changeData?.percent || '0%'}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#9E9E9E',
                        fontSize: '0.75rem',
                      }}
                    >
                      vs last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })
        )}
      </Box>

      {/* Charts Section */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2,
          mb: 2,
        }}
      >
        {/* Call Volume Trends */}
        <Card sx={{ border: '1px solid #e0e0e0', boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 0.5 }}>
              a. Call volume trends
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              Hourly call distribution
            </Typography>
            {loadingCallVolume ? (
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 1 }} />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={callVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="total_calls" fill="#00897b" name="Total calls" stackId="a" />
                  <Bar dataKey="escalated_calls" fill="#ffa726" name="Escalated calls" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Critical Alert Distribution */}
        <Card sx={{ border: '1px solid #e0e0e0', boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
              b. Critical alert distribution
            </Typography>
            {loadingAlerts ? (
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Skeleton variant="circular" width={180} height={180} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="100%" height={30} sx={{ mb: 2 }} />
                  <Skeleton variant="text" width="100%" height={30} sx={{ mb: 2 }} />
                  <Skeleton variant="text" width="100%" height={30} />
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'space-between' }}>
                <ResponsiveContainer width="55%" height={250}>
                  <PieChart>
                    <Pie
                      data={alertDistributionData}
                      innerRadius={0}
                      outerRadius={90}
                      dataKey="value"
                      labelLine={false}
                      label={false}
                    >
                      {alertDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ flex: 1 }}>
                  {alertDistributionData.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            bgcolor: item.color,
                          }}
                        />
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          {item.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="600">
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Lower Section */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2,
          mt: 2,
        }}
      >
        {/* Agent Leaderboard */}
        <Card sx={{ border: '1px solid #e0e0e0', boxShadow: 'none' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="600">
                c. Call agent leaderboard
              </Typography>
              <Button
                variant="text"
                onClick={() => setShowLeaderboard(true)}
                sx={{
                  textTransform: 'none',
                  color: '#00897b',
                  fontSize: '0.875rem',
                  border: '1px solid #e0e0e0',
                  borderRadius: 23,
                }}
              >
                View All
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {loadingLeaderboard ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <Box key={i} sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Skeleton variant="text" width={40} />
                      <Skeleton variant="circular" width={40} height={40} />
                      <Box sx={{ flex: 1 }}>
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                      </Box>
                      <Box>
                        <Skeleton variant="text" width={50} />
                        <Skeleton variant="text" width={60} />
                      </Box>
                    </Box>
                    {i < 4 && <Divider sx={{ mt: 1.5 }} />}
                  </Box>
                ))}
              </>
            ) : (
              leaderboardData.map((agent, index) => (
                <Box key={agent.rank}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      py: 1.5,
                    }}
                  >
                    <Typography sx={{ width: 40, color: '#757575', fontSize: '0.875rem' }}>
                      #{agent.rank}
                    </Typography>
                    <Avatar
                      sx={{
                        bgcolor: agent.color,
                        width: 40,
                        height: 40,
                        fontSize: '0.875rem',
                        fontWeight: '600px',
                      }}
                    >
                      {agent.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1, ml: 2 }}>
                      <Typography variant="body2" fontWeight="500">
                        {agent.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {agent.calls} calls handled
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" fontWeight="500">
                        {agent.performance}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {agent.critical} critical
                      </Typography>
                    </Box>
                  </Box>
                  {index < leaderboardData.length - 1 && <Divider />}
                </Box>
              ))
            )}
          </CardContent>
        </Card>

        {/* Sentiment Trends */}
        <Card sx={{ border: '1px solid #e0e0e0', boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 0.5 }}>
              d. Caller sentiment trends over time
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              Hourly call sentiment
            </Typography>
            {loadingSentiment ? (
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 1 }} />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sentimentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="positive" stackId="a" fill="#4CAF50" name="Positive" />
                  <Bar dataKey="neutral" stackId="a" fill="#FFA500" name="Neutral" />
                  <Bar dataKey="negative" stackId="a" fill="#F44336" name="Negative" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Leaderboard Popup */}
      {showLeaderboard && (
        <CallAgentLeaderboard
          open={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </Box>
  );
}