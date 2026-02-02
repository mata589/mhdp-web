// File: src/pages/supervisor/SupervisorDashboard/SupervisorDashboard.tsx
import React, { useState, useEffect } from "react";
import { GridLegacy as Grid } from "@mui/material";
import { Box, Typography, Button, Alert } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";
import { MetricCard } from "../../../components/cards/MetricCard/MetricCard";
import ToggleTabs from "../../../components/common/ToggleTabs/ToggleTabs";
import { MetricCardSkeleton } from "./components/SkeletonComponents";
import { OverviewTab } from "./components/OverviewTab";
import { EscalationsTab } from "./components/EscalationsTab";
import { StaffPerformanceTab } from "./components/StaffPerformanceTab";

import type {
  SupervisorOverview,
  CallVolumeTrends,
  AgentStatusMonitor,
  EscalationsOverview,
  StaffPerformance,
} from "../../../types/supervisor.types";
import supervisorApi from "../../../services/api/supervisorApi";
import { Phone, Warning, Star } from "@mui/icons-material";

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
          type:
            overview.total_calls_change.trend === "increase"
              ? ("increase" as const)
              : ("decrease" as const),
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
          type:
            overview.calls_today_change.trend === "increase"
              ? ("increase" as const)
              : ("decrease" as const),
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
          type:
            overview.escalated_calls_change.trend === "increase"
              ? ("increase" as const)
              : ("decrease" as const),
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
          type:
            overview.quality_score_change.trend === "increase"
              ? ("increase" as const)
              : ("decrease" as const),
          period: "vs last month",
        },
      },
    ];
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
          Hello,{" "}
          {`${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() ||
            "Supervisor"}
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
        <OverviewTab
          loading={loading}
          callVolume={callVolume}
          agentStatus={agentStatus}
          refreshingAgents={refreshingAgents}
          onRefreshAgents={handleRefreshAgents}
        />
      )}

      {activeTab === 1 && (
        <EscalationsTab
          loading={loading}
          escalations={escalations}
          statusFilter={statusFilter}
          escalationsPage={escalationsPage}
          pageLimit={pageLimit}
          onStatusFilterChange={setStatusFilter}
          onLoadMore={handleLoadMoreEscalations}
        />
      )}

      {activeTab === 2 && (
        <StaffPerformanceTab
          loading={loading}
          staffPerformance={staffPerformance}
          statusFilter={statusFilter}
          staffPage={staffPage}
          pageLimit={pageLimit}
          onStatusFilterChange={setStatusFilter}
          onLoadMore={handleLoadMoreStaff}
        />
      )}
    </Box>
  );
};