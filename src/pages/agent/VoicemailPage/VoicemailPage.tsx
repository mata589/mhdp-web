/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/agent/VoicemailPage/VoicemailPage.tsx
import React, { useState, useRef } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { GridLegacy as Grid } from "@mui/material";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  IconButton,
  Paper,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Phone as CallBackIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomChip from "../../../components/common/CustomChip/CustomChip";

interface VoicemailData {
  id: string;
  callerId: string;
  callerType: "Patient" | "Family" | "Professional";
  language: string;
  callerSex: "Male" | "Female";
  trajectoryOfCare: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  speakers: string;
  timestamp: string;
  status: "Unresolved" | "Resolved";
  summary: string;
  recording: {
    duration: string;
    audioUrl: string;
  };
  transcription: {
    speaker: string;
    timestamp: string;
    text: string;
  }[];
  analysis: {
    sentiment: number;
    sentimentLabel: string;
    networkQuality: number;
    audioQuality: number;
    audioQualityNote: string;
    detectedKeywords: string[];
    topicsDiscussed: string[];
  };
}

// Mock data - replace with actual API call
const mockVoicemailData: VoicemailData = {
  id: "2031",
  callerId: "#2031",
  callerType: "Patient",
  language: "English, Luganda",
  callerSex: "Female",
  trajectoryOfCare: "Already in care",
  riskLevel: "Critical",
  speakers: "Caller (54%) Agent (45%)",
  timestamp: "Jul 13, 2025 | 10:43 AM - 11:06 AM",
  status: "Unresolved",
  summary:
    "The caller has been having really dark thoughts lately and really needs someone to talk to. She is scared about what she might do and she really needs help.",
  recording: {
    duration: "0:45 / 2:18",
    audioUrl: "/mock-audio.mp3",
  },
  transcription: [
    {
      speaker: "Caller #2031",
      timestamp: "0:01",
      text: "Hello, my name is [name]. I've been having really dark thoughts lately and I don't know who to talk to. I called earlier but no one was available. I'm scared about what I might do. Please call me back as soon as possible. I really need help.",
    },
  ],
  analysis: {
    sentiment: 69,
    sentimentLabel: "Neutral",
    networkQuality: 3.8,
    audioQuality: 4.5,
    audioQualityNote: "Clear audio with minimal background noise",
    detectedKeywords: ["depression", "work", "stress", "medication", "family"],
    topicsDiscussed: ["Depression"],
  },
};

