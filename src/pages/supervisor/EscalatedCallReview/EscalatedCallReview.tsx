import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Button,
  MenuItem,
  Select,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Search,
  Phone,
  Eye,
  Play,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import CustomChip, { type RiskLevel } from '../../../components/common/CustomChip/CustomChip';
//import CustomChip, { RiskLevel } from '../../../components/common/CustomChip/CustomChip';

// Map severity to risk level
type SeverityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

const mapSeverityToRisk = (severity: SeverityLevel): RiskLevel => {
  switch (severity) {
    case 'Critical':
      return 'High';
    case 'High':
      return 'High';
    case 'Medium':
      return 'Medium';
    case 'Low':
      return 'Low';
    default:
      return 'Medium';
  }
};

export default function EscalatedCallsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All risk levels');
  const [reviewDialog, setReviewDialog] = useState(false);
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [resolution, setResolution] = useState('');
  const [status, setStatus] = useState('pending');

  const metrics = [
    {
      title: 'Total Escalations',
      value: '12',
      icon: '/cross1.png',
    },
    {
      title: 'Escalations Today',
      value: '6',
      icon: '/cross2.png',
    },
    {
      title: 'Critical Alerts',
      value: '4',
      icon: '/cross3.png',
    },
    {
      title: 'Resolved Today',
      value: '2',
      icon: '/cross4.png',
    },
  ];

  const escalatedCalls = [
    {
      id: 'ESC-001',
      type: 'Suicidal intent',
      severity: 'Critical' as SeverityLevel,
      callerId: 'Caller ID: 2001',
      caller: 'John Doe',
      phone: '+256 700 123 456',
      agent: 'James Ojat',
      sentTime: 'Jul 13, 2025 | 10:43AM',
      duration: '15:30',
      reason: 'Complex medical query regarding drug interactions',
      category: 'Medical Consultation',
    },
    {
      id: 'ESC-002',
      type: 'Severe depression',
      severity: 'High' as SeverityLevel,
      callerId: 'Caller ID: 1821',
      caller: 'Mary Smith',
      phone: '+256 701 987 654',
      agent: 'Emma Seeti',
      sentTime: 'Jul 13, 2025 | 10:43AM',
      duration: '12:15',
      reason: 'Patient expressing symptoms of severe depression',
      category: 'Mental Health',
    },
    {
      id: 'ESC-003',
      type: 'Suicidal intent',
      severity: 'Critical' as SeverityLevel,
      callerId: 'Caller ID: 2001',
      caller: 'Peter Kato',
      phone: '+256 702 456 789',
      agent: 'James Ojat',
      sentTime: 'Jul 13, 2025 | 10:43AM',
      duration: '8:45',
      reason: 'Emergency consultation request',
      category: 'Emergency',
    },
  ];

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
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', p: 3 }}>
      {/* Metrics Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 2,
          mb: 3,
        }}
      >
        {metrics.map((metric, index) => (
          <Card
            key={index}
            sx={{
              boxShadow: 'none',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
            }}
          >
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={metric.icon}
                    alt={metric.title}
                    sx={{
                      width: 24,
                      height: 24,
                      objectFit: 'contain',
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#6B7280',
                  }}
                >
                  {metric.title}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#111827',
                  lineHeight: 1,
                }}
              >
                {metric.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Main Content Card */}
      <Card sx={{ boxShadow: 'none', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>
              Escalated calls
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search by agent or call id..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                sx={{
                  width: { xs: '100%', sm: '280px' },
                  '& .MuiOutlinedInput-root': {
                    fontSize: '14px',
                    bgcolor: 'white',
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                    },
                    '&:hover fieldset': {
                      borderColor: '#D1D5DB',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4682B4',
                      borderWidth: '1px',
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} color="#9CA3AF" />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <Select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  sx={{
                    fontSize: '14px',
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E5E7EB',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D1D5DB',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#4682B4',
                      borderWidth: '1px',
                    },
                  }}
                >
                  <MenuItem value="All risk levels">All risk levels</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  borderColor: '#E5E7EB',
                  '&:hover': {
                    borderColor: '#D1D5DB',
                    bgcolor: '#F9FAFB',
                  },
                }}
              >
                Filters
              </Button>
            </Box>
          </Box>

          {/* Call List */}
          <Box>
            {escalatedCalls.map((call, index) => (
              <Box
                key={call.id}
                sx={{
                  py: 2.5,
                  borderTop: index === 0 ? 'none' : '1px solid #F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '20px',
                      bgcolor: '#CCE5E5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Phone size={20} color="#6B7280" />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                      <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>
                        {call.type}
                      </Typography>
                      <CustomChip 
                        label={mapSeverityToRisk(call.severity)} 
                        variant="risk" 
                        size="small"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
                        {call.callerId}
                      </Typography>
                      <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
                        Agent: <span style={{ fontWeight: 500, color: '#374151' }}>{call.agent}</span>
                      </Typography>
                      <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
                        Sent: {call.sentTime}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Play size={16} />}
                    sx={{
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#008080',
                      borderColor: '#E5E7EB',
                      px: 2,
                      '&:hover': {
                        borderColor: '#4682B4',
                        bgcolor: '#F0F9FF',
                      },
                    }}
                  >
                    Play
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Eye size={16} />}
                    onClick={() => handleViewCall(call)}
                    sx={{
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#008080',
                      borderColor: '#E5E7EB',
                      px: 2,
                      '&:hover': {
                        borderColor: '#4682B4',
                        bgcolor: '#F0F9FF',
                      },
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Phone size={16} />}
                    sx={{
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: 500,
                      bgcolor: '#00897b',
                      color: 'white',
                      px: 2,
                      '&:hover': {
                        bgcolor: '#00796b',
                      },
                    }}
                  >
                    Call
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Pagination */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
              pt: 3,
              borderTop: '1px solid #F3F4F6',
            }}
          >
            <Typography sx={{ fontSize: '14px', color: '#6B7280' }}>
              Page 1-3 of 5 results
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                sx={{
                  minWidth: 'auto',
                  px: 1.5,
                  py: 0.75,
                  borderColor: '#E5E7EB',
                  color: '#6B7280',
                  '&:hover': {
                    borderColor: '#D1D5DB',
                    bgcolor: '#F9FAFB',
                  },
                }}
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="outlined"
                sx={{
                  minWidth: 'auto',
                  px: 1.5,
                  py: 0.75,
                  borderColor: '#E5E7EB',
                  color: '#6B7280',
                  '&:hover': {
                    borderColor: '#D1D5DB',
                    bgcolor: '#F9FAFB',
                  },
                }}
              >
                <ChevronRight size={18} />
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={reviewDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
              Call Review - {selectedCall?.id}
            </Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              {/* Close icon */}
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedCall && (
            <Box>
              <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                {/* Left Side - Call Details */}
                <Box sx={{ flex: 1, minWidth: 250 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: '16px', fontWeight: 600 }}>
                    Call Details
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Caller
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      {selectedCall.caller}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Phone
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      {selectedCall.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Agent
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: '#4682B4' }}>
                        {selectedCall.agent.split(' ').map((n: string) => n[0]).join('')}
                      </Avatar>
                      <Typography variant="body1" sx={{ fontSize: '14px' }}>
                        {selectedCall.agent}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Duration
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      {selectedCall.duration}
                    </Typography>
                  </Box>
                </Box>

                {/* Right Side - Escalation Info */}
                <Box sx={{ flex: 1, minWidth: 250 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: '16px', fontWeight: 600 }}>
                    Escalation Info
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Reason
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      {selectedCall.reason}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Category
                    </Typography>
                    <CustomChip 
                      label={selectedCall.category as any} 
                      variant="outcome" 
                      size="small"
                      showDot={false}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Severity
                    </Typography>
                    <CustomChip 
                      label={mapSeverityToRisk(selectedCall.severity)} 
                      variant="risk" 
                      size="small"
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Escalation Time
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      {selectedCall.sentTime}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Resolution Section */}
              <Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontSize: '16px', fontWeight: 600 }}>
                  Resolution
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Enter resolution details..."
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      fontSize: '14px',
                    },
                  }}
                />
                <FormControl fullWidth size="small">
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    sx={{ fontSize: '14px' }}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-review">In Review</MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              textTransform: 'none',
              fontSize: '14px',
              color: '#6B7280',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleResolveCall}
            startIcon={<CheckCircle size={16} />}
            sx={{
              textTransform: 'none',
              fontSize: '14px',
              bgcolor: '#00897b',
              '&:hover': {
                bgcolor: '#00796b',
              },
            }}
          >
            Update Call
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}