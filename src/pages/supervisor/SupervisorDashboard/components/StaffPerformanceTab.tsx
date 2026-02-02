// File: src/pages/supervisor/SupervisorDashboard/components/StaffPerformanceTab.tsx
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
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
  Skeleton,
} from "@mui/material";
import { Star, FilterList } from "@mui/icons-material";
import type { StaffPerformance } from "../../../../types/supervisor.types";

interface StaffPerformanceTabProps {
  loading: boolean;
  staffPerformance: StaffPerformance | null;
  statusFilter: string;
  staffPage: number;
  pageLimit: number;
  onStatusFilterChange: (value: string) => void;
  onLoadMore: () => void;
}

// Skeleton Component
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

export const StaffPerformanceTab: React.FC<StaffPerformanceTabProps> = ({
  loading,
  staffPerformance,
  statusFilter,
  staffPage,
  pageLimit,
  onStatusFilterChange,
  onLoadMore,
}) => {
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
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
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

  // Filter staff by status
  const getFilteredStaff = () => {
    if (!staffPerformance) return [];
    if (statusFilter === "all") return staffPerformance.staff;

    return staffPerformance.staff.filter((staff) => {
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

  const filteredStaff = getFilteredStaff();

  return (
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
            <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 150 } }}>
              <Select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
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
                    <TableCell sx={{ p: { xs: 1, sm: 2 }, textAlign: "center" }}>
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
                    <TableCell sx={{ p: { xs: 1, sm: 2 }, textAlign: "center" }}>
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
                    <TableCell sx={{ p: { xs: 1, sm: 2 }, textAlign: "center" }}>
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
                    <TableCell sx={{ p: { xs: 1, sm: 2 }, textAlign: "center" }}>
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

        {!loading &&
          staffPerformance?.staff &&
          staffPerformance.staff.length > 0 && (
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
                onClick={onLoadMore}
                disabled={
                  staffPage * pageLimit >= staffPerformance.total_results
                }
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
                {staffPage * pageLimit >= staffPerformance.total_results
                  ? "No More"
                  : "Load More"}
              </Button>
            </Box>
          )}
      </CardContent>
    </Card>
  );
};