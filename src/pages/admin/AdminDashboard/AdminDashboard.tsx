import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Avatar,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import {
  Phone,
  Business,
  People,
  CheckCircle,
  MoreVert,
  FilterList,
} from '@mui/icons-material';
import { MetricCard } from '../../../components/cards/MetricCard/MetricCard';
import CustomChip from '../../../components/common/CustomChip/CustomChip';


export default function HealthcareDashboard() {
  // Define stats data
  const statsCards = [
    {
      title: 'Calls Today',
      value: '1247',
      change: {
        value: 1,
        type: 'increase' as const,
        period: 'vs yesterday',
      },
      icon: <Phone sx={{ fontSize: 18 }} />,
      color: 'teal' as const,
    },
    {
      title: 'Total Facilities',
      value: '2',
      change: {
        value: 1,
        type: 'increase' as const,
        period: 'vs last month',
      },
      icon: <Business sx={{ fontSize: 18 }} />,
      color: 'blue' as const,
    },
    {
      title: 'Total Users',
      value: '281',
      change: {
        value: 1,
        type: 'increase' as const,
        period: 'vs last week',
      },
      icon: <People sx={{ fontSize: 18 }} />,
      color: 'purple' as const,
    },
    {
      title: 'System Uptime',
      value: '99%',
      change: {
        value: 0,
        type: 'decrease' as const,
        period: 'vs last 30 days',
      },
      icon: <CheckCircle sx={{ fontSize: 18 }} />,
      color: 'green' as const,
    },
  ];

  const facilities = [
    {
      id: 1,
      name: 'Butabika Hospital',
      status: 'Available' as const,
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
      status: 'Available' as const,
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
      status: 'Break' as const,
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
    <Box sx={{ p: 3, backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
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

      {/* Stats Cards - Using imported MetricCard Component */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        {statsCards.map((card, index) => (
          <Box key={index} sx={{ flex: '1 1 calc(25% - 12px)', minWidth: '200px' }}>
            <MetricCard {...card} />
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
            <Box sx={{ display: 'flex', gap: 1 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select defaultValue="all" sx={{ backgroundColor: 'white' }}>
                  <MenuItem value="all">All status</MenuItem>
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="busy">Busy</MenuItem>
                  <MenuItem value="break">Break</MenuItem>
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
                <CustomChip
                  label={facility.status}
                  variant="status"
                  size="small"
                  showDot={true}
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
  );
}