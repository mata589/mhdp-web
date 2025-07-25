// File: src/pages/agent/LiveCallInterface/LiveCallInterface.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
  Chip,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  LinearProgress,
  Divider,
  Alert
} from '@mui/material';
import {
  Phone,
  PhoneDisabled,
  Mic,
  MicOff,
  VolumeUp,
  VolumeOff,
  RecordVoiceOver,
  Assignment,
  Warning,
  Send
} from '@mui/icons-material';

export const LiveCallInterface: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(245); // seconds
  const [sentiment, setSentiment] = useState('neutral');
  const [notes, setNotes] = useState('');
  const [escalationReason, setEscalationReason] = useState('');

  useEffect(() => {
    if (isCallActive) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setIsCallActive(false);
  };

  const handleEscalate = () => {
    console.log('Escalating call:', escalationReason);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Grid container spacing={3}>
        {/* Call Status Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{ 
                  width: 80, 
                  height: 80, 
                  mx: 'auto', 
                  mb: 2,
                  bgcolor: isCallActive ? '#4caf50' : '#f44336'
                }}
              >
                <Phone sx={{ fontSize: 40 }} />
              </Avatar>
              
              <Typography variant="h6" gutterBottom>
                John Doe
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                +256 700 123 456
              </Typography>
              
              <Chip
                label={isCallActive ? 'Active Call' : 'Call Ended'}
                color={isCallActive ? 'success' : 'error'}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                {formatTime(callDuration)}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                <IconButton
                  color={isMuted ? 'error' : 'primary'}
                  onClick={() => setIsMuted(!isMuted)}
                  disabled={!isCallActive}
                >
                  {isMuted ? <MicOff /> : <Mic />}
                </IconButton>
                
                <IconButton color="primary" disabled={!isCallActive}>
                  <VolumeUp />
                </IconButton>
                
                <IconButton color="primary" disabled={!isCallActive}>
                  <RecordVoiceOver />
                </IconButton>
              </Box>
              
              <Button
                variant="contained"
                color="error"
                startIcon={<PhoneDisabled />}
                onClick={handleEndCall}
                disabled={!isCallActive}
                fullWidth
              >
                End Call
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Call Details & Notes */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {/* Sentiment Analysis */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Real-time Analysis
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Sentiment: <Chip 
                        label={sentiment} 
                        color={sentiment === 'positive' ? 'success' : sentiment === 'negative' ? 'error' : 'default'}
                        size="small"
                      />
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={sentiment === 'positive' ? 80 : sentiment === 'negative' ? 20 : 50}
                      color={sentiment === 'positive' ? 'success' : sentiment === 'negative' ? 'error' : 'primary'}
                    />
                  </Box>
                  
                  {sentiment === 'negative' && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      Negative sentiment detected. Consider de-escalation techniques.
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Call Notes */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: 300 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Call Notes
                  </Typography>
                  <TextField
                    multiline
                    rows={8}
                    placeholder="Enter call notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </Grid>

            {/* Escalation */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: 300 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Escalation
                  </Typography>
                  <TextField
                    multiline
                    rows={6}
                    placeholder="Reason for escalation..."
                    value={escalationReason}
                    onChange={(e) => setEscalationReason(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<Warning />}
                    onClick={handleEscalate}
                    fullWidth
                    disabled={!escalationReason.trim()}
                  >
                    Escalate to Supervisor
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Call History */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Interactions
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Previous call - 2 days ago"
                    secondary="Duration: 15:30 | Issue: Medication inquiry | Status: Resolved"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Previous call - 1 week ago"
                    secondary="Duration: 8:45 | Issue: Appointment scheduling | Status: Resolved"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
