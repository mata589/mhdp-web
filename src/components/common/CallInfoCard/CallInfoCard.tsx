// src/components/CallInfoCard/CallInfoCard.tsx
import React from "react";
import { Box, Paper, Typography, Chip } from "@mui/material";

interface CallInfoField {
  label: string;
  value: string | number | React.ReactNode;
}

interface CallInfoCardHeader {
  title: string;
  statusChip?: {
    label: string;
    bgcolor: string;
    color: string;
    border: string;
  };
  subtitle?: string;
}

interface CallInfoCardProps {
  fields: CallInfoField[];
  backgroundColor?: string;
  gridColumns?: { xs: number; sm: number };
  header?: CallInfoCardHeader;
  showPaper?: boolean;
}

export const CallInfoCard: React.FC<CallInfoCardProps> = ({
  fields,
  backgroundColor = "#eff6ff",
  gridColumns = { xs: 1, sm: 2 },
  header,
  showPaper = true,
}) => {
  const content = (
    <>
      {header && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#111827",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            >
              {header.title}
            </Typography>
            {header.statusChip && (
              <Chip
                label={header.statusChip.label}
                size="small"
                sx={{
                  bgcolor: header.statusChip.bgcolor,
                  color: header.statusChip.color,
                  border: `1px solid ${header.statusChip.border}`,
                  fontWeight: 500,
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
              />
            )}
          </Box>
          {header.subtitle && (
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                fontSize: { xs: "13px", sm: "14px" },
                fontWeight: 400,
              }}
            >
              {header.subtitle}
            </Typography>
          )}
        </Box>
      )}
      
      <Box
        sx={{
          backgroundColor,
          p: { xs: 2, sm: 3 },
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: `repeat(${gridColumns.xs}, 1fr)`,
              sm: `repeat(${gridColumns.sm}, 1fr)`,
            },
            gap: { xs: 2, sm: 3 },
          }}
        >
          {fields.map((field, index) => (
            <Box key={index}>
              <Typography
                variant="body2"
                sx={{
                  color: "#6b7280",
                  fontSize: { xs: "11px", sm: "12px" },
                  mb: 0.5,
                }}
              >
                {field.label}
              </Typography>
              {typeof field.value === "string" || typeof field.value === "number" ? (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#111827",
                    fontSize: { xs: "13px", sm: "14px" },
                    fontWeight: 500,
                    textTransform: typeof field.value === "string" ? "capitalize" : "none",
                  }}
                >
                  {field.value}
                </Typography>
              ) : (
                field.value
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );

  if (!showPaper) {
    return <>{content}</>;
  }

  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        mb: 3,
        borderRadius: 2,
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      }}
    >
      {content}
    </Paper>
  );
};

// Helper function to create chip value
export const createChipValue = (
  label: string,
  bgcolor: string,
  color: string,
  border: string
): React.ReactNode => (
  <Chip
    label={label}
    size="small"
    sx={{
      bgcolor,
      color,
      border: `1px solid ${border}`,
      fontWeight: 500,
      fontSize: "12px",
      textTransform: "capitalize",
    }}
  />
);

// Helper functions for color schemes
export const getRiskLevelColors = (risk: string) => {
  switch (risk?.toLowerCase()) {
    case "high":
    case "critical":
      return { bg: "#fee2e2", color: "#dc2626", border: "#fecaca" };
    case "medium":
      return { bg: "#fef3c7", color: "#d97706", border: "#fde68a" };
    case "low":
      return { bg: "#d1fae5", color: "#059669", border: "#a7f3d0" };
    default:
      return { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" };
  }
};

export const getStatusColors = (status: string) => {
  switch (status?.toLowerCase()) {
    case "answered":
      return { bg: "#d1fae5", color: "#059669", border: "#a7f3d0" };
    case "escalated":
    case "voicemail":
      return { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" };
    case "missed":
      return { bg: "#fee2e2", color: "#dc2626", border: "#fecaca" };
    default:
      return { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" };
  }
};