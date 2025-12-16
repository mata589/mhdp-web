import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Chip,
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
  Menu as MenuIcon,
} from '@mui/icons-material';
import { SlideDialog, type FormField } from '../../../components/forms/SlideDialogform/SlideDialog';

export default function FacilityDetailsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [editFacilityDialogOpen, setEditFacilityDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Define fields for the Add/Edit User dialog
  const userFields: FormField[] = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter first name', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter last name', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address', gridColumn: '1 / -1', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+256 700 000 000', gridColumn: '1 / -1' },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      placeholder: 'Select gender',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      name: 'nationality',
      label: 'Nationality',
      type: 'select',
      placeholder: 'Select country',
      options: [
        { value: 'uganda', label: 'Uganda' },
        { value: 'kenya', label: 'Kenya' },
        { value: 'tanzania', label: 'Tanzania' },
      ],
    },
    { name: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter address', gridColumn: '1 / -1', rows: 2 },
  ];

  // Define fields for the Edit Facility dialog
  const facilityFields: FormField[] = [
    { 
      name: 'facilityName', 
      label: 'Facility Name', 
      type: 'text', 
      placeholder: 'Hospital', 
      gridColumn: '1 / -1',
      required: true 
    },
    { 
      name: 'facilityCode', 
      label: 'Facility Code', 
      type: 'text', 
      placeholder: 'Code',
      gridColumn: '1 / -1'
    },
    {
      name: 'facilityLevel',
      label: 'Facility Level',
      type: 'select',
      placeholder: 'Select level',
      options: [
        { value: 'referral', label: 'Referral Hospital' },
        { value: 'hc4', label: 'Health Center IV' },
        { value: 'hc3', label: 'Health Center III' },
        { value: 'hc2', label: 'Health Center II' },
      ],
      required: true
    },
    {
      name: 'hsd',
      label: 'Health Sub-District (HSD)',
      type: 'select',
      placeholder: 'Select HSD',
      options: [
        { value: 'nakawa', label: 'Nakawa' },
        { value: 'kawempe', label: 'Kawempe' },
        { value: 'makindye', label: 'Makindye' },
        { value: 'rubaga', label: 'Rubaga' },
        { value: 'central', label: 'Central' },
      ],
      required: true
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      placeholder: 'Select country',
      gridColumn: '1 / -1',
      options: [
        { value: 'uganda', label: 'Uganda' },
        { value: 'kenya', label: 'Kenya' },
        { value: 'tanzania', label: 'Tanzania' },
        { value: 'rwanda', label: 'Rwanda' },
      ],
      required: true
    },
    {
      name: 'district',
      label: 'District',
      type: 'select',
      placeholder: 'Select district',
      gridColumn: '1 / -1',
      options: [
        { value: 'kampala', label: 'Kampala' },
        { value: 'wakiso', label: 'Wakiso' },
        { value: 'mukono', label: 'Mukono' },
        { value: 'jinja', label: 'Jinja' },
      ],
      required: true
    },
    {
      name: 'subcounty',
      label: 'Subcounty',
      type: 'select',
      placeholder: 'Select subcounty',
      options: [
        { value: 'central', label: 'Central' },
        { value: 'kawempe', label: 'Kawempe' },
        { value: 'makindye', label: 'Makindye' },
        { value: 'nakawa', label: 'Nakawa' },
      ],
    },
    {
      name: 'county',
      label: 'County',
      type: 'select',
      placeholder: 'Select county',
      options: [
        { value: 'kampala', label: 'Kampala' },
        { value: 'busiro', label: 'Busiro' },
        { value: 'kyaddondo', label: 'Kyaddondo' },
      ],
    },
    {
      name: 'parish',
      label: 'Parish',
      type: 'select',
      placeholder: 'Select parish',
      options: [
        { value: 'parish1', label: 'Parish 1' },
        { value: 'parish2', label: 'Parish 2' },
        { value: 'parish3', label: 'Parish 3' },
      ],
    },
    {
      name: 'village',
      label: 'Village',
      type: 'select',
      placeholder: 'Select village',
      options: [
        { value: 'village1', label: 'Village 1' },
        { value: 'village2', label: 'Village 2' },
        { value: 'village3', label: 'Village 3' },
      ],
    },
  ];

  const handleBack = () => {
    console.log('Navigate back');
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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: any) => {
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
    console.log('Delete user:', selectedUser);
    handleMenuClose();
  };

  const confirmDelete = () => {
    console.log('Facility deleted');
    setDeleteDialogOpen(false);
  };

  const confirmArchive = () => {
    console.log('Facility archived');
    setArchiveDialogOpen(false);
  };

  const saveUser = (data: Record<string, any>) => {
    console.log('User saved:', data);
    setAddUserDialogOpen(false);
  };

  const updateUser = (data: Record<string, any>) => {
    console.log('User updated:', data);
    setEditUserDialogOpen(false);
  };

  const updateFacility = (data: Record<string, any>) => {
    console.log('Facility updated:', data);
    setEditFacilityDialogOpen(false);
  };

  const facilityDetails = [
    { label: 'Facility ID', value: 'FAC-UG-00123' },
    { label: 'Full Name', value: 'Butabika Hospital', hasIcon: true },
    { label: 'Facility Code', value: 'BU-HTL-01' },
    { label: 'Status', value: 'Inactive', isStatus: true },
    { label: 'Facility Level', value: 'Referral Hospital' },
    { label: 'Health Sub-District (HSD)', value: 'Nakawa HSD' },
    { label: 'Address', value: 'Butabika, Luzira, Nakawa' },
    { label: 'District', value: 'Kampala' },
    { label: 'Country', value: 'Uganda' },
    { label: 'Date Added', value: 'Mon, Jul 13, 2025 | 10:43 AM' },
  ];

  const userCounts = [
    { label: 'Total Users', count: 102, icon: '/Staff.png' },
    { label: 'Call Agents', count: 5, icon: '/Staff2.png' },
    { label: 'Supervisors', count: 7, icon: '/Staff3.png' },
    { label: 'Facility Admin', count: 1, icon: '/Staff4.png' },
  ];

  const users = [
    {
      id: 1,
      name: 'Mary Nambatya',
      email: 'marynmby@butabika.go.ug',
      phone: '+256 782 020 111',
      designation: 'Psychiatric Nurse',
      status: 'Inactive',
      avatar: 'M',
      avatarColor: '#00897b',
    },
    {
      id: 2,
      name: 'Mary Nambatya',
      email: 'marynmby@butabika.go.ug',
      phone: '+256 782 020 111',
      designation: 'Psychiatric Nurse',
      status: 'Active',
      avatar: 'M',
      avatarColor: '#00897b',
    },
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
        {/* Facility Information */}
        <Paper sx={{ p: 3, mb: 3 }}>
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
                        bgcolor: '#d32f2f',
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#d32f2f',
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
                        B
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
        </Paper>

        {/* User Count Section */}
        <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
          User count
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 4 }}>
          {userCounts.map((item, index) => (
            <Card key={index}>
              <CardContent>
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
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        sx={{
                          bgcolor: user.avatarColor,
                          width: 32,
                          height: 32,
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        {user.avatar}
                      </Avatar>
                      <Typography variant="body2">{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.designation}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: user.status === 'Active' ? '#2e7d32' : '#d32f2f',
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: user.status === 'Active' ? '#2e7d32' : '#d32f2f',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                        }}
                      >
                        {user.status}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, user)}>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Page 1-1 of 3 results
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" disabled>
              Previous
            </Button>
            <Button variant="outlined" size="small">
              Next
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Delete Dialog */}
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
            Are you sure you want to delete <strong>Butabika Hospital</strong> from the system? Please
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

      {/* Archive Dialog */}
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
            Are you sure you want to archive <strong>Butabika Hospital</strong>? You can restore this
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

      {/* Add User Dialog - Using SlideDialog Component */}
      <SlideDialog
        open={addUserDialogOpen}
        onClose={() => setAddUserDialogOpen(false)}
        title="Add Facility Admin"
        fields={userFields}
        onSave={saveUser}
        saveButtonText="Save"
      />

      {/* Edit User Dialog - Using SlideDialog Component */}
      <SlideDialog
        open={editUserDialogOpen}
        onClose={() => setEditUserDialogOpen(false)}
        title="Edit User"
        fields={userFields}
        onSave={updateUser}
        saveButtonText="Update"
      />

      {/* Edit Facility Dialog - Using SlideDialog Component */}
      <SlideDialog
        open={editFacilityDialogOpen}
        onClose={() => setEditFacilityDialogOpen(false)}
        title="Edit Facility"
        fields={facilityFields}
        onSave={updateFacility}
        saveButtonText="Update"
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
        <MenuItem onClick={handleDeleteUser} sx={{ color: '#d32f2f' }}>
          <DeleteIcon sx={{ mr: 1.5, fontSize: 18 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}