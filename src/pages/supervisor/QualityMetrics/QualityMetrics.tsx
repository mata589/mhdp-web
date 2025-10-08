import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Add these imports
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, Typography, Button, Tabs, Tab, Box } from '@mui/material';

// Import the popup components
import QualityMetricsPopup from '../SuperviserPopup/QualityMetricsPopup';
import AreasForImprovementDrawer from '../SuperviserPopup/AreasForImprovementDrawer';

type Priority = 'high' | 'medium' | 'low';

interface ImprovementArea {
  text: string;
  subtext: string;
  priority: Priority;
}

const conversationTrendData = [
  { month: 'Jan', score: 16 },
  { month: 'Feb', score: 18 },
  { month: 'Mar', score: 18},
  { month: 'Apr', score: 19 },
  { month: 'May', score: 80 },
  { month: 'Jun', score: 40 },
  { month: 'Jul', score: 40 },
  { month: 'Aug', score: 14 },
  { month: 'Sep', score: 36 },
  { month: 'Oct', score: 19 },
  { month: 'Nov', score: 10 },
  { month: 'Dec', score: 0 }
];

const networkQualityData = [
  { month: 'Jan', audio: 50, network: 75 },
  { month: 'Feb', audio: 40, network: 40 },
  { month: 'Mar', audio: 45, network: 30 },
  { month: 'Apr', audio: 50, network: 20},
  { month: 'May', audio: 40, network: 50 },
  { month: 'Jun', audio: 55, network: 65 },
  { month: 'Jul', audio: 50, network: 60 },
  { month: 'Aug', audio: 48, network: 80 },
  { month: 'Sep', audio: 45, network: 25 },
  { month: 'Oct', audio: 90, network: 15 },
  { month: 'Nov', audio: 60, network: 90 },
  { month: 'Dec', audio: 50, network: 30 }
];

const dialogueData = [
  { label: 'Rapport', value: 9, color: '#D32F2F' },
  { label: 'Listening', value: 36, color: '#FFA500' },
  { label: 'Analyzing', value: 45, color: '#4682B4' },
  { label: 'Mirroring', value: 63, color: '#339999' },
  { label: 'Linking', value: 87, color: '#237F4C' }
];

const improvementAreas: ImprovementArea[] = [
  { text: 'Empathy and understanding', subtext: '8 agents need improvement', priority: 'high' },
  { text: 'Active listening skills', subtext: '10 agents need improvement', priority: 'high' },
  { text: 'Non-Judgemental conversations', subtext: '7 agents need improvement', priority: 'high' },
  { text: 'Clarity in explanation', subtext: '4 agents need improvement', priority: 'medium' },
  { text: 'Supportive Closure', subtext: '18 agents need improvement', priority: 'low' }
];

const agentData = [
  {
    name: 'James Okyo',
    avatar: 'J',
    badge: ' 90%',
    metrics: [
      { label: 'Rapport', value: '90', change: '+2%', trend: 'up' },
      { label: 'listening', value: '87%', change: '+5%', trend: 'up' },
      { label: 'Analysis', value: '3m 45s', change: null, trend: null },
      { label: 'motivating', value: '245', change: null, trend: null },
      { label: 'Ending', value: '85%', change: null, trend: null }
    ]
  },
  {
    name: 'Sarah Mukasa',
    avatar: 'S',
    badge: null,
    metrics: [
      { label: 'Rapport', value: '85', change: null, trend: null },
      { label: 'listening', value: '82%', change: null, trend: null },
      { label: 'Analysis', value: '4m 12s', change: null, trend: null },
      { label: 'motivating', value: '198', change: null, trend: null },
      { label: 'Ending', value: '78%', change: null, trend: null }
    ]
  },
  {
    name: 'Betty Mirembe',
    avatar: 'B',
    badge: null,
    metrics: [
      { label: 'Rapport', value: '92', change: '+10%', trend: 'up' },
      { label: 'listening', value: '88%', change: null, trend: null },
      { label: 'Analysis', value: '3m 20s', change: null, trend: null },
      { label: 'motivating', value: '287', change: null, trend: null },
      { label: 'Ending', value: '90%', change: null, trend: null }
    ]
  }
];

