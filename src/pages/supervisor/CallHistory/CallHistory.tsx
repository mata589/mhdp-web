/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/agent/CallHistory/CallHistory.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ArrowBack as ArrowBackIcon,
  PlayArrow as PlayArrowIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { ActionButtonsGroup } from '../../../components/common/ActionButtonsGroup/ActionButtonsGroup';
import type { CallOutcome, RiskLevel } from '../../../components/common/CustomChip/CustomChip';
import CustomChip from '../../../components/common/CustomChip/CustomChip';
import AIAnalysisCard from '../../../components/common/AnalysisCard';
//import CustomChip, { RiskLevel, CallOutcome } from '../../../components/common/CustomChip/CustomChip';

// Map risk levels from string to RiskLevel type
const mapRiskLevel = (risk: string): RiskLevel => {
  switch (risk.toLowerCase()) {
    case 'high':
    case 'critical':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return 'Medium';
  }
};

// Map outcome to CallOutcome type
const mapOutcome = (outcome: string): CallOutcome => {
  switch (outcome) {
    case 'Advice Given':
      return 'Advice Given';
    case 'Escalated':
      return 'Escalated';
    case 'Referred':
      return 'Referred';
    default:
      return 'Advice Given';
  }
};

const mockCallHistory = [
  {
    id: '#2090',
    dateTime: 'Mon, July 13, 2025\n10:41 AM - 10:51 AM',
    callerID: '#2090\nEnglish',
    primaryTopic: 'Anxiety Management',
    riskLevel: 'medium',
    outcome: 'Advice Given',
    qualityScore: 78,
  },
  {
    id: '#2031',
    dateTime: 'Mon, July 13, 2025\n10:43 AM - 10:51 AM',
    callerID: '#2031\nEnglish',
    primaryTopic: 'Depression',
    riskLevel: 'high',
    outcome: 'Escalated',
    qualityScore: 81,
  },
  {
    id: '#2034',
    dateTime: 'Mon, July 13, 2025\n10:41 AM - 10:51 AM',
    callerID: '#2034\nLuganda',
    primaryTopic: 'Psychosis',
    riskLevel: 'low',
    outcome: 'Advice Given',
    qualityScore: 78,
  },
  {
    id: '#2031-2',
    dateTime: 'Mon, July 13, 2025\n10:41 AM - 10:51 AM',
    callerID: '#2031\nEnglish',
    primaryTopic: 'Anxiety Management',
    riskLevel: 'medium',
    outcome: 'Referred',
    qualityScore: 78,
  },
  {
    id: '#2063',
    dateTime: 'Mon, July 13, 2025\n10:41 AM - 10:51 AM',
    callerID: '#2063\nEnglish',
    primaryTopic: 'Anxiety Management',
    riskLevel: 'high',
    outcome: 'Advice Given',
    qualityScore: 78,
  },
  {
    id: '#2031-3',
    dateTime: 'Mon, July 13, 2025\n10:43 AM - 10:51 AM',
    callerID: '#2031\nEnglish',
    primaryTopic: 'Depression',
    riskLevel: 'low',
    outcome: 'Referred',
    qualityScore: 78,
  },
  {
    id: '#2012',
    dateTime: 'Mon, July 13, 2025\n10:43 AM - 10:51 AM',
    callerID: '#2012\nEnglish',
    primaryTopic: 'Psychosis',
    riskLevel: 'medium',
    outcome: 'Advice Given',
    qualityScore: 78,
  },
];

