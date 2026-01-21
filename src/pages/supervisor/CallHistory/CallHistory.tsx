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
  Chip,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
  IconButton,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ArrowBack as ArrowBackIcon,
  PlayArrow as PlayArrowIcon,
  Download as DownloadIcon,
  Pause as PauseIcon,
} from '@mui/icons-material';

import { ActionButtonsGroup } from '../../../components/common/ActionButtonsGroup/ActionButtonsGroup';
import CustomChip from '../../../components/common/CustomChip/CustomChip';
import type { RiskLevel, CallOutcome } from '../../../components/common/CustomChip/CustomChip';

import type { CallHistoryItem, CallHistoryResponse, CallRecord, DetectedKeyword, TopicDiscussed, SpeakerSegment } from "../../../types/supervisor.types";
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

const getQualityScoreColor = (score: string | number | null): string => {
  if (!score) return '#6b7280';
  const num = typeof score === 'string' ? parseFloat(score) : score;
  if (isNaN(num)) return '#6b7280';
  if (num >= 80) return '#16a34a';
  if (num >= 60) return '#d97706';
  return '#dc2626';
};

// ────────────────────────────────────────────────
// Call Details Component with shimmer
// ────────────────────────────────────────────────
interface CallDetailsProps {
  callId: string;
  onBack: () => void;
}

