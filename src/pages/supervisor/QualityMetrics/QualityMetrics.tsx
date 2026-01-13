import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, Typography, Button, Tabs, Tab, Box, Skeleton } from '@mui/material';

import QualityMetricsPopup from '../SuperviserPopup/QualityMetricsPopup';
import AreasForImprovementDrawer from '../SuperviserPopup/AreasForImprovementDrawer';
import supervisorApi from '../../../services/api/supervisorApi';

import type {
  QualityOverview,
  ConversationQualityTrends,
  DialogueAnalysis,
  AgentConversationQuality,
  AreasForImprovement,
  NetworkAudioQualityTrends,
} from '../../../types/supervisor.types';

type Priority = 'high' | 'medium' | 'low';

/* ───────────── Skeletons ───────────── */
const MetricCardSkeleton = () => (
  <Card sx={{ padding: '20px 24px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '16px' }}>
      <Skeleton variant="rectangular" width={24} height={24} sx={{ borderRadius: '4px' }} />
      <Skeleton width="60%" height={20} />
    </Box>
    <Skeleton width="40%" height={40} sx={{ marginBottom: '8px', marginTop: '50px' }} />
    <Skeleton width="55%" height={16} sx={{ marginLeft: '160px' }} />
  </Card>
);

const ChartSkeleton = () => (
  <Box sx={{ padding: '24px' }}>
    <Skeleton variant="rectangular" height={280} sx={{ borderRadius: '4px' }} />
  </Box>
);

const ProgressBarSkeleton = () => (
  <Box sx={{ marginBottom: '24px' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <Skeleton width="30%" height={20} />
      <Skeleton width="15%" height={20} />
    </Box>
    <Skeleton variant="rectangular" height={10} sx={{ borderRadius: '10px' }} />
  </Box>
);

const AgentCardSkeleton = () => (
  <Box sx={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #f3f4f6' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
      <Skeleton variant="circular" width={32} height={32} />
      <Skeleton width="40%" height={20} />
    </Box>
    <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'space-between' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Box key={i} sx={{ textAlign: 'center', flex: '1' }}>
          <Skeleton width="100%" height={24} sx={{ marginBottom: '4px' }} />
          <Skeleton width="80%" height={16} sx={{ margin: '0 auto' }} />
        </Box>
      ))}
    </Box>
  </Box>
);

const ImprovementSkeleton = () => (
  <Box sx={{ padding: '16px 0', borderBottom: '1px solid #f3f4f6' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ flex: 1 }}>
        <Skeleton width="60%" height={20} sx={{ marginBottom: '4px' }} />
        <Skeleton width="40%" height={16} />
      </Box>
      <Skeleton width={100} height={24} sx={{ borderRadius: '12px' }} />
    </Box>
  </Box>
);

/* ───────────── Main Component ───────────── */
export default function QualityMetrics() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [overview, setOverview] = useState<QualityOverview | null>(null);
  const [convTrends, setConvTrends] = useState<ConversationQualityTrends | null>(null);
  const [dialogue, setDialogue] = useState<DialogueAnalysis | null>(null);
  const [agentsData, setAgentsData] = useState<AgentConversationQuality | null>(null);
  const [improvements, setImprovements] = useState<AreasForImprovement | null>(null);
  const [networkTrends, setNetworkTrends] = useState<NetworkAudioQualityTrends | null>(null);

  const [showQualityPopup, setShowQualityPopup] = useState(false);
  const [showImprovementDrawer, setShowImprovementDrawer] = useState(false);

  const tabs = [
    { label: 'Overview', url: '/supervisor/Analytics' },
    { label: 'Demographics', url: '/supervisor/Demographics' },
    { label: 'Topic Analysis', url: '/supervisor/TopicAnalysis' },
    { label: 'Quality Metrics', url: '/supervisor/QualityMetrics' },
  ];

  const currentTab = tabs.findIndex((t) => t.url === location.pathname);

  const handleTabChange = (_: React.SyntheticEvent, v: number) => {
    navigate(tabs[v].url);
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [
          overviewRes,
          convRes,
          dialogRes,
          agentsRes,
          improvementRes,
          networkRes,
        ] = await Promise.all([
          supervisorApi.getQualityOverview(),
          supervisorApi.getConversationQualityTrends(),
          supervisorApi.getDialogueAnalysis(),
          supervisorApi.getAgentConversationQuality(),
          supervisorApi.getAreasForImprovement(1, 10),
          supervisorApi.getNetworkAudioQualityTrends(),
        ]);

        setOverview(overviewRes);
        setConvTrends(convRes);
        setDialogue(dialogRes);
        setAgentsData(agentsRes);
        setImprovements(improvementRes);
        setNetworkTrends(networkRes);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const conversationChartData = useMemo(
    () =>
      convTrends?.data?.map((d) => ({
        month: d.month,
        score: Math.round(d.average_score),
      })) ?? [],
    [convTrends]
  );

  const networkAudioChartData = useMemo(
    () =>
      networkTrends?.trends?.map((d) => ({
        month: d.month,
        audio: Number(d.audio_quality?.toFixed(1)),
        network: Number(d.network_quality?.toFixed(1)),
      })) ?? [],
    [networkTrends]
  );

  const getPriorityColor = (priority: Priority): string => {
    switch(priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#666';
    }
  };

  if (error) {
    return (
      <Box sx={{ p: 6, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '24px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <Box sx={{ marginBottom: '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                sx={{
                  '& .MuiTabs-indicator': { backgroundColor: '#14b8a6', height: '3px' },
                  '& .MuiTab-root': {
                    padding: '3px 24px',
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'none',
                    color: '#6b7280',
                    minHeight: '64px',
                    '&.Mui-selected': { color: '#14b8a6' }
                  }
                }}
              >
                {tabs.map((tab, index) => (
                  <Tab key={index} label={tab.label} />
                ))}
              </Tabs>
              <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px 0' }}>
                <Typography sx={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>01/01/2025 - 04/09/2025</Typography>
                <Button
                  variant="contained"
                  startIcon={<Download style={{ width: '16px', height: '16px' }} />}
                  sx={{
                    backgroundColor: '#14b8a6',
                    color: 'white',
                    borderRadius: '6px',
                    padding: '10px 20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': { backgroundColor: '#0f9d8f', boxShadow: 'none' }
                  }}
                >
                  Export report
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Top Metrics Row */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
            {loading ? (
              <>
                <MetricCardSkeleton />
                <MetricCardSkeleton />
                <MetricCardSkeleton />
              </>
            ) : (
              <>
                {/* Avg Conversation Score */}
                <Card sx={{ padding: '20px 24px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '16px' }}>
                    <Box sx={{ 
                      width: '24px', 
                      height: '24px', 
                      backgroundColor: '#3b82f6', 
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img src="/star.png" alt="" style={{ width: '14px', height: '14px' }} />
                    </Box>
                    <Typography sx={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Avg. Conversation Score</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '32px', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: '8px', position: 'relative', top: '50px' }}>
                    {overview?.avg_conversation_score.value}%
                  </Typography>
                  <Typography sx={{ fontSize: '13px', color: '#10b981', fontWeight: 500, ml: 20 }}>
                    <span style={{ marginRight: '4px' }}>▲</span>+5% vs last month
                  </Typography>
                </Card>

                {/* Overall Network Quality */}
                <Card sx={{ padding: '20px 24px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Box sx={{ 
                      width: '24px', 
                      height: '24px', 
                      backgroundColor: '#f59e0b', 
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img src="/network.png" alt="" style={{ width: '14px', height: '14px' }} />
                    </Box>
                    <Typography sx={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Overall Network Quality</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '32px', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: '8px', position: 'relative', top: '50px' }}>
                    {overview?.network_quality.value}/5
                  </Typography>
                  <Typography sx={{ fontSize: '13px', color: '#ef4444', fontWeight: 500, ml: 20 }}>
                    <span style={{ marginRight: '4px' }}>▼</span>-5% vs yesterday
                  </Typography>
                </Card>

                {/* Overall Audio Quality */}
                <Card sx={{ padding: '20px 24px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Box sx={{ 
                      width: '24px', 
                      height: '24px', 
                      backgroundColor: '#14b8a6', 
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img src="/audio.png" alt="" style={{ width: '14px', height: '14px' }} />
                    </Box>
                    <Typography sx={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>Overall Audio Quality</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '32px', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: '8px', position: 'relative', top: '50px' }}>
                    {overview?.audio_quality.value}/5
                  </Typography>
                  <Typography sx={{ fontSize: '13px', color: '#10b981', fontWeight: 500, ml: 20 }}>
                    <span style={{ marginRight: '4px' }}>▲</span>+5% vs yest
                  </Typography>
                </Card>
              </>
            )}
          </Box>

          {/* Main Content Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {/* Conversation quality trends */}
            <Card sx={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
              <CardHeader
                title={<Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>a. Conversation quality trends</Typography>}
                sx={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }}
              />
              {loading ? (
                <ChartSkeleton />
              ) : (
                <CardContent sx={{ padding: '24px' }}>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={conversationChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: '12px', fill: '#9ca3af' }} 
                        axisLine={false} 
                        tickLine={false}
                        dy={10}
                      />
                      <YAxis 
                        tick={{ fontSize: '12px', fill: '#9ca3af' }} 
                        axisLine={false} 
                        tickLine={false}
                        domain={[0, 100]}
                        ticks={[0, 20, 40, 60, 80, 100]}
                        dx={-10}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          fontSize: '13px'
                        }}
                        labelStyle={{ color: '#111827', fontWeight: 600 }}
                        itemStyle={{ color: '#14b8a6' }}
                      />
                      <Line 
                        type="natural" 
                        dataKey="score" 
                        stroke="#14b8a6" 
                        strokeWidth={3} 
                        dot={false}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              )}
            </Card>

            {/* Avg. Dialogue Analysis */}
            <Card sx={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
              <CardHeader
                title={<Typography sx={{ fontSize: '18px', fontWeight: 900, color: '#111827' }}>b. Avg. Dialogue Analysis</Typography>}
                sx={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }}
              />
              <CardContent sx={{ padding: '24px' }}>
                {loading ? (
                  <>
                    <ProgressBarSkeleton />
                    <ProgressBarSkeleton />
                    <ProgressBarSkeleton />
                    <ProgressBarSkeleton />
                    <ProgressBarSkeleton />
                  </>
                ) : (
                  dialogue?.phases.map((item, index) => (
                    <Box key={index} sx={{ marginBottom: index < dialogue.phases.length - 1 ? '24px' : 0 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <Typography sx={{ fontSize: '14px', color: '#111827', fontWeight: 500 }}>{item.phase}</Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{item.percentage}%</Typography>
                      </Box>
                      <Box sx={{ width: '100%', height: '10px', backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
                        <Box sx={{ width: `${item.percentage}%`, height: '100%', backgroundColor: '#14b8a6', transition: 'width 0.3s', borderRadius: '10px' }} />
                      </Box>
                    </Box>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Agent conversation quality */}
            <Card sx={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6', bgcolor: '#F9F9F9' }}>
              <Box sx={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>c. Agent conversation quality</Typography>
                <Typography 
                  onClick={() => setShowQualityPopup(true)}
                  sx={{ 
                    fontSize: '13px', 
                    color: '#4682B4', 
                    textDecoration: 'none', 
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  View all
                </Typography>
              </Box>
              <CardContent sx={{ padding: '20px 24px' }}>
                {loading ? (
                  <>
                    <AgentCardSkeleton />
                    <AgentCardSkeleton />
                    <AgentCardSkeleton />
                  </>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Typography color="text.secondary">Agent performance preview</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Areas for improvement */}
            <Card sx={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
              <Box sx={{ 
                padding: '20px 24px', 
                borderBottom: '1px solid #f3f4f6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>d. Areas for improvement</Typography>
                <Typography 
                  onClick={() => setShowImprovementDrawer(true)}
                  sx={{ 
                    fontSize: '13px', 
                    color: '#4682B4', 
                    textDecoration: 'none', 
                    fontWeight: 500,
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  View all
                </Typography>
              </Box>
              <CardContent sx={{ padding: '24px', cursor: 'pointer' }}>
                {loading ? (
                  <>
                    <ImprovementSkeleton />
                    <ImprovementSkeleton />
                    <ImprovementSkeleton />
                  </>
                ) : improvements?.areas?.length ? (
                  improvements.areas.slice(0, 3).map((area, idx) => (
                    <Box key={idx} sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 0',
                      borderBottom: idx < 2 ? '1px solid #f3f4f6' : 'none'
                    }}>
                      <Box>
                        <Typography sx={{ fontSize: '14px', fontWeight: 200, color: '#111827' }}>{area.area_name}</Typography>
                        <Typography sx={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px', fontWeight: 400 }}>
                          {area.area_description}
                        </Typography>
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        borderRadius: '12px',
                        padding: '2px 8px',
                        color: getPriorityColor(area.priority as Priority),
                        backgroundColor: `${getPriorityColor(area.priority as Priority)}33`,
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: getPriorityColor(area.priority as Priority),
                          borderRadius: '50%',
                          display: 'inline-block'
                        }} />
                        <span style={{ textTransform: 'capitalize' }}>{area.priority} priority</span>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography align="center" color="text.secondary">
                    No improvement areas found
                  </Typography>
                )}
              </CardContent>
            </Card>

            {/* Network and audio quality trends - Full Width */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Card sx={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
                <Box sx={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>e. Network and audio quality trends</Typography>
                  <Box sx={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Box sx={{ width: '8px', height: '8px', backgroundColor: '#14b8a6', borderRadius: '50%' }} />
                      <Typography sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>Audio quality</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Box sx={{ width: '8px', height: '8px', backgroundColor: '#f59e0b', borderRadius: '50%' }} />
                      <Typography sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>Network quality</Typography>
                    </Box>
                  </Box>
                </Box>
                {loading ? (
                  <ChartSkeleton />
                ) : (
                  <CardContent sx={{ padding: '24px' }}>
                    <ResponsiveContainer width="100%" height={320}>
                      <LineChart data={networkAudioChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                        <XAxis dataKey="month" style={{ fontSize: '12px', fill: '#6b7280' }} axisLine={false} tickLine={false} />
                        <YAxis style={{ fontSize: '12px', fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[0, 5]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="audio" stroke="#14b8a6" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="network" stroke="#f59e0b" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                )}
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Popup Components */}
      {showQualityPopup && (
        <QualityMetricsPopup 
          open={showQualityPopup} 
          onClose={() => setShowQualityPopup(false)} 
        />
      )}

      {showImprovementDrawer && (
        <AreasForImprovementDrawer 
          open={showImprovementDrawer} 
          onClose={() => setShowImprovementDrawer(false)} 
        />
      )}
    </>
  );
}