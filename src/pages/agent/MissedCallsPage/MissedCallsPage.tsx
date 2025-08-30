// src/pages/agent/MissedCallsPage/MissedCallsPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
  Menu,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  Phone as CallBackIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface MissedCall {
  id: string;
  callerId: string;
  date: string;
  time: string;
  timeRange: string;
  callCount: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Missed' | 'Returned';
}

// Mock data - replace with actual API call
const mockMissedCalls: MissedCall[] = [
  {
    id: '2090',
    callerId: '#2090',
    date: 'Mon, July 13, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM',
    callCount: 3,
    riskLevel: 'Medium',
    status: 'Returned',
  },
  {
    id: '2246',
    callerId: '#2246',
    date: 'Mon, July 13, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    callCount: 8,
    riskLevel: 'Critical',
    status: 'Missed',
  },
  {
    id: '6043',
    callerId: '#6043',
    date: 'Mon, July 13, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    callCount: 1,
    riskLevel: 'Low',
    status: 'Missed',
  },
  {
    id: '2056',
    callerId: '#2056',
    date: 'Mon, July 13, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    callCount: 4,
    riskLevel: 'High',
    status: 'Missed',
  },
  {
    id: '1031',
    callerId: '#1031',
    date: 'Mon, July 13, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    callCount: 1,
    riskLevel: 'Low',
    status: 'Returned',
  },
  {
    id: '2031',
    callerId: '#2031',
    date: 'Mon, July 13, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    callCount: 1,
    riskLevel: 'Low',
    status: 'Returned',
  },
  {
    id: '1390',
    callerId: '#1390',
    date: 'Mon, July 13, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    callCount: 2,
    riskLevel: 'Medium',
    status: 'Returned',
  },
];

export const MissedCallsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('04/08/2025 - 04/09/2025');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [riskLevelFilter, setRiskLevelFilter] = useState('All risk levels');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersMenuAnchor, setFiltersMenuAnchor] = useState<null | HTMLElement>(null);

  const itemsPerPage = 10;
  const totalItems = 60; // Mock total
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleView = (callId: string) => {
    navigate(`/agent/call-review/${callId}`);
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
    return status === 'Returned' 
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
            <MenuItem value="Missed">Missed</MenuItem>
            <MenuItem value="Returned">Returned</MenuItem>
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
                  Call count
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
              </TableRow>
            </TableHead>
            <TableBody>
              {mockMissedCalls.map((call) => (
                <TableRow 
                  key={call.id} 
                  sx={{ 
                    '&:hover': { bgcolor: '#f9fafb' },
                    '&:not(:last-child)': { borderBottom: '1px solid #f3f4f6' },
                  }}
                >
                  <TableCell sx={{ py: 2 }}>
                    <Box>
                      <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                        {call.date}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {call.timeRange}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {call.callerId}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {call.callCount}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Chip
                      label={call.riskLevel}
                      size="small"
                      sx={{
                        ...getRiskLevelColor(call.riskLevel),
                        fontWeight: 500,
                        fontSize: '12px',
                        height: 24,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Chip
                      label={call.status}
                      size="small"
                      sx={{
                        ...getStatusColor(call.status),
                        fontWeight: 500,
                        fontSize: '12px',
                        height: 24,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ViewIcon />}
                        onClick={() => handleView(call.id)}
                        sx={{ 
                          borderColor: '#0d9488',
                          color: '#0d9488',
                          '&:hover': { 
                            bgcolor: '#f0fdfa',
                            borderColor: '#0d9488'
                          },
                          minWidth: '70px',
                          fontSize: '12px',
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<CallBackIcon />}
                        onClick={() => handleCallBack(call.id)}
                        sx={{ 
                          bgcolor: '#0d9488', 
                          '&:hover': { bgcolor: '#0f766e' },
                          minWidth: '100px',
                          fontSize: '12px',
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
          <InputLabel>Call Duration</InputLabel>
          <Select label="Call Duration">
            <MenuItem value="all">All durations</MenuItem>
            <MenuItem value="short">Less than 2 minutes</MenuItem>
            <MenuItem value="medium">2-10 minutes</MenuItem>
            <MenuItem value="long">More than 10 minutes</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Caller Type</InputLabel>
          <Select label="Caller Type">
            <MenuItem value="all">All types</MenuItem>
            <MenuItem value="patient">Patient</MenuItem>
            <MenuItem value="family">Family</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
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