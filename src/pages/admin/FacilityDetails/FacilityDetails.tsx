import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  InputAdornment,
  Card,
  CardContent,
  Menu,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  ArrowBack,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Add,
  Search,
  FilterList,
  MoreVert,
} from '@mui/icons-material';
import { SlideDialog, type FormField } from '../../../components/forms/SlideDialogform/SlideDialog';
import systemAdminApi from '../../../services/api/systemAdminApi';
import type {
  Facility,
  FacilityAdmin,
  CreateFacilityAdminRequest,
  UpdateFacilityAdminRequest,
  UpdateFacilityRequest,
} from '../../../types/systemAdmin.types';

export default function FacilityDetailsPage() {
  const { facilityId } = useParams<{ facilityId: string }>();
  const navigate = useNavigate();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [editFacilityDialogOpen, setEditFacilityDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [archiveUserDialogOpen, setArchiveUserDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<FacilityAdmin | null>(null);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [facility, setFacility] = useState<Facility | null>(null);
  const [users, setUsers] = useState<FacilityAdmin[]>([]);
  const [userCounts, setUserCounts] = useState({
    total: 0,
    callAgents: 0,
    supervisors: 0,
    facilityAdmins: 0,
  });

  // Fetch facility details
  const fetchFacilityDetails = async () => {
    if (!facilityId) return;
    
    try {
      const data = await systemAdminApi.getFacility(facilityId);
      setFacility(data);
    } catch (err) {
      console.error('Error fetching facility:', err);
      throw err;
    }
  };

  // Fetch facility users
  const fetchUsers = async () => {
    if (!facilityId) return;
    
    setUsersLoading(true);
    try {
      const isActiveFilter = statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined;
      
      const data = await systemAdminApi.searchFacilityAdmins(
        searchQuery || undefined,
        facilityId,
        isActiveFilter,
        100, // Get more users for now, can add pagination later
        0
      );
      
      setUsers(data);
      
      // Calculate user counts by role
      const counts = {
        total: data.length,
        callAgents: data.filter(u => u.role_names.includes('Call Agent')).length,
        supervisors: data.filter(u => u.role_names.includes('Supervisor')).length,
        facilityAdmins: data.filter(u => u.role_names.includes('Facility Admin')).length,
      };
      setUserCounts(counts);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setUsersLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchFacilityDetails(),
          fetchUsers(),
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load facility details');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [facilityId]);

  // Reload users when filters change
  useEffect(() => {
    if (!loading) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, searchQuery]);

  // Define fields for the Add User dialog
  const addUserFields: FormField[] = [
    { 
      name: 'first_name', 
      label: 'First Name', 
      type: 'text', 
      placeholder: 'Enter first name', 
      required: true 
    },
    { 
      name: 'last_name', 
      label: 'Last Name', 
      type: 'text', 
      placeholder: 'Enter last name', 
      required: true 
    },
    { 
      name: 'email', 
      label: 'Email', 
      type: 'text', 
      placeholder: 'Enter email address', 
      gridColumn: '1 / -1', 
      required: true 
    },
    {
      name: 'password',
      label: 'Password',
      type: 'text',
      placeholder: 'Min 8 characters with uppercase, lowercase, and number',
      gridColumn: '1 / -1',
      required: true,
    },
    { 
      name: 'contact', 
      label: 'Phone Number', 
      type: 'tel', 
      placeholder: '+256 700 000 000', 
      gridColumn: '1 / -1',
      required: true
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
      required: true
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'text',
      placeholder: 'e.g., Ugandan',
      required: true
    },
    { 
      name: 'address', 
      label: 'Address', 
      type: 'textarea', 
      placeholder: 'Enter address', 
      gridColumn: '1 / -1', 
      rows: 2,
      required: true
    },
  ];

  // Define fields for the Edit User dialog (without password)
  const editUserFields: FormField[] = [
    { 
      name: 'first_name', 
      label: 'First Name', 
      type: 'text', 
      placeholder: 'Enter first name', 
      required: true 
    },
    { 
      name: 'last_name', 
      label: 'Last Name', 
      type: 'text', 
      placeholder: 'Enter last name', 
      required: true 
    },
    { 
      name: 'email', 
      label: 'Email', 
      type: 'text', 
      placeholder: 'Enter email address', 
      gridColumn: '1 / -1', 
      required: true 
    },
    { 
      name: 'contact', 
      label: 'Phone Number', 
      type: 'tel', 
      placeholder: '+256 700 000 000', 
      gridColumn: '1 / -1',
      required: true
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
      required: true
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'text',
      placeholder: 'e.g., Ugandan',
      required: true
    },
    { 
      name: 'address', 
      label: 'Address', 
      type: 'textarea', 
      placeholder: 'Enter address', 
      gridColumn: '1 / -1', 
      rows: 2,
      required: true
    },
  ];

  // Define fields for the Edit Facility dialog
  const facilityFields: FormField[] = [
    { 
      name: 'facility_name', 
      label: 'Facility Name', 
      type: 'text', 
      placeholder: 'Hospital', 
      gridColumn: '1 / -1',
      required: true 
    },
    { 
      name: 'code', 
      label: 'Facility Code (cannot be changed)', 
      type: 'text', 
      placeholder: 'Code',
      gridColumn: '1 / -1',
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

  const handleBack = () => {
    navigate('/admin/admin/FacilitiesManagement');
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleArchive = () => {
    setArchiveDialogOpen(true);
  };

  const handleEdit = () => {
    setEditFacilityDialogOpen(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: FacilityAdmin) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEditUser = () => {
    setEditUserDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteUser = () => {
    setDeleteUserDialogOpen(true);
    handleMenuClose();
  };

  const handleArchiveUser = () => {
    setArchiveUserDialogOpen(true);
    handleMenuClose();
  };

  const confirmDelete = async () => {
    if (!facilityId) return;
    
    try {
      await systemAdminApi.deleteFacility(facilityId);
      setDeleteDialogOpen(false);
      navigate('/admin/admin/FacilitiesManagement');
    } catch (err) {
      console.error('Error deleting facility:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete facility');
    }
  };

  const confirmArchive = async () => {
    if (!facilityId) return;
    
    try {
      await systemAdminApi.archiveFacility(facilityId);
      setArchiveDialogOpen(false);
      await fetchFacilityDetails();
    } catch (err) {
      console.error('Error archiving facility:', err);
      setError(err instanceof Error ? err.message : 'Failed to archive facility');
    }
  };

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      await systemAdminApi.deleteFacilityAdmin(selectedUser.user_id);
      setDeleteUserDialogOpen(false);
      setSelectedUser(null);
      await fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  const confirmArchiveUser = async () => {
    if (!selectedUser) return;
    
    try {
      await systemAdminApi.archiveFacilityAdmin(selectedUser.user_id);
      setArchiveUserDialogOpen(false);
      setSelectedUser(null);
      await fetchUsers();
    } catch (err) {
      console.error('Error archiving user:', err);
      setError(err instanceof Error ? err.message : 'Failed to archive user');
    }
  };

  const saveUser = async (data: Record<string, any>) => {
    if (!facilityId) return;

    try {
      const userData: CreateFacilityAdminRequest = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        gender: data.gender,
        nationality: data.nationality,
        contact: data.contact,
        is_active: true, // Default to active for new users
        facility_id: facilityId,
        address: data.address,
      };
      
      await systemAdminApi.createFacilityAdmin(userData);
      setAddUserDialogOpen(false);
      await fetchUsers();
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  };

  const updateUser = async (data: Record<string, any>) => {
    if (!selectedUser) return;

    try {
      const userData: UpdateFacilityAdminRequest = {
        user_id: selectedUser.user_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        gender: data.gender,
        nationality: data.nationality,
        contact: data.contact,
        is_active: selectedUser.is_active, // Keep existing status
        facility_id: selectedUser.facility_id,
        address: data.address,
      };
      
      await systemAdminApi.updateFacilityAdmin(userData);
      setEditUserDialogOpen(false);
      setSelectedUser(null);
      await fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  };

  const updateFacility = async (data: Record<string, any>) => {
    if (!facility || !facilityId) return;

    try {
      const facilityData: UpdateFacilityRequest = {
        facility_id: facilityId,
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
      
      await systemAdminApi.updateFacility(facilityData);
      setEditFacilityDialogOpen(false);
      await fetchFacilityDetails();
    } catch (err) {
      console.error('Error updating facility:', err);
      throw err;
    }
  };

  const getEditUserInitialValues = () => {
    if (!selectedUser) return {};
    
    return {
      first_name: selectedUser.first_name,
      last_name: selectedUser.last_name,
      email: selectedUser.email,
      contact: selectedUser.contact,
      gender: selectedUser.gender,
      nationality: selectedUser.nationality,
      address: selectedUser.address,
    };
  };

  const getEditFacilityInitialValues = () => {
    if (!facility) return {};
    
    return {
      facility_name: facility.facility_name,
      code: facility.code,
      level: facility.level,
      HSD: facility.HSD,
      country: facility.address.country,
      district: facility.address.district,
      sub_county: facility.address.sub_county || '',
      county: facility.address.county || '',
      parish: facility.address.parish || '',
      village: facility.address.village || '',
    };
  };

  if (error && loading) {
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

  const facilityDetails = facility ? [
    { label: 'Facility ID', value: facility.facility_id },
    { label: 'Full Name', value: facility.facility_name, hasIcon: true },
    { label: 'Facility Code', value: facility.code },
    { 
      label: 'Status', 
      value: facility.is_active ? 'Active' : 'Inactive', 
      isStatus: true,
      isActive: facility.is_active 
    },
    { label: 'Facility Level', value: facility.level },
    { label: 'Health Sub-District (HSD)', value: facility.HSD },
    { 
      label: 'Address', 
      value: [
        facility.address.village,
        facility.address.parish,
        facility.address.sub_county,
        facility.address.district,
      ].filter(Boolean).join(', ') || facility.address.district
    },
    { label: 'District', value: facility.address.district },
    { label: 'Country', value: facility.address.country },
    { 
      label: 'Date Added', 
      value: new Date(facility.date_created).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) + ' | ' + new Date(facility.date_created).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  ] : [];

  const userCountItems = [
    { label: 'Total Users', count: userCounts.total, icon: '/Staff.png' },
    { label: 'Call Agents', count: userCounts.callAgents, icon: '/Staff2.png' },
    { label: 'Supervisors', count: userCounts.supervisors, icon: '/Staff3.png' },
    { label: 'Facility Admin', count: userCounts.facilityAdmins, icon: '/Staff4.png' },
  ];

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid #e0e0e0',
          py: 2,
          px: 3,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={handleBack} size="small">
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" fontWeight="600">
                Facility details
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
                sx={{
                  bgcolor: '#d32f2f',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#c62828' },
                }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                startIcon={<ArchiveIcon />}
                onClick={handleArchive}
                sx={{
                  bgcolor: '#00897b',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#00796b' },
                }}
              >
                Archive
              </Button>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                sx={{
                  bgcolor: '#00897b',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#00796b' },
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {error && !loading && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Facility Information */}
        <Paper sx={{ p: 3, mb: 3 }}>
          {loading ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, rowGap: 3 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <Box key={i}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="80%" />
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 3,
                rowGap: 3,
              }}
            >
              {facilityDetails.map((detail, index) => (
                <Box key={index}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1, fontSize: '0.75rem', fontWeight: 400 }}
                  >
                    {detail.label}
                  </Typography>
                  {detail.isStatus ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: detail.isActive ? '#2e7d32' : '#d32f2f',
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          color: detail.isActive ? '#2e7d32' : '#d32f2f',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                        }}
                      >
                        {detail.value}
                      </Typography>
                    </Box>
                  ) : detail.hasIcon ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          bgcolor: '#00897b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                          }}
                        >
                          {detail.value.charAt(0).toUpperCase()}
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                        {detail.value}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body1" fontWeight="500" sx={{ fontSize: '0.875rem' }}>
                      {detail.value}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Paper>

        {/* User Count Section */}
        <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
          User count
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 4 }}>
          {userCountItems.map((item, index) => (
            <Card key={index}>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton variant="rectangular" width={40} height={40} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" height={40} />
                  </>
                ) : (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={item.icon}
                          alt={item.label}
                          style={{ width: 24, height: 24, objectFit: 'contain', filter: 'invert(1)' }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        {item.label}
                      </Typography>
                    </Box>
                    <Typography variant="h4" fontWeight="600">
                      {item.count}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Users Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="600">
            Users
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ bgcolor: 'white', width: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ fontSize: 20, color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 120, bgcolor: 'white' }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">All status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{ textTransform: 'none' }}
            >
              Filters
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setAddUserDialogOpen(true)}
              sx={{
                bgcolor: '#00897b',
                textTransform: 'none',
                '&:hover': { bgcolor: '#00796b' },
              }}
            >
              Add user
            </Button>
          </Box>
        </Box>

        {/* Users Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Designation</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 6 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No users found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.user_id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: '#00897b',
                            width: 32,
                            height: 32,
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                        >
                          {user.first_name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body2">
                          {user.first_name} {user.last_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.contact}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.designation_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: user.is_active ? '#2e7d32' : '#d32f2f',
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: user.is_active ? '#2e7d32' : '#d32f2f',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                          }}
                        >
                          {user.is_active ? 'Active' : 'Inactive'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, user)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {users.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {users.length} user{users.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
        )}
      </Container>

      {/* Delete Facility Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="600">
            Delete facility
          </Typography>
          <IconButton onClick={() => setDeleteDialogOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete <strong>{facility?.facility_name}</strong> from the system? Please
            proceed with caution. This action is irreversible.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete facility
          </Button>
        </DialogActions>
      </Dialog>

      {/* Archive Facility Dialog */}
      <Dialog
        open={archiveDialogOpen}
        onClose={() => setArchiveDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="600">
            Archive facility
          </Typography>
          <IconButton onClick={() => setArchiveDialogOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to archive <strong>{facility?.facility_name}</strong>? You can restore this
            facility anytime.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setArchiveDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={confirmArchive}
            variant="contained"
            sx={{
              bgcolor: '#00897b',
              '&:hover': { bgcolor: '#00796b' },
            }}
          >
            Archive facility
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog
        open={deleteUserDialogOpen}
        onClose={() => setDeleteUserDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="600">
            Delete user
          </Typography>
          <IconButton onClick={() => setDeleteUserDialogOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete <strong>{selectedUser?.first_name} {selectedUser?.last_name}</strong>? 
            This action is irreversible.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDeleteUserDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmDeleteUser} variant="contained" color="error">
            Delete user
          </Button>
        </DialogActions>
      </Dialog>

      {/* Archive User Dialog */}
      <Dialog
        open={archiveUserDialogOpen}
        onClose={() => setArchiveUserDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="600">
            Archive user
          </Typography>
          <IconButton onClick={() => setArchiveUserDialogOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to archive <strong>{selectedUser?.first_name} {selectedUser?.last_name}</strong>? 
            You can restore this user anytime.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setArchiveUserDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={confirmArchiveUser}
            variant="contained"
            sx={{
              bgcolor: '#00897b',
              '&:hover': { bgcolor: '#00796b' },
            }}
          >
            Archive user
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog - Using SlideDialog Component */}
      <SlideDialog
        open={addUserDialogOpen}
        onClose={() => setAddUserDialogOpen(false)}
        title="Add Facility Admin"
        fields={addUserFields}
        onSave={saveUser}
        saveButtonText="Create User"
      />

      {/* Edit User Dialog - Using SlideDialog Component */}
      <SlideDialog
        open={editUserDialogOpen}
        onClose={() => {
          setEditUserDialogOpen(false);
          setSelectedUser(null);
        }}
        title="Edit User"
        fields={editUserFields}
        onSave={updateUser}
        saveButtonText="Update User"
        initialValues={getEditUserInitialValues()}
      />

      {/* Edit Facility Dialog - Using SlideDialog Component */}
      <SlideDialog
        open={editFacilityDialogOpen}
        onClose={() => setEditFacilityDialogOpen(false)}
        title="Edit Facility"
        fields={facilityFields}
        onSave={updateFacility}
        saveButtonText="Update Facility"
        initialValues={getEditFacilityInitialValues()}
      />

      {/* User Actions Menu */}
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
      >
        <MenuItem onClick={handleEditUser}>
          <EditIcon sx={{ mr: 1.5, fontSize: 18 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleArchiveUser}>
          <ArchiveIcon sx={{ mr: 1.5, fontSize: 18 }} />
          Archive
        </MenuItem>
        <MenuItem onClick={handleDeleteUser} sx={{ color: '#d32f2f' }}>
          <DeleteIcon sx={{ mr: 1.5, fontSize: 18 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}