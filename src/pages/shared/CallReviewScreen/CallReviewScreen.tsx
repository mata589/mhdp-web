import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  TextField,
} from "@mui/material";
import { Phone as PhoneIcon, PhoneMissed, Add as AddIcon, AccessTime as Clock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
 CallInfoCard,
  createChipValue,
  getRiskLevelColors,
  getStatusColors,
} from "../../../components/common/CallInfoCard/CallInfoCard";

// --- Types ---
interface CallHistoryItem {
  time: string;
  status: string;
  callId: string;
}

// --- Mock Data ---
const callData = {
  id: "2031",
  callerId: "#2031",
  status: "returned",
  lastCall: "Jul 13, 2025 | 10:43AM",
  callCount: 10,
  riskLevel: "critical",
  callBackDate: "Jul 13, 2025 | 10:43AM",
  calledBy: "Bosco Kimuli",
};

const callHistory: CallHistoryItem[] = [
  { time: "10:40 AM", status: "Missed", callId: "#2031" },
  { time: "10:40 AM", status: "Missed", callId: "#2031" },
  { time: "10:39 AM", status: "Missed", callId: "#2031" },
  { time: "10:38 AM", status: "Missed", callId: "#2031" },
  { time: "10:36 AM", status: "Missed", callId: "#2031" },
];

// --- Call History Sidebar ---
const CallHistoryPanel: React.FC<{ items: CallHistoryItem[] }> = ({ items }) => (
  <Paper
    sx={{
      p: 3,
      borderRadius: 2,
      boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      mb: 3,
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}>
      Call history
    </Typography>
    <Typography variant="body2" sx={{ color: "#6b7280", mb: 2, fontWeight: 500 }}>
      Jul 13, 2025
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {items.map((call, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            border: "1px solid #e5e7eb",
            borderRadius: 2,
            cursor: "pointer",
            "&:hover": { bgcolor: "#f9fafb" },
            transition: "background-color 0.15s",
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: "#fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <PhoneMissed sx={{ fontSize: 18, color: "#dc2626" }} />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827", lineHeight: 1.4 }}>
              {call.time}
            </Typography>
            <Typography variant="caption" sx={{ color: "#6b7280" }}>
              {call.status} | Call ID: <strong>{call.callId}</strong>
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Paper>
);

// --- Status Panel ---
const StatusPanel: React.FC<{
  status: string;
  callBackDate: string;
  calledBy: string;
}> = ({ status, callBackDate, calledBy }) => {
  const statusColors = getStatusColors(status);
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
          Status
        </Typography>
        <Chip
          label={status.charAt(0).toUpperCase() + status.slice(1)}
          size="small"
          sx={{
            bgcolor: statusColors.bg,
            color: statusColors.color,
            border: `1px solid ${statusColors.border}`,
            fontWeight: 500,
            fontSize: "12px",
            height: "24px",
          }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="body2" sx={{ color: "#6b7280", mb: 0.5, fontSize: "13px" }}>
            Call back date
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827", fontSize: "15px" }}>
            {callBackDate}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ color: "#6b7280", mb: 0.5, fontSize: "13px" }}>
            Called by
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827", fontSize: "15px" }}>
            {calledBy}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

// --- Main Page ---
export const CallReviewScreen: React.FC = () => {
  const navigate = useNavigate();
  const [callNotes, setCallNotes] = useState(
    "I tried reaching the caller, but they were unavailable."
  );
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const statusColors = getStatusColors(callData.status);
  const riskColors = getRiskLevelColors(callData.riskLevel);

  // Build fields for CallInfoCard
  const fields = [
    {
      label: "Caller ID",
      value: callData.callerId,
    },
    {
      label: "Status",
      value: createChipValue(
        callData.status.charAt(0).toUpperCase() + callData.status.slice(1),
        statusColors.bg,
        statusColors.color,
        statusColors.border
      ),
    },
    {
      label: "Call Count",
      value: callData.callCount,
    },
    {
      label: "Risk Level",
      value: createChipValue(
        callData.riskLevel.charAt(0).toUpperCase() + callData.riskLevel.slice(1),
        riskColors.bg,
        riskColors.color,
        riskColors.border
      ),
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "3fr 2fr" },
          gap: 3,
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* Left Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* CallInfoCard with header */}
          <CallInfoCard
            fields={fields}
            gridColumns={{ xs: 2, sm: 4 }}
            header={{
              title: `Missed call #${callData.id}`,
              statusChip: {
                label: callData.status.charAt(0).toUpperCase() + callData.status.slice(1),
                bgcolor: statusColors.bg,
                color: statusColors.color,
                border: statusColors.border,
              },
              subtitle: `Last call: ${callData.lastCall}`,
              onBack: () => navigate(-1),
              actionButton: {
                label: "Call back",
                icon: undefined,
                variant: "edit",
                onClick: () => console.log("Call back clicked"),
              },
            }}
          />

          {/* Call Notes Card */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
                Call Notes
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsEditingNotes(true)}
                sx={{
                  bgcolor: "#0d9488",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "13px",
                  px: 2,
                  py: 0.75,
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#0f766e", boxShadow: "none" },
                }}
              >
                Add notes
              </Button>
            </Box>

            <TextField
              multiline
              rows={5}
              fullWidth
              value={callNotes}
              onChange={(e) => setCallNotes(e.target.value)}
              placeholder="Add notes about the call, symptoms discussed, recommendations given"
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "14px",
                  color: "#374151",
                  borderRadius: 2,
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "#9ca3af" }}>
                <Clock sx={{ fontSize: 15 }} />
                <Typography variant="caption" sx={{ fontSize: "13px" }}>
                  Auto-save enabled
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => setIsEditingNotes(false)}
                sx={{
                  bgcolor: "#0d9488",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "14px",
                  px: 2.5,
                  py: 0.75,
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#0f766e", boxShadow: "none" },
                }}
              >
                Save Notes
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Right Column */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <CallHistoryPanel items={callHistory} />
          <StatusPanel
            status={callData.status}
            callBackDate={callData.callBackDate}
            calledBy={callData.calledBy}
          />
        </Box>
      </Box>
    </Box>
  );
};