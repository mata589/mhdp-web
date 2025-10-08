import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Chip,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function CallHistoryTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Determine which tab is active based on the current path
  const getActiveTab = () => {
    if (location.pathname === '/supervisor/CallHistoryTab') {
      return 1;
    }
    return 0; // Default to Performance metrics tab
  };

  const callHistory = [
    {
      date: 'Mon, July 13, 2025',
      time: '10:43 AM - 10:51 AM',
      callerId: '#2031',
      language: 'English',
      primaryTopic: 'Anxiety Management',
      riskLevel: 'Medium',
      riskColor: '#F59E0B',
      outcome: 'Advice Given',
      outcomeColor: '#10B981',
      qualityScore: '78%',
    },
    {
      date: 'Mon, July 13, 2025',
      time: '10:43 AM - 10:51 AM',
      callerId: '#2089',
      language: 'English',
      primaryTopic: 'Depression',
      riskLevel: 'High',
      riskColor: '#DC2626',
      outcome: 'Escalated',
      outcomeColor: '#DC2626',
      qualityScore: '76%',
    },
    {
      date: 'Tue, July 13, 2025',
      time: '10:43 AM - 10:51 AM',
      callerId: '#2031',
      language: 'Luganda',
      primaryTopic: 'Psychosis',
      riskLevel: 'Medium',
      riskColor: '#F59E0B',
      outcome: 'Advice Given',
      outcomeColor: '#10B981',
      qualityScore: '80%',
    },
    {
      date: 'Mon, July 13, 2025',
      time: '10:43 AM - 10:51 AM',
      callerId: '#2070',
      language: 'English',
      primaryTopic: 'Depression',
      riskLevel: 'Low',
      riskColor: '#10B981',
      outcome: 'Referred',
      outcomeColor: '#3B82F6',
      qualityScore: '78%',
    },
    {
      date: 'Mon, July 13, 2025',
      time: '10:43 AM - 10:51 AM',
      callerId: '#2031',
      language: 'Luganda',
      primaryTopic: 'Psychosis',
      riskLevel: 'Medium',
      riskColor: '#F59E0B',
      outcome: 'Advice Given',
      outcomeColor: '#10B981',
      qualityScore: '78%',
    },
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
      <Card sx={{ mb: 3, boxShadow: 'none', border: '1px solid #E5E7EB', bgcolor: '#F2FAFA' }}>
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
          value={getActiveTab()}
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

      {/* Recent Call Activity Section */}
      <Card sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#111827', mb: 0.5 }}>
              Recent call activity
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#9CA3AF' }}>
              James' most recent interactions with complete call details
            </Typography>
          </Box>

          {/* Search and Filter */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <TextField
              placeholder="Search by caller ID, agent or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{
                width: '400px',
                '& .MuiOutlinedInput-root': {
                  fontSize: '14px',
                  bgcolor: 'white',
                  '& fieldset': {
                    borderColor: '#E5E7EB',
                  },
                  '&:hover fieldset': {
                    borderColor: '#D1D5DB',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4682B4',
                    borderWidth: '1px',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="#9CA3AF" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<SlidersHorizontal size={16} />}
              sx={{
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                borderColor: '#E5E7EB',
                '&:hover': {
                  borderColor: '#D1D5DB',
                  bgcolor: '#F9FAFB',
                },
              }}
            >
              Filters
            </Button>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                  <TableCell sx={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>
                    Date & Time
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>
                    Caller ID
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>
                    Primary Topic
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>
                    Risk level
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>
                    Outcome
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>
                    Quality Score
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {callHistory.map((call, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:hover': {
                        bgcolor: '#F9FAFB',
                      },
                      borderBottom: '1px solid #F3F4F6',
                    }}
                  >
                    <TableCell>
                      <Typography sx={{ fontSize: '13px', color: '#111827', fontWeight: 500 }}>
                        {call.date}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>
                        {call.time}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '13px', color: '#111827', fontWeight: 600 }}>
                        {call.callerId}
                      </Typography>
                      <Typography sx={{ fontSize: '12px', color: '#9CA3AF' }}>
                        {call.language}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '13px', color: '#111827' }}>
                        {call.primaryTopic}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={call.riskLevel}
                        size="small"
                        sx={{
                          bgcolor: call.riskColor + '20',
                          color: call.riskColor,
                          fontSize: '12px',
                          fontWeight: 600,
                          height: '24px',
                          '& .MuiChip-label': {
                            px: 1.5,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={call.outcome}
                        size="small"
                        sx={{
                          bgcolor: call.outcomeColor + '20',
                          color: call.outcomeColor,
                          fontSize: '12px',
                          fontWeight: 600,
                          height: '24px',
                          '& .MuiChip-label': {
                            px: 1.5,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '13px', color: '#111827', fontWeight: 500 }}>
                        {call.qualityScore}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        startIcon={<Eye size={16} />}
                        sx={{
                          textTransform: 'none',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#00897b',
                          '&:hover': {
                            bgcolor: '#00897b10',
                          },
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
              pt: 3,
              borderTop: '1px solid #F3F4F6',
            }}
          >
            <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>
              Page 1-10 of 501 results
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                sx={{
                  minWidth: 'auto',
                  px: 1.5,
                  py: 0.75,
                  borderColor: '#E5E7EB',
                  color: '#6B7280',
                  '&:hover': {
                    borderColor: '#D1D5DB',
                    bgcolor: '#F9FAFB',
                  },
                }}
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="outlined"
                sx={{
                  minWidth: 'auto',
                  px: 1.5,
                  py: 0.75,
                  borderColor: '#E5E7EB',
                  color: '#6B7280',
                  '&:hover': {
                    borderColor: '#D1D5DB',
                    bgcolor: '#F9FAFB',
                  },
                }}
              >
                Next
                <ChevronRight size={18} />
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}