import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  Skeleton
} from '@mui/material';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  FilterList
} from '@mui/icons-material';
import CustomChip from '../../../components/common/CustomChip/CustomChip';
import { ViewButton } from '../../../components/common/ViewButton/ViewButton';
import supervisorApi from '../../../services/api/supervisorApi';
import type { StaffPerformance, StaffAvailabilitySummary } from '../../../types/supervisor.types';

/* ───────────── Skeletons ───────────── */
const StatCardSkeleton = () => (
  <Card sx={{ flex: 1, boxShadow: '0 0 2px rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: '8px' }} />
            <Skeleton width="60%" height={20} />
          </Box>
          <Skeleton width="40%" height={48} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton width={120} height={20} />
      </Box>
    </TableCell>
    <TableCell>
      <Skeleton width={80} height={24} sx={{ borderRadius: '12px' }} />
    </TableCell>
    <TableCell>
      <Box>
        <Skeleton width={140} height={20} sx={{ mb: 0.5 }} />
        <Skeleton width={80} height={16} />
      </Box>
    </TableCell>
    <TableCell sx={{ textAlign: 'center' }}>
      <Skeleton width={40} height={20} sx={{ margin: '0 auto' }} />
    </TableCell>
    <TableCell sx={{ textAlign: 'center' }}>
      <Skeleton width={40} height={20} sx={{ margin: '0 auto' }} />
    </TableCell>
    <TableCell sx={{ textAlign: 'center' }}>
      <Skeleton width={60} height={20} sx={{ margin: '0 auto' }} />
    </TableCell>
    <TableCell sx={{ textAlign: 'center' }}>
      <Skeleton width={60} height={32} sx={{ borderRadius: '6px', margin: '0 auto' }} />
    </TableCell>
  </TableRow>
);

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [statusFilter, setStatusFilter] = useState('All status');
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [staffData, setStaffData] = useState<StaffPerformance | null>(null);
  const [availabilityData, setAvailabilityData] = useState<StaffAvailabilitySummary | null>(null);
  
  const limit = 10;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [staffResponse, availabilityResponse] = await Promise.all([
        supervisorApi.getStaffPerformance(currentPage, limit),
        supervisorApi.getStaffAvailabilitySummary(),
      ]);
      setStaffData(staffResponse);
      setAvailabilityData(availabilityResponse);
    } catch (e: any) {
      setError(e.message);
      console.error('Error fetching staff data:', e);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      iconPath: '/Staff.png',
      label: 'Total Staff',
      value: availabilityData?.total_staff?.toString() || '0'
    },
    {
      iconPath: '/Staff2.png',
      label: 'On Call',
      value: availabilityData?.on_call?.toString() || '0'
    },
    {
      iconPath: '/Staff3.png',
      label: 'Available',
      value: availabilityData?.available?.toString() || '0'
    },
    {
      iconPath: '/Staff4.png',
      label: 'On Break',
      value: availabilityData?.on_break?.toString() || '0'
    }
  ];

  const getAvatarColor = (name: string): string => {
    const colors: { [key: string]: string } = {
      'M': '#CCE5E5',
      'J': '#FFE5B2',
      'S': '#DBE6F0',
      'F': '#FFE5B2',
      'B': '#CCE5E5',
      'A': '#DBE6F0',
    };
    const firstLetter = name.charAt(0).toUpperCase();
    return colors[firstLetter] || '#757575';
  };

  const getAvatarTextColor = (bgColor: string): string => {
    const colorMap: { [key: string]: string } = {
      '#CCE5E5': '#004242',
      '#FFE5B2': '#7A4100',
      '#DBE6F0': '#003768',
      '#757575': '#FFFFFF'
    };
    return colorMap[bgColor] || '#000000';
  };

  const mapStatusToChipFormat = (status: string): 'On Call' | 'Available' | 'On Break' => {
    const statusMap: { [key: string]: 'On Call' | 'Available' | 'On Break' } = {
      'available': 'Available',
      'on_call': 'On Call',
      'on_break': 'On Break',
      'busy': 'On Call',
    };
    return statusMap[status.toLowerCase()] || 'Available';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const filteredStaff = staffData?.staff?.filter(staff => {
    const matchesSearch = staff.agent_name.toLowerCase().includes(searchName.toLowerCase());
    const matchesStatus = statusFilter === 'All status' ||
                         mapStatusToChipFormat(staff.status) === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const totalPages = Math.ceil((staffData?.total_results || 0) / limit);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handler to navigate to staff details with agent_id
  const handleViewStaffDetails = (agentId: string) => {
    navigate(`/supervisor/staff-details/${agentId}`);
  };

  if (error) {
    return (
      <Box sx={{ p: 6, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
        <Button onClick={fetchData} sx={{ mt: 2 }}>Retry</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#f9fafb', minHeight: '100vh' }}>
      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          statsCards.map((card, index) => (
            <Card key={index} sx={{ flex: 1, boxShadow: '0 0 2px rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, mb: 1 }}>
                      <Box
                        sx={{
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 0.75
                        }}
                      >
                        <img
                          src={card.iconPath}
                          alt={card.label}
                          style={{
                            width: '24px',
                            height: '24px',
                            objectFit: 'contain'
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 500 }}>
                        {card.label}
                      </Typography>
                      <ChevronRight sx={{ fontSize: { xs: 14, sm: 16 }, color: 'text.secondary', ml: 'auto' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', sm: 'inherit' } }}>
                      {card.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* Main Content Card */}
      <Card sx={{ boxShadow: '0 0 2px rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)' }}>
        <CardContent>
          {/* Search and Filters */}
          <Box sx={{
            display: 'flex',
            gap: { xs: 1, sm: 2 },
            mb: 3,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' }
          }}>
            <TextField
              placeholder="Search name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              size="small"
              sx={{ flex: 1, width: { xs: '100%', sm: 250 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary', fontSize: { xs: 18, sm: 20 } }} />
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{ flex: { xs: 'none', sm: 1 } }} />
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 150 } }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
              >
                <MenuItem value="All status">All status</MenuItem>
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="On Call">On Call</MenuItem>
                <MenuItem value="On Break">On Break</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ textTransform: 'none', minWidth: { xs: '100%', sm: 'auto' } }}
            >
              Filters
            </Button>
          </Box>

          {/* Table */}
          <TableContainer sx={{
            overflowX: { xs: 'auto', sm: 'visible' },
            borderRadius: 1,
            border: '1px solid #e5e7eb'
          }}>
            <Table sx={{ minWidth: { xs: 600, sm: 'auto' } }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Last Active</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Calls</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Escalations</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Score</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <>
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                    <TableRowSkeleton />
                  </>
                ) : filteredStaff.length > 0 ? (
                  filteredStaff.map((staff, index) => (
                    <TableRow key={staff.agent_id} hover>
                      <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
                          <Avatar
                            sx={{
                              width: { xs: 32, sm: 40 },
                              height: { xs: 32, sm: 40 },
                              bgcolor: getAvatarColor(staff.agent_name),
                              color: getAvatarTextColor(getAvatarColor(staff.agent_name)),
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              fontWeight: 900
                            }}
                          >
                            {staff.agent_name.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.8125rem', sm: 'inherit' } }}>
                            {staff.agent_name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                        <CustomChip
                          label={mapStatusToChipFormat(staff.status)}
                          variant="status"
                          size="small"
                          showDot={true}
                        />
                      </TableCell>
                      <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 0, sm: 'inherit' } }}>
                          <Typography variant="body2" sx={{ color: 'text.primary', fontSize: { xs: '0.8125rem', sm: 'inherit' } }}>
                            {formatDate(staff.last_active)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: { xs: '0.6875rem', sm: 'inherit' } }}>
                            {formatTime(staff.last_active)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ p: { xs: 1, sm: 'inherit' }, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: 'inherit' } }}>
                          {staff.calls_handled}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ p: { xs: 1, sm: 'inherit' }, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: 'inherit' } }}>
                          {staff.escalations}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ p: { xs: 1, sm: 'inherit' }, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, sm: 0.5 } }}>
                          <Box
                            sx={{
                              width: { xs: 4, sm: 6 },
                              height: { xs: 4, sm: 6 },
                              borderRadius: '50%',
                              bgcolor: '#ffab00'
                            }}
                          />
                          <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: 'inherit' } }}>
                            {staff.quality_score}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ p: { xs: 1, sm: 'inherit' }, textAlign: 'center' }}>
                        <ViewButton
                          onClick={() => handleViewStaffDetails(staff.agent_id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography color="text.secondary">No staff members found</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8125rem', sm: 'inherit' } }}>
              Page {currentPage} of {totalPages || 1} ({staffData?.total_results || 0} results)
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'center', sm: 'flex-end' } }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ChevronLeft />}
                sx={{ textTransform: 'none', flex: { xs: 1, sm: 'unset' } }}
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || loading}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="small"
                endIcon={<ChevronRight />}
                sx={{ textTransform: 'none', flex: { xs: 1, sm: 'unset' } }}
                onClick={handleNextPage}
                disabled={currentPage === totalPages || loading}
              >
                Next
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StaffDashboard;