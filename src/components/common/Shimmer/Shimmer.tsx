import React from 'react';
import { Box, Paper, Skeleton } from '@mui/material';

// Shimmer for MetricCard
export const MetricCardSkeleton = () => (
  <Paper sx={{ p: 2, borderRadius: 3, height: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
    </Box>
    <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="40%" height={32} />
  </Paper>
);

// Shimmer for Call Volume Chart
export const CallVolumeChartSkeleton = () => (
  <Paper sx={{ p: 3, borderRadius: 3 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Box>
        <Skeleton variant="text" width={200} height={28} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width={150} height={20} />
      </Box>
      <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: 1 }} />
    </Box>
    
    <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', gap: 0.5 }}>
      {Array.from({ length: 24 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: `${Math.random() * 70 + 30}%`,
              borderRadius: '4px 4px 0 0',
            }}
          />
          <Skeleton variant="text" width={20} height={16} sx={{ mt: 0.5 }} />
        </Box>
      ))}
    </Box>
  </Paper>
);

// Shimmer for Facility Performance Item
export const FacilityPerformanceSkeleton = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 2,
      borderRadius: 2,
      bgcolor: '#F9FAFB',
      border: '1px solid #F3F4F6',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Skeleton variant="circular" width={48} height={48} />
      <Box>
        <Skeleton variant="text" width={120} height={24} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width={80} height={20} />
      </Box>
    </Box>
    <Box sx={{ textAlign: 'right' }}>
      <Skeleton variant="text" width={60} height={32} sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width={70} height={20} />
    </Box>
  </Box>
);

// Shimmer for Facility Performance Card
export const FacilityPerformanceCardSkeleton = () => (
  <Paper sx={{ p: 3, borderRadius: 3 }}>
    <Skeleton variant="text" width={180} height={28} sx={{ mb: 3 }} />
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <FacilityPerformanceSkeleton key={index} />
      ))}
    </Box>
  </Paper>
);

// Shimmer for User Distribution Item
export const UserDistributionSkeleton = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 2,
      borderRadius: 2,
      bgcolor: '#F9FAFB',
      border: '1px solid #F3F4F6',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Skeleton variant="rounded" width={48} height={48} sx={{ borderRadius: 1.5 }} />
      <Skeleton variant="text" width={100} height={24} />
    </Box>
    <Skeleton variant="text" width={50} height={32} />
  </Box>
);

// Shimmer for User Distribution Card
export const UserDistributionCardSkeleton = () => (
  <Paper sx={{ p: 3, borderRadius: 3 }}>
    <Skeleton variant="text" width={160} height={28} sx={{ mb: 3 }} />
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <UserDistributionSkeleton key={index} />
      ))}
    </Box>
  </Paper>
);