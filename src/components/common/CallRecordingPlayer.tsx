// src/components/common/CallRecordingPlayer/CallRecordingPlayer.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  VolumeUp as VolumeUpIcon,
} from '@mui/icons-material';
import type { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface CallRecordingPlayerProps {
  callId: string;
  duration?: string;
  recordingUrl?: string;
  isPopup?: boolean;
  onClose?: () => void;
  open?: boolean;
}

export const CallRecordingPlayer: React.FC<CallRecordingPlayerProps> = ({
  callId,
  duration = '2:34 / 12:34',
  recordingUrl,
  isPopup = false,
  onClose,
  open = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(20);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Integrate with actual audio player
    // For now, simulate progress
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 500);
    }
  };

  const handleDownload = () => {
    // TODO: Implement actual download functionality
    console.log('Download recording:', callId, recordingUrl);
    // You can use: window.open(recordingUrl, '_blank');
  };

  const PlayerContent = () => (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          onClick={handlePlayPause}
          sx={{
            bgcolor: '#0891b2',
            color: 'white',
            width: 40,
            height: 40,
            '&:hover': { bgcolor: '#0e7490' }
          }}
        >
          {isPlaying ? <PauseIcon sx={{ fontSize: 20 }} /> : <PlayArrowIcon sx={{ fontSize: 20 }} />}
        </IconButton>
        
        <Box sx={{ flex: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: '#e5e7eb',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#0891b2',
                borderRadius: 3
              }
            }}
          />
        </Box>
        
        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '14px', minWidth: 80 }}>
          {duration}
        </Typography>
        
        <IconButton 
          onClick={handleDownload}
          sx={{ color: '#6b7280' }}
        >
          <DownloadIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
    </Box>
  );

  // Render as popup dialog
  if (isPopup) {
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          pb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VolumeUpIcon sx={{ color: '#0891b2', fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
              Call Recording - {callId}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: '#6b7280',
              '&:hover': { bgcolor: '#f3f4f6' }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pb: 3 }}>
          <PlayerContent />
        </DialogContent>
      </Dialog>
    );
  }

  // Render as inline component (for detail pages)
  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827', mb: 2, fontSize: '16px' }}>
        Call Recording
      </Typography>
      <PlayerContent />
    </Paper>
  );
};