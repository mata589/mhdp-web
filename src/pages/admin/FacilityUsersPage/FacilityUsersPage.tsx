import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  Search,
  MoreVert,
  Visibility,
  Edit,
  Archive,
  Delete,
  FilterList,
  Add,
  ChevronRight,
} from '@mui/icons-material';
import systemAdminApi from '../../../services/api/systemAdminApi';
import type {
  FacilityAdmin,
  UsersOverview,
  CreateFacilityAdminRequest,
  UpdateFacilityAdminRequest,
} from '../../../types/systemAdmin.types';
import { SlideDialog, type FormField } from '../../../components/forms/SlideDialogform/SlideDialog';
import { ConfirmationDialog } from '../../../components/common/Confirmationdialog/Confirmationdialog';


export default function FacilityUsersPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<FacilityAdmin | null>(null);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [archiveUserDialogOpen, setArchiveUserDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const navigate = useNavigate();

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [users, setUsers] = useState<FacilityAdmin[]>([]);
  const [overview, setOverview] = useState<UsersOverview | null>(null);

  // Fetch users overview
  const fetchOverview = async () => {
    try {
      const data = await systemAdminApi.getUsersOverview();
      setOverview(data);
    } catch (err) {
      console.error('Error fetching overview:', err);
      throw err;
    }
  };

  // Fetch all facility admins
  const fetchUsers = async () => {
    try {
      const isActiveFilter = statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined;
      
      const data = await systemAdminApi.searchFacilityAdmins(
        searchQuery || undefined,
        undefined, // No specific facility filter
        isActiveFilter,
        100, // Get more users
        0
      );
      
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
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
          fetchUsers(),
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Reload users when filters change
  useEffect(() => {
    if (!loading) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, statusFilter]);

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
      name: 'facility',
      label: 'Facility',
      type: 'facility',
      placeholder: 'Select facility',
      gridColumn: '1 / -1',
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
      type: 'email', 
      placeholder: 'Enter email address', 
      required: true 
    },
    { 
      name: 'contact', 
      label: 'Phone Number', 
      type: 'tel', 
      placeholder: 'Enter phone number',
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
      placeholder: 'Enter nationality',
      required: true
    },
    {
      name: 'facility',
      label: 'Facility',
      type: 'facility',
      placeholder: 'Select facility',
      required: true,
    },
    {
      name: 'is_active',
      label: 'Status',
      type: 'select',
      placeholder: 'Select status',
      options: [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' },
      ],
      required: true,
    },
    { 
      name: 'address', 
      label: 'Address', 
      type: 'textarea', 
      placeholder: 'Enter address', 
      gridColumn: 'span 2', 
      rows: 3,
      required: true
    },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: FacilityAdmin) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleViewUserDetails = () => {
    if (selectedUser) {
      navigate(`/admin/user-details/${selectedUser.user_id}`);
    }
    handleMenuClose();
  };

  const handleViewDetails = () => {
    if (selectedUser) {
      navigate(`/admin/admin/FacilityDetails/${selectedUser.facility_id}`);
    }
    handleMenuClose();
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

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;
    
    setActionLoading(true);
    try {
      await systemAdminApi.deleteFacilityAdmin(selectedUser.user_id);
      setDeleteUserDialogOpen(false);
      setSelectedUser(null);
      await fetchUsers();
      await fetchOverview();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    } finally {
      setActionLoading(false);
    }
  };

  const confirmArchiveUser = async () => {
    if (!selectedUser) return;
    
    setActionLoading(true);
    try {
      await systemAdminApi.archiveFacilityAdmin(selectedUser.user_id);
      setArchiveUserDialogOpen(false);
      setSelectedUser(null);
      await fetchUsers();
      await fetchOverview();
    } catch (err) {
      console.error('Error archiving user:', err);
      setError(err instanceof Error ? err.message : 'Failed to archive user');
    } finally {
      setActionLoading(false);
    }
  };

  const saveUser = async (data: Record<string, any>) => {
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
        facility_id: data.facility_id,
        address: data.address,
      };
      
      await systemAdminApi.createFacilityAdmin(userData);
      setAddUserDialogOpen(false);
      await fetchUsers();
      await fetchOverview();
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  };

  const updateUser = async (data: Record<string, any>) => {
    if (!selectedUser) return;

    try {
      // Ensure all required fields are present, using existing user data as fallback
      const userData: UpdateFacilityAdminRequest = {
        user_id: selectedUser.user_id,
        first_name: data.first_name || selectedUser.first_name,
        last_name: data.last_name || selectedUser.last_name,
        email: data.email || selectedUser.email,
        gender: data.gender || selectedUser.gender,
        nationality: data.nationality || selectedUser.nationality,
        contact: data.contact || selectedUser.contact,
        is_active: data.is_active === 'true' || data.is_active === true, // Convert string to boolean
        facility_id: data.facility_id || selectedUser.facility_id,
        address: data.address || selectedUser.address,
      };
      
      await systemAdminApi.updateFacilityAdmin(userData);
      setEditUserDialogOpen(false);
      setSelectedUser(null);
      await fetchUsers();
      await fetchOverview();
    } catch (err) {
      console.error('Error updating user:', err);
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
      facility_id: selectedUser.facility_id,
      is_active: selectedUser.is_active ? 'true' : 'false', // Convert boolean to string for select
      address: selectedUser.address,
    };
  };

  // Metrics configuration
  const metrics = [
    {
      title: 'Total Users',
      value: overview?.total_users.count.toString() || '0',
      iconPath: '/Staff.png',
    },
    {
      title: 'Active Users',
      value: overview?.active_users.count.toString() || '0',
      iconPath: '/Staff3.png',
    },
    {
      title: 'Inactive Users',
      value: overview?.inactive_users.count.toString() || '0',
      iconPath: '/Staff2.png',
    },
  ];

  if (error && loading) {
    return (
      <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{
            bgcolor: '#00897b',
            '&:hover': { bgcolor: '#00796b' },
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  const getUserFullName = () => {
    if (!selectedUser) return '';
    return `${selectedUser.first_name} ${selectedUser.last_name}`;
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {error && !loading && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <Card key={i} sx={{ flex: 1 }}>
                <CardContent>
                  <Skeleton variant="rectangular" height={80} />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          metrics.map((metric, index) => (
            <Card key={index} sx={{ flex: 1, cursor: 'pointer' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={metric.iconPath}
                      alt={metric.title}
                      style={{
                        width: '16px',
                        height: '16px',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {metric.title}
                  </Typography>
                  <ChevronRight sx={{ ml: 'auto', color: 'text.secondary', fontSize: 20 }} />
                </Box>
                <Typography variant="h4" fontWeight="600">
                  {metric.value}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>

      {/* Filters and Actions */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search name..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300, bgcolor: 'white' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 150, bgcolor: 'white' }}>
          <InputLabel>All status</InputLabel>
          <Select 
            label="All status" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          sx={{ textTransform: 'none', bgcolor: 'white' }}
        >
          Filters
        </Button>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setAddUserDialogOpen(true)}
          sx={{ 
            ml: 'auto', 
            textTransform: 'none',
            bgcolor: '#00897b',
            '&:hover': { bgcolor: '#00796b' }
          }}
        >
          Add user
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Roles</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 7 }).map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
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
                    <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                      {user.role_names.join(', ')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.is_active ? 'Active' : 'Inactive'}
                      size="small"
                      sx={{
                        bgcolor: user.is_active ? '#e8f5e9' : '#ffebee',
                        color: user.is_active ? '#2e7d32' : '#c62828',
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    />
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
      >
        <MenuItem onClick={handleViewUserDetails}>
          <Visibility sx={{ mr: 1, fontSize: 20 }} />
          View details
        </MenuItem>
        <MenuItem onClick={handleViewDetails}>
          <Visibility sx={{ mr: 1, fontSize: 20 }} />
          View facility details
        </MenuItem>
        <MenuItem onClick={handleEditUser}>
          <Edit sx={{ mr: 1, fontSize: 20 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleArchiveUser}>
          <Archive sx={{ mr: 1, fontSize: 20 }} />
          Archive
        </MenuItem>
        <MenuItem onClick={handleDeleteUser} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1, fontSize: 20 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteUserDialogOpen}
        onClose={() => {
          setDeleteUserDialogOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={confirmDeleteUser}
        title="Delete User"
        message={`Are you sure you want to delete ${getUserFullName()}? This action cannot be undone and will permanently remove all user data.`}
        confirmText="Delete User"
        cancelText="Cancel"
        variant="delete"
        userName={getUserFullName()}
        loading={actionLoading}
      />

      {/* Archive Confirmation Dialog */}
      <ConfirmationDialog
        open={archiveUserDialogOpen}
        onClose={() => {
          setArchiveUserDialogOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={confirmArchiveUser}
        title="Archive User"
        message={`Are you sure you want to archive ${getUserFullName()}? Archived users can be restored later if needed.`}
        confirmText="Archive User"
        cancelText="Cancel"
        variant="archive"
        userName={getUserFullName()}
        loading={actionLoading}
      />

      {/* Add User Dialog */}
      <SlideDialog
        open={addUserDialogOpen}
        onClose={() => setAddUserDialogOpen(false)}
        title="Add Facility Admin"
        fields={addUserFields}
        onSave={saveUser}
        saveButtonText="Create User"
      />

      {/* Edit User Dialog */}
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
    </Box>
  );
}