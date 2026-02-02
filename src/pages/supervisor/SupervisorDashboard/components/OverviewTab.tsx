// File: src/pages/supervisor/SupervisorDashboard/components/OverviewTab.tsx
import React from "react";
import { GridLegacy as Grid } from "@mui/material";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { Star, Refresh } from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { CallVolumeTrends, AgentStatusMonitor } from "../../../../types/supervisor.types";

interface OverviewTabProps {
  loading: boolean;
  callVolume: CallVolumeTrends | null;
  agentStatus: AgentStatusMonitor | null;
  refreshingAgents: boolean;
  onRefreshAgents: () => void;
}

// Skeleton Components
const AgentStatusSkeleton: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      p: 2,
      bgcolor: "#f9fafb",
      borderRadius: 2,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={16} sx={{ mt: 0.5 }} />
      </Box>
    </Box>
    <Skeleton variant="text" width={50} height={20} />
  </Box>
);

export const OverviewTab: React.FC<OverviewTabProps> = ({
  loading,
  callVolume,
  agentStatus,
  refreshingAgents,
  onRefreshAgents,
}) => {
  // Transform call volume data for chart
  const getCallVolumeData = () => {
    if (!callVolume) return [];
    return callVolume.volumes.map((v) => ({
      time: v.hour,
      calls: v.total_calls,
    }));
  };

  // Get status color
  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("call") || statusLower === "on call") {
      return "#ef4444";
    }
    if (statusLower === "available") {
      return "#10b981";
    }
    if (statusLower.includes("break")) {
      return "#f59e0b";
    }
    return "#6b7280";
  };

  // Get avatar background color
  const getAvatarColor = (index: number): string => {
    const colors = ["#14b8a6", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899"];
    return colors[index % colors.length];
  };

  // Format time helper
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const callVolumeData = getCallVolumeData();

  return (
    <Grid container spacing={3}>
      {/* Call Volume Trends */}
      <Grid item xs={12} lg={7}>
        <Card
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}
                >
                  Call Volume Trends
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", fontSize: "0.875rem" }}
                >
                  {loading ? (
                    <Skeleton variant="text" width={200} />
                  ) : (
                    callVolume?.date_range || "Hourly call distribution"
                  )}
                </Typography>
              </Box>
            </Box>
            {loading ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={300}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={callVolumeData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "none",
                      borderRadius: 8,
                      color: "white",
                    }}
                    cursor={{ fill: "#f3f4f6" }}
                  />
                  <Bar
                    dataKey="calls"
                    fill="#008080"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* Agent Status Monitor */}
      <Grid item xs={12} lg={5}>
        <Card
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}
                >
                  Agent Status Monitor
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", fontSize: "0.875rem" }}
                >
                  {loading ? (
                    <Skeleton variant="text" width={150} />
                  ) : agentStatus?.last_updated ? (
                    formatTime(agentStatus.last_updated)
                  ) : (
                    "Current availability"
                  )}
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={onRefreshAgents}
                disabled={refreshingAgents || loading}
                sx={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 1.5,
                  "&:hover": { bgcolor: "#f9fafb" },
                }}
              >
                {refreshingAgents ? (
                  <CircularProgress size={18} sx={{ color: "#14b8a6" }} />
                ) : (
                  <Refresh sx={{ fontSize: 18, color: "#14b8a6" }} />
                )}
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {loading ? (
                <>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <AgentStatusSkeleton key={i} />
                  ))}
                </>
              ) : agentStatus?.agents && agentStatus.agents.length > 0 ? (
                agentStatus.agents.map((agent, index) => (
                  <Box
                    key={agent.agent_id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      bgcolor: "#f9fafb",
                      borderRadius: 2,
                      "&:hover": {
                        bgcolor: "#f3f4f6",
                      },
                      transition: "all 0.2s",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flex: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: getAvatarColor(index),
                          color: "white",
                          fontWeight: 600,
                          fontSize: "1rem",
                        }}
                      >
                        {agent.agent_name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: "#111827",
                            mb: 0.5,
                            fontSize: "0.875rem",
                          }}
                        >
                          {agent.agent_name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: getStatusColor(agent.status),
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#6b7280",
                              fontSize: "0.75rem",
                            }}
                          >
                            {agent.status}
                            {agent.call_duration && ` • ${agent.call_duration}`}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Star sx={{ fontSize: 14, color: "#fbbf24" }} />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "#111827",
                          fontSize: "0.875rem",
                        }}
                      >
                        {agent.quality_score}%
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", textAlign: "center", py: 4 }}
                >
                  No agents available
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};