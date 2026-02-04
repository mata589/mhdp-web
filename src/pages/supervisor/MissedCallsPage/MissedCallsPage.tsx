// src/pages/supervisor/MissedCallsPage/MissedCallsPage.tsx
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
  FilterList as FilterListIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import type { MissedCall, MissedCallsResponse } from '../../../types/supervisor.types';
// Import supervisor API
import supervisorApi from '../../../services/api/supervisorApi';
import { DateRangeSelector } from '../../../components/common/DateRangeSelector/DateRangeSelector';
import { CallBackButton } from '../../../components/common/CallBackButton/CallBackButton';
import { CallPopup } from '../../../components/common/CallPopupProps/CallPopupProps';

// Type for risk level
type RiskLevel = "low" | "medium" | "high" | "critical";
type MissedCallStatus = "missed" | "returned" | "resolved";

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

const formatStatusLabel = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

// Parse date range string to start and end dates with datetime format
const parseDateRange = (dateRange: string): { startDate: string; endDate: string } | null => {
  if (!dateRange) return null;
  
  const parts = dateRange.split(' - ');
  if (parts.length !== 2) return null;
  
  const [start, end] = parts;
  
  // Convert MM/DD/YYYY to YYYY-MM-DDTHH:MM:SS format for API (datetime format)
  const parseDate = (dateStr: string, isEndDate: boolean = false): string | null => {
    try {
      const trimmed = dateStr.trim();
      const [month, day, year] = trimmed.split('/');
      
      if (!month || !day || !year) {
        console.error('Invalid date format:', dateStr);
        return null;
      }
      
      const paddedMonth = month.padStart(2, '0');
      const paddedDay = day.padStart(2, '0');
      
      // Validate date ranges
      const m = parseInt(month, 10);
      const d = parseInt(day, 10);
      const y = parseInt(year, 10);
      
      if (m < 1 || m > 12 || d < 1 || d > 31 || y < 2000 || y > 2100) {
        console.error('Date out of valid range:', dateStr);
        return null;
      }
      
      // Add time component: start of day for start_date, end of day for end_date
      const time = isEndDate ? 'T23:59:59' : 'T00:00:00';
      return `${year}-${paddedMonth}-${paddedDay}${time}`;
    } catch (error) {
      console.error('Error parsing date:', dateStr, error);
      return null;
    }
  };
  
  const startDate = parseDate(start, false);
  const endDate = parseDate(end, true);
  
  if (!startDate || !endDate) {
    return null;
  }
  
  return { startDate, endDate };
};

// Shimmer Loading Component
const TableRowSkeleton: React.FC = () => (
  <TableRow sx={{ borderBottom: '1px solid #f3f4f6' }}>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="text" width="80%" height={20} />
      <Skeleton variant="text" width="60%" height={20} sx={{ mt: 0.5 }} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="text" width="70%" height={20} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="text" width="60%" height={20} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="text" width="50%" height={20} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="rounded" width={80} height={24} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="rounded" width={80} height={24} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rounded" width={70} height={32} />
        <Skeleton variant="rounded" width={90} height={32} />
      </Box>
    </TableCell>
  </TableRow>
);

