// src/pages/agent/CallDetails/CallDetails.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  LinearProgress,
  IconButton,
  Divider,
  Drawer,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  PlayArrow as PlayArrowIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface CallDetailsProps {
  callId?: string;
  onBack?: () => void;
}

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
    },
    analysis: {
      dialogue: {
        rapport: { value: 90, description: 'Agent demonstrated empathy and showed genuine interest in caller\'s wellbeing' },
        analyzing: { value: 84, description: 'Successfully identified medication timeline as key issue and explored side effects' },
        ending: { value: 86, description: 'Ensured caller understood advice and felt reassured about continuing medication' },
        listening: { value: 95, description: 'Used "I understand, I see" and asked clarifying questions' },
        motivating: { value: 80, description: 'Explored 4-6 week timeline chart and encouraged caller\'s commitment' }
      },
      acousticFeatures: {
        agent: {
          speechSpeed: { value: 145, unit: 'WPM', status: 'Normal' },
          fundamentalFrequency: { value: 200, unit: 'Hz', status: 'Empathetic' },
          toneVariation: 'Moderate',
          mood: 'Calm',
          emotionalState: 'Empathetic',
          questionsAsked: 8,
          interruptions: 1
        },
        caller: {
          speechSpeed: { value: 120, unit: 'WPM', status: 'Slow' },
          fundamentalFrequency: { value: 90, unit: 'Hz', status: 'Depressed' },
          toneVariation: 'High',
          mood: 'Concerned',
          emotionalState: 'Worried',
          questionsAsked: 4,
          interruptions: 3
        }
      },
      communicationTypes: {
        agent: {
          questions: 49,
          informationProvision: 35
        },
        caller: {
          questions: 25,
          informationSharing: 60
        }
      }
    }
  };

  return baseCall;
};

