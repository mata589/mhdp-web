// src/pages/agent/Analytics/Analytics.tsx
import React from 'react';
import { GridLegacy as Grid } from '@mui/material';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Tab,
  Tabs,
  LinearProgress,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  AccessTime as TimeIcon,
  Warning as WarningIcon,
  Star as StarIcon,
  FileDownload as FileDownloadIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';

const MetricCard: React.FC<{
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  period: string;
  icon: React.ReactNode;
  iconBg: string;
}> = ({ title, value, change, changeType, period, icon, iconBg }) => (
  <Card sx={{ 
    height: '100%', 
    borderRadius: '12px', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ 
          p: 1, 
          borderRadius: '8px', 
          bgcolor: iconBg,
          color: 'white',
          mr: 2
        }}>
          {icon}
        </Box>
        <Typography variant="body2" color="#6b7280" sx={{ fontSize: '0.875rem' }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h3" sx={{ mb: 1, fontWeight: 700, color: '#111827', fontSize: '2rem' }}>
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: changeType === 'positive' ? '#10b981' : '#ef4444',
            fontWeight: 600,
            fontSize: '0.75rem'
          }}
        >
          {change}
        </Typography>
        <Typography variant="body2" color="#6b7280" sx={{ fontSize: '0.75rem' }}>
          {period}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const QualityMetricCard: React.FC<{
  title: string;
  score: number;
  maxScore: number;
  color: string;
  description: string;
}> = ({ title, score, maxScore, color, description }) => (
  <Card sx={{ 
    height: '100%', 
    borderRadius: '12px', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  }}>
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#111827' }}>
        {title}
      </Typography>
      <Typography variant="body2" color="#6b7280" sx={{ mb: 2, fontSize: '0.875rem' }}>
        {description}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: color, mr: 1 }}>
          {score}%
        </Typography>
        <Typography variant="body2" color="#6b7280">
          / {maxScore}%
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={(score / maxScore) * 100} 
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: '#f3f4f6',
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
            borderRadius: 4,
          },
        }}
      />
    </CardContent>
  </Card>
);

const ImprovementArea: React.FC<{
  title: string;
  priority: 'High priority' | 'Medium priority';
}> = ({ title, priority }) => (
  <Box sx={{ 
    p: 3, 
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    mb: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <Typography variant="body1" sx={{ fontWeight: 500, color: '#111827' }}>
      {title}
    </Typography>
    <Chip 
      label={priority}
      size="small"
      sx={{
        bgcolor: priority === 'High priority' ? '#fef2f2' : '#fef3c7',
        color: priority === 'High priority' ? '#dc2626' : '#d97706',
        fontWeight: 500,
        fontSize: '0.75rem'
      }}
    />
  </Box>
);

const AgentCard: React.FC<{
  rank: number;
  name: string;
  avatar: string;
  callsHandled: number;
  score: number;
  critical: number;
}> = ({ rank, name, avatar, callsHandled, score, critical }) => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    p: 2, 
    borderRadius: '8px',
    border: rank === 1 ? '2px solid #fbbf24' : '1px solid #e5e7eb',
    bgcolor: rank === 1 ? '#fffbeb' : 'white',
    mb: 2
  }}>
    <Typography variant="h6" sx={{ 
      mr: 2, 
      fontWeight: 600, 
      color: '#374151',
      minWidth: '24px'
    }}>
      #{rank}
    </Typography>
    <Avatar sx={{ 
      mr: 2, 
      bgcolor: avatar === 'J' ? '#0d9488' : avatar === 'S' ? '#dc6a00' : '#7c3aed',
      width: 32,
      height: 32,
      fontSize: '0.875rem'
    }}>
      {avatar}
    </Avatar>
    <Box sx={{ flex: 1 }}>
      <Typography variant="body1" sx={{ fontWeight: 600, color: '#111827' }}>
        {name}
      </Typography>
      <Typography variant="body2" color="#6b7280" sx={{ fontSize: '0.75rem' }}>
        {callsHandled} calls handled
      </Typography>
    </Box>
    <Box sx={{ textAlign: 'right' }}>
      <Typography variant="body1" sx={{ 
        fontWeight: 600, 
        color: '#111827',
        mb: 0.5
      }}>
        {score}%
      </Typography>
      <Typography variant="body2" color="#6b7280" sx={{ fontSize: '0.75rem' }}>
        {critical} critical
      </Typography>
    </Box>
  </Box>
);