export const MissedCallsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState(''); // Empty initially - no default date
  const [statusFilter, setStatusFilter] = useState<MissedCallStatus | 'all'>('all');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');
  const [agentFilter, setAgentFilter] = useState<string>('all'); // Add agent filter for supervisor
  const [currentPage, setCurrentPage] = useState(1);
  const [missedCalls, setMissedCalls] = useState<MissedCall[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Call popup state
  const [showCallPopup, setShowCallPopup] = useState(false);
  const [activeCall, setActiveCall] = useState<{
    callId: string;
    phoneNumber: string;
    callerName?: string;
  } | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  
  const itemsPerPage = 10;

  // Fetch missed calls data using supervisor API
  useEffect(() => {
    const fetchMissedCalls = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const offset = (currentPage - 1) * itemsPerPage;
        
        // Parse date range for API only if dateRange is provided
        let dates = null;
        if (dateRange) {
          dates = parseDateRange(dateRange);
          
          if (!dates) {
            setError('Invalid date range format. Please select a valid date range.');
            setLoading(false);
            return;
          }
        }
        
        // Use supervisor API endpoint with options object
        const response = await supervisorApi.getMissedCalls({
          limit: itemsPerPage,
          offset: offset,
          search: searchTerm || undefined,
          start_date: dates?.startDate,
          end_date: dates?.endDate,
          status_filter: statusFilter !== 'all' ? statusFilter : undefined,
          risk_level: riskFilter !== 'all' && riskFilter !== 'critical' ? riskFilter : undefined,
        });
        
        setMissedCalls(response.results || []);
        setTotalResults(response.total_results || 0);
      } catch (err) {
        let errorMessage = 'Failed to fetch missed calls';
        
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'object' && err !== null) {
          const errObj = err as any;
          if (errObj.detail) {
            errorMessage = typeof errObj.detail === 'string' 
              ? errObj.detail 
              : JSON.stringify(errObj.detail);
          } else {
            errorMessage = JSON.stringify(err);
          }
        }
        
        setError(errorMessage);
        console.error('Error fetching missed calls:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMissedCalls();
  }, [currentPage, searchTerm, dateRange, riskFilter, statusFilter, agentFilter]);

  // Handle call duration timer
  useEffect(() => {
    if (isCallActive) {
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCallActive]);

  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalResults);
  const startItem = startIndex + 1;

  const handleView = (callId: string) => {
    navigate(`/supervisor/call-review/${callId}`);
  };

  const handleCallBack = (call: MissedCall) => {
    setActiveCall({
      callId: call.last_call_id,
      phoneNumber: call.caller_id,
    });
    setShowCallPopup(true);
    setCallDuration(0);
    setIsCallActive(false);
  };

  const handleCallConnect = () => {
    // Simulate call connecting - in real implementation, this would initiate the actual call
    setIsCallActive(true);
    console.log('Call connected to:', activeCall?.phoneNumber);
    
    // Navigate to live call interface after a short delay
    setTimeout(() => {
      navigate('/supervisor/live-call');
    }, 1000);
  };

  const handleEndCall = () => {
    setShowCallPopup(false);
    setIsCallActive(false);
    setCallDuration(0);
    setActiveCall(null);
  };

  const handleMinimize = () => {
    setShowCallPopup(false);
    // Keep the call active in the background
    // The popup can be reopened from a notification or status indicator
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleDateRangeChange = (newDateRange: string) => {
    setDateRange(newDateRange);
    setCurrentPage(1);
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Call Popup */}
      {activeCall && (
        <CallPopup
          callId={activeCall.callId}
          phoneNumber={activeCall.phoneNumber}
          callerName={activeCall.callerName}
          mode={isCallActive ? "active" : "outgoing"}
          duration={callDuration}
          open={showCallPopup}
          onEndCall={handleEndCall}
          onMinimize={handleMinimize}
        />
      )}

      {/* Header */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
          Missed Calls
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
          Monitor and review all missed calls across agents
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
        
        {/* Date Range Selector */}
        <DateRangeSelector
          value={dateRange}
          onChange={handleDateRangeChange}
          sx={{
            flex: { xs: '1 1 100%', sm: '0 0 auto' }
          }}
        />
        
        {/* Agent Filter - Supervisor specific */}
        <FormControl sx={{ 
          minWidth: { xs: '100%', sm: 140 },
          flex: { xs: '1 1 100%', sm: '0 0 auto' }
        }}>
          <Select
            value={agentFilter}
            onChange={(e) => {
              setAgentFilter(e.target.value);
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
            <MenuItem value="all">All agents</MenuItem>
            {/* Add dynamic agent list here */}
          </Select>
        </FormControl>
        
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
                  minWidth: 100
                }}>
                  Agent
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  color: '#374151', 
                  fontSize: { xs: '12px', sm: '14px' }, 
                  py: 2,
                  minWidth: 80
                }}>
                  Call Count
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
              {loading ? (
                // Show shimmer loading skeletons
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <TableRowSkeleton key={index} />
                ))
              ) : missedCalls.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No missed calls found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                missedCalls.map((call) => {
                  const riskStyle = getRiskLevelColor(call.risk_level);
                  const statusProps = getStatusChipProps(call.status);
                  
                  return (
                    <TableRow
                      key={call.last_call_id}
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
                          {call.caller_id || 'Unknown'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2, fontSize: { xs: '12px', sm: '14px' } }}>
                        <Typography variant="body2" sx={{ color: '#111827' }}>
                          {call.last_call_id ? `Agent ${call.last_call_id.substring(0, 8)}` : 'Unknown'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2, fontSize: { xs: '12px', sm: '14px' } }}>
                        <Typography variant="body2" sx={{ color: '#111827', fontWeight: 500 }}>
                          {call.call_count}
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
                            onClick={() => handleView(call.last_call_id)}
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
                          <CallBackButton
                            onClick={() => handleCallBack(call)}
                          />
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
      {!loading && totalResults > 0 && (
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
      
      {/* Shimmer for pagination while loading */}
      {loading && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton variant="text" width={200} height={24} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Skeleton variant="rounded" width={80} height={32} />
            <Skeleton variant="rounded" width={80} height={32} />
          </Box>
        </Box>
      )}
    </Box>
  );
};