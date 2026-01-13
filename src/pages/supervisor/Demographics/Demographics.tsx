// pages/supervisor/Demographics.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { PieLabelRenderProps } from 'recharts';
import { Download, User } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  Skeleton,
} from '@mui/material';

import type {
  GenderBreakdown,
  LanguageUsage,
  CallerTypeBreakdown,
  TrajectoryOfCare,
} from '../../../types/supervisor.types'; // Adjust path as needed
import supervisorApi from '../../../services/api/supervisorApi';

const COLORS = {
  teal: '#0d9488',
  orange: '#f5a623',
  blue: '#4682B4',
  darkTeal: '#008080',
  gray: '#6b7280',
};

const formatPercentage = (value: number, total: number): string =>
  total === 0 ? '0%' : `${Math.round((value / total) * 100)}%`;

// Simple label renderer with proper typing
const renderPercentageLabel = ({ percent }: PieLabelRenderProps): string =>
  typeof percent === 'number' ? `${Math.round(percent * 100)}%` : '0%';

const Demographics = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [gender, setGender] = useState<GenderBreakdown | null>(null);
  const [language, setLanguage] = useState<LanguageUsage | null>(null);
  const [callerType, setCallerType] = useState<CallerTypeBreakdown | null>(null);
  const [trajectory, setTrajectory] = useState<TrajectoryOfCare | null>(null);

  const tabs = [
    { label: 'Overview', url: '/supervisor/Analytics' },
    { label: 'Demographics', url: '/supervisor/Demographics' },
    { label: 'Topic Analysis', url: '/supervisor/TopicAnalysis' },
    { label: 'Quality Metrics', url: '/supervisor/QualityMetrics' },
  ];

  const [selectedTab, setSelectedTab] = useState(
    tabs.findIndex((tab) => tab.url === location.pathname) || 1
  );

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    navigate(tabs[newValue].url);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [g, l, c, t] = await Promise.all([
          supervisorApi.getGenderBreakdown(),
          supervisorApi.getLanguageUsage(),
          supervisorApi.getCallerTypeBreakdown(),
          supervisorApi.getTrajectoryOfCare(),
        ]);

        setGender(g);
        setLanguage(l);
        setCallerType(c);
        setTrajectory(t);
      } catch (err: any) {
        setError('Failed to load demographics data. Please try again later.');
        console.error('Demographics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare chart data
  const genderChartData = gender?.breakdown.map((item) => ({
    name: item.gender,
    value: item.count,
    percentage: formatPercentage(item.count, gender.total_callers),
    color: item.gender.toLowerCase() === 'female' ? COLORS.darkTeal : COLORS.orange,
  })) ?? [];

  const languageChartData = language?.usage.map((item) => ({
    name: item.language,
    value: item.count,
    color:
      item.language === 'English' ? COLORS.blue :
      item.language === 'Luganda' ? COLORS.orange :
      COLORS.teal,
  })) ?? [];

  const trajectoryChartData = trajectory?.distribution.map((item) => ({
    name: item.trajectory_of_care,
    value: item.count,
    percentage: formatPercentage(item.count, trajectory.total_records),
    color: item.trajectory_of_care.toLowerCase().includes('already') ? COLORS.blue : COLORS.orange,
  })) ?? [];

  const callerTypeItems = callerType?.breakdown ?? [];

  const isEmptyData =
    !gender?.total_callers &&
    !language?.total_calls &&
    !callerType?.total_calls &&
    !trajectory?.total_records;

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Card sx={{ mb: 3, borderRadius: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 3,
              py: 2,
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              sx={{ '& .MuiTab-root': { textTransform: 'none', fontSize: 14 } }}
            >
              {tabs.map((tab, i) => (
                <Tab key={i} label={tab.label} />
              ))}
            </Tabs>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography sx={{ fontSize: 14, color: COLORS.gray }}>
                Last 30 days
              </Typography>
              <Button
                variant="contained"
                startIcon={<Download size={16} />}
                sx={{
                  backgroundColor: COLORS.teal,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#0c7c73' },
                }}
              >
                Export report
              </Button>
            </Box>
          </Box>
        </Card>

        {error && (
          <Typography color="error" align="center" sx={{ my: 4 }}>
            {error}
          </Typography>
        )}

        {isEmptyData && !loading && (
          <Typography align="center" color="text.secondary" sx={{ my: 8 }}>
            No demographic data available for the selected period.
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* 1. Gender breakdown */}
          <Box sx={{ flex: '1 1 calc(50% - 12px)', minWidth: 400 }}>
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader
                title={
                  loading ? (
                    <Skeleton width="55%" height={28} />
                  ) : (
                    <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                      a. Gender breakdown
                    </Typography>
                  )
                }
                subheader={
                  loading ? (
                    <Skeleton width="40%" height={20} sx={{ mt: 0.5 }} />
                  ) : (
                    <Typography sx={{ fontSize: 14, color: COLORS.gray, mt: 0.5 }}>
                      Total: {gender?.total_callers?.toLocaleString() ?? 0} callers
                    </Typography>
                  )
                }
              />
              <CardContent>
                {loading ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Skeleton variant="circular" width={180} height={180} />
                    <Box sx={{ width: '100%', mt: 4 }}>
                      <Skeleton height={36} />
                      <Skeleton height={36} sx={{ mt: 1.5 }} />
                    </Box>
                  </Box>
                ) : (
                  <>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={genderChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderPercentageLabel}
                          outerRadius={90}
                          dataKey="value"
                        >
                          {genderChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>

                    <Box mt={2}>
                      {genderChartData.map((item, i) => (
                        <Box
                          key={i}
                          sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: item.color,
                              }}
                            />
                            <Typography variant="body2">{item.name}</Typography>
                          </Box>
                          <Typography variant="body2" fontWeight={600}>
                            {item.value.toLocaleString()} ({item.percentage})
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Box>

          {/* 2. Language usage */}
          <Box sx={{ flex: '1 1 calc(50% - 12px)', minWidth: 400 }}>
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader
                title={
                  loading ? (
                    <Skeleton width="50%" height={28} />
                  ) : (
                    <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                      b. Language usage
                    </Typography>
                  )
                }
              />
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 1 }} />
                    <Box mt={2}>
                      <Skeleton height={36} />
                      <Skeleton height={36} sx={{ mt: 1.5 }} />
                      <Skeleton height={36} sx={{ mt: 1.5 }} />
                    </Box>
                  </>
                ) : (
                  <>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={languageChartData}>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {languageChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>

                    <Box mt={2}>
                      {languageChartData.map((item, i) => (
                        <Box
                          key={i}
                          sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: item.color,
                              }}
                            />
                            <Typography variant="body2">{item.name}</Typography>
                          </Box>
                          <Typography variant="body2" fontWeight={600}>
                            {item.value.toLocaleString()}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Box>

          {/* 3. Caller type */}
          <Box sx={{ flex: '1 1 calc(50% - 12px)', minWidth: 400 }}>
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader
                title={
                  loading ? (
                    <Skeleton width="45%" height={28} />
                  ) : (
                    <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                      c. Caller type
                    </Typography>
                  )
                }
              />
              <CardContent>
                {loading ? (
                  Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton
                        key={i}
                        variant="rectangular"
                        height={88}
                        sx={{ mb: 2, borderRadius: 2 }}
                      />
                    ))
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {callerTypeItems.map((item, i) => (
                      <Box
                        key={i}
                        sx={{
                          border: '1px solid #e5e7eb',
                          borderRadius: 2,
                          p: 2,
                          backgroundColor: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            backgroundColor: item.caller_type.toLowerCase().includes('patient')
                              ? COLORS.teal
                              : COLORS.orange,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <User size={24} color="white" />
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={500}>
                            {item.caller_type}
                          </Typography>
                          <Typography variant="h6" fontWeight={600}>
                            {item.count.toLocaleString()}
                          </Typography>
                        </Box>

                        <Typography variant="caption" color="text.secondary">
                          {formatPercentage(item.count, callerType?.total_calls ?? 1)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>

          {/* 4. Trajectory of care */}
          <Box sx={{ flex: '1 1 calc(50% - 12px)', minWidth: 400 }}>
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader
                title={
                  loading ? (
                    <Skeleton width="60%" height={28} />
                  ) : (
                    <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                      d. Trajectory of care
                    </Typography>
                  )
                }
              />
              <CardContent>
                {loading ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Skeleton variant="circular" width={180} height={180} />
                    <Box sx={{ width: '100%', mt: 4 }}>
                      <Skeleton height={36} />
                      <Skeleton height={36} sx={{ mt: 1.5 }} />
                    </Box>
                  </Box>
                ) : (
                  <>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={trajectoryChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderPercentageLabel}
                          outerRadius={90}
                          dataKey="value"
                        >
                          {trajectoryChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>

                    <Box mt={2}>
                      {trajectoryChartData.map((item, i) => (
                        <Box
                          key={i}
                          sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: item.color,
                              }}
                            />
                            <Typography variant="body2">{item.name}</Typography>
                          </Box>
                          <Typography variant="body2" fontWeight={600}>
                            {item.value.toLocaleString()} ({item.percentage})
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Demographics;