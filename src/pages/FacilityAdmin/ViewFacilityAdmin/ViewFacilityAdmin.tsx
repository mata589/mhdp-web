import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  MoreVert,
  Add,
  FilterList,
} from '@mui/icons-material';

export default function StaffDashboard() {
  const [statusFilter, setStatusFilter] = useState('All status');

  const statsData = [
    {
      title: 'Total Staff',
      value: '2',
      change: '+5%',
      trend: 'up',
      period: 'vs last month',
      icon: '👥',
      color: '#2196F3',
    },
    {
      title: 'Active Staff',
      value: '281',
      change: '-1%',
      trend: 'down',
      period: 'vs last week',
      icon: '✓',
      color: '#4CAF50',
    },
    {
      title: 'Calls Today',
      value: '1247',
      change: '+5%',
      trend: 'up',
      period: 'vs yesterday',
      icon: '📞',
      color: '#00BCD4',
    },
    {
      title: 'Escalated Calls',
      value: '7',
      change: '-1%',
      trend: 'down',
      period: 'vs yesterday',
      icon: '⚠️',
      color: '#F44336',
    },
  ];

  const staffData = [
    {
      name: 'James Gijir',
      email: 'james.gijir@butabika.go.ug',
      phone: '+256 782 000 111',
      designation: 'Psychiatric Nurse',
      totalCalls: 23,
      status: 'Active',
      avatar: 'J',
    },
    {
      name: 'James Gijir',
      email: 'james.gijir@butabika.go.ug',
      phone: '+256 782 000 111',
      designation: 'Psychiatric Nurse',
      totalCalls: 23,
      status: 'Active',
      avatar: 'J',
    },
    {
      name: 'Mary Nakimuli',
      email: 'nakimar@butabika.go.ug',
      phone: '+256 782 000 111',
      designation: 'Peer Support Worker',
      totalCalls: 68,
      status: 'Inactive',
      avatar: 'M',
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Hello, <span style={{ fontWeight: 700 }}>Ben Gitta</span>
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            bgcolor: '#00897B',
            textTransform: 'none',
            '&:hover': { bgcolor: '#00796B' },
          }}
        >
          Add staff member
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        {statsData.map((stat, index) => (
          <Card key={index} sx={{ flex: '1 1 220px', minWidth: 220 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  {stat.title}
                </Typography>
                <Typography sx={{ fontSize: '1.2rem' }}>{stat.icon}</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {stat.value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={stat.change}
                  size="small"
                  icon={stat.trend === 'up' ? <TrendingUp /> : <TrendingDown />}
                  sx={{
                    bgcolor: stat.trend === 'up' ? '#E8F5E9' : '#FFEBEE',
                    color: stat.trend === 'up' ? '#4CAF50' : '#F44336',
                    fontWeight: 600,
                    height: 24,
                    '& .MuiChip-icon': {
                      color: stat.trend === 'up' ? '#4CAF50' : '#F44336',
                    },
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {stat.period}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Staff Overview Section */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              Staff Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage all registered staff members
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
              >
                <MenuItem value="All status">All status</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
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
        </Box>

        {/* Staff Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Designation</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Total calls</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffData.map((staff, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        sx={{
                          bgcolor: staff.avatar === 'J' ? '#E3F2FD' : '#FFF3E0',
                          color: staff.avatar === 'J' ? '#1976D2' : '#F57C00',
                          width: 36,
                          height: 36,
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        }}
                      >
                        {staff.avatar}
                      </Avatar>
                      <Typography variant="body2">{staff.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{staff.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{staff.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{staff.designation}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{staff.totalCalls}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={staff.status}
                      size="small"
                      sx={{
                        bgcolor: staff.status === 'Active' ? '#E8F5E9' : '#FFEBEE',
                        color: staff.status === 'Active' ? '#2E7D32' : '#C62828',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button sx={{ textTransform: 'none', color: '#00897B' }}>
            View All
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}