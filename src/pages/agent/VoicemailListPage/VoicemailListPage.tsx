// src/pages/agent/VoicemailListPage/VoicemailListPage.tsx
import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ActionButtonsGroup } from '../../../components/common/ActionButtonsGroup/ActionButtonsGroup';
import { CallRecordingPlayer } from '../../../components/common/CallRecordingPlayer';

interface VoicemailItem {
  id: string;
  callerId: string;
  date: string;
  time: string;
  timeRange: string;
  duration: string;
  primaryTopic: string;
  language: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Unresolved' | 'Resolved' | 'In progress';
  priority: 'urgent' | 'normal';
  recordingUrl?: string;
}

// Updated mock data with more recent dates around November 2025
const mockVoicemails: VoicemailItem[] = [
  {
    id: '2090',
    callerId: '#2090',
    date: 'Fri, Nov 21, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    duration: '2:18',
    primaryTopic: 'Anxiety',
    language: 'English',
    riskLevel: 'Medium',
    status: 'Resolved',
    priority: 'normal',
    recordingUrl: 'https://example.com/voicemail-2090.mp3'
  },
  {
    id: '2031',
    callerId: '#2031',
    date: 'Fri, Nov 21, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    duration: '3:15',
    primaryTopic: 'Depression',
    language: 'English',
    riskLevel: 'Critical',
    status: 'Unresolved',
    priority: 'urgent',
    recordingUrl: 'https://example.com/voicemail-2031.mp3'
  },
  {
    id: '2034',
    callerId: '#2034',
    date: 'Fri, Nov 21, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    duration: '1:47',
    primaryTopic: 'Psychosis',
    language: 'Luganda',
    riskLevel: 'Low',
    status: 'Resolved',
    priority: 'normal',
    recordingUrl: 'https://example.com/voicemail-2034.mp3'
  },
  {
    id: '2031b',
    callerId: '#2031',
    date: 'Thu, Nov 20, 2025',
    time: '2:30 PM',
    timeRange: '2:30 PM - 2:45 PM',
    duration: '0:58',
    primaryTopic: 'Anxiety',
    language: 'English',
    riskLevel: 'High',
    status: 'In progress',
    priority: 'urgent',
    recordingUrl: 'https://example.com/voicemail-2031b.mp3'
  },
  {
    id: '2063',
    callerId: '#2063',
    date: 'Thu, Nov 20, 2025',
    time: '2:30 PM',
    timeRange: '2:30 PM - 2:45 PM',
    duration: '2:43',
    primaryTopic: 'Anxiety',
    language: 'Swahili',
    riskLevel: 'Low',
    status: 'Resolved',
    priority: 'normal',
    recordingUrl: 'https://example.com/voicemail-2063.mp3'
  },
  {
    id: '2031c',
    callerId: '#2031',
    date: 'Wed, Nov 19, 2025',
    time: '9:15 AM',
    timeRange: '9:15 AM - 9:30 AM',
    duration: '1:12',
    primaryTopic: 'Depression',
    language: 'English',
    riskLevel: 'Low',
    status: 'In progress',
    priority: 'normal',
    recordingUrl: 'https://example.com/voicemail-2031c.mp3'
  },
  {
    id: '2012',
    callerId: '#2012',
    date: 'Wed, Nov 19, 2025',
    time: '9:15 AM',
    timeRange: '9:15 AM - 9:30 AM',
    duration: '3:45',
    primaryTopic: 'Psychosis',
    language: 'English',
    riskLevel: 'Medium',
    status: 'Resolved',
    priority: 'normal',
    recordingUrl: 'https://example.com/voicemail-2012.mp3'
  },
];

