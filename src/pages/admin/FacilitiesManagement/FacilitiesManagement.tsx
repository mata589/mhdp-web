import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  Drawer
} from '@mui/material';
import {
  MoreHorizontal as MoreVert,
  Plus as Add,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import CustomChip from '../../../components/common/CustomChip/CustomChip';

const FacilitiesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const facilities = [
    {
      id: 1,
      name: 'Butabika Hospital',
      status: 'Available' as const,
      level: 'Referral Hospital',
      location: 'Kampala, Uganda',
      hsd: 'Nakawa',
      dateCreated: 'Mon, July 13, 2025',
      time: '10:43 AM',
      avatar: 'B',
      avatarColor: '#E8F5E9',
      textColor: '#2E7D32'
    },
    {
      id: 2,
      name: 'Mirembe Hospital',
      status: 'Break' as const,
      level: 'Health Center IV',
      location: 'Dodoma, Tanzania',
      hsd: 'Dodoma',
      dateCreated: 'Mon',
      time: '10:4',
      avatar: 'M',
      avatarColor: '#FFF3E0',
      textColor: '#E65100'
    }
  ];

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All status' || facility.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, facility: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedFacility(facility);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFacility(null);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f9fafb', minHeight: '100vh', ml: -8 }}>
      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {[
          {
            title: 'Total Facilities',
            value: facilities.length,
            icon: '/vien.png'
          },
          {
            title: 'Active Facilities',
            value: facilities.filter((f) => f.status === 'Available').length,
            icon: '/vien1.png'
          },
          {
            title: 'Inactive Facilities',
            value: facilities.filter((f) => f.status === 'Break').length,
            icon: '/vien2.png'
          }
        ].map((item, i) => (
          <Card key={i} sx={{ flex: 1, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img src={item.icon} alt={item.title} style={{ width: 20, height: 20 }} />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {item.title}
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Search & Filter */}
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            placeholder="Search facilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              width: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src="/search.png"
                    alt="search"
                    style={{ width: 18, height: 18, opacity: 0.6 }}
                  />
                </InputAdornment>
              )
            }}
          />

          <FormControl size="small">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ borderRadius: 2, minWidth: 150 }}
            >
              <MenuItem value="All status">All status</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Busy">Busy</MenuItem>
              <MenuItem value="Break">Break</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<Filter size={16} />}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Filters
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            variant="contained"
            startIcon={<Add size={16} />}
            sx={{
              bgcolor: '#00695C',
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': { bgcolor: '#004D40' }
            }}
            onClick={handleDrawerOpen}
          >
            Add facility
          </Button>
        </CardContent>
      </Card>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              {['Name', 'Status', 'Level', 'Location', 'HSD', 'Date Created', 'Action'].map(
                (header) => (
                  <TableCell key={header}>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary">
                      {header}
                    </Typography>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFacilities.length > 0 ? (
              filteredFacilities.map((facility) => (
                <TableRow key={facility.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: facility.avatarColor,
                          color: facility.textColor,
                          fontWeight: 600,
                          fontSize: 14
                        }}
                      >
                        {facility.avatar}
                      </Box>
                      <Typography variant="body2">{facility.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <CustomChip
                      label={facility.status}
                      variant="status"
                      size="small"
                      showDot={true}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{facility.level}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{facility.location}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{facility.hsd}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{facility.dateCreated}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {facility.time}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuClick(e, facility)}>
                      <MoreVert size={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No facilities found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuItem>👁 View details</MenuItem>
        <MenuItem>✏ Edit</MenuItem>
        <MenuItem>➕ Add user</MenuItem>
        <Box sx={{ borderTop: '1px solid #e0e0e0', my: 1 }} />
        <MenuItem>📦 Archive</MenuItem>
        <MenuItem sx={{ color: 'error.main' }}>🗑 Delete</MenuItem>
      </Menu>

      {/* Add Facility Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            width: 400,
            p: 3,
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
            zIndex: 2000,
            position: 'fixed',
            top: 0,
            height: '100vh'
          }
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Add Facility
        </Typography>
        <TextField label="Facility Name" fullWidth margin="normal" />
        <TextField label="Facility Code" fullWidth margin="normal" />
        <FormControl fullWidth margin="normal">
          <InputLabel>Facility Level</InputLabel>
          <Select label="Facility Level">
            <MenuItem value="Level 1">Level 1</MenuItem>
            <MenuItem value="Level 2">Level 2</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>District</InputLabel>
          <Select label="District">
            <MenuItem value="Kampala">Kampala</MenuItem>
            <MenuItem value="Jinja">Jinja</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" onClick={handleDrawerClose}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ bgcolor: '#00695C' }}>
            Save
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default FacilitiesManagement;