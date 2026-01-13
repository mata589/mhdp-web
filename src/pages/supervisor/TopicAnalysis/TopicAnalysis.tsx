import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Stack,
  Skeleton,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Download } from 'lucide-react';
import supervisorApi from '../../../services/api/supervisorApi';



// Shimmer/Loading components
const PieChartShimmer = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
    <Skeleton variant="circular" width={180} height={180} />
    <Stack spacing={1.5} sx={{ width: '100%' }}>
      {[1, 2, 3].map((i) => (
        <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Skeleton variant="circular" width={14} height={14} />
            <Skeleton variant="text" width={80} />
          </Stack>
          <Skeleton variant="text" width={40} />
        </Stack>
      ))}
    </Stack>
  </Box>
);

const LineChartShimmer = () => (
  <Box sx={{ width: '100%', height: 350 }}>
    <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 1 }} />
  </Box>
);

interface TopicDataItem {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number; // Index signature for Recharts compatibility
}

interface TrendDataPoint {
  month: string;
  [key: string]: string | number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);
  
  // API data states
  const [topicData, setTopicData] = useState<TopicDataItem[]>([]);
  const [outcomeData, setOutcomeData] = useState<TopicDataItem[]>([]);
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);
  
  // Loading states
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingOutcomes, setLoadingOutcomes] = useState(true);
  const [loadingTrends, setLoadingTrends] = useState(true);
  
  // Total callers
  const [totalCallers, setTotalCallers] = useState(0);

  // Color mapping for topics
  const topicColors: Record<string, string> = {
    'Anxiety': '#f5a623',
    'Psychosis': '#d32f2f',
    'Depression': '#0d7a8a',
  };

  // Color mapping for outcomes
  const outcomeColors: Record<string, string> = {
    'Resolved': '#0d7a8a',
    'Follow-up required': '#5b7fa6',
    'Referred': '#f5a623',
    'Escalated': '#d32f2f',
    'Transferred': '#5b7fa6',
    'Normal': '#7cb342',
  };

  const tabs = [
    { label: 'Overview', url: '/supervisor/Analytics' },
    { label: 'Demographics', url: '/supervisor/Demographics' },
    { label: 'Topic Analysis', url: '/supervisor/TopicAnalysis' },
    { label: 'Quality Metrics', url: '/supervisor/QualityMetrics' },
  ];

  // Fetch data from APIs
  useEffect(() => {
    fetchTopicBreakdown();
    fetchCallOutcomes();
    fetchTopicTrends();
  }, []);

  const fetchTopicBreakdown = async () => {
    try {
      setLoadingTopics(true);
      const data = await supervisorApi.getTopicBreakdown();
      
      if (data.breakdown && data.breakdown.length > 0) {
        const formattedData = data.breakdown.map(item => ({
          name: item.topic_name,
          value: item.count,
          color: topicColors[item.topic_name] || '#999',
        }));
        setTopicData(formattedData);
        setTotalCallers(data.total_calls);
      }
    } catch (error) {
      console.error('Error fetching topic breakdown:', error);
    } finally {
      setLoadingTopics(false);
    }
  };

  const fetchCallOutcomes = async () => {
    try {
      setLoadingOutcomes(true);
      const data = await supervisorApi.getCallOutcomes();
      
      if (data.breakdown && data.breakdown.some(item => item.count > 0)) {
        const formattedData = data.breakdown
          .filter(item => item.count > 0)
          .map(item => ({
            name: item.outcome,
            value: item.count,
            color: outcomeColors[item.outcome] || '#999',
          }));
        setOutcomeData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching call outcomes:', error);
    } finally {
      setLoadingOutcomes(false);
    }
  };

  const fetchTopicTrends = async () => {
    try {
      setLoadingTrends(true);
      const data = await supervisorApi.getTopicTrends();
      
      if (data.topics && data.topics.length > 0) {
        // Transform API data to chart format
        const months = [...new Set(data.topics.flatMap(topic => 
          topic.data.map(d => d.month)
        ))];
        
        const formattedData = months.map(month => {
          const dataPoint: TrendDataPoint = { month };
          data.topics.forEach(topic => {
            const monthData = topic.data.find(d => d.month === month);
            dataPoint[topic.topic_name] = monthData ? monthData.count : 0;
          });
          return dataPoint;
        });
        
        setTrendData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching topic trends:', error);
    } finally {
      setLoadingTrends(false);
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const tabIndex = tabs.findIndex(tab => tab.url === currentPath);
    if (tabIndex !== -1) {
      setSelectedTab(tabIndex);
    }
  }, [location.pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    navigate(tabs[newValue].url);
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', p: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Card sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 3,
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab, index) => (
                <Tab 
                  key={index} 
                  label={tab.label} 
                  sx={{ textTransform: 'uppercase' }} 
                />
              ))}
            </Tabs>

            <Stack direction="row" alignItems="center" spacing={2} py={2}>
              <Typography variant="body2" color="text.secondary">
                04/08/2025 - 04/09/2025
              </Typography>
              <Button
                variant="contained"
                startIcon={<Download size={16} />}
                sx={{
                  bgcolor: '#0d9488',
                  textTransform: 'uppercase',
                  fontWeight: 100,
                  '&:hover': {
                    bgcolor: '#0c7c73',
                  },
                }}
              >
                Export report
              </Button>
            </Stack>
          </Box>
        </Card>

        {/* Content */}
        <Box display="flex" flexWrap="wrap" gap={3}>
          {/* Topic breakdown */}
          <Card sx={{ flex: '1 1 calc(50% - 12px)', minWidth: 400 }}>
            <CardHeader
              title="a. Topic breakdown"
              subheader={`Total: ${totalCallers.toLocaleString()} callers`}
            />
            <CardContent>
              {loadingTopics ? (
                <PieChartShimmer />
              ) : topicData.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No topic data available
                  </Typography>
                </Box>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={topicData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => entry.name}
                        outerRadius={90}
                        dataKey="value"
                      >
                        {topicData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <Box mt={3}>
                    {topicData.map((item, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1.5}
                      >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Box
                            sx={{
                              width: 14,
                              height: 14,
                              bgcolor: item.color,
                              borderRadius: '50%',
                            }}
                          />
                          <Typography variant="body2">{item.name}</Typography>
                        </Stack>
                        <Typography fontWeight={500}>{item.value}</Typography>
                      </Stack>
                    ))}
                  </Box>
                </>
              )}
            </CardContent>
          </Card>

          {/* Call outcomes */}
          <Card sx={{ flex: '1 1 calc(50% - 12px)', minWidth: 400 }}>
            <CardHeader 
              title="b. Call outcomes" 
              subheader={`Total: ${totalCallers.toLocaleString()} callers`} 
            />
            <CardContent>
              {loadingOutcomes ? (
                <PieChartShimmer />
              ) : outcomeData.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No outcome data available
                  </Typography>
                </Box>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={outcomeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={90}
                        dataKey="value"
                      >
                        {outcomeData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <Box mt={3}>
                    {outcomeData.map((item, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1.5}
                      >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Box
                            sx={{
                              width: 14,
                              height: 14,
                              bgcolor: item.color,
                              borderRadius: '50%',
                            }}
                          />
                          <Typography variant="body2">{item.name}</Typography>
                        </Stack>
                        <Typography fontWeight={500}>{item.value}</Typography>
                      </Stack>
                    ))}
                  </Box>
                </>
              )}
            </CardContent>
          </Card>

          {/* Topic trends */}
          <Card sx={{ flex: '1 1 100%' }}>
            <CardHeader
              title="c. Topic trends over time"
              action={
                <Stack direction="row" spacing={3} alignItems="center">
                  {[
                    { label: 'Psychosis', color: '#d32f2f' },
                    { label: 'Depression', color: '#0d7a8a' },
                    { label: 'Anxiety', color: '#f5a623' },
                  ].map((item, i) => (
                    <Stack direction="row" spacing={1} alignItems="center" key={i}>
                      <Box sx={{ width: 12, height: 12, bgcolor: item.color, borderRadius: '50%' }} />
                      <Typography variant="caption" color="text.secondary">
                        {item.label}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              }
            />
            <CardContent sx={{ p: 3 }}>
              {loadingTrends ? (
                <LineChartShimmer />
              ) : trendData.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="body2" color="text.secondary">
                    No trend data available
                  </Typography>
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    data={trendData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="Psychosis"
                      stroke="#d32f2f"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6 }}
                      animationDuration={1000}
                    />
                    <Line
                      type="monotone"
                      dataKey="Depression"
                      stroke="#0d7a8a"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6 }}
                      animationDuration={1200}
                    />
                    <Line
                      type="monotone"
                      dataKey="Anxiety"
                      stroke="#f5a623"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6 }}
                      animationDuration={1400}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                      }}
                      labelStyle={{ color: '#374151', fontWeight: 500 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}