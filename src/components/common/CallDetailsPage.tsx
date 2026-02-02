// src/pages/shared/CallDetailsPage/CallDetailsPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  IconButton,
  Alert,
  LinearProgress,
  Skeleton,
  Snackbar,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import CustomChip from "./CustomChip/CustomChip";


import type { CallDetailsResponse } from "../../types/agent.types";
import agentApi from "../../services/api/agentApi";
import supervisorApi from "../../services/api/supervisorApi";
import { CallRecordingPlayer } from "./CallRecordingPlayer";
import {
  CallInfoCard,
  createChipValue,
  getRiskLevelColors,
  getStatusColors,
  getCallerTypeColors,
  createSpeakerChips
} from "./CallInfoCard/CallInfoCard";
import { EscalateCallModal } from "./EscalateCallModal/EscalateCallModal";
import AIAnalysisCard from "./AIAnalysisCard/AIAnalysisCard";



interface CallDetailsPageProps {
  callId?: string;
  onBack?: () => void;
  backPath?: string;
  /** Set to true when called from supervisor context (EscalationsTab, etc.) */
  isSupervisor?: boolean;
}

// Shimmer Loading Component
const ShimmerBox: React.FC<{ width?: string | number; height?: number; sx?: any }> = ({
  width = "100%",
  height = 20,
  sx = {}
}) => (
  <Skeleton
    variant="rectangular"
    width={width}
    height={height}
    sx={{
      borderRadius: 1,
      bgcolor: "#f3f4f6",
      ...sx,
    }}
    animation="wave"
  />
);

