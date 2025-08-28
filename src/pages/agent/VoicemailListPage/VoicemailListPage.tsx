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
  Avatar,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Phone as CallBackIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Voicemail as VoicemailIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface VoicemailItem {
  id: string;
  callerId: string;
  date: string;
  time: string;
  timeRange: string;
  duration: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Unresolved' | 'Resolved';
  priority: 'urgent' | 'normal';
}

// Mock data - replace with actual API call
const mockVoicemails: VoicemailItem[] = [
  {
    id: '2031',
    callerId: '#2031',
    date: 'Mon, July 13, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 11:06 AM',
    duration: '2:18',
    riskLevel: 'Critical',
    status: 'Unresolved',
    priority: 'urgent',
  },
  {
    id: '2090',
    callerId: '#2090',
    date: 'Mon, July 13, 2025',
    time: '10:41 AM',
    timeRange: '10:41 AM - 10:44 AM',
    duration: '3:15',
    riskLevel: 'Medium',
    status: 'Resolved',
    priority: 'normal',
  },
  {
    id: '2246',
    callerId: '#2246',
    date: 'Mon, July 13, 2025',
    time: '10:39 AM',
    timeRange: '10:39 AM - 10:41 AM',
    duration: '1:47',
    riskLevel: 'High',
    status: 'Unresolved',
    priority: 'urgent',
  },
  {
    id: '6043',
    callerId: '#6043',
    date: 'Mon, July 13, 2025',
    time: '10:37 AM',
    timeRange: '10:37 AM - 10:38 AM',
    duration: '0:58',
    riskLevel: 'Low',
    status: 'Resolved',
    priority: 'normal',
  },
  {
    id: '2056',
    callerId: '#2056',
    date: 'Mon, July 13, 2025',
    time: '10:35 AM',
    timeRange: '10:35 AM - 10:37 AM',
    duration: '2:43',
    riskLevel: 'Medium',
    status: 'Unresolved',
    priority: 'normal',
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

  const itemsPerPage = 10;
  const totalItems = 45; // Mock total
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleViewVoicemail = (voicemailId: string) => {
    navigate(`/agent/voicemail/${voicemailId}`);
  };

  const handleCallBack = (callId: string) => {
    // Implement callback functionality
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
    return status === 'Resolved' 
      ? { bgcolor: '#dcfce7', color: '#059669' }
      : { bgcolor: '#fee2e2', color: '#dc2626' };
  };

  const handleFiltersMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFiltersMenuAnchor(event.currentTarget);
  };

  const handleFiltersMenuClose = () => {
    setFiltersMenuAnchor(null);
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <VoicemailIcon sx={{ mr: 2, color: '#0d9488' }} />
        <Typography variant="h5" fontWeight={600}>
          Voicemails
        </Typography>
        <Chip
          label={`${mockVoicemails.filter(v => v.status === 'Unresolved').length} Unresolved`}
          sx={{ 
            ml: 2, 
            bgcolor: '#fee2e2', 
            color: '#dc2626',
            fontWeight: 500,
          }}
        />
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1, p: 2 }}>
          <Typography variant="h4" fontWeight={700} color="#dc2626">
            {mockVoicemails.filter(v => v.priority === 'urgent').length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Urgent Voicemails
          </Typography>
        </Card>
        <Card sx={{ flex: 1, p: 2 }}>
          <Typography variant="h4" fontWeight={700} color="#0d9488">
            {mockVoicemails.length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Today
          </Typography>
        </Card>
        <Card sx={{ flex: 1, p: 2 }}>
          <Typography variant="h4" fontWeight={700} color="#059669">
            {mockVoicemails.filter(v => v.status === 'Resolved').length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Resolved
          </Typography>
        </Card>
        <Card sx={{ flex: 1, p: 2 }}>
          <Typography variant="h4" fontWeight={700} color="#6b7280">
            {Math.floor(mockVoicemails.reduce((acc, v) => {
              const [min, sec] = v.duration.split(':').map(Number);
              return acc + (min * 60 + sec);
            }, 0) / 60)}m
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Avg. Duration
          </Typography>
        </Card>
      </Box>

      {/* Filters Bar */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3, 
        flexWrap: 'wrap',
        alignItems: 'center',
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
          sx={{ minWidth: 300 }}
          size="small"
        />

        {/* Date Range */}
        <TextField
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          placeholder="Select date range"
          size="small"
          sx={{ minWidth: 200 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDownIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Status Filter */}
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="All status">All status</MenuItem>
            <MenuItem value="Unresolved">Unresolved</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </Select>
        </FormControl>

        {/* Risk Level Filter */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={riskLevelFilter}
            onChange={(e) => setRiskLevelFilter(e.target.value)}
            displayEmpty
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
          sx={{ borderColor: '#e5e7eb', color: '#374151' }}
        >
          Filters
        </Button>
      </Box>

      {/* Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>
                  Voicemail
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>
                  Date & Time
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>
                  Duration
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>
                  Risk Level
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockVoicemails.map((voicemail) => (
                <TableRow 
                  key={voicemail.id} 
                  sx={{ 
                    '&:hover': { bgcolor: '#f9fafb' },
                    borderLeft: voicemail.priority === 'urgent' ? '3px solid #dc2626' : 'none',
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          bgcolor: voicemail.priority === 'urgent' ? '#dc2626' : '#0d9488',
                          fontSize: '14px'
                        }}
                      >
                        <VoicemailIcon fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          Voicemail {voicemail.callerId}
                        </Typography>
                        {voicemail.priority === 'urgent' && (
                          <Chip
                            label="URGENT"
                            size="small"
                            sx={{ 
                              bgcolor: '#fee2e2', 
                              color: '#dc2626', 
                              fontSize: '10px',
                              height: 16,
                              mt: 0.5,
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {voicemail.date}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {voicemail.timeRange}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {voicemail.duration}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={voicemail.riskLevel}
                      size="small"
                      sx={{
                        ...getRiskLevelColor(voicemail.riskLevel),
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={voicemail.status}
                      size="small"
                      sx={{
                        ...getStatusColor(voicemail.status),
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ViewIcon />}
                        onClick={() => handleViewVoicemail(voicemail.id)}
                        sx={{ 
                          borderColor: '#0d9488', 
                          color: '#0d9488',
                          '&:hover': { borderColor: '#0f766e', bgcolor: '#f0fdfa' }
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<CallBackIcon />}
                        onClick={() => handleCallBack(voicemail.id)}
                        sx={{ 
                          bgcolor: '#0d9488', 
                          '&:hover': { bgcolor: '#0f766e' }
                        }}
                      >
                        Call back
                      </Button>
                    </Box>
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
          p: 2,
          borderTop: '1px solid #e5e7eb',
        }}>
          <Typography variant="body2" color="text.secondary">
            Page {currentPage}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              sx={{ borderColor: '#e5e7eb', color: '#374151' }}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              sx={{ borderColor: '#e5e7eb', color: '#374151' }}
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