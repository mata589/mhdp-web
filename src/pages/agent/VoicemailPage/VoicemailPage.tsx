// src/pages/agent/VoicemailPage/VoicemailPage.tsx
import React, { useState, useRef } from 'react';
import { GridLegacy as Grid } from '@mui/material';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Phone as CallBackIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Download as DownloadIcon,
  Visibility as ViewBreakdownIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

interface VoicemailData {
  id: string;
  callerId: string;
  callerType: 'Patient' | 'Family' | 'Professional';
  language: string;
  callerSex: 'Male' | 'Female';
  trajectoryOfCare: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  speakers: string;
  timestamp: string;
  status: 'Unresolved' | 'Resolved';
  summary: string;
  recording: {
    duration: string;
    audioUrl: string;
  };
  transcription: {
    speaker: string;
    timestamp: string;
    text: string;
  }[];
  analysis: {
    sentiment: number;
    sentimentLabel: string;
    networkQuality: number;
    audioQuality: number;
    audioQualityNote: string;
    detectedKeywords: string[];
    topicsDiscussed: string[];
  };
}

// Mock data - replace with actual API call
const mockVoicemailData: VoicemailData = {
  id: '2031',
  callerId: '#2031',
  callerType: 'Patient',
  language: 'English',
  callerSex: 'Female',
  trajectoryOfCare: 'Already in care',
  riskLevel: 'Critical',
  speakers: 'Caller (99%)',
  timestamp: 'Jul 13, 2025 | 10:43 AM - 11:06 AM',
  status: 'Unresolved',
  summary: 'The caller has been having really dark thoughts lately and really needs someone to talk to. She is scared about what she might do and she really needs help.',
  recording: {
    duration: '0:45 / 2:18',
    audioUrl: '/mock-audio.mp3',
  },
  transcription: [
    {
      speaker: 'Caller #2031',
      timestamp: '0:01',
      text: 'Hello, my name is [name]. I\'ve been having really dark thoughts lately and I don\'t know who to talk to. I called earlier but no one was available. I\'m scared about what I might do. Please call me back as soon as possible. I really need help.',
    },
  ],
  analysis: {
    sentiment: 69,
    sentimentLabel: 'Neutral',
    networkQuality: 3.8,
    audioQuality: 4.5,
    audioQualityNote: 'Clear audio with minimal background noise',
    detectedKeywords: ['depression', 'work', 'stress', 'medication', 'family'],
    topicsDiscussed: ['Depression'],
  },
};

