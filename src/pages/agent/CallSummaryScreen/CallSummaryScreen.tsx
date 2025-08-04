// File: src/pages/agent/CallSummaryScreen/CallSummaryScreen.tsx
import React, { useState } from 'react';
import { GridLegacy as Grid } from '@mui/material';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import { Save, Print, Send } from '@mui/icons-material';

export const CallSummaryScreen: React.FC = () => {
  const [summary, setSummary] = useState('Patient called regarding medication refill request...');
  const [outcome, setOutcome] = useState('resolved');
  const [followUpRequired, setFollowUpRequired] = useState(false);
  const [callRating, setCallRating] = useState(4);

  const callDetails = {
    id: 'CALL-2024-001',
    caller: 'John Doe',
    phone: '+256 700 123 456',
    duration: '12:35',
    startTime: '14:30',
    endTime: '14:43',
    date: '2024-07-23',
    agent: 'James Gipir'
  };

  const handleSave = () => {
    console.log('Saving call summary...');
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Call Summary
      </Typography>

      <Grid container spacing={3}>
        {/* Call Details */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Call Details
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Call ID" secondary={callDetails.id} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Caller" secondary={callDetails.caller} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Phone" secondary={callDetails.phone} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Duration" secondary={callDetails.duration} />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Time" 
                    secondary={`${callDetails.startTime} - ${callDetails.endTime}`} 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Agent" secondary={callDetails.agent} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Call Metrics */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Call Metrics
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Call Quality Rating
                </Typography>
                <Rating
                  value={callRating}
                  onChange={(event, newValue) => setCallRating(newValue || 0)}
                  size="large"
                />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Sentiment Analysis
                </Typography>
                <Chip label="Neutral" color="default" />
              </Box>
              
              <Box>
                <Typography variant="body2" gutterBottom>
                  Call Outcome
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value)}
                  >
                    <MenuItem value="resolved">Resolved</MenuItem>
                    <MenuItem value="escalated">Escalated</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="callback">Callback Required</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Call Summary */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Call Summary
              </Typography>
              <TextField
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Enter detailed call summary..."
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Action Items */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Action Items & Follow-up
              </Typography>
              <TextField
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                placeholder="Enter action items and follow-up notes..."
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<Print />}
            >
              Print
            </Button>
            <Button
              variant="outlined"
              startIcon={<Send />}
            >
              Email Summary
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
            >
              Save Summary
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};