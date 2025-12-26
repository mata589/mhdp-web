// src/pages/agent/MissedCallsPage/MissedCallsPage.tsx
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
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as ViewIcon,
  Phone as CallBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import type { MissedCall, RiskLevel, MissedCallStatus } from '../../../types/agent.types';
import agentApi from '../../../services/api/agentApi';

const getRiskLevelColor = (riskLevel: RiskLevel) => {
  switch (riskLevel) {
    case 'low':
      return { dotColor: '#16a34a', textColor: '#16a34a', label: 'Low' };
    case 'medium':
      return { dotColor: '#d97706', textColor: '#d97706', label: 'Medium' };
    case 'high':
      return { dotColor: '#dc2626', textColor: '#dc2626', label: 'High' };
    case 'critical':
      return { dotColor: '#dc2626', textColor: '#dc2626', label: 'Critical' };
    default:
      return { dotColor: '#6b7280', textColor: '#6b7280', label: 'Unknown' };
  }
};

const getRiskChipProps = (riskLevel: RiskLevel) => {
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
    case 'critical':
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

const getStatusChipProps = (status: string) => {
  switch (status) {
    case 'returned':
      return {
        sx: {
          bgcolor: '#f0fdf4',
          color: '#16a34a',
          border: '1px solid #bbf7d0',
          '& .MuiChip-label': { fontWeight: 500 }
        }
      };
    case 'missed':
      return {
        sx: {
          bgcolor: '#fef2f2',
          color: '#dc2626',
          border: '1px solid #fecaca',
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

const calculateDuration = (startTime: string, endTime: string) => {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const durationMs = end - start;
  const seconds = Math.floor(durationMs / 1000);
  return seconds;
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formatStatusLabel = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const MissedCallsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<MissedCallStatus | 'all'>('all');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [missedCalls, setMissedCalls] = useState<MissedCall[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const itemsPerPage = 10;

  // Fetch missed calls data
  useEffect(() => {
    const fetchMissedCalls = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const offset = (currentPage - 1) * itemsPerPage;
        const response = await agentApi.getMissedCalls(
          itemsPerPage,
          offset,
          searchTerm || undefined,
          undefined, // startDate
          undefined, // endDate
          statusFilter !== 'all' ? statusFilter : undefined,
          riskFilter !== 'all' && riskFilter !== 'critical' ? riskFilter : undefined
        );
        
        setMissedCalls(response.results);
        setTotalResults(response.total_results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch missed calls');
        console.error('Error fetching missed calls:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMissedCalls();
  }, [currentPage, searchTerm, riskFilter, statusFilter]);

  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalResults);
  const startItem = startIndex + 1;

  const handleView = (callId: string) => {
    navigate(`/agent/call-review/${callId}`);
  };

  const handleCallBack = (callId: string) => {
    console.log('Calling back:', callId);
    // Implement call back functionality here
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
          Missed Calls
        </Typography>
      </Box>
      
      {/* Search and Filters */}
      <Box sx={{
        mb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: { xs: 'stretch', sm: 'center' }
      }}>
        <TextField
          placeholder="Search by caller ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
              setStatusFilter(e.target.value as MissedCallStatus | 'all');
              setCurrentPage(1);
            }}
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
            <MenuItem value="missed">Missed</MenuItem>
            <MenuItem value="returned">Returned</MenuItem>
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
      
      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Missed Calls Table */}
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
                      minWidth: 80
                    }}>
                      Duration
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
                      Status
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600, 
                      color: '#374151', 
                      fontSize: { xs: '12px', sm: '14px' }, 
                      py: 2,
                      minWidth: 150
                    }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {missedCalls.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          No missed calls found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    missedCalls.map((call) => {
                      const riskStyle = getRiskLevelColor(call.risk_level);
                      const statusProps = getStatusChipProps(call.status);
                      const duration = calculateDuration(call.last_call_start_time, call.last_call_end_time);
                      
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
                              {formatDateTime(call.last_call_start_time, call.last_call_end_time)}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2, fontSize: { xs: '12px', sm: '14px' } }}>
                            <Typography variant="body2" sx={{ color: '#111827', fontWeight: 500 }}>
                              {call.caller_id}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2, fontSize: { xs: '12px', sm: '14px' } }}>
                            <Typography variant="body2" sx={{ color: '#111827' }}>
                              {formatDuration(duration)}
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
                              label={formatStatusLabel(call.status)}
                              size="small"
                              variant="outlined"
                              {...statusProps}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<ViewIcon />}
                                onClick={() => handleView(call.call_id)}
                                sx={{
                                  borderColor: '#0d9488',
                                  color: '#0d9488',
                                  '&:hover': {
                                    bgcolor: '#f0fdfa',
                                    borderColor: '#0d9488'
                                  },
                                  fontSize: '12px',
                                  textTransform: 'none',
                                }}
                              >
                                View
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<CallBackIcon />}
                                onClick={() => handleCallBack(call.call_id)}
                                sx={{
                                  bgcolor: '#0d9488',
                                  '&:hover': { bgcolor: '#0f766e' },
                                  fontSize: '12px',
                                  textTransform: 'none',
                                }}
                              >
                                Call back
                              </Button>
                            </Box>
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