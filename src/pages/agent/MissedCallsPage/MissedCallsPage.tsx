// src/pages/agent/MissedCallsPage/MissedCallsPage.tsx
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
  callerType: 'Patient' | 'Family' | 'Professional';
}

// Mock data - replace with actual API call (updated dates to November 2025)
const mockMissedCalls: MissedCall[] = [
  {
    id: '2090',
    callerId: '#2090',
    date: 'Fri, Nov 21, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    callCount: 3,
    riskLevel: 'Medium',
    status: 'Returned',
    callerType: 'Patient',
  },
  {
    id: '2246',
    callerId: '#2246',
    date: 'Fri, Nov 21, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    callCount: 8,
    riskLevel: 'Critical',
    status: 'Missed',
    callerType: 'Family',
  },
  {
    id: '6043',
    callerId: '#6043',
    date: 'Fri, Nov 21, 2025',
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    callCount: 1,
    riskLevel: 'Low',
    status: 'Missed',
    callerType: 'Professional',
  },
  {
    id: '2056',
    callerId: '#2056',
    date: 'Thu, Nov 20, 2025',
    time: '2:30 PM',
    timeRange: '2:30 PM - 2:45 PM',
    callCount: 4,
    riskLevel: 'High',
    status: 'Missed',
    callerType: 'Patient',
  },
  {
    id: '1031',
    callerId: '#1031',
    date: 'Thu, Nov 20, 2025',
    time: '2:30 PM',
    timeRange: '2:30 PM - 2:45 PM',
    callCount: 1,
    riskLevel: 'Low',
    status: 'Returned',
    callerType: 'Family',
  },
  {
    id: '2031',
    callerId: '#2031',
    date: 'Wed, Nov 19, 2025',
    time: '9:15 AM',
    timeRange: '9:15 AM - 9:30 AM',
    callCount: 1,
    riskLevel: 'Low',
    status: 'Returned',
    callerType: 'Professional',
  },
  {
    id: '1390',
    callerId: '#1390',
    date: 'Wed, Nov 19, 2025',
    time: '9:15 AM',
    timeRange: '9:15 AM - 9:30 AM',
    callCount: 2,
    riskLevel: 'Medium',
    status: 'Returned',
    callerType: 'Patient',
  },
  // Add more mock data to simulate 60 items
  ...Array.from({ length: 53 }, (_, i) => ({
    id: `mock-${i + 1}`,
    callerId: `#mock-${i + 1}`,
    date: ['Fri, Nov 21, 2025', 'Thu, Nov 20, 2025', 'Wed, Nov 19, 2025'][i % 3],
    time: '10:43 AM',
    timeRange: '10:43 AM - 10:51 AM',
    callCount: Math.floor(Math.random() * 10) + 1,
    riskLevel: (['Low', 'Medium', 'High', 'Critical'] as const)[i % 4],
    status: (['Missed', 'Returned'] as const)[i % 2],
    callerType: (['Patient', 'Family', 'Professional'] as const)[i % 3],
  })),
];

