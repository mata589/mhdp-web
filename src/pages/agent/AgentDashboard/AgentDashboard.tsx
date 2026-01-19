import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GridLegacy as Grid } from "@mui/material";
import totalCallsIcon from '../../../assets/images/total_calls.png';
import todayCallsIcon from '../../../assets/images/today_calls.png';
import escalatedCallsIcon from '../../../assets/images/escalated_calls.png';
import qualityScoreIcon from '../../../assets/images/qualityscore_calls.png';

import {
  Typography,
  Box,
  Button,
  Avatar,
  Alert,
  Skeleton,
  Card,
  CardContent,
} from "@mui/material";
import {
  Call,
  CallEnd,
  History,
  Phone,
  Person,
  Voicemail,
} from "@mui/icons-material";
import { CallDetailsPage } from "../../../components/common/CallDetailsPage";
import { CallRecordingPlayer } from "../../../components/common/CallRecordingPlayer";
import type {
  AgentStatus,
  CallOutcome,
  RiskLevel,
} from "../../../components/common/CustomChip/CustomChip";
import CustomChip from "../../../components/common/CustomChip/CustomChip";
import { ActionCard } from "../../../components/cards/ActionCard";
import { MetricCard } from "../../../components/cards/MetricCard";
import CallActivityTable from "../../../components/table/CallActivityTable";

import type {
  AgentOverview,
  CallActivity,
  AvailabilityStatus,
} from "../../../types/agent.types";
import agentApi from "../../../services/api/agentApi";

