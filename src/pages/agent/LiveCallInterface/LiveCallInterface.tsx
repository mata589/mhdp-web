/* eslint-disable @typescript-eslint/no-unused-vars */
// File: src/pages/agent/LiveCallInterface/LiveCallInterface.tsx
import React, { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import noactivecall from "../../../assets/images/noactivecall.png";
import { GridLegacy as Grid } from "@mui/material";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  TextField,

} from "@mui/material";
import {
  Phone,
  PhoneDisabled,
  Mic,
  VolumeUp,
  Pause,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

interface CallData {
  callerId: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  agentName: string;
  duration: number;
}

export const LiveCallInterface: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isCallActive, setIsCallActive] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [notes, setNotes] = useState("");
  const [callData] = useState<CallData>({
    callerId: "#2031",
    riskLevel: "Critical",
    agentName: "James Gipir",
    duration: 0,
  });

  useEffect(() => {
    if (isCallActive) {
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    setIsCallActive(false);
  };

  // No Active Call State
  if (!isCallActive) {
    return (
      <Box
        sx={{
          p: 3,
          minHeight: "100vh",
          backgroundColor: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center", maxWidth: 400 }}>
          <Box
            component="img"
            src={noactivecall}
            alt="Healthcare Providers"
            sx={{
              width: "100%",
              maxWidth: 300,
              height: "auto",
              objectFit: "contain",
            }}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, mb: 2, color: "#212121" }}
          >
            No active call
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            When a call comes through, you will be able to
            <br />
            answer incoming calls.
          </Typography>
        </Box>
      </Box>
    );
  }

  // Active Call State
  return (
    <Box
      sx={{
        p: isMobile ? 2 : 3,
        backgroundColor: "#fafafa",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={3}>
        {/* Left Column - Call Details and Notes */}
        <Grid item xs={12} lg={8}>
          {/* Call Header */}
          <Card
            sx={{
              mb: 3,
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#FFFFFF",
              border: "1px solid #DADADA",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Live Call Header with Back Arrow */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                <IconButton size="small" sx={{ p: 0, mr: 1 }}>
                  <ArrowBackIcon />
                </IconButton>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#f44336",
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Outgoing Call - {formatTime(callDuration)}
                  </Typography>
                </Box>
              </Box>

              {/* Call Details with Background */}
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "8px",
                  p: 2,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 3,
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      Caller ID
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "#333",
                      }}
                    >
                      {callData.callerId}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      Risk Level
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#f44336",
                        }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: "#f44336",
                          fontSize: "1rem",
                        }}
                      >
                        {callData.riskLevel}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      Agent
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "#333",
                      }}
                    >
                      {callData.agentName}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Call Controls */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <IconButton
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #e0e0e0",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <Mic />
                </IconButton>
                <IconButton
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #e0e0e0",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <VolumeUp />
                </IconButton>
                <IconButton
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #e0e0e0",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <Pause />
                </IconButton>
                <IconButton
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: "#f44336",
                    color: "white",
                    "&:hover": { backgroundColor: "#d32f2f" },
                  }}
                  onClick={handleEndCall}
                >
                  <PhoneDisabled />
                </IconButton>
              </Box>
            </CardContent>
          </Card>

          {/* Call Notes */}
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#FFFFFF",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Call Notes
              </Typography>
              <TextField
                multiline
                rows={4}
                placeholder="Add notes about the call, symptoms discussed, recommendations given"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  ○ Auto-save enabled
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#008080",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { backgroundColor: "#006666" },
                  }}
                >
                  Save Notes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Call Status */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#FFFFFF",
              position: { lg: "sticky" },
              top: { lg: 24 },
            }}
          >
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 3, color: "#333" }}
              >
                Call Status
              </Typography>
              <Box
                sx={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  backgroundColor: "#b2dfdb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Phone sx={{ color: "#00897b", fontSize: 48 }} />
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                Call in Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Analysis will be available post-call
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};