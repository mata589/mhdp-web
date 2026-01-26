// src/components/EscalateCallModal/EscalateCallModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Alert,
  CircularProgress,
  type SelectChangeEvent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { agentApi } from '../../../services/api/agentApi';


interface Supervisor {
  user_id: string;
  full_name: string;
  email: string;
  contact: string;
  designation: string;
  roles: string[];
}

interface EscalateCallModalProps {
  open: boolean;
  onClose: () => void;
  callId: string;
  onEscalationSuccess?: (response: any) => void;
}

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low - Can be addressed within 24 hours', color: '#059669' },
  { value: 'medium', label: 'Medium - Supervisor input required', color: '#d97706' },
  { value: 'high', label: 'High - Immediate supervisor attention needed', color: '#dc2626' },
];

const REASON_OPTIONS = [
  'Complex medical inquiry beyond scope',
  'Patient expressing severe distress',
  'Medication dosage clarification needed',
  'Insurance coverage dispute',
  'Appointment scheduling conflict',
  'Patient requesting second opinion',
  'Technical system issue preventing resolution',
  'Policy exception required',
  'Other'
];

export const EscalateCallModal: React.FC<EscalateCallModalProps> = ({
  open,
  onClose,
  callId,
  onEscalationSuccess,
}) => {
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [reason, setReason] = useState<string>('');
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loadingSupervisors, setLoadingSupervisors] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      loadSupervisors();
      // Reset form when modal opens
      setPriority('medium');
      setReason('');
      setSelectedSupervisor('');
      setError('');
    }
  }, [open]);

  const loadSupervisors = async () => {
    setLoadingSupervisors(true);
    try {
      const response = await agentApi.getSupervisors();
      setSupervisors(response || []);
      if (response && response.length > 0) {
        setSelectedSupervisor(response[0].user_id);
      }
    } catch (err: any) {
      setError('Failed to load supervisors. Please try again.');
      console.error('Error loading supervisors:', err);
    } finally {
      setLoadingSupervisors(false);
    }
  };

  const handleEscalate = async () => {
    if (!reason) {
      setError('Please select an escalation reason');
      return;
    }

    if (!selectedSupervisor) {
      setError('No supervisor available for escalation');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const escalationData = {
        call_id: callId,
        escalation_reason: reason,
        escalation_type: 'manual' as const,
        priority_level: priority,
        escalated_to_id: selectedSupervisor,
      };

      const response = await agentApi.escalateCall(escalationData);

      // Success callback
      if (onEscalationSuccess) {
        onEscalationSuccess(response);
      }

      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to escalate call. Please try again.');
      console.error('Error escalating call:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePriorityChange = (event: SelectChangeEvent<string>) => {
    setPriority(event.target.value as 'low' | 'medium' | 'high');
  };

  const handleReasonChange = (event: SelectChangeEvent<string>) => {
    setReason(event.target.value);
  };

  const handleSupervisorChange = (event: SelectChangeEvent<string>) => {
    setSelectedSupervisor(event.target.value);
  };

  const getPriorityColor = (value: string) => {
    const option = PRIORITY_OPTIONS.find(opt => opt.value === value);
    return option?.color || '#6b7280';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: '500px',
        }
      }}
    >
      <DialogTitle sx={{ p: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: '#fee2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <WarningIcon sx={{ color: '#dc2626', fontSize: 24 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
              Escalate Call
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: '#6b7280',
              '&:hover': { bgcolor: '#f3f4f6' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ color: '#6b7280', mt: 1, ml: 7 }}>
          This will immediately notify a supervisor for urgent intervention
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: 2, overflow: 'visible' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Priority Selection */}
          <FormControl fullWidth>
            <InputLabel>Escalation priority</InputLabel>
            <Select
              value={priority}
              onChange={handlePriorityChange}
              label="Escalation priority"
              disabled={loading}
            >
              {PRIORITY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: option.color,
                      }}
                    />
                    <Typography variant="body2">{option.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Reason Selection */}
          <FormControl fullWidth>
            <InputLabel>Escalation reason</InputLabel>
            <Select
              value={reason}
              onChange={handleReasonChange}
              label="Escalation reason"
              disabled={loading}
            >
              <MenuItem value="">
                <em>Select reason</em>
              </MenuItem>
              {REASON_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Supervisor Selection */}
          <FormControl fullWidth>
            <InputLabel>Assign to supervisor</InputLabel>
            <Select
              value={selectedSupervisor}
              onChange={handleSupervisorChange}
              label="Assign to supervisor"
              disabled={loading || loadingSupervisors}
            >
              {loadingSupervisors ? (
                <MenuItem disabled>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} />
                    <Typography>Loading supervisors...</Typography>
                  </Box>
                </MenuItem>
              ) : supervisors.length === 0 ? (
                <MenuItem disabled>No supervisors available</MenuItem>
              ) : (
                supervisors.map((supervisor) => (
                  <MenuItem key={supervisor.user_id} value={supervisor.user_id}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {supervisor.full_name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        {supervisor.designation} - {supervisor.email}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{
            textTransform: 'none',
            color: '#6b7280',
            borderColor: '#d1d5db',
            '&:hover': {
              borderColor: '#9ca3af',
              bgcolor: '#f9fafb',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleEscalate}
          variant="contained"
          disabled={loading || !reason || !selectedSupervisor}
          sx={{
            textTransform: 'none',
            bgcolor: '#dc2626',
            '&:hover': {
              bgcolor: '#b91c1c',
            },
            '&:disabled': {
              bgcolor: '#fca5a5',
              color: '#ffffff',
            },
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1, color: '#ffffff' }} />
              Escalating...
            </>
          ) : (
            'Escalate Now'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};