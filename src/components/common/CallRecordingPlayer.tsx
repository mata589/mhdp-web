// src/components/common/CallRecordingPlayer/CallRecordingPlayer.tsx
import React, { useState, useRef, useEffect } from 'react';
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
  Alert,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  VolumeUp as VolumeUpIcon,
} from '@mui/icons-material';
import type { TransitionProps } from '@mui/material/transitions';
import agentApi from '../../services/api/agentApi';
import supervisorApi from '../../services/api/supervisorApi';


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
  /** Set to true when called from supervisor context (EscalationsTab, etc.) */
  isSupervisor?: boolean;
}

export const CallRecordingPlayer: React.FC<CallRecordingPlayerProps> = ({
  callId,
  duration = '0:00',
  recordingUrl,
  isPopup = false,
  onClose,
  open = false,
  isSupervisor = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Download audio file when component opens
  useEffect(() => {
    if (open && !audioBlob) {
      console.log('[CallRecordingPlayer] Component opened, initiating download...', {
        callId,
        isSupervisor
      });
      downloadAudio();
    }
    
    // Reset state when dialog closes
    if (!open && audioBlob) {
      console.log('[CallRecordingPlayer] Component closed, cleaning up...');
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      }
    }
  }, [open, callId]);

  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioBlob) {
        URL.revokeObjectURL(URL.createObjectURL(audioBlob));
      }
    };
  }, [audioBlob]);

  const downloadAudio = async () => {
    if (!callId) {
      console.error('[CallRecordingPlayer] No call ID provided');
      setError('No call ID provided');
      return;
    }

    console.log('[CallRecordingPlayer] Starting download for callId:', callId);
    setIsLoading(true);
    setError(null);

    try {
      // Use the appropriate API based on context
      console.log(`[CallRecordingPlayer] Calling ${isSupervisor ? 'supervisorApi' : 'agentApi'}.downloadCallRecording...`);
      const blob = isSupervisor 
        ? await supervisorApi.downloadCallRecording(callId)
        : await agentApi.downloadCallRecording(callId);
      
      console.log('[CallRecordingPlayer] Audio blob received:', {
        size: blob.size,
        type: blob.type,
        sizeInMB: (blob.size / (1024 * 1024)).toFixed(2) + ' MB'
      });

      setAudioBlob(blob);

      // Create audio element
      const audioUrl = URL.createObjectURL(blob);
      console.log('[CallRecordingPlayer] Created audio URL:', audioUrl);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Set up audio event listeners
      audio.addEventListener('loadedmetadata', () => {
        console.log('[CallRecordingPlayer] Audio metadata loaded:', {
          duration: audio.duration,
          readyState: audio.readyState,
          networkState: audio.networkState
        });
        setTotalDuration(audio.duration);
        setIsLoading(false);
        
        // Auto-play after loading
        console.log('[CallRecordingPlayer] Auto-playing audio...');
        audio.play()
          .then(() => {
            console.log('[CallRecordingPlayer] Auto-play started successfully');
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error('[CallRecordingPlayer] Auto-play failed:', err);
            // Auto-play might be blocked by browser, just log it
            setIsPlaying(false);
          });
      });

      audio.addEventListener('play', () => {
        console.log('[CallRecordingPlayer] Audio play event fired');
        setIsPlaying(true);
      });

      audio.addEventListener('pause', () => {
        console.log('[CallRecordingPlayer] Audio pause event fired');
        setIsPlaying(false);
      });

      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      });

      audio.addEventListener('ended', () => {
        console.log('[CallRecordingPlayer] Audio playback ended');
        setIsPlaying(false);
        setProgress(100);
        // Reset to beginning when ended
        audio.currentTime = 0;
        setCurrentTime(0);
        setProgress(0);
      });

      audio.addEventListener('error', (e) => {
        console.error('[CallRecordingPlayer] Audio error:', {
          error: e,
          errorCode: audio.error?.code,
          errorMessage: audio.error?.message
        });
        setError('Failed to load audio file');
        setIsLoading(false);
        setIsPlaying(false);
      });

      audio.addEventListener('canplay', () => {
        console.log('[CallRecordingPlayer] Audio can play - ready for playback');
      });

    } catch (err) {
      console.error('[CallRecordingPlayer] Error downloading audio:', err);
      setError(err instanceof Error ? err.message : 'Failed to download audio');
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) {
      console.warn('[CallRecordingPlayer] No audio reference available');
      return;
    }

    const audio = audioRef.current;

    // Check if audio has ended, reset to beginning
    if (audio.ended || audio.currentTime >= audio.duration) {
      console.log('[CallRecordingPlayer] Audio ended, resetting to beginning');
      audio.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
    }

    if (isPlaying) {
      console.log('[CallRecordingPlayer] Pausing audio');
      audio.pause();
    } else {
      console.log('[CallRecordingPlayer] Playing audio from time:', audio.currentTime);
      audio.play()
        .then(() => {
          console.log('[CallRecordingPlayer] Audio playback started successfully');
        })
        .catch((err) => {
          console.error('[CallRecordingPlayer] Error playing audio:', err);
          setError('Failed to play audio');
          setIsPlaying(false);
        });
    }
  };

  const handleDownload = () => {
    if (!audioBlob) {
      console.warn('[CallRecordingPlayer] No audio blob available for download');
      setError('Audio not loaded yet');
      return;
    }

    try {
      console.log('[CallRecordingPlayer] Downloading audio file:', {
        callId,
        blobSize: audioBlob.size,
        blobType: audioBlob.type
      });
      
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `call-recording-${callId}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('[CallRecordingPlayer] Download initiated successfully');
    } catch (err) {
      console.error('[CallRecordingPlayer] Error downloading file:', err);
      setError('Failed to download file');
    }
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - bounds.left;
    const width = bounds.width;
    const percentage = clickX / width;
    const newTime = percentage * totalDuration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percentage * 100);
  };

  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const PlayerContent = () => (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {isLoading ? (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <VolumeUpIcon sx={{ color: '#0891b2', fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Loading audio recording...
            </Typography>
          </Box>
          <LinearProgress 
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
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={handlePlayPause}
            disabled={!audioBlob}
            sx={{
              bgcolor: '#0891b2',
              color: 'white',
              width: 40,
              height: 40,
              '&:hover': { bgcolor: '#0e7490' },
              '&:disabled': { 
                bgcolor: '#e5e7eb',
                color: '#9ca3af'
              }
            }}
          >
            {isPlaying ? <PauseIcon sx={{ fontSize: 20 }} /> : <PlayArrowIcon sx={{ fontSize: 20 }} />}
          </IconButton>
          
          <Box sx={{ flex: 1 }}>
            <Box
              onClick={handleProgressClick}
              sx={{ cursor: 'pointer' }}
            >
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
          </Box>
          
          <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '14px', minWidth: 80 }}>
            {formatTime(currentTime)} / {formatTime(totalDuration)}
          </Typography>
          
          <IconButton 
            onClick={handleDownload}
            disabled={!audioBlob}
            sx={{ 
              color: '#6b7280',
              '&:disabled': {
                color: '#d1d5db'
              }
            }}
          >
            <DownloadIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      )}
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