// src/pages/agent/AgentDashboard/AgentDashboard.tsx
import React, { useState, useEffect } from 'react';
import { GridLegacy as Grid } from '@mui/material';

import {
  Paper,
  Typography,
  Box,
  Button,
  Alert,
  Chip,
  Card,
  CardContent,
  Avatar,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import {
  Call,
  CallEnd,
  Escalator,
  Assessment,
  History,
  Warning,
  Phone,
  TrendingUp,
  Person,
  FilterList,
} from '@mui/icons-material';
import { MetricCard } from '../../../components/cards/MetricCard/MetricCard';
import { DataTable } from '../../../components/common/DataTable/DataTable';

import { useAuth } from '../../../contexts/AuthContext';
import { useCallData } from '../../../hooks/useCallData';

const statusColors = {
  'Available': '#4caf50',
  'Busy': '#ff9800', 
  'Break': '#607d8b'
};

const riskColors = {
  'Low': '#4caf50',
  'Medium': '#ff9800',
  'High': '#f44336'
};

const outcomeColors = {
  'Advice Given': '#4caf50',
  'Escalated': '#f44336',
  'Referred': '#607d8b'
};

export const AgentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const [status, setStatus] = useState<'Available' | 'Busy' | 'Break'>('Available');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [languageFilter, setLanguageFilter] = useState('All languages');

  // Mock data for recent call activity
  const recentCalls = [
    {
      id: '#2031',
      dateTime: 'Mon, July 13, 2025 10:43 AM - 10:51 AM',
      caller: 'English',
      primaryTopic: 'Anxiety Management',
      riskLevel: 'Medium',
      outcome: 'Advice Given',
      qualityScore: '78%'
    },
    {
      id: '#2089',
      dateTime: 'Mon, July 13, 2025 10:43 AM - 10:51 AM',
      caller: 'French',
      primaryTopic: 'Depression',
      riskLevel: 'High',
      outcome: 'Escalated',
      qualityScore: '78%'
    },
    {
      id: '#2031',
      dateTime: 'Tue, July 13, 2025 10:43 AM - 10:51 AM',
      caller: 'English',
      primaryTopic: 'Psychosis',
      riskLevel: 'Medium',
      outcome: 'Advice Given',
      qualityScore: '80%'
    },
    {
      id: '#2070',
      dateTime: 'Mon, July 13, 2025 10:43 AM - 10:51 AM',
      caller: 'English',
      primaryTopic: 'Psychosis',
      riskLevel: 'Low',
      outcome: 'Referred',
      qualityScore: '78%'
    },
    {
      id: '#2031',
      dateTime: 'Mon, July 13, 2025 10:43 AM - 10:51 AM',
      caller: 'Spanish',
      primaryTopic: 'Depression',
      riskLevel: 'Medium',
      outcome: 'Advice Given',
      qualityScore: '78%'
    }
  ];

  const handleStatusChange = (newStatus: 'Available' | 'Busy' | 'Break') => {
    setStatus(newStatus);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#212121' }}>
            Hey, James
          </Typography>
          <Chip 
            label={status}
            sx={{ 
              backgroundColor: statusColors[status],
              color: 'white',
              fontWeight: 500,
              fontSize: '0.75rem'
            }}
          />
        </Box>
      </Box>

      {/* Action Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            p: 3, 
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            cursor: 'pointer',
            '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ backgroundColor: '#008080', width: 48, height: 48 }}>
                <Phone />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Answer call
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Take incoming helpline calls
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ 
            p: 3, 
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            cursor: 'pointer',
            '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ backgroundColor: '#ffa500', width: 48, height: 48 }}>
                <History />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  View call history
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Review past calls and insights
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ 
            p: 3, 
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            cursor: 'pointer',
            '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ backgroundColor: '#f44336', width: 48, height: 48 }}>
                <Warning />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Escalate a case
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Flag urgent cases to supervisor
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar sx={{ backgroundColor: '#008080', width: 40, height: 40 }}>
                <Call sx={{ fontSize: 20 }} />
              </Avatar>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Total Calls
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#212121' }}>
              32
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar sx={{ backgroundColor: '#ffa500', width: 40, height: 40 }}>
                <Assessment sx={{ fontSize: 20 }} />
              </Avatar>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Calls Today
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#212121' }}>
              12
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar sx={{ backgroundColor: '#f44336', width: 40, height: 40 }}>
                <Escalator sx={{ fontSize: 20 }} />
              </Avatar>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Escalated Calls
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#212121' }}>
              2
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            p: 3, 
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar sx={{ backgroundColor: '#607d8b', width: 40, height: 40 }}>
                <TrendingUp sx={{ fontSize: 20 }} />
              </Avatar>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Conversation Score
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#212121' }}>
              82%
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Call Activity */}
      <Paper sx={{ p: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              Recent call activity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your most recent interactions with complete call details
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
                sx={{ borderRadius: '8px' }}
              >
                <MenuItem value="All status">All status</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                displayEmpty
                sx={{ borderRadius: '8px' }}
              >
                <MenuItem value="All languages">All languages</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ borderRadius: '8px' }}
            >
              More Filters
            </Button>
          </Box>
        </Box>

        {/* Table Headers */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr 1fr 1fr',
          gap: 2,
          p: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          mb: 2
        }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#757575' }}>
            Date & Time
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#757575' }}>
            Caller ID
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#757575' }}>
            Primary Topic
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#757575' }}>
            Risk level
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#757575' }}>
            Outcome
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#757575' }}>
            Quality Score
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#757575' }}>
            Action
          </Typography>
        </Box>

        {/* Table Rows */}
        <Stack spacing={1}>
          {recentCalls.map((call, index) => (
            <Box
              key={index}
              sx={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr 1fr 1fr',
                gap: 2,
                p: 2,
                alignItems: 'center',
                '&:hover': { backgroundColor: '#f9f9f9' },
                borderRadius: '8px'
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {call.dateTime}
              </Typography>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {call.id}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {call.caller}
                </Typography>
              </Box>
              <Typography variant="body2">
                {call.primaryTopic}
              </Typography>
              <Chip
                label={call.riskLevel}
                size="small"
                sx={{
                  backgroundColor: riskColors[call.riskLevel as keyof typeof riskColors],
                  color: 'white',
                  fontWeight: 500,
                  width: 'fit-content'
                }}
              />
              <Chip
                label={call.outcome}
                size="small"
                sx={{
                  backgroundColor: outcomeColors[call.outcome as keyof typeof outcomeColors],
                  color: 'white',
                  fontWeight: 500,
                  width: 'fit-content'
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {call.qualityScore}
              </Typography>
              <Button
                variant="text"
                size="small"
                sx={{ 
                  color: '#008080',
                  fontWeight: 500,
                  width: 'fit-content'
                }}
              >
                View
              </Button>
            </Box>
          ))}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Page 1-10 of 50 results
          </Typography>
          <Button
            variant="text"
            sx={{ color: '#008080', fontWeight: 500 }}
          >
            View All Call History
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};