// Mock data for call details
// Mock data function - replace with API call
const getCallDetails = (callId: string) => {
  return {
    id: callId,
    callerType: "Patient",
    language: "English, Luganda",
    gender: "Female",
    frequencyOfCare: "Anxiety Disorder",
    trajectoryOfCare: "Already in care",
    riskLevel: "Critical",
    agent: "James Gipar",
    speakers: {
      caller: "54%",
      agent: "46%",
    },
    sentiment: {
      agent: { value: 80, label: "Positive", color: "#16a34a" },
      caller: { value: 69, label: "Neutral", color: "#d97706" },
      conversation: { value: 90, label: "Good", color: "#16a34a" },
    },
    technicalQuality: {
      network: { value: 3.8, max: 5 },
      audio: {
        value: 4.5,
        max: 5,
        note: "Clear audio except background noise",
      },
    },
    keywords: [
      "depression",
      "work",
      "stress",
      "medication",
      "family",
      "suicide",
      "anxiety",
    ],
    topics: ["Depression", "Anxiety management", "Psychosis"],
    outcome: {
      status: "Transferred",
      reason: "Peer Support Worker needed",
      escalatedTo: "Mary Nantongo",
      time: "Jul 13, 2025 | 10:43AM",
      note: "",
    },
    summary: `The caller discussed difficulties managing anxiety, including trouble sleeping and medication adherence side effects. They expressed concerns about missing doses occasionally.

The agent responded with empathy, provided guidance on coping strategies (e.g., breathing exercises), and clarified the importance of medication compliance. The caller was receptive, and no immediate risk was...`,
    callNotes: `Caller reported anxiety linked to family stress and poor sleep. Skips medication due to side effects. Advised on basic coping techniques and encouraged clinical follow-up. No immediate risk identified. Preferred language, Luganda and remained engaged throughout the call.`,
    transcription: [
      {
        speaker: "James Gipar",
        time: "0:01",
        text: "Hello, this is Dr. James from Butabika. How can I help you today?",
      },
      {
        speaker: "Caller #2031",
        time: "0:06",
        text: "Hi, I've been feeling very anxious lately and I'm not sure what to do about it. It's affecting my work and my relationships.",
      },
      {
        speaker: "James Gipar",
        time: "0:08",
        text: "I understand that anxiety can be very challenging. Can you tell me more about when these feelings started and what might be triggering them?",
      },
    ],
    recording: {
      duration: "0:45 / 2:18",
      isPlaying: false,
    },
    conversationQualityMetrics: [
      { name: "Rapport", value: 90, color: "#10b981" },
      { name: "Listening", value: 70, color: "#3b82f6" },
      { name: "Analyzing", value: 78, color: "#14b8a6" },
      { name: "Motivating", value: 36, color: "#f59e0b" },
    ],
  };
};

const getQualityScoreColor = (score: number) => {
  if (score >= 80) return '#16a34a';
  if (score >= 60) return '#d97706';
  return '#dc2626';
};

