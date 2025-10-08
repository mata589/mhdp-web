// src/pages/agent/CallHistory/CallHistory.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ArrowBack as ArrowBackIcon,
  PlayArrow as PlayArrowIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { ActionButtonsGroup } from '../../../components/common/ActionButtonsGroup/ActionButtonsGroup';

const mockCallHistory = [
  {
    id: '#2090',
    dateTime: 'Mon, July 13, 2025\n10:41 AM - 10:51 AM',
    callerID: '#2090\nEnglish',
    primaryTopic: 'Anxiety Management',
    riskLevel: 'medium',
    outcome: 'Advice Given',
    qualityScore: 78,
  },
  {
    id: '#2031',
    dateTime: 'Mon, July 13, 2025\n10:43 AM - 10:51 AM',
    callerID: '#2031\nEnglish',
    primaryTopic: 'Depression',
    riskLevel: 'high',
    outcome: 'Escalated',
    qualityScore: 81,
  },
  {
    id: '#2034',
    dateTime: 'Mon, July 13, 2025\n10:41 AM - 10:51 AM',
    callerID: '#2034\nLuganda',
    primaryTopic: 'Psychosis',
    riskLevel: 'low',
    outcome: 'Advice Given',
    qualityScore: 78,
  },
  {
    id: '#2031-2',
    dateTime: 'Mon, July 13, 2025\n10:41 AM - 10:51 AM',
    callerID: '#2031\nEnglish',
    primaryTopic: 'Anxiety Management',
    riskLevel: 'medium',
    outcome: 'Referred',
    qualityScore: 78,
  },
  {
    id: '#2063',
    dateTime: 'Mon, July 13, 2025\n10:41 AM - 10:51 AM',
    callerID: '#2063\nEnglish',
    primaryTopic: 'Anxiety Management',
    riskLevel: 'high',
    outcome: 'Advice Given',
    qualityScore: 78,
  },
  {
    id: '#2031-3',
    dateTime: 'Mon, July 13, 2025\n10:43 AM - 10:51 AM',
    callerID: '#2031\nEnglish',
    primaryTopic: 'Depression',
    riskLevel: 'low',
    outcome: 'Referred',
    qualityScore: 78,
  },
  {
    id: '#2012',
    dateTime: 'Mon, July 13, 2025\n10:43 AM - 10:51 AM',
    callerID: '#2012\nEnglish',
    primaryTopic: 'Psychosis',
    riskLevel: 'medium',
    outcome: 'Advice Given',
    qualityScore: 78,
  },
];




// Mock data for call details
const getCallDetails = (callId: string) => {
  const baseCall = {
    id: callId,
    callerType: 'Patient',
    language: 'English',
    gender: 'Female',
    frequencyOfCare: 'Anxiety Disorder',
    riskLevel: 'Critical',
    agent: 'James Gipar',
    speakers: {
      caller: 'Caller (44%)',
      agent: 'Agent (66%)'
    },
    sentiment: {
      agent: { value: 80, label: 'Positive', color: '#16a34a' },
      caller: { value: 69, label: 'Neutral', color: '#d97706' },
      conversation: { value: 84, label: 'Very Good', color: '#16a34a' }
    },
    technicalQuality: {
      network: { value: 3.8, max: 5 },
      audio: { value: 4.5, max: 5, note: 'Clear audio except background noise' }
    },
    keywords: ['depression', 'work', 'stress', 'medication', 'family', 'health', 'suicide', 'stress', 'anxiety'],
    topics: ['Depression', 'Anxiety management', 'Psychosis'],
    outcome: {
      status: 'Escalated',
      reason: 'Escalation Reason',
      escalatedTo: 'Dr. Bosco Kimuli',
      time: '09:17 AM (4 minutes into call)',
      note: 'Suicidal intention'
    },
    summary: `The caller discussed difficulties managing anxiety, including trouble sleeping and medication adherence. They expressed concerns about side effects and admitted to missing doses occasionally.

The agent responded with empathy, provided guidance on coping strategies (e.g., breathing exercises, routine building), and clarified the importance of medication compliance. The caller was receptive, and no immediate risk was...`,
    callNotes: `Caller reported anxiety linked to family stress and poor sleep. Sleep medication due to side effects. Advised on basic coping techniques and encouraged clinical follow-up. No immediate risk identified. Preferred language was Luganda and remained engaged throughout the call.`,
    transcription: [
      {
        speaker: 'James Gipar',
        time: '0:01',
        text: 'Hello, this is Dr. James from Butabika. How can I help you today?'
      },
      {
        speaker: 'Caller #2031',
        time: '0:06',
        text: 'Hi, I\'ve been feeling very anxious lately and I\'m not sure what to do about it. It\'s affecting my work and my relationships.'
      },
      {
        speaker: 'James Gipar',
        time: '0:08',
        text: 'I understand that anxiety can be very challenging. Can you tell me more about when these feelings started and what might be triggering them?'
      }
    ],
    recording: {
      duration: '2:34 / 12:34',
      isPlaying: false
    }
  };

  return baseCall;
};

const getRiskLevelColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'high':
    case 'critical':
      return { dotColor: '#dc2626', textColor: '#dc2626', label: 'High' };
    case 'medium':
      return { dotColor: '#d97706', textColor: '#d97706', label: 'Medium' };
    case 'low':
      return { dotColor: '#16a34a', textColor: '#16a34a', label: 'Low' };
    default:
      return { dotColor: '#6b7280', textColor: '#6b7280', label: 'Unknown' };
  }
};

const getOutcomeChipProps = (outcome: string) => {
  switch (outcome) {
    case 'Advice Given':
      return { 
        sx: { 
          bgcolor: '#f0fdf4', 
          color: '#16a34a', 
          border: '1px solid #bbf7d0',
          '& .MuiChip-label': { fontWeight: 500 }
        } 
      };
    case 'Escalated':
      return { 
        sx: { 
          bgcolor: '#fef2f2', 
          color: '#dc2626', 
          border: '1px solid #fecaca',
          '& .MuiChip-label': { fontWeight: 500 }
        } 
      };
    case 'Referred':
      return { 
        sx: { 
          bgcolor: '#eff6ff', 
          color: '#2563eb', 
          border: '1px solid #bfdbfe',
          '& .MuiChip-label': { fontWeight: 500 }
        } 
      };
    default:
      return { 
        sx: { 
          bgcolor: '#f9fafb', 
          color: '#6b7280', 
          border: '1px solid #e5e7eb',
          '& .MuiChip-label': { fontWeight: 500 }
        } 
      };
  }
};

const getQualityScoreColor = (score: number) => {
  if (score >= 80) return '#16a34a';
  if (score >= 60) return '#d97706';
  return '#dc2626';
};

