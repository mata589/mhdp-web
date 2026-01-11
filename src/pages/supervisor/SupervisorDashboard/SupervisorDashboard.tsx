// File: src/pages/supervisor/SupervisorDashboard/SupervisorDashboard.tsx
import React, { useState, useEffect } from "react";
import { GridLegacy as Grid } from "@mui/material";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Alert,
  Skeleton,
} from "@mui/material";
import {
  Phone,
  Warning,
  Star,
  Visibility,
  Refresh,
  PlayArrow,
  PhoneInTalk,
  FilterList,
} from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";
import { MetricCard } from "../../../components/cards/MetricCard/MetricCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ToggleTabs from "../../../components/common/ToggleTabs/ToggleTabs";

import type {
  SupervisorOverview,
  CallVolumeTrends,
  AgentStatusMonitor,
  EscalationsOverview,
  StaffPerformance,
} from "../../../types/supervisor.types";
import supervisorApi from "../../../services/api/supervisorApi";

// Shimmer Loading Components
const MetricCardSkeleton: React.FC = () => (
  <Card sx={{ bgcolor: "white", borderRadius: 2, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)" }}>
    <CardContent sx={{ p: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Skeleton variant="circular" width={48} height={48} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={32} sx={{ mt: 0.5 }} />
          <Skeleton variant="text" width="50%" height={16} sx={{ mt: 0.5 }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

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

const EscalationCardSkeleton: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      alignItems: { xs: "stretch", sm: "center" },
      justifyContent: "space-between",
      p: { xs: 2, sm: 2.5 },
      border: "1px solid #e5e7eb",
      borderRadius: 2,
      gap: { xs: 2, sm: 0 },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, sm: 2.5 }, flex: 1 }}>
      <Skeleton variant="rounded" width={40} height={40} />
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="rounded" width={60} height={22} />
        </Box>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Skeleton variant="text" width={100} height={16} />
          <Skeleton variant="text" width={100} height={16} />
          <Skeleton variant="text" width={150} height={16} />
        </Box>
      </Box>
    </Box>
    <Box sx={{ display: "flex", gap: 1 }}>
      <Skeleton variant="rounded" width={60} height={36} />
      <Skeleton variant="rounded" width={60} height={36} />
      <Skeleton variant="rounded" width={60} height={36} />
    </Box>
  </Box>
);

const TableRowSkeleton: React.FC = () => (
  <TableRow>
    <TableCell sx={{ p: { xs: 1, sm: 2 } }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 } }}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" width={120} height={20} />
      </Box>
    </TableCell>
    <TableCell sx={{ p: { xs: 1, sm: 2 } }}>
      <Skeleton variant="rounded" width={80} height={24} />
    </TableCell>
    <TableCell sx={{ p: { xs: 1, sm: 2 } }}>
      <Skeleton variant="text" width={150} height={20} />
    </TableCell>
    <TableCell sx={{ p: { xs: 1, sm: 2 }, textAlign: "center" }}>
      <Skeleton variant="text" width={40} height={20} sx={{ margin: "0 auto" }} />
    </TableCell>
    <TableCell sx={{ p: { xs: 1, sm: 2 }, textAlign: "center" }}>
      <Skeleton variant="text" width={40} height={20} sx={{ margin: "0 auto" }} />
    </TableCell>
    <TableCell sx={{ p: { xs: 1, sm: 2 }, textAlign: "center" }}>
      <Skeleton variant="text" width={60} height={20} sx={{ margin: "0 auto" }} />
    </TableCell>
    <TableCell sx={{ p: { xs: 1, sm: 2 }, textAlign: "center" }}>
      <Skeleton variant="rounded" width={60} height={32} sx={{ margin: "0 auto" }} />
    </TableCell>
  </TableRow>
);

