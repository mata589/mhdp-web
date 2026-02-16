import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  MoreVert,
  Visibility,
  Edit,
  PersonAdd,
  Archive,
  Delete,
  FilterList,
  Add,
} from '@mui/icons-material';
import { MetricCard } from '../../../components/cards/MetricCard/MetricCard';
import CustomChip from '../../../components/common/CustomChip/CustomChip';
import { DataTable } from '../../../components/common/DataTable/DataTable';

// Import CustomSlideDialog and its FormField type
import systemAdminApi from '../../../services/api/systemAdminApi';
import type { 
  FacilitiesOverview, 
  FacilitiesListResponse,
  CreateFacilityRequest,
  UpdateFacilityRequest,
  CreateFacilityAdminRequest,
  Facility as FacilityFull,
} from '../../../types/systemAdmin.types';
import { SearchFilterBar } from '../../../components/common/SearchBar/SearchFilterBar';
import CustomSlideDialog, { type FormField } from '../../../components/forms/Customslidedialog/Customslidedialog';

interface Facility {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  level: string;
  location: string;
  hsd: string;
  dateCreated: string;
  time: string;
  avatar: string;
  avatarColor: string;
  avatarText: string;
}

export default function FacilitiesManagement() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [addFacilityDialogOpen, setAddFacilityDialogOpen] = useState(false);
  const [editFacilityDialogOpen, setEditFacilityDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);

  // Pagination and filters
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive' | undefined>(undefined);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [overview, setOverview] = useState<FacilitiesOverview | null>(null);
  const [facilitiesData, setFacilitiesData] = useState<FacilitiesListResponse | null>(null);

  // Fetch facilities overview
  const fetchOverview = async () => {
    try {
      const data = await systemAdminApi.getFacilitiesOverview();
      setOverview(data);
    } catch (err) {
      console.error('Error fetching overview:', err);
      throw err;
    }
  };

  // Fetch facilities list
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, statusFilter, searchQuery]);

  // Format facilities data for DataTable
  const facilities: Facility[] = facilitiesData?.results.map((facility) => ({
    id: facility.facility_id,
    name: facility.facility_name,
    status: facility.is_active ? 'Active' : 'Inactive',
    level: facility.level,
    location: `${facility.district}, ${facility.country}`,
    hsd: facility.HSD,
    dateCreated: new Date(facility.date_created).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    time: new Date(facility.date_created).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    avatar: facility.facility_name.charAt(0).toUpperCase(),
    avatarColor: facility.is_active ? '#E8F5E9' : '#FFEBEE',
    avatarText: facility.is_active ? '#2E7D32' : '#C62828',
  })) || [];

  // Define fields for the Add Facility dialog
  const addFacilityFields: FormField[] = [
    { 
      name: 'facility_name', 
      label: 'Facility Name', 
      type: 'text', 
      placeholder: 'Hospital', 
      gridColumn: '1 / -1',
      required: true,
      validation: {
        minLength: 3,
        maxLength: 100,
      },
    },
    { 
      name: 'code', 
      label: 'Facility Code', 
      type: 'text', 
      placeholder: 'Code',
      gridColumn: '1 / -1',
      required: true,
      validation: {
        pattern: /^[A-Z0-9-]+$/,
      },
      helperText: 'Use uppercase letters, numbers, and hyphens',
    },
    {
      name: 'level',
      label: 'Facility Level',
      type: 'select',
      placeholder: 'Select level',
      options: [
        { value: 'Referral Hospital', label: 'Referral Hospital' },
        { value: 'Health Center IV', label: 'Health Center IV' },
        { value: 'Health Center III', label: 'Health Center III' },
        { value: 'Health Center II', label: 'Health Center II' },
      ],
      required: true
    },
    {
      name: 'HSD',
      label: 'Health Sub-District (HSD)',
      type: 'text',
      placeholder: 'Enter HSD',
      required: true
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      placeholder: 'Country',
      gridColumn: '1 / -1',
      required: true
    },
    {
      name: 'district',
      label: 'District',
      type: 'text',
      placeholder: 'District',
      gridColumn: '1 / -1',
      required: true
    },
    {
      name: 'sub_county',
      label: 'Subcounty',
      type: 'text',
      placeholder: 'Subcounty',
    },
    {
      name: 'county',
      label: 'County',
      type: 'text',
      placeholder: 'County',
    },
    {
      name: 'parish',
      label: 'Parish',
      type: 'text',
      placeholder: 'Parish',
    },
    {
      name: 'village',
      label: 'Village',
      type: 'text',
      placeholder: 'Village',
    },
  ];

  // Define fields for the Edit Facility dialog
  const editFacilityFields: FormField[] = [
    { 
      name: 'facility_name', 
      label: 'Facility Name', 
      type: 'text', 
      gridColumn: '1 / -1',
      required: true,
    },
    { 
      name: 'code', 
      label: 'Facility Code', 
      type: 'text', 
      gridColumn: '1 / -1',
      required: true,
      disabled: true,
      helperText: 'Facility code cannot be changed',
    },
    {
      name: 'level',
      label: 'Facility Level',
      type: 'select',
      options: [
        { value: 'Referral Hospital', label: 'Referral Hospital' },
        { value: 'Health Center IV', label: 'Health Center IV' },
        { value: 'Health Center III', label: 'Health Center III' },
        { value: 'Health Center II', label: 'Health Center II' },
      ],
      required: true
    },
    {
      name: 'HSD',
      label: 'Health Sub-District (HSD)',
      type: 'text',
      required: true
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      gridColumn: '1 / -1',
      required: true
    },
    {
      name: 'district',
      label: 'District',
      type: 'text',
      gridColumn: '1 / -1',
      required: true
    },
    {
      name: 'is_active',
      label: 'Active Status',
      type: 'switch',
      gridColumn: '1 / -1',
    },
  ];

  // Define fields for the Add User dialog (Facility Admin)
  const addUserFields: FormField[] = [
    {
      name: 'first_name',
      label: 'First Name',
      type: 'text',
      placeholder: 'John',
      required: true,
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Doe',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john.doe@example.com',
      gridColumn: '1 / -1',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter secure password',
      gridColumn: '1 / -1',
      required: true,
      validation: {
        minLength: 8,
        custom: (value) => {
          if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            return 'Password must contain uppercase, lowercase, and number';
          }
          return null;
        },
      },
      helperText: 'Min 8 characters with uppercase, lowercase, and number',
    },
    {
      name: 'phone',
      label: 'Contact Number',
      type: 'tel',
      placeholder: '+256 700 000 000',
      gridColumn: '1 / -1',
      required: true,
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      placeholder: 'Select gender',
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
      ],
      required: true,
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'text',
      placeholder: 'e.g., Ugandan',
      required: true,
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      placeholder: 'Enter full address',
      gridColumn: '1 / -1',
      rows: 3,
      required: true,
    },
    {
      name: 'is_active',
      label: 'Activate account immediately',
      type: 'switch',
      gridColumn: '1 / -1',
      defaultValue: true,
    },
  ];

  const columns = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 200,
      renderCell: (value: string, row: Facility) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              bgcolor: row.avatarColor,
              color: row.avatarText,
              width: 36,
              height: 36,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {row.avatar}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#1F2937' }}>
            {value}
          </Typography>
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
      id: 'hsd',
      label: 'HSD',
      minWidth: 100,
    },
    {
      id: 'dateCreated',
      label: 'Date Created',
      minWidth: 150,
      renderCell: (value: string, row: Facility) => (
        <Box>
          <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
            {value}
          </Typography>
          <Typography variant="caption" sx={{ color: '#9CA3AF', fontSize: '0.75rem' }}>
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
      renderCell: (_value: any, row: Facility) => (
        <IconButton 
          size="small" 
          onClick={(e) => handleMenuOpen(e, row)}
          sx={{
            '&:hover': {
              bgcolor: '#F3F4F6',
            }
          }}
        >
          <MoreVert sx={{ fontSize: 20 }} />
        </IconButton>
      ),
    },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, facility: Facility) => {
    setAnchorEl(event.currentTarget);
    setSelectedFacility(facility);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFacility(null);
  };

  const handleViewDetails = () => {
    if (selectedFacility) {
      // Navigate to the facility details page
      navigate(`/admin/FacilityDetails/${selectedFacility.id}`);
      handleMenuClose();
    }
  };

  const handleEdit = async () => {
    if (!selectedFacility) return;
    
    try {
      // Fetch full facility details for editing (includes code and full address)
      const fullFacility = await systemAdminApi.getFacility(selectedFacility.id);
      
      // Store full facility data for the edit dialog
      setSelectedFacility({
        ...selectedFacility,
        fullData: fullFacility,
      } as any);
      
      setEditFacilityDialogOpen(true);
    } catch (err) {
      console.error('Error fetching facility details:', err);
    }
    handleMenuClose();
  };

  const handleAddUser = () => {
    setAddUserDialogOpen(true);
    handleMenuClose();
  };

  const handleArchive = async () => {
    if (selectedFacility) {
      try {
        await systemAdminApi.archiveFacility(selectedFacility.id);
        await fetchFacilities();
        await fetchOverview();
      } catch (err) {
        console.error('Error archiving facility:', err);
      }
    }
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (selectedFacility) {
      try {
        await systemAdminApi.deleteFacility(selectedFacility.id);
        await fetchFacilities();
        await fetchOverview();
      } catch (err) {
        console.error('Error deleting facility:', err);
      }
    }
    handleMenuClose();
  };

  const handleSaveFacility = async (data: Record<string, any>) => {
    try {
      const facilityData: CreateFacilityRequest = {
        facility_name: data.facility_name,
        code: data.code,
        level: data.level,
        HSD: data.HSD,
        sub_county: data.sub_county || '',
        district: data.district,
        county: data.county || '',
        parish: data.parish || '',
        village: data.village || '',
        country: data.country,
      };

      await systemAdminApi.createFacility(facilityData);
      
      // Refresh data
      await fetchFacilities();
      await fetchOverview();
    } catch (err) {
      console.error('Error creating facility:', err);
      throw err;
    }
  };

  const handleUpdateFacility = async (data: Record<string, any>) => {
    if (!selectedFacility) return;

    try {
      // Update facility API call - API expects UpdateFacilityRequest with facility_id
      const updateData: UpdateFacilityRequest = {
        facility_id: selectedFacility.id,
        facility_name: data.facility_name,
        code: data.code,
        level: data.level,
        HSD: data.HSD,
        sub_county: data.sub_county || '',
        district: data.district,
        county: data.county || '',
        parish: data.parish || '',
        village: data.village || '',
        country: data.country,
      };
      
      await systemAdminApi.updateFacility(updateData);
      
      // Refresh data
      await fetchFacilities();
      await fetchOverview();
    } catch (err) {
      console.error('Error updating facility:', err);
      throw err;
    }
  };

  const handleSaveUser = async (data: Record<string, any>) => {
    if (!selectedFacility) return;

    try {
      // Create facility admin API call
      const adminData: CreateFacilityAdminRequest = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        gender: data.gender,
        nationality: data.nationality,
        contact: data.phone,
        is_active: data.is_active ?? true,
        facility_id: selectedFacility.id,
        address: data.address,
      };
      
      await systemAdminApi.createFacilityAdmin(adminData);
      
      // Optionally refresh data or navigate
      console.log('Facility admin created successfully');
    } catch (err) {
      console.error('Error creating facility admin:', err);
      throw err;
    }
  };

  const handleStatusFilterChange = (value: string) => {
    if (value === 'all') {
      setStatusFilter(undefined);
    } else {
      setStatusFilter(value as 'active' | 'inactive');
    }
    setPage(0);
  };

  const filterOptions = [
    { value: 'all', label: 'All status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  // Get initial values for edit dialog
  const getEditInitialValues = () => {
    if (!selectedFacility) return {};
    
    // Check if we have full facility data (fetched in handleEdit)
    const fullData = (selectedFacility as any).fullData;
    
    if (fullData) {
      return {
        facility_name: fullData.facility_name,
        code: fullData.code,
        level: fullData.level,
        HSD: fullData.HSD,
        country: fullData.address.country,
        district: fullData.address.district,
        sub_county: fullData.address.sub_county || '',
        county: fullData.address.county || '',
        parish: fullData.address.parish || '',
        village: fullData.address.village || '',
      };
    }
    
    // Fallback: This shouldn't normally execute since handleEdit fetches fullData
    // But if it does, provide basic values (code will need to be fetched)
    const rawFacility = facilitiesData?.results.find(
      (f) => f.facility_id === selectedFacility.id
    );
    
    if (!rawFacility) return {};

    return {
      facility_name: rawFacility.facility_name,
      code: '', // FacilityItem doesn't have code field, will be populated by API fetch
      level: rawFacility.level,
      HSD: rawFacility.HSD,
      country: rawFacility.country,
      district: rawFacility.district,
      sub_county: '',
      county: '',
      parish: '',
      village: '',
    };
  };

  if (error) {
    return (
      <Box sx={{ p: 3, bgcolor: '#F9FAFB', minHeight: '100vh' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{
            bgcolor: '#0D9488',
            '&:hover': { bgcolor: '#0F766E' },
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <Box key={i} sx={{ flex: '1 1 calc(33.333% - 12px)', minWidth: '200px' }}>
                <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3 }} />
              </Box>
            ))}
          </>
        ) : (
          <>
            <Box sx={{ flex: '1 1 calc(33.333% - 12px)', minWidth: '200px' }}>
              <MetricCard
                title="Total Facilities"
                value={overview?.total_facilities.count.toString() || '0'}
                icon={<img src="/Staff.png" alt="Total" style={{ width: 24, height: 24 }} />}
                color="teal"
              />
            </Box>
            <Box sx={{ flex: '1 1 calc(33.333% - 12px)', minWidth: '200px' }}>
              <MetricCard
                title="Active Facilities"
                value={overview?.active_facilities.count.toString() || '0'}
                icon={<img src="/Staff3.png" alt="Active" style={{ width: 24, height: 24 }} />}
                color="green"
              />
            </Box>
            <Box sx={{ flex: '1 1 calc(33.333% - 12px)', minWidth: '200px' }}>
              <MetricCard
                title="Inactive Facilities"
                value={overview?.inactive_facilities.count.toString() || '0'}
                icon={<img src="/Staff2.png" alt="Inactive" style={{ width: 24, height: 24 }} />}
                color="red"
              />
            </Box>
          </>
        )}
      </Box>

      {/* Search and Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <SearchFilterBar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search name..."
          filterValue={statusFilter || 'all'}
          onFilterChange={handleStatusFilterChange}
          filterOptions={filterOptions}
        />
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          sx={{ 
            textTransform: 'none', 
            bgcolor: 'white',
            borderColor: '#E5E7EB',
            color: '#6B7280',
            borderRadius: 3,
            '&:hover': {
              bgcolor: '#F9FAFB',
              borderColor: '#D1D5DB',
            }
          }}
        >
          Filters
        </Button>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setAddFacilityDialogOpen(true)}
          sx={{ 
            ml: 'auto', 
            textTransform: 'none',
            bgcolor: '#0D9488',
            borderRadius: 3,
            '&:hover': { bgcolor: '#0F766E' },
            boxShadow: 'none',
          }}
        >
          Add facility
        </Button>
      </Box>

      {/* Table */}
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

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            borderRadius: 2,
            minWidth: 180,
          }
        }}
      >
        <MenuItem 
          onClick={handleViewDetails}
          sx={{ 
            fontSize: '0.875rem',
            py: 1,
            '&:hover': {
              bgcolor: '#F9FAFB',
            }
          }}
        >
          <Visibility sx={{ mr: 1.5, fontSize: 18, color: '#6B7280' }} />
          View details
        </MenuItem>
        <MenuItem 
          onClick={handleEdit}
          sx={{ 
            fontSize: '0.875rem',
            py: 1,
            '&:hover': {
              bgcolor: '#F9FAFB',
            }
          }}
        >
          <Edit sx={{ mr: 1.5, fontSize: 18, color: '#6B7280' }} />
          Edit
        </MenuItem>
        <MenuItem 
          onClick={handleAddUser}
          sx={{ 
            fontSize: '0.875rem',
            py: 1,
            '&:hover': {
              bgcolor: '#F9FAFB',
            }
          }}
        >
          <PersonAdd sx={{ mr: 1.5, fontSize: 18, color: '#6B7280' }} />
          Add user
        </MenuItem>
        <MenuItem 
          onClick={handleArchive}
          sx={{ 
            fontSize: '0.875rem',
            py: 1,
            '&:hover': {
              bgcolor: '#F9FAFB',
            }
          }}
        >
          <Archive sx={{ mr: 1.5, fontSize: 18, color: '#6B7280' }} />
          Archive
        </MenuItem>
        <MenuItem 
          onClick={handleDelete} 
          sx={{ 
            color: '#DC2626',
            fontSize: '0.875rem',
            py: 1,
            '&:hover': {
              bgcolor: '#FEF2F2',
            }
          }}
        >
          <Delete sx={{ mr: 1.5, fontSize: 18 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Add Facility Dialog */}
      <CustomSlideDialog
        open={addFacilityDialogOpen}
        onClose={() => setAddFacilityDialogOpen(false)}
        title="Add Facility"
        subtitle="Enter the facility details below"
        fields={addFacilityFields}
        onSave={handleSaveFacility}
        saveButtonText="Create Facility"
        width={600}
        gridColumns={2}
        validateOnChange={true}
      />

      {/* Edit Facility Dialog */}
      <CustomSlideDialog
        open={editFacilityDialogOpen}
        onClose={() => {
          setEditFacilityDialogOpen(false);
          setSelectedFacility(null);
        }}
        title="Edit Facility"
        subtitle="Update facility information"
        fields={editFacilityFields}
        onSave={handleUpdateFacility}
        saveButtonText="Update Facility"
        initialValues={getEditInitialValues()}
        width={600}
        gridColumns={2}
        validateOnChange={true}
      />

      {/* Add User Dialog */}
      <CustomSlideDialog
        open={addUserDialogOpen}
        onClose={() => {
          setAddUserDialogOpen(false);
          setSelectedFacility(null);
        }}
        title="Add User"
        subtitle={`Add a new user to ${selectedFacility?.name}`}
        fields={addUserFields}
        onSave={handleSaveUser}
        saveButtonText="Create User"
        width={500}
        gridColumns={2}
        validateOnChange={true}
      />
    </Box>
  );
}