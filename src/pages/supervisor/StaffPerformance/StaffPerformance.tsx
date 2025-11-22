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
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#f9fafb', minHeight: '100vh' }}>
      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        {statsCards.map((card, index) => (
          <Card key={index} sx={{ flex: 1, boxShadow: '0 0 2px rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, mb: 1 }}>
                    <Box
                      sx={{
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
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
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, fontWeight: 500 }}>
                      {card.label}
                    </Typography>
                    <ChevronRight sx={{ fontSize: { xs: 14, sm: 16 }, color: 'text.secondary', ml: 'auto' }} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', sm: 'inherit' } }}>
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
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2 }, 
            mb: 3,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' }
          }}>
            <TextField
              placeholder="Search name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              size="small"
              sx={{ flex: 1, width: { xs: '100%', sm: 250 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary', fontSize: { xs: 18, sm: 20 } }} />
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{ flex: { xs: 'none', sm: 1 } }} />
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 150 } }}>
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
              sx={{ textTransform: 'none', minWidth: { xs: '100%', sm: 'auto' } }}
            >
              Filters
            </Button>
          </Box>
          {/* Table */}
          <TableContainer sx={{ 
            overflowX: { xs: 'auto', sm: 'visible' },
            borderRadius: 1,
            border: '1px solid #e5e7eb'
          }}>
            <Table sx={{ minWidth: { xs: 600, sm: 'auto' } }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Last Active</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Calls</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Escalations</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Score</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.75rem', sm: 'inherit' }, p: { xs: 1, sm: 'inherit' }, whiteSpace: 'nowrap' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staffData.map((staff, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
                        <Avatar
                          sx={{
                            width: { xs: 32, sm: 40 },
                            height: { xs: 32, sm: 40 },
                            bgcolor: getAvatarColor(staff.name),
                            color: getAvatarTextColor(getAvatarColor(staff.name)),
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            fontWeight: 900
                          }}
                        >
                          {staff.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.8125rem', sm: 'inherit' } }}>
                          {staff.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                      <CustomChip
                        label={staff.status}
                        variant="status"
                        size="small"
                        showDot={true}
                      />
                    </TableCell>
                    <TableCell sx={{ p: { xs: 1, sm: 'inherit' } }}>
                      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 0, sm: 'inherit' } }}>
                        <Typography variant="body2" sx={{ color: 'text.primary', fontSize: { xs: '0.8125rem', sm: 'inherit' } }}>
                          {staff.lastActive}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: { xs: '0.6875rem', sm: 'inherit' } }}>
                          {staff.time}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: { xs: 1, sm: 'inherit' }, textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: 'inherit' } }}>{staff.callsToday}</Typography>
                    </TableCell>
                    <TableCell sx={{ p: { xs: 1, sm: 'inherit' }, textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: 'inherit' } }}>{staff.escalations}</Typography>
                    </TableCell>
                    <TableCell sx={{ p: { xs: 1, sm: 'inherit' }, textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, sm: 0.5 } }}>
                        <Box
                          sx={{
                            width: { xs: 4, sm: 6 },
                            height: { xs: 4, sm: 6 },
                            borderRadius: '50%',
                            bgcolor: '#ffab00'
                          }}
                        />
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: 'inherit' } }}>{staff.qualityScore}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: { xs: 1, sm: 'inherit' }, textAlign: 'center' }}>
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8125rem', sm: 'inherit' } }}>
              Page 1-1 of 5 results
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'center', sm: 'flex-end' } }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ChevronLeft />}
                sx={{ textTransform: 'none', flex: { xs: 1, sm: 'unset' } }}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="small"
                endIcon={<ChevronRight />}
                sx={{ textTransform: 'none', flex: { xs: 1, sm: 'unset' } }}
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