export const SupervisorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshingAgents, setRefreshingAgents] = useState(false);
  
  // Data states
  const [overview, setOverview] = useState<SupervisorOverview | null>(null);
  const [callVolume, setCallVolume] = useState<CallVolumeTrends | null>(null);
  const [agentStatus, setAgentStatus] = useState<AgentStatusMonitor | null>(null);
  const [escalations, setEscalations] = useState<EscalationsOverview | null>(null);
  const [staffPerformance, setStaffPerformance] = useState<StaffPerformance | null>(null);
  
  // Pagination states
  const [escalationsPage, setEscalationsPage] = useState(1);
  const [staffPage, setStaffPage] = useState(1);
  const pageLimit = 10;

  const tabOptions = [
    { label: "Overview", value: 0 },
    { label: "Alerts & Escalations", value: 1 },
    { label: "Staff Performance", value: 2 },
  ];

  // Fetch overview data
  const fetchOverview = async () => {
    try {
      const data = await supervisorApi.getOverview();
      setOverview(data);
    } catch (err) {
      console.error("Error fetching overview:", err);
      throw err;
    }
  };

  // Fetch call volume trends
  const fetchCallVolume = async () => {
    try {
      const data = await supervisorApi.getCallVolumeTrends();
      setCallVolume(data);
    } catch (err) {
      console.error("Error fetching call volume:", err);
      throw err;
    }
  };

  // Fetch agent status
  const fetchAgentStatus = async () => {
    try {
      const data = await supervisorApi.getAgentStatusMonitor();
      setAgentStatus(data);
    } catch (err) {
      console.error("Error fetching agent status:", err);
      throw err;
    }
  };

  // Fetch escalations
  const fetchEscalations = async (page: number = 1) => {
    try {
      const data = await supervisorApi.getEscalationsOverview(page, pageLimit);
      setEscalations(data);
      setEscalationsPage(page);
    } catch (err) {
      console.error("Error fetching escalations:", err);
      throw err;
    }
  };

  // Fetch staff performance
  const fetchStaffPerformance = async (page: number = 1) => {
    try {
      const data = await supervisorApi.getStaffPerformance(page, pageLimit);
      setStaffPerformance(data);
      setStaffPage(page);
    } catch (err) {
      console.error("Error fetching staff performance:", err);
      throw err;
    }
  };

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([
          fetchOverview(),
          fetchCallVolume(),
          fetchAgentStatus(),
          fetchEscalations(1),
          fetchStaffPerformance(1),
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Refresh agent status on tab change to overview
  useEffect(() => {
    if (activeTab === 0 && !loading && agentStatus) {
      fetchAgentStatus();
    }
  }, [activeTab]);

  // Handle refresh agent status
  const handleRefreshAgents = async () => {
    setRefreshingAgents(true);
    try {
      await fetchAgentStatus();
    } catch (err) {
      console.error("Error refreshing agents:", err);
    } finally {
      setRefreshingAgents(false);
    }
  };

  // Handle escalations pagination
  const handleLoadMoreEscalations = async () => {
    const nextPage = escalationsPage + 1;
    try {
      await fetchEscalations(nextPage);
    } catch (err) {
      console.error("Error loading more escalations:", err);
    }
  };

  // Handle staff performance pagination
  const handleLoadMoreStaff = async () => {
    const nextPage = staffPage + 1;
    try {
      await fetchStaffPerformance(nextPage);
    } catch (err) {
      console.error("Error loading more staff:", err);
    }
  };

  // Get metrics from overview data
  const getMetrics = () => {
    if (!overview) return [];

    return [
      {
        icon: <Phone sx={{ fontSize: 24, color: "white" }} />,
        color: "teal" as const,
        title: "Total Calls",
        value: overview.total_calls.toString(),
        change: {
          value: parseFloat(overview.total_calls_change.percent),
          type: overview.total_calls_change.trend === "increase" ? "increase" as const : "decrease" as const,
          period: "vs last month",
        },
      },
      {
        icon: <Phone sx={{ fontSize: 24, color: "white" }} />,
        color: "amber" as const,
        title: "Calls Today",
        value: overview.calls_today.toString(),
        change: {
          value: parseFloat(overview.calls_today_change.percent),
          type: overview.calls_today_change.trend === "increase" ? "increase" as const : "decrease" as const,
          period: "vs yesterday",
        },
      },
      {
        icon: <Warning sx={{ fontSize: 24, color: "white" }} />,
        color: "red" as const,
        title: "Escalated Calls",
        value: overview.escalated_calls.toString(),
        change: {
          value: parseFloat(overview.escalated_calls_change.percent),
          type: overview.escalated_calls_change.trend === "increase" ? "increase" as const : "decrease" as const,
          period: "vs yesterday",
        },
      },
      {
        icon: <Star sx={{ fontSize: 24, color: "white" }} />,
        color: "blue" as const,
        title: "Avg. Quality Score",
        value: `${overview.quality_score}%`,
        change: {
          value: parseFloat(overview.quality_score_change.percent),
          type: overview.quality_score_change.trend === "increase" ? "increase" as const : "decrease" as const,
          period: "vs last month",
        },
      },
    ];
  };

  // Transform call volume data for chart
  const getCallVolumeData = () => {
    if (!callVolume) return [];
    return callVolume.volumes.map((v) => ({
      time: v.hour,
      calls: v.total_calls,
    }));
  };

  // Get severity color
  const getSeverityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "#ef4444";
      case "high":
        return "#f59e0b";
      case "medium":
        return "#3b82f6";
      default:
        return "#6b7280";
    }
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

  // Format date helper
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Format time helper
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Filter staff by status
  const getFilteredStaff = () => {
    if (!staffPerformance) return [];
    if (statusFilter === "all") return staffPerformance.staff;
    
    return staffPerformance.staff.filter(staff => {
      const statusLower = staff.status.toLowerCase();
      switch (statusFilter) {
        case "available":
          return statusLower === "available";
        case "oncall":
          return statusLower.includes("call") || statusLower === "on call";
        case "break":
          return statusLower.includes("break");
        default:
          return true;
      }
    });
  };

  if (error) {
    return (
      <Box sx={{ p: 3, bgcolor: "#f9fafb", minHeight: "100vh" }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ bgcolor: "#008080", "&:hover": { bgcolor: "#0d9488" } }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  const metrics = getMetrics();
  const callVolumeData = getCallVolumeData();
  const filteredStaff = getFilteredStaff();

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        bgcolor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
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
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#111827" }}>
          Hello, {`${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() || "Supervisor"}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Visibility />}
          sx={{
            bgcolor: "#008080",
            color: "white",
            textTransform: "none",
            px: 3,
            py: 1,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#0d9488",
            },
          }}
        >
          Monitor live calls
        </Button>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {loading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <MetricCardSkeleton />
              </Grid>
            ))}
          </>
        ) : (
          metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MetricCard
                title={metric.title}
                value={metric.value}
                change={metric.change}
                icon={metric.icon}
                color={metric.color}
                onClick={() => console.log(`Clicked ${metric.title}`)}
              />
            </Grid>
          ))
        )}
      </Grid>

      {/* Toggle Tabs */}
      <Box sx={{ mb: 3 }}>
        <ToggleTabs
          tabs={tabOptions}
          value={activeTab}
          onChange={(value) => setActiveTab(value as number)}
          sx={{ width: "100%" }}
        />
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && (
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
                    <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 1 }} />
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
                      ) : (
                        agentStatus?.last_updated ? formatTime(agentStatus.last_updated) : "Current availability"
                      )}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={handleRefreshAgents}
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
                    <Typography variant="body2" sx={{ color: "#6b7280", textAlign: "center", py: 4 }}>
                      No agents available
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Escalations Tab */}
      {activeTab === 1 && (
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
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 0 },
                mb: 3,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}
                >
                  Escalations Overview
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", fontSize: "0.875rem" }}
                >
                  Manage and review flagged calls
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 1, sm: 2 },
                  width: { xs: "100%", sm: "auto" },
                  justifyContent: { xs: "flex-start", sm: "flex-end" },
                }}
              >
                <FormControl
                  size="small"
                  sx={{ minWidth: { xs: "100%", sm: 150 } }}
                >
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    displayEmpty
                    sx={{
                      bgcolor: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e5e7eb",
                      },
                    }}
                  >
                    <MenuItem value="all">All status</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  sx={{
                    textTransform: "none",
                    borderColor: "#e5e7eb",
                    color: "#6b7280",
                    minWidth: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      borderColor: "#d1d5db",
                      bgcolor: "#f9fafb",
                    },
                  }}
                >
                  Filters
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {loading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <EscalationCardSkeleton key={i} />
                  ))}
                </>
              ) : escalations?.escalations && escalations.escalations.length > 0 ? (
                escalations.escalations.map((escalation) => (
                  <Box
                    key={escalation.escalation_id}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "stretch", sm: "center" },
                      justifyContent: "space-between",
                      p: { xs: 2, sm: 2.5 },
                      border: "1px solid #e5e7eb",
                      borderRadius: 2,
                      gap: { xs: 2, sm: 0 },
                      "&:hover": {
                        bgcolor: "#f9fafb",
                      },
                      transition: "all 0.2s",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 2, sm: 2.5 },
                        flex: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: "#f3f4f6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <PhoneInTalk sx={{ fontSize: 20, color: "#6b7280" }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, color: "#111827" }}
                          >
                            {escalation.escalation_reason}
                          </Typography>
                          <Chip
                            label={escalation.priority_level}
                            size="small"
                            sx={{
                              bgcolor: `${getSeverityColor(escalation.priority_level)}15`,
                              color: getSeverityColor(escalation.priority_level),
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              height: 22,
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: { xs: 1, sm: 3 },
                            alignItems: { xs: "flex-start", sm: "center" },
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ color: "#6b7280", fontSize: "0.875rem" }}
                          >
                            <span style={{ fontWeight: 500, color: "#374151" }}>
                              Caller ID:
                            </span>{" "}
                            {escalation.caller_id}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#6b7280", fontSize: "0.875rem" }}
                          >
                            <span style={{ fontWeight: 500, color: "#374151" }}>
                              Agent:
                            </span>{" "}
                            {escalation.agent_name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#6b7280", fontSize: "0.875rem" }}
                          >
                            <span style={{ fontWeight: 500, color: "#374151" }}>
                              Sent:
                            </span>{" "}
                            {formatDate(escalation.sent_at)} | {formatTime(escalation.sent_at)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 1 },
                        justifyContent: { xs: "center", sm: "flex-end" },
                        mt: { xs: 0, sm: 0 },
                      }}
                    >
                      <Button
                        variant="text"
                        startIcon={<PlayArrow />}
                        sx={{
                          textTransform: "none",
                          color: "#14b8a6",
                          fontWeight: 500,
                          fontSize: { xs: "0.75rem", sm: "inherit" },
                          minWidth: { xs: "auto", sm: "auto" },
                          px: { xs: 1, sm: 2 },
                          "&:hover": {
                            bgcolor: "#14b8a615",
                          },
                        }}
                      >
                        Play
                      </Button>
                      <Button
                        variant="text"
                        startIcon={<Visibility />}
                        sx={{
                          textTransform: "none",
                          color: "#14b8a6",
                          fontWeight: 500,
                          fontSize: { xs: "0.75rem", sm: "inherit" },
                          minWidth: { xs: "auto", sm: "auto" },
                          px: { xs: 1, sm: 2 },
                          "&:hover": {
                            bgcolor: "#14b8a615",
                          },
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<PhoneInTalk />}
                        sx={{
                          textTransform: "none",
                          bgcolor: "#14b8a6",
                          color: "white",
                          fontWeight: 500,
                          fontSize: { xs: "0.75rem", sm: "inherit" },
                          minWidth: { xs: "auto", sm: "auto" },
                          px: { xs: 1, sm: 2 },
                          "&:hover": {
                            bgcolor: "#0d9488",
                          },
                        }}
                      >
                        Call
                      </Button>
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: "#6b7280", textAlign: "center", py: 4 }}>
                  No escalations found
                </Typography>
              )}
            </Box>
            {!loading && escalations?.escalations && escalations.escalations.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                  Page{" "}
                  <span style={{ color: "#14b8a6", fontWeight: 600 }}>
                    {escalationsPage}
                  </span>{" "}
                  of {Math.ceil(escalations.total_results / pageLimit)} (
                  {escalations.total_results} results)
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleLoadMoreEscalations}
                  disabled={escalationsPage * pageLimit >= escalations.total_results}
                  sx={{
                    textTransform: "none",
                    borderColor: "#e5e7eb",
                    color: "#14b8a6",
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: "#14b8a6",
                      bgcolor: "#14b8a615",
                    },
                    "&:disabled": {
                      borderColor: "#e5e7eb",
                      color: "#9ca3af",
                    },
                  }}
                >
                  {escalationsPage * pageLimit >= escalations.total_results ? "No More" : "Load More"}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Staff Performance Tab */}
      {activeTab === 2 && (
        <Card
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 0 },
                mb: 3,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}
                >
                  Staff Performance Overview
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#6b7280", fontSize: "0.875rem" }}
                >
                  Quality scores and call metrics by agents
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 1, sm: 2 },
                  width: { xs: "100%", sm: "auto" },
                  justifyContent: { xs: "flex-start", sm: "flex-end" },
                }}
              >
                <FormControl
                  size="small"
                  sx={{ minWidth: { xs: "100%", sm: 150 } }}
                >
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    displayEmpty
                    sx={{
                      bgcolor: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e5e7eb",
                      },
                    }}
                  >
                    <MenuItem value="all">All status</MenuItem>
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="oncall">On call</MenuItem>
                    <MenuItem value="break">Break</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  sx={{
                    textTransform: "none",
                    borderColor: "#e5e7eb",
                    color: "#6b7280",
                    minWidth: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      borderColor: "#d1d5db",
                      bgcolor: "#f9fafb",
                    },
                  }}
                >
                  Filters
                </Button>
              </Box>
            </Box>
            <TableContainer
              sx={{
                overflowX: { xs: "auto", sm: "visible" },
                borderRadius: 1,
                border: "1px solid #e5e7eb",
              }}
            >
              <Table sx={{ minWidth: { xs: 600, sm: "auto" } }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f9fafb" }}>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#374151",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        p: { xs: 1, sm: 2 },
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#374151",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        p: { xs: 1, sm: 2 },
                        whiteSpace: "nowrap",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#374151",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        p: { xs: 1, sm: 2 },
                        whiteSpace: "nowrap",
                      }}
                    >
                      Last Active
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#374151",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        p: { xs: 1, sm: 2 },
                        whiteSpace: "nowrap",
                      }}
                    >
                      Calls
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#374151",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        p: { xs: 1, sm: 2 },
                        whiteSpace: "nowrap",
                      }}
                    >
                      Escalations
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#374151",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        p: { xs: 1, sm: 2 },
                        whiteSpace: "nowrap",
                      }}
                    >
                      Quality Score
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#374151",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        p: { xs: 1, sm: 2 },
                        whiteSpace: "nowrap",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <TableRowSkeleton key={i} />
                      ))}
                    </>
                  ) : filteredStaff.length > 0 ? (
                    filteredStaff.map((staff, index) => (
                      <TableRow
                        key={staff.agent_id}
                        sx={{
                          "&:hover": {
                            bgcolor: "#f9fafb",
                          },
                        }}
                      >
                        <TableCell sx={{ p: { xs: 1, sm: 2 } }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: { xs: 1, sm: 1.5 },
                            }}
                          >
                            <Avatar
                              sx={{
                                width: { xs: 28, sm: 32 },
                                height: { xs: 28, sm: 32 },
                                bgcolor: getAvatarColor(index),
                                color: "white",
                                fontWeight: 600,
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                              }}
                            >
                              {staff.agent_name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                color: "#111827",
                                fontSize: { xs: "0.8125rem", sm: "inherit" },
                              }}
                            >
                              {staff.agent_name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ p: { xs: 1, sm: 2 } }}>
                          <Chip
                            label={staff.status}
                            size="small"
                            icon={
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  bgcolor: getStatusColor(staff.status),
                                  ml: 1,
                                }}
                              />
                            }
                            sx={{
                              bgcolor: `${getStatusColor(staff.status)}15`,
                              color: getStatusColor(staff.status),
                              fontWeight: 500,
                              fontSize: { xs: "0.625rem", sm: "0.75rem" },
                              height: { xs: 20, sm: "auto" },
                              "& .MuiChip-icon": {
                                ml: 1,
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ p: { xs: 1, sm: 2 } }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              alignItems: { xs: "flex-start", sm: "center" },
                              gap: { xs: 0, sm: 0.5 },
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#111827",
                                fontWeight: 500,
                                fontSize: { xs: "0.8125rem", sm: "inherit" },
                              }}
                            >
                              {formatDate(staff.last_active)}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#6b7280",
                                fontSize: { xs: "0.6875rem", sm: "inherit" },
                              }}
                            >
                              {formatTime(staff.last_active)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{ p: { xs: 1, sm: 2 }, textAlign: "center" }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#111827",
                              fontWeight: 600,
                              fontSize: { xs: "0.8125rem", sm: "inherit" },
                            }}
                          >
                            {staff.calls_handled}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ p: { xs: 1, sm: 2 }, textAlign: "center" }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#111827",
                              fontWeight: 600,
                              fontSize: { xs: "0.8125rem", sm: "inherit" },
                            }}
                          >
                            {staff.escalations}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ p: { xs: 1, sm: 2 }, textAlign: "center" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: { xs: 0.25, sm: 0.5 },
                            }}
                          >
                            <Star
                              sx={{
                                fontSize: { xs: 12, sm: 14 },
                                color: "#fbbf24",
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#111827",
                                fontWeight: 600,
                                fontSize: { xs: "0.8125rem", sm: "inherit" },
                              }}
                            >
                              {staff.quality_score}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{ p: { xs: 1, sm: 2 }, textAlign: "center" }}
                        >
                          <Button
                            variant="text"
                            sx={{
                              textTransform: "none",
                              color: "#14b8a6",
                              fontWeight: 500,
                              fontSize: { xs: "0.75rem", sm: "0.875rem" },
                              px: { xs: 1, sm: 2 },
                              "&:hover": {
                                bgcolor: "#14b8a615",
                              },
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: "center", py: 4 }}>
                        <Typography variant="body2" sx={{ color: "#6b7280" }}>
                          No staff members found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {!loading && staffPerformance?.staff && staffPerformance.staff.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                  Page{" "}
                  <span style={{ color: "#14b8a6", fontWeight: 600 }}>
                    {staffPage}
                  </span>{" "}
                  of {Math.ceil(staffPerformance.total_results / pageLimit)} (
                  {staffPerformance.total_results} results)
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleLoadMoreStaff}
                  disabled={staffPage * pageLimit >= staffPerformance.total_results}
                  sx={{
                    textTransform: "none",
                    borderColor: "#e5e7eb",
                    color: "#14b8a6",
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: "#14b8a6",
                      bgcolor: "#14b8a615",
                    },
                    "&:disabled": {
                      borderColor: "#e5e7eb",
                      color: "#9ca3af",
                    },
                  }}
                >
                  {staffPage * pageLimit >= staffPerformance.total_results ? "No More" : "Load More"}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};