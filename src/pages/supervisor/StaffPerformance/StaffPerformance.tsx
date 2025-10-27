import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import {
  Search,
  ChevronRight,
  ChevronLeft,
  FilterList
} from '@mui/icons-material';
import CustomChip from '../../../components/common/CustomChip/CustomChip';
import { ViewButton } from '../../../components/common/ViewButton/ViewButton';


const StaffDashboard = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All status');
  const [searchName, setSearchName] = useState('');

  const statsCards = [
    { iconPath: '/Staff.png', label: 'Total Staff', value: '30' },
    { iconPath: '/Staff2.png', label: 'On Call', value: '12' },
    { iconPath: '/Staff3.png', label: 'Available', value: '8' },
    { iconPath: '/Staff4.png', label: 'On Break', value: '4' }
  ];

  const staffData = [
    {
      name: 'James Gjoir',
      avatar: 'J',
      status: 'Busy' as const,
      lastActive: 'Mon, July 13, 2025',
      time: '10:43 AM',
      callsToday: 150,
      escalations: 12,
      qualityScore: 72
    },
    {
      name: 'Sarah Mukasa',
      avatar: 'S',
      status: 'Available' as const,
      lastActive: 'Mon, July 20, 2025',
      time: '10:43 AM',
      callsToday: 45,
      escalations: 30,
      qualityScore: 85
    },
    {
      name: 'Mary Namu',
      avatar: 'M',
      status: 'Busy' as const,
      lastActive: 'Sun, July 21, 2025',
      time: '10:43 AM',
      callsToday: 20,
      escalations: 2,
      qualityScore: 65
    },
    {
      name: 'Flavia Nabukenya',
      avatar: 'F',
      status: 'Break' as const,
      lastActive: 'Wed, July 10, 2025',
      time: '10:43 AM',
      callsToday: 23,
      escalations: 5,
      qualityScore: 90
    },
    {
      name: 'James Gjoir',
      avatar: 'J',
      status: 'Break' as const,
      lastActive: 'Mon, July 21, 2025',
      time: '10:43 AM',
      callsToday: 200,
      escalations: 25,
      qualityScore: 78
    }
  ];
  
  const getAvatarColor = (name: string): string => {
    const colors: { [key: string]: string } = {
      'J': '#CCE5E5',
      'S': '#FFE5B2',
      'M': '#DBE6F0',
      'F': '#FFE5B2'
    };
    const firstLetter = name.charAt(0).toUpperCase();
    return colors[firstLetter] || '#757575';
  };

  const getAvatarTextColor = (bgColor: string): string => {
    const colorMap: { [key: string]: string } = {
      '#CCE5E5': '#004242',
      '#FFE5B2': '#7A4100',
      '#DBE6F0': '#003768',
      '#757575': '#FFFFFF'
    };
    return colorMap[bgColor] || '#000000';
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f9fafb', minHeight: '100vh' }}>
      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {statsCards.map((card, index) => (
          <Card key={index} sx={{ flex: 1, boxShadow: '0 0 2px rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0.75
                      }}
                    >
                      <img 
                        src={card.iconPath} 
                        alt={card.label}
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          objectFit: 'contain'
                        }} 
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                      {card.label}
                    </Typography>
                    <ChevronRight sx={{ fontSize: 16, color: 'text.secondary', ml: 'auto' }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {card.value}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Main Content Card */}
      <Card sx={{ boxShadow: '0 0 2px rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)' }}>
        <CardContent>
          {/* Search and Filters */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              placeholder="Search name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              size="small"
              sx={{ width: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{ flex: 1 }} />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
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
              sx={{ textTransform: 'none' }}
            >
              Filters
            </Button>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Last Active</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Calls Today</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Escalations</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Quality Score</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffData.map((staff, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: getAvatarColor(staff.name),
                            color: getAvatarTextColor(getAvatarColor(staff.name)),
                            fontSize: '0.875rem',
                            fontWeight: 900
                          }}
                        >
                          {staff.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {staff.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <CustomChip 
                        label={staff.status} 
                        variant="status" 
                        size="small"
                        showDot={true}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.primary' }}>
                        {staff.lastActive}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {staff.time}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{staff.callsToday}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{staff.escalations}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: '#ffab00'
                          }}
                        />
                        <Typography variant="body2">{staff.qualityScore}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <ViewButton 
                        onClick={() => navigate('/supervisor/StaffDetailsPage')}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Page 1-1 of 5 results
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ChevronLeft />}
                sx={{ textTransform: 'none' }}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="small"
                endIcon={<ChevronRight />}
                sx={{ textTransform: 'none' }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StaffDashboard;