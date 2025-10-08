import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Add these imports
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
import { Download, User, Users, Globe } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
} from '@mui/material';

const genderData = [
  { name: 'Female', value: 480, color: '#008080', percentage: 72 },
  { name: 'Male', value: 120, color: '#f5a623', percentage: 20 },
];

const languageData = [
  { name: 'English', value: 20, color: '#4682B4' },
  { name: 'Luganda', value: 40, color: '#f5a623' },
  { name: 'Swahili', value: 30, color: '#0d9488' },
];

const trajectoryData = [
  { name: 'Already in care', value: 480, color: '#4682B4', percentage: 80 },
  { name: 'Still in community', value: 120, color: '#f5a623', percentage: 20 },
];

const callerTypes = [
  {
    icon: User,
    label: 'Patient',
    percentage: '86% of total calls',
    count: 480,
    color: '#0d7a8a',
  },
  {
    icon: User,
    label: 'Caregiver',
    count: 110,
    percentage: '30% of total calls',
    color: '#5b7fa6',
  },
  {
    icon: User,
    label: 'General public',
    count: 20,
    percentage: '4% of total calls',
    color: '#f5a623',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);

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

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Card
          sx={{
            backgroundColor: 'white',
            borderBottom: '1px solid #e5e7eb',
            mb: 3,
            borderRadius: 2,
          }}
        >
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
              sx={{
                '& .MuiTab-root': { textTransform: 'none', fontSize: 14 },
              }}
            >
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab.label} />
              ))}
            </Tabs>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Typography sx={{ fontSize: 14, color: '#6b7280' }}>
                04/08/2025 - 04/09/2025
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#0d9488',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#0c7c73' },
                }}
              >
                <Download style={{ width: 16, height: 16, marginRight: 8 }} />
                Export report
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Content - rest of your component stays the same */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Gender breakdown */}
          <Box sx={{ flex: '1 1 calc(50% - 12px)', minWidth: 400 }}>
            <Card>
              <CardHeader
                title={
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    a. Gender breakdown
                  </Typography>
                }
                subheader={
                  <Typography sx={{ fontSize: 14, color: '#6b7280', mt: 0.5 }}>
                    Total: 3,347 callers
                  </Typography>
                }
              />
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.percentage}%`}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <Box mt={2}>
                  {genderData.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
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
                        <Typography sx={{ fontSize: 14 }}>{item.name}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Language usage */}
          <Box sx={{ flex: '1 1 calc(50% - 12px)', minWidth: 400 }}>
            <Card>
              <CardHeader
                title={
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    b. Language usage
                  </Typography>
                }
              />
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={languageData}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {languageData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                <Box mt={2}>
                  {languageData.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
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
                        <Typography sx={{ fontSize: 14 }}>{item.name}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Caller type */}
          <Box sx={{ flex: '1 1 calc(50% - 12px)', minWidth: 400 }}>
            <Card>
              <CardHeader
                title={
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    c. Caller type
                  </Typography>
                }
              />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {callerTypes.map((caller, index) => {
                    const Icon = caller.icon;
                    return (
                      <Box
                        key={index}
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
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            backgroundColor: caller.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Icon style={{ width: 20, height: 20, color: 'white' }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                            {caller.label}
                          </Typography>
                          <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
                            {caller.count}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: 12, color: '#6b7280', mt: 0.3 }}>
                          {caller.percentage}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Trajectory of care */}
          <Box sx={{ flex: '1 1 calc(50% - 12px)', minWidth: 400 }}>
            <Card>
              <CardHeader
                title={
                  <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                    d. Trajectory of care
                  </Typography>
                }
              />
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={trajectoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.percentage}%`}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {trajectoryData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <Box mt={2}>
                  {trajectoryData.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
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
                        <Typography sx={{ fontSize: 14 }}>{item.name}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}