// Call Details Component (embedded in the same file to avoid import issues)
const CallDetails: React.FC<{ callId: string; onBack: () => void }> = ({ callId, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const callDetails = getCallDetails(callId);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'critical':
      case 'high':
        return '#dc2626';
      case 'medium':
        return '#d97706';
      case 'low':
        return '#16a34a';
      default:
        return '#6b7280';
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          onClick={onBack}
          sx={{
            color: '#6b7280',
            '&:hover': { bgcolor: '#f3f4f6' }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
          Outgoing Call {callDetails.id}
        </Typography>
        <Chip
          label="Escalated"
          size="small"
          sx={{
            bgcolor: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca',
            fontWeight: 500,
            fontSize: '12px'
          }}
        />
        <Box sx={{ ml: 'auto' }}>
          <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '14px' }}>
            Analysis
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: '#0891b2',
              color: 'white',
              textTransform: 'none',
              fontSize: '12px',
              fontWeight: 500,
              '&:hover': { bgcolor: '#0e7490' }
            }}
          >
            View breakdown
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Column */}
        <Box sx={{ flex: 1 }}>
          {/* Call Info Card */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, mb: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 0.5 }}>
                  Caller ID
                </Typography>
                <Typography variant="body2" sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                  {callDetails.id}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 0.5 }}>
                  Caller Type
                </Typography>
                <Typography variant="body2" sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                  {callDetails.callerType}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 0.5 }}>
                  Language
                </Typography>
                <Typography variant="body2" sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                  {callDetails.language}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 0.5 }}>
                  Gender
                </Typography>
                <Typography variant="body2" sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                  {callDetails.gender}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 0.5 }}>
                  Frequency of Care
                </Typography>
                <Typography variant="body2" sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                  {callDetails.frequencyOfCare}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 0.5 }}>
                  Risk Level
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: getRiskColor(callDetails.riskLevel),
                    }}
                  />
                  <Typography variant="body2" sx={{ 
                    color: getRiskColor(callDetails.riskLevel), 
                    fontSize: '14px',
                    fontWeight: 500 
                  }}>
                    {callDetails.riskLevel}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 0.5 }}>
                  Agent
                </Typography>
                <Typography variant="body2" sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                  {callDetails.agent}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 0.5 }}>
                  Speakers
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                  {callDetails.speakers.caller}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                  {callDetails.speakers.agent}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Call Summary */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 2, fontSize: '16px' }}>
              Call Summary
            </Typography>
            <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px', lineHeight: 1.6 }}>
              {callDetails.summary}
            </Typography>
            <Button
              variant="text"
              sx={{
                color: '#0891b2',
                fontSize: '14px',
                textTransform: 'none',
                p: 0,
                mt: 1,
                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
              }}
            >
              View more
            </Button>
          </Paper>

          {/* Call Recording */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 2, fontSize: '16px' }}>
              Call Recording
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={handlePlayPause}
                sx={{
                  bgcolor: '#0891b2',
                  color: 'white',
                  width: 32,
                  height: 32,
                  '&:hover': { bgcolor: '#0e7490' }
                }}
              >
                <PlayArrowIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <Box sx={{ flex: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={20}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#0891b2',
                      borderRadius: 3
                    }
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '14px' }}>
                {callDetails.recording.duration}
              </Typography>
              <IconButton sx={{ color: '#6b7280' }}>
                <DownloadIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Paper>

          {/* Transcription */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 2, fontSize: '16px' }}>
              Transcription
            </Typography>
            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {callDetails.transcription.map((entry, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: entry.speaker.includes('James') ? '#0891b2' : '#6b7280',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      {entry.speaker.includes('James') ? 'J' : 'C'}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827', fontSize: '14px' }}>
                      {entry.speaker}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                      {entry.time}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px', ml: 4, lineHeight: 1.5 }}>
                    {entry.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Call Notes */}
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 2, fontSize: '16px' }}>
              Call Notes
            </Typography>
            <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px', lineHeight: 1.6 }}>
              {callDetails.callNotes}
            </Typography>
          </Paper>
        </Box>

        {/* Right Column */}
        <Box sx={{ width: 320 }}>
          {/* Analysis Card */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 3, fontSize: '16px' }}>
              Analysis
            </Typography>

            {/* Agent Sentiment */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
                  Agent Sentiment
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                    {callDetails.sentiment.agent.value}%
                  </Typography>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: callDetails.sentiment.agent.color,
                    }}
                  />
                  <Typography variant="body2" sx={{ 
                    color: callDetails.sentiment.agent.color, 
                    fontSize: '12px',
                    fontWeight: 500 
                  }}>
                    {callDetails.sentiment.agent.label}
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={callDetails.sentiment.agent.value}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: '#e5e7eb',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: callDetails.sentiment.agent.color,
                    borderRadius: 3
                  }
                }}
              />
            </Box>

            {/* Caller Sentiment */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
                  Caller Sentiment
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                    {callDetails.sentiment.caller.value}%
                  </Typography>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: callDetails.sentiment.caller.color,
                    }}
                  />
                  <Typography variant="body2" sx={{ 
                    color: callDetails.sentiment.caller.color, 
                    fontSize: '12px',
                    fontWeight: 500 
                  }}>
                    {callDetails.sentiment.caller.label}
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={callDetails.sentiment.caller.value}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: '#e5e7eb',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: callDetails.sentiment.caller.color,
                    borderRadius: 3
                  }
                }}
              />
            </Box>

            {/* Conversation Quality */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
                  Conversation Quality
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                    {callDetails.sentiment.conversation.value}%
                  </Typography>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: callDetails.sentiment.conversation.color,
                    }}
                  />
                  <Typography variant="body2" sx={{ 
                    color: callDetails.sentiment.conversation.color, 
                    fontSize: '12px',
                    fontWeight: 500 
                  }}>
                    {callDetails.sentiment.conversation.label}
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={callDetails.sentiment.conversation.value}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: '#e5e7eb',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: callDetails.sentiment.conversation.color,
                    borderRadius: 3
                  }
                }}
              />
            </Box>
          </Paper>

          {/* Technical Quality */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 3, fontSize: '16px' }}>
              Technical Quality
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
                  Network Quality
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                  {callDetails.technicalQuality.network.value}/{callDetails.technicalQuality.network.max}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(callDetails.technicalQuality.network.value / callDetails.technicalQuality.network.max) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: '#e5e7eb',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#d97706',
                    borderRadius: 3
                  }
                }}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
                  Audio Quality
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                  {callDetails.technicalQuality.audio.value}/{callDetails.technicalQuality.audio.max}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(callDetails.technicalQuality.audio.value / callDetails.technicalQuality.audio.max) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: '#e5e7eb',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#16a34a',
                    borderRadius: 3
                  }
                }}
              />
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mt: 0.5 }}>
                {callDetails.technicalQuality.audio.note}
              </Typography>
            </Box>
          </Paper>

          {/* Detected Keywords */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 2, fontSize: '16px' }}>
              Detected Keywords
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {callDetails.keywords.map((keyword, index) => (
                <Chip
                  key={index}
                  label={keyword}
                  size="small"
                  sx={{
                    bgcolor: '#f3f4f6',
                    color: '#374151',
                    fontSize: '12px',
                    height: 24
                  }}
                />
              ))}
            </Box>
          </Paper>

          {/* Topics Discussed */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 2, fontSize: '16px' }}>
              Topics Discussed
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {callDetails.topics.map((topic, index) => (
                <Box key={index} sx={{ 
                  bgcolor: '#f9fafb', 
                  p: 1.5, 
                  borderRadius: 1,
                  border: '1px solid #e5e7eb'
                }}>
                  <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
                    {topic}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Outcome */}
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', fontSize: '16px' }}>
                Outcome
              </Typography>
              <Chip
                label={callDetails.outcome.status}
                size="small"
                sx={{
                  bgcolor: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  fontWeight: 500,
                  fontSize: '12px'
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 0.5 }}>
                Escalation Reason
              </Typography>
              <Typography variant="body2" sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                {callDetails.outcome.reason}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 0.5 }}>
                Suicidal intention
              </Typography>
              <Typography variant="body2" sx={{ color: '#111827', fontSize: '14px', fontWeight: 500 }}>
                Escalated To
              </Typography>
              <Typography variant="body2" sx={{ color: '#111827', fontSize: '14px' }}>
                {callDetails.outcome.escalatedTo}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 0.5 }}>
                Escalation Time
              </Typography>
              <Typography variant="body2" sx={{ color: '#111827', fontSize: '14px' }}>
                {callDetails.outcome.time}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export const CallHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [languageFilter, setLanguageFilter] = useState('All languages');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const itemsPerPage = 10;

  // If a call is selected, show the call details page
  if (selectedCallId) {
    return (
      <CallDetails
        callId={selectedCallId}
        onBack={() => setSelectedCallId(null)}
      />
    );
  }

  const filteredCalls = mockCallHistory.filter(call => {
    const matchesSearch = call.callerID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.primaryTopic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCalls = filteredCalls.slice(startIndex, startIndex + itemsPerPage);

  const handleViewCall = (callId: string) => {
    setSelectedCallId(callId);
  };

  const handlePlayCall = (callId: string) => {
    console.log('Play call:', callId);
    // Add your play functionality here
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
          Call history
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Search by caller ID, agent or topic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              height: 40,
              fontSize: '14px',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            sx={{
              bgcolor: 'white',
              height: 40,
              fontSize: '14px',
              '& .MuiSelect-select': {
                py: 1,
              },
            }}
          >
            <MenuItem value="All status">All status</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Escalated">Escalated</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <Select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            displayEmpty
            sx={{
              bgcolor: 'white',
              height: 40,
              fontSize: '14px',
              '& .MuiSelect-select': {
                py: 1,
              },
            }}
          >
            <MenuItem value="All languages">All languages</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Luganda">Luganda</MenuItem>
          </Select>
        </FormControl>

        <Button
          startIcon={<FilterListIcon />}
          sx={{
            bgcolor: 'white',
            color: '#6b7280',
            border: '1px solid #d1d5db',
            height: 40,
            fontSize: '14px',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#f9fafb',
            },
          }}
        >
          More Filters
        </Button>
      </Box>

      {/* Call History Table */}
      <Paper sx={{ overflow: 'hidden', borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Date & Time
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Caller ID
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Primary Topic
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Risk level
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Outcome
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Quality Score
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 2 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedCalls.map((call) => {
                const riskStyle = getRiskLevelColor(call.riskLevel);
                const outcomeProps = getOutcomeChipProps(call.outcome);
                const scoreColor = getQualityScoreColor(call.qualityScore);
                
                return (
                  <TableRow 
                    key={call.id} 
                    sx={{ 
                      '&:hover': { bgcolor: '#f9fafb' },
                      borderBottom: '1px solid #f3f4f6',
                    }}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: '14px', 
                          color: '#111827', 
                          whiteSpace: 'pre-line',
                          lineHeight: 1.4 
                        }}
                      >
                        {call.dateTime}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: '14px', 
                          color: '#111827', 
                          whiteSpace: 'pre-line',
                          lineHeight: 1.4 
                        }}
                      >
                        {call.callerID}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#111827' }}>
                        {call.primaryTopic}
                      </Typography>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: riskStyle.dotColor,
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ fontSize: '14px', color: riskStyle.textColor }}
                        >
                          {riskStyle.label}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2 }}>
                      <Chip
                        label={call.outcome}
                        size="small"
                        variant="outlined"
                        {...outcomeProps}
                      />
                    </TableCell>
                    
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: scoreColor,
                          }}
                        />
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#111827' }}>
                          {call.qualityScore}%
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell sx={{ py: 2 }}>
                      <ActionButtonsGroup
                        onPlay={() => handlePlayCall(call.id)}
                        onView={() => handleViewCall(call.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '14px' }}>
          Page 1-{Math.min(itemsPerPage, filteredCalls.length)} of {filteredCalls.length} results
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            sx={{
              color: '#6b7280',
              fontSize: '14px',
              textTransform: 'none',
              minWidth: 'auto',
              '&:disabled': {
                color: '#d1d5db',
              },
            }}
          >
            ‹ Previous
          </Button>
          
          <Button
              component={Link}
  to="/supervisor/call-detail"
            sx={{
              color: '#6b7280',
              fontSize: '14px',
              textTransform: 'none',
              minWidth: 'auto',
              '&:disabled': {
                color: '#d1d5db',
              },
            }}
          >
            Next ›
          </Button>
        </Box>
      </Box>
    </Box>
  );
};