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
} from '@mui/material';
import {
  MoreVert,
  Add,
  FilterList
} from '@mui/icons-material';
import CustomChip from '../../../components/common/CustomChip/CustomChip';
import { SlideDialog, type FormField } from '../../../components/forms/SlideDialogform/SlideDialog';

const FacilitiesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Define fields for the Add Facility dialog
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

  const handleSaveFacility = (data: Record<string, any>) => {
    console.log('Facility saved:', data);
    setDrawerOpen(false);
    // Here you would typically make an API call to save the facility
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
            startIcon={<FilterList />}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Filters
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              bgcolor: '#00695C',
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': { bgcolor: '#004D40' }
            }}
            onClick={() => setDrawerOpen(true)}
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
                      <MoreVert />
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

      {/* Add Facility Dialog - Using SlideDialog Component */}
      <SlideDialog
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Add Facility"
        fields={facilityFields}
        onSave={handleSaveFacility}
        saveButtonText="Continue"
      />
    </Box>
  );
};

export default FacilitiesManagement;