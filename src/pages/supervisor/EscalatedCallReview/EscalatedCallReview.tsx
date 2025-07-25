// File: src/pages/supervisor/EscalatedCallReview/EscalatedCallReview.tsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  Divider
} from '@mui/material';
import {
  Visibility,
  PlayArrow,
  Assignment,
  Close,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

export const EscalatedCallReview: React.FC = () => {
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [resolution, setResolution] = useState('');
  const [status, setStatus] = useState('pending');

  const escalatedCalls = [
    {
      id: 'ESC-001',
      caller: 'John Doe',
      phone: '+256 700 123 456',
      agent: 'James Gipir',
      escalationTime: '2024-07-23 14:30',
      reason: 'Complex medical query regarding drug interactions',
      priority: 'high',
      status: 'pending',
      duration: '15:30',
      category: 'Medical Consultation'
    },
    {
      id: 'ESC-002',
      caller: 'Mary Smith',
      phone: '+256 701 987 654',
      agent: 'Sarah Mukasa',
      escalationTime: '2024-07-23 13:45',
      reason: 'Billing dispute - overcharged for services',
      priority: 'medium',
      status: 'in-review',
      duration: '12:15',
      category: 'Billing'
    },
    {
      id: 'ESC-003',
      caller: 'Peter Kato',
      phone: '+256 702 456 789',
      agent: 'David Okello',
      escalationTime: '2024-07-23 12:20',
      reason: 'Emergency consultation request',
      priority: 'urgent',
      status: 'resolved',
      duration: '8:45',
      category: 'Emergency'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in-review': return 'info';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const handleViewCall = (call: any) => {
    setSelectedCall(call);
    setReviewDialog(true);
  };

  const handleCloseDialog = () => {
    setReviewDialog(false);
    setSelectedCall(null);
    setResolution('');
    setStatus('pending');
  };

  const handleResolveCall = () => {
    console.log('Resolving call:', selectedCall?.id, resolution, status);
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Escalated Call Review
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#f44336' }}>
                8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Escalated
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#ff9800' }}>
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#2196f3' }}>
                2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#4caf50' }}>
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Resolved Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Escalated Calls Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Escalated Calls
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Call ID</TableCell>
                  <TableCell>Caller Info</TableCell>
                  <TableCell>Agent</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {escalatedCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {call.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {call.caller}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {call.phone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                          {call.agent.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2">{call.agent}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 200 }} noWrap>
                        {call.reason}
                      </Typography>
                      <Chip label={call.category} size="small" sx={{ mt: 0.5 }} />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={call.priority}
                        color={getPriorityColor(call.priority)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={call.status}
                        color={getStatusColor(call.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        {new Date(call.escalationTime).toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleViewCall(call)}
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={reviewDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Call Review - {selectedCall?.id}
            <IconButton onClick={handleCloseDialog}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedCall && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Call Details</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Caller</Typography>
                  <Typography variant="body1">{selectedCall.caller}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Phone</Typography>
                  <Typography variant="body1">{selectedCall.phone}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Agent</Typography>
                  <Typography variant="body1">{selectedCall.agent}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Duration</Typography>
                  <Typography variant="body1">{selectedCall.duration}</Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Escalation Info</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Reason</Typography>
                  <Typography variant="body1">{selectedCall.reason}</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Category</Typography>
                  <Chip label={selectedCall.category} size="small" />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Priority</Typography>
                  <Chip
                    label={selectedCall.priority}
                    color={getPriorityColor(selectedCall.priority)}
                    size="small"
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>Resolution</Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Enter resolution details..."
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-review">In Review</MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleResolveCall}
            startIcon={<CheckCircle />}
          >
            Update Call
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};