export const Analytics: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderOverviewTab = () => (
    <>
      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={2.4}>
          <MetricCard
            title="Total Calls"
            value="100"
            change="▲ +5%"
            changeType="positive"
            period="vs last month"
            icon={<PhoneIcon />}
            iconBg="#0d9488"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2.4}>
          <MetricCard
            title="Calls Today"
            value="156"
            change="▼ -1%"
            changeType="negative"
            period="vs yesterday"
            icon={<PhoneIcon />}
            iconBg="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2.4}>
          <MetricCard
            title="Escalated Calls"
            value="7"
            change="▼ -1%"
            changeType="negative"
            period="vs yesterday"
            icon={<WarningIcon />}
            iconBg="#ef4444"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2.4}>
          <MetricCard
            title="Avg Call Duration"
            value="13:11"
            change="▲ +5%"
            changeType="positive"
            period="vs yesterday"
            icon={<TimeIcon />}
            iconBg="#10b981"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2.4}>
          <MetricCard
            title="Avg. Conversation Score"
            value="82%"
            change="▲ +5%"
            changeType="positive"
            period="vs last month"
            icon={<StarIcon />}
            iconBg="#3b82f6"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid #f1f5f9',
            backgroundColor: '#ffffff'
          }}>
            <Typography variant="h5" sx={{ 
              mb: 1.5, 
              fontWeight: 600, 
              color: '#0f172a',
              fontSize: '1.25rem'
            }}>
              a. Call volume trends
            </Typography>
            <Typography variant="body1" sx={{ 
              mb: 4, 
              color: '#64748b',
              fontSize: '0.875rem'
            }}>
              Hourly call distribution
            </Typography>
            
            {/* Enhanced Chart Legend */}
            <Box sx={{ 
              display: 'flex', 
              gap: 4, 
              mb: 4,
              p: 2,
              backgroundColor: '#f8fafc',
              borderRadius: '8px'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ 
                  width: 14, 
                  height: 14, 
                  borderRadius: '50%', 
                  bgcolor: '#0d9488',
                  boxShadow: '0 2px 4px rgba(13, 148, 136, 0.3)'
                }} />
                <Typography variant="body2" sx={{ 
                  color: '#475569', 
                  fontWeight: 500,
                  fontSize: '0.875rem'
                }}>
                  Total calls
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ 
                  width: 14, 
                  height: 14, 
                  borderRadius: '50%', 
                  bgcolor: '#f59e0b',
                  boxShadow: '0 2px 4px rgba(245, 158, 11, 0.3)'
                }} />
                <Typography variant="body2" sx={{ 
                  color: '#475569', 
                  fontWeight: 500,
                  fontSize: '0.875rem'
                }}>
                  Escalated calls
                </Typography>
              </Box>
            </Box>

            {/* Enhanced Chart Representation */}
            <Box sx={{ 
              height: 320, 
              display: 'flex', 
              alignItems: 'end', 
              gap: 1.5,
              px: 3,
              py: 2,
              backgroundColor: '#fafbfc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              {[
                { total: 100, escalated: 10 },
                { total: 80, escalated: 15 },
                { total: 70, escalated: 8 },
                { total: 45, escalated: 5 },
                { total: 95, escalated: 12 },
                { total: 65, escalated: 8 },
                { total: 120, escalated: 18 },
                { total: 142, escalated: 24, highlighted: true },
                { total: 80, escalated: 15 },
                { total: 85, escalated: 12 },
                { total: 70, escalated: 8 }
              ].map((bar, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative'
                }}>
                  <Box sx={{ 
                    width: '100%',
                    maxWidth: '32px',
                    height: `${(bar.total / 142) * 260}px`,
                    bgcolor: '#0d9488',
                    borderRadius: '6px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 8px rgba(13, 148, 136, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 16px rgba(13, 148, 136, 0.3)'
                    }
                  }}>
                    <Box sx={{ 
                      width: '100%',
                      height: `${(bar.escalated / bar.total) * 100}%`,
                      bgcolor: '#f59e0b',
                      borderRadius: '6px 6px 0 0',
                      boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)'
                    }} />
                    {bar.highlighted && (
                      <Box sx={{
                        position: 'absolute',
                        top: -60,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        p: 2,
                        fontSize: '0.8rem',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        zIndex: 10,
                        minWidth: '140px',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          border: '6px solid transparent',
                          borderTopColor: 'white'
                        }
                      }}>
                        <Typography variant="subtitle2" sx={{ 
                          fontWeight: 600, 
                          mb: 0.5, 
                          color: '#0f172a',
                          fontSize: '0.875rem'
                        }}>
                          At 14:00
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: '#64748b', 
                          mb: 0.25,
                          fontSize: '0.75rem'
                        }}>
                          Total calls: {bar.total}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: '#64748b',
                          fontSize: '0.75rem'
                        }}>
                          Escalated calls: {bar.escalated}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography variant="caption" sx={{ 
                    mt: 1.5, 
                    fontSize: '0.75rem',
                    color: '#64748b',
                    fontWeight: 500
                  }}>
                    {String(7 + index).padStart(2, '0')}:00
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Optional: Add summary stats */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mt: 3, 
              pt: 3, 
              borderTop: '1px solid #e2e8f0' 
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#0f172a' }}>
                  952
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Total calls today
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#f59e0b' }}>
                  135
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Escalated calls
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#059669' }}>
                  14.2%
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Escalation rate
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
                b. Call agent leaderboard
              </Typography>
              <Button 
                variant="text" 
                sx={{ 
                  color: '#0d9488', 
                  textTransform: 'none',
                  fontSize: '0.875rem'
                }}
              >
                View all
              </Button>
            </Box>
            
            <Box>
              <AgentCard
                rank={1}
                name="James Gipir"
                avatar="J"
                callsHandled={156}
                score={85}
                critical={23}
              />
              <AgentCard
                rank={2}
                name="Sarah Mukasa"
                avatar="S"
                callsHandled={142}
                score={80}
                critical={18}
              />
              <AgentCard
                rank={3}
                name="Mark John"
                avatar="M"
                callsHandled={138}
                score={95}
                critical={21}
              />
              <AgentCard
                rank={4}
                name="Sarah Mukasa"
                avatar="S"
                callsHandled={142}
                score={80}
                critical={18}
              />
              <AgentCard
                rank={5}
                name="Mark John"
                avatar="M"
                callsHandled={138}
                score={95}
                critical={21}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

  const renderQualityMetricsTab = () => (
    <>
      {/* Main Content Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            border: '1px solid #f1f5f9',
            backgroundColor: '#ffffff'
          }}>
            <Typography variant="h5" sx={{ 
              mb: 1.5, 
              fontWeight: 600, 
              color: '#6b7280',
              fontSize: '1.125rem'
            }}>
              a. Conversation quality trends
            </Typography>
            
            {/* Quality Chart */}
            <Box sx={{ 
              height: 320, 
              position: 'relative',
              backgroundColor: 'white',
              borderRadius: '12px',
              p: 3
            }}>
              {/* Y-axis */}
              <Box sx={{ position: 'absolute', left: 10, top: 20, bottom: 60 }}>
                {[100, 80, 60, 40, 20, 0].map((value, index) => (
                  <Box key={value} sx={{ 
                    position: 'absolute', 
                    top: `${index * 16.67}%`,
                    fontSize: '0.75rem',
                    color: '#9ca3af'
                  }}>
                    {value}
                  </Box>
                ))}
              </Box>

              {/* Chart area */}
              <Box sx={{ 
                ml: 4, 
                mr: 2, 
                height: '100%', 
                position: 'relative'
              }}>
                <svg width="100%" height="240" style={{ position: 'absolute', top: 0 }}>
                  {/* Grid lines */}
                  {[0, 20, 40, 60, 80, 100].map((value, index) => (
                    <line 
                      key={value}
                      x1="0" 
                      y1={240 - (value * 2.4)} 
                      x2="100%" 
                      y2={240 - (value * 2.4)}
                      stroke="#f3f4f6" 
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Line chart */}
                  <polyline
                    points="40,225 80,220 120,210 160,55 200,170 240,160 280,150 320,170 360,160 400,180 440,210 480,230"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Peak point marker with label */}
                  <circle cx="160" cy="55" r="4" fill="white" stroke="#0d9488" strokeWidth="2" />
                  <rect x="140" y="30" width="40" height="20" rx="4" fill="white" stroke="#e5e7eb"/>
                  <text x="160" y="42" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="600">
                    90
                  </text>
                  <text x="175" y="25" fontSize="9" fill="#9ca3af">Quality</text>
                </svg>
              </Box>

              {/* X-axis labels */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 1,
                ml: 4,
                mr: 2
              }}>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                  <Typography key={month} variant="caption" sx={{ 
                    fontSize: '0.75rem',
                    color: '#9ca3af'
                  }}>
                    {month}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            height: 'fit-content'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ 
                p: 0.5, 
                borderRadius: '4px', 
                bgcolor: '#fef3c7',
                color: '#f59e0b',
                mr: 2
              }}>
                <StarIcon sx={{ fontSize: '1.25rem' }} />
              </Box>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                color: '#6b7280',
                fontSize: '1.125rem'
              }}>
                b. Your conversation quality
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 3,
              justifyContent: 'flex-end'
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: '#fef3c7',
                px: 2,
                py: 1,
                borderRadius: '16px'
              }}>
                <StarIcon sx={{ fontSize: '1rem', color: '#f59e0b' }} />
                <Typography variant="body2" sx={{ 
                  color: '#92400e',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}>
                  90%
                </Typography>
              </Box>
            </Box>

            {/* Individual scores */}
            <Box>
              {[
                { name: 'Rapport', score: 90, color: '#059669' },
                { name: 'Listening', score: 70, color: '#0d9488' },
                { name: 'Analysing', score: 78, color: '#0d9488' },
                { name: 'Motivating', score: 36, color: '#f59e0b' },
                { name: 'Ending', score: 10, color: '#dc2626' }
              ].map((item) => (
                <Box key={item.name} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ 
                      color: '#6b7280',
                      fontWeight: 500
                    }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#111827',
                      fontWeight: 600
                    }}>
                      {item.score}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={item.score} 
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e5e7eb',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: item.color,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Areas for improvement section below */}
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              color: '#6b7280',
              mb: 3,
              fontSize: '1.125rem'
            }}>
              c. Areas for improvement
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={3}>
                <Box sx={{ 
                  p: 3, 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '100%'
                }}>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 500, 
                    color: '#111827',
                    mb: 2
                  }}>
                    Empathy and understanding
                  </Typography>
                  <Chip 
                    label="● High priority"
                    size="small"
                    sx={{
                      bgcolor: 'transparent',
                      color: '#dc2626',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      border: 'none'
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Box sx={{ 
                  p: 3, 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '100%'
                }}>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 500, 
                    color: '#111827',
                    mb: 2
                  }}>
                    Active listening skills
                  </Typography>
                  <Chip 
                    label="● High priority"
                    size="small"
                    sx={{
                      bgcolor: 'transparent',
                      color: '#dc2626',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      border: 'none'
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Box sx={{ 
                  p: 3, 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '100%'
                }}>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 500, 
                    color: '#111827',
                    mb: 2
                  }}>
                    Motivation
                  </Typography>
                  <Chip 
                    label="● High priority"
                    size="small"
                    sx={{
                      bgcolor: 'transparent',
                      color: '#dc2626',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      border: 'none'
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Box sx={{ 
                  p: 3, 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '100%'
                }}>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 500, 
                    color: '#111827',
                    mb: 2
                  }}>
                    Clarity in explanation
                  </Typography>
                  <Chip 
                    label="● Medium priority"
                    size="small"
                    sx={{
                      bgcolor: 'transparent',
                      color: '#f59e0b',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      border: 'none'
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Box sx={{ p: 3, bgcolor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Quality Metrics" />
          </Tabs>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="#6b7280">
            04/08/2025 - 04/09/2025
          </Typography>
          <Button
            startIcon={<FileDownloadIcon />}
            variant="contained"
            sx={{
              bgcolor: '#0d9488',
              '&:hover': { bgcolor: '#0f766e' },
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Export report
          </Button>
        </Box>
      </Box>

      {/* Tab Content */}
      {tabValue === 0 && renderOverviewTab()}
      {tabValue === 1 && renderQualityMetricsTab()}
    </Box>
  );
};