// Call Details Component
const CallDetails: React.FC<{ callId: string; onBack: () => void }> = ({ callId, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const callDetails = getCallDetails(callId);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  return (
     <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: "#f8fafc", minHeight: "100vh" }}>
         {/* Header */}
         <Box sx={{ mb: { xs: 2, sm: 3 } }}>
           <Box
             sx={{
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
               flexDirection: { xs: "column", sm: "row" },
               gap: { xs: 2, sm: 0 },
               mb: { xs: 2, sm: 0 },
             }}
           >
             <Box sx={{ display: "flex", alignItems: { xs: "flex-start", sm: "center" }, gap: 2 }}>
               <IconButton
                 onClick={onBack}
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
                     sx={{ fontWeight: 600, color: "#111827", fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                   >
                     Outgoing Call {callDetails.id}
                   </Typography>
                   <Chip
                     label="Transferred"
                     size="small"
                     sx={{
                       bgcolor: "#eff6ff",
                       color: "#2563eb",
                       border: "1px solid #bfdbfe",
                       fontWeight: 500,
                       fontSize: "12px",
                     }}
                   />
                 </Box>
                 <Typography
                   variant="body2"
                   sx={{ color: "#6b7280", fontSize: { xs: "13px", sm: "14px" }, fontWeight: 400 }}
                 >
                   Jul 13, 2025 | 10:43AM - 11:06AM
                 </Typography>
               </Box>
             </Box>
             <Button
               variant="contained"
               sx={{
                 bgcolor: "#dc2626",
                 color: "white",
                 borderRadius: 1,
                 textTransform: "none",
                 fontWeight: 500,
                 px: { xs: 3, sm: 2 },
                 justifySelf: "flex-end",
                 "&:hover": { bgcolor: "#b91c1c" },
               }}
             >
               Escalate call
             </Button>
           </Box>
         </Box>
   
         {/* Main Content */}
         <Box
           sx={{
             display: "flex",
             flexDirection: { xs: "column", md: "row" },
             gap: { xs: 2, md: 3 },
           }}
         >
           {/* Left Column */}
           <Box sx={{ flex: 1 }}>
             {/* Call Info Card */}
             <Paper
               sx={{
                 p: { xs: 2, sm: 3 },
                 mb: 3,
                 borderRadius: 2,
                 boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
               }}
             >
               <Box
                 sx={{
                   backgroundColor: "#eff6ff",
                   p: { xs: 2, sm: 3 },
                   borderRadius: 1,
                   mb: 3,
                 }}
               >
                 <Box
                   sx={{
                     display: "grid",
                     gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                     gap: { xs: 2, sm: 3 },
                   }}
                 >
                   <Box>
                     <Typography
                       variant="body2"
                       sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                     >
                       Caller ID
                     </Typography>
                     <Typography
                       variant="body2"
                       sx={{ color: "#111827", fontSize: { xs: "13px", sm: "14px" }, fontWeight: 500 }}
                     >
                       #{callDetails.id}
                     </Typography>
                   </Box>
                   <Box>
                     <Typography
                       variant="body2"
                       sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                     >
                       Caller Type
                     </Typography>
                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                       <CustomChip label="Patient" variant="caller" size="small" showDot={false} />
                     </Box>
                   </Box>
                   <Box>
                     <Typography
                       variant="body2"
                       sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                     >
                       Risk Level
                     </Typography>
                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                       <CustomChip label="Critical" variant="risk" size="small" showDot={true} />
                     </Box>
                   </Box>
                   <Box>
                     <Typography
                       variant="body2"
                       sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                     >
                       Language
                     </Typography>
                     <Typography
                       variant="body2"
                       sx={{ color: "#111827", fontSize: { xs: "13px", sm: "14px" }, fontWeight: 500 }}
                     >
                       {callDetails.language}
                     </Typography>
                   </Box>
                   <Box>
                     <Typography
                       variant="body2"
                       sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                     >
                       Caller Sex
                     </Typography>
                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                       <Typography
                         variant="body2"
                         sx={{
                           color: "#111827",
                           fontSize: { xs: "13px", sm: "14px" },
                           fontWeight: 500,
                         }}
                       >
                         Female
                       </Typography>
                     </Box>
                   </Box>
                   <Box>
                     <Typography
                       variant="body2"
                       sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                     >
                       Trajectory of care
                     </Typography>
                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                       <Typography
                         variant="body2"
                         sx={{
                           color: "#111827",
                           fontSize: { xs: "13px", sm: "14px" },
                           fontWeight: 500,
                         }}
                       >
                         {callDetails.trajectoryOfCare}
                       </Typography>
                     </Box>
                   </Box>
                 </Box>
                 <Box sx={{ mt: { xs: 2, sm: 2 } }}>
                   <Typography
                     variant="body2"
                     sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 1 }}
                   >
                     Speakers
                   </Typography>
                   <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                     <Chip
                       label={`Caller (${callDetails.speakers.caller})`}
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
                       label={`Agent (${callDetails.speakers.agent})`}
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
                 </Box>
               </Box>
             </Paper>
   
             {/* Call Summary */}
             <Paper
               sx={{
                 p: { xs: 2, sm: 3 },
                 mb: 3,
                 borderRadius: 2,
                 boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
               }}
             >
               <Typography
                 variant="h6"
                 sx={{
                   fontWeight: 600,
                   color: "#111827",
                   mb: 2,
                   fontSize: { xs: "15px", sm: "16px" },
                 }}
               >
                 Call Summary
               </Typography>
               <Typography
                 variant="body2"
                 sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" }, lineHeight: 1.6 }}
               >
                 {callDetails.summary}
               </Typography>
               <Button
                 variant="text"
                 sx={{
                   color: "#0891b2",
                   fontSize: { xs: "13px", sm: "14px" },
                   textTransform: "none",
                   p: 0,
                   mt: 1,
                   "&:hover": {
                     bgcolor: "transparent",
                     textDecoration: "underline",
                   },
                 }}
               >
                 View more
               </Button>
             </Paper>
   
             {/* Call Recording */}
             <Paper
               sx={{
                 p: { xs: 2, sm: 3 },
                 mb: 3,
                 borderRadius: 2,
                 boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
               }}
             >
               <Typography
                 variant="h6"
                 sx={{
                   fontWeight: 600,
                   color: "#111827",
                   mb: 2,
                   fontSize: { xs: "15px", sm: "16px" },
                 }}
               >
                 Call Recording
               </Typography>
               <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                 <IconButton
                   onClick={handlePlayPause}
                   sx={{
                     bgcolor: "#0891b2",
                     color: "white",
                     width: 32,
                     height: 32,
                     "&:hover": { bgcolor: "#0e7490" },
                   }}
                 >
                   <PlayArrowIcon sx={{ fontSize: 18 }} />
                 </IconButton>
                 <Box sx={{ flex: 1, minWidth: { xs: 200, sm: "auto" } }}>
                   <LinearProgress
                     variant="determinate"
                     value={20}
                     sx={{
                       height: 6,
                       borderRadius: 3,
                       bgcolor: "#e5e7eb",
                       "& .MuiLinearProgress-bar": {
                         bgcolor: "#0891b2",
                         borderRadius: 3,
                       },
                     }}
                   />
                 </Box>
                 <Typography
                   variant="body2"
                   sx={{ color: "#6b7280", fontSize: { xs: "13px", sm: "14px" }, mr: 1 }}
                 >
                   {callDetails.recording.duration}
                 </Typography>
                 <IconButton sx={{ color: "#6b7280" }}>
                   <DownloadIcon sx={{ fontSize: 18 }} />
                 </IconButton>
               </Box>
             </Paper>
   
             {/* Transcription */}
             <Paper
               sx={{
                 p: { xs: 2, sm: 3 },
                 mb: 3,
                 borderRadius: 2,
                 boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
               }}
             >
               <Typography
                 variant="h6"
                 sx={{
                   fontWeight: 600,
                   color: "#111827",
                   mb: 2,
                   fontSize: { xs: "15px", sm: "16px" },
                 }}
               >
                 Transcription
               </Typography>
               <Box sx={{ maxHeight: { xs: 250, sm: 300 }, overflowY: "auto" }}>
                 {callDetails.transcription.map((entry, index) => (
                   <Box key={index} sx={{ mb: 2 }}>
                     <Box
                       sx={{
                         display: "flex",
                         alignItems: "center",
                         gap: 1,
                         mb: 0.5,
                       }}
                     >
                       <Box
                         sx={{
                           width: 24,
                           height: 24,
                           borderRadius: "50%",
                           bgcolor: entry.speaker.includes("James") ? "#0891b2" : "#6b7280",
                           color: "white",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           fontSize: "12px",
                           fontWeight: 600,
                         }}
                       >
                         {entry.speaker.includes("James") ? "J" : "C"}
                       </Box>
                       <Typography
                         variant="body2"
                         sx={{
                           fontWeight: 500,
                           color: "#111827",
                           fontSize: { xs: "13px", sm: "14px" },
                         }}
                       >
                         {entry.speaker}
                       </Typography>
                       <Typography
                         variant="body2"
                         sx={{ color: "#6b7280", fontSize: "12px" }}
                       >
                         {entry.time}
                       </Typography>
                     </Box>
                     <Typography
                       variant="body2"
                       sx={{
                         color: "#374151",
                         fontSize: { xs: "13px", sm: "14px" },
                         ml: { xs: 2, sm: 4 },
                         lineHeight: 1.5,
                       }}
                     >
                       {entry.text}
                     </Typography>
                   </Box>
                 ))}
               </Box>
             </Paper>
   
             {/* Call Notes */}
             <Paper
               sx={{
                 p: { xs: 2, sm: 3 },
                 borderRadius: 2,
                 boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
               }}
             >
               <Typography
                 variant="h6"
                 sx={{
                   fontWeight: 600,
                   color: "#111827",
                   mb: 2,
                   fontSize: { xs: "15px", sm: "16px" },
                 }}
               >
                 Call Notes
               </Typography>
               <Typography
                 variant="body2"
                 sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" }, lineHeight: 1.6 }}
               >
                 {callDetails.callNotes}
               </Typography>
             </Paper>
           </Box>
   
           {/* Right Column */}
           <Box sx={{ width: { xs: "100%", md: 320 }, display: "flex", flexDirection: "column", gap: 3 }}>
             {/* Analysis Card */}
             <AIAnalysisCard callDetails={callDetails} />
   
             {/* Technical Quality */}
             <Paper
               sx={{
                 p: { xs: 2, sm: 3 },
                 borderRadius: 2,
                 boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
               }}
             >
               <Typography
                 variant="h6"
                 sx={{
                   fontWeight: 600,
                   color: "#111827",
                   mb: 3,
                   fontSize: { xs: "15px", sm: "16px" },
                 }}
               >
                 Technical Quality
               </Typography>
               <Box sx={{ mb: 3 }}>
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
                     sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" } }}
                   >
                     Network Quality
                   </Typography>
                   <Typography
                     variant="body2"
                     sx={{ fontWeight: 500, fontSize: { xs: "13px", sm: "14px" } }}
                   >
                     {callDetails.technicalQuality.network.value}/{callDetails.technicalQuality.network.max}
                   </Typography>
                 </Box>
                 <LinearProgress
                   variant="determinate"
                   value={
                     (callDetails.technicalQuality.network.value / callDetails.technicalQuality.network.max) * 100
                   }
                   sx={{
                     height: 6,
                     borderRadius: 3,
                     bgcolor: "#e5e7eb",
                     "& .MuiLinearProgress-bar": {
                       bgcolor: "#d97706",
                       borderRadius: 3,
                     },
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
                   <Typography
                     variant="body2"
                     sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" } }}
                   >
                     Audio Quality
                   </Typography>
                   <Typography
                     variant="body2"
                     sx={{ fontWeight: 500, fontSize: { xs: "13px", sm: "14px" } }}
                   >
                     {callDetails.technicalQuality.audio.value}/{callDetails.technicalQuality.audio.max}
                   </Typography>
                 </Box>
                 <LinearProgress
                   variant="determinate"
                   value={
                     (callDetails.technicalQuality.audio.value / callDetails.technicalQuality.audio.max) * 100
                   }
                   sx={{
                     height: 6,
                     borderRadius: 3,
                     bgcolor: "#e5e7eb",
                     "& .MuiLinearProgress-bar": {
                       bgcolor: "#16a34a",
                       borderRadius: 3,
                     },
                   }}
                 />
                 <Typography
                   variant="body2"
                   sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mt: 0.5 }}
                 >
                   {callDetails.technicalQuality.audio.note}
                 </Typography>
               </Box>
             </Paper>
   
             {/* Detected Keywords */}
             <Paper
               sx={{
                 p: { xs: 2, sm: 3 },
                 borderRadius: 2,
                 boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
               }}
             >
               <Typography
                 variant="h6"
                 sx={{
                   fontWeight: 600,
                   color: "#111827",
                   mb: 2,
                   fontSize: { xs: "15px", sm: "16px" },
                 }}
               >
                 Detected Keywords
               </Typography>
               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                 {callDetails.keywords.map((keyword, index) => (
                   <Chip
                     key={index}
                     label={keyword}
                     size="small"
                     sx={{
                       bgcolor: "#f3f4f6",
                       color: "#374151",
                       fontSize: "12px",
                       height: 24,
                     }}
                   />
                 ))}
               </Box>
             </Paper>
   
             {/* Topics Discussed */}
             <Paper
               sx={{
                 p: { xs: 2, sm: 3 },
                 borderRadius: 2,
                 boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
               }}
             >
               <Typography
                 variant="h6"
                 sx={{
                   fontWeight: 600,
                   color: "#111827",
                   mb: 2,
                   fontSize: { xs: "15px", sm: "16px" },
                 }}
               >
                 Topics Discussed
               </Typography>
               <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                 {callDetails.topics.map((topic, index) => (
                   <Box
                     key={index}
                     sx={{
                       bgcolor: "#f9fafb",
                       p: { xs: 1.5, sm: 1.5 },
                       borderRadius: 1,
                       border: "1px solid #e5e7eb",
                     }}
                   >
                     <Typography
                       variant="body2"
                       sx={{ color: "#374151", fontSize: { xs: "13px", sm: "14px" } }}
                     >
                       {topic}
                     </Typography>
                   </Box>
                 ))}
               </Box>
             </Paper>
   
             {/* Outcome */}
             <Paper
               sx={{
                 p: { xs: 2, sm: 3 },
                 borderRadius: 2,
                 boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
               }}
             >
               <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                 <Typography
                   variant="h6"
                   sx={{ fontWeight: 600, color: "#111827", fontSize: { xs: "15px", sm: "16px" } }}
                 >
                   Outcome
                 </Typography>
                 <Chip
                   label={callDetails.outcome.status}
                   size="small"
                   sx={{
                     bgcolor: "#eff6ff",
                     color: "#2563eb",
                     border: "1px solid #bfdbfe",
                     fontWeight: 500,
                     fontSize: "12px",
                   }}
                 />
               </Box>
               <Box sx={{ mb: 2 }}>
                 <Typography
                   variant="body2"
                   sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                 >
                   Date of Transfer
                 </Typography>
                 <Typography
                   variant="body2"
                   sx={{ color: "#111827", fontSize: { xs: "13px", sm: "14px" }, fontWeight: 500 }}
                 >
                   {callDetails.outcome.time}
                 </Typography>
               </Box>
               <Box sx={{ mb: 2 }}>
                 <Typography
                   variant="body2"
                   sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                 >
                   Reason of Transfer
                 </Typography>
                 <Typography
                   variant="body2"
                   sx={{ color: "#111827", fontSize: { xs: "13px", sm: "14px" }, fontWeight: 500 }}
                 >
                   {callDetails.outcome.reason}
                 </Typography>
               </Box>
               <Box>
                 <Typography
                   variant="body2"
                   sx={{ color: "#6b7280", fontSize: { xs: "11px", sm: "12px" }, mb: 0.5 }}
                 >
                   Transferred To
                 </Typography>
                 <Typography
                   variant="body2"
                   sx={{ color: "#111827", fontSize: { xs: "13px", sm: "14px" } }}
                 >
                   {callDetails.outcome.escalatedTo}
                 </Typography>
               </Box>
             </Paper>
           </Box>
         </Box>
       </Box>
  );
};

