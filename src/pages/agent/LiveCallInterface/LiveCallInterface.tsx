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
    

       {/* Main Container Card */}
       <Card sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', backgroundColor: '#FFFFFF', border: '1px solid #DADADA' }}>
            <CardContent sx={{ p: 3 }}>
              {/* Live Call Header */}
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

              {/* Call Details Inner Card */}
              <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', backgroundColor: '#f8fffe', border: '1px solid #CCE5E5' }}>
                <CardContent sx={{ p: 3 }}>
                  {/* First Row */}
                  <Grid container spacing={4} sx={{ mb: 3 }}>
                    <Grid item xs={2.4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.75rem', display: 'block', mb: 1 }}>
                        Caller ID
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem', color: '#333' }}>
                        {callData.callerId}
                      </Typography>
                    </Grid>
                    <Grid item xs={2.4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.75rem', display: 'block', mb: 1 }}>
                        Caller Type
                      </Typography>
                      <Chip
                        label="Patient"
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(14, 165, 233, 0.1)',
                          border: '1px solid #0ea5e9',
                          color: '#0284c7',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          height: 28,
                          borderRadius: '14px'
                        }}
                      />
                    </Grid>
                    <Grid item xs={2.4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.75rem', display: 'block', mb: 1 }}>
                        Language
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem', color: '#333' }}>
                        {callData.language}
                      </Typography>
                    </Grid>
                    <Grid item xs={2.4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.75rem', display: 'block', mb: 1 }}>
                        Caller Sex
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem', color: '#333' }}>
                        {callData.callerSex}
                      </Typography>
                    </Grid>
                    <Grid item xs={2.4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.75rem', display: 'block', mb: 1 }}>
                        Trajectory of care
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem', color: '#333' }}>
                        Already in care
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  {/* Second Row */}
                  <Grid container spacing={4}>
                    <Grid item xs={2.4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.75rem', display: 'block', mb: 1 }}>
                        Risk Level
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          backgroundColor: '#f44336' 
                        }} />
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#f44336', fontSize: '1rem' }}>
                          Critical
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={2.4}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.75rem', display: 'block', mb: 1 }}>
                        Agent
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem', color: '#333' }}>
                        James Gipir
                      </Typography>
                    </Grid>
                    <Grid item xs={7.2}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.75rem', display: 'block', mb: 1 }}>
                        Speakers
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label="Caller (54%)"
                          size="small"
                          sx={{
                            backgroundColor: '#f5f5f5',
                            color: '#666',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            height: 28,
                            borderRadius: '14px',
                            border: '1px solid #e0e0e0'
                          }}
                        />
                        <Chip
                          label="Agent (45%)"
                          size="small"
                          sx={{
                            backgroundColor: '#f5f5f5',
                            color: '#666',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            height: 28,
                            borderRadius: '14px',
                            border: '1px solid #e0e0e0'
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Call Controls Container */}
          <Card sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', backgroundColor: '#FFFFFF', border: '1px solid #DADADA' }}>
            <CardContent sx={{ p: 3 }}>
              {/* Call Controls */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
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
            </CardContent>
          </Card>
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
  {/* Analysis Section */}
  <Card sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', backgroundColor: '#FFFFFF', border: '1px solid #DADADA' }}>
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
        Analysis
      </Typography>

      {/* Agent Sentiment */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
            Agent Sentiment
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
              80%
            </Typography>
            <Chip 
              label="Positive" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(74, 222, 128, 0.1)',
                border: '1px solid #22c55e',
                color: '#15803d',
                fontWeight: 600,
                fontSize: '0.7rem'
              }} 
            />
          </Box>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={80}
          sx={{ 
            height: 8, 
            borderRadius: 4, 
            backgroundColor: '#f0f0f0',
            '& .MuiLinearProgress-bar': { 
              backgroundColor: '#008080',
              borderRadius: 4
            }
          }}
        />
      </Box>

      {/* Caller Sentiment */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
            Caller Sentiment
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
              69%
            </Typography>
            <Chip 
              label="Neutral" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid #f59e0b',
                color: '#d97706',
                fontWeight: 600,
                fontSize: '0.7rem'
              }} 
            />
          </Box>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={69}
          sx={{ 
            height: 8, 
            borderRadius: 4, 
            backgroundColor: '#f0f0f0',
            '& .MuiLinearProgress-bar': { 
              backgroundColor: '#008080',
              borderRadius: 4
            }
          }}
        />
      </Box>

      {/* Conversation Quality */}
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
            Conversation Quality
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
              84%
            </Typography>
            <Chip 
              label="Very Good" 
              size="small" 
              sx={{ 
                backgroundColor: 'rgba(74, 222, 128, 0.1)',
                border: '1px solid #22c55e',
                color: '#15803d',
                fontWeight: 600,
                fontSize: '0.7rem'
              }} 
            />
          </Box>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={84}
          sx={{ 
            height: 8, 
            borderRadius: 4, 
            backgroundColor: '#f0f0f0',
            '& .MuiLinearProgress-bar': { 
              backgroundColor: '#008080',
              borderRadius: 4
            }
          }}
        />
      </Box>
    </CardContent>
  </Card>

  {/* Technical Quality Section */}
  <Card sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', backgroundColor: '#FFFFFF', border: '1px solid #DADADA' }}>
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
        Technical Quality
      </Typography>

      {/* Network Quality */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
            Network Quality
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
            3.8/5
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={76} // 3.8/5 = 76%
          sx={{ 
            height: 6, 
            borderRadius: 3, 
            backgroundColor: '#f0f0f0',
            '& .MuiLinearProgress-bar': { 
              backgroundColor: '#ff9800',
              borderRadius: 3
            }
          }}
        />
      </Box>

      {/* Audio Quality */}
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
            Audio Quality
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
            4.5/5
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={90} // 4.5/5 = 90%
          sx={{ 
            height: 6, 
            borderRadius: 3, 
            backgroundColor: '#f0f0f0',
            '& .MuiLinearProgress-bar': { 
              backgroundColor: '#ff9800',
              borderRadius: 3
            }
          }}
        />
        <Typography variant="caption" sx={{ color: '#999', fontSize: '0.75rem', mt: 1, display: 'block' }}>
          Clear audio with minimal background noise
        </Typography>
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