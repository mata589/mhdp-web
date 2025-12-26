// src/pages/agent/Analytics/Analytics.tsx
import React, { useEffect, useState } from "react";
import {
  GridLegacy as Grid,
  IconButton,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  Star as StarIcon,
  FileDownload as FileDownloadIcon,
  ChevronRight,
} from "@mui/icons-material";
import {
  AlertCircle,
  Calendar,
  Phone,
  PhoneCall,
  PhoneMissed,
} from "lucide-react";

import type {
  AgentAnalyticsOverview,
  AgentCallVolumeTrends,
  AgentLeaderboard,
  AgentConversationQualityTrends,
  AgentConversationQualityInsights,
} from "../../../types/agent.types";
import agentApi from "../../../services/api/agentApi";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string | number;
  changeType: "positive" | "negative";
  period: string;
  icon: React.ReactNode;
  iconBg: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  period,
  icon,
  iconBg,
}) => {
  return (
    <Box
      sx={{ padding: 2 }}
      className="h-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 lg:p-6"
    >
      <Box sx={{ marginBottom: 4 }} className=" flex items-center gap-3">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-white sm:h-11 sm:w-11 ${iconBg}`}
        >
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-700 sm:text-base">
            {title}
          </h3>
          <ChevronRight className="h-4 w-4 flex-shrink-0 text-teal-600 sm:h-5 sm:w-5" />
        </div>
      </Box>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          {value}
        </span>
        <div className="flex flex-col gap-1">
          <div
            className={`flex items-center gap-1 text-xs font-semibold sm:text-sm ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}
          >
            <span>{changeType === "positive" ? "▲" : "▼"}</span>
            <span>{change}</span>
          </div>
          <p className="text-xs text-gray-600 sm:text-sm">{period}</p>
        </div>
      </div>
    </Box>
  );
};

const AgentCard: React.FC<{
  rank: number;
  name: string;
  avatar: string;
  callsHandled: number;
  score: number;
  escalationRate: number;
}> = ({ rank, name, avatar, callsHandled, score, escalationRate }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      p: 2,
      borderRadius: "8px",
      border: rank === 1 ? "2px solid #fbbf24" : "1px solid #e5e7eb",
      bgcolor: rank === 1 ? "#fffbeb" : "white",
      mb: 2,
    }}
  >
    <Typography
      variant="h6"
      sx={{
        mr: 2,
        fontWeight: 600,
        color: "#374151",
        minWidth: "24px",
      }}
    >
      #{rank}
    </Typography>
    <Avatar
      sx={{
        mr: 2,
        bgcolor:
          avatar === "J" ? "#0d9488" : avatar === "S" ? "#dc6a00" : "#7c3aed",
        width: 32,
        height: 32,
        fontSize: "0.875rem",
      }}
    >
      {avatar}
    </Avatar>
    <Box sx={{ flex: 1 }}>
      <Typography variant="body1" sx={{ fontWeight: 600, color: "#111827" }}>
        {name}
      </Typography>
      <Typography variant="body2" color="#6b7280" sx={{ fontSize: "0.75rem" }}>
        {callsHandled} calls handled
      </Typography>
    </Box>
    <Box sx={{ textAlign: "right" }}>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: "#111827",
          mb: 0.5,
        }}
      >
        {score}%
      </Typography>
      <Typography variant="body2" color="#6b7280" sx={{ fontSize: "0.75rem" }}>
        {escalationRate}% escalation
      </Typography>
    </Box>
  </Box>
);

