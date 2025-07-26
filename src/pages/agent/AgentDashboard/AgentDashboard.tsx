// src/pages/agent/AgentDashboard/AgentDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material'; 


import {
  Paper,
  Typography,
  Box,
  Button,
  Alert,
  Chip,
  
} from '@mui/material';
import {
  Call,
  CallEnd,
  Escalator,
  Assessment,
} from '@mui/icons-material';
import { MetricCard } from '../../../components/cards/MetricCard/MetricCard';
import { DataTable } from '../../../components/common/DataTable/DataTable';

import { useAuth } from '../../../contexts/AuthContext';

import { useCallData } from '../../../hooks/useCallData';

export const AgentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { metrics, escalatedCalls, isLoading } = useCallData();
  const [isOnCall, setIsOnCall] = useState(false);

  const escalatedCallColumns = [
    {
      id: 'dateTime',
      label: 'Time',
      format: (value: Date) => new Date(value).toLocaleTimeString(),
    },
    {
      id: 'duration',
      label: 'Duration',
      format: (value: number) => `${Math.floor(value / 60)}:${value % 60}`,
    },
    {
      id: 'aiInsights.escalationFlags',
      label: 'Reason',
      renderCell: (value: string[]) => (
        <Box>
          {value.map((flag, index) => (
            <Chip key={index} label={flag} size="small" color="error" sx={{ mr: 0.5 }} />
          ))}
        </Box>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Agent Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back, {user?.name}
      </Typography>

      {/* Call Status Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Call Status</Typography>
          <Box display="flex" gap={2}>
            <Button
              variant={isOnCall ? "outlined" : "contained"}
              color="primary"
              startIcon={<Call />}
              onClick={() => setIsOnCall(!isOnCall)}
            >
              {isOnCall ? 'End Call' : 'Take Call'}
            </Button>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<Escalator />}
              disabled={!isOnCall}
            >
              Escalate
            </Button>
          </Box>
        </Box>
        {isOnCall && (
          <Alert severity="info" sx={{ mt: 2 }}>
            You are currently on a call. Live transcription and sentiment analysis are active.
          </Alert>
        )}
      </Paper>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Calls Today"
            value={metrics?.totalCalls || 0}
            icon={<Call color="primary" />}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Calls Answered"
            value={metrics?.callsAnswered || 0}
            icon={<Assessment color="success" />}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Escalated"
            value={metrics?.callsEscalated || 0}
            icon={<Escalator color="warning" />}
            isLoading={isLoading}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg Duration"
            value={`${Math.floor((metrics?.averageDuration || 0) / 60)}:${(metrics?.averageDuration || 0) % 60}`}
            icon={<CallEnd color="info" />}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>

      {/* Escalated Calls Table */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DataTable
            title="Calls Requiring Review"
            columns={escalatedCallColumns}
            data={escalatedCalls || []}
            page={0}
            rowsPerPage={10}
            totalCount={escalatedCalls?.length || 0}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
            onRowClick={(call) => console.log('Open call review:', call)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};