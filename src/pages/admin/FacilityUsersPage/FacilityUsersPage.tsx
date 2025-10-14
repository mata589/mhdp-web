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
  Archive,
  Delete,
  FilterList,
  Add,
  ChevronRight,
} from '@mui/icons-material';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  designation: string;
  facility: string;
  status: string;
  avatar: string;
  avatarColor: string;
}

export default function FacilityUsersPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const users: User[] = [
    {
      id: 1,
      name: 'James Gipir',
      email: 'james.gipir@butabika.go.ug',
      phone: '+256 782 000 111',
      designation: 'Psychiatric Nurse',
      facility: 'Butabika Hospital',
      status: 'Active',
      avatar: 'J',
      avatarColor: '#00897b',
    },
    {
      id: 2,
      name: 'Mary Nakimuli',
      email: 'nakimary@butabika.go.ug',
      phone: '+256 782 000 111',
      designation: 'Peer Support Worker',
      facility: 'Mirembe Hospital',
      status: 'Active',
      avatar: 'M',
      avatarColor: '#ffa726',
    },
  ];

  // Metrics configuration with icon paths
  const metrics = [
    {
      title: 'Total Users',
      value: '2',
      iconPath: '/Staff.png', // Update with your actual icon path
    },
    {
      title: 'Active Users',
      value: '1',
      iconPath: '/Staff3.png', // Update with your actual icon path
    },
    {
      title: 'Inactive Users',
      value: '1',
      iconPath: '/Staff2.png', // Update with your actual icon path
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {metrics.map((metric, index) => (
          <Card key={index} sx={{ flex: 1, cursor: 'pointer' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
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
                      width: '16px',
                      height: '16px',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {metric.title}
                </Typography>
                <ChevronRight sx={{ ml: 'auto', color: 'text.secondary', fontSize: 20 }} />
              </Box>
              <Typography variant="h4" fontWeight="600">
                {metric.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Filters and Actions */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search name..."
          size="small"
          sx={{ width: 300, bgcolor: 'white' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 150, bgcolor: 'white' }}>
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
          sx={{ textTransform: 'none', bgcolor: 'white' }}
        >
          Filters
        </Button>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ 
            ml: 'auto', 
            textTransform: 'none',
            bgcolor: '#00897b',
            '&:hover': { bgcolor: '#00796b' }
          }}
        >
          Add user
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Designation</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Facility</TableCell>
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
                  <Typography variant="body2">{user.facility}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    size="small"
                    sx={{
                      bgcolor: '#e8f5e9',
                      color: '#2e7d32',
                      fontWeight: 500,
                      fontSize: 12,
                    }}
                  />
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
          <IconButton size="small" disabled>
            <ChevronRight sx={{ transform: 'rotate(180deg)' }} />
          </IconButton>
          <IconButton size="small">
            <ChevronRight />
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
      >
        <MenuItem onClick={() => selectedUser && navigate(`/admin/admin/FacilityDetails`)}>
          <Visibility sx={{ mr: 1, fontSize: 20 }} />
          View details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1, fontSize: 20 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Archive sx={{ mr: 1, fontSize: 20 }} />
          Archive
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1, fontSize: 20 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}