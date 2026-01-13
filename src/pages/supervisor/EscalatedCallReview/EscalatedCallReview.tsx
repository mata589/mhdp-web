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
  Skeleton,
  Alert,
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
import CustomChip, { type RiskLevel } from '../../../components/common/CustomChip/CustomChip';

import type { 
  EscalationsSummary, 
  EscalationItem,
  EscalationsOverview 
} from '../../../types/supervisor.types';
import supervisorApi from '../../../services/api/supervisorApi';

// Shimmer Loading Components
const MetricCardSkeleton = () => (
  <Card sx={{ boxShadow: 'none', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: '8px' }} />
        <Skeleton variant="text" width={120} height={20} />
      </Box>
      <Skeleton variant="text" width={60} height={40} />
    </CardContent>
  </Card>
);

const CallItemSkeleton = () => (
  <Box sx={{ py: 2.5, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" height={24} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="80%" height={18} />
      </Box>
    </Box>
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: '4px' }} />
      <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: '4px' }} />
      <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: '4px' }} />
    </Box>
  </Box>
);

// Map risk level for CustomChip
const mapRiskLevel = (riskLevel: string): RiskLevel => {
  const level = riskLevel?.toLowerCase();
  if (level === 'critical' || level === 'high') return 'High';
  if (level === 'medium') return 'Medium';
  if (level === 'low') return 'Low';
  return 'Medium';
};

