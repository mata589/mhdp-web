// File: src/pages/shared/CallReviewScreen/CallReviewScreen.tsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slider,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Alert,
  ListItemIcon,
  Tooltip
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeDown,
  Download,
  Share,
  Comment,
  ThumbUp,
  ThumbDown,
  Flag,
  Bookmark,
  Speed,
  SkipNext,
  SkipPrevious,
  Stop,
  Edit,
  Save,
  Print,
  Email,
  Star,
  Warning,
  CheckCircle,
  Cancel,
  Person,
  Phone,
  AccessTime,
  Assignment
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export const CallReviewScreen: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [commentDialog, setCommentDialog] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [callRating, setCallRating] = useState(4);
  const [qualityScore, setQualityScore] = useState(85);

  const callData = {
    id: 'CALL-2024-001',
    caller: 'John Doe',
    phone: '+256 700 123 456',
    agent: 'James Gipir',
    supervisor: 'Sarah Mukasa',
    startTime: '2024-07-23 14:30:00',
    endTime: '2024-07-23 14:42:35',
    duration: '12:35',
    totalSeconds: 755,
    status: 'completed',
    outcome: 'resolved',
    category: 'Medical Consultation',
    priority: 'medium',
    rating: 4,
    sentiment: 'positive',
    recordingUrl: '/recordings/call-2024-001.mp3'
  };

  const callNotes = [
    'Patient called regarding medication refill for hypertension medication',
    'Verified patient identity using date of birth and medical record number',
    'Checked current prescription status - last refill was 25 days ago',
    'Confirmed with pharmacy team - refill approved',
    'Provided patient with refill authorization number: RX-2024-7894',
    'Scheduled follow-up appointment for blood pressure monitoring',
    'Call concluded successfully with patient satisfaction'
  ];

  const callTranscript = [
    { speaker: 'Agent', time: '00:00', text: 'Good afternoon, this is James from Butabika Hospital. How can I help you today?' },
    { speaker: 'Caller', time: '00:05', text: 'Hello, I need to refill my blood pressure medication. I\'m running low.' },
    { speaker: 'Agent', time: '00:12', text: 'I\'d be happy to help you with that. Can I please verify your identity with your date of birth?' },
    { speaker: 'Caller', time: '00:18', text: 'Sure, it\'s March 15th, 1978.' },
    { speaker: 'Agent', time: '00:22', text: 'Thank you. And can you provide your medical record number?' },
    { speaker: 'Caller', time: '00:26', text: 'It\'s MR-456789.' },
    { speaker: 'Agent', time: '00:30', text: 'Perfect, thank you Mr. Doe. Let me check your prescription status.' },
    { speaker: 'Agent', time: '01:45', text: 'I can see your last refill was 25 days ago for Lisinopril 10mg. Let me coordinate with our pharmacy team.' },
    { speaker: 'Caller', time: '01:52', text: 'Thank you, I appreciate your help.' },
    { speaker: 'Agent', time: '03:20', text: 'Good news! Your refill has been approved. Your authorization number is RX-2024-7894.' },
    { speaker: 'Caller', time: '03:28', text: 'That\'s wonderful. Should I schedule a follow-up appointment?' },
    { speaker: 'Agent', time: '03:33', text: 'Yes, I\'d recommend scheduling a follow-up for blood pressure monitoring. Would you like me to arrange that?' },
    { speaker: 'Caller', time: '03:40', text: 'Yes, please.' },
    { speaker: 'Agent', time: '11:20', text: 'Your appointment is scheduled for August 5th at 10 AM. Is there anything else I can help you with today?' },
    { speaker: 'Caller', time: '11:28', text: 'No, that covers everything. Thank you so much for your help!' },
    { speaker: 'Agent', time: '11:33', text: 'You\'re very welcome! Have a great day, Mr. Doe.' }
  ];

  const comments = [
    {
      id: 1,
      author: 'Sarah Mukasa',
      role: 'Supervisor',
      time: '2024-07-23 15:30',
      comment: 'Excellent call handling. Agent followed proper verification procedures and provided clear information.',
      rating: 5
    },
    {
      id: 2,
      author: 'Dr. David Okello',
      role: 'Medical Director',
      time: '2024-07-23 16:15',
      comment: 'Good coordination with pharmacy team. Consider mentioning potential side effects for future calls.',
      rating: 4
    }
  ];

  const qualityMetrics = [
    { metric: 'Greeting & Introduction', score: 95, status: 'excellent' },
    { metric: 'Identity Verification', score: 100, status: 'excellent' },
    { metric: 'Active Listening', score: 88, status: 'good' },
    { metric: 'Problem Resolution', score: 92, status: 'excellent' },
    { metric: 'Communication Clarity', score: 85, status: 'good' },
    { metric: 'Call Closure', score: 90, status: 'excellent' },
    { metric: 'Professionalism', score: 95, status: 'excellent' },
    { metric: 'Follow-up Actions', score: 88, status: 'good' }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'escalated': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getQualityColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'primary';
      case 'needs-improvement': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimelineChange = (event: Event, newValue: number | number[]) => {
    setCurrentTime(newValue as number);
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleSpeedChange = (event: any) => {
    setPlaybackSpeed(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log('Adding comment:', newComment);
      setNewComment('');
      setCommentDialog(false);
    }
  };

  const handleBookmark = (time: number) => {
    console.log('Bookmarking at:', formatTime(time));
  };

  const handleFlag = () => {
    console.log('Flagging call for review');
  };

  const handleDownload = () => {
    console.log('Downloading call recording');
  };

  const handleShare = () => {
    console.log('Sharing call review');
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Call Review - {callData.id}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Print />}>
            Print
          </Button>
          <Button variant="outlined" startIcon={<Email />}>
            Email
          </Button>
          <Button variant="outlined" startIcon={<Share />} onClick={handleShare}>
            Share
          </Button>
          <Button variant="outlined" startIcon={<Download />} onClick={handleDownload}>
            Download
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Call Information */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Call Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Assignment />
                  </ListItemIcon>
                  <ListItemText primary="Call ID" secondary={callData.id} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="Caller" secondary={`${callData.caller} (${callData.phone})`} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Avatar sx={{ width: 24, height: 24 }}>
                      {callData.agent.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary="Agent" secondary={callData.agent} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="Supervisor" secondary={callData.supervisor} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Duration" 
                    secondary={`${callData.duration} (${new Date(callData.startTime).toLocaleString()})`} 
                  />
                </ListItem>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                <Chip 
                  label={callData.status} 
                  color={getStatusColor(callData.status)} 
                  size="small" 
                />
                <Chip 
                  label={callData.priority} 
                  color={getPriorityColor(callData.priority)} 
                  size="small" 
                />
                <Chip label={callData.category} size="small" />
                <Chip label={callData.outcome} color="success" size="small" />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Overall Rating
                </Typography>
                <Rating value={callRating} onChange={(e, newValue) => setCallRating(newValue || 0)} />
              </Box>
              
              <Box>
                <Typography variant="body2" gutterBottom>
                  Quality Score: {qualityScore}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={qualityScore} 
                  sx={{ height: 8, borderRadius: 4 }}
                  color={qualityScore >= 90 ? 'success' : qualityScore >= 70 ? 'warning' : 'error'}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ThumbUp />}
                    size="small"
                  >
                    Approve
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Flag />}
                    size="small"
                    onClick={handleFlag}
                  >
                    Flag
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Edit />}
                    size="small"
                    onClick={() => setEditMode(!editMode)}
                  >
                    Edit
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Save />}
                    size="small"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Audio Player */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Call Recording
              </Typography>
              
              {/* Audio Controls */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <IconButton onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}>
                  <SkipPrevious />
                </IconButton>
                <IconButton 
                  onClick={handlePlayPause}
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
                <IconButton onClick={() => setCurrentTime(Math.min(callData.totalSeconds, currentTime + 10))}>
                  <SkipNext />
                </IconButton>
                <IconButton>
                  <Stop />
                </IconButton>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                  <VolumeDown />
                  <Slider
                    value={volume}
                    onChange={handleVolumeChange}
                    sx={{ width: 100 }}
                    min={0}
                    max={100}
                  />
                  <VolumeUp />
                </Box>
                
                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <Select value={playbackSpeed} onChange={handleSpeedChange}>
                    <MenuItem value={0.5}>0.5x</MenuItem>
                    <MenuItem value={0.75}>0.75x</MenuItem>
                    <MenuItem value={1}>1x</MenuItem>
                    <MenuItem value={1.25}>1.25x</MenuItem>
                    <MenuItem value={1.5}>1.5x</MenuItem>
                    <MenuItem value={2}>2x</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              {/* Timeline */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption">{formatTime(currentTime)}</Typography>
                  <Typography variant="caption">{formatTime(callData.totalSeconds)}</Typography>
                </Box>
                <Slider
                  value={currentTime}
                  onChange={handleTimelineChange}
                  max={callData.totalSeconds}
                  sx={{ width: '100%' }}
                />
              </Box>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                Use playback controls to review specific sections. Click timestamps in transcript to jump to that moment.
              </Alert>
            </CardContent>
          </Card>

          {/* Tabbed Content */}
          <Card>
            <CardContent>
              <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
              >
                <Tab label="Transcript" />
                <Tab label="Call Notes" />
                <Tab label="Quality Metrics" />
                <Tab label="Comments" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" gutterBottom>
                  Call Transcript
                </Typography>
                <Paper sx={{ maxHeight: 500, overflow: 'auto', p: 2 }}>
                  {callTranscript.map((entry, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Chip 
                          label={entry.speaker} 
                          size="small" 
                          color={entry.speaker === 'Agent' ? 'primary' : 'default'}
                        />
                        <Typography 
                          variant="caption" 
                          sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' }}}
                          onClick={() => setCurrentTime(parseInt(entry.time.split(':')[0]) * 60 + parseInt(entry.time.split(':')[1]))}
                        >
                          {entry.time}
                        </Typography>
                        <Tooltip title="Bookmark this moment">
                          <IconButton 
                            size="small" 
                            onClick={() => handleBookmark(parseInt(entry.time.split(':')[0]) * 60 + parseInt(entry.time.split(':')[1]))}
                          >
                            <Bookmark />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Typography variant="body2" sx={{ pl: 2 }}>
                        {entry.text}
                      </Typography>
                      {index < callTranscript.length - 1 && <Divider sx={{ mt: 2 }} />}
                    </Box>
                  ))}
                </Paper>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Call Notes
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? 'Save' : 'Edit'}
                  </Button>
                </Box>
                {editMode ? (
                  <TextField
                    multiline
                    rows={12}
                    fullWidth
                    defaultValue={callNotes.join('\n')}
                    variant="outlined"
                  />
                ) : (
                  <List>
                    {callNotes.map((note, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemText primary={note} />
                        </ListItem>
                        {index < callNotes.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Quality Assessment
                </Typography>
                <Grid container spacing={2}>
                  {qualityMetrics.map((metric, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          {metric.metric}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <LinearProgress
                            variant="determinate"
                            value={metric.score}
                            sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                            color={getQualityColor(metric.status)}
                          />
                          <Typography variant="body2" sx={{ minWidth: 40 }}>
                            {metric.score}%
                          </Typography>
                        </Box>
                        <Chip 
                          label={metric.status} 
                          size="small" 
                          color={getQualityColor(metric.status)}
                          sx={{ mt: 1 }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                
                <Alert severity="success" sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    <strong>Overall Assessment:</strong> Excellent call handling with proper procedures followed. 
                    Agent demonstrated professionalism and effective problem resolution.
                  </Typography>
                </Alert>
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Comments & Feedback
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Comment />}
                    onClick={() => setCommentDialog(true)}
                  >
                    Add Comment
                  </Button>
                </Box>
                
                <List>
                  {comments.map((comment) => (
                    <React.Fragment key={comment.id}>
                      <ListItem alignItems="flex-start">
                        <Avatar sx={{ mr: 2 }}>
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography variant="subtitle2">
                                {comment.author}
                              </Typography>
                              <Chip label={comment.role} size="small" />
                              <Rating value={comment.rating} size="small" readOnly />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {comment.comment}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(comment.time).toLocaleString()}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Comment Dialog */}
      <Dialog open={commentDialog} onClose={() => setCommentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            placeholder="Enter your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              Rating
            </Typography>
            <Rating
              value={callRating}
              onChange={(e, newValue) => setCallRating(newValue || 0)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommentDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddComment}>
            Add Comment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};