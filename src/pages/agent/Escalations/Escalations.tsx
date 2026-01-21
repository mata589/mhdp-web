import React, { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import {
  Search,
  Phone,
  Eye,
  Play,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  X,
} from 'lucide-react';

// Import your API and types

import type { 
  EscalationsSummary, 
  EscalatedCall,
  RiskLevel,
  PriorityLevel,
  ResolutionStatus 
} from '../../../types/agent.types';
import agentApi from '../../../services/api/agentApi';


// CustomChip component (inline for this example)
const CustomChip = ({ label, variant, size }: any) => {
  const getColors = () => {
    if (variant === 'risk') {
      switch (label.toLowerCase()) {
        case 'high':
        case 'critical':
          return { bg: '#FEE2E2', text: '#991B1B' };
        case 'medium':
          return { bg: '#FEF3C7', text: '#92400E' };
        case 'low':
          return { bg: '#D1FAE5', text: '#065F46' };
        default:
          return { bg: '#E5E7EB', text: '#374151' };
      }
    }
    return { bg: '#E0F2F1', text: '#00897b' };
  };

  const colors = getColors();
  
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1.5,
        py: 0.5,
        borderRadius: '12px',
        bgcolor: colors.bg,
        color: colors.text,
        fontSize: size === 'small' ? '12px' : '13px',
        fontWeight: 500,
      }}
    >
      {label}
    </Box>
  );
};

export default function EscalatedCallsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All risk levels');
  const [reviewDialog, setReviewDialog] = useState(false);
  const [selectedCall, setSelectedCall] = useState<EscalatedCall | null>(null);
  const [resolution, setResolution] = useState('');
  const [status, setStatus] = useState<ResolutionStatus>('pending');
  
  // API state
  const [summary, setSummary] = useState<EscalationsSummary | null>(null);
  const [escalatedCalls, setEscalatedCalls] = useState<EscalatedCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch escalations summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await agentApi.getEscalationsSummary();
        setSummary(data);
      } catch (err) {
        console.error('Failed to fetch escalations summary:', err);
      }
    };
    fetchSummary();
  }, []);

  // Fetch escalated calls
  useEffect(() => {
    const fetchEscalatedCalls = async () => {
      setLoading(true);
      setError(null);
      try {
        const offset = (currentPage - 1) * limit;
        const riskLevel = selectedLevel !== 'All risk levels' 
          ? selectedLevel.toLowerCase() as RiskLevel
          : undefined;

        const response = await agentApi.listEscalatedCalls(
          limit,
          offset,
          searchQuery || undefined,
        
          undefined,
          undefined
        );

        setEscalatedCalls(response.results);
        setTotalResults(response.total_results);
      } catch (err: any) {
        setError(err.message || 'Failed to load escalated calls');
        console.error('Failed to fetch escalated calls:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEscalatedCalls();
  }, [searchQuery, selectedLevel, currentPage]);

  const metrics = [
    {
      title: 'Total Escalations',
      value: summary?.total_escalations.toString() || '0',
      icon: '/cross1.png',
    },
    {
      title: 'Escalations Today',
      value: summary?.escalations_today.toString() || '0',
      icon: '/cross2.png',
    },
    {
      title: 'Critical Alerts',
      value: summary?.critical_alerts.toString() || '0',
      icon: '/cross3.png',
    },
    {
      title: 'Resolved Today',
      value: summary?.resolved_today.toString() || '0',
      icon: '/cross4.png',
    },
  ];

  const handleViewCall = async (call: EscalatedCall) => {
    setSelectedCall(call);
    setStatus(call.resolution_status);
    setResolution(call.resolution_notes || '');
    setReviewDialog(true);
  };

  const handleCloseDialog = () => {
    setReviewDialog(false);
    setSelectedCall(null);
    setResolution('');
    setStatus('pending');
  };

  const handleResolveCall = () => {
    console.log('Resolving call:', selectedCall?.escalation_id, resolution, status);
    // TODO: Add API call to update escalation
    handleCloseDialog();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalPages = Math.ceil(totalResults / limit);

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
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Call List */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="error">{error}</Typography>
            </Box>
          ) : escalatedCalls.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">No escalated calls found</Typography>
            </Box>
          ) : (
            <Box>
              {escalatedCalls.map((call, index) => (
                <Box
                  key={call.escalation_id}
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
                          {call.escalation_reason}
                        </Typography>
                        <CustomChip 
                          label={call.risk_level.charAt(0).toUpperCase() + call.risk_level.slice(1)} 
                          variant="risk" 
                          size="small"
                        />
                        <CustomChip 
                          label={call.priority_level.charAt(0).toUpperCase() + call.priority_level.slice(1)} 
                          variant="priority" 
                          size="small"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
                          Call ID: {call.call_id}
                        </Typography>
                        <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
                          Escalated by: <span style={{ fontWeight: 500, color: '#374151' }}>{call.escalated_by}</span>
                        </Typography>
                        <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
                          To: <span style={{ fontWeight: 500, color: '#374151' }}>{call.escalated_to}</span>
                        </Typography>
                        <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
                          {formatDateTime(call.escalation_time)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1.5 }}>
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
          )}

          {/* Pagination */}
          {!loading && escalatedCalls.length > 0 && (
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
                Page {currentPage} of {totalPages} ({totalResults} results)
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
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
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
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
          )}
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={reviewDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
              Escalation Review - {selectedCall?.call_id}
            </Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <X size={20} />
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
                      Caller ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      {selectedCall.caller_id}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Escalated By
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      {selectedCall.escalated_by}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Escalated To
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      {selectedCall.escalated_to}
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
                      {selectedCall.escalation_reason}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Priority Level
                    </Typography>
                    <CustomChip 
                      label={selectedCall.priority_level.charAt(0).toUpperCase() + selectedCall.priority_level.slice(1)} 
                      variant="priority" 
                      size="small"
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Risk Level
                    </Typography>
                    <CustomChip 
                      label={selectedCall.risk_level.charAt(0).toUpperCase() + selectedCall.risk_level.slice(1)} 
                      variant="risk" 
                      size="small"
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Escalation Time
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      {formatDateTime(selectedCall.escalation_time)}
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
                    onChange={(e) => setStatus(e.target.value as ResolutionStatus)}
                    sx={{ fontSize: '14px' }}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
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