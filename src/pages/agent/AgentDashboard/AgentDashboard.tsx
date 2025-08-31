// src/pages/agent/AgentDashboard/AgentDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
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
  Star,
} from '@mui/icons-material';
import { MetricCard } from '../../../components/cards/MetricCard/MetricCard';
import { DataTable } from '../../../components/common/DataTable/DataTable';
import { ActionButtonsGroup } from '../../../components/common/ActionButtonsGroup/ActionButtonsGroup';

import { useAuth } from '../../../contexts/AuthContext';
import { useCallData } from '../../../hooks/useCallData';
import StatusChip from '../../../components/common/StatusChip/StatusChip';

const statusColors = {
  'Available': '#4caf50',
  'Busy': '#ff9800', 
  'Break': '#607d8b'
};

// Custom chip component for Risk Level (with dot)
const RiskChip: React.FC<{ riskLevel: 'Low' | 'Medium' | 'High' }> = ({ riskLevel }) => {
  const riskStyles = {
    'Low': {
      backgroundColor: 'rgba(74, 222, 128, 0.1)',
      borderColor: '#22c55e',
      color: '#15803d',
      dotColor: '#22c55e'
    },
    'Medium': {
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: '#f59e0b',
      color: '#d97706',
      dotColor: '#f59e0b'
    },
    'High': {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: '#ef4444',
      color: '#dc2626',
      dotColor: '#ef4444'
    }
  };

  const currentStyle = riskStyles[riskLevel];

  return (
    <Chip 
      label={riskLevel}
      sx={{ 
        backgroundColor: currentStyle.backgroundColor,
        color: currentStyle.color,
        border: `2px solid ${currentStyle.borderColor}`,
        fontWeight: 700,
        fontSize: '0.75rem',
        width: 'fit-content',
        '& .MuiChip-label': {
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 700,
          '&::before': {
            content: '""',
            width: '8px',
            height: '8px',
            backgroundColor: currentStyle.dotColor,
            borderRadius: '50%'
          }
        }
      }}
    />
  );
};

// Custom chip component for Outcome (without dot)
const OutcomeChip: React.FC<{ outcome: 'Advice Given' | 'Escalated' | 'Referred' }> = ({ outcome }) => {
  const outcomeStyles = {
    'Advice Given': {
      backgroundColor: 'rgba(74, 222, 128, 0.1)',
      borderColor: '#22c55e',
      color: '#15803d',
    },
    'Escalated': {
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: '#ef4444',
      color: '#dc2626',
    },
    'Referred': {
      backgroundColor: 'rgba(96, 125, 139, 0.1)',
      borderColor: '#607d8b',
      color: '#455a64',
    }
  };

  const currentStyle = outcomeStyles[outcome];

  return (
    <Chip 
      label={outcome}
      sx={{ 
        backgroundColor: currentStyle.backgroundColor,
        color: currentStyle.color,
        border: `2px solid ${currentStyle.borderColor}`,
        fontWeight: 700,
        fontSize: '0.75rem',
        width: 'fit-content'
      }}
    />
  );
};

// Helper function to format date and time
const formatDateTime = (dateTimeString: string) => {
  // Extract date and time parts from the string
  const parts = dateTimeString.split(' ');
  const date = `${parts[1]} ${parts[2]} ${parts[3]}`;
  const time = `${parts[4]} ${parts[5]} - ${parts[7]} ${parts[8]}`;
  
  return { date, time };
};

