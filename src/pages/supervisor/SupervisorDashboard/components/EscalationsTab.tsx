// File: src/pages/supervisor/SupervisorDashboard/components/EscalationsTab.tsx
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Skeleton,
} from "@mui/material";
import { FilterList, Phone } from "@mui/icons-material";
import { PlayButton } from "../../../../components/common/PlayButton/PlayButton";
import { ViewButton } from "../../../../components/common/ViewButton/ViewButton";
import { CallBackButton } from "../../../../components/common/CallBackButton/CallBackButton";
import { CallDetailsPage } from "../../../../components/common/CallDetailsPage";
import { CallPopup } from "../../../../components/common/CallPopupProps/CallPopupProps";
import { CallRecordingPlayer } from "../../../../components/common/CallRecordingPlayer";
import type { EscalationsOverview } from "../../../../types/supervisor.types";

interface EscalationsTabProps {
  loading: boolean;
  escalations: EscalationsOverview | null;
  statusFilter: string;
  escalationsPage: number;
  pageLimit: number;
  onStatusFilterChange: (value: string) => void;
  onLoadMore: () => void;
}

interface Escalation {
  escalation_id: string;
  escalation_reason: string;
  priority_level: string;
  caller_id: string;
  agent_name: string;
  sent_at: string;
  risk_level: string;
  resolution_status: string;
}

// Skeleton Component
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

export const EscalationsTab: React.FC<EscalationsTabProps> = ({
  loading,
  escalations,
  statusFilter,
  escalationsPage,
  pageLimit,
  onStatusFilterChange,
  onLoadMore,
}) => {
  // State for call recording player
  const [playingEscalationId, setPlayingEscalationId] = useState<string | null>(null);
  
  // State for call details view
  const [selectedEscalationId, setSelectedEscalationId] = useState<string | null>(null);
  
  // State for call popup
  const [showCallPopup, setShowCallPopup] = useState(false);
  const [activeCall, setActiveCall] = useState<{
    callId: string;
    phoneNumber: string;
    callerName?: string;
  } | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);

  // Handle play recording - use escalation_id directly
  const handlePlayRecording = (escalationId: string) => {
    setPlayingEscalationId(escalationId);
  };

  // Handle close player
  const handleClosePlayer = () => {
    setPlayingEscalationId(null);
  };

  // Handle view call details - use escalation_id directly
  const handleViewCall = (escalationId: string) => {
    setSelectedEscalationId(escalationId);
  };

  // Handle callback - use escalation_id directly
  const handleCallBack = (escalation: Escalation) => {
    setActiveCall({
      callId: escalation.escalation_id,
      phoneNumber: escalation.caller_id,
      callerName: escalation.agent_name,
    });
    setShowCallPopup(true);
    setCallDuration(0);
    setIsCallActive(false);
  };

  // Handle end call
  const handleEndCall = () => {
    setShowCallPopup(false);
    setIsCallActive(false);
    setCallDuration(0);
    setActiveCall(null);
  };

  // Handle minimize call
  const handleMinimize = () => {
    setShowCallPopup(false);
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

  // Find the escalation being played
  const playingEscalation = escalations?.escalations.find(
    (esc) => esc.escalation_id === playingEscalationId
  );

  // If viewing call details, show the call details page using escalation_id
  if (selectedEscalationId) {
    return (
      <CallDetailsPage
        callId={selectedEscalationId}
        onBack={() => setSelectedEscalationId(null)}
        isSupervisor={true}
      />
    );
  }

  return (
    <>
      {/* Call Recording Player Popup - Note: This will use the escalation details endpoint */}
      {playingEscalationId && playingEscalation && (
        <CallRecordingPlayer
          callId={playingEscalationId}
          duration="0:00"
          recordingUrl="" // Will be fetched from escalation details API
          isPopup={true}
          open={true}
          onClose={handleClosePlayer}
          isSupervisor={true}
        />
      )}

      {/* Call Popup */}
      {activeCall && (
        <CallPopup
          callId={activeCall.callId}
          phoneNumber={activeCall.phoneNumber}
          callerName={activeCall.callerName}
          mode={isCallActive ? "active" : "outgoing"}
          duration={callDuration}
          open={showCallPopup}
          onEndCall={handleEndCall}
          onMinimize={handleMinimize}
        />
      )}

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
                      bgcolor: "#CCE5E5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Phone sx={{ fontSize: 20, color: "#6b7280" }} />
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
                        {formatDate(escalation.sent_at)} |{" "}
                        {formatTime(escalation.sent_at)}
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
                  <PlayButton
                    onClick={() => handlePlayRecording(escalation.escalation_id)}
                    size="small"
                  />
                  <ViewButton
                    onClick={() => handleViewCall(escalation.escalation_id)}
                    size="small"
                  />
                  <CallBackButton
                    onClick={() => handleCallBack(escalation as Escalation)}
                    size="small"
                    label="Call"
                    bgcolor="#14b8a6"
                    hoverBgColor="#0d9488"
                  />
                </Box>
              </Box>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "#6b7280", textAlign: "center", py: 4 }}
            >
              No escalations found
            </Typography>
          )}
        </Box>

        {!loading &&
          escalations?.escalations &&
          escalations.escalations.length > 0 && (
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
                onClick={onLoadMore}
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
                {escalationsPage * pageLimit >= escalations.total_results
                  ? "No More"
                  : "Load More"}
              </Button>
            </Box>
          )}
      </CardContent>
    </Card>
    </>
  );
};