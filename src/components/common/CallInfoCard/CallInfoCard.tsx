// src/components/CallInfoCard/CallInfoCard.tsx
import React from "react";
import { Box, Paper, Typography, Chip, IconButton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WarningIcon from "@mui/icons-material/Warning";
import EditIcon from "@mui/icons-material/Edit";

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
  onBack?: () => void;
  actionButton?: {
    label: string;
    icon?: "escalate" | "edit";
    variant?: "escalate" | "edit";
    onClick: () => void;
  };
}

interface CallInfoCardProps {
  fields: CallInfoField[];
  backgroundColor?: string;
  gridColumns?: { xs: number; sm: number; md?: number };
  header?: CallInfoCardHeader;
  showPaper?: boolean;
}

export const CallInfoCard: React.FC<CallInfoCardProps> = ({
  fields,
  backgroundColor = "#cce5e5",
  gridColumns = { xs: 1, sm: 2, md: 3 },
  header,
  showPaper = true,
}) => {
  const content = (
    <>
      {header && (
        <Box sx={{ mb: 3 }}>
          {/* Header with back button, title, status chip, and action button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
              {header.onBack && (
                <IconButton
                  onClick={header.onBack}
                  sx={{
                    color: "#111827",
                    "&:hover": { bgcolor: "#f3f4f6" },
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              )}
              
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
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
                      fontSize: "13px",
                      textTransform: "capitalize",
                      height: "28px",
                    }}
                  />
                )}
              </Box>
            </Box>

            {header.actionButton && (
              <Button
                variant="contained"
                startIcon={
                  header.actionButton.icon === "escalate" ? (
                    <WarningIcon />
                  ) : header.actionButton.icon === "edit" ? (
                    <EditIcon />
                  ) : null
                }
                onClick={header.actionButton.onClick}
                sx={{
                  bgcolor:
                    header.actionButton.variant === "escalate"
                      ? "#dc2626"
                      : header.actionButton.variant === "edit"
                      ? "#0d9488"
                      : "#0d9488",
                  color: "#ffffff",
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  px: 3,
                  py: 1.25,
                  borderRadius: 1.5,
                  "&:hover": {
                    bgcolor:
                      header.actionButton.variant === "escalate"
                        ? "#b91c1c"
                        : header.actionButton.variant === "edit"
                        ? "#0f766e"
                        : "#0f766e",
                  },
                }}
              >
                {header.actionButton.label}
              </Button>
            )}
          </Box>

          {header.subtitle && (
            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                fontSize: { xs: "13px", sm: "14px" },
                fontWeight: 400,
                ml: header.onBack ? 7 : 0,
              }}
            >
              {header.subtitle}
            </Typography>
          )}
        </Box>
      )}
      
      <Box
      sx={{
        backgroundColor: `color-mix(in srgb, ${backgroundColor} 25%, white)`,
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        border: "2px solid",
        borderColor: backgroundColor,
      }}
      
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: `repeat(${gridColumns.xs}, 1fr)`,
              sm: `repeat(${gridColumns.sm}, 1fr)`,
              md: gridColumns.md ? `repeat(${gridColumns.md}, 1fr)` : `repeat(${gridColumns.sm}, 1fr)`,
            },
            gap: { xs: 2.5, sm: 3 },
          }}
        >
          {fields.map((field, index) => (
            <Box key={index}>
              <Typography
                variant="body2"
                sx={{
                  color: "#6b7280",
                  fontSize: { xs: "12px", sm: "13px" },
                  mb: 0.75,
                  fontWeight: 400,
                }}
              >
                {field.label}
              </Typography>
              {typeof field.value === "string" || typeof field.value === "number" ? (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#111827",
                    fontSize: { xs: "14px", sm: "15px" },
                    fontWeight: 600,
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
      height: "24px",
    }}
  />
);

// Helper functions for color schemes
export const getRiskLevelColors = (risk: string) => {
  switch (risk?.toLowerCase()) {
    case "high":
    case "critical":
      return { bg: "#fee2e2", color: "#991b1b", border: "#fecaca" };
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
    case "transferred":
      return { bg: "#dbeafe", color: "#1e40af", border: "#bfdbfe" };
    case "escalated":
      return { bg: "#fee2e2", color: "#991b1b", border: "#fecaca" };
    case "voicemail":
      return { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" };
    case "missed":
      return { bg: "#fee2e2", color: "#dc2626", border: "#fecaca" };
    default:
      return { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" };
  }
};

export const getCallerTypeColors = (type: string) => {
  switch (type?.toLowerCase()) {
    case "patient":
      return { bg: "#ccf5f5", color: "#0d7c7c", border: "#99ebeb" };
    case "provider":
      return { bg: "#e0e7ff", color: "#3730a3", border: "#c7d2fe" };
    case "staff":
      return { bg: "#fef3c7", color: "#92400e", border: "#fde68a" };
    default:
      return { bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" };
  }
};

// Helper function to create speaker chips
// Helper function to create speaker chips
export const createSpeakerChips = (speakers: Array<{ label: string; percentage: number }>) => {
    return (
      <Box sx={{ display: "flex", gap: 1, flexWrap: "nowrap", overflowX: "auto" }}>
        {speakers.map((speaker, index) => (
          <Chip
            key={index}
            label={`${speaker.label} (${speaker.percentage}%)`}
            size="small"
            sx={{
              bgcolor: "#f3f4f6",
              color: "#374151",
              border: "1px solid #d1d5db",
              fontWeight: 500,
              fontSize: "13px",
              height: "28px",
              flexShrink: 0,
            }}
          />
        ))}
      </Box>
    );
  };