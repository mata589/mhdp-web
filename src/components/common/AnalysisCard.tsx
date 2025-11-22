import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  IconButton,
  Collapse,
  Chip,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Star } from "@mui/icons-material";

interface Sentiment {
  value: number;
  label: string;
  color: string;
}

interface TechnicalQuality {
  network: { value: number; max: number };
  audio: { value: number; max: number; note: string };
}

interface Outcome {
  status: string;
  reason: string;
  escalatedTo: string;
  time: string;
  note: string;
}

interface TranscriptionEntry {
  speaker: string;
  time: string;
  text: string;
}

interface Recording {
  duration: string;
  isPlaying: boolean;
}

interface ConversationQualityMetric {
  name: string;
  value: number;
  color: string;
}

interface CallDetails {
  id: string;
  callerType: string;
  language: string;
  gender: string;
  frequencyOfCare: string;
  riskLevel: string;
  agent: string;
  speakers: {
    caller: string;
    agent: string;
  };
  sentiment: {
    agent: Sentiment;
    caller: Sentiment;
    conversation: Sentiment;
  };
  technicalQuality: TechnicalQuality;
  keywords: string[];
  topics: string[];
  outcome: Outcome;
  summary: string;
  callNotes: string;
  transcription: TranscriptionEntry[];
  recording: Recording;
  conversationQualityMetrics?: ConversationQualityMetric[]; // Optional, as it's assumed in the component
}

interface AIAnalysisCardProps {
  callDetails: CallDetails;
}

const getSentimentChipSx = (label: string, color: string) => {
  let backgroundColor = "rgba(0, 0, 0, 0.1)";
  let borderColor = color;
  let dotColor = color;

  if (label === "Positive" || label === "Very Good") {
    backgroundColor = "rgba(74, 222, 128, 0.1)";
    borderColor = "#22c55e";
    dotColor = "#22c55e";
  } else if (label === "Neutral") {
    backgroundColor = "rgba(251, 191, 36, 0.1)";
    borderColor = "#f59e0b";
    dotColor = "#f59e0b";
  } // Add more conditions as needed for other labels

  return {
    backgroundColor,
    color,
    border: `2px solid ${borderColor}`,
    fontWeight: 700,
    fontSize: "0.75rem",
    width: "fit-content",
    "& .MuiChip-label": {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontWeight: 700,
      px: 1.5,
      "&::before": {
        content: '""',
        width: "8px",
        height: "8px",
        backgroundColor: dotColor,
        borderRadius: "50%",
      },
    },
  };
};

const AIAnalysisCard = ({ callDetails }: AIAnalysisCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const conversationQualityMetrics: ConversationQualityMetric[] =
    callDetails.conversationQualityMetrics || [];

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 2,
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "#111827",
          mb: 3,
          fontSize: "16px",
        }}
      >
        AI Analysis
      </Typography>
      {/* Agent Sentiment */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#374151", fontSize: "14px" }}
          >
            Agent Sentiment
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "14px" }}
            >
              {callDetails.sentiment.agent.value}%
            </Typography>
            <Chip
              label={callDetails.sentiment.agent.label}
              size="small"
              sx={getSentimentChipSx(
                callDetails.sentiment.agent.label,
                callDetails.sentiment.agent.color
              )}
            />
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={callDetails.sentiment.agent.value}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "#e5e7eb",
            "& .MuiLinearProgress-bar": {
              bgcolor: callDetails.sentiment.agent.color,
              borderRadius: 3,
            },
          }}
        />
      </Box>
      {/* Caller Sentiment */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#374151", fontSize: "14px" }}
          >
            Caller Sentiment
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, fontSize: "14px" }}
            >
              {callDetails.sentiment.caller.value}%
            </Typography>
            <Chip
              label={callDetails.sentiment.caller.label}
              size="small"
              sx={getSentimentChipSx(
                callDetails.sentiment.caller.label,
                callDetails.sentiment.caller.color
              )}
            />
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={callDetails.sentiment.caller.value}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "#e5e7eb",
            "& .MuiLinearProgress-bar": {
              bgcolor: callDetails.sentiment.caller.color,
              borderRadius: 3,
            },
          }}
        />
      </Box>
      {/* Conversation Quality - Clickable */}
      <Box sx={{ mb: 3, cursor: "pointer" }} onClick={handleToggleExpand}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "#374151", fontSize: "14px" }}
            >
              Conversation Quality
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                bgcolor: callDetails.sentiment.conversation.color,
                borderRadius: 2,
                px: 1,
                
              }}
            >
              <Star
                sx={{
                  color: "white",
                  
                }}
              />
              <Typography
                variant="body2"
                sx={{ fontWeight: 500,  color: "white" }}
              >
                {callDetails.sentiment.conversation.value}%
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton size="small" sx={{ p: 0, color: "#6b7280" }}>
              {isExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={callDetails.sentiment.conversation.value}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "#e5e7eb",
            "& .MuiLinearProgress-bar": {
              bgcolor: callDetails.sentiment.conversation.color,
              borderRadius: 3,
            },
          }}
        />
      </Box>
      {/* Expanded Sub-Metrics */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 2, pl: 2 }}>
          {conversationQualityMetrics.map(
            (metric: ConversationQualityMetric, index: number) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#374151", fontSize: "14px" }}
                  >
                    {metric.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      fontSize: "14px",
                      color: metric.color,
                    }}
                  >
                    {metric.value}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={metric.value}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: "#e5e7eb",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: metric.color,
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
            )
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default AIAnalysisCard;