const CallDetails: React.FC<CallDetailsProps> = ({ callId, onBack }) => {
  const [call, setCall] = useState<CallRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchCall = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await supervisorApi.getCallDetails(callId);
        if (mounted) setCall(data);
      } catch (err: any) {
        if (mounted) setError(err.message || "Could not load call details");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCall();

    return () => {
      mounted = false;
    };
  }, [callId]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  if (loading) {
    return (
      <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
        {/* Header skeleton */}
        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box>
                <Skeleton variant="text" width={180} height={32} />
                <Skeleton variant="text" width={140} height={20} />
              </Box>
            </Box>
            <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
          </Box>
        </Box>

        {/* Main content skeleton */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ bgcolor: '#eff6ff', p: 3, borderRadius: 1, mb: 3 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                  {[...Array(6)].map((_, i) => (
                    <Box key={i}>
                      <Skeleton variant="text" width={80} height={16} sx={{ mb: 0.5 }} />
                      <Skeleton variant="text" width={100} height={24} />
                    </Box>
                  ))}
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Skeleton variant="text" width={80} height={16} sx={{ mb: 1 }} />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Skeleton variant="rounded" width={100} height={24} />
                    <Skeleton variant="rounded" width={100} height={24} />
                  </Box>
                </Box>
              </Box>
            </Paper>

            {[...Array(3)].map((_, i) => (
              <Paper key={i} sx={{ p: 3, borderRadius: 2 }}>
                <Skeleton variant="text" width={140} height={28} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="90%" height={20} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="70%" height={20} sx={{ mt: 1 }} />
              </Paper>
            ))}

            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Skeleton variant="text" width={140} height={28} sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" sx={{ flex: 1, height: 6, borderRadius: 4 }} />
                <Skeleton variant="text" width={60} height={20} />
                <Skeleton variant="circular" width={32} height={32} />
              </Box>
            </Paper>
          </Box>

          <Box sx={{ width: { md: 340 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[...Array(4)].map((_, i) => (
              <Paper key={i} sx={{ p: 3, borderRadius: 2 }}>
                <Skeleton variant="text" width={140} height={28} sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} variant="rounded" width={80} height={24} />
                  ))}
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  if (error || !call) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', color: 'error.main' }}>
        <Typography variant="h6">Error</Typography>
        <Typography>{error || "Call not found"}</Typography>
        <Button variant="outlined" onClick={onBack} sx={{ mt: 3 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  // ────────────────────────────────────────────────
  // Real Call Details content (your original content)
  // ────────────────────────────────────────────────
  const riskLevel = mapRiskLevel(call.risk_level);
  const outcome = mapOutcome(call.outcome?.transfer_type || call.outcome?.reason_of_transfer);

  const callerSpeaksPercentage = call.speakers.length > 0
    ? Math.round((call.speakers.filter(s => s.speaker === "Caller").length / call.speakers.length) * 100) + "%"
    : "50%";

  const agentSpeaksPercentage = (100 - parseInt(callerSpeaksPercentage)) + "%";

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton onClick={onBack} color="inherit">
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h5" fontWeight={600}>
                Outgoing Call {call.call_id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(call.call_start_time).toLocaleString()} –{' '}
                {call.call_end_time
                  ? new Date(call.call_end_time).toLocaleTimeString()
                  : 'ongoing'}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            color="error"
            sx={{ textTransform: 'none' }}
          >
            Escalate call
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
        }}
      >
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ bgcolor: '#eff6ff', p: 3, borderRadius: 1, mb: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                  gap: 3,
                }}
              >
                <div>
                  <Typography variant="body2" color="text.secondary">Caller ID</Typography>
                  <Typography fontWeight={500}>#{call.caller_id}</Typography>
                </div>
                <div>
                  <Typography variant="body2" color="text.secondary">Caller Type</Typography>
                  <CustomChip label={call.caller_type} variant="caller" size="small" />
                </div>
                <div>
                  <Typography variant="body2" color="text.secondary">Risk Level</Typography>
                  <CustomChip
                    label={call.risk_level.toUpperCase()}
                    variant="risk"
                    size="small"
                    showDot
                  />
                </div>
                <div>
                  <Typography variant="body2" color="text.secondary">Language</Typography>
                  <Typography fontWeight={500}>{call.language}</Typography>
                </div>
                <div>
                  <Typography variant="body2" color="text.secondary">Gender</Typography>
                  <Typography fontWeight={500}>{call.caller_gender}</Typography>
                </div>
                <div>
                  <Typography variant="body2" color="text.secondary">Trajectory</Typography>
                  <Typography fontWeight={500}>{call.trajectory_of_care}</Typography>
                </div>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Speakers
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label={`Caller (${callerSpeaksPercentage})`} size="small" color="primary" variant="outlined" />
                  <Chip label={`Agent (${agentSpeaksPercentage})`} size="small" color="primary" variant="outlined" />
                </Box>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Call Summary</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
              {call.call_summary || 'No summary available'}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Call Notes</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
              {call.call_notes || 'No notes added'}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Transcription</Typography>
            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
              {call.speakers.map((segment: SpeakerSegment, i: number) => (
                <Box key={i} sx={{ mb: 2, display: 'flex', gap: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: segment.speaker === 'Agent' ? 'primary.main' : 'grey.500',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                    }}
                  >
                    {segment.speaker[0]}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle2">{segment.speaker}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(segment.start_time * 1000).toISOString().substr(14, 5)}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{segment.text}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Call Recording</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={handlePlayPause}
                sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <Box sx={{ flex: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={30}
                  sx={{ height: 6, borderRadius: 4 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {Math.floor(call.call_duration_seconds / 60)}:{(call.call_duration_seconds % 60).toString().padStart(2, '0')}
              </Typography>
              {call.audio_file_path && (
                <IconButton color="primary" title="Download recording">
                  <DownloadIcon />
                </IconButton>
              )}
            </Box>
          </Paper>
        </Box>

        <Box sx={{ width: { md: 340 }, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Detected Keywords</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {call.detected_keywords?.map((kw: DetectedKeyword, i: number) => (
                <Chip key={i} label={kw.keyword} size="small" />
              )) || <Typography variant="body2" color="text.secondary">None detected</Typography>}
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Topics Discussed</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {call.topics_discussed?.map((t: TopicDiscussed, i: number) => (
                <Paper
                  key={i}
                  variant="outlined"
                  sx={{ p: 1.5, bgcolor: t.is_primary ? 'primary.50' : undefined }}
                >
                  <Typography variant="body2">
                    {t.topic_name}
                    {t.is_primary && <Chip label="Primary" size="small" color="primary" sx={{ ml: 1 }} />}
                  </Typography>
                </Paper>
              )) || <Typography variant="body2" color="text.secondary">No topics identified</Typography>}
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Outcome</Typography>
            <Chip
              label={call.outcome?.transfer_type || call.outcome?.reason_of_transfer || 'Completed'}
              color="primary"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            {call.outcome?.reason_of_transfer && (
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary">Reason</Typography>
                <Typography>{call.outcome.reason_of_transfer}</Typography>
              </Box>
            )}
            {call.outcome?.date_of_transfer && (
              <Box>
                <Typography variant="body2" color="text.secondary">Date of Transfer</Typography>
                <Typography>{new Date(call.outcome.date_of_transfer).toLocaleString()}</Typography>
              </Box>
            )}
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Conversation Quality</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div>
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                  <Typography variant="body2">Overall</Typography>
                  <Typography fontWeight={500}>{call.conversation_quality.overall_score}%</Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={call.conversation_quality.overall_score}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </div>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
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

  if (selectedCallId) {
    return <CallDetails callId={selectedCallId} onBack={() => setSelectedCallId(null)} />;
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
  const handlePlayCall = (callId: string) => console.log('Play call:', callId);
  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
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
                  {filteredCalls.map((call: CallHistoryItem) => (
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
                  ))}
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