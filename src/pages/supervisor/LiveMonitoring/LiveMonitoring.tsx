// src/pages/supervisor/LiveMonitoring/LiveMonitoring.tsx
import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Skeleton } from "@mui/material";
import { Phone as PhoneIcon } from "@mui/icons-material";
import { SearchFilterBar } from "../../../components/common/SearchBar/SearchFilterBar";
import CustomChip from "../../../components/common/CustomChip/CustomChip";

import type { LiveMonitoring as LiveMonitoringType } from "../../../types/supervisor.types";
import supervisorApi from "../../../services/api/supervisorApi";

// Map risk levels to our CustomChip risk levels
type RiskLevel = "critical" | "high" | "medium" | "low";

const mapRiskToChip = (risk: string): "High" | "Medium" | "Low" => {
  const normalized = risk.toLowerCase();
  switch (normalized) {
    case "critical":
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
    default:
      return "Low";
  }
};

const statusFilterOptions = [
  { value: "all", label: "All status" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "voicemail", label: "Voicemail" },
  { value: "missed", label: "Missed" },
];

// Shimmer Loading Component
const CallCardSkeleton: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      alignItems: { xs: "stretch", sm: "center" },
      p: { xs: 2, sm: 2.5 },
      border: "1px solid #e5e7eb",
      borderRadius: 2,
      bgcolor: "white",
      gap: { xs: 2, sm: 0 },
    }}
  >
    {/* Phone Icon Skeleton */}
    <Skeleton
      variant="circular"
      width={48}
      height={48}
      sx={{ mr: { xs: 0, sm: 2 }, flexShrink: 0 }}
    />

    {/* Call Info Skeleton */}
    <Box sx={{ flex: 1, mb: { xs: 1, sm: 0 } }}>
      <Skeleton variant="text" width="40%" height={24} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width="60%" height={20} />
    </Box>

    {/* Urgency Badge Skeleton */}
    <Box
      sx={{
        mx: { xs: 0, sm: 3 },
        mb: { xs: 1, sm: 0 },
        alignSelf: { xs: "flex-start", sm: "center" },
      }}
    >
      <Skeleton variant="rounded" width={80} height={24} />
    </Box>

    {/* Time Info Skeleton */}
    <Box
      sx={{
        display: "flex",
        gap: { xs: 2, sm: 4 },
        mr: { xs: 0, sm: 2 },
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
      }}
    >
      <Box sx={{ textAlign: { xs: "left", sm: "center" } }}>
        <Skeleton variant="text" width={60} height={16} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width={70} height={20} />
      </Box>
      <Box sx={{ textAlign: { xs: "left", sm: "center" } }}>
        <Skeleton variant="text" width={60} height={16} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width={70} height={20} />
      </Box>
    </Box>
  </Box>
);

