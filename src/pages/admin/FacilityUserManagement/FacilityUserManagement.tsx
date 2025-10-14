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

export default function FacilityDetailsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [addFacilityDialogOpen, setAddFacilityDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');

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
    console.log('Edit facility');
  };

  const confirmDelete = () => {
    console.log('Facility deleted');
    setDeleteDialogOpen(false);
  };

  const confirmArchive = () => {
    console.log('Facility archived');
    setArchiveDialogOpen(false);
  };

  const saveFacility = () => {
    console.log('Facility saved');
    setAddFacilityDialogOpen(false);
  };

  const saveUser = () => {
    console.log('User saved');
    setAddUserDialogOpen(false);
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
  { label: 'Total Users', count: 102, icon: '/Staff.png',},
  { label: 'Call Agents', count: 5, icon: '/Staff2.png',  },
  { label: 'Supervisors', count: 7, icon: '/Staff3.png', },
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
                    <IconButton size="small">
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

      {/* Add Facility Dialog */}
      <Dialog
        open={addFacilityDialogOpen}
        onClose={() => setAddFacilityDialogOpen(false)}
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
            <IconButton onClick={() => setAddFacilityDialogOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="600">
              Add Facility
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button onClick={() => setAddFacilityDialogOpen(false)} size="small">
              Close
            </Button>
            <Button
              onClick={saveFacility}
              variant="contained"
              size="small"
              sx={{
                bgcolor: '#00897b',
                '&:hover': { bgcolor: '#00796b' },
              }}
            >
              Continue
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Facility Name
              </Typography>
              <TextField fullWidth placeholder="Hospital" size="small" />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Facility Code
              </Typography>
              <TextField fullWidth placeholder="Code" size="small" />
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Facility Level
                </Typography>
                <FormControl fullWidth size="small">
                  <Select defaultValue="">
                    <MenuItem value="">Select level</MenuItem>
                    <MenuItem value="referral">Referral Hospital</MenuItem>
                    <MenuItem value="district">District Hospital</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Health Sub-District (HSD)
                </Typography>
                <FormControl fullWidth size="small">
                  <Select defaultValue="">
                    <MenuItem value="">Select HSD</MenuItem>
                    <MenuItem value="nakawa">Nakawa HSD</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 600, mt: 1 }}>
              Enter Address
            </Typography>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Country
              </Typography>
              <FormControl fullWidth size="small">
                <Select defaultValue="">
                  <MenuItem value="">Select country</MenuItem>
                  <MenuItem value="uganda">Uganda</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                District
              </Typography>
              <FormControl fullWidth size="small">
                <Select defaultValue="">
                  <MenuItem value="">Select district</MenuItem>
                  <MenuItem value="kampala">Kampala</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Subcounty
                </Typography>
                <FormControl fullWidth size="small">
                  <Select defaultValue="">
                    <MenuItem value="">Select subcounty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  County
                </Typography>
                <FormControl fullWidth size="small">
                  <Select defaultValue="">
                    <MenuItem value="">Select county</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Parish
                </Typography>
                <FormControl fullWidth size="small">
                  <Select defaultValue="">
                    <MenuItem value="">Select parish</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Village
                </Typography>
                <FormControl fullWidth size="small">
                  <Select defaultValue="">
                    <MenuItem value="">Select village</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </DialogContent>
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