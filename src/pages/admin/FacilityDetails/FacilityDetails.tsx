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
  InputLabel,
} from '@mui/material';
import {
  ArrowBack,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Edit as EditIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface UserDetail {
  label: string;
  value: string;
  color?: string;
}

export default function UserDetailsPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);

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
    console.log('Edit user');
  };

  const handleAddUser = () => {
    setAddUserDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('User deleted');
    setDeleteDialogOpen(false);
  };

  const confirmArchive = () => {
    console.log('User archived');
    setArchiveDialogOpen(false);
  };

  const saveUser = () => {
    console.log('User saved');
    setAddUserDialogOpen(false);
  };

  const userDetails: UserDetail[] = [
    { label: 'User ID', value: 'US-UG-00123' },
    { label: 'Full Name', value: 'James Gipir' },
    { label: 'Status', value: 'Inactive', color: '#d32f2f' },
    { label: 'Phone', value: '+256 782 000 (1)' },
    { label: 'Gender', value: 'Male' },
    { label: 'Nationality', value: 'Ugandan' },
    { label: 'Designation', value: 'Peer Support Worker' },
    { label: 'Facility', value: 'Butabika Hospital' },
    { label: 'Address', value: 'Kawempe, Tula' },
    { label: 'Date Added', value: 'Mon, Jul 14, 2025 | 10:43 AM' },
    { label: 'Email', value: 'james.gipir@butabika.go.ug' },
    { label: 'Role', value: 'Call agent' },
    { label: 'Action by', value: 'Mary Nankya' },
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
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={handleBack} size="small">
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" fontWeight="500">
                User details
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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 3 ,bgcolor:'#F2FAFA'}}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
                
              },
              gap: 4,
              rowGap: 3,
            }}
          >
            {userDetails.map((detail, index) => (
              <Box key={index}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, fontSize: '0.75rem', fontWeight: 400 }}
                >
                  {detail.label}
                </Typography>
                {detail.label === 'Status' ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: detail.color || '#2e7d32',
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: detail.color || '#2e7d32',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                      }}
                    >
                      {detail.value}
                    </Typography>
                  </Box>
                ) : detail.label === 'Full Name' ? (
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

      {/* Add User Dialog */}
      <Dialog
        open={addUserDialogOpen}
        onClose={() => setAddUserDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            position: 'absolute',
            right: 0,
            top: 0,
            m: 0,
            height: '100vh',
            maxHeight: '100vh',
            borderRadius: 0,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => setAddUserDialogOpen(false)} size="small">
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" fontWeight="600">
              Add Facility Admin
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button onClick={() => setAddUserDialogOpen(false)} size="small">
              Close
            </Button>
            <Button
              onClick={saveUser}
              variant="contained"
              size="small"
              sx={{
                bgcolor: '#00897b',
                '&:hover': { bgcolor: '#00796b' },
              }}
            >
              Save
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                First Name
              </Typography>
              <TextField fullWidth placeholder="Enter first name" size="small" />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Last Name
              </Typography>
              <TextField fullWidth placeholder="Enter last name" size="small" />
            </Box>
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Email
              </Typography>
              <TextField fullWidth placeholder="Enter email address" size="small" type="email" />
            </Box>
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Phone Number
              </Typography>
              <TextField fullWidth placeholder="+256 700 000 000" size="small" />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Gender
              </Typography>
              <FormControl fullWidth size="small">
                <Select defaultValue="">
                  <MenuItem value="">Select gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Nationality
              </Typography>
              <FormControl fullWidth size="small">
                <Select defaultValue="">
                  <MenuItem value="">Select country</MenuItem>
                  <MenuItem value="uganda">Uganda</MenuItem>
                  <MenuItem value="kenya">Kenya</MenuItem>
                  <MenuItem value="tanzania">Tanzania</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Address
              </Typography>
              <TextField fullWidth placeholder="Enter address" size="small" multiline rows={2} />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}