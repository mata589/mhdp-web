// src/pages/agent/CallHistory/CallHistory.tsx
import React, { useState } from 'react';
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
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { ActionButtonsGroup } from '../../../components/common/ActionButtonsGroup/ActionButtonsGroup';
import { CallDetailsPage } from '../../../components/common/CallDetailsPage';
import { CallRecordingPlayer } from '../../../components/common/CallRecordingPlayer';



const mockCallHistory = [
  {
    id: '#2090',
    dateTime: 'Mon, July 13, 2025\n10:41 AM - 10:51 AM',
    callerID: '#2090\nEnglish',
    primaryTopic: 'Anxiety Management',
    riskLevel: 'medium',
    outcome: 'Advice Given',
    qualityScore: 78,
    duration: '10:15',
    recordingUrl: 'https://example.com/recording-2090.mp3'
  },
  {
    id: '#2031',
    dateTime: 'Mon, July 13, 2025\n10:43 AM - 10:51 AM',
    callerID: '#2031\nEnglish',
    primaryTopic: 'Depression',
    riskLevel: 'high',
    outcome: 'Escalated',
    qualityScore: 81,
    duration: '8:12',
    recordingUrl: 'https://example.com/recording-2031.mp3'
  },
  {
    id: '#2034',
    dateTime: 'Mon, July 13, 2025\n10:41 AM - 10:51 AM',
    callerID: '#2034\nLuganda',
    primaryTopic: 'Psychosis',
    riskLevel: 'low',
    outcome: 'Advice Given',
    qualityScore: 78,
    duration: '15:30',
    recordingUrl: 'https://example.com/recording-2034.mp3'
  },
  {
    id: '#2031-2',
    dateTime: 'Mon, July 13, 2025\n10:41 AM - 10:51 AM',
    callerID: '#2031\nEnglish',
    primaryTopic: 'Anxiety Management',
    riskLevel: 'medium',
    outcome: 'Referred',
    qualityScore: 78,
    duration: '7:45',
    recordingUrl: 'https://example.com/recording-2031-2.mp3'
  },
  {
    id: '#2063',
    dateTime: 'Mon, July 13, 2025\n10:41 AM - 10:51 AM',
    callerID: '#2063\nEnglish',
    primaryTopic: 'Anxiety Management',
    riskLevel: 'high',
    outcome: 'Advice Given',
    qualityScore: 78,
    duration: '12:20',
    recordingUrl: 'https://example.com/recording-2063.mp3'
  },
  {
    id: '#2031-3',
    dateTime: 'Mon, July 13, 2025\n10:43 AM - 10:51 AM',
    callerID: '#2031\nEnglish',
    primaryTopic: 'Depression',
    riskLevel: 'low',
    outcome: 'Referred',
    qualityScore: 78,
    duration: '9:55',
    recordingUrl: 'https://example.com/recording-2031-3.mp3'
  },
  {
    id: '#2012',
    dateTime: 'Mon, July 13, 2025\n10:43 AM - 10:51 AM',
    callerID: '#2012\nEnglish',
    primaryTopic: 'Psychosis',
    riskLevel: 'medium',
    outcome: 'Advice Given',
    qualityScore: 78,
    duration: '11:40',
    recordingUrl: 'https://example.com/recording-2012.mp3'
  },
];

const getRiskLevelColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'high':
    case 'critical':
      return { dotColor: '#dc2626', textColor: '#dc2626', label: 'High' };
    case 'medium':
      return { dotColor: '#d97706', textColor: '#d97706', label: 'Medium' };
    case 'low':
      return { dotColor: '#16a34a', textColor: '#16a34a', label: 'Low' };
    default:
      return { dotColor: '#6b7280', textColor: '#6b7280', label: 'Unknown' };
  }
};