export const CallDetails: React.FC<CallDetailsProps> = ({ 
  callId = '#2031', 
  onBack 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const callDetails = getCallDetails(callId);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleViewBreakdown = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const getRiskLevelColor = (riskLevel: string) => {
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return '#16a34a';
      case 'slow':
      case 'depressed':
        return '#d97706';
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
            onClick={handleViewBreakdown}
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
                      bgcolor: getRiskLevelColor(callDetails.riskLevel),
                    }}
                  />
                  <Typography variant="body2" sx={{ 
                    color: getRiskLevelColor(callDetails.riskLevel), 
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

      {/* Analysis Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 500,
            bgcolor: '#ffffff',
            p: 0,
          },
        }}
      >
        <Box sx={{ p: 3, height: '100%', overflowY: 'auto' }}>
          {/* Drawer Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', fontSize: '18px' }}>
              Comprehensive Call Analysis
            </Typography>
            <IconButton onClick={handleCloseDrawer} sx={{ color: '#6b7280' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Speaking Timeline Section */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
              {/* Agent Timeline */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: '#0891b2',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 600
                    }}
                  >
                    J
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>
                      Dr. James Gipar
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                      Call Agent
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#0891b2', ml: 'auto' }}>
                    45%
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 1 }}>
                  Speaking Timeline
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                  {[1, 1, 0, 1, 0, 0, 1, 1, 0, 1].map((active, i) => (
                    <Box
                      key={i}
                      sx={{
                        flex: 1,
                        height: 6,
                        bgcolor: active ? '#0891b2' : '#e5e7eb',
                        borderRadius: 0.5
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '10px' }}>
                    0:00
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '10px' }}>
                    8:12
                  </Typography>
                </Box>
              </Box>

              {/* Caller Timeline */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: '#d97706',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 600
                    }}
                  >
                    C
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>
                      Caller #2031
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                      of conversation
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#d97706', ml: 'auto' }}>
                    55%
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 1 }}>
                  Speaking Timeline
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                  {[0, 0, 1, 0, 1, 1, 0, 0, 1, 0].map((active, i) => (
                    <Box
                      key={i}
                      sx={{
                        flex: 1,
                        height: 6,
                        bgcolor: active ? '#d97706' : '#e5e7eb',
                        borderRadius: 0.5
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '10px' }}>
                    0:00
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '10px' }}>
                    8:12
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Sentiment Timeline */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px', fontWeight: 500, mb: 1 }}>
                Sentiment
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mb: 1 }}>
                Tone or mood inferred from call
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#16a34a' }}>
                  85%
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#d97706' }}>
                  65%
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Dialogue Analysis */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 3, fontSize: '16px' }}>
              Dialogue Analysis
            </Typography>

            {Object.entries(callDetails.analysis.dialogue).map(([key, data]) => (
              <Box key={key} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px', textTransform: 'capitalize' }}>
                    {key}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                    {data.value}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={data.value}
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
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px', mt: 0.5 }}>
                  {data.description}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Acoustic Features */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 3, fontSize: '16px' }}>
              Acoustic Features
            </Typography>

            {/* Agent Acoustic Features */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: '#0891b2',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  J
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>
                  Dr. James Gipar (Agent)
                </Typography>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                    Speech Speed
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                      {callDetails.analysis.acousticFeatures.agent.speechSpeed.value} {callDetails.analysis.acousticFeatures.agent.speechSpeed.unit}
                    </Typography>
                    <Chip
                      label={callDetails.analysis.acousticFeatures.agent.speechSpeed.status}
                      size="small"
                      sx={{
                        bgcolor: '#dcfce7',
                        color: '#16a34a',
                        fontSize: '10px',
                        height: 20
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                    Fundamental Frequency
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                      {callDetails.analysis.acousticFeatures.agent.fundamentalFrequency.value} {callDetails.analysis.acousticFeatures.agent.fundamentalFrequency.unit}
                    </Typography>
                    <Chip
                      label={callDetails.analysis.acousticFeatures.agent.fundamentalFrequency.status}
                      size="small"
                      sx={{
                        bgcolor: '#dcfce7',
                        color: '#16a34a',
                        fontSize: '10px',
                        height: 20
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                    Tone Variation
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                    {callDetails.analysis.acousticFeatures.agent.toneVariation}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                    Mood
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                    {callDetails.analysis.acousticFeatures.agent.mood}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                    Emotional State
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                    {callDetails.analysis.acousticFeatures.agent.emotionalState}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                    Questions Asked
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                    {callDetails.analysis.acousticFeatures.agent.questionsAsked}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                  Interruptions
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                  {callDetails.analysis.acousticFeatures.agent.interruptions}
                </Typography>
              </Box>
            </Box>

            {/* Caller Acoustic Features */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: '#d97706',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  C
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>
                  Caller #2031
                </Typography>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                    Speech Speed
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                      {callDetails.analysis.acousticFeatures.caller.speechSpeed.value} {callDetails.analysis.acousticFeatures.caller.speechSpeed.unit}
                    </Typography>
                    <Chip
                      label={callDetails.analysis.acousticFeatures.caller.speechSpeed.status}
                      size="small"
                      sx={{
                        bgcolor: '#fef3c7',
                        color: '#d97706',
                        fontSize: '10px',
                        height: 20
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                    Fundamental Frequency
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                      {callDetails.analysis.acousticFeatures.caller.fundamentalFrequency.value} {callDetails.analysis.acousticFeatures.caller.fundamentalFrequency.unit}
                    </Typography>
                    <Chip
                      label={callDetails.analysis.acousticFeatures.caller.fundamentalFrequency.status}
                      size="small"
                      sx={{
                        bgcolor: '#fecaca',
                        color: '#dc2626',
                        fontSize: '10px',
                        height: 20
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                    Tone Variation
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                    {callDetails.analysis.acousticFeatures.caller.toneVariation}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                    Mood
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                    {callDetails.analysis.acousticFeatures.caller.mood}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                    Emotional State
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                    {callDetails.analysis.acousticFeatures.caller.emotionalState}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                    Questions Asked
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                    {callDetails.analysis.acousticFeatures.caller.questionsAsked}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '12px' }}>
                  Interruptions
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '14px' }}>
                  {callDetails.analysis.acousticFeatures.caller.interruptions}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Communication Types */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 3, fontSize: '16px' }}>
              Communication Types
            </Typography>

            {/* Agent Communication */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: '14px', mb: 2 }}>
                Dr. James Gipar (Agent)
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
                    Questions
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                    {callDetails.analysis.communicationTypes.agent.questions}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={callDetails.analysis.communicationTypes.agent.questions}
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

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
                    Information Provision
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                    {callDetails.analysis.communicationTypes.agent.informationProvision}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={callDetails.analysis.communicationTypes.agent.informationProvision}
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
            </Box>

            {/* Caller Communication */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827', fontSize: '14px', mb: 2 }}>
                Caller #2031
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#374151', fontSize: '14px' }}>
                    Questions
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                    {callDetails.analysis.communicationTypes.caller.questions}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={callDetails.analysis.communicationTypes.caller.questions}
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
                    Information Sharing
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px' }}>
                    {callDetails.analysis.communicationTypes.caller.informationSharing}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={callDetails.analysis.communicationTypes.caller.informationSharing}
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
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};