export const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for API data
  const [overview, setOverview] = useState<AgentAnalyticsOverview | null>(null);
  const [callVolumeTrends, setCallVolumeTrends] = useState<AgentCallVolumeTrends | null>(null);
  const [leaderboard, setLeaderboard] = useState<AgentLeaderboard | null>(null);
  const [qualityTrends, setQualityTrends] = useState<AgentConversationQualityTrends | null>(null);
  const [qualityInsights, setQualityInsights] = useState<AgentConversationQualityInsights | null>(null);

  const navItems = ["Overview", "Quality Metrics"];

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        overviewData,
        volumeData,
        leaderboardData,
        trendsData,
        insightsData,
      ] = await Promise.all([
        agentApi.getAnalyticsOverview(),
        agentApi.getAnalyticsCallVolumeTrends(),
        agentApi.getAnalyticsLeaderboard(5),
        agentApi.getConversationQualityTrends(),
        agentApi.getConversationQualityInsights(),
      ]);

      setOverview(overviewData);
      setCallVolumeTrends(volumeData);
      setLeaderboard(leaderboardData);
      setQualityTrends(trendsData);
      setQualityInsights(insightsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load analytics data");
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderOverviewTab = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }

    if (!overview || !callVolumeTrends || !leaderboard) {
      return <Typography>No data available</Typography>;
    }

    const totalCalls = overview.total_calls.value;
    const callsToday = overview.calls_today.value;
    const escalatedCalls = overview.escalated_calls.value;
    const avgDuration = overview.average_call_duration.value;

    return (
      <>
        {/* Stats Grid */}
        <Box
          sx={{ marginBottom: 3 }}
          className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          <MetricCard
            title="Total Calls"
            value={totalCalls}
            change={`${Math.abs(overview.total_calls.percentage_change)}%`}
            changeType={overview.total_calls.percentage_change >= 0 ? "positive" : "negative"}
            period={overview.total_calls.comparison_period}
            icon={<Phone size={20} />}
            iconBg="bg-green-400"
          />

          <MetricCard
            title="Calls Today"
            value={callsToday}
            change={`${Math.abs(overview.calls_today.percentage_change)}%`}
            changeType={overview.calls_today.percentage_change >= 0 ? "positive" : "negative"}
            period={overview.calls_today.comparison_period}
            icon={<PhoneCall size={20} />}
            iconBg="bg-yellow-300"
          />

          <MetricCard
            title="Escalated Calls"
            value={escalatedCalls}
            change={`${Math.abs(overview.escalated_calls.percentage_change)}%`}
            changeType={overview.escalated_calls.percentage_change >= 0 ? "positive" : "negative"}
            period={overview.escalated_calls.comparison_period}
            icon={<PhoneMissed size={20} />}
            iconBg="bg-red-500"
          />

          <MetricCard
            title="Avg Call Duration"
            value={formatDuration(avgDuration)}
            change={`${Math.abs(overview.average_call_duration.percentage_change)}%`}
            changeType={overview.average_call_duration.percentage_change >= 0 ? "positive" : "negative"}
            period={overview.average_call_duration.comparison_period}
            icon={<AlertCircle size={20} />}
            iconBg="bg-purple-600"
          />

          <MetricCard
            title="Quality Score"
            value={`${overview.quality_score.value.toFixed(1)}%`}
            change={`${Math.abs(overview.quality_score.percentage_change)}%`}
            changeType={overview.quality_score.percentage_change >= 0 ? "positive" : "negative"}
            period={overview.quality_score.comparison_period}
            icon={<StarIcon sx={{ fontSize: 20 }} />}
            iconBg="bg-blue-500"
          />
        </Box>

        {/* Charts Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                border: "1px solid #f1f5f9",
                backgroundColor: "#ffffff",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 1.5,
                  fontWeight: 600,
                  color: "#0f172a",
                  fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                }}
              >
                a. Call volume trends
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: { xs: 2, sm: 3, md: 4 },
                  color: "#64748b",
                  fontSize: "0.875rem",
                }}
              >
                {callVolumeTrends.date_range}
              </Typography>

              {/* Enhanced Chart Legend */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 2, sm: 4 },
                  mb: { xs: 2, sm: 3, md: 4 },
                  p: 2,
                  backgroundColor: "#f8fafc",
                  borderRadius: "8px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      bgcolor: "#0d9488",
                      boxShadow: "0 2px 4px rgba(13, 148, 136, 0.3)",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#475569",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}
                  >
                    Total calls
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      bgcolor: "#f59e0b",
                      boxShadow: "0 2px 4px rgba(245, 158, 11, 0.3)",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#475569",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}
                  >
                    Escalated calls
                  </Typography>
                </Box>
              </Box>

              {/* Enhanced Chart Representation */}
              <Box
                sx={{
                  height: { xs: 240, sm: 280, md: 320 },
                  display: "flex",
                  alignItems: "end",
                  gap: { xs: 0.5, sm: 1, md: 1.5 },
                  px: { xs: 1, sm: 2, md: 3 },
                  py: 2,
                  backgroundColor: "#fafbfc",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  overflowX: "auto",
                  overflowY: "hidden",
                }}
              >
                {callVolumeTrends.volumes.map((bar, index) => {
                  const maxCalls = Math.max(...callVolumeTrends.volumes.map(v => v.total_calls));
                  const heightPercent = (bar.total_calls / maxCalls) * 100;
                  const escalationPercent = (bar.escalated_calls / bar.total_calls) * 100;

                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flex: 1,
                        minWidth: { xs: "32px", sm: "40px" },
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          maxWidth: { xs: "24px", sm: "32px" },
                          height: `${(heightPercent / 100) * 200}px`,
                          bgcolor: "#0d9488",
                          borderRadius: "6px",
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: "0 2px 8px rgba(13, 148, 136, 0.2)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 16px rgba(13, 148, 136, 0.3)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: `${escalationPercent}%`,
                            bgcolor: "#f59e0b",
                            borderRadius: "6px 6px 0 0",
                            boxShadow: "0 2px 4px rgba(245, 158, 11, 0.2)",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          mt: { xs: 0.75, sm: 1.5 },
                          fontSize: { xs: "0.625rem", sm: "0.75rem" },
                          color: "#64748b",
                          fontWeight: 500,
                        }}
                      >
                        {bar.hour}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              {/* Summary stats */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  gap: { xs: 2, sm: 0 },
                  mt: { xs: 2, sm: 3 },
                  pt: { xs: 2, sm: 3 },
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                <Box sx={{ textAlign: { xs: "left", sm: "center" } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#0f172a",
                      fontSize: { xs: "1.125rem", sm: "1.25rem" },
                    }}
                  >
                    {callVolumeTrends.volumes.reduce((sum, v) => sum + v.total_calls, 0)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    }}
                  >
                    Total calls
                  </Typography>
                </Box>
                <Box sx={{ textAlign: { xs: "left", sm: "center" } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#f59e0b",
                      fontSize: { xs: "1.125rem", sm: "1.25rem" },
                    }}
                  >
                    {callVolumeTrends.volumes.reduce((sum, v) => sum + v.escalated_calls, 0)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    }}
                  >
                    Escalated calls
                  </Typography>
                </Box>
                <Box sx={{ textAlign: { xs: "left", sm: "center" } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#059669",
                      fontSize: { xs: "1.125rem", sm: "1.25rem" },
                    }}
                  >
                    {(
                      (callVolumeTrends.volumes.reduce((sum, v) => sum + v.escalated_calls, 0) /
                        callVolumeTrends.volumes.reduce((sum, v) => sum + v.total_calls, 0)) *
                      100
                    ).toFixed(1)}%
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    }}
                  >
                    Escalation rate
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: { xs: 2, sm: 3 },
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 0 },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#111827",
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                  }}
                >
                  b. Call agent leaderboard
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    color: "#0d9488",
                    textTransform: "none",
                    fontSize: "0.875rem",
                  }}
                >
                  View all
                </Button>
              </Box>

              <Box>
                {leaderboard.leaderboard.map((agent, index) => (
                  <AgentCard
                    key={agent.agent_id}
                    rank={index + 1}
                    name={agent.agent_name}
                    avatar={agent.agent_name.charAt(0).toUpperCase()}
                    callsHandled={agent.total_calls}
                    score={Math.round(agent.quality_score)}
                    escalationRate={Math.round(agent.escalation_rate * 100)}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  };

  const renderQualityMetricsTab = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }

    if (!qualityTrends || !qualityInsights) {
      return <Typography>No quality data available</Typography>;
    }

    const qualityBreakdown = qualityInsights.quality_breakdown;
    const overallQuality = Math.round(qualityBreakdown.overall_quality);

    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper
              sx={{
                p: 4,
                borderRadius: "16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                border: "1px solid #f1f5f9",
                backgroundColor: "#ffffff",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 1.5,
                  fontWeight: 600,
                  color: "#6b7280",
                  fontSize: "1.125rem",
                }}
              >
                a. Conversation quality trends
              </Typography>

              {/* Quality Chart */}
              <Box
                sx={{
                  height: { xs: 280, sm: 320 },
                  position: "relative",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  p: { xs: 2, sm: 3 },
                  overflowX: "auto",
                }}
              >
                {/* Y-axis */}
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 5, sm: 10 },
                    top: 20,
                    bottom: 60,
                  }}
                >
                  {[100, 80, 60, 40, 20, 0].map((value, index) => (
                    <Box
                      key={value}
                      sx={{
                        position: "absolute",
                        top: `${index * 16.67}%`,
                        fontSize: { xs: "0.625rem", sm: "0.75rem" },
                        color: "#9ca3af",
                      }}
                    >
                      {value}
                    </Box>
                  ))}
                </Box>

                {/* Chart area */}
                <Box
                  sx={{
                    ml: { xs: 3, sm: 4 },
                    mr: { xs: 1, sm: 2 },
                    height: "100%",
                    position: "relative",
                    minWidth: { xs: "280px", sm: "auto" },
                  }}
                >
                  <svg
                    width="100%"
                    height="200"
                    style={{ position: "absolute", top: 0 }}
                  >
                    {/* Grid lines */}
                    {[0, 20, 40, 60, 80, 100].map((value, index) => (
                      <line
                        key={`${value}-${index}`}
                        x1="0"
                        y1={200 - value * 2}
                        x2="100%"
                        y2={200 - value * 2}
                        stroke="#f3f4f6"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Line chart */}
                    <polyline
                      points={qualityTrends.data_points
                        .map((point, idx) => {
                          const x = 40 + idx * 40;
                          const y = 200 - point.average_quality_score * 2;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {qualityTrends.data_points.map((point, idx) => {
                      const x = 40 + idx * 40;
                      const y = 200 - point.average_quality_score * 2;
                      return (
                        <circle
                          key={idx}
                          cx={x}
                          cy={y}
                          r="4"
                          fill="white"
                          stroke="#0d9488"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </svg>
                </Box>

                {/* X-axis labels */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1,
                    ml: { xs: 3, sm: 4 },
                    mr: { xs: 1, sm: 2 },
                    minWidth: { xs: "280px", sm: "auto" },
                    overflowX: { xs: "auto", sm: "visible" },
                  }}
                >
                  {qualityTrends.data_points.map((point) => (
                    <Typography
                      key={point.month}
                      variant="caption"
                      sx={{
                        fontSize: { xs: "0.625rem", sm: "0.75rem" },
                        color: "#9ca3af",
                      }}
                    >
                      {point.month}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                height: "fit-content",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    p: 0.5,
                    borderRadius: "4px",
                    bgcolor: "#fef3c7",
                    color: "#f59e0b",
                    mr: 2,
                  }}
                >
                  <StarIcon sx={{ fontSize: "1.25rem" }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#6b7280",
                    fontSize: "1.125rem",
                  }}
                >
                  b. Your conversation quality
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "#fef3c7",
                    px: 2,
                    py: 1,
                    borderRadius: "16px",
                  }}
                >
                  <StarIcon sx={{ fontSize: "1rem", color: "#f59e0b" }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#92400e",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    {overallQuality}%
                  </Typography>
                </Box>
              </Box>

              {/* Individual scores */}
              <Box>
                {[
                  { name: "Rapport", score: qualityBreakdown.rapport, key: "rapport" },
                  { name: "Listening", score: qualityBreakdown.listening, key: "listening" },
                  { name: "Analysing", score: qualityBreakdown.analyzing, key: "analyzing" },
                  { name: "Motivating", score: qualityBreakdown.motivating, key: "motivating" },
                  { name: "Ending", score: qualityBreakdown.ending, key: "ending" },
                ].map((item) => {
                  const score = Math.round(item.score);
                  const color =
                    score >= 70 ? "#059669" : score >= 40 ? "#0d9488" : score >= 20 ? "#f59e0b" : "#dc2626";

                  return (
                    <Box key={item.key} sx={{ mb: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#6b7280",
                            fontWeight: 500,
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#111827",
                            fontWeight: 600,
                          }}
                        >
                          {score}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={score}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "#e5e7eb",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: color,
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Areas for improvement section below */}
        <Grid container sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#6b7280",
                  mb: 3,
                  fontSize: "1.125rem",
                }}
              >
                c. Areas for improvement
              </Typography>

              <Grid container spacing={2}>
                {qualityInsights.areas_for_improvement.map((area, index) => (
                  <Grid item xs={12} sm={6} lg={3} key={index}>
                    <Box
                      sx={{
                        p: 3,
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        height: "100%",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: "#111827",
                          mb: 2,
                        }}
                      >
                        {area.area_name}
                      </Typography>
                      <Chip
                        label={`● ${area.priority_level.charAt(0).toUpperCase() + area.priority_level.slice(1)} priority`}
                        size="small"
                        sx={{
                          bgcolor: "transparent",
                          color:
                            area.priority_level === "high"
                              ? "#dc2626"
                              : area.priority_level === "medium"
                              ? "#f59e0b"
                              : "#059669",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          border: "none",
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        {/* Left section: Button-style navigation */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#f3f4f6",
            p: 1,
            borderRadius: 1,
          }}
        >
          {navItems.map((item, index) => (
            <Button
              key={index}
              onClick={() => setActiveTab(index)}
              sx={{
                bgcolor: activeTab === index ? "#ffffff" : "transparent",
                color: activeTab === index ? "#0d9488" : "#9ca3af",
                border: activeTab === index ? "1px solid #e5e7eb" : "none",
                borderRadius: 1,
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: activeTab === index ? 600 : 500,
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: activeTab === index ? "#ffffff" : "#f9fafb",
                  color: activeTab === index ? "#0d9488" : "#6b7280",
                },
              }}
            >
              {item}
            </Button>
          ))}
        </Box>

        {/* Right section: Date range and Export button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <TextField
            value="04/08/2025 - 04/09/2025"
            variant="outlined"
            size="small"
            onClick={() => {
              console.log("Open date range picker");
            }}
            sx={{
              width: { xs: "100%", sm: "240px" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "9999px",
                backgroundColor: "#f3f4f6",
                fontSize: "0.875rem",
                color: "#374151",
                fontWeight: 500,
                pr: 1,
                "&:hover": { bgcolor: "#e5e7eb" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0d9488",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d1d5db",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Calendar size={18} style={{ color: "#6b7280" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" edge="end">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            startIcon={<FileDownloadIcon />}
            variant="contained"
            sx={{
              bgcolor: "#0d9488",
              "&:hover": { bgcolor: "#0f766e" },
              textTransform: "none",
              fontWeight: 600,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Export report
          </Button>
        </Box>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && renderOverviewTab()}
      {activeTab === 1 && renderQualityMetricsTab()}
    </Box>
  );
};