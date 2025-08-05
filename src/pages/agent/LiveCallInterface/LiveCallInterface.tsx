// File: src/pages/agent/LiveCallInterface/LiveCallInterface.tsx
import React, { useState, useEffect } from 'react';
import { GridLegacy as Grid } from '@mui/material';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
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
  Alert,
  Stack,
  Badge
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
  Send,
  Pause,
  FileCopy,
  Person
} from '@mui/icons-material';

interface CallData {
  callerId: string;
  callerType: string;
  language: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  callerSex: string;
  speakerName: string;
  duration: number;
}

export const LiveCallInterface: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(480); // 8:00 minutes
  const [notes, setNotes] = useState('');
  const [escalationReason, setEscalationReason] = useState('');

  const [callData] = useState<CallData>({
    callerId: '#2031',
    callerType: 'Patient',
    language: 'English',
    riskLevel: 'Medium',
    callerSex: 'Female',
    speakerName: 'James Gipe (54%)',
    duration: 480
  });

  const [transcription] = useState([
    {
      speaker: 'J',
      name: 'James Gipe',
      time: '8:04',
      message: 'Hello, this is Dr. James from Butabika. How can I help you today?'
    },
    {
      speaker: 'C',
      name: 'Caller #2031',
      time: '8:06',
      message: "Hi, I've been feeling very anxious lately and I'm not sure what to do about it. It's affecting my work and my relationships."
    },
    {
      speaker: 'J',
      name: 'James Gipe',
      time: '8:08',
      message: 'Sorry about this...'
    }
  ]);

  const [detectedKeywords] = useState([
    'depression', 'work', 'stress', 'medication', 'family',
    'family', 'suicide', 'stress', 'anxiety'
  ]);

  const [topicsDiscussed] = useState([
    'Depression',
    'Anxiety management',
    'Psychosis'
  ]);

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

  // No Active Call State
  if (!isCallActive) {
    return (
      <Box sx={{ 
        p: 3, 
        minHeight: '100vh', 
        backgroundColor: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box sx={{ textAlign: 'center', maxWidth: 400 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, justifyContent: 'center' }}>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              backgroundColor: '#4caf50' 
            }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#4caf50' }}>
              Ready for Next Call
            </Typography>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <svg width="200" height="150" viewBox="0 0 200 150" style={{ marginBottom: '20px' }}>
              <rect x="50" y="60" width="100" height="60" rx="8" fill="#008080" />
              <rect x="55" y="65" width="90" height="35" rx="4" fill="#ffffff" />
              <circle cx="100" cy="40" r="15" fill="#ffa500" />
              <path d="M85 45 Q100 30 115 45" stroke="#212121" strokeWidth="2" fill="none" />
              <circle cx="95" cy="42" r="1.5" fill="#212121" />
              <circle cx="105" cy="42" r="1.5" fill="#212121" />
              <rect x="75" y="100" width="15" height="8" rx="2" fill="#008080" />
              <rect x="110" y="100" width="15" height="8" rx="2" fill="#008080" />
            </svg>
          </Box>
          
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#212121' }}>
            No active call
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            When a call comes through, you will be able to<br />
            answer incoming calls.
          </Typography>
        </Box>
      </Box>
    );
  }

  // Active Call State
  return (
    <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        {/* Left Panel - Call Info & Transcription */}
        <Grid item xs={12} md={8}>
          {/* Call Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              backgroundColor: '#f44336' 
            }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Live Call - {formatTime(callDuration)}
            </Typography>
          </Box>

          {/* Call Details Card */}
          <Card sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={2}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Caller ID
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {callData.callerId}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Caller Type
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {callData.callerType}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Language
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {callData.language}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Risk Level
                  </Typography>
                  <Chip
                    label={callData.riskLevel}
                    size="small"
                    sx={{
                      backgroundColor: callData.riskLevel === 'High' ? '#f44336' : 
                                     callData.riskLevel === 'Medium' ? '#ff9800' : '#4caf50',
                      color: 'white',
                      fontWeight: 500,
                      height: 20,
                      fontSize: '0.75rem'
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Caller Sex
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {callData.callerSex}
                  </Typography>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Speaking:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {callData.speakerName}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Call Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <IconButton
              sx={{ 
                width: 56, 
                height: 56, 
                backgroundColor: '#f5f5f5',
                '&:hover': { backgroundColor: '#e0e0e0' }
              }}
            >
              <Mic />
            </IconButton>
            <IconButton
              sx={{ 
                width: 56, 
                height: 56, 
                backgroundColor: '#f5f5f5',
                '&:hover': { backgroundColor: '#e0e0e0' }
              }}
            >
              <VolumeUp />
            </IconButton>
            <IconButton
              sx={{ 
                width: 56, 
                height: 56, 
                backgroundColor: '#212121',
                color: 'white',
                '&:hover': { backgroundColor: '#424242' }
              }}
            >
              <Pause />
            </IconButton>
            <IconButton
              sx={{ 
                width: 56, 
                height: 56, 
                backgroundColor: '#f44336',
                color: 'white',
                '&:hover': { backgroundColor: '#d32f2f' }
              }}
              onClick={handleEndCall}
            >
              <PhoneDisabled />
            </IconButton>
            <IconButton
              sx={{ 
                width: 56, 
                height: 56, 
                backgroundColor: '#ff9800',
                color: 'white',
                '&:hover': { backgroundColor: '#f57c00' }
              }}
            >
              <Warning />
            </IconButton>
          </Box>

          {/* Transcription */}
          <Card sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Transcription
              </Typography>
              
              <Stack spacing={2}>
                {transcription.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        backgroundColor: item.speaker === 'J' ? '#008080' : '#607d8b',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}
                    >
                      {item.speaker}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.time}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {item.message}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Call Notes */}
          <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Call Notes
              </Typography>
              
              <TextField
                multiline
                rows={6}
                placeholder="Type your notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Auto-save enabled
                </Typography>
                <Button
                  variant="contained"
                  sx={{ 
                    backgroundColor: '#008080',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500
                  }}
                >
                  Save Notes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Panel - Analysis & Actions */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Analysis
          </Typography>

          {/* Sentiment Analysis */}
          <Card sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Agent Sentiment
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      60%
                    </Typography>
                    <Chip label="Neutral" size="small" sx={{ backgroundColor: '#607d8b', color: 'white' }} />
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={60}
                  sx={{ height: 6, borderRadius: 3, backgroundColor: '#f5f5f5' }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Caller Sentiment
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      60%
                    </Typography>
                    <Chip label="Neutral" size="small" sx={{ backgroundColor: '#607d8b', color: 'white' }} />
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={60}
                  sx={{ height: 6, borderRadius: 3, backgroundColor: '#f5f5f5' }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Conversation Quality
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      84%
                    </Typography>
                    <Chip label="Very Good" size="small" sx={{ backgroundColor: '#4caf50', color: 'white' }} />
                  </Box>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={84}
                  sx={{ 
                    height: 6, 
                    borderRadius: 3, 
                    backgroundColor: '#f5f5f5',
                    '& .MuiLinearProgress-bar': { backgroundColor: '#4caf50' }
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Detected Keywords */}
          <Card sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Detected Keywords
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {detectedKeywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: '#e0e0e0' }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Topics Discussed */}
          <Card sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Topics Discussed
              </Typography>
              
              <Stack spacing={1}>
                {topicsDiscussed.map((topic, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    {topic}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Actions
              </Typography>
              
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<FileCopy />}
                  fullWidth
                  sx={{ 
                    borderColor: '#008080',
                    color: '#008080',
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: '8px'
                  }}
                >
                  Follow-up
                </Button>
                
                <Button
                  variant="contained"
                  startIcon={<Warning />}
                  fullWidth
                  sx={{ 
                    backgroundColor: '#f44336',
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: '8px',
                    '&:hover': { backgroundColor: '#d32f2f' }
                  }}
                >
                  Escalate Call
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};