/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/supervisor/CallHistory/CallHistory.tsx
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
} from '@mui/icons-material';

import { ActionButtonsGroup } from '../../../components/common/ActionButtonsGroup/ActionButtonsGroup';
import CustomChip from '../../../components/common/CustomChip/CustomChip';
import type { RiskLevel, CallOutcome } from '../../../components/common/CustomChip/CustomChip';
import { CallDetailsPage } from '../../../components/common/CallDetailsPage';
import { CallRecordingPlayer } from '../../../components/common/CallRecordingPlayer';

import type { CallHistoryItem, CallHistoryResponse } from "../../../types/supervisor.types";
import supervisorApi from "../../../services/api/supervisorApi";

// Shimmer animation styles
const shimmerStyles = {
  '@keyframes shimmer': {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
  },
  shimmerBg: {
    background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },
};

// ────────────────────────────────────────────────
// Mapping functions
// ────────────────────────────────────────────────
const mapRiskLevel = (risk: string | undefined): RiskLevel => {
  if (!risk) return 'Medium';
  const lower = risk.toLowerCase();
  if (lower.includes('critical') || lower.includes('high')) return 'High';
  if (lower.includes('medium')) return 'Medium';
  if (lower.includes('low')) return 'Low';
  return 'Medium';
};

const mapOutcome = (outcome: string | undefined): CallOutcome => {
  if (!outcome) return 'Advice Given';
  const normalized = outcome.trim().toLowerCase();
  if (normalized.includes('resolved') || normalized === 'advice given') return 'Advice Given';
  if (normalized.includes('escalated') || normalized.includes('transferred')) return 'Escalated';
  if (normalized.includes('referred')) return 'Referred';
  return 'Advice Given';
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// ────────────────────────────────────────────────
// Main CallHistory Component
// ────────────────────────────────────────────────
export const CallHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [languageFilter, setLanguageFilter] = useState('All languages');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [playingCallId, setPlayingCallId] = useState<string | null>(null);

  const [data, setData] = useState<CallHistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const response = await supervisorApi.getCallHistory({ limit: itemsPerPage, offset });
        setData(response);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch call history');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  // If a call is selected, show the call details page
  if (selectedCallId) {
    return (
      <CallDetailsPage
        callId={selectedCallId}
        onBack={() => setSelectedCallId(null)}
        isSupervisor={true}
        isEscalation={false}
      />
    );
  }

  const filteredCalls = data?.results.filter((call: CallHistoryItem) => {
    const matchesSearch =
      call.caller_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (call.primary_topic?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All status' ||
      mapOutcome(call.outcome).toLowerCase() === statusFilter.toLowerCase();

    const matchesLanguage =
      languageFilter === 'All languages' ||
      (call.language?.toLowerCase() || '') === languageFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesLanguage;
  }) || [];

  const totalPages = Math.ceil((data?.total_results || 0) / itemsPerPage);

  const handleViewCall = (callId: string) => setSelectedCallId(callId);
  const handlePlayCall = (callId: string) => setPlayingCallId(callId);
  const handleClosePlayer = () => setPlayingCallId(null);
  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  // Find the call being played
  const playingCall = filteredCalls.find(call => call.call_id === playingCallId);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Call Recording Player Popup */}
      {playingCallId && playingCall && (
        <CallRecordingPlayer
          callId={playingCallId}
          duration={formatDuration(playingCall.duration_seconds || 0)}
          recordingUrl={playingCall.audio_url}
          isPopup={true}
          open={true}
          onClose={handleClosePlayer}
          isSupervisor={true}
        />
      )}

      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          Call history
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 3,
          display: 'flex',
          gap: { xs: 1, sm: 2 },
          alignItems: { xs: 'stretch', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          placeholder="Search by caller ID, agent or topic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: 1,
            width: { xs: '100%', sm: 'auto' },
            '& .MuiOutlinedInput-root': { bgcolor: 'white', height: 40, fontSize: '14px' },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: { xs: '100%', sm: 120 }, height: 40 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            sx={{
              bgcolor: 'white',
              height: 40,
              fontSize: '14px',
              '& .MuiSelect-select': { py: 1 },
            }}
          >
            <MenuItem value="All status">All status</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="escalated">Escalated</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: { xs: '100%', sm: 140 }, height: 40 }}>
          <Select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            displayEmpty
            sx={{
              bgcolor: 'white',
              height: 40,
              fontSize: '14px',
              '& .MuiSelect-select': { py: 1 },
            }}
          >
            <MenuItem value="All languages">All languages</MenuItem>
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="luganda">Luganda</MenuItem>
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
            minWidth: { xs: '100%', sm: 'auto' },
            '&:hover': { bgcolor: '#f9fafb' },
          }}
        >
          More Filters
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Paper sx={{ overflow: 'hidden', borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          <TableContainer sx={{ borderRadius: 1, border: '1px solid #e5e7eb' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>Date/Time</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>Caller</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>Topic</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>Risk</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>Outcome</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>Score</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(itemsPerPage)].map((_, index) => (
                  <TableRow key={index} sx={{ borderBottom: '1px solid #f3f4f6' }}>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ height: 20, width: '80%', ...shimmerStyles.shimmerBg, borderRadius: 1 }} />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ height: 20, width: '90%', ...shimmerStyles.shimmerBg, borderRadius: 1 }} />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ height: 20, width: '70%', ...shimmerStyles.shimmerBg, borderRadius: 1 }} />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ height: 24, width: 80, ...shimmerStyles.shimmerBg, borderRadius: 12 }} />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ height: 24, width: 100, ...shimmerStyles.shimmerBg, borderRadius: 12 }} />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ height: 20, width: '50%', ...shimmerStyles.shimmerBg, borderRadius: 1 }} />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Box sx={{ height: 32, width: 32, ...shimmerStyles.shimmerBg, borderRadius: 1 }} />
                        <Box sx={{ height: 32, width: 32, ...shimmerStyles.shimmerBg, borderRadius: 1 }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <>
          <Paper sx={{ overflow: 'hidden', borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <TableContainer sx={{ overflowX: { xs: 'auto', sm: 'visible' }, borderRadius: 1, border: '1px solid #e5e7eb' }}>
              <Table sx={{ minWidth: { xs: 600, sm: 'auto' } }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f9fafb' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: { xs: '0.75rem', sm: '14px' }, py: { xs: 1, sm: 2 } }}>
                      Date/Time
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: { xs: '0.75rem', sm: '14px' }, py: { xs: 1, sm: 2 } }}>
                      Caller
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: { xs: '0.75rem', sm: '14px' }, py: { xs: 1, sm: 2 } }}>
                      Topic
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: { xs: '0.75rem', sm: '14px' }, py: { xs: 1, sm: 2 } }}>
                      Risk
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: { xs: '0.75rem', sm: '14px' }, py: { xs: 1, sm: 2 } }}>
                      Outcome
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: { xs: '0.75rem', sm: '14px' }, py: { xs: 1, sm: 2 } }}>
                      Score
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: { xs: '0.75rem', sm: '14px' }, py: { xs: 1, sm: 2 } }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCalls.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          No call history found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCalls.map((call: CallHistoryItem) => (
                      <TableRow
                        key={call.call_id}
                        sx={{
                          '&:hover': { bgcolor: '#f9fafb' },
                          borderBottom: '1px solid #f3f4f6',
                        }}
                      >
                        <TableCell sx={{ py: { xs: 1, sm: 2 }, minWidth: { xs: 120, sm: 170 } }}>
                          <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '14px' }, color: '#111827', whiteSpace: 'pre-line' }}>
                            {new Date(call.call_start_time).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                            {'\n'}
                            {new Date(call.call_start_time).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            })} - {new Date(call.call_end_time).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            })}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                          <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '14px' }, color: '#111827' }}>
                            {call.caller_id}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                          <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '14px' }, color: '#111827' }}>
                            {call.primary_topic || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                          <CustomChip
                            label={mapRiskLevel(call.risk_level)}
                            variant="risk"
                            size="small"
                          />
                        </TableCell>
                        <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                          <CustomChip
                            label={mapOutcome(call.outcome)}
                            variant="outcome"
                            size="small"
                          />
                        </TableCell>
                        <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                          <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '14px' }, color: '#111827' }}>
                            {call.quality_score || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                          <ActionButtonsGroup
                            onPlay={() => handlePlayCall(call.call_id)}
                            onView={() => handleViewCall(call.call_id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Box
            sx={{
              mt: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8125rem', sm: '14px' } }}>
              Page {currentPage} of {totalPages} ({data?.total_results || 0} total results)
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                sx={{
                  color: '#6b7280',
                  fontSize: { xs: '0.75rem', sm: '14px' },
                  textTransform: 'none',
                  '&:disabled': { color: '#d1d5db' },
                }}
              >
                ‹ Previous
              </Button>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                sx={{
                  color: '#6b7280',
                  fontSize: { xs: '0.75rem', sm: '14px' },
                  textTransform: 'none',
                  '&:disabled': { color: '#d1d5db' },
                }}
              >
                Next ›
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};