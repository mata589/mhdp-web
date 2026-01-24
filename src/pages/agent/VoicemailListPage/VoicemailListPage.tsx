// src/pages/agent/VoicemailListPage/VoicemailListPage.tsx
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
  Skeleton,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ActionButtonsGroup } from '../../../components/common/ActionButtonsGroup/ActionButtonsGroup';
import { CallRecordingPlayer } from '../../../components/common/CallRecordingPlayer';
import { DateRangeSelector } from '../../../components/common/DateRangeSelector/DateRangeSelector';
import { CallBackButton } from '../../../components/common/CallBackButton/CallBackButton';
import { CallPopup } from '../../../components/common/CallPopupProps/CallPopupProps';

import type { Voicemail, RiskLevel, VoicemailStatus } from '../../../types/agent.types';
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
    case 'resolved':
      return {
        sx: {
          bgcolor: '#f0fdf4',
          color: '#16a34a',
          border: '1px solid #bbf7d0',
          '& .MuiChip-label': { fontWeight: 500 }
        }
      };
    case 'unresolved':
      return {
        sx: {
          bgcolor: '#fef2f2',
          color: '#dc2626',
          border: '1px solid #fecaca',
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
    case 'not_escalated':
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

const formatStatusLabel = (status: string) => {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
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

// Shimmer Loading Row Component
const ShimmerRow: React.FC = () => (
  <TableRow sx={{ borderBottom: '1px solid #f3f4f6' }}>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="text" width="80%" height={20} />
      <Skeleton variant="text" width="60%" height={20} sx={{ mt: 0.5 }} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="text" width="70%" height={20} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="rounded" width={70} height={24} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Skeleton variant="rounded" width={90} height={24} />
    </TableCell>
    <TableCell sx={{ py: 2 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="rounded" width={90} height={32} />
      </Box>
    </TableCell>
  </TableRow>
);

export const VoicemailListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState(''); // Empty initially - no default date
  const [statusFilter, setStatusFilter] = useState<VoicemailStatus | 'all'>('all');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [playingVoicemailId, setPlayingVoicemailId] = useState<string | null>(null);
  const [voicemails, setVoicemails] = useState<Voicemail[]>([]);
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

  // Fetch voicemails data
  useEffect(() => {
    const fetchVoicemails = async () => {
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
        
        const response = await agentApi.getVoicemails(
          itemsPerPage,
          offset,
          searchTerm || undefined,
          dates?.startDate, // Only send if dates exist
          dates?.endDate,   // Only send if dates exist
          statusFilter !== 'all' ? statusFilter : undefined,
          riskFilter !== 'all' ? riskFilter : undefined
        );
        
        setVoicemails(response.results);
        setTotalResults(response.total_results);
      } catch (err) {
        let errorMessage = 'Failed to fetch voicemails';
        
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'object' && err !== null) {
          // Try to extract meaningful error info from object
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
        console.error('Error fetching voicemails:', err);
        console.error('Request params:', { 
          searchTerm, 
          dateRange, 
          parsedDates: dateRange ? parseDateRange(dateRange) : null,
          statusFilter, 
          riskFilter 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVoicemails();
  }, [currentPage, searchTerm, dateRange, riskFilter, statusFilter]);

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

  const handleViewVoicemail = (voicemailId: string) => {
    navigate(`/agent/voicemail/${voicemailId}`);
  };

  const handlePlayVoicemail = (voicemailId: string) => {
    setPlayingVoicemailId(voicemailId);
  };

  const handleClosePlayer = () => {
    setPlayingVoicemailId(null);
  };

  const handleCallBack = (voicemail: Voicemail) => {
    setActiveCall({
      callId: voicemail.call_id,
      phoneNumber: voicemail.caller_id,
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
      navigate('/agent/live-call');
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
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleDateRangeChange = (newDateRange: string) => {
    setDateRange(newDateRange);
    setCurrentPage(1); // Reset to first page on date change
  };

  // Find the voicemail being played
  const playingVoicemail = voicemails.find(vm => vm.call_id === playingVoicemailId);

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Call Recording Player Popup */}
      {playingVoicemailId && playingVoicemail && (
        <CallRecordingPlayer
          callId={playingVoicemailId}
          duration={`0:00 / ${formatDuration(playingVoicemail.duration_seconds)}`}
          recordingUrl={playingVoicemail.audio_url}
          isPopup={true}
          open={true}
          onClose={handleClosePlayer}
        />
      )}

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
          Voicemails
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
          placeholder="Search by caller ID or topic..."
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
        
        {/* Date Range Selector */}
        <DateRangeSelector
          value={dateRange}
          onChange={handleDateRangeChange}
          sx={{
            flex: { xs: '1 1 100%', sm: '0 0 auto' }
          }}
        />
        
        <FormControl sx={{ 
          minWidth: { xs: '100%', sm: 120 },
          flex: { xs: '1 1 100%', sm: '0 0 auto' }
        }}>
          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as VoicemailStatus | 'all');
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
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="unresolved">Unresolved</MenuItem>
            <MenuItem value="escalated">Escalated</MenuItem>
            <MenuItem value="not_escalated">Not Escalated</MenuItem>
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
            <MenuItem value="critical">Critical</MenuItem>
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
          Filters
        </Button>
      </Box>
      
      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {/* Voicemails Table */}
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
                // Shimmer loading rows
                Array.from({ length: 5 }).map((_, index) => (
                  <ShimmerRow key={index} />
                ))
              ) : voicemails.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No voicemails found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                voicemails.map((voicemail) => {
                  const riskStyle = getRiskLevelColor(voicemail.risk_level);
                  const statusProps = getStatusChipProps(voicemail.status);
                  return (
                    <TableRow
                      key={voicemail.call_id}
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
                          {formatDateTime(voicemail.call_start_time, voicemail.call_end_time)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2, fontSize: { xs: '12px', sm: '14px' } }}>
                        <Typography variant="body2" sx={{ color: '#111827' }}>
                          {voicemail.caller_id}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Chip
                          label={riskStyle.label}
                          size="small"
                          variant="outlined"
                          {...getRiskChipProps(voicemail.risk_level)}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Chip
                          label={formatStatusLabel(voicemail.status)}
                          size="small"
                          variant="outlined"
                          {...statusProps}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <ActionButtonsGroup
                            onPlay={() => handlePlayVoicemail(voicemail.call_id)}
                            onView={() => handleViewVoicemail(voicemail.call_id)}
                          />
                          <CallBackButton
                            onClick={() => handleCallBack(voicemail)}
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
    </Box>
  );
};