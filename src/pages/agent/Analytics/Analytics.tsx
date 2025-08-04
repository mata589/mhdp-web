// src/pages/agent/Analytics/Analytics.tsx
import React from 'react';
import { GridLegacy as Grid } from '@mui/material';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ 
          p: 1.5, 
          borderRadius: 2, 
          bgcolor: `${color}20`,
          color: color,
        }}>
          {icon}
        </Box>
        <Typography variant="caption" color={change.startsWith('+') ? '#059669' : '#dc2626'}>
          {change}
        </Typography>
      </Box>
      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700, color: '#111827' }}>
        {value}
      </Typography>
      <Typography variant="body2" color="#6b7280">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

export const Analytics: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: '#111827' }}>
          Analytics Dashboard
        </Typography>
        <Typography variant="body2" color="#6b7280">
          Track your performance and call statistics
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Calls Today"
            value="24"
            change="+12%"
            icon={<PhoneIcon />}
            color="#0d9488"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Average Call Duration"
            value="11:30"
            change="+5%"
            icon={<TimeIcon />}
            color="#7c3aed"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Success Rate"
            value="94%"
            change="+2%"
            icon={<TrendingUpIcon />}
            color="#059669"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Satisfaction Score"
            value="4.8"
            change="+0.3"
            icon={<StarIcon />}
            color="#dc6a00"
          />
        </Grid>
      </Grid>

      {/* Performance Metrics */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#111827' }}>
              Weekly Call Volume
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f9fafb', borderRadius: 2 }}>
              <Typography color="#6b7280">
                Chart visualization would go here
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#111827' }}>
              Call Categories
            </Typography>
            <Box sx={{ space: 2 }}>
              {[
                { label: 'Anxiety Support', value: 45, color: '#0d9488' },
                { label: 'Crisis Intervention', value: 25, color: '#dc2626' },
                { label: 'General Counseling', value: 20, color: '#7c3aed' },
                { label: 'Follow-up Calls', value: 10, color: '#059669' },
              ].map((category, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="#374151">
                      {category.label}
                    </Typography>
                    <Typography variant="body2" color="#6b7280">
                      {category.value}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={category.value}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: '#e5e7eb',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: category.color,
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};