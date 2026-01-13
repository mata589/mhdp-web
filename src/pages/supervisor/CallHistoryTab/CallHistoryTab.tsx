import React, { useState, useEffect } from 'react';
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
  Skeleton,
  Alert,
} from '@mui/material';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import supervisorApi from '../../../services/api/supervisorApi';
import type { StaffDetailsBasic, CallHistoryResponse, CallHistoryItem } from '../../../types/supervisor.types';

// Skeleton Loaders
const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton width="80%" height={20} sx={{ mb: 0.5 }} />
      <Skeleton width="60%" height={16} />
    </TableCell>
    <TableCell>
      <Skeleton width="60%" height={20} sx={{ mb: 0.5 }} />
      <Skeleton width="40%" height={16} />
    </TableCell>
    <TableCell>
      <Skeleton width="70%" height={20} />
    </TableCell>
    <TableCell>
      <Skeleton width={80} height={24} sx={{ borderRadius: '12px' }} />
    </TableCell>
    <TableCell>
      <Skeleton width={80} height={24} sx={{ borderRadius: '12px' }} />
    </TableCell>
    <TableCell>
      <Skeleton width="50%" height={20} />
    </TableCell>
    <TableCell>
      <Skeleton width={80} height={32} sx={{ borderRadius: '6px' }} />
    </TableCell>
  </TableRow>
);

