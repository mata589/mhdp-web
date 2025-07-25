// File: src/pages/admin/UserManagement/UserManagement.tsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  PersonAdd,
  Block,
  CheckCircle,
  Search,
  FilterList
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export const UserManagement: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [userDialog, setUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    {
      id: 1,
      name: 'James Gipir',
      email: 'james.gipir@butabikahospital.go.ug',
      role: 'agent',
      status: 'active',
      lastLogin: '2024-07-23 14:30',
      callsHandled: 125,
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sarah Mukasa',
      email: 'sarah.mukasa@butabikahospital.go.ug',
      role: 'supervisor',
      status: 'active',
      lastLogin: '2024-07-23 13:45',
      callsHandled: 89,
      joinDate: '2024-02-01'
    },
    {
      id: 3,
      name: 'Dr. David Okello',
      email: 'david.okello@butabikahospital.go.ug',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-07-23 12:20',
      callsHandled: 45,
      joinDate: '2024-01-10'
    },
    {
      id: 4,
      name: 'Grace Nalongo',
      email: 'grace.nalongo@butabikahospital.go.ug',
      role: 'agent',
      status: 'inactive',
      lastLogin: '2024-07-20 16:15',
      callsHandled: 78,
      joinDate: '2024-03-05'
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'error';
      case 'supervisor': return 'warning';
      case 'agent': return 'primary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'default';
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setUserDialog(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setUserDialog(true);
  };

  const handleCloseDialog = () => {
    setUserDialog(false);
    setSelectedUser(null);
  };

  const handleSaveUser = () => {
    console.log('Saving user...');
    handleCloseDialog();
  };

  const activeUsers = users.filter(user => user.status === 'active');
  const inactiveUsers = users.filter(user => user.status === 'inactive');

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>

      {/* Search and Filter */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Role</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="">All Roles</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="supervisor">Supervisor</MenuItem>
                    <MenuItem value="agent">Agent</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Status</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* User Tabs */}
      <Card>
        <CardContent>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
          >
            <Tab label={`All Users (${users.length})`} />
            <Tab label={`Active (${activeUsers.length})`} />
            <Tab label={`Inactive (${inactiveUsers.length})`} />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <UserTable users={users} onEdit={handleEditUser} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <UserTable users={activeUsers} onEdit={handleEditUser} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <UserTable users={inactiveUsers} onEdit={handleEditUser} />
          </TabPanel>
        </CardContent>
      </Card>

      {/* User Dialog */}
      <Dialog open={userDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                defaultValue={selectedUser?.name.split(' ')[0] || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                defaultValue={selectedUser?.name.split(' ')[1] || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                defaultValue={selectedUser?.email || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select defaultValue={selectedUser?.role || 'agent'}>
                  <MenuItem value="agent">Agent</MenuItem>
                  <MenuItem value="supervisor">Supervisor</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select defaultValue={selectedUser?.status || 'active'}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {!selectedUser && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveUser}>
            {selectedUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  function UserTable({ users, onEdit }: { users: any[], onEdit: (user: any) => void }) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Calls Handled</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 40, height: 40 }}>
                      {user.name.split(' ').map((n: string) => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    color={getRoleColor(user.role)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={getStatusColor(user.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="caption">
                    {new Date(user.lastLogin).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>{user.callsHandled}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => onEdit(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete />
                  </IconButton>
                  <IconButton size="small">
                    {user.status === 'active' ? <Block /> : <CheckCircle />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};
