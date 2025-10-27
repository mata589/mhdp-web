import React, { useState } from 'react';
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

export default function CallCenterDashboard() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const navigate = useNavigate();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

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

  // Data
  const callVolumeData = [
    { hour: '07:00', totalCalls: 80, escalatedCalls: 5 },
    { hour: '08:00', totalCalls: 60, escalatedCalls: 4 },
    { hour: '09:00', totalCalls: 40, escalatedCalls: 3 },
    { hour: '10:00', totalCalls: 50, escalatedCalls: 4 },
    { hour: '11:00', totalCalls: 70, escalatedCalls: 6 },
    { hour: '12:00', totalCalls: 90, escalatedCalls: 8 },
    { hour: '13:00', totalCalls: 110, escalatedCalls: 10 },
    { hour: '14:00', totalCalls: 142, escalatedCalls: 24 },
    { hour: '15:00', totalCalls: 100, escalatedCalls: 12 },
    { hour: '16:00', totalCalls: 80, escalatedCalls: 7 },
    { hour: '17:00', totalCalls: 60, escalatedCalls: 5 },
    { hour: '18:00', totalCalls: 40, escalatedCalls: 3 },
  ];

  const alertDistributionData = [
    { name: 'Suicidal intent', value: 120, color: '#f44336' },
    { name: 'Severe depression', value: 80, color: '#ffa726' },
    { name: 'Agent escalation', value: 120, color: '#4682B4' },
  ];

  const agents = [
    {
      rank: 1,
      name: 'James Ghai',
      calls: 337,
      avatar: 'J',
      performance: 88,
      color: '#008080',
    },
    {
      rank: 2,
      name: 'Sarah Nakasa',
      calls: 298,
      avatar: 'S',
      performance: 80,
      color: '#FFE5B2',
    },
    {
      rank: 3,
      name: 'Mark John',
      calls: 276,
      avatar: 'M',
      performance: 88,
      color: '#DBE6F0',
    },
    {
      rank: 4,
      name: 'Sarah Nakasa',
      calls: 298,
      avatar: 'S',
      performance: 80,
      color: '#FFE5B2',
    },
    {
      rank: 5,
      name: 'Mark John',
      calls: 276,
      avatar: 'M',
      performance: 88,
      color: '#DBE6F0',
    },
  ];

  const kpiData = [
    {
      title: 'Total Calls',
      value: '489',
      iconPath: '/phone1.png',
      change: '+3%',
      changeText: 'vs last month',
      isPositive: true,
    },
    {
      title: 'Calls Today',
      value: '156',
      iconPath: '/phone2.png',
      change: '-1%',
      changeText: 'vs yesterday',
      isPositive: false,
    },
    {
      title: 'Escalated Calls',
      value: '7',
      iconPath: '/phone3.png',
      change: '+7%',
      changeText: 'vs yesterday',
      isPositive: false,
    },
    {
      title: 'Avg Call Duration',
      value: '13:11',
      iconPath: '/phone4.png',
      change: '-2:15',
      changeText: 'vs yesterday',
      isPositive: true,
    },
    {
      title: 'Avg Conversation Score',
      value: '82%',
      iconPath: '/phone5.png',
      change: '+4%',
      changeText: 'vs last month',
      isPositive: true,
    },
  ];

  const sentimentData = [
    { month: 'Jan', positive: 60, neutral: 40, negative: 20 },
    { month: 'Feb', positive: 100, neutral: 40, negative: 20 },
    { month: 'Mar', positive: 125, neutral: 55, negative: 35 },
    { month: 'Apr', positive: 40, neutral: 38, negative: 22 },
    { month: 'May', positive: 60, neutral: 45, negative: 28 },
    { month: 'Jun', positive: 80, neutral: 58, negative: 32 },
    { month: 'Jul', positive: 60, neutral: 48, negative: 25 },
    { month: 'Aug', positive: 70, neutral: 52, negative: 30 },
    { month: 'Sep', positive: 58, neutral: 42, negative: 24 },
    { month: 'Oct', positive: 80, neutral: 55, negative: 28 },
  ];

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
              04/09/2025 - 04/09/2025
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
        {kpiData.map((kpi, i) => (
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
                {kpi.value}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                {kpi.isPositive ? (
                  <TrendingUp size={14} color="#4CAF50" strokeWidth={2.5} />
                ) : (
                  <TrendingDown size={14} color="#F44336" strokeWidth={2.5} />
                )}
                <Typography
                  variant="caption"
                  sx={{
                    color: kpi.isPositive ? '#4CAF50' : '#F44336',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {kpi.change}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#9E9E9E',
                    fontSize: '0.75rem',
                  }}
                >
                  {kpi.changeText}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
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
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={callVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="totalCalls" fill="#00897b" name="Total calls" stackId="a" />
                <Bar dataKey="escalatedCalls" fill="#ffa726" name="Escalated calls" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Critical Alert Distribution */}
        <Card sx={{ border: '1px solid #e0e0e0', boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
              b. Critical alert distribution
            </Typography>
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
            {agents.map((agent, index) => (
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
                      18 critical
                    </Typography>
                  </Box>
                </Box>
                {index < agents.length - 1 && <Divider />}
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Sentiment Trends */}
        <Card sx={{ border: '1px solid #e0e0e0', boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 0.5 }}>
              d. Caller sentiment trends over time
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
              Monthly call sentiment
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="positive" stackId="a" fill="#D32F2F" name="Positive" />
                <Bar dataKey="neutral" stackId="a" fill="#FFA500" name="Neutral" />
                <Bar dataKey="negative" stackId="a" fill="#008080" name="Negative" />
              </BarChart>
            </ResponsiveContainer>
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