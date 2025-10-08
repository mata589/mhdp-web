import React, { useState, useEffect } from 'react';

import { useNavigate, useLocation } from 'react-router-dom'; // Add these imports
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

const topicData = [
  { name: 'Anxiety', value: 300, color: '#f5a623' },
  { name: 'Psychosis', value: 250, color: '#d32f2f' },
  { name: 'Depression', value: 460, color: '#0d7a8a' },
];

const outcomeData = [
  { name: 'Resolved', value: 400, color: '#0d7a8a' },
  { name: 'Follow-up required', value: 300, color: '#5b7fa6' },
  { name: 'Referred', value: 110, color: '#f5a623' },
  { name: 'Escalated', value: 300, color: '#d32f2f' },
];

const trendData = [
  { month: 'Jan', Psychosis: 40, Depression: 30, Anxiety: 45 },
  { month: 'Feb', Psychosis: 35, Depression: 25, Anxiety: 30 },
  { month: 'Mar', Psychosis: 30, Depression: 40, Anxiety: 25 },
  { month: 'Apr', Psychosis: 50, Depression: 60, Anxiety: 35 },
  { month: 'May', Psychosis: 180, Depression: 134, Anxiety: 45 },
  { month: 'Jun', Psychosis: 60, Depression: 34, Anxiety: 55 },
  { month: 'Jul', Psychosis: 80, Depression: 50, Anxiety: 90 },
  { month: 'Aug', Psychosis: 100, Depression: 60, Anxiety: 70 },
  { month: 'Sep', Psychosis: 120, Depression: 80, Anxiety: 50 },
  { month: 'Oct', Psychosis: 90, Depression: 100, Anxiety: 60 },
  { month: 'Nov', Psychosis: 70, Depression: 90, Anxiety: 100 },
  { month: 'Dec', Psychosis: 50, Depression: 70, Anxiety: 80 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);
  

  // Define tabs with URLs
  const tabs = [
    { label: 'Overview', url: '/supervisor/Analytics' },
    { label: 'Demographics', url: '/supervisor/Demographics' },
    { label: 'Topic Analysis', url: '/supervisor/TopicAnalysis' },
    { label: 'Quality Metrics', url: '/supervisor/QualityMetrics' },
  ];

  // Set the active tab based on current URL
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
            {/* Tabs */}
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
                startIcon={<Download size={5} />}
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
              subheader="Total: 5,347 callers"
            />
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Call outcomes */}
          <Card sx={{ flex: '1 1 calc(50% - 12px)', minWidth: 400 }}>
            <CardHeader title="b. Call outcomes" subheader="Total: 5,347 callers" />
            <CardContent>
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
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}