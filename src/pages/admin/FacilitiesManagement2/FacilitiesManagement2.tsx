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
  Chip,
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

interface Facility {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
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

  const facilities: Facility[] = [
    {
      id: 1,
      name: 'Butabika Hospital',
      status: 'Active',
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
      status: 'Inactive',
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
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
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
                  <Chip
                    label={facility.status}
                    size="small"
                    icon={
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: facility.status === 'Active' ? '#22C55E' : '#EF4444',
                          ml: 1,
                        }}
                      />
                    }
                    sx={{
                      bgcolor: facility.status === 'Active' ? '#DCFCE7' : '#FEE2E2',
                      color: facility.status === 'Active' ? '#16A34A' : '#DC2626',
                      fontWeight: 500,
                      fontSize: 12,
                      border: 'none',
                      '& .MuiChip-icon': {
                        ml: 1,
                      }
                    }}
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
    </Box>
  );
}