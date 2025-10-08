import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import {
  ArrowLeft,
  Download,
  Phone,
  Calendar,
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
import { Link, useLocation } from 'react-router-dom';

export default function StaffDetailsPage() {
  const location = useLocation();

  const conversationTrendData = [
    { month: 'Jan', score: 20 },
    { month: 'Feb', score: 25 },
    { month: 'Mar', score: 20 },
    { month: 'Apr', score: 50 },
    { month: 'May', score: 85 },
    { month: 'Jun', score: 55 },
    { month: 'Jul', score: 40 },
    { month: 'Aug', score: 35 },
    { month: 'Sep', score: 55 },
    { month: 'Oct', score: 30 },
    { month: 'Nov', score: 20 },
    { month: 'Dec', score: 0 },
  ];

  const metrics = [
    {
      title: 'Total Calls',
      value: '102',
      icon: '/phone1.png',
      change: '+3%',
      changeText: 'vs last month',
      isPositive: true,
    },
    {
      title: 'Calls Today',
      value: '5',
      icon: '/phone2.png',
      change: '-1%',
      changeText: 'vs yesterday',
      isPositive: false,
    },
    {
      title: 'Escalated Calls',
      value: '7',
      icon: '/phone3.png',
      change: '-1%',
      changeText: 'vs yesterday',
      isPositive: false,
    },
    {
      title: 'Avg Call Duration',
      value: '13:11',
      icon: '/phone4.png',
      change: '+2%',
      changeText: 'vs yesterday',
      isPositive: true,
    },
    {
      title: 'Quality Score',
      value: '90%',
      icon: '/phone5.png',
      change: '+4%',
      changeText: 'vs last month',
      isPositive: true,
    },
  ];

  const dialogueData = [
    { label: 'Rapport', value: 15, color: '#10B981' },
    { label: 'Listening', value: 30, color: '#14B8A6' },
    { label: 'Analyzing', value: 45, color: '#3B82F6' },
    { label: 'Motivating', value: 65, color: '#F59E0B' },
    { label: 'Ending', value: 85, color: '#DC2626' },
  ];

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowLeft size={18} />}
          sx={{
            textTransform: 'none',
            color: '#6B7280',
            fontSize: '14px',
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#F3F4F6',
            },
          }}
        >
          Staff Details - James Gipir
        </Button>
      </Box>

      {/* Staff Info Card */}
      <Card sx={{ mb: 3, boxShadow: 'none', border: '1px solid #E5E7EB' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
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
                  J
                </Box>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>
                  James Gipir
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#6B7280', mb: 0.5 }}>
                Email
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#111827' }}>
                james.gipir@butabikahospital.go.ug
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#6B7280', mb: 0.5 }}>
                Role
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#111827' }}>
                Call Agent
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '12px', color: '#6B7280', mb: 0.5 }}>
                Date Joined
              </Typography>
              <Typography sx={{ fontSize: '14px', color: '#111827' }}>
                Mon, Jul 13, 2025 | 10:43 AM
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: '12px', color: '#6B7280', mb: 0.5 }}>
              Status
            </Typography>
            <Chip
              label="On call"
              size="small"
              sx={{
                bgcolor: '#FEE2E2',
                color: '#DC2626',
                fontSize: '12px',
                fontWeight: 600,
                height: '24px',
              }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: '12px', color: '#6B7280', mb: 0.5 }}>
              Last Call
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#111827' }}>
              Mon, Jul 13, 2025 | 10:43 AM
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ mb: 3, borderBottom: '1px solid #E5E7EB' }}>
        <Tabs
          value={location.pathname === '/call-history' ? 1 : 0}
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
          <Tab label="Performance metrics" component={Link} to="/supervisor/StaffDetailsPage" />
          <Tab label="Call history" component={Link} to="/supervisor/CallHistoryTab" />
        </Tabs>
      </Box>

      {/* Performance Summary Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>
          Performance Summary
        </Typography>
        <Button
          variant="contained"
          startIcon={<Download size={16} />}
          sx={{
            bgcolor: '#00897b',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#00796b',
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
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 2,
          mb: 3,
        }}
      >
        {metrics.map((metric, index) => (
          <Card
            key={index}
            sx={{
              boxShadow: 'none',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
            }}
          >
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
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
                      width: 20,
                      height: 20,
                      objectFit: 'contain',
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#6B7280',
                  }}
                >
                  {metric.title}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: '28px',
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
        ))}
      </Box>

      {/* Charts Section */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
        }}
      >
        {/* Conversation Quality */}
        <Card sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>
                a. James' conversation quality
              </Typography>
              <Chip
                label="80%"
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
              {dialogueData.map((item, index) => (
                <Box key={index} sx={{ mb: 2.5 }}>
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

        {/* Conversation Quality Trends */}
        <Card sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#111827', mb: 3 }}>
              b. Conversation quality trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversationTrendData}>
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
      </Box>
    </Box>
  );
}