// HealthcareDashboard.jsx
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Avatar,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  MoreVert,
  FilterList,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00897B',
    },
  },
});

export default function HealthcareDashboard() {
  const statsCards = [
    {
      iconPath: '/phone1.png', // Replace with your actual icon path
      label: 'Calls Today',
      value: '1247',
      trend: '+1%',
      trendText: 'vs yesterday',
      isPositive: true
    },
    {
      iconPath: '/vian.png', // Replace with your actual icon path
      label: 'Total Facilities',
      value: '2',
      trend: '+1%',
      trendText: 'vs last month',
      isPositive: true,
      
    },
    {
      iconPath: '/Staff3.png', // Replace with your actual icon path
      label: 'Total Users',
      value: '281',
      trend: '+1%',
      trendText: 'vs last week',
      isPositive: true,
      
    },
    {
      iconPath: '/star2.png', // Replace with your actual icon path
      label: 'System Uptime',
      value: '99%',
      trend: '-0%',
      trendText: 'vs last 30 days',
      isPositive: false,
    
    },
  ];

  const facilities = [
    {
      id: 1,
      name: 'Butabika Hospital',
      status: 'Active',
      level: 'Referral Hospital',
      location: 'Kampala, Uganda',
      hso: 'Nakasa',
      dateCreated: 'Mon, July 13, 2025',
      time: '10:31 AM',
      avatar: 'B',
      avatarColor: '#E8F5E9',
      avatarText: '#2E7D32',
    },
    {
      id: 2,
      name: 'Butabika Hospital',
      status: 'Active',
      level: 'Referral Hospital',
      location: 'Kampala, Uganda',
      hso: 'Nakasa',
      dateCreated: 'Mon, July 13, 2025',
      time: '10:31 AM',
      avatar: 'B',
      avatarColor: '#E8F5E9',
      avatarText: '#2E7D32',
    },
    {
      id: 3,
      name: 'Menonic Hospital',
      status: 'inactive',
      level: 'Health Center IV',
      location: 'Dodoma, Tanzania',
      hso: 'Dodoma',
      dateCreated: 'Mon, July 13, 2025',
      time: '10:31 AM',
      avatar: 'M',
      avatarColor: '#FFF3E0',
      avatarText: '#E65100',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: '100vh',ml:-5 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Hello, Mary Namu
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#00897B',
              textTransform: 'none',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#00695C',
              },
            }}
          >
            + Add facility
          </Button>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          {statsCards.map((card, index) => (
            <Box key={index} sx={{ flex: '1 1 calc(25% - 12px)', minWidth: '200px' }}>
              <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)', height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        
                        borderRadius: 1,
                        p: 0.5,
                        mr: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 32,
                        height: 32,
                      }}
                    >
                      <img 
                        src={card.iconPath} 
                        alt={card.label}
                        style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {card.label}
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {card.value}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {card.isPositive ? (
                      <TrendingUp sx={{ fontSize: 16, color: '#00897B', mr: 0.5 }} />
                    ) : (
                      <TrendingDown sx={{ fontSize: 16, color: '#D32F2F', mr: 0.5 }} />
                    )}
                    <Typography
                      variant="caption"
                      sx={{ color: card.isPositive ? '#00897B' : '#D32F2F', mr: 0.5 }}
                    >
                      {card.trend}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {card.trendText}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Facilities Table */}
        <Card sx={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Facilities Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage all registered healthcare facilities
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1  }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select defaultValue="all" sx={{ backgroundColor: 'white' }}>
                    <MenuItem value="all">All status</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  sx={{
                    textTransform: 'none',
                    borderColor: '#E0E0E0',
                    color: 'text.primary',
                  }}
                >
                  Filters
                </Button>
              </Box>
            </Box>

            {/* Table Header */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                pb: 1,
                borderBottom: '1px solid #E0E0E0',
                mb: 2,
              }}
            >
              <Box sx={{ flex: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Name
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Status
                </Typography>
              </Box>
              <Box sx={{ flex: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Level
                </Typography>
              </Box>
              <Box sx={{ flex: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Location
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  HSO
                </Typography>
              </Box>
              <Box sx={{ flex: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Date Created
                </Typography>
              </Box>
              <Box sx={{ flex: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Action
                </Typography>
              </Box>
            </Box>

            {/* Table Rows */}
            {facilities.map((facility) => (
              <Box
                key={facility.id}
                sx={{
                  display: 'flex',
                  gap: 2,
                  py: 2,
                  borderBottom: '1px solid #F5F5F5',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: facility.avatarColor,
                      color: facility.avatarText,
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    {facility.avatar}
                  </Avatar>
                  <Typography variant="body2">{facility.name}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Chip
                    label={facility.status}
                    size="small"
                    sx={{
                      backgroundColor: facility.status === 'ACTIVE' ? '#E8F5E9' : '#FFEBEE',
                      color: facility.status === 'ACTIVE' ? '#2E7D32' : '#C62828',
                      fontWeight: 600,
                      fontSize: '11px',
                      height: '24px',
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1.5 }}>
                  <Typography variant="body2">{facility.level}</Typography>
                </Box>
                <Box sx={{ flex: 1.5 }}>
                  <Typography variant="body2">{facility.location}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2">{facility.hso}</Typography>
                </Box>
                <Box sx={{ flex: 1.5 }}>
                  <Typography variant="body2">{facility.dateCreated}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {facility.time}
                  </Typography>
                </Box>
                <Box sx={{ flex: 0.5 }}>
                  <IconButton size="small">
                    <MoreVert fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}

            {/* View All Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                sx={{
                  textTransform: 'none',
                  color: '#00897B',
                  fontWeight: 500,
                }}
              >
                View All
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

