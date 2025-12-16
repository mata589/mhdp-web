import React, { useState } from 'react';
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
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search,
  MoreVert,
  Visibility,
  Edit,
  PersonAdd,
  Archive,
  Delete,
  FilterList,
  Add,
  ChevronRight,
  ChevronLeft,
} from '@mui/icons-material';
import CustomChip from '../../../components/common/CustomChip/CustomChip';
import { SlideDialog, type FormField } from '../../../components/forms/SlideDialogform/SlideDialog';

interface Facility {
  id: number;
  name: string;
  status: 'Available' | 'Busy' | 'Break';
  level: string;
  location: string;
  hsd: string;
  dateCreated: string;
  avatar: string;
  avatarColor: string;
}

export default function FacilitiesManagement() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [addFacilityDialogOpen, setAddFacilityDialogOpen] = useState(false);

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
      navigate('/admin/admin/FacilityUserManagement');
      handleMenuClose();
    }
  };

  const handleEdit = () => {
    // Handle edit logic
    handleMenuClose();
  };

  const handleAddUser = () => {
    // Handle add user logic
    handleMenuClose();
  };

  const handleArchive = () => {
    // Handle archive logic
    handleMenuClose();
  };

  const handleDelete = () => {
    // Handle delete logic
    handleMenuClose();
  };

  const handleSaveFacility = (data: Record<string, any>) => {
    console.log('Facility saved:', data);
    setAddFacilityDialogOpen(false);
    // Here you would typically make an API call to save the facility
  };

  const facilities: Facility[] = [
    {
      id: 1,
      name: 'Butabika Hospital',
      status: 'Available',
      level: 'Referral Hospital',
      location: 'Kampala, Uganda',
      hsd: 'Nakawa',
      dateCreated: 'Mon, July 13, 2025\n10:43 AM',
      avatar: 'B',
      avatarColor: '#0D9488',
    },
    {
      id: 2,
      name: 'Mirembe Hospital',
      status: 'Break',
      level: 'Health Center IV',
      location: 'Dodoma, Tanzania',
      hsd: 'Dodoma',
      dateCreated: 'Mon, July 13, 2025\n10:43 AM',
      avatar: 'M',
      avatarColor: '#ffa726',
    },
  ];

  // Metrics configuration with icon paths
  const metrics = [
    {
      title: 'Total Facilities',
      value: '2',
      iconPath: '/Staff.png',
    },
    {
      title: 'Active Facilities',
      value: '1',
      iconPath: '/Staff3.png',
    },
    {
      title: 'Inactive Facilities',
      value: '1',
      iconPath: '/Staff2.png',
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {metrics.map((metric, index) => (
          <Card 
            key={index} 
            sx={{ 
              flex: 1, 
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              '&:hover': {
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
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
                      width: '24px',
                      height: '24px',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  {metric.title}
                </Typography>
                <ChevronRight sx={{ ml: 'auto', color: 'text.secondary', fontSize: 20 }} />
              </Box>
              <Typography variant="h4" fontWeight="600" sx={{ color: '#1F2937' }}>
                {metric.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Filters and Actions */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField
          placeholder="Search name..."
          size="small"
          sx={{ 
            width: 280, 
            bgcolor: 'white',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#E5E7EB',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#9CA3AF', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl 
          size="small" 
          sx={{ 
            minWidth: 150, 
            bgcolor: 'white',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#E5E7EB',
              },
            },
          }}
        >
          <InputLabel>All status</InputLabel>
          <Select label="All status" defaultValue="">
            <MenuItem value="">All status</MenuItem>
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="busy">Busy</MenuItem>
            <MenuItem value="break">Break</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          sx={{ 
            textTransform: 'none', 
            bgcolor: 'white',
            borderColor: '#E5E7EB',
            color: '#6B7280',
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
            '&:hover': { bgcolor: '#0F766E' },
            boxShadow: 'none',
          }}
        >
          Add facility
        </Button>
      </Box>

      {/* Table */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#F9FAFB' }}>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '0.875rem' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '0.875rem' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '0.875rem' }}>Level</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '0.875rem' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '0.875rem' }}>HSD</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '0.875rem' }}>Date Created</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '0.875rem' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facilities.map((facility) => (
              <TableRow 
                key={facility.id} 
                hover
                sx={{
                  '&:hover': {
                    bgcolor: '#F9FAFB',
                  }
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: facility.avatarColor,
                        width: 36,
                        height: 36,
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      {facility.avatar}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1F2937' }}>
                      {facility.name}
                    </Typography>
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
                  <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
                    {facility.level}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
                    {facility.location}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
                    {facility.hsd}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#6B7280', 
                      fontSize: '0.875rem',
                      whiteSpace: 'pre-line',
                      lineHeight: 1.4,
                    }}
                  >
                    {facility.dateCreated}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleMenuOpen(e, facility)}
                    sx={{
                      '&:hover': {
                        bgcolor: '#F3F4F6',
                      }
                    }}
                  >
                    <MoreVert sx={{ fontSize: 20 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1 }}>
        <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
          Page 1-1 of 3 results
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            size="small" 
            disabled
            sx={{
              border: '1px solid #E5E7EB',
              borderRadius: 1,
              '&.Mui-disabled': {
                bgcolor: '#F9FAFB',
              }
            }}
          >
            <ChevronLeft sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton 
            size="small"
            sx={{
              border: '1px solid #E5E7EB',
              borderRadius: 1,
              '&:hover': {
                bgcolor: '#F9FAFB',
              }
            }}
          >
            <ChevronRight sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

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

      {/* Add Facility Dialog - Using SlideDialog Component */}
      <SlideDialog
        open={addFacilityDialogOpen}
        onClose={() => setAddFacilityDialogOpen(false)}
        title="Add Facility"
        fields={facilityFields}
        onSave={handleSaveFacility}
        saveButtonText="Continue"
      />
    </Box>
  );
}