export const AgentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Add this hook
  
  const [status, setStatus] = useState<'Available' | 'Busy' | 'Break'>('Available');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [languageFilter, setLanguageFilter] = useState('All languages');
  const [showIncomingCall, setShowIncomingCall] = useState(false);

  // Mock data for recent call activity
  const recentCalls = [
    {
      id: '#2031',
      dateTime: 'Mon, July 13, 2025 10:43 AM - 10:51 AM',
      caller: 'English',
      primaryTopic: 'Anxiety Management',
      riskLevel: 'Medium' as const,
      outcome: 'Advice Given' as const,
      qualityScore: '78%'
    },
    {
      id: '#2089',
      dateTime: 'Mon, July 13, 2025 10:43 AM - 10:51 AM',
      caller: 'French',
      primaryTopic: 'Depression',
      riskLevel: 'High' as const,
      outcome: 'Escalated' as const,
      qualityScore: '78%'
    },
    {
      id: '#2031',
      dateTime: 'Tue, July 13, 2025 10:43 AM - 10:51 AM',
      caller: 'English',
      primaryTopic: 'Psychosis',
      riskLevel: 'Medium' as const,
      outcome: 'Advice Given' as const,
      qualityScore: '80%'
    },
    {
      id: '#2070',
      dateTime: 'Mon, July 13, 2025 10:43 AM - 10:51 AM',
      caller: 'English',
      primaryTopic: 'Psychosis',
      riskLevel: 'Low' as const,
      outcome: 'Referred' as const,
      qualityScore: '78%'
    },
    {
      id: '#2031',
      dateTime: 'Mon, July 13, 2025 10:43 AM - 10:51 AM',
      caller: 'Spanish',
      primaryTopic: 'Depression',
      riskLevel: 'Medium' as const,
      outcome: 'Advice Given' as const,
      qualityScore: '78%'
    }
  ];

  const handleStatusChange = (newStatus: 'Available' | 'Busy' | 'Break') => {
    setStatus(newStatus);
  };

  // Simulate incoming call for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIncomingCall(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnswer = () => {
    setShowIncomingCall(false);
    // Navigate to live call interface
    navigate('/live-call');
  };

  const handleDecline = () => {
    setShowIncomingCall(false);
    // Handle decline logic here
  };

  const handleVoicemail = () => {
    setShowIncomingCall(false);
    // Handle voicemail logic here
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: '100vh', position: 'relative' }}>
      {/* Incoming Call Popup */}
     {/* Incoming Call Popup */}
   {/* Incoming Call Popup */}
   {showIncomingCall && (
        <Box
          sx={{
            position: 'fixed',
            top: 120,
            right: 20,
            width: 320,
            height: 320,
            backgroundColor: 'linear-gradient(to bottom, #CCE5E5, #F2FAFA)',
            background: 'linear-gradient(to bottom, #CCE5E5, #F2FAFA)',
            borderRadius: '18px',
            p: 3,
            pt: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            zIndex: 1000,
          }}
        >
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                color: '#2c3e50',
                mb: 1,
                fontSize: '1.5rem'
              }}
            >
              Call #2031
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mb: 3 }}>
              <Box 
                sx={{ 
                  width: 10, 
                  height: 10, 
                  backgroundColor: '#22c55e', 
                  borderRadius: '50%' 
                }} 
              />
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#5a6c7d',
                  fontWeight: 500,
                  fontSize: '1rem'
                }}
              >
                Incoming...
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              justifyContent: 'center',
              mb: 3,
            }}>
              <Avatar 
                sx={{ 
                  backgroundColor: '#7fa8a3', 
                  color: 'white',
                  width: 50, 
                  height: 50,
                }}
              >
                <Person sx={{ fontSize: '1.5rem' }} />
              </Avatar>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#2c3e50',
                  fontSize: '1.4rem'
                }}
              >
                039 701 234 567
              </Typography>
            </Box>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            width: '100%',
            justifyContent: 'space-between',
            px: 1,
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              width: '100%',
              justifyContent: 'space-between',
              px: 1
            }}>
              <Button
                onClick={handleVoicemail}
                sx={{
                  width: 70,
                  height: 50,
                  backgroundColor: '#e8eaed',
                  color: '#5f6368',
                  borderRadius: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 'unset',
                  '&:hover': {
                    backgroundColor: '#dadce0'
                  }
                }}
              >
                <Phone sx={{ fontSize: 24, transform: 'rotate(15deg)' }} />
              </Button>

              <Button
                onClick={handleDecline}
                sx={{
                  width: 70,
                  height: 50,
                  backgroundColor: '#ea4335',
                  color: 'white',
                  borderRadius: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 'unset',
                  '&:hover': {
                    backgroundColor: '#d33b2c'
                  }
                }}
              >
                <CallEnd sx={{ fontSize: 24 }} />
              </Button>

              <Button
                onClick={handleAnswer}
                sx={{
                  width: 70,
                  height: 50,
                  backgroundColor: '#34a853',
                  color: 'white',
                  borderRadius: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 'unset',
                  '&:hover': {
                    backgroundColor: '#2d8f47'
                  }
                }}
              >
                <Call sx={{ fontSize: 24 }} />
              </Button>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              width: '100%',
              justifyContent: 'space-between',
              px: 1,
              mt: 1
            }}>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem', color: '#2c3e50', width: 70, textAlign: 'center' }}>
                Voicemail
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem', color: '#2c3e50', width: 70, textAlign: 'center' }}>
                Decline
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem', color: '#2c3e50', width: 70, textAlign: 'center' }}>
                Answer
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#212121' }}>
              Hey, James
            </Typography>
            <StatusChip status={status} />
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex',
              border: '2px solid #e0e0e0',
              borderRadius: '25px',
              overflow: 'hidden',
              backgroundColor: 'white'
            }}
          >
            {(['Available', 'Busy', 'Break'] as const).map((statusOption, index) => (
              <Button
                key={statusOption}
                onClick={() => handleStatusChange(statusOption)}
                sx={{
                  px: 3,
                  py: 1,
                  backgroundColor: status === statusOption ? 'white' : 'transparent',
                  color: status === statusOption ? '#000' : '#666',
                  fontWeight: status === statusOption ? 600 : 400,
                  borderRadius: 0,
                  border: 'none',
                  borderRight: index < 2 ? '1px solid #e0e0e0' : 'none',
                  textTransform: 'none',
                  minWidth: 80,
                  '&:hover': {
                    backgroundColor: status === statusOption ? 'white' : '#f5f5f5',
                  },
                  '&::before': status === statusOption ? {
                    content: '"✓"',
                    marginRight: '8px',
                    fontSize: '14px',
                    fontWeight: 600
                  } : {}
                }}
              >
                {statusOption}
              </Button>
            ))}
          </Box>
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
                  Make call
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  Take outgoing helpline calls
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
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
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
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
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
          gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr 1fr 1.5fr',
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
          {recentCalls.map((call, index) => {
            const { date, time } = formatDateTime(call.dateTime);
            return (
              <Box
                key={index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr 1fr 1.5fr',
                  gap: 2,
                  p: 2,
                  alignItems: 'center',
                  '&:hover': { backgroundColor: '#f9f9f9' },
                  borderRadius: '8px'
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {date}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {time}
                  </Typography>
                </Box>
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
                <RiskChip riskLevel={call.riskLevel} />
                <OutcomeChip outcome={call.outcome} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Star sx={{ color: '#ffd700', fontSize: 16 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {call.qualityScore}
                  </Typography>
                </Box>
                <ActionButtonsGroup
                  onPlay={() => console.log('Play call:', call.id)}
                  onView={() => console.log('View call:', call.id)}
                />
              </Box>
            );
          })}
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