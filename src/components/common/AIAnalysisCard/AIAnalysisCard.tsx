import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Chip, 
  LinearProgress,
  IconButton,
  Collapse
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon
} from '@mui/icons-material';

interface ConversationQuality {
  overall_quality_score?: number;
  rapport_score?: number;
  listening_score?: number;
  analyzing_score?: number;
  motivating_score?: number;
  ending_score?: number;
}

interface AIAnalysisCardProps {
    agentSentiment?: string | null;
    callerSentiment?: string | null;
    conversationQuality?: ConversationQuality ;
  }

const AIAnalysisCard: React.FC<AIAnalysisCardProps> = ({
  agentSentiment,
  callerSentiment,
  conversationQuality,
}) => {
  const [expanded, setExpanded] = useState(false);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return { bg: '#d1fae5', color: '#059669', border: '#a7f3d0' };
      case 'negative':
        return { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' };
      case 'neutral':
        return { bg: '#fef3c7', color: '#d97706', border: '#fde68a' };
      default:
        return { bg: '#f3f4f6', color: '#374151', border: '#e5e7eb' };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#10b981';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const agentColors = getSentimentColor(agentSentiment || '');
  const callerColors = getSentimentColor(callerSentiment || '');

  // Calculate sentiment percentages (for visual representation)
  const agentPercentage = agentSentiment === 'positive' ? 85 : agentSentiment === 'neutral' ? 60 : 40;
  const callerPercentage = callerSentiment === 'positive' ? 85 : callerSentiment === 'neutral' ? 60 : 40;

  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#111827',
          mb: 2,
          fontSize: { xs: '15px', sm: '16px' },
        }}
      >
        AI Analysis
      </Typography>

      {/* Agent Sentiment */}
      {agentSentiment && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ 
                color: '#374151', 
                fontSize: { xs: '13px', sm: '14px' },
                fontWeight: 500 
              }}
            >
              Agent Sentiment
            </Typography>
            <Chip
              label={agentSentiment.charAt(0).toUpperCase() + agentSentiment.slice(1)}
              size="small"
              icon={<Box component="span" sx={{ 
                width: 6, 
                height: 6, 
                borderRadius: '50%', 
                bgcolor: agentColors.color,
                ml: 1
              }} />}
              sx={{
                bgcolor: agentColors.bg,
                color: agentColors.color,
                border: `1px solid ${agentColors.border}`,
                fontWeight: 500,
                fontSize: '12px',
                height: 24,
                '& .MuiChip-icon': {
                  ml: 1,
                  mr: -0.5
                }
              }}
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={agentPercentage}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: '#e5e7eb',
              '& .MuiLinearProgress-bar': {
                bgcolor: agentColors.color,
                borderRadius: 3,
              },
            }}
          />
        </Box>
      )}

      {/* Caller Sentiment */}
      {callerSentiment && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography
              variant="body2"
              sx={{ 
                color: '#374151', 
                fontSize: { xs: '13px', sm: '14px' },
                fontWeight: 500 
              }}
            >
              Caller Sentiment
            </Typography>
            <Chip
              label={callerSentiment.charAt(0).toUpperCase() + callerSentiment.slice(1)}
              size="small"
              icon={<Box component="span" sx={{ 
                width: 6, 
                height: 6, 
                borderRadius: '50%', 
                bgcolor: callerColors.color,
                ml: 1
              }} />}
              sx={{
                bgcolor: callerColors.bg,
                color: callerColors.color,
                border: `1px solid ${callerColors.border}`,
                fontWeight: 500,
                fontSize: '12px',
                height: 24,
                '& .MuiChip-icon': {
                  ml: 1,
                  mr: -0.5
                }
              }}
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={callerPercentage}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: '#e5e7eb',
              '& .MuiLinearProgress-bar': {
                bgcolor: callerColors.color,
                borderRadius: 3,
              },
            }}
          />
        </Box>
      )}

      {/* Conversation Quality */}
      {conversationQuality && conversationQuality.overall_quality_score !== undefined && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              py: 1,
            }}
            onClick={() => setExpanded(!expanded)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#374151',
                  fontSize: { xs: '13px', sm: '14px' },
                  fontWeight: 500,
                }}
              >
                Conversation Quality
              </Typography>
              <Chip
                icon={<StarIcon sx={{ fontSize: 12 }} />}
                label={`${conversationQuality.overall_quality_score}%`}
                size="small"
                sx={{
                  bgcolor: '#dcfce7',
                  color: '#16a34a',
                  border: '1px solid #bbf7d0',
                  fontWeight: 600,
                  fontSize: '12px',
                  height: 22,
                  '& .MuiChip-icon': {
                    color: '#16a34a',
                    ml: 0.5,
                    fontSize: 12
                  }
                }}
              />
            </Box>
            <IconButton
              size="small"
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
                color: '#6b7280',
              }}
            >
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          </Box>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e5e7eb' }}>
              {/* Rapport */}
              {conversationQuality.rapport_score !== undefined && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: '#374151', fontSize: { xs: '13px', sm: '14px' } }}
                    >
                      Rapport
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, fontSize: { xs: '13px', sm: '14px' } }}
                    >
                      {conversationQuality.rapport_score}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={conversationQuality.rapport_score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: '#e5e7eb',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getScoreColor(conversationQuality.rapport_score),
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}

              {/* Listening */}
              {conversationQuality.listening_score !== undefined && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: '#374151', fontSize: { xs: '13px', sm: '14px' } }}
                    >
                      Listening
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, fontSize: { xs: '13px', sm: '14px' } }}
                    >
                      {conversationQuality.listening_score}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={conversationQuality.listening_score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: '#e5e7eb',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getScoreColor(conversationQuality.listening_score),
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}

              {/* Analyzing */}
              {conversationQuality.analyzing_score !== undefined && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: '#374151', fontSize: { xs: '13px', sm: '14px' } }}
                    >
                      Analyzing
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, fontSize: { xs: '13px', sm: '14px' } }}
                    >
                      {conversationQuality.analyzing_score}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={conversationQuality.analyzing_score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: '#e5e7eb',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getScoreColor(conversationQuality.analyzing_score),
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}

              {/* Motivating */}
              {conversationQuality.motivating_score !== undefined && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: '#374151', fontSize: { xs: '13px', sm: '14px' } }}
                    >
                      Motivating
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, fontSize: { xs: '13px', sm: '14px' } }}
                    >
                      {conversationQuality.motivating_score}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={conversationQuality.motivating_score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: '#e5e7eb',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getScoreColor(conversationQuality.motivating_score),
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}

              {/* Ending */}
              {conversationQuality.ending_score !== undefined && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: '#374151', fontSize: { xs: '13px', sm: '14px' } }}
                    >
                      Ending
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, fontSize: { xs: '13px', sm: '14px' } }}
                    >
                      {conversationQuality.ending_score}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={conversationQuality.ending_score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: '#e5e7eb',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getScoreColor(conversationQuality.ending_score),
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          </Collapse>
        </Box>
      )}
    </Paper>
  );
};

export default AIAnalysisCard;