export default function QualityMetrics() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [showQualityPopup, setShowQualityPopup] = useState(false);
  const [showImprovementDrawer, setShowImprovementDrawer] = useState(false);

  // Define tabs with URLs
  const tabs = [
    { label: 'Overview', url: '/supervisor/Analytics' },
    { label: 'Demographics', url: '/supervisor/Demographics' },
    { label: 'Topic Analysis', url: '/supervisor/TopicAnalysis' },
    { label: 'Quality Metrics', url: '/supervisor/QualityMetrics' },
  ];

  // Set the active tab based on current URL
  useEffect(() => {
    const currentPath = location.pathname;
    const tabIndex = tabs.findIndex(tab => tab.url === currentPath);
    if (tabIndex !== -1) {
      setSelectedTab(tabIndex);
    }
  }, [location.pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    navigate(tabs[newValue].url);
  };

  const getPriorityColor = (priority: Priority): string => {
    switch(priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#666';
    }
  };

  const getPriorityIcon = (priority: Priority) => {
    switch(priority) {
      case 'high': return <AlertCircle style={{ width: '14px', height: '14px' }} />;
      case 'medium': return <AlertTriangle style={{ width: '14px', height: '14px' }} />;
      case 'low': return <CheckCircle style={{ width: '14px', height: '14px' }} />;
      default: return null;
    }
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '24px', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <Box sx={{ marginBottom: '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', borderRadius: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
              <Tabs
                value={selectedTab}
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
      <Typography sx={{ fontSize: '32px', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: '8px',position: 'relative',top: '50px' }}>82%</Typography>
      <Typography sx={{ fontSize: '13px', color: '#10b981', fontWeight: 500 ,ml:20}}>
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
      <Typography sx={{ fontSize: '32px', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: '8px',position: 'relative',top: '50px' }}>3.8/5</Typography>
      <Typography sx={{ fontSize: '13px', color: '#ef4444', fontWeight: 500 ,ml:20}}>
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
      <Typography sx={{ fontSize: '32px', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: '8px',position: 'relative',top: '50px' }}>4.5/5 </Typography>
      <Typography sx={{ fontSize: '13px', color: '#10b981', fontWeight: 500 ,ml:20}}>
        <span style={{ marginRight: '4px' , }}>▲</span>+5% vs yest
      </Typography>
    </Card>
  </Box>

          {/* Main Content Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {/* Conversation quality trends */}
            <Card sx={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
              <CardHeader
                title={<Typography sx={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>a. Conversation quality trends</Typography>}
                sx={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }}
              />
            <CardContent sx={{ padding: '24px' }}>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={conversationTrendData}>
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
            </Card>

            {/* Avg. Dialogue Analysis */}
            <Card sx={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' }}>
              <CardHeader
                title={
                  <Box>
                    <Typography sx={{ fontSize: '18px', fontWeight: 900, color: '#111827' }}>b. Avg. Dialogue Analysis</Typography>
                    
                  </Box>
                }
                sx={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }}
              />
              <CardContent sx={{ padding: '24px' }}>
                {dialogueData.map((item, index) => (
                  <Box key={index} sx={{ marginBottom: index < dialogueData.length - 1 ? '24px' : 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <Typography sx={{ fontSize: '14px', color: '#111827', fontWeight: 500 }}>{item.label}</Typography>
                      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{item.value}%</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: '10px', backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
                      <Box sx={{ width: `${item.value}%`, height: '100%', backgroundColor: item.color, transition: 'width 0.3s', borderRadius: '10px' }} />
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* Agent conversation quality */}
            <Card sx={{ borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6',bgcolor:'#F9F9F9' }}>
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
                {agentData.map((agent, idx) => (
                  <Box key={idx} sx={{ marginBottom: idx < agentData.length - 1 ? '24px' : 0, paddingBottom: idx < agentData.length - 1 ? '24px' : 0, borderBottom: idx < agentData.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Box sx={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '50%', 
                          backgroundColor: idx === 0 ? '#CCE5E5' : idx === 1 ? '#FFE5B2' : '#DBE6F0', 
                          color: idx === 1 ? '#111827' : 'white', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontSize: '14px', 
                          fontWeight: 600 
                        }}>
                          {agent.avatar}
                        </Box>
                        <Typography sx={{ fontSize: '14px', fontWeight: 300, color: '#111827' }}>{agent.name}</Typography>
                      </Box>
                      {agent.badge && (
                        <Typography sx={{ fontSize: '12px', color: '#14b8a6', fontWeight: 600 }}>
                          {agent.badge}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: '16px', justifyContent: 'space-between' }}>
                      {agent.metrics.map((metric, midx) => (
                        <Box key={midx} sx={{ textAlign: 'center', flex: '1' }}>
                          <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#4682B4', marginBottom: '4px' }}>{metric.value}</Typography>
                          <Typography sx={{ fontSize: '11px', color: '#6b7280', fontWeight: 500 }}>{metric.label}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
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
              <CardContent 
              
              sx={{ padding: '24px', cursor: 'pointer' }}>
                {improvementAreas.slice(0, 5).map((area, idx) => (
                  <Box key={idx} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: idx < 2 ? '1px solid #f3f4f6' : 'none'
                  }}>
                    <Box>
                      <Typography sx={{ fontSize: '14px', fontWeight: 200, color: '#111827' }}>{area.text}</Typography>
                      <Typography sx={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px', fontWeight: 400 }}>{area.subtext}</Typography>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      borderRadius: '12px',
                      padding: '2px 8px',
                      color: getPriorityColor(area.priority),
                      backgroundColor: `${getPriorityColor(area.priority)}33`,
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: getPriorityColor(area.priority),
                        borderRadius: '50%',
                        display: 'inline-block'
                      }} />
                      <span style={{ textTransform: 'capitalize' }}>{area.priority} priority</span>
                    </Box>
                  </Box>
                ))}
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
                <CardContent sx={{ padding: '24px' }}>
                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={networkQualityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis dataKey="month" style={{ fontSize: '12px', fill: '#6b7280' }} axisLine={false} tickLine={false} />
                      <YAxis style={{ fontSize: '12px', fill: '#6b7280' }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="audio" stroke="#14b8a6" strokeWidth={3}  dot={false} />
                      <Line type="monotone" dataKey="network" stroke="#f59e0b" strokeWidth={3}  dot={false}  />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Popup Components - Rendered conditionally */}
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