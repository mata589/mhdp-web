import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  Chip,
  Button,
  TextField,
  IconButton
} from '@mui/material';
import {
  ArrowBack,
  Phone,
  PhoneMissed
} from '@mui/icons-material';

export const CallReviewScreen = () => {
  const [callNotes, setCallNotes] = useState('I tried reaching the caller, but they were unavailable.');

  const callData = {
    id: '2031',
    callerId: '#2031',
    status: 'Returned',
    lastCall: 'Jul 13, 2025 | 10:43AM',
    callCount: 10,
    riskLevel: 'Critical'
  };

  const callHistory = [
    { time: '10:40 AM', status: 'Missed', id: '#2031' },
    { time: '10:40 AM', status: 'Missed', id: '#2031' },
    { time: '10:39 AM', status: 'Missed', id: '#2031' },
    { time: '10:38 AM', status: 'Missed', id: '#2031' },
    { time: '10:36 AM', status: 'Missed', id: '#2031' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Grid container>
        {/* Main Content */}
        <Grid item xs={12} md={8} sx={{ p: 4, maxWidth: '1200px' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
            <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}>
              <ArrowBack />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Missed call #{callData.id}
                </Typography>
                <Chip
                  label={callData.status}
                  sx={{
                    bgcolor: '#d4f4dd',
                    color: '#0d7c3a',
                    fontWeight: 500,
                    border: 'none'
                  }}
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Last call: {callData.lastCall}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Phone />}
              sx={{
                bgcolor: '#0d7c3a',
                '&:hover': { bgcolor: '#0a6330' },
                textTransform: 'none',
                px: 3,
                py: 1.5,
                borderRadius: 2
              }}
            >
              Call back
            </Button>
          </Box>

          {/* Info Card */}
          <Card sx={{ mb: 4, p: 4, borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 6,
                bgcolor: '#f8f9fa',
                p: 4,
                borderRadius: 2
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Caller ID
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {callData.callerId}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Status
                </Typography>
                <Chip
                  label={callData.status}
                  sx={{
                    bgcolor: '#d4f4dd',
                    color: '#0d7c3a',
                    fontWeight: 500,
                    border: 'none',
                    mt: 0.5
                  }}
                  size="small"
                />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Call Count
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {callData.callCount}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Risk Level
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#dc3545'
                    }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#dc3545' }}>
                    {callData.riskLevel}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>

          {/* Call Notes */}
          <Card sx={{ p: 4, borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Call Notes
            </Typography>
            <TextField
              multiline
              rows={6}
              fullWidth
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
              placeholder="Add notes about this call..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  '& fieldset': { borderColor: '#e0e0e0' }
                }
              }}
            />
          </Card>
        </Grid>

        {/* Sidebar - Call History */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            bgcolor: 'white',
            borderLeft: '1px solid #e0e0e0',
            p: 4,
            minWidth: '420px'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Call history
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 2, fontWeight: 500 }}
          >
            Jul 13, 2025
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {callHistory.map((call, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  bgcolor: '#f8f9fa',
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#f0f0f0' },
                  cursor: 'pointer'
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: '#fee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <PhoneMissed sx={{ fontSize: 20, color: '#dc3545' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {call.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {call.status} | Call ID: {call.id}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};