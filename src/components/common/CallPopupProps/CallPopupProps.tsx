import React, { useState, useEffect } from "react";
import { Box, Button, Avatar, Typography, IconButton } from "@mui/material";
import { 
  Call, 
  CallEnd, 
  Phone, 
  Person, 
  Mic, 
  MicOff, 
  VolumeUp, 
  VolumeOff,
  Minimize 
} from "@mui/icons-material";

interface CallPopupProps {
  // Required props
  callId: string;
  phoneNumber: string;
  
  // Optional props
  callerName?: string;
  mode?: "incoming" | "outgoing" | "active";
  open?: boolean;
  duration?: number; // Duration in seconds for active/outgoing calls
  
  // Callbacks
  onAnswer?: () => void;
  onDecline?: () => void;
  onVoicemail?: () => void;
  onEndCall?: () => void;
  onMinimize?: () => void;
}

export const CallPopup: React.FC<CallPopupProps> = ({
  callId,
  phoneNumber,
  callerName,
  mode = "incoming",
  open = true,
  duration = 0,
  onAnswer,
  onDecline,
  onVoicemail,
  onEndCall,
  onMinimize,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callDuration, setCallDuration] = useState(duration);

  // Update duration from props
  useEffect(() => {
    setCallDuration(duration);
  }, [duration]);

  // Auto-increment timer for active/outgoing calls
  useEffect(() => {
    if ((mode === "active" || mode === "outgoing") && open) {
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, open]);

  if (!open) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusText = () => {
    switch (mode) {
      case "incoming":
        return "Incoming...";
      case "outgoing":
        return "Calling...";
      case "active":
        return "Active Call";
      default:
        return "Incoming...";
    }
  };

  const getStatusColor = () => {
    switch (mode) {
      case "incoming":
        return "#22c55e";
      case "outgoing":
        return "#ffa500";
      case "active":
        return "#22c55e";
      default:
        return "#22c55e";
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: { xs: 0, md: 120 },
        right: { xs: 0, md: 20 },
        left: { xs: 0, md: "auto" },
        bottom: { xs: 0, md: "auto" },
        width: { xs: "100vw", md: 360 },
        height: { xs: "100vh", md: mode === "active" ? 450 : 370 },
        maxWidth: { xs: "100vw", md: 360 },
        backgroundColor: "linear-gradient(to bottom, #CCE5E5, #F2FAFA)",
        background: "linear-gradient(to bottom, #CCE5E5, #F2FAFA)",
        borderRadius: { xs: 0, md: "18px" },
        p: 3,
        pt: { xs: 6, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: { xs: "none", md: "0 8px 32px rgba(0,0,0,0.2)" },
        zIndex: 1300,
      }}
    >
      {/* Minimize button for desktop on active calls */}
      {mode === "active" && onMinimize && (
        <IconButton
          onClick={onMinimize}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: { xs: "none", md: "flex" },
            color: "#5a6c7d",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.05)",
            },
          }}
        >
          <Minimize />
        </IconButton>
      )}
      {/* Content Section */}
      <Box sx={{ textAlign: "center", width: "100%", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Show timer for active/outgoing calls */}
        {(mode === "active" || mode === "outgoing") && (
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "#2c3e50",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "2rem" },
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatTime(callDuration)}
          </Typography>
        )}
        
        {mode === "incoming" && (
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#2c3e50",
              mb: 1,
              fontSize: { xs: "1.75rem", md: "1.5rem" },
            }}
          >
            Call #{callId}
          </Typography>
        )}
        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "center",
            mb: { xs: 4, md: 3 },
          }}
        >
          <Box
            sx={{
              width: { xs: 12, md: 10 },
              height: { xs: 12, md: 10 },
              backgroundColor: getStatusColor(),
              borderRadius: "50%",
              animation: mode === "outgoing" ? "pulse 1.5s infinite" : "none",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.5 },
              },
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "#5a6c7d",
              fontWeight: 500,
              fontSize: { xs: "1.125rem", md: "1rem" },
            }}
          >
            {getStatusText()}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mb: { xs: 4, md: 3 },
          }}
        >
          <Avatar
            sx={{
              backgroundColor: "#7fa8a3",
              color: "white",
              width: { xs: 80, md: 50 },
              height: { xs: 80, md: 50 },
            }}
          >
            <Person sx={{ fontSize: { xs: "2.5rem", md: "1.5rem" } }} />
          </Avatar>
          
          {callerName && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#2c3e50",
                fontSize: { xs: "1.25rem", md: "1.1rem" },
              }}
            >
              {callerName}
            </Typography>
          )}
          
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#2c3e50",
              fontSize: { xs: "1.5rem", md: "1.4rem" },
            }}
          >
            {phoneNumber}
          </Typography>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "100%",
          justifyContent: "center",
          px: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {mode === "incoming" && (
          <>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 3, md: 2 },
                width: "100%",
                justifyContent: "center",
                px: 1,
              }}
            >
              {onVoicemail && (
                <Button
                  onClick={onVoicemail}
                  sx={{
                    width: { xs: 80, md: 70 },
                    height: { xs: 80, md: 50 },
                    backgroundColor: "#e8eaed",
                    color: "#5f6368",
                    borderRadius: { xs: "40px", md: "25px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "unset",
                    "&:hover": {
                      backgroundColor: "#dadce0",
                    },
                  }}
                >
                  <Phone sx={{ fontSize: { xs: 32, md: 24 }, transform: "rotate(15deg)" }} />
                </Button>
              )}

              {onDecline && (
                <Button
                  onClick={onDecline}
                  sx={{
                    width: { xs: 80, md: 70 },
                    height: { xs: 80, md: 50 },
                    backgroundColor: "#ea4335",
                    color: "white",
                    borderRadius: { xs: "40px", md: "25px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "unset",
                    "&:hover": {
                      backgroundColor: "#d33b2c",
                    },
                  }}
                >
                  <CallEnd sx={{ fontSize: { xs: 32, md: 24 } }} />
                </Button>
              )}

              {onAnswer && (
                <Button
                  onClick={onAnswer}
                  sx={{
                    width: { xs: 80, md: 70 },
                    height: { xs: 80, md: 50 },
                    backgroundColor: "#34a853",
                    color: "white",
                    borderRadius: { xs: "40px", md: "25px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "unset",
                    "&:hover": {
                      backgroundColor: "#2d8f47",
                    },
                  }}
                >
                  <Call sx={{ fontSize: { xs: 32, md: 24 } }} />
                </Button>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: { xs: 3, md: 2 },
                width: "100%",
                justifyContent: "center",
                px: 1,
                mt: 1,
              }}
            >
              {onVoicemail && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "1rem", md: "0.85rem" },
                    color: "#2c3e50",
                    width: { xs: 80, md: 70 },
                    textAlign: "center",
                  }}
                >
                  Voicemail
                </Typography>
              )}
              {onDecline && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "1rem", md: "0.85rem" },
                    color: "#2c3e50",
                    width: { xs: 80, md: 70 },
                    textAlign: "center",
                  }}
                >
                  Decline
                </Typography>
              )}
              {onAnswer && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "1rem", md: "0.85rem" },
                    color: "#2c3e50",
                    width: { xs: 80, md: 70 },
                    textAlign: "center",
                  }}
                >
                  Answer
                </Typography>
              )}
            </Box>
          </>
        )}

        {(mode === "outgoing" || mode === "active") && onEndCall && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: { xs: 3, md: 2 },
            }}
          >
            {/* Call controls for active calls */}
            {mode === "active" && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 2,
                }}
              >
                <IconButton
                  onClick={() => setIsMuted(!isMuted)}
                  sx={{
                    width: { xs: 60, md: 56 },
                    height: { xs: 60, md: 56 },
                    backgroundColor: isMuted ? "#f44336" : "#FFFFFF",
                    color: isMuted ? "white" : "#5f6368",
                    border: "1px solid #e0e0e0",
                    "&:hover": {
                      backgroundColor: isMuted ? "#d33b2c" : "#f5f5f5",
                    },
                  }}
                >
                  {isMuted ? <MicOff /> : <Mic />}
                </IconButton>
                <IconButton
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  sx={{
                    width: { xs: 60, md: 56 },
                    height: { xs: 60, md: 56 },
                    backgroundColor: isSpeakerOn ? "#34a853" : "#FFFFFF",
                    color: isSpeakerOn ? "white" : "#5f6368",
                    border: "1px solid #e0e0e0",
                    "&:hover": {
                      backgroundColor: isSpeakerOn ? "#2d8f47" : "#f5f5f5",
                    },
                  }}
                >
                  {isSpeakerOn ? <VolumeUp /> : <VolumeOff />}
                </IconButton>
              </Box>
            )}
            
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                onClick={onEndCall}
                sx={{
                  width: { xs: 80, md: 70 },
                  height: { xs: 80, md: 70 },
                  backgroundColor: "#ea4335",
                  color: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "unset",
                  "&:hover": {
                    backgroundColor: "#d33b2c",
                  },
                }}
              >
                <CallEnd sx={{ fontSize: { xs: 32, md: 28 } }} />
              </Button>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "1rem", md: "0.85rem" },
                  color: "#2c3e50",
                  textAlign: "center",
                }}
              >
                End Call
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};