const getOutcomeChipProps = (outcome: string) => {
  switch (outcome) {
    case 'Advice Given':
      return { 
        sx: { 
          bgcolor: '#f0fdf4', 
          color: '#16a34a', 
          border: '1px solid #bbf7d0',
          '& .MuiChip-label': { fontWeight: 500 }
        } 
      };
    case 'Escalated':
      return { 
        sx: { 
          bgcolor: '#fef2f2', 
          color: '#dc2626', 
          border: '1px solid #fecaca',
          '& .MuiChip-label': { fontWeight: 500 }
        } 
      };
    case 'Referred':
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

const getQualityScoreColor = (score: number) => {
  if (score >= 80) return '#16a34a';
  if (score >= 60) return '#d97706';
  return '#dc2626';
};

export const CallHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [languageFilter, setLanguageFilter] = useState('All languages');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [playingCallId, setPlayingCallId] = useState<string | null>(null);
  const itemsPerPage = 10;

  // If a call is selected, show the call details page
  if (selectedCallId) {
    return (
      <CallDetailsPage
        callId={selectedCallId}
        onBack={() => setSelectedCallId(null)}
      />
    );
  }

  const filteredCalls = mockCallHistory.filter(call => {
    const matchesSearch = call.callerID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.primaryTopic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCalls = filteredCalls.slice(startIndex, startIndex + itemsPerPage);

  const handleViewCall = (callId: string) => {
    setSelectedCallId(callId);
  };

  const handlePlayCall = (callId: string) => {
    setPlayingCallId(callId);
  };

  const handleClosePlayer = () => {
    setPlayingCallId(null);
  };

  // Find the call being played
  const playingCall = mockCallHistory.find(call => call.id === playingCallId);

  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Call Recording Player Popup */}
      {playingCallId && playingCall && (
        <CallRecordingPlayer
          callId={playingCallId}
          duration={`0:00 / ${playingCall.duration}`}
          recordingUrl={playingCall.recordingUrl}
          isPopup={true}
          open={true}
          onClose={handleClosePlayer}
        />
      )}

      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
          Call history
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Search by caller ID, agent or topic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: 1,
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
        
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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
            <MenuItem value="All status">All status</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Escalated">Escalated</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <Select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
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
            <MenuItem value="All languages">All languages</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Luganda">Luganda</MenuItem>
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
            '&:hover': {
              bgcolor: '#f9fafb',
            },
          }}
        >
          More Filters
        </Button>
      </Box>

      {/* Call History Table */}
      <Paper sx={{ overflow: 'hidden', borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Date & Time
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Caller ID
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Primary Topic
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Risk level
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Outcome
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Quality Score
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedCalls.map((call) => {
                const riskStyle = getRiskLevelColor(call.riskLevel);
                const outcomeProps = getOutcomeChipProps(call.outcome);
                const scoreColor = getQualityScoreColor(call.qualityScore);
                
                return (
                  <TableRow 
                    key={call.id} 
                    sx={{ 
                      '&:hover': { bgcolor: '#f9fafb' },
                      borderBottom: '1px solid #f3f4f6',
                    }}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: '14px', 
                          color: '#111827', 
                          whiteSpace: 'pre-line',
                          lineHeight: 1.4 
                        }}
                      >
                        {call.dateTime}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: '14px', 
                          color: '#111827', 
                          whiteSpace: 'pre-line',
                          lineHeight: 1.4 
                        }}
                      >
                        {call.callerID}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#111827' }}>
                        {call.primaryTopic}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: riskStyle.dotColor,
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ fontSize: '14px', color: riskStyle.textColor }}
                        >
                          {riskStyle.label}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2 }}>
                      <Chip
                        label={call.outcome}
                        size="small"
                        variant="outlined"
                        {...outcomeProps}
                      />
                    </TableCell>
                    
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: scoreColor,
                          }}
                        />
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#111827' }}>
                          {call.qualityScore}%
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2 }}>
                      <ActionButtonsGroup
                        onPlay={() => handlePlayCall(call.id)}
                        onView={() => handleViewCall(call.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '14px' }}>
          Page 1-{Math.min(itemsPerPage, filteredCalls.length)} of {filteredCalls.length} results
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
    </Box>
  );
};