export const VoicemailListPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('11/15/2025 - 11/22/2025');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [riskLevelFilter, setRiskLevelFilter] = useState('All risk levels');
  const [priorityFilter, setPriorityFilter] = useState('All priorities');
  const [durationFilter, setDurationFilter] = useState('All durations');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersMenuAnchor, setFiltersMenuAnchor] = useState<null | HTMLElement>(null);
  const [playingVoicemailId, setPlayingVoicemailId] = useState<string | null>(null);
  const itemsPerPage = isMobile ? 5 : 10; // Fewer items on mobile

  // Filter logic
  const filteredVoicemails = useMemo(() => {
    return mockVoicemails.filter((voicemail) => {
      // Search filter
      const matchesSearch = voicemail.callerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        voicemail.primaryTopic.toLowerCase().includes(searchQuery.toLowerCase());
      // Status filter
      const matchesStatus = statusFilter === 'All status' || voicemail.status === statusFilter;
      // Risk level filter
      const matchesRisk = riskLevelFilter === 'All risk levels' || voicemail.riskLevel === riskLevelFilter;
      // Priority filter
      const matchesPriority = priorityFilter === 'All priorities' || voicemail.priority === priorityFilter;
      // Duration filter (convert duration to minutes)
      const durationInMinutes = parseInt(voicemail.duration.split(':')[0]) * 60 + parseInt(voicemail.duration.split(':')[1]);
      let matchesDuration = true;
      if (durationFilter !== 'All durations') {
        if (durationFilter === 'short') matchesDuration = durationInMinutes < 60;
        else if (durationFilter === 'medium') matchesDuration = durationInMinutes >= 60 && durationInMinutes <= 180;
        else if (durationFilter === 'long') matchesDuration = durationInMinutes > 180;
      }
      // Date range filter (simplified - in real app, parse dates properly)
      const matchesDate = true; // Implement date parsing if needed
      return matchesSearch && matchesStatus && matchesRisk && matchesPriority && matchesDuration && matchesDate;
    });
  }, [searchQuery, statusFilter, riskLevelFilter, priorityFilter, durationFilter, dateRange]);

  const totalItems = filteredVoicemails.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVoicemails = filteredVoicemails.slice(startIndex, endIndex);

  const handleViewVoicemail = (voicemailId: string) => {
    navigate(`/agent/voicemail/${voicemailId}`);
  };

  const handlePlayVoicemail = (voicemailId: string) => {
    setPlayingVoicemailId(voicemailId);
  };

  const handleClosePlayer = () => {
    setPlayingVoicemailId(null);
  };

  const getRiskLevelColor = (level: VoicemailItem['riskLevel']) => {
    switch (level) {
      case 'Critical': return { bgcolor: '#fee2e2', color: '#dc2626' };
      case 'High': return { bgcolor: '#fed7d7', color: '#ea580c' };
      case 'Medium': return { bgcolor: '#fef3c7', color: '#d97706' };
      case 'Low': return { bgcolor: '#d1fae5', color: '#059669' };
      default: return { bgcolor: '#f3f4f6', color: '#6b7280' };
    }
  };

  const getStatusColor = (status: VoicemailItem['status']) => {
    switch (status) {
      case 'Resolved':
        return { bgcolor: '#dcfce7', color: '#059669' };
      case 'In progress':
        return { bgcolor: '#dbeafe', color: '#2563eb' };
      case 'Unresolved':
        return { bgcolor: '#fee2e2', color: '#dc2626' };
      default:
        return { bgcolor: '#f3f4f6', color: '#6b7280' };
    }
  };

  const handleFiltersMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFiltersMenuAnchor(event.currentTarget);
  };

  const handleFiltersMenuClose = () => {
    setFiltersMenuAnchor(null);
  };

  const handleApplyFilters = () => {
    handleFiltersMenuClose();
  };

  // Find the voicemail being played
  const playingVoicemail = mockVoicemails.find(vm => vm.id === playingVoicemailId);

  if (isMobile) {
    // Mobile: Card-based layout
    return (
      <Box sx={{ p: { xs: 1, sm: 3 }, maxWidth: '1400px', mx: 'auto' }}>
        {/* Call Recording Player Popup */}
        {playingVoicemailId && playingVoicemail && (
          <CallRecordingPlayer
            callId={playingVoicemail.callerId}
            duration={`0:00 / ${playingVoicemail.duration}`}
            recordingUrl={playingVoicemail.recordingUrl}
            isPopup={true}
            open={true}
            onClose={handleClosePlayer}
          />
        )}
        {/* Filters Bar - Stacked on mobile */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              placeholder="Search by caller ID or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontSize: '14px',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              placeholder="Select date range"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ArrowDownIcon sx={{ color: '#9ca3af' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontSize: '14px',
                }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small" sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '14px',
              }
            }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as string)}
                displayEmpty
                sx={{ fontSize: '14px' }}
              >
                <MenuItem value="All status">All status</MenuItem>
                <MenuItem value="Unresolved">Unresolved</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="In progress">In progress</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small" sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '14px',
              }
            }}>
              <Select
                value={riskLevelFilter}
                onChange={(e) => setRiskLevelFilter(e.target.value as string)}
                displayEmpty
                sx={{ fontSize: '14px' }}
              >
                <MenuItem value="All risk levels">All risk levels</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={handleFiltersMenuOpen}
              sx={{
                borderColor: '#d1d5db',
                color: '#6b7280',
                borderRadius: '8px',
                fontSize: '14px',
                '&:hover': {
                  borderColor: '#9ca3af',
                  bgcolor: '#f9fafb'
                }
              }}
            >
              More Filters
            </Button>
          </Grid>
        </Grid>

        {/* Voicemails as Cards */}
        <Card sx={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          {paginatedVoicemails.map((voicemail) => (
            <Box
              key={voicemail.id}
              sx={{
                p: 2,
                borderBottom: '1px solid #f3f4f6',
                '&:last-child': { borderBottom: 'none' },
                '&:hover': { bgcolor: '#f9fafb' }
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                    {voicemail.date}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {voicemail.timeRange}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                    {voicemail.callerId}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {voicemail.language}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="body2" fontWeight={500}>
                    {voicemail.primaryTopic}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Chip
                    label={voicemail.riskLevel}
                    size="small"
                    sx={{
                      ...getRiskLevelColor(voicemail.riskLevel),
                      fontWeight: 500,
                      fontSize: '12px',
                      height: 24,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Chip
                    label={voicemail.status}
                    size="small"
                    sx={{
                      ...getStatusColor(voicemail.status),
                      fontWeight: 500,
                      fontSize: '12px',
                      height: 24,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <ActionButtonsGroup
                    onPlay={() => handlePlayVoicemail(voicemail.id)}
                    onView={() => handleViewVoicemail(voicemail.id)}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
        </Card>

        {/* Pagination */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderTop: '1px solid #f3f4f6',
        }}>
          <Typography variant="body2" color="text.secondary">
            Page {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} results
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              sx={{
                borderColor: '#e5e7eb',
                color: '#6b7280',
                '&:disabled': {
                  borderColor: '#f3f4f6',
                  color: '#d1d5db'
                }
              }}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              sx={{
                borderColor: '#e5e7eb',
                color: '#374151',
                '&:hover': {
                  borderColor: '#0d9488',
                  color: '#0d9488'
                }
              }}
            >
              Next
            </Button>
          </Box>
        </Box>

        {/* Filters Menu */}
        <Menu
          anchorEl={filtersMenuAnchor}
          open={Boolean(filtersMenuAnchor)}
          onClose={handleFiltersMenuClose}
          PaperProps={{
            sx: { minWidth: 200, p: 2 }
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Additional Filters
          </Typography>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <Select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as string)}
              displayEmpty
            >
              <MenuItem value="All priorities">All priorities</MenuItem>
              <MenuItem value="urgent">Urgent only</MenuItem>
              <MenuItem value="normal">Normal only</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <Select 
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value as string)}
              displayEmpty
            >
              <MenuItem value="All durations">All durations</MenuItem>
              <MenuItem value="short">Less than 1 minute</MenuItem>
              <MenuItem value="medium">1-3 minutes</MenuItem>
              <MenuItem value="long">More than 3 minutes</MenuItem>
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            onClick={handleApplyFilters}
            sx={{ bgcolor: '#0d9488', '&:hover': { bgcolor: '#0f766e' } }}
          >
            Apply Filters
          </Button>
        </Menu>
      </Box>
    );
  }

  // Desktop: Table layout
  return (
    <Box sx={{ p: 3, maxWidth: '1400px', mx: 'auto' }}>
      {/* Call Recording Player Popup */}
      {playingVoicemailId && playingVoicemail && (
        <CallRecordingPlayer
          callId={playingVoicemail.callerId}
          duration={`0:00 / ${playingVoicemail.duration}`}
          recordingUrl={playingVoicemail.recordingUrl}
          isPopup={true}
          open={true}
          onClose={handleClosePlayer}
        />
      )}
      {/* Filters Bar */}
      <Grid container spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            placeholder="Search by caller ID or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '14px',
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            placeholder="Select date range"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ArrowDownIcon sx={{ color: '#9ca3af' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                fontSize: '14px',
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small" sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              fontSize: '14px',
            }
          }}>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as string)}
              displayEmpty
              sx={{ fontSize: '14px' }}
            >
              <MenuItem value="All status">All status</MenuItem>
              <MenuItem value="Unresolved">Unresolved</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="In progress">In progress</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small" sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              fontSize: '14px',
            }
          }}>
            <Select
              value={riskLevelFilter}
              onChange={(e) => setRiskLevelFilter(e.target.value as string)}
              displayEmpty
              sx={{ fontSize: '14px' }}
            >
              <MenuItem value="All risk levels">All risk levels</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={handleFiltersMenuOpen}
            sx={{
              borderColor: '#d1d5db',
              color: '#6b7280',
              borderRadius: '8px',
              fontSize: '14px',
              '&:hover': {
                borderColor: '#9ca3af',
                bgcolor: '#f9fafb'
              }
            }}
          >
            More Filters
          </Button>
        </Grid>
      </Grid>
      {/* Table */}
      <Card sx={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', overflowX: 'auto' }}>
        <TableContainer sx={{ minWidth: 650 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2, whiteSpace: 'nowrap' }}>
                  Date & Time
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2, whiteSpace: 'nowrap' }}>
                  Caller ID
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2 }}>
                  Primary Topic
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2, whiteSpace: 'nowrap' }}>
                  Risk level
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2, whiteSpace: 'nowrap' }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2, whiteSpace: 'nowrap' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedVoicemails.map((voicemail) => (
                <TableRow
                  key={voicemail.id}
                  sx={{
                    '&:hover': { bgcolor: '#f9fafb' },
                    '&:not(:last-child)': { borderBottom: '1px solid #f3f4f6' },
                  }}
                >
                  <TableCell sx={{ py: 2 }}>
                    <Box>
                      <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                        {voicemail.date}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {voicemail.timeRange}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Box>
                      <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                        {voicemail.callerId}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {voicemail.language}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {voicemail.primaryTopic}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Chip
                      label={voicemail.riskLevel}
                      size="small"
                      sx={{
                        ...getRiskLevelColor(voicemail.riskLevel),
                        fontWeight: 500,
                        fontSize: '12px',
                        height: 24,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Chip
                      label={voicemail.status}
                      size="small"
                      sx={{
                        ...getStatusColor(voicemail.status),
                        fontWeight: 500,
                        fontSize: '12px',
                        height: 24,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <ActionButtonsGroup
                      onPlay={() => handlePlayVoicemail(voicemail.id)}
                      onView={() => handleViewVoicemail(voicemail.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderTop: '1px solid #f3f4f6',
        }}>
          <Typography variant="body2" color="text.secondary">
            Page {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} results
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              sx={{
                borderColor: '#e5e7eb',
                color: '#6b7280',
                '&:disabled': {
                  borderColor: '#f3f4f6',
                  color: '#d1d5db'
                }
              }}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              sx={{
                borderColor: '#e5e7eb',
                color: '#374151',
                '&:hover': {
                  borderColor: '#0d9488',
                  color: '#0d9488'
                }
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Card>
      {/* Filters Menu */}
      <Menu
        anchorEl={filtersMenuAnchor}
        open={Boolean(filtersMenuAnchor)}
        onClose={handleFiltersMenuClose}
        PaperProps={{
          sx: { minWidth: 200, p: 2 }
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Additional Filters
        </Typography>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <Select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as string)}
            displayEmpty
          >
            <MenuItem value="All priorities">All priorities</MenuItem>
            <MenuItem value="urgent">Urgent only</MenuItem>
            <MenuItem value="normal">Normal only</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <Select 
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value as string)}
            displayEmpty
          >
            <MenuItem value="All durations">All durations</MenuItem>
            <MenuItem value="short">Less than 1 minute</MenuItem>
            <MenuItem value="medium">1-3 minutes</MenuItem>
            <MenuItem value="long">More than 3 minutes</MenuItem>
          </Select>
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          onClick={handleApplyFilters}
          sx={{ bgcolor: '#0d9488', '&:hover': { bgcolor: '#0f766e' } }}
        >
          Apply Filters
        </Button>
      </Menu>
    </Box>
  );
};