export default function CallHistoryTab() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams<{ userId: string }>();

  const [searchQuery, setSearchQuery] = useState('');
  const [callHistory, setCallHistory] = useState<CallHistoryResponse | null>(null);
  const [staffBasic, setStaffBasic] = useState<StaffDetailsBasic | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch staff basic info
  useEffect(() => {
    if (!userId) {
      setError('No staff member selected');
      setLoadingStaff(false);
      return;
    }

    const fetchStaffBasic = async () => {
      try {
        setLoadingStaff(true);
        const basic = await supervisorApi.getStaffDetailsBasic(userId);
        setStaffBasic(basic);
      } catch (err) {
        console.error('Error fetching staff basic info:', err);
      } finally {
        setLoadingStaff(false);
      }
    };

    fetchStaffBasic();
  }, [userId]);

  // Fetch call history
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCallHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const offset = (currentPage - 1) * limit;
        const response = await supervisorApi.getStaffCallHistory(userId, limit, offset);
        setCallHistory(response);
      } catch (err) {
        console.error('Error fetching call history:', err);
        setError(err instanceof Error ? err.message : 'Failed to load call history');
      } finally {
        setLoading(false);
      }
    };

    fetchCallHistory();
  }, [userId, currentPage]);

  // Helper functions
  const getRiskLevelColor = (level: string): string => {
    const colors: { [key: string]: string } = {
      low: '#10B981',
      medium: '#F59E0B',
      high: '#DC2626',
    };
    return colors[level.toLowerCase()] || '#6B7280';
  };

  const getOutcomeColor = (outcome: string): string => {
    const colors: { [key: string]: string } = {
      resolved: '#10B981',
      'advice given': '#10B981',
      escalated: '#DC2626',
      referred: '#3B82F6',
      unresolved: '#F59E0B',
    };
    return colors[outcome.toLowerCase()] || '#6B7280';
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    };
  };

  const formatCallDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const startFormatted = start.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const endFormatted = end.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return `${startFormatted} - ${endFormatted}`;
  };

  const totalPages = callHistory ? Math.ceil(callHistory.total_results / limit) : 1;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', p: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowLeft size={18} />}
          onClick={() => navigate('/supervisor/staff-performance')}
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
      {loadingStaff ? (
        <Card sx={{ mb: 3, boxShadow: 'none', border: '1px solid #E5E7EB', bgcolor: '#F2FAFA' }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' }, gap: { xs: 2, sm: 3 } }}>
              {[1, 2, 3, 4].map((i) => (
                <Box key={i}>
                  <Skeleton width="60%" height={16} sx={{ mb: 0.5 }} />
                  <Skeleton width="80%" height={20} />
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Skeleton width="40%" height={16} sx={{ mb: 0.5 }} />
              <Skeleton width={60} height={24} />
            </Box>
          </CardContent>
        </Card>
      ) : staffBasic ? (
        <Card sx={{ mb: 3, boxShadow: 'none', border: '1px solid #E5E7EB', bgcolor: '#F2FAFA' }}>
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
            <Box sx={{ mt: { xs: 1, sm: 2 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0, sm: 2 } }}>
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
          value={1}
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

      {/* Recent Call Activity Section */}
      <Card sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: { xs: '16px', sm: '18px' }, fontWeight: 600, color: '#111827', mb: 0.5 }}>
              Recent call activity
            </Typography>
            <Typography sx={{ fontSize: { xs: '12px', sm: '13px' }, color: '#9CA3AF' }}>
              {staffBasic?.full_name}'s most recent interactions with complete call details
            </Typography>
          </Box>

          {/* Search and Filter */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <TextField
              placeholder="Search by caller ID, agent or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{
                width: { xs: '100%', sm: '400px' },
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
                width: { xs: '100%', sm: 'auto' },
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
          <TableContainer sx={{ overflowX: { xs: 'auto', sm: 'visible' } }}>
            <Table sx={{ minWidth: { xs: 600, sm: 'auto' } }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                  <TableCell sx={{ fontSize: { xs: '11px', sm: '12px' }, fontWeight: 600, color: '#6B7280', p: { xs: 1, sm: 'inherit' } }}>
                    Date & Time
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '11px', sm: '12px' }, fontWeight: 600, color: '#6B7280', p: { xs: 1, sm: 'inherit' } }}>
                    Caller ID
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '11px', sm: '12px' }, fontWeight: 600, color: '#6B7280', p: { xs: 1, sm: 'inherit' } }}>
                    Primary Topic
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '11px', sm: '12px' }, fontWeight: 600, color: '#6B7280', p: { xs: 1, sm: 'inherit' } }}>
                    Risk level
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '11px', sm: '12px' }, fontWeight: 600, color: '#6B7280', p: { xs: 1, sm: 'inherit' } }}>
                    Outcome
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '11px', sm: '12px' }, fontWeight: 600, color: '#6B7280', p: { xs: 1, sm: 'inherit' } }}>
                    Quality Score
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '11px', sm: '12px' }, fontWeight: 600, color: '#6B7280', p: { xs: 1, sm: 'inherit' } }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <>
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                  </>
                ) : callHistory && callHistory.results.length > 0 ? (
                  callHistory.results
                    .filter(call => 
                      searchQuery === '' || 
                      call.caller_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (call.primary_topic && call.primary_topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
                      call.agent_name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((call) => {
                      const { date, time } = formatDateTime(call.call_start_time);
                      const duration = formatCallDuration(call.call_start_time, call.call_end_time);
                      
                      return (
                        <TableRow
                          key={call.call_id}
                          sx={{
                            '&:hover': {
                              bgcolor: '#F9FAFB',
                            },
                            borderBottom: '1px solid #F3F4F6',
                          }}
                        >
                          <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                            <Typography sx={{ fontSize: { xs: '12px', sm: '13px' }, color: '#111827', fontWeight: 500 }}>
                              {date}
                            </Typography>
                            <Typography sx={{ fontSize: { xs: '11px', sm: '12px' }, color: '#9CA3AF' }}>
                              {duration}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                            <Typography sx={{ fontSize: { xs: '12px', sm: '13px' }, color: '#111827', fontWeight: 600 }}>
                              {call.caller_id}
                            </Typography>
                            <Typography sx={{ fontSize: { xs: '11px', sm: '12px' }, color: '#9CA3AF' }}>
                              {call.language}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                            <Typography sx={{ fontSize: { xs: '12px', sm: '13px' }, color: '#111827' }}>
                              {call.primary_topic || 'N/A'}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                            <Chip
                              label={call.risk_level}
                              size="small"
                              sx={{
                                bgcolor: getRiskLevelColor(call.risk_level) + '20',
                                color: getRiskLevelColor(call.risk_level),
                                fontSize: { xs: '11px', sm: '12px' },
                                fontWeight: 600,
                                height: '24px',
                                textTransform: 'capitalize',
                                '& .MuiChip-label': {
                                  px: { xs: 1, sm: 1.5 },
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                            <Chip
                              label={call.outcome}
                              size="small"
                              sx={{
                                bgcolor: getOutcomeColor(call.outcome) + '20',
                                color: getOutcomeColor(call.outcome),
                                fontSize: { xs: '11px', sm: '12px' },
                                fontWeight: 600,
                                height: '24px',
                                textTransform: 'capitalize',
                                '& .MuiChip-label': {
                                  px: { xs: 1, sm: 1.5 },
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                            <Typography sx={{ fontSize: { xs: '12px', sm: '13px' }, color: '#111827', fontWeight: 500 }}>
                              {call.quality_score || 'N/A'}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                            <Button
                              startIcon={<Eye size={16} />}
                              onClick={() => navigate(`/supervisor/call-review/${call.call_id}`)}
                              sx={{
                                textTransform: 'none',
                                fontSize: { xs: '12px', sm: '13px' },
                                fontWeight: 500,
                                color: '#00897b',
                                minWidth: { xs: 'auto', sm: 'inherit' },
                                px: { xs: 1, sm: 2 },
                                '&:hover': {
                                  bgcolor: '#00897b10',
                                },
                              }}
                            >
                              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                View
                              </Box>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography sx={{ color: '#6B7280', fontSize: { xs: '13px', sm: '14px' } }}>
                        No call history found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
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
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Typography sx={{ fontSize: { xs: '13px', sm: '14px' }, color: '#6B7280' }}>
              Page {currentPage} of {totalPages} ({callHistory?.total_results || 0} results)
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
              <Button
                variant="outlined"
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || loading}
                sx={{
                  minWidth: 'auto',
                  px: { xs: 1, sm: 1.5 },
                  py: 0.75,
                  borderColor: '#E5E7EB',
                  color: '#6B7280',
                  flex: { xs: 1, sm: 'unset' },
                  '&:hover': {
                    borderColor: '#D1D5DB',
                    bgcolor: '#F9FAFB',
                  },
                  '&:disabled': {
                    borderColor: '#E5E7EB',
                    color: '#9CA3AF',
                  },
                }}
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="outlined"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || loading}
                sx={{
                  minWidth: 'auto',
                  px: { xs: 1, sm: 1.5 },
                  py: 0.75,
                  borderColor: '#E5E7EB',
                  color: '#6B7280',
                  flex: { xs: 1, sm: 'unset' },
                  '&:hover': {
                    borderColor: '#D1D5DB',
                    bgcolor: '#F9FAFB',
                  },
                  '&:disabled': {
                    borderColor: '#E5E7EB',
                    color: '#9CA3AF',
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