export default function EscalatedCallsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All risk levels');
  const [reviewDialog, setReviewDialog] = useState(false);
  const [selectedCall, setSelectedCall] = useState<EscalationItem | null>(null);
  const [resolution, setResolution] = useState('');
  const [status, setStatus] = useState<'pending' | 'in_progress' | 'resolved'>('pending');
  
  // API State
  const [summary, setSummary] = useState<EscalationsSummary | null>(null);
  const [escalatedCalls, setEscalatedCalls] = useState<EscalationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [updating, setUpdating] = useState(false);
  const limit = 10;

  // Fetch Escalations Summary
  const fetchSummary = async () => {
    try {
      setSummaryLoading(true);
      const data = await supervisorApi.getEscalationsSummary();
      setSummary(data);
    } catch (err) {
      console.error('Error fetching summary:', err);
      // Don't show error for summary, just log it
    } finally {
      setSummaryLoading(false);
    }
  };

  // Fetch Escalated Calls
  const fetchEscalatedCalls = async () => {
    try {
      setLoading(true);
      const data = await supervisorApi.getEscalationsOverview(page, limit);
      setEscalatedCalls(data.escalations || []);
      setTotalResults(data.total_results || 0);
      setError(null);
    } catch (err) {
      console.error('Error fetching escalated calls:', err);
      setError(err instanceof Error ? err.message : 'Failed to load escalated calls');
      setEscalatedCalls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  useEffect(() => {
    fetchEscalatedCalls();
  }, [page]);

  const metrics = [
    {
      title: 'Total Escalations',
      value: summary?.total_escalations?.toString() || '0',
      icon: '/cross1.png',
    },
    {
      title: 'Escalations Today',
      value: summary?.escalations_today?.toString() || '0',
      icon: '/cross2.png',
    },
    {
      title: 'Critical Alerts',
      value: summary?.critical_alerts?.toString() || '0',
      icon: '/cross3.png',
    },
    {
      title: 'Resolved Today',
      value: summary?.resolved_today?.toString() || '0',
      icon: '/cross4.png',
    },
  ];

  const handleViewCall = (call: EscalationItem) => {
    setSelectedCall(call);
    setReviewDialog(true);
    setStatus('pending');
    setResolution('');
  };

  const handleCloseDialog = () => {
    setReviewDialog(false);
    setSelectedCall(null);
    setResolution('');
    setStatus('pending');
  };

  const handleResolveCall = async () => {
    if (!selectedCall) return;
    
    try {
      setUpdating(true);
      await supervisorApi.updateEscalation({
        escalation_id: selectedCall.escalation_id,
        resolution_status: status,
        trajectory_of_care: resolution,
        resolution_notes: resolution,
      });
      
      // Refresh data after successful update
      await Promise.all([fetchEscalatedCalls(), fetchSummary()]);
      handleCloseDialog();
    } catch (err) {
      console.error('Error updating escalation:', err);
      alert('Failed to update escalation: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setUpdating(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'N/A';
    }
  };

  // Filter calls based on search and risk level
  const filteredCalls = escalatedCalls.filter(call => {
    const matchesSearch = searchQuery === '' || 
      call.caller_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.escalation_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.escalation_reason?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = selectedLevel === 'All risk levels' || 
      call.risk_level?.toLowerCase() === selectedLevel.toLowerCase();
    
    return matchesSearch && matchesLevel;
  });

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
        {summaryLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => <MetricCardSkeleton key={i} />)}
          </>
        ) : (
          metrics.map((metric, index) => (
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
          ))
        )}
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
                placeholder="Search by caller ID or escalation ID..."
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
                  <MenuItem value="critical">Critical</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Error State */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} action={
              <Button size="small" onClick={fetchEscalatedCalls}>
                Retry
              </Button>
            }>
              {error}
            </Alert>
          )}

          {/* Call List */}
          {loading ? (
            <Box>
              {[1, 2, 3].map((i) => <CallItemSkeleton key={i} />)}
            </Box>
          ) : filteredCalls.length === 0 ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography sx={{ color: '#6B7280', fontSize: '14px' }}>
                {searchQuery || selectedLevel !== 'All risk levels' 
                  ? 'No escalated calls match your filters' 
                  : 'No escalated calls found'}
              </Typography>
            </Box>
          ) : (
            <Box>
              {filteredCalls.map((call, index) => (
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5, flexWrap: 'wrap' }}>
                        <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>
                          {call.escalation_reason || 'Unknown Reason'}
                        </Typography>
                        <CustomChip 
                          label={mapRiskLevel(call.risk_level)} 
                          variant="risk" 
                          size="small"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
                          Caller ID: {call.caller_id}
                        </Typography>
                        <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
                          Priority: <span style={{ fontWeight: 500, color: '#374151' }}>{call.priority_level}</span>
                        </Typography>
                        <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
                          Status: <span style={{ fontWeight: 500, color: '#374151' }}>{call.resolution_status}</span>
                        </Typography>
                        <Typography sx={{ fontSize: '13px', color: '#6B7280' }}>
                          {formatDateTime(call.sent_at)}
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
                Page {page} of {totalPages} ({totalResults} results)
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
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
                    '&.Mui-disabled': {
                      borderColor: '#E5E7EB',
                      color: '#D1D5DB',
                    },
                  }}
                >
                  <ChevronLeft size={18} />
                </Button>
                <Button
                  variant="outlined"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
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
                    '&.Mui-disabled': {
                      borderColor: '#E5E7EB',
                      color: '#D1D5DB',
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
              Call Review - {selectedCall?.escalation_id}
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
                      Agent Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      {selectedCall.agent_name || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Escalation ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px', fontFamily: 'monospace' }}>
                      {selectedCall.escalation_id}
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
                      Type
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      Escalation
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Risk Level
                    </Typography>
                    <CustomChip 
                      label={mapRiskLevel(selectedCall.risk_level)} 
                      variant="risk" 
                      size="small"
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Priority Level
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      {selectedCall.priority_level}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Current Status
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }}>
                      {selectedCall.resolution_status}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px', mb: 0.5 }}>
                      Escalation Time
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '14px' }}>
                      {formatDateTime(selectedCall.sent_at)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Resolution Section */}
              <Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ fontSize: '16px', fontWeight: 600 }}>
                  Resolution & Follow-up
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Enter resolution details, trajectory of care, or follow-up notes..."
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
                    onChange={(e) => setStatus(e.target.value as any)}
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
            disabled={updating}
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
            disabled={updating || !resolution.trim()}
            startIcon={<CheckCircle size={16} />}
            sx={{
              textTransform: 'none',
              fontSize: '14px',
              bgcolor: '#00897b',
              '&:hover': {
                bgcolor: '#00796b',
              },
              '&.Mui-disabled': {
                bgcolor: '#D1D5DB',
                color: '#9CA3AF',
              },
            }}
          >
            {updating ? 'Updating...' : 'Update Call'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}