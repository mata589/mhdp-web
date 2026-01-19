// src/pages/agent/CallHistory/CallHistory.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Star,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { ActionButtonsGroup } from '../../../components/common/ActionButtonsGroup/ActionButtonsGroup';
import { CallDetailsPage } from '../../../components/common/CallDetailsPage';
import { CallRecordingPlayer } from '../../../components/common/CallRecordingPlayer';

import type { CallHistoryItem, RiskLevel, CallOutcome } from '../../../types/agent.types';
import agentApi from '../../../services/api/agentApi';

// Shimmer Loading Components
const ShimmerTableRow: React.FC = () => (
  <TableRow sx={{ borderBottom: '1px solid #f3f4f6' }}>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="text" width="80%" height={20} />
      <Skeleton variant="text" width="60%" height={16} sx={{ mt: 0.5 }} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="text" width="70%" height={20} />
      <Skeleton variant="text" width="50%" height={16} sx={{ mt: 0.5 }} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="text" width="85%" height={20} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="rectangular" width={90} height={24} sx={{ borderRadius: 1 }} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Skeleton variant="circular" width={14} height={14} />
        <Skeleton variant="text" width={40} height={20} />
      </Box>
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
      </Box>
    </TableCell>
  </TableRow>
);

const getRiskLevelColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'low':
      return { dotColor: '#16a34a', textColor: '#16a34a', label: 'Low' };
    case 'medium':
      return { dotColor: '#d97706', textColor: '#d97706', label: 'Medium' };
    case 'high':
      return { dotColor: '#dc2626', textColor: '#dc2626', label: 'High' };
    default:
      return { dotColor: '#6b7280', textColor: '#6b7280', label: 'Unknown' };
  }
};

const getRiskChipProps = (riskLevel: string) => {
  const riskStyle = getRiskLevelColor(riskLevel);
  let bgcolor, color, border;
  switch (riskLevel) {
    case 'low':
      bgcolor = '#f0fdf4';
      color = '#16a34a';
      border = '1px solid #bbf7d0';
      break;
    case 'medium':
      bgcolor = '#fef3c7';
      color = '#d97706';
      border = '1px solid #fcd34d';
      break;
    case 'high':
      bgcolor = '#fef2f2';
      color = '#dc2626';
      border = '1px solid #fecaca';
      break;
    default:
      bgcolor = '#f9fafb';
      color = '#6b7280';
      border = '1px solid #e5e7eb';
  }
  return {
    sx: {
      bgcolor,
      color,
      border,
      height: 24,
      '& .MuiChip-label': {
        fontWeight: 500,
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        '&::before': {
          content: '""',
          width: 6,
          height: 6,
          bgcolor: riskStyle.dotColor,
          borderRadius: '50%',
          mr: 0.5,
        }
      }
    }
  };
};

const getOutcomeChipProps = (outcome: string) => {
  switch (outcome) {
    case 'resolved':
      return {
        sx: {
          bgcolor: '#f0fdf4',
          color: '#16a34a',
          border: '1px solid #bbf7d0',
          '& .MuiChip-label': { fontWeight: 500 }
        }
      };
    case 'escalated':
      return {
        sx: {
          bgcolor: '#fef2f2',
          color: '#dc2626',
          border: '1px solid #fecaca',
          '& .MuiChip-label': { fontWeight: 500 }
        }
      };
    case 'unresolved':
      return {
        sx: {
          bgcolor: '#eff6ff',
          color: '#2563eb',
          border: '1px solid #bfdbfe',
          '& .MuiChip-label': { fontWeight: 500 }
        }
      };
    default:
      return {
        sx: {
          bgcolor: '#f9fafb',
          color: '#6b7280',
          border: '1px solid #e5e7eb',
          '& .MuiChip-label': { fontWeight: 500 }
        }
      };
  }
};

