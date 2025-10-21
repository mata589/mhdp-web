// src/pages/agent/VoicemailListPage/VoicemailListPage.tsx
import React, { useState } from 'react';
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
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Phone as CallBackIcon,
  PlayArrow as PlayIcon,
  Visibility as ViewIcon,
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

// Updated mock data to match the design
const mockVoicemails: VoicemailItem[] = [
  {
    id: '2090',
    callerId: '#2090',
    date: 'Mon, July 13, 2025',
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
    date: 'Mon, July 13, 2025',
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
    date: 'Mon, July 13, 2025',
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
    date: 'Mon, July 13, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
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
    date: 'Mon, July 13, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
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
    date: 'Mon, July 13, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
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
    date: 'Mon, July 13, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('04/08/2025 - 04/09/2025');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [riskLevelFilter, setRiskLevelFilter] = useState('All risk levels');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersMenuAnchor, setFiltersMenuAnchor] = useState<null | HTMLElement>(null);
  const [playingVoicemailId, setPlayingVoicemailId] = useState<string | null>(null);

  const itemsPerPage = 10;
  const totalItems = 60; // Updated to match design
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleViewVoicemail = (voicemailId: string) => {
    navigate(`/agent/voicemail/${voicemailId}`);
  };

  const handlePlayVoicemail = (voicemailId: string) => {
    setPlayingVoicemailId(voicemailId);
  };

  const handleClosePlayer = () => {
    setPlayingVoicemailId(null);
  };

  const handleCallBack = (callId: string) => {
    console.log('Calling back:', callId);
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return { bgcolor: '#dc2626', color: 'white' };
      case 'High': return { bgcolor: '#ea580c', color: 'white' };
      case 'Medium': return { bgcolor: '#d97706', color: 'white' };
      case 'Low': return { bgcolor: '#059669', color: 'white' };
      default: return { bgcolor: '#6b7280', color: 'white' };
    }
  };

  const getStatusColor = (status: string) => {
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

  // Find the voicemail being played
  const playingVoicemail = mockVoicemails.find(vm => vm.id === playingVoicemailId);

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
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3, 
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
      }}>
        {/* Search */}
        <TextField
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
          sx={{ 
            flex: 1,
            maxWidth: '350px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              fontSize: '14px',
            }
          }}
          size="small"
        />

        {/* Date Range */}
        <TextField
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          placeholder="Select date range"
          size="small"
          sx={{ 
            minWidth: '180px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              fontSize: '14px',
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDownIcon sx={{ color: '#9ca3af' }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Status Filter */}
        <FormControl size="small" sx={{ 
          minWidth: '110px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            fontSize: '14px',
          }
        }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            sx={{ fontSize: '14px' }}
          >
            <MenuItem value="All status">All status</MenuItem>
            <MenuItem value="Unresolved">Unresolved</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
            <MenuItem value="In progress">In progress</MenuItem>
          </Select>
        </FormControl>

        {/* Risk Level Filter */}
        <FormControl size="small" sx={{ 
          minWidth: '140px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            fontSize: '14px',
          }
        }}>
          <Select
            value={riskLevelFilter}
            onChange={(e) => setRiskLevelFilter(e.target.value)}
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

        {/* Filters Button */}
        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          onClick={handleFiltersMenuOpen}
          sx={{ 
            borderColor: '#d1d5db', 
            color: '#6b7280',
            borderRadius: '8px',
            fontSize: '14px',
            minWidth: '90px',
            '&:hover': {
              borderColor: '#9ca3af',
              bgcolor: '#f9fafb'
            }
          }}
        >
          Filters
        </Button>
      </Box>

      {/* Table */}
      <Card sx={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2 }}>
                  Date & Time
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2 }}>
                  Caller ID
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2 }}>
                  Primary Topic
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2 }}>
                  Risk level
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2 }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2 }}>
                  Action
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2 }}>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockVoicemails.map((voicemail) => (
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
                  <TableCell sx={{ py: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<CallBackIcon />}
                      onClick={() => handleCallBack(voicemail.id)}
                      sx={{ 
                        bgcolor: '#0d9488', 
                        '&:hover': { bgcolor: '#0f766e' },
                        minWidth: '100px',
                        fontSize: '12px',
                      }}
                    >
                      Call back
                    </Button>
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
            Page 1-10 of {totalItems} results
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
          <Select displayEmpty>
            <MenuItem value="">Priority</MenuItem>
            <MenuItem value="urgent">Urgent only</MenuItem>
            <MenuItem value="normal">Normal only</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <Select displayEmpty>
            <MenuItem value="">Duration</MenuItem>
            <MenuItem value="short">Less than 1 minute</MenuItem>
            <MenuItem value="medium">1-3 minutes</MenuItem>
            <MenuItem value="long">More than 3 minutes</MenuItem>
          </Select>
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          onClick={handleFiltersMenuClose}
          sx={{ bgcolor: '#0d9488', '&:hover': { bgcolor: '#0f766e' } }}
        >
          Apply Filters
        </Button>
      </Menu>
    </Box>
  );
};