export const VoicemailPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  // In a real app, fetch voicemail data based on voicemailId
  const voicemailData = mockVoicemailData;

  const handleBack = () => {
    navigate("/agent/voicemail");
  };

  const handleCallBack = () => {
    // Implement call back functionality
    console.log("Calling back:", voicemailData.callerId);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log("Downloading recording");
  };

  const getSentimentChipSx = (label: string) => {
    let backgroundColor = "rgba(0, 0, 0, 0.1)";
    let borderColor = "#6b7280";
    let dotColor = "#6b7280";
    let color = "#374151";
    if (label === "Positive") {
      backgroundColor = "rgba(74, 222, 128, 0.1)";
      borderColor = "#22c55e";
      dotColor = "#22c55e";
      color = "#15803d";
    } else if (label === "Neutral") {
      backgroundColor = "rgba(251, 191, 36, 0.1)";
      borderColor = "#f59e0b";
      dotColor = "#f59e0b";
      color = "#d97706";
    } else if (label === "Negative") {
      backgroundColor = "rgba(239, 68, 68, 0.1)";
      borderColor = "#ef4444";
      dotColor = "#ef4444";
      color = "#dc2626";
    }
    return {
      backgroundColor,
      color,
      border: `2px solid ${borderColor}`,
      fontWeight: 700,
      fontSize: "0.75rem",
      height: 24,
      "& .MuiChip-label": {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        px: 1.5,
        "&::before": {
          content: '""',
          width: "8px",
          height: "8px",
          backgroundColor: dotColor,
          borderRadius: "50%",
        },
      },
    };
  };

  const getStatusColor = (status: string) => {
    return status === "Resolved" ? "#059669" : "#dc2626";
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: "1200px", mx: "auto" }}>
      <Grid container spacing={3}>
        {/* Left Column - Main Content */}
        <Grid item xs={12} md={8}>
          {/* Caller Information */}
          <Paper
            sx={{
              p: { xs: 2, md: 3 },
              mb: 3,
              borderRadius: 4,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "stretch", md: "flex-start" },
                justifyContent: "space-between",
                mb: 3,
                gap: { xs: 2, md: 0 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton
                  onClick={handleBack}
                  sx={{
                    color: "#6b7280",
                    "&:hover": { bgcolor: "#f3f4f6" },
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 600, color: "#111827" }}
                    >
                      Outgoing Call {voicemailData.callerId}
                    </Typography>
                    <Chip
                      label={voicemailData.status}
                      sx={{
                        bgcolor: getStatusColor(voicemailData.status),
                        color: "white",
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: "14px", fontWeight: 400 }}
                  >
                    {voicemailData.timestamp}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<CallBackIcon />}
                onClick={handleCallBack}
                sx={{
                  alignSelf: { xs: "stretch", md: "auto" },
                  width: { xs: "100%", md: "auto" },
                  bgcolor: "#0d9488",
                  "&:hover": { bgcolor: "#0f766e" },
                }}
              >
                Call back
              </Button>
            </Box>
            <Box sx={{ backgroundColor: "#eff6ff", p: { xs: 2, md: 3 }, borderRadius: 1, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: "12px", mb: 0.5 }}
                  >
                    Caller ID
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#111827", fontSize: "14px", fontWeight: 500 }}
                  >
                    {voicemailData.callerId}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: "12px", mb: 0.5 }}
                  >
                    Caller Type
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CustomChip label="Patient" variant="caller" size="small" showDot={false} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: "12px", mb: 0.5 }}
                  >
                    Risk Level
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CustomChip
                      label="Critical"
                      variant="risk"
                      size="small"
                      showDot={true}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: "12px", mb: 0.5 }}
                  >
                    Language
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#111827", fontSize: "14px", fontWeight: 500 }}
                  >
                    {voicemailData.language}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: "12px", mb: 0.5 }}
                  >
                    Caller Sex
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#111827",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {voicemailData.callerSex}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: "12px", mb: 0.5 }}
                  >
                    Trajectory of care
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#111827",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {voicemailData.trajectoryOfCare}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6b7280", fontSize: "12px", mb: 0.5 }}
                  >
                    Speakers
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Chip
                      label="Caller (54%)"
                      size="small"
                      sx={{
                        bgcolor: "#dbeafe",
                        color: "#1e40af",
                        border: "1px solid #bfdbfe",
                        fontWeight: 500,
                        fontSize: "12px",
                      }}
                    />
                    <Chip
                      label="Agent (45%)"
                      size="small"
                      sx={{
                        bgcolor: "#dbeafe",
                        color: "#1e40af",
                        border: "1px solid #bfdbfe",
                        fontWeight: 500,
                        fontSize: "12px",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          {/* Call Summary */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Call Summary
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {voicemailData.summary}
              </Typography>
            </CardContent>
          </Card>
          {/* Call Recording */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Call Recording
                </Typography>
                <IconButton onClick={handleDownload}>
                  <DownloadIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton
                  onClick={handlePlayPause}
                  sx={{
                    bgcolor: "#0d9488",
                    color: "white",
                    "&:hover": { bgcolor: "#0f766e" },
                  }}
                >
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </IconButton>
                <LinearProgress
                  variant="determinate"
                  value={30}
                  sx={{
                    flexGrow: 1,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: "#e5e7eb",
                    "& .MuiLinearProgress-bar": { bgcolor: "#0d9488" },
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {voicemailData.recording.duration}
                </Typography>
              </Box>
              <audio ref={audioRef} src={voicemailData.recording.audioUrl} />
            </CardContent>
          </Card>
          {/* Transcription */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Transcription
              </Typography>
              {voicemailData.transcription.map((entry, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        bgcolor: "#0d9488",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      C
                    </Box>
                    <Typography variant="body2" fontWeight={500}>
                      {entry.speaker}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      - {entry.timestamp}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: { xs: 7, md: 4 }, lineHeight: 1.6 }}>
                    {entry.text}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        {/* Right Column - Analysis */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: "sticky", top: 24 }}>
            {/* Analysis Header */}
            {/* Caller Sentiment */}
            <Paper sx={{ p: 2, mb: 2, borderRadius: 1 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 2, color: "#111827" }}
              >
                Analysis
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "14px" }}
                  >
                    Caller Sentiment
                  </Typography>
                  <Chip
                    label={voicemailData.analysis.sentimentLabel}
                    size="small"
                    sx={getSentimentChipSx(voicemailData.analysis.sentimentLabel)}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={voicemailData.analysis.sentiment}
                    sx={{
                      flexGrow: 1,
                      height: 6,
                      borderRadius: 3,
                      bgcolor: "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "#0d9488",
                        borderRadius: 3,
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ minWidth: 40, fontSize: "14px" }}
                  >
                    {voicemailData.analysis.sentiment}%
                  </Typography>
                </Box>
              </Box>
            </Paper>
            {/* Technical Quality */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="body1" fontWeight={600} gutterBottom>
                Technical Quality
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Network Quality
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {voicemailData.analysis.networkQuality}/5
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(voicemailData.analysis.networkQuality / 5) * 100}
                  sx={{
                    height: 4,
                    borderRadius: 2,
                    bgcolor: "#e5e7eb",
                    "& .MuiLinearProgress-bar": { bgcolor: "#f59e0b" },
                  }}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Audio Quality
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {voicemailData.analysis.audioQuality}/5
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(voicemailData.analysis.audioQuality / 5) * 100}
                  sx={{
                    height: 4,
                    borderRadius: 2,
                    bgcolor: "#e5e7eb",
                    "& .MuiLinearProgress-bar": { bgcolor: "#f59e0b" },
                  }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5, display: "block" }}
                >
                  {voicemailData.analysis.audioQualityNote}
                </Typography>
              </Box>
            </Paper>
            {/* Detected Keywords */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="body1" fontWeight={600} gutterBottom>
                Detected Keywords
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {voicemailData.analysis.detectedKeywords.map((keyword, index) => (
                  <Chip
                    key={index}
                    label={keyword}
                    size="small"
                    sx={{ bgcolor: "#f3f4f6", color: "#374151" }}
                  />
                ))}
              </Box>
            </Paper>
            {/* Topics Discussed */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="body1" fontWeight={600} gutterBottom>
                Topics Discussed
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {voicemailData.analysis.topicsDiscussed.map((topic, index) => (
                  <Chip
                    key={index}
                    label={topic}
                    size="small"
                    sx={{ bgcolor: "#f3f4f6", color: "#374151" }}
                  />
                ))}
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