export const VoicemailPage: React.FC = () => {
  const navigate = useNavigate();
  const { voicemailId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // In a real app, fetch voicemail data based on voicemailId
  const voicemailData = mockVoicemailData;

  const handleBack = () => {
    navigate('/agent/voicemail');
  };

  const handleCallBack = () => {
    // Implement call back functionality
    console.log('Calling back:', voicemailData.callerId);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log('Downloading recording');
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return '#dc2626';
      case 'High': return '#ea580c';
      case 'Medium': return '#d97706';
      case 'Low': return '#059669';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Resolved' ? '#059669' : '#dc2626';
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={600}>
          Voicemail #{voicemailData.id}
        </Typography>
        <Chip
          label={voicemailData.status}
          sx={{
            ml: 2,
            bgcolor: getStatusColor(voicemailData.status),
            color: 'white',
            fontWeight: 500,
          }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
          {voicemailData.timestamp}
        </Typography>
        <Button
          variant="contained"
          startIcon={<CallBackIcon />}
          onClick={handleCallBack}
          sx={{ ml: 2, bgcolor: '#0d9488', '&:hover': { bgcolor: '#0f766e' } }}
        >
          Call back
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Main Content */}
        <Grid item xs={12} md={8}>
          {/* Caller Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Caller ID
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {voicemailData.callerId}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Caller Type
                  </Typography>
                  <Chip
                    label={voicemailData.callerType}
                    size="small"
                    sx={{ bgcolor: '#e0f2fe', color: '#0277bd' }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Language
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {voicemailData.language}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Caller Sex
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {voicemailData.callerSex}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Trajectory of care
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {voicemailData.trajectoryOfCare}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Risk Level
                  </Typography>
                  <Chip
                    label={voicemailData.riskLevel}
                    size="small"
                    sx={{
                      bgcolor: getRiskLevelColor(voicemailData.riskLevel),
                      color: 'white',
                      fontWeight: 500,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Speakers
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {voicemailData.speakers}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Call Summary */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Call Summary
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {voicemailData.summary}
              </Typography>
            </CardContent>
          </Card>

          {/* Call Recording */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Call Recording
                </Typography>
                <IconButton onClick={handleDownload}>
                  <DownloadIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  onClick={handlePlayPause}
                  sx={{
                    bgcolor: '#0d9488',
                    color: 'white',
                    '&:hover': { bgcolor: '#0f766e' },
                  }}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </IconButton>
                <LinearProgress
                  variant="determinate"
                  value={30}
                  sx={{
                    flexGrow: 1,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': { bgcolor: '#0d9488' },
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {voicemailData.recording.duration}
                </Typography>
              </Box>
              <audio ref={audioRef} src={voicemailData.recording.audioUrl} />
            </CardContent>
          </Card>

          {/* Transcription */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Transcription
              </Typography>
              {voicemailData.transcription.map((entry, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: '#0d9488',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      C
                    </Box>
                    <Typography variant="body2" fontWeight={500}>
                      {entry.speaker}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      - {entry.timestamp}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 4, lineHeight: 1.6 }}>
                    {entry.text}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Analysis */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: 24 }}>
            {/* Analysis Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Analysis
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<ViewBreakdownIcon />}
                onClick={() => setShowBreakdown(!showBreakdown)}
                sx={{ borderColor: '#0d9488', color: '#0d9488' }}
              >
                View breakdown
              </Button>
            </Box>

            {/* Caller Sentiment */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Caller Sentiment
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={voicemailData.analysis.sentiment}
                  sx={{
                    flexGrow: 1,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': { bgcolor: '#0d9488' },
                  }}
                />
                <Typography variant="body1" fontWeight={600}>
                  {voicemailData.analysis.sentiment}%
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#f59e0b',
                  }}
                />
                {voicemailData.analysis.sentimentLabel}
              </Typography>
            </Paper>

            {/* Technical Quality */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="body1" fontWeight={600} gutterBottom>
                Technical Quality
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Network Quality
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {voicemailData.analysis.networkQuality}/5
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(voicemailData.analysis.networkQuality / 5) * 100}
                  sx={{
                    height: 4,
                    borderRadius: 2,
                    bgcolor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': { bgcolor: '#f59e0b' },
                  }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Audio Quality
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {voicemailData.analysis.audioQuality}/5
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(voicemailData.analysis.audioQuality / 5) * 100}
                  sx={{
                    height: 4,
                    borderRadius: 2,
                    bgcolor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': { bgcolor: '#f59e0b' },
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  {voicemailData.analysis.audioQualityNote}
                </Typography>
              </Box>
            </Paper>

            {/* Detected Keywords */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="body1" fontWeight={600} gutterBottom>
                Detected Keywords
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {voicemailData.analysis.detectedKeywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    size="small"
                    sx={{ bgcolor: '#f3f4f6', color: '#374151' }}
                  />
                ))}
              </Box>
            </Paper>

            {/* Topics Discussed */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="body1" fontWeight={600} gutterBottom>
                Topics Discussed
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {voicemailData.analysis.topicsDiscussed.map((topic, index) => (
                  <Chip
                    key={index}
                    label={topic}
                    size="small"
                    sx={{ bgcolor: '#f3f4f6', color: '#374151' }}
                  />
                ))}
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};