export const MissedCallsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('11/15/2025 - 11/22/2025');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [riskLevelFilter, setRiskLevelFilter] = useState('All risk levels');
  const [callCountFilter, setCallCountFilter] = useState('All call counts');
  const [callerTypeFilter, setCallerTypeFilter] = useState('All caller types');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersMenuAnchor, setFiltersMenuAnchor] = useState<null | HTMLElement>(null);
  const itemsPerPage = isMobile ? 5 : 10;

  // Filter logic
  const filteredMissedCalls = useMemo(() => {
    return mockMissedCalls.filter((call) => {
      // Search filter (by caller ID or call count as proxy for topic)
      const matchesSearch = call.callerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.callCount.toString().includes(searchQuery);
      // Status filter
      const matchesStatus = statusFilter === 'All status' || call.status === statusFilter;
      // Risk level filter
      const matchesRisk = riskLevelFilter === 'All risk levels' || call.riskLevel === riskLevelFilter;
      // Call count filter
      let matchesCallCount = true;
      if (callCountFilter !== 'All call counts') {
        if (callCountFilter === 'low') matchesCallCount = call.callCount < 3;
        else if (callCountFilter === 'medium') matchesCallCount = call.callCount >= 3 && call.callCount <= 6;
        else if (callCountFilter === 'high') matchesCallCount = call.callCount > 6;
      }
      // Caller type filter
      const matchesCallerType = callerTypeFilter === 'All caller types' || call.callerType === callerTypeFilter;
      // Date range filter (simplified - assume all match for demo)
      const matchesDate = true;
      return matchesSearch && matchesStatus && matchesRisk && matchesCallCount && matchesCallerType && matchesDate;
    });
  }, [searchQuery, statusFilter, riskLevelFilter, callCountFilter, callerTypeFilter, dateRange]);

  const totalItems = filteredMissedCalls.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMissedCalls = filteredMissedCalls.slice(startIndex, endIndex);

  const handleView = (callId: string) => {
    navigate(`/agent/call-review/${callId}`);
  };

  const handleCallBack = (callId: string) => {
    console.log('Calling back:', callId);
  };

  const getRiskLevelColor = (level: MissedCall['riskLevel']) => {
    switch (level) {
      case 'Critical':
        return { bgcolor: '#fee2e2', color: '#dc2626' };
      case 'High':
        return { bgcolor: '#fed7d7', color: '#ea580c' };
      case 'Medium':
        return { bgcolor: '#fef3c7', color: '#d97706' };
      case 'Low':
        return { bgcolor: '#d1fae5', color: '#059669' };
      default:
        return { bgcolor: '#f3f4f6', color: '#6b7280' };
    }
  };

  const getStatusColor = (status: MissedCall['status']) => {
    switch (status) {
      case 'Returned':
        return { bgcolor: '#dcfce7', color: '#059669' };
      case 'Missed':
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

  if (isMobile) {
    // Mobile: Card-based layout
    return (
      <Box sx={{ p: { xs: 1, sm: 3 }, maxWidth: '1400px', mx: 'auto' }}>
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
                <MenuItem value="Missed">Missed</MenuItem>
                <MenuItem value="Returned">Returned</MenuItem>
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

        {/* Missed Calls as Cards */}
        <Card sx={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          {paginatedMissedCalls.map((call) => (
            <Box
              key={call.id}
              sx={{
                p: 2,
                borderBottom: '1px solid #f3f4f6',
                '&:last-child': { borderBottom: 'none' },
                '&:hover': { bgcolor: '#f9fafb' }
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={2}>
                  <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
                    {call.date}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {call.timeRange}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography variant="body2" fontWeight={500}>
                    {call.callerId}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={1}>
                  <Typography variant="body2" fontWeight={500}>
                    {call.callCount}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
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
                </Grid>
                <Grid item xs={12} md={2}>
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
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-end' } }}>
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
              value={callCountFilter}
              onChange={(e) => setCallCountFilter(e.target.value as string)}
              displayEmpty
            >
              <MenuItem value="All call counts">All call counts</MenuItem>
              <MenuItem value="low">Less than 3</MenuItem>
              <MenuItem value="medium">3-6</MenuItem>
              <MenuItem value="high">More than 6</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <Select 
              value={callerTypeFilter}
              onChange={(e) => setCallerTypeFilter(e.target.value as string)}
              displayEmpty
            >
              <MenuItem value="All caller types">All caller types</MenuItem>
              <MenuItem value="Patient">Patient</MenuItem>
              <MenuItem value="Family">Family</MenuItem>
              <MenuItem value="Professional">Professional</MenuItem>
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
              <MenuItem value="Missed">Missed</MenuItem>
              <MenuItem value="Returned">Returned</MenuItem>
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
                <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2, whiteSpace: 'nowrap' }}>
                  Call count
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
              {paginatedMissedCalls.map((call) => (
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
            value={callCountFilter}
            onChange={(e) => setCallCountFilter(e.target.value as string)}
            displayEmpty
          >
            <MenuItem value="All call counts">All call counts</MenuItem>
            <MenuItem value="low">Less than 3</MenuItem>
            <MenuItem value="medium">3-6</MenuItem>
            <MenuItem value="high">More than 6</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <Select 
            value={callerTypeFilter}
            onChange={(e) => setCallerTypeFilter(e.target.value as string)}
            displayEmpty
          >
            <MenuItem value="All caller types">All caller types</MenuItem>
            <MenuItem value="Patient">Patient</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
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