export const LiveMonitoring: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveData, setLiveData] = useState<LiveMonitoringType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchLiveMonitoring = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters: {
        agent_name?: string;
        risk_level?: string;
        status_filter?: string;
        page?: number;
        limit?: number;
      } = {
        page: currentPage,
        limit: itemsPerPage,
      };

      if (searchQuery.trim()) {
        filters.agent_name = searchQuery.trim();
      }

      if (statusFilter && statusFilter !== "all") {
        filters.status_filter = statusFilter;
      }

      const data = await supervisorApi.getLiveMonitoring(filters);
      setLiveData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch live monitoring data");
      console.error("Error fetching live monitoring:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMonitoring();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchLiveMonitoring();
    }, 30000);

    return () => clearInterval(interval);
  }, [searchQuery, statusFilter, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (liveData && liveData.active_calls.length === itemsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDuration = (duration: string) => {
    // Duration is already in the format we need from the API
    return duration;
  };

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } catch {
      return timeString;
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* Search and Filter Bar */}
      <SearchFilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by agent..."
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={statusFilterOptions}
      />

      {/* Active Calls Section */}
      <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2 },
              mb: 3,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
              Active calls
            </Typography>
            <Box
              sx={{
                bgcolor: "#f3f4f6",
                color: "#6b7280",
                px: { xs: 1.5, sm: 2 },
                py: 0.5,
                borderRadius: 10,
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              {loading ? (
                <Skeleton variant="text" width={20} />
              ) : (
                liveData?.total_active_calls || 0
              )}
            </Box>
          </Box>

          {/* Error State */}
          {error && (
            <Box
              sx={{
                p: 3,
                bgcolor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Typography variant="body2" sx={{ color: "#dc2626" }}>
                {error}
              </Typography>
            </Box>
          )}

          {/* Call List */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {loading ? (
              // Show 3 skeleton loaders
              <>
                <CallCardSkeleton />
                <CallCardSkeleton />
                <CallCardSkeleton />
              </>
            ) : liveData && liveData.active_calls.length > 0 ? (
              liveData.active_calls.map((call) => (
                <Box
                  key={call.call_id}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" },
                    p: { xs: 2, sm: 2.5 },
                    border: "1px solid #e5e7eb",
                    borderRadius: 2,
                    bgcolor: "white",
                    gap: { xs: 2, sm: 0 },
                    "&:hover": {
                      bgcolor: "#f9fafb",
                      cursor: "pointer",
                    },
                  }}
                >
                  {/* Phone Icon */}
                  <Box
                    sx={{
                      width: { xs: 40, sm: 48 },
                      height: { xs: 40, sm: 48 },
                      borderRadius: "50%",
                      bgcolor: "#dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: { xs: 0, sm: 2 },
                      flexShrink: 0,
                    }}
                  >
                    <PhoneIcon
                      sx={{
                        color: "#3b82f6",
                        fontSize: { xs: 20, sm: "inherit" },
                      }}
                    />
                  </Box>

                  {/* Call Info */}
                  <Box sx={{ flex: 1, mb: { xs: 1, sm: 0 } }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}
                    >
                      Call #{call.call_id}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                      Agent:{" "}
                      <span style={{ fontWeight: 500, color: "#111827" }}>
                        {call.agent_name}
                      </span>
                    </Typography>
                  </Box>

                  {/* Risk Level Badge */}
                  <Box
                    sx={{
                      mx: { xs: 0, sm: 3 },
                      mb: { xs: 1, sm: 0 },
                      alignSelf: { xs: "flex-start", sm: "center" },
                    }}
                  >
                    <CustomChip
                      label={mapRiskToChip(call.risk_level)}
                      variant="risk"
                      size="small"
                    />
                  </Box>

                  {/* Time Info */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: { xs: 2, sm: 4 },
                      mr: { xs: 0, sm: 2 },
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                    }}
                  >
                    <Box sx={{ textAlign: { xs: "left", sm: "center" } }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "#6b7280", display: "block" }}
                      >
                        Started:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#111827" }}
                      >
                        {formatTime(call.start_time)}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: { xs: "left", sm: "center" } }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "#6b7280", display: "block" }}
                      >
                        Duration:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#111827" }}
                      >
                        {formatDuration(call.duration)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              // Empty State
              <Box
                sx={{
                  p: 6,
                  textAlign: "center",
                  color: "#6b7280",
                }}
              >
                <Typography variant="body1">
                  No active calls at the moment
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: { xs: 2, sm: 3 },
            borderTop: "1px solid #e5e7eb",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            {loading ? (
              <Skeleton variant="text" width={150} />
            ) : liveData ? (
              `Page ${currentPage} - ${liveData.active_calls.length} results`
            ) : (
              "No results"
            )}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            <Box
              onClick={currentPage > 1 ? handlePreviousPage : undefined}
              sx={{
                px: { xs: 1.5, sm: 2 },
                py: 1,
                border: "1px solid #e5e7eb",
                borderRadius: 1,
                color: currentPage > 1 ? "#111827" : "#9ca3af",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                cursor: currentPage > 1 ? "pointer" : "not-allowed",
                textAlign: "center",
                flex: { xs: 1, sm: "unset" },
                "&:hover": {
                  bgcolor: currentPage > 1 ? "#f9fafb" : "transparent",
                },
              }}
            >
              ‹ Previous
            </Box>
            <Box
              onClick={
                liveData && liveData.active_calls.length === itemsPerPage
                  ? handleNextPage
                  : undefined
              }
              sx={{
                px: { xs: 1.5, sm: 2 },
                py: 1,
                border: "1px solid #e5e7eb",
                borderRadius: 1,
                color:
                  liveData && liveData.active_calls.length === itemsPerPage
                    ? "#111827"
                    : "#9ca3af",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                cursor:
                  liveData && liveData.active_calls.length === itemsPerPage
                    ? "pointer"
                    : "not-allowed",
                textAlign: "center",
                flex: { xs: 1, sm: "unset" },
                "&:hover": {
                  bgcolor:
                    liveData && liveData.active_calls.length === itemsPerPage
                      ? "#f9fafb"
                      : "transparent",
                },
              }}
            >
              Next ›
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};