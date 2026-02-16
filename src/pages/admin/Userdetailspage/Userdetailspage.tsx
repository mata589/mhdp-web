import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Alert,
  Avatar,
  Chip,
} from '@mui/material';

import systemAdminApi from '../../../services/api/systemAdminApi';
import type { FacilityAdmin } from '../../../types/systemAdmin.types';
import { CallInfoCard, createChipValue } from '../../../components/common/CallInfoCard/CallInfoCard';
import { SlideDialog, type FormField } from '../../../components/forms/SlideDialogform/SlideDialog';
import { ConfirmationDialog } from '../../../components/common/Confirmationdialog/Confirmationdialog';

export default function UserDetailsPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<FacilityAdmin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch user by searching with no filters and finding the specific user
      const users = await systemAdminApi.searchFacilityAdmins(undefined, undefined, undefined, 100, 0);
      const foundUser = users.find(u => u.user_id === userId);
      
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError('User not found');
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
      setError(err instanceof Error ? err.message : 'Failed to load user details');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleArchiveClick = () => {
    setArchiveDialogOpen(true);
  };

  const handleArchiveConfirm = async () => {
    if (!userId) return;
    
    setActionLoading(true);
    try {
      await systemAdminApi.archiveFacilityAdmin(userId);
      navigate(-1);
    } catch (err) {
      console.error('Error archiving user:', err);
      alert('Failed to archive user');
    } finally {
      setActionLoading(false);
      setArchiveDialogOpen(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userId) return;
    
    setActionLoading(true);
    try {
      await systemAdminApi.deleteFacilityAdmin(userId);
      navigate(-1);
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    } finally {
      setActionLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleSaveEdit = async (data: Record<string, any>) => {
    if (!userId || !user) return;
    
    try {
      // Ensure all required fields are present, using existing user data as fallback
      await systemAdminApi.updateFacilityAdmin({
        user_id: userId,
        first_name: data.first_name || user.first_name,
        last_name: data.last_name || user.last_name,
        email: data.email || user.email,
        gender: data.gender || user.gender,
        nationality: data.nationality || user.nationality,
        contact: data.contact || user.contact,
        is_active: data.is_active === 'true' || data.is_active === true, // Convert string to boolean
        facility_id: data.facility_id || user.facility_id,
        address: data.address || user.address,
      });
      // Refresh user details after successful update
      await fetchUserDetails();
      setEditDialogOpen(false);
    } catch (err) {
      console.error('Error updating user:', err);
      throw err;
    }
  };

  const getStatusColors = (isActive: boolean) => {
    if (isActive) {
      return { bg: '#d1fae5', color: '#059669', border: '#a7f3d0' };
    } else {
      return { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' };
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px' 
      }}>
        <CircularProgress sx={{ color: '#00897b' }} />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'User not found'}
        </Alert>
      </Box>
    );
  }

  // Create the avatar with user initials
  const userInitial = user.first_name.charAt(0).toUpperCase();
  const fullName = (
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
        {userInitial}
      </Avatar>
      <span>{user.first_name} {user.last_name}</span>
    </Box>
  );

  // Create status chip
  const statusColors = getStatusColors(user.is_active);
  const statusChip = createChipValue(
    user.is_active ? 'Active' : 'Inactive',
    statusColors.bg,
    statusColors.color,
    statusColors.border
  );

  const fields = [
    { label: 'User ID', value: user.user_id.split('-')[0].toUpperCase() },
    { label: 'Full Name', value: fullName },
    { label: 'Status', value: statusChip },
    { label: 'Email', value: user.email },
    { label: 'Phone', value: user.contact },
    { label: 'Gender', value: user.gender },
    { label: 'Nationality', value: user.nationality },
    { label: 'Role', value: user.role_names.join(', ') || 'Call agent' },
    { label: 'Designation', value: user.designation_name },
    { label: 'Facility', value: user.facility_name },
    { label: 'Address', value: user.address },
    { label: 'Added by', value: user.created_by || 'System' },
    { label: 'Date Added', value: formatDate(user.date_created) },
  ];

  // Form fields for edit dialog
  const editFormFields: FormField[] = [
    {
      name: 'first_name',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter first name',
      required: true,
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter last name',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
      required: true,
    },
    {
      name: 'contact',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter phone number',
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
      placeholder: 'Enter nationality',
      required: true,
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
      required: true,
    },
  ];

  const userName = `${user.first_name} ${user.last_name}`;

  return (
    <>
      <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <CallInfoCard
          header={{
            title: 'User details',
            onBack: handleBack,
            actionButton: {
              label: 'Edit',
              icon: 'edit',
              variant: 'edit',
              onClick: handleEdit,
            },
            secondaryActions: [
              {
                label: 'Delete',
                icon: 'delete',
                variant: 'delete',
                onClick: handleDeleteClick,
              },
              {
                label: 'Archive',
                icon: 'archive',
                variant: 'archive',
                onClick: handleArchiveClick,
              },
            ],
          }}
          fields={fields}
          backgroundColor="#cce5e5"
          gridColumns={{ xs: 1, sm: 2, md: 4 }}
        />
      </Box>

      {/* Edit Dialog */}
      <SlideDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        title="Edit User"
        fields={editFormFields}
        onSave={handleSaveEdit}
        saveButtonText="Update"
        initialValues={{
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          contact: user.contact,
          gender: user.gender,
          nationality: user.nationality,
          facility_id: user.facility_id,
          is_active: user.is_active ? 'true' : 'false', // Convert boolean to string for select
          address: user.address,
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message={`Are you sure you want to delete ${userName}? This action cannot be undone and will permanently remove all user data.`}
        confirmText="Delete User"
        cancelText="Cancel"
        variant="delete"
        userName={userName}
        loading={actionLoading}
      />

      {/* Archive Confirmation Dialog */}
      <ConfirmationDialog
        open={archiveDialogOpen}
        onClose={() => setArchiveDialogOpen(false)}
        onConfirm={handleArchiveConfirm}
        title="Archive User"
        message={`Are you sure you want to archive ${userName}? Archived users can be restored later if needed.`}
        confirmText="Archive User"
        cancelText="Cancel"
        variant="archive"
        userName={userName}
        loading={actionLoading}
      />
    </>
  );
}