// src/pages/shared/CallDetailsPage/CallDetailsPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  LinearProgress,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import CustomChip from "./CustomChip/CustomChip";
import AIAnalysisCard from "./AnalysisCard";
import type { CallDetailsResponse } from "../../types/agent.types";
import agentApi from "../../services/api/agentApi";

interface CallDetailsPageProps {
  callId?: string;
  onBack?: () => void;
  backPath?: string;
}

export const CallDetailsPage: React.FC<CallDetailsPageProps> = ({
  callId: propCallId,
  onBack,
  backPath,
}) => {
  const navigate = useNavigate();
  const { callId: paramCallId } = useParams<{ callId: string }>();
  const callId = propCallId || paramCallId || "";
  
  const [callDetails, setCallDetails] = useState<CallDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchCallDetails = async () => {
      if (!callId) {
        setError("No call ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await agentApi.getCallDetails(callId);
        setCallDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load call details");
      } finally {
        setLoading(false);
      }
    };

    fetchCallDetails();
  }, [callId]);

  useEffect(() => {
    // Cleanup audio element on unmount
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, [audioElement]);

  const handlePlayPause = () => {
    if (!callDetails?.audio_url) return;

    if (!audioElement) {
      const audio = new Audio(callDetails.audio_url);
      audio.addEventListener("ended", () => setIsPlaying(false));
      audio.addEventListener("error", () => {
        setError("Failed to load audio");
        setIsPlaying(false);
      });
      setAudioElement(audio);
      audio.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play();
        setIsPlaying(true);
      }
    }
  };

  const handleDownloadRecording = async () => {
    try {
      const blob = await agentApi.downloadCallRecording(callId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `call-recording-${callId}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError("Failed to download recording");
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getRiskLevelColor = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case "high":
      case "critical":
        return { bg: "#fee2e2", color: "#dc2626", border: "#fecaca" };
      case "medium":
        return { bg: "#fef3c7", color: "#d97706", border: "#fde68a" };
      case "low":
        return { bg: "#d1fae5", color: "#059669", border: "#a7f3d0" };
      default:
        return { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "answered":
        return { bg: "#d1fae5", color: "#059669", border: "#a7f3d0" };
      case "escalated":
      case "voicemail":
        return { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" };
      case "missed":
        return { bg: "#fee2e2", color: "#dc2626", border: "#fecaca" };
      default:
        return { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" };
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f8fafc",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !callDetails) {
    return (
      <Box sx={{ p: 3, bgcolor: "#f8fafc", minHeight: "100vh" }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || "Failed to load call details"}
        </Alert>
        <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
          Go Back
        </Button>
      </Box>
    );
  }

  const riskColors = getRiskLevelColor(callDetails.risk_level);
  const statusColors = getStatusColor(callDetails.call_status);

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
            mb: { xs: 2, sm: 0 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, gap: 2 }}>
            <IconButton
              onClick={handleBack}
              sx={{
                color: "#6b7280",
                "&:hover": { bgcolor: "#f3f4f6" },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#111827", fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                >
                  Call {callDetails.call_id.slice(0, 8)}
                </Typography>
                <Chip
                  label={callDetails.call_status}
                  size="small"
                  sx={{
                    bgcolor: statusColors.bg,
                    color: statusColors.color,
                    border: `1px solid ${statusColors.border}`,
                    fontWeight: 500,
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#6b7280", fontSize: { xs: "13px", sm: "14px" }, fontWeight: 400 }}
              >
                {formatDateTime(callDetails.call_start_time)} - {formatDateTime(callDetails.call_end_time)}
              </Typography>
            </Box>
          </Box>
          {callDetails.outcome !== "escalated" && (
            <Button
              variant="contained"
              sx={{
                bgcolor: "#dc2626",
                color: "white",
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 500,
                px: { xs: 3, sm: 2 },
                justifySelf: "flex-end",
                "&:hover": { bgcolor: "#b91c1c" },
              }}
            >
              Escalate call
            </Button>
          )}
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 3 },
        }}
      >
        {/* Left Column */}
        <Box sx={{ flex: 1 }}>
          {/* Call Info Card */}
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              mb: 3,
              borderRadius: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#eff6ff",
                p: { xs: 2, sm: 3 },
                borderRadius: 1,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: { xs: 2, sm: 3 },
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                  >
                    Caller ID
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#111827", fontSize: { xs: "13px", sm: "14px" }, fontWeight: 500 }}
                  >
                    {callDetails.caller_id}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                  >
                    Caller Type
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Chip
                      label={callDetails.caller_type || "Unknown"}
                      size="small"
                      sx={{
                        bgcolor: "#dbeafe",
                        color: "#1e40af",
                        border: "1px solid #bfdbfe",
                        fontWeight: 500,
                        fontSize: "12px",
                        textTransform: "capitalize",
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                  >
                    Risk Level
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={callDetails.risk_level}
                      size="small"
                      sx={{
                        bgcolor: riskColors.bg,
                        color: riskColors.color,
                        border: `1px solid ${riskColors.border}`,
                        fontWeight: 500,
                        fontSize: "12px",
                        textTransform: "capitalize",
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                  >
                    Language
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#111827", fontSize: { xs: "13px", sm: "14px" }, fontWeight: 500, textTransform: "capitalize" }}
                  >
                    {callDetails.language}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                  >
                    Caller Gender
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#111827",
                      fontSize: { xs: "13px", sm: "14px" },
                      fontWeight: 500,
                      textTransform: "capitalize",
                    }}
                  >
                    {callDetails.caller_gender}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                  >
                    Caller Age
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#111827",
                      fontSize: { xs: "13px", sm: "14px" },
                      fontWeight: 500,
                    }}
                  >
                    {callDetails.caller_age || "Unknown"}
                  </Typography>
                </Box>
                {callDetails.trajectory_of_care && (
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                    >
                      Trajectory of Care
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#111827",
                        fontSize: { xs: "13px", sm: "14px" },
                        fontWeight: 500,
                      }}
                    >
                      {callDetails.trajectory_of_care}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box sx={{ mt: { xs: 2, sm: 2 } }}>
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 1 }}
                >
                  Duration
                </Typography>
                <Chip
                  label={formatDuration(callDetails.call_duration_seconds)}
                  size="small"
                  sx={{
                    bgcolor: "#dbeafe",
                    color: "#1e40af",
                    border: "1px solid #bfdbfe",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                />
              </Box>
            </Box>
          </Paper>

          {/* Call Summary */}
          {callDetails.call_summary && (
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
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
                  mb: 2,
                  fontSize: { xs: "15px", sm: "16px" },
                }}
              >
                Call Summary
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" }, lineHeight: 1.6 }}
              >
                {callDetails.call_summary}
              </Typography>
            </Paper>
          )}

          {/* Call Recording */}
          {callDetails.audio_url && (
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
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
                  mb: 2,
                  fontSize: { xs: "15px", sm: "16px" },
                }}
              >
                Call Recording
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                <IconButton
                  onClick={handlePlayPause}
                  sx={{
                    bgcolor: "#0891b2",
                    color: "white",
                    width: 32,
                    height: 32,
                    "&:hover": { bgcolor: "#0e7490" },
                  }}
                >
                  {isPlaying ? <PauseIcon sx={{ fontSize: 18 }} /> : <PlayArrowIcon sx={{ fontSize: 18 }} />}
                </IconButton>
                <Box sx={{ flex: 1, minWidth: { xs: 200, sm: "auto" } }}>
                  <LinearProgress
                    variant="indeterminate"
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#0891b2",
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", fontSize: { xs: "13px", sm: "14px" }, mr: 1 }}
                >
                  {formatDuration(callDetails.call_duration_seconds)}
                </Typography>
                <IconButton sx={{ color: "#6b7280" }} onClick={handleDownloadRecording}>
                  <DownloadIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Paper>
          )}

          {/* Transcription */}
          {callDetails.speakers && callDetails.speakers.length > 0 && (
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
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
                  mb: 2,
                  fontSize: { xs: "15px", sm: "16px" },
                }}
              >
                Transcription
              </Typography>
              <Box sx={{ maxHeight: { xs: 250, sm: 300 }, overflowY: "auto" }}>
                {callDetails.speakers.map((entry, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: entry.speaker === "caller" ? "#6b7280" : "#0891b2",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        {entry.speaker === "caller" ? "C" : "A"}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: "#111827",
                          fontSize: { xs: "13px", sm: "14px" },
                          textTransform: "capitalize",
                        }}
                      >
                        {entry.speaker}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#6b7280", fontSize: "12px" }}
                      >
                        {formatDuration(entry.start_time)}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#374151",
                        fontSize: { xs: "13px", sm: "14px" },
                        ml: { xs: 2, sm: 4 },
                        lineHeight: 1.5,
                      }}
                    >
                      {entry.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          )}

          {/* Call Notes */}
          {callDetails.call_notes && (
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#111827",
                  mb: 2,
                  fontSize: { xs: "15px", sm: "16px" },
                }}
              >
                Call Notes
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" }, lineHeight: 1.6 }}
              >
                {callDetails.call_notes}
              </Typography>
            </Paper>
          )}
        </Box>

        {/* Right Column */}
        <Box sx={{ width: { xs: "100%", md: 320 }, display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Sentiment Analysis */}
          {(callDetails.caller_sentiment || callDetails.agent_sentiment) && (
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#111827",
                  mb: 2,
                  fontSize: { xs: "15px", sm: "16px" },
                }}
              >
                Sentiment Analysis
              </Typography>
              {callDetails.caller_sentiment && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                  >
                    Caller Sentiment
                  </Typography>
                  <Chip
                    label={callDetails.caller_sentiment}
                    size="small"
                    sx={{
                      bgcolor: callDetails.caller_sentiment === "positive" ? "#d1fae5" : 
                               callDetails.caller_sentiment === "negative" ? "#fee2e2" : "#fef3c7",
                      color: callDetails.caller_sentiment === "positive" ? "#059669" : 
                             callDetails.caller_sentiment === "negative" ? "#dc2626" : "#d97706",
                      border: `1px solid ${callDetails.caller_sentiment === "positive" ? "#a7f3d0" : 
                                          callDetails.caller_sentiment === "negative" ? "#fecaca" : "#fde68a"}`,
                      fontWeight: 500,
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                  />
                </Box>
              )}
              {callDetails.agent_sentiment && (
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                  >
                    Agent Sentiment
                  </Typography>
                  <Chip
                    label={callDetails.agent_sentiment}
                    size="small"
                    sx={{
                      bgcolor: callDetails.agent_sentiment === "positive" ? "#d1fae5" : 
                               callDetails.agent_sentiment === "negative" ? "#fee2e2" : "#fef3c7",
                      color: callDetails.agent_sentiment === "positive" ? "#059669" : 
                             callDetails.agent_sentiment === "negative" ? "#dc2626" : "#d97706",
                      border: `1px solid ${callDetails.agent_sentiment === "positive" ? "#a7f3d0" : 
                                          callDetails.agent_sentiment === "negative" ? "#fecaca" : "#fde68a"}`,
                      fontWeight: 500,
                      fontSize: "12px",
                      textTransform: "capitalize",
                    }}
                  />
                </Box>
              )}
            </Paper>
          )}

          {/* Conversation Quality Metrics */}
          {callDetails.conversation_quality && typeof callDetails.conversation_quality === 'object' && (
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#111827",
                  mb: 2,
                  fontSize: { xs: "15px", sm: "16px" },
                }}
              >
                Conversation Quality
              </Typography>
              
              {callDetails.conversation_quality.overall_quality_score !== undefined && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" }, fontWeight: 500 }}
                    >
                      Overall Quality
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, fontSize: { xs: "13px", sm: "14px" } }}
                    >
                      {callDetails.conversation_quality.overall_quality_score}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={callDetails.conversation_quality.overall_quality_score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: callDetails.conversation_quality.overall_quality_score >= 70 ? "#16a34a" : 
                                 callDetails.conversation_quality.overall_quality_score >= 40 ? "#d97706" : "#dc2626",
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}

              {callDetails.conversation_quality.rapport_score !== undefined && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" } }}
                    >
                      Rapport
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, fontSize: { xs: "13px", sm: "14px" } }}
                    >
                      {callDetails.conversation_quality.rapport_score}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={callDetails.conversation_quality.rapport_score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#10b981",
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}

              {callDetails.conversation_quality.listening_score !== undefined && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" } }}
                    >
                      Listening
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, fontSize: { xs: "13px", sm: "14px" } }}
                    >
                      {callDetails.conversation_quality.listening_score}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={callDetails.conversation_quality.listening_score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#3b82f6",
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}

              {callDetails.conversation_quality.analyzing_score !== undefined && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" } }}
                    >
                      Analyzing
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, fontSize: { xs: "13px", sm: "14px" } }}
                    >
                      {callDetails.conversation_quality.analyzing_score}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={callDetails.conversation_quality.analyzing_score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#14b8a6",
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}

              {callDetails.conversation_quality.motivating_score !== undefined && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" } }}
                    >
                      Motivating
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, fontSize: { xs: "13px", sm: "14px" } }}
                    >
                      {callDetails.conversation_quality.motivating_score}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={callDetails.conversation_quality.motivating_score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#f59e0b",
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}

              {callDetails.conversation_quality.ending_score !== undefined && (
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" } }}
                    >
                      Ending
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, fontSize: { xs: "13px", sm: "14px" } }}
                    >
                      {callDetails.conversation_quality.ending_score}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={callDetails.conversation_quality.ending_score}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#8b5cf6",
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>
              )}
            </Paper>
          )}

          {/* Detected Keywords */}
          {callDetails.detected_keywords && callDetails.detected_keywords.length > 0 && (
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#111827",
                  mb: 2,
                  fontSize: { xs: "15px", sm: "16px" },
                }}
              >
                Detected Keywords
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {callDetails.detected_keywords.map((item, index) => (
                  <Chip
                    key={index}
                    label={`${item.keyword} (${item.confidence_score}%)`}
                    size="small"
                    sx={{
                      bgcolor: "#f3f4f6",
                      color: "#374151",
                      fontSize: "12px",
                      height: 24,
                    }}
                  />
                ))}
              </Box>
            </Paper>
          )}

          {/* Topics Discussed */}
          {callDetails.topics_discussed && callDetails.topics_discussed.length > 0 && (
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#111827",
                  mb: 2,
                  fontSize: { xs: "15px", sm: "16px" },
                }}
              >
                Topics Discussed
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {callDetails.topics_discussed.map((topic, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: topic.is_primary ? "#eff6ff" : "#f9fafb",
                      p: { xs: 1.5, sm: 1.5 },
                      borderRadius: 1,
                      border: `1px solid ${topic.is_primary ? "#bfdbfe" : "#e5e7eb"}`,
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" } }}
                      >
                        {topic.topic_name}
                      </Typography>
                      {topic.is_primary && (
                        <Chip
                          label="Primary"
                          size="small"
                          sx={{
                            bgcolor: "#2563eb",
                            color: "white",
                            fontSize: "10px",
                            height: 18,
                          }}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#6b7280", fontSize: "11px", mt: 0.5 }}
                    >
                      Relevance: {topic.relevance_score}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          )}

          {/* Transfer Details */}
          {callDetails.transfer_details && (
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#111827", fontSize: { xs: "15px", sm: "16px" } }}
                >
                  Transfer Details
                </Typography>
                <Chip
                  label="Transferred"
                  size="small"
                  sx={{
                    bgcolor: "#eff6ff",
                    color: "#2563eb",
                    border: "1px solid #bfdbfe",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                >
                  Transferred To
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#111827", fontSize: { xs: "13px", sm: "14px" }, fontWeight: 500 }}
                >
                  {callDetails.transfer_details.transferred_to}
                </Typography>
              </Box>
              {callDetails.transfer_details.reason && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                  >
                    Reason
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#111827", fontSize: { xs: "13px", sm: "14px" } }}
                  >
                    {callDetails.transfer_details.reason}
                  </Typography>
                </Box>
              )}
              {callDetails.transfer_details.transfer_time && (
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                  >
                    Transfer Time
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#111827", fontSize: { xs: "13px", sm: "14px" } }}
                  >
                    {formatDateTime(callDetails.transfer_details.transfer_time)}
                  </Typography>
                </Box>
              )}
            </Paper>
          )}

          {/* Outcome */}
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#111827",
                mb: 2,
                fontSize: { xs: "15px", sm: "16px" },
              }}
            >
              Outcome
            </Typography>
            <Chip
              label={callDetails.outcome === "escalated" ? "Escalated" : "Not Escalated"}
              size="small"
              sx={{
                bgcolor: callDetails.outcome === "escalated" ? "#fee2e2" : "#d1fae5",
                color: callDetails.outcome === "escalated" ? "#dc2626" : "#059669",
                border: `1px solid ${callDetails.outcome === "escalated" ? "#fecaca" : "#a7f3d0"}`,
                fontWeight: 500,
                fontSize: "12px",
              }}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};