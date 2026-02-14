import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  Phone,
  Business,
  People,
  CheckCircle,
  MoreVert,
  FilterList,
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import { MetricCard } from '../../../components/cards/MetricCard/MetricCard';
import CustomChip from '../../../components/common/CustomChip/CustomChip';
import { DataTable } from '../../../components/common/DataTable/DataTable';
import systemAdminApi from '../../../services/api/systemAdminApi';
import type { SystemAdminOverview, FacilitiesListResponse } from '../../../types/systemAdmin.types';

export default function HealthcareDashboard() {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive' | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [overview, setOverview] = useState<SystemAdminOverview | null>(null);
  const [facilitiesData, setFacilitiesData] = useState<FacilitiesListResponse | null>(null);

  // Fetch overview data
  const fetchOverview = async () => {
    try {
      const data = await systemAdminApi.getOverview();
      setOverview(data);
    } catch (err) {
      console.error('Error fetching overview:', err);
      throw err;
    }
  };

  // Fetch facilities data
  const fetchFacilities = async () => {
    try {
      const data = await systemAdminApi.getFacilities(
        searchQuery || undefined,
        statusFilter,
        rowsPerPage,
        page * rowsPerPage
      );
      setFacilitiesData(data);
    } catch (err) {
      console.error('Error fetching facilities:', err);
      throw err;
    }
  };

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchOverview(),
          fetchFacilities(),
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Reload facilities when pagination or filters change
  useEffect(() => {
    if (!loading) {
      fetchFacilities();
    }
  }, [page, rowsPerPage, statusFilter, searchQuery]);

  // Format facilities data for DataTable
  const facilities = facilitiesData?.results.map((facility) => ({
    id: facility.facility_id,
    name: facility.facility_name,
    status: facility.is_active ? ('Active' as const) : ('Inactive' as const),
    level: facility.level,
    location: `${facility.district}, ${facility.country}`,
    hso: facility.HSD,
    dateCreated: new Date(facility.date_created).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    time: new Date(facility.date_created).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    avatar: facility.facility_name.charAt(0).toUpperCase(),
    avatarColor: facility.is_active ? '#E8F5E9' : '#FFEBEE',
    avatarText: facility.is_active ? '#2E7D32' : '#C62828',
  })) || [];

  const columns = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 200,
      renderCell: (value: string, row: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: row.avatarColor,
              color: row.avatarText,
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            {row.avatar}
          </Avatar>
          <Typography variant="body2">{value}</Typography>
        </Box>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      renderCell: (value: string) => (
        <CustomChip
          label={value}
          variant="status"
          size="small"
          showDot={true}
        />
      ),
    },
    {
      id: 'level',
      label: 'Level',
      minWidth: 150,
    },
    {
      id: 'location',
      label: 'Location',
      minWidth: 150,
    },
    {
      id: 'hso',
      label: 'HSO',
      minWidth: 100,
    },
    {
      id: 'dateCreated',
      label: 'Date Created',
      minWidth: 150,
      renderCell: (value: string, row: any) => (
        <Box>
          <Typography variant="body2">{value}</Typography>
          <Typography variant="caption" color="text.secondary">
            {row.time}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 80,
      align: 'center' as const,
      renderCell: () => (
        <IconButton size="small">
          <MoreVert fontSize="small" />
        </IconButton>
      ),
    },
  ];

  // Get metrics from overview data
  const getMetrics = () => {
    if (!overview) return [];

    return [
      {
        title: 'Calls Today',
        value: overview.calls_today.value.toString(),
        change: {
          value: Math.abs(overview.calls_today.percentage_change),
          type: overview.calls_today.percentage_change >= 0 ? 'increase' as const : 'decrease' as const,
          period: 'vs yesterday',
        },
        icon: <Phone sx={{ fontSize: 18 }} />,
        color: 'teal' as const,
      },
      {
        title: 'Total Facilities',
        value: overview.total_facilities.value.toString(),
        change: {
          value: Math.abs(overview.total_facilities.percentage_change),
          type: overview.total_facilities.percentage_change >= 0 ? 'increase' as const : 'decrease' as const,
          period: 'vs last month',
        },
        icon: <Business sx={{ fontSize: 18 }} />,
        color: 'blue' as const,
      },
      {
        title: 'Total Users',
        value: overview.total_users.value.toString(),
        change: {
          value: Math.abs(overview.total_users.percentage_change),
          type: overview.total_users.percentage_change >= 0 ? 'increase' as const : 'decrease' as const,
          period: 'vs last week',
        },
        icon: <People sx={{ fontSize: 18 }} />,
        color: 'purple' as const,
      },
      {
        title: 'Total Calls',
        value: overview.total_calls.value.toString(),
        change: {
          value: Math.abs(overview.total_calls.percentage_change),
          type: overview.total_calls.percentage_change >= 0 ? 'increase' as const : 'decrease' as const,
          period: 'vs last 30 days',
        },
        icon: <CheckCircle sx={{ fontSize: 18 }} />,
        color: 'green' as const,
      },
    ];
  };

  const handleStatusFilterChange = (value: string) => {
    if (value === 'all') {
      setStatusFilter(undefined);
    } else {
      setStatusFilter(value as 'active' | 'inactive');
    }
    setPage(0); // Reset to first page when filter changes
  };

  if (error) {
    return (
      <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{
            backgroundColor: '#00897B',
            '&:hover': {
              backgroundColor: '#00695C',
            },
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  const metrics = getMetrics();

  return (
    <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Hello, {`${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim() || 'Admin'}
        </Typography>
      </Box>

      {/* Stats Cards - Using MetricCard Component */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        {loading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Box key={i} sx={{ flex: '1 1 calc(25% - 12px)', minWidth: '200px' }}>
                <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3 }} />
              </Box>
            ))}
          </>
        ) : (
          metrics.map((metric, index) => (
            <Box key={index} sx={{ flex: '1 1 calc(25% - 12px)', minWidth: '200px' }}>
              <MetricCard {...metric} />
            </Box>
          ))
        )}
      </Box>

      {/* Facilities Table */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Facilities Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage all registered healthcare facilities
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={statusFilter || 'all'}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
                sx={{ backgroundColor: 'white' }}
              >
                <MenuItem value="all">All status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{
                textTransform: 'none',
                borderColor: '#E0E0E0',
                color: 'text.primary',
              }}
            >
              Filters
            </Button>
          </Box>
        </Box>

        <DataTable
          columns={columns}
          data={facilities}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={facilitiesData?.total || 0}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          isLoading={loading}
        />
      </Box>
    </Box>
  );
}