const LoadingState: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Header Shimmer */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <ShimmerBox width={40} height={40} sx={{ borderRadius: "50%" }} />
          <Box sx={{ flex: 1 }}>
            <ShimmerBox width={200} height={28} sx={{ mb: 1 }} />
            <ShimmerBox width={300} height={16} />
          </Box>
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
          {/* Call Info Card Shimmer */}
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
                {[...Array(6)].map((_, i) => (
                  <Box key={i}>
                    <ShimmerBox width={80} height={12} sx={{ mb: 0.5 }} />
                    <ShimmerBox width={120} height={16} />
                  </Box>
                ))}
              </Box>
              <Box sx={{ mt: 2 }}>
                <ShimmerBox width={80} height={12} sx={{ mb: 1 }} />
                <ShimmerBox width={60} height={24} />
              </Box>
            </Box>
          </Paper>

          {/* Call Summary Shimmer */}
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              mb: 3,
              borderRadius: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <ShimmerBox width={120} height={20} sx={{ mb: 2 }} />
            <ShimmerBox width="100%" height={16} sx={{ mb: 1 }} />
            <ShimmerBox width="100%" height={16} sx={{ mb: 1 }} />
            <ShimmerBox width="80%" height={16} />
          </Paper>

          {/* Call Recording Shimmer */}
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              mb: 3,
              borderRadius: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <ShimmerBox width={150} height={20} sx={{ mb: 2 }} />
            <ShimmerBox width="100%" height={60} />
          </Paper>

          {/* Transcription Shimmer */}
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              mb: 3,
              borderRadius: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <ShimmerBox width={120} height={20} sx={{ mb: 2 }} />
            {[...Array(4)].map((_, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <ShimmerBox width={24} height={24} sx={{ borderRadius: "50%" }} />
                  <ShimmerBox width={60} height={16} />
                  <ShimmerBox width={40} height={12} />
                </Box>
                <ShimmerBox width="90%" height={14} sx={{ ml: 4 }} />
              </Box>
            ))}
          </Paper>

          {/* Call Notes Shimmer */}
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <ShimmerBox width={100} height={20} sx={{ mb: 2 }} />
            <ShimmerBox width="100%" height={16} sx={{ mb: 1 }} />
            <ShimmerBox width="95%" height={16} />
          </Paper>
        </Box>

        {/* Right Column */}
        <Box sx={{ width: { xs: "100%", md: 320 }, display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Sentiment Analysis Shimmer */}
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <ShimmerBox width={150} height={20} sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <ShimmerBox width={100} height={12} sx={{ mb: 0.5 }} />
              <ShimmerBox width={80} height={24} />
            </Box>
            <Box>
              <ShimmerBox width={100} height={12} sx={{ mb: 0.5 }} />
              <ShimmerBox width={80} height={24} />
            </Box>
          </Paper>

          {/* Conversation Quality Shimmer */}
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <ShimmerBox width={180} height={20} sx={{ mb: 2 }} />
            {[...Array(6)].map((_, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <ShimmerBox width={80} height={14} />
                  <ShimmerBox width={40} height={14} />
                </Box>
                <ShimmerBox width="100%" height={6} />
              </Box>
            ))}
          </Paper>

          {/* Detected Keywords Shimmer */}
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <ShimmerBox width={150} height={20} sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[...Array(5)].map((_, i) => (
                <ShimmerBox key={i} width={100} height={24} />
              ))}
            </Box>
          </Paper>

          {/* Topics Discussed Shimmer */}
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <ShimmerBox width={140} height={20} sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    bgcolor: "#f9fafb",
                    p: 1.5,
                    borderRadius: 1,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <ShimmerBox width="80%" height={14} sx={{ mb: 0.5 }} />
                  <ShimmerBox width={100} height={11} />
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Outcome Shimmer */}
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <ShimmerBox width={80} height={20} sx={{ mb: 2 }} />
            <ShimmerBox width={100} height={24} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export const CallDetailsPage: React.FC<CallDetailsPageProps> = ({
  callId: propCallId,
  onBack,
  backPath,
  isSupervisor = false,
}) => {
  const navigate = useNavigate();
  const { callId: paramCallId } = useParams<{ callId: string }>();
  const callId = propCallId || paramCallId || "";

  const [callDetails, setCallDetails] = useState<CallDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Escalation Modal States
  const [escalateModalOpen, setEscalateModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
        
        console.log('[CallDetailsPage] Fetching call details:', { callId, isSupervisor });
        
        // Use appropriate API based on context
        const data = isSupervisor 
          ? await supervisorApi.getEscalationDetails(callId)
          : await agentApi.getCallDetails(callId);
        
        console.log('[CallDetailsPage] Call details received:', data);
        setCallDetails(data as any);
      } catch (err) {
        console.error('[CallDetailsPage] Error fetching call details:', err);
        setError(err instanceof Error ? err.message : "Failed to load call details");
      } finally {
        setLoading(false);
      }
    };

    fetchCallDetails();
  }, [callId, isSupervisor]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  const handleEscalate = () => {
    setEscalateModalOpen(true);
  };

  const handleEscalationSuccess = (response: any) => {
    setSuccessMessage(response.message || 'Call escalated successfully');

    // Optionally refresh call details to show updated outcome
    if (callId) {
      const refreshApi = isSupervisor ? supervisorApi.getEscalationDetails : agentApi.getCallDetails;
      refreshApi(callId)
        .then((data: any) => setCallDetails(data))
        .catch((err: any) => console.error('Error refreshing call details:', err));
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

  if (loading) {
    return <LoadingState />;
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

  const riskColors = getRiskLevelColors(callDetails.risk_level);
  const statusColors = getStatusColors(callDetails.call_status || "completed");
  const callerTypeColors = getCallerTypeColors(callDetails.caller_type || "Unknown");

  // Calculate speaker percentages
  const totalWords = callDetails.speakers?.reduce((sum, entry) => sum + entry.text.split(' ').length, 0) || 0;
  const callerWords = callDetails.speakers?.filter(s => s.speaker === 'caller').reduce((sum, entry) => sum + entry.text.split(' ').length, 0) || 0;
  const agentWords = totalWords - callerWords;
  const callerPercentage = totalWords > 0 ? Math.round((callerWords / totalWords) * 100) : 0;
  const agentPercentage = totalWords > 0 ? 100 - callerPercentage : 0;

  // Calculate duration for supervisor context (which doesn't have call_duration_seconds)
  const callDuration = callDetails.call_duration_seconds || 
    (callDetails.call_start_time && callDetails.call_end_time 
      ? Math.floor((new Date(callDetails.call_end_time).getTime() - new Date(callDetails.call_start_time).getTime()) / 1000)
      : 0);

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>

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
          <CallInfoCard
            header={{
              title: isSupervisor 
                ? `Escalation #${callId.slice(-4)}`
                : `Outgoing Call #${callDetails.call_id?.slice(-4) || callId.slice(-4)}`,
              statusChip: {
                label: callDetails.call_status || "completed",
                bgcolor: statusColors.bg,
                color: statusColors.color,
                border: statusColors.border,
              },
              subtitle: `${formatDateTime(callDetails.call_start_time)} - ${formatDateTime(callDetails.call_end_time).split(', ')[1]}`,
              onBack: handleBack,
              actionButton: !isSupervisor && callDetails.outcome !== "escalated" ? {
                label: "Escalate call",
                icon: "escalate",
                variant: "escalate",
                onClick: handleEscalate,
              } : undefined,
            }}
            fields={[
              { label: "Caller ID", value: callDetails.caller_id },
              {
                label: "Caller Type",
                value: createChipValue(
                  callDetails.caller_type || "Unknown",
                  callerTypeColors.bg,
                  callerTypeColors.color,
                  callerTypeColors.border
                ),
              },
              {
                label: "Risk Level",
                value: createChipValue(
                  callDetails.risk_level,
                  riskColors.bg,
                  riskColors.color,
                  riskColors.border
                ),
              },
              { label: "Language", value: callDetails.language || "English" },
              { label: "Caller Sex", value: callDetails.caller_gender },
              { label: "Trajectory of care", value: callDetails.trajectory_of_care || "Unknown" },
              {
                label: "Speakers",
                value: createSpeakerChips([
                  { label: "Caller", percentage: callerPercentage },
                  { label: "Agent", percentage: agentPercentage },
                ]),
              },
            ]}
            gridColumns={{ xs: 1, sm: 2, md: 3 }}
          />

          {callDetails.call_summary && (
            <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3, borderRadius: 2, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827", mb: 2 }}>
                Call Summary
              </Typography>
              <Typography variant="body2" sx={{ color: "#374151", lineHeight: 1.6 }}>
                {callDetails.call_summary}
              </Typography>
            </Paper>
          )}

          {(callDetails.audio_url || callId) && (
            <Box sx={{ mb: 3 }}>
              <CallRecordingPlayer
                callId={isSupervisor ? callId : (callDetails.call_id || callId)}
                duration={formatDuration(callDuration)}
                recordingUrl={callDetails.audio_url}
                isPopup={false}
                open={true}
                isSupervisor={isSupervisor}
              />
            </Box>
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
          {/* AI Analysis Card */}
          <AIAnalysisCard
            agentSentiment={callDetails.agent_sentiment?.toLowerCase()}
            callerSentiment={callDetails.caller_sentiment?.toLowerCase()}
            conversationQuality={callDetails.conversation_quality || undefined}
          />

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
                    label={item.confidence_score 
                      ? `${item.keyword} (${item.confidence_score}%)`
                      : item.keyword
                    }
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

          {/* Outcome - Only show for agent context */}
          {!isSupervisor && (
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
          )}
        </Box>
      </Box>
      
      {/* Escalation Modal - Only show for agent context */}
      {!isSupervisor && (
        <EscalateCallModal
          open={escalateModalOpen}
          onClose={() => setEscalateModalOpen(false)}
          callId={callDetails.call_id || callId}
          onEscalationSuccess={handleEscalationSuccess}
        />
      )}

      {/* Success Notification */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSuccessMessage('')}
          severity="success"
          sx={{ width: '100%' }}
          variant="filled"
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Notification */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setErrorMessage('')}
          severity="error"
          sx={{ width: '100%' }}
          variant="filled"
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};