const formatDateTime = (startTime: string, endTime: string) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const timeOptions: Intl.DateTimeFormatOptions = { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  
  const datePart = start.toLocaleDateString('en-US', dateOptions);
  const startTimePart = start.toLocaleTimeString('en-US', timeOptions);
  const endTimePart = end.toLocaleTimeString('en-US', timeOptions);
  
  return `${datePart}\n${startTimePart} - ${endTimePart}`;
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const CallHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'resolved' | 'unresolved' | 'escalated' | 'transferred'>('all');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [playingCallId, setPlayingCallId] = useState<string | null>(null);
  const [calls, setCalls] = useState<CallHistoryItem[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const itemsPerPage = 10;

  // Fetch call history data
  useEffect(() => {
    const fetchCallHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const offset = (currentPage - 1) * itemsPerPage;
        const response = await agentApi.getCallHistory(
          itemsPerPage,
          offset,
          searchTerm || undefined,
          undefined, // startDate
          undefined, // endDate
          riskFilter !== 'all' ? riskFilter : undefined,
          statusFilter !== 'all' ? statusFilter as 'resolved' | 'unresolved' | 'escalated' | 'transferred' : undefined
        );
        
        setCalls(response.results);
        setTotalResults(response.total_results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch call history');
        console.error('Error fetching call history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCallHistory();
  }, [currentPage, searchTerm, riskFilter, statusFilter]);

  // If a call is selected, show the call details page
  if (selectedCallId) {
    return (
      <CallDetailsPage
        callId={selectedCallId}
        onBack={() => setSelectedCallId(null)}
      />
    );
  }

  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalResults);
  const startItem = startIndex + 1;

  const handleViewCall = (callId: string) => {
    setSelectedCallId(callId);
  };

  const handlePlayCall = (callId: string) => {
    setPlayingCallId(callId);
  };

  const handleClosePlayer = () => {
    setPlayingCallId(null);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
  };

  // Find the call being played
  const playingCall = calls.find(call => call.call_id === playingCallId);

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Call Recording Player Popup */}
      {playingCallId && playingCall && (
        <CallRecordingPlayer
          callId={playingCallId}
          duration={`0:00 / ${formatDuration(playingCall.duration_seconds)}`}
          recordingUrl={playingCall.audio_url}
          isPopup={true}
          open={true}
          onClose={handleClosePlayer}
        />
      )}
      
      {/* Header */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
          Call history
        </Typography>
      </Box>
      
      {/* Search and Filters - Always visible */}
      <Box sx={{
        mb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: { xs: 'stretch', sm: 'center' }
      }}>
        <TextField
          placeholder="Search by caller ID or topic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          disabled={loading}
          sx={{
            flex: { xs: '1 1 100%', sm: '1 1 auto' },
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              height: 40,
              fontSize: '14px',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl sx={{ 
          minWidth: { xs: '100%', sm: 120 },
          flex: { xs: '1 1 100%', sm: '0 0 auto' }
        }}>
          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as 'all' | 'resolved' | 'unresolved' | 'escalated' | 'transferred');
              setCurrentPage(1);
            }}
            disabled={loading}
            displayEmpty
            sx={{
              bgcolor: 'white',
              height: 40,
              fontSize: '14px',
              '& .MuiSelect-select': {
                py: 1,
              },
            }}
          >
            <MenuItem value="all">All status</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="escalated">Escalated</MenuItem>
            <MenuItem value="unresolved">Unresolved</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl sx={{ 
          minWidth: { xs: '100%', sm: 140 },
          flex: { xs: '1 1 100%', sm: '0 0 auto' }
        }}>
          <Select
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value as RiskLevel | 'all');
              setCurrentPage(1);
            }}
            disabled={loading}
            displayEmpty
            sx={{
              bgcolor: 'white',
              height: 40,
              fontSize: '14px',
              '& .MuiSelect-select': {
                py: 1,
              },
            }}
          >
            <MenuItem value="all">All risk levels</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        
        <Button
          startIcon={<FilterListIcon />}
          disabled={loading}
          sx={{
            bgcolor: 'white',
            color: '#6b7280',
            border: '1px solid #d1d5db',
            height: 40,
            fontSize: '14px',
            textTransform: 'none',
            flex: { xs: '1 1 100%', sm: '0 0 auto' },
            minWidth: { xs: '100%', sm: 'auto' },
            '&:hover': {
              bgcolor: '#f9fafb',
            },
          }}
        >
          More Filters
        </Button>
      </Box>
      
      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {/* Loading State or Content */}
      {loading ? (
        <>
          {/* Shimmer Table */}
          <Paper sx={{ overflow: 'hidden', borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9fafb' }}>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 120
                    }}>
                      Date & Time
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 100
                    }}>
                      Caller ID
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 100
                    }}>
                      Primary Topic
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 100
                    }}>
                      Risk level
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 100
                    }}>
                      Outcome
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 100
                    }}>
                      Quality Score
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 80
                    }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...Array(10)].map((_, index) => (
                    <ShimmerTableRow key={index} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Shimmer Pagination */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Skeleton variant="text" width={180} height={20} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
              <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
            </Box>
          </Box>
        </>
      ) : (
        <>
          {/* Call History Table */}
          <Paper sx={{ overflow: 'hidden', borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9fafb' }}>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 120
                    }}>
                      Date & Time
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 100
                    }}>
                      Caller ID
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 100
                    }}>
                      Primary Topic
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 100
                    }}>
                      Risk level
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 100
                    }}>
                      Outcome
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 100
                    }}>
                      Quality Score
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 80
                    }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calls.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          No call history found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    calls.map((call) => {
                      const riskStyle = getRiskLevelColor(call.risk_level);
                      const outcomeProps = getOutcomeChipProps(call.outcome);
                      return (
                        <TableRow
                          key={call.call_id}
                          sx={{
                            '&:hover': { bgcolor: '#f9fafb' },
                            borderBottom: '1px solid #f3f4f6',
                          }}
                        >
                          <TableCell sx={{ py: 2, fontSize: { xs: '12px', sm: '14px' } }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#111827',
                                whiteSpace: 'pre-line',
                                lineHeight: 1.4
                              }}
                            >
                              {formatDateTime(call.call_start_time, call.call_end_time)}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2, fontSize: { xs: '12px', sm: '14px' } }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#111827',
                                whiteSpace: 'pre-line',
                                lineHeight: 1.4
                              }}
                            >
                              {call.caller_id}
                              {call.language && `\n${call.language}`}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2, fontSize: { xs: '12px', sm: '14px' } }}>
                            <Typography variant="body2" sx={{ color: '#111827' }}>
                              {call.primary_topic || 'N/A'}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Chip
                              label={riskStyle.label}
                              size="small"
                              variant="outlined"
                              {...getRiskChipProps(call.risk_level)}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Chip
                              label={call.outcome.charAt(0).toUpperCase() + call.outcome.slice(1)}
                              size="small"
                              variant="outlined"
                              {...outcomeProps}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Star sx={{ fontSize: 14, color: '#fbbf24' }} />
                              <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '14px' }, color: '#111827' }}>
                                {call.quality_score !== null ? `${call.quality_score}%` : 'N/A'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <ActionButtonsGroup
                              onPlay={() => handlePlayCall(call.call_id)}
                              onView={() => handleViewCall(call.call_id)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          
          {/* Pagination */}
          {totalResults > 0 && (
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '14px' }}>
                Page {startItem}-{endIndex} of {totalResults} results
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  sx={{
                    color: '#6b7280',
                    fontSize: '14px',
                    textTransform: 'none',
                    minWidth: 'auto',
                    '&:disabled': {
                      color: '#d1d5db',
                    },
                  }}
                >
                  ‹ Previous
                </Button>
                <Button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  sx={{
                    color: '#6b7280',
                    fontSize: '14px',
                    textTransform: 'none',
                    minWidth: 'auto',
                    '&:disabled': {
                      color: '#d1d5db',
                    },
                  }}
                >
                  Next ›
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};