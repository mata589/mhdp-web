// File: src/pages/supervisor/SupervisorDashboard/components/SkeletonComponents.tsx
import React from "react";
import { Box, Card, CardContent, Skeleton } from "@mui/material";

export const MetricCardSkeleton: React.FC = () => (
  <Card
    sx={{
      bgcolor: "white",
      borderRadius: 2,
      boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
    }}
  >
    <CardContent sx={{ p: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Skeleton variant="circular" width={48} height={48} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={32} sx={{ mt: 0.5 }} />
          <Skeleton variant="text" width="50%" height={16} sx={{ mt: 0.5 }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);