export const CallHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [languageFilter, setLanguageFilter] = useState('All languages');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const itemsPerPage = 10;
  // If a call is selected, show the call details page
  if (selectedCallId) {
    return (
      <CallDetails
        callId={selectedCallId}
        onBack={() => setSelectedCallId(null)}
      />
    );
  }
  const filteredCalls = mockCallHistory.filter(call => {
    const matchesSearch = call.callerID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.primaryTopic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  const totalPages = Math.ceil(filteredCalls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCalls = filteredCalls.slice(startIndex, startIndex + itemsPerPage);
  const handleViewCall = (callId: string) => {
    setSelectedCallId(callId);
  };
  const handlePlayCall = (callId: string) => {
    console.log('Play call:', callId);
    // Add your play functionality here
  };
  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          Call history
        </Typography>
      </Box>
      {/* Search and Filters */}
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        gap: { xs: 1, sm: 2 }, 
        alignItems: { xs: 'stretch', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        <TextField
          placeholder="Search by caller ID, agent or topic..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: 1,
            width: { xs: '100%', sm: 'auto' },
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              height: 40,
              fontSize: '14px',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: { xs: '100%', sm: 120 }, height: 40 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            sx={{
              bgcolor: 'white',
              height: 40,
              fontSize: '14px',
              '& .MuiSelect-select': {
                py: 1,
              },
            }}
          >
            <MenuItem value="All status">All status</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Escalated">Escalated</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: { xs: '100%', sm: 140 }, height: 40 }}>
          <Select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
            displayEmpty
            sx={{
              bgcolor: 'white',
              height: 40,
              fontSize: '14px',
              '& .MuiSelect-select': {
                py: 1,
              },
            }}
          >
            <MenuItem value="All languages">All languages</MenuItem>
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Luganda">Luganda</MenuItem>
          </Select>
        </FormControl>
        <Button
          startIcon={<FilterListIcon />}
          sx={{
            bgcolor: 'white',
            color: '#6b7280',
            border: '1px solid #d1d5db',
            height: 40,
            fontSize: '14px',
            textTransform: 'none',
            minWidth: { xs: '100%', sm: 'auto' },
            '&:hover': {
              bgcolor: '#f9fafb',
            },
          }}
        >
          More Filters
        </Button>
      </Box>
      {/* Call History Table */}
      <Paper sx={{ overflow: 'hidden', borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
        <TableContainer sx={{ 
          overflowX: { xs: 'auto', sm: 'visible' },
          borderRadius: 1,
          border: '1px solid #e5e7eb'
        }}>
          <Table sx={{ minWidth: { xs: 600, sm: 'auto' } }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f9fafb' }}>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  color: '#374151', 
                  fontSize: { xs: '0.75rem', sm: '14px' }, 
                  py: { xs: 1, sm: 2 },
                  whiteSpace: 'nowrap'
                }}>
                  Date/Time
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  color: '#374151', 
                  fontSize: { xs: '0.75rem', sm: '14px' }, 
                  py: { xs: 1, sm: 2 },
                  whiteSpace: 'nowrap'
                }}>
                  Caller
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  color: '#374151', 
                  fontSize: { xs: '0.75rem', sm: '14px' }, 
                  py: { xs: 1, sm: 2 },
                  whiteSpace: 'nowrap'
                }}>
                  Topic
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  color: '#374151', 
                  fontSize: { xs: '0.75rem', sm: '14px' }, 
                  py: { xs: 1, sm: 2 },
                  whiteSpace: 'nowrap'
                }}>
                  Risk
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  color: '#374151', 
                  fontSize: { xs: '0.75rem', sm: '14px' }, 
                  py: { xs: 1, sm: 2 },
                  whiteSpace: 'nowrap'
                }}>
                  Outcome
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  color: '#374151', 
                  fontSize: { xs: '0.75rem', sm: '14px' }, 
                  py: { xs: 1, sm: 2 },
                  whiteSpace: 'nowrap'
                }}>
                  Score
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 600, 
                  color: '#374151', 
                  fontSize: { xs: '0.75rem', sm: '14px' }, 
                  py: { xs: 1, sm: 2 },
                  whiteSpace: 'nowrap'
                }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedCalls.map((call) => {
                const scoreColor = getQualityScoreColor(call.qualityScore);
                return (
                  <TableRow
                    key={call.id}
                    sx={{
                      '&:hover': { bgcolor: '#f9fafb' },
                      borderBottom: '1px solid #f3f4f6',
                    }}
                  >
                    <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.8125rem', sm: '14px' },
                          color: '#111827',
                          whiteSpace: { xs: 'normal', sm: 'pre-line' },
                          lineHeight: 1.4
                        }}
                      >
                        {call.dateTime}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.8125rem', sm: '14px' },
                          color: '#111827',
                          whiteSpace: { xs: 'normal', sm: 'pre-line' },
                          lineHeight: 1.4
                        }}
                      >
                        {call.callerID}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: { xs: '0.8125rem', sm: '14px' }, 
                          color: '#111827',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }} 
                      >
                        {call.primaryTopic}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                      <CustomChip
                        label={mapRiskLevel(call.riskLevel)}
                        variant="risk"
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                      <CustomChip
                        label={mapOutcome(call.outcome)}
                        variant="outcome"
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ py: { xs: 1, sm: 2 }, textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, justifyContent: 'center' }}>
                        <Box
                          sx={{
                            width: { xs: 4, sm: 6 },
                            height: { xs: 4, sm: 6 },
                            borderRadius: '50%',
                            bgcolor: scoreColor,
                          }}
                        />
                        <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '14px' }, color: '#111827' }}>
                          {call.qualityScore}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: { xs: 1, sm: 2 }, textAlign: 'center' }}>
                      <ActionButtonsGroup
                        onPlay={() => handlePlayCall(call.id)}
                        onView={() => handleViewCall(call.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* Pagination */}
      <Box sx={{ 
        mt: 3, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.8125rem', sm: '14px' } }}>
          Page 1-{Math.min(itemsPerPage, filteredCalls.length)} of {filteredCalls.length} results
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'center', sm: 'flex-end' } }}>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            sx={{
              color: '#6b7280',
              fontSize: { xs: '0.75rem', sm: '14px' },
              textTransform: 'none',
              minWidth: { xs: '100%', sm: 'auto' },
              flex: { xs: 1, sm: 'unset' },
              '&:disabled': {
                color: '#d1d5db',
              },
            }}
          >
            ‹ Previous
          </Button>
          <Button
            component={Link}
            to="/supervisor/call-detail"
            sx={{
              color: '#6b7280',
              fontSize: { xs: '0.75rem', sm: '14px' },
              textTransform: 'none',
              minWidth: { xs: '100%', sm: 'auto' },
              flex: { xs: 1, sm: 'unset' },
              '&:disabled': {
                color: '#d1d5db',
              },
            }}
          >
            Next ›
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