// Shimmer Loading Components
const ShimmerActionCard: React.FC = () => (
  <Card sx={{ height: '100%', borderRadius: 2 }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width={48} height={48} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="80%" height={20} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const ShimmerMetricCard: React.FC = () => (
  <Card sx={{ height: '100%', borderRadius: 2 }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width={48} height={48} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="50%" height={20} />
          <Skeleton variant="text" width="40%" height={32} />
          <Skeleton variant="text" width="30%" height={16} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const ShimmerTable: React.FC = () => (
  <Card sx={{ borderRadius: 2 }}>
    <CardContent>
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>
      
      {[...Array(5)].map((_, index) => (
        <Box 
          key={index} 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            py: 2, 
            borderBottom: index < 4 ? '1px solid #e0e0e0' : 'none' 
          }}
        >
          <Skeleton variant="text" width="15%" height={20} />
          <Skeleton variant="text" width="12%" height={20} />
          <Skeleton variant="text" width="18%" height={20} />
          <Skeleton variant="rectangular" width="8%" height={24} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width="10%" height={24} sx={{ borderRadius: 1 }} />
          <Skeleton variant="text" width="8%" height={20} />
          <Skeleton variant="text" width="10%" height={20} />
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
      ))}
    </CardContent>
  </Card>
);

export const AgentDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<AgentStatus>("Available");
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [playingCallId, setPlayingCallId] = useState<string | null>(null);
  
  // API data states
  const [overview, setOverview] = useState<AgentOverview | null>(null);
  const [recentCalls, setRecentCalls] = useState<CallActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [agentName, setAgentName] = useState<string>("Agent");

  // Fetch agent availability and set status
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const availability = await agentApi.getAvailability();
        setAgentName(`${availability.first_name} ${availability.last_name}`);
        
        const statusMap: Record<AvailabilityStatus, AgentStatus> = {
          available: "Available",
          on_call: "On Call",
          on_break: "On Break",
          offline: "Offline",
        };
        setStatus(statusMap[availability.status]);
      } catch (err) {
        console.error("Error fetching availability:", err);
      }
    };

    fetchAvailability();
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [overviewData, callsData] = await Promise.all([
          agentApi.getOverview(),
          agentApi.getRecentCallActivity(5, 0),
        ]);

        setOverview(overviewData);
        setRecentCalls(callsData.calls);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleStatusChange = async (newStatus: AgentStatus) => {
    try {
      const statusMap: Record<AgentStatus, AvailabilityStatus> = {
        Available: "available",
        "On Call": "on_call",
        "On Break": "on_break",
        Offline: "offline",
      };

      await agentApi.updateAvailability(statusMap[newStatus]);
      setStatus(newStatus);
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update status. Please try again.");
    }
  };

  const handleViewCall = (callId: string) => {
    setSelectedCallId(callId);
  };

  const handlePlayCall = (callId: string) => {
    setPlayingCallId(callId);
  };

  const handleClosePlayer = () => {
    setPlayingCallId(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIncomingCall(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAnswer = () => {
    setShowIncomingCall(false);
    navigate("/agent/live-call");
  };

  const handleDecline = () => {
    setShowIncomingCall(false);
  };

  const handleVoicemail = () => {
    setShowIncomingCall(false);
  };

  if (selectedCallId) {
    return (
      <CallDetailsPage
        callId={selectedCallId}
        onBack={() => setSelectedCallId(null)}
      />
    );
  }

  const playingCall = recentCalls.find((call) => call.call_id === playingCallId);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDateTime = (startTime: string, endTime: string): string => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    
    const startStr = start.toLocaleString('en-US', options);
    const endStr = end.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    
    return `${startStr} - ${endStr}`;
  };

  const mapOutcome = (outcome: string): CallOutcome => {
    const outcomeMap: Record<string, CallOutcome> = {
      'resolved': 'Advice Given',
      'escalated': 'Escalated',
      'referred': 'Referred',
      'not_escalated': 'Advice Given',
      'not_answered': 'Referred',
      'unresolved': 'Referred',
    };
    return outcomeMap[outcome] || 'Referred';
  };

  const mapRiskLevel = (level: string): RiskLevel => {
    const levelMap: Record<string, RiskLevel> = {
      'low': 'Low',
      'medium': 'Medium',
      'high': 'High',
      'critical': 'Critical',
    };
    return levelMap[level] || 'Low';
  };

  const transformedCalls = recentCalls.map((call) => ({
    id: call.call_id,
    dateTime: formatDateTime(call.call_start_time, call.call_end_time),
    caller: call.language || "Unknown",
    primaryTopic: call.primary_topic || "N/A",
    riskLevel: mapRiskLevel(call.risk_level),
    outcome: mapOutcome(call.outcome),
    qualityScore: call.quality_score ? `${call.quality_score}%` : "N/A",
    duration: formatDuration(call.duration_seconds),
    recordingUrl: call.audio_url,
    onPlay: () => handlePlayCall(call.call_id),
    onView: () => handleViewCall(call.call_id),
  }));

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        backgroundColor: "#fafafa",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {playingCallId && playingCall && (
        <CallRecordingPlayer
          callId={playingCallId}
          duration={`0:00 / ${formatDuration(playingCall.duration_seconds)}`}
          recordingUrl={playingCall.audio_url}
          isPopup={true}
          open={true}
          onClose={handleClosePlayer}
        />
      )}

      {showIncomingCall && (
        <Box
          sx={{
            position: "fixed",
            top: { xs: 80, md: 120 },
            right: { xs: 10, md: 20 },
            left: { xs: 10, md: "auto" },
            width: { xs: "calc(100vw - 20px)", md: 320 },
            maxWidth: 320,
            height: 320,
            backgroundColor: "linear-gradient(to bottom, #CCE5E5, #F2FAFA)",
            background: "linear-gradient(to bottom, #CCE5E5, #F2FAFA)",
            borderRadius: "18px",
            p: 3,
            pt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#2c3e50",
                mb: 1,
                fontSize: "1.5rem",
              }}
            >
              Call #2031
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#22c55e",
                  borderRadius: "50%",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "#5a6c7d",
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
              >
                Incoming...
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: "#7fa8a3",
                  color: "white",
                  width: 50,
                  height: 50,
                }}
              >
                <Person sx={{ fontSize: "1.5rem" }} />
              </Avatar>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "#2c3e50",
                  fontSize: "1.4rem",
                }}
              >
                039 701 234 567
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: "100%",
              justifyContent: "space-between",
              px: 1,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                justifyContent: "space-between",
                px: 1,
              }}
            >
              <Button
                onClick={handleVoicemail}
                sx={{
                  width: 70,
                  height: 50,
                  backgroundColor: "#e8eaed",
                  color: "#5f6368",
                  borderRadius: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "unset",
                  "&:hover": {
                    backgroundColor: "#dadce0",
                  },
                }}
              >
                <Phone sx={{ fontSize: 24, transform: "rotate(15deg)" }} />
              </Button>

              <Button
                onClick={handleDecline}
                sx={{
                  width: 70,
                  height: 50,
                  backgroundColor: "#ea4335",
                  color: "white",
                  borderRadius: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "unset",
                  "&:hover": {
                    backgroundColor: "#d33b2c",
                  },
                }}
              >
                <CallEnd sx={{ fontSize: 24 }} />
              </Button>

              <Button
                onClick={handleAnswer}
                sx={{
                  width: 70,
                  height: 50,
                  backgroundColor: "#34a853",
                  color: "white",
                  borderRadius: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "unset",
                  "&:hover": {
                    backgroundColor: "#2d8f47",
                  },
                }}
              >
                <Call sx={{ fontSize: 24 }} />
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                justifyContent: "space-between",
                px: 1,
                mt: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  color: "#2c3e50",
                  width: 70,
                  textAlign: "center",
                }}
              >
                Voicemail
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  color: "#2c3e50",
                  width: 70,
                  textAlign: "center",
                }}
              >
                Decline
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  color: "#2c3e50",
                  width: 70,
                  textAlign: "center",
                }}
              >
                Answer
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: "#212121",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Hey, {agentName.split(' ')[0] || "Agent"}
            </Typography>
            <CustomChip label={status} variant="status" />
          </Box>

          <Box
            sx={{
              display: "flex",
              border: "2px solid #e0e0e0",
              borderRadius: "25px",
              overflow: "hidden",
              backgroundColor: "white",
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            {(["Available", "On Call", "On Break", "Offline"] as const).map(
              (statusOption, index) => (
                <Button
                  key={statusOption}
                  onClick={() => handleStatusChange(statusOption)}
                  sx={{
                    px: 3,
                    py: 1,
                    backgroundColor:
                      status === statusOption ? "white" : "transparent",
                    color: status === statusOption ? "#000" : "#666",
                    fontWeight: status === statusOption ? 600 : 400,
                    borderRadius: 0,
                    border: "none",
                    borderRight: index < 3 ? "1px solid #e0e0e0" : "none",
                    textTransform: "none",
                    minWidth: { xs: "25%", sm: 80 },
                    "&:hover": {
                      backgroundColor:
                        status === statusOption ? "white" : "#f5f5f5",
                    },
                    "&::before":
                      status === statusOption
                        ? {
                            content: '"✓"',
                            marginRight: "8px",
                            fontSize: "14px",
                            fontWeight: 600,
                          }
                        : {},
                  }}
                >
                  {statusOption}
                </Button>
              )
            )}
          </Box>
        </Box>
      </Box>

      {/* Action Cards */}
      {loading ? (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <ShimmerActionCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <ShimmerActionCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <ShimmerActionCard />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <ActionCard
              icon={<History />}
              iconBgColor="#ffa500"
              title="View call history"
              subtitle="Review past calls and insights"
              onClick={() => navigate("/agent/call-history")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <ActionCard
              icon={<Voicemail />}
              iconBgColor="#f44336"
              title="Check Voice Mail"
              subtitle="Listen to voice mail messages"
              onClick={() => navigate("/agent/voicemails")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <ActionCard
              icon={<Call />}
              iconBgColor="#008080"
              title="Make a call"
              subtitle="Take outline going calls"
            />
          </Grid>
        </Grid>
      )}

      {/* Metrics Cards */}
      {loading ? (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <ShimmerMetricCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ShimmerMetricCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ShimmerMetricCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ShimmerMetricCard />
          </Grid>
        </Grid>
      ) : overview ? (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              iconSrc={totalCallsIcon}
              iconBgColor="#008080"
              label="Total Calls"
              value={overview.total_calls}
              trend={overview.total_calls_change.trend !== 'no_change' ? {
                value: overview.total_calls_change.percent,
                isPositive: overview.total_calls_change.trend === "up",
              } : undefined}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              iconSrc={todayCallsIcon}
              iconBgColor="#ffa500"
              label="Calls Today"
              value={overview.calls_today}
              trend={overview.calls_today_change.trend !== 'no_change' ? {
                value: overview.calls_today_change.percent,
                isPositive: overview.calls_today_change.trend === "up",
              } : undefined}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              iconSrc={escalatedCallsIcon}
              iconBgColor="#f44336"
              label="Escalated Calls"
              value={overview.escalated_calls}
              trend={overview.escalated_calls_change.trend !== 'no_change' ? {
                value: overview.escalated_calls_change.percent,
                isPositive: overview.escalated_calls_change.trend === "down",
              } : undefined}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              iconSrc={qualityScoreIcon}
              iconBgColor="#607d8b"
              label="Quality Score"
              value={overview.quality_score}
            />
          </Grid>
        </Grid>
      ) : null}

      {/* Recent Call Activity */}
      {loading ? (
        <ShimmerTable />
      ) : (
        <CallActivityTable
          calls={transformedCalls}
          showFilters={true}
          showPagination={false}
          onViewAll={() => navigate("/agent/call-history")}
        />
      )}
    </Box>
  );
};