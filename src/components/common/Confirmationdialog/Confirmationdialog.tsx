import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  variant: 'delete' | 'archive';
  userName?: string;
  loading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText = 'Cancel',
  variant,
  userName,
  loading = false,
}) => {
  const getConfirmButtonStyles = () => {
    if (variant === 'delete') {
      return {
        bgcolor: '#dc2626',
        color: 'white',
        '&:hover': {
          bgcolor: '#b91c1c',
        },
        '&:disabled': {
          bgcolor: '#fca5a5',
          color: 'white',
        },
      };
    } else {
      return {
        bgcolor: '#0d9488',
        color: 'white',
        '&:hover': {
          bgcolor: '#0f766e',
        },
        '&:disabled': {
          bgcolor: '#5eead4',
          color: 'white',
        },
      };
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          maxWidth: '500px',
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
          pt: 2,
          px: 3,
        }}
      >
        <Box
          component="span"
          sx={{
            fontWeight: 600,
            fontSize: '20px',
            color: '#111827',
          }}
        >
          {title}
        </Box>
        <IconButton
          onClick={onClose}
          disabled={loading}
          sx={{
            color: '#6b7280',
            '&:hover': {
              bgcolor: '#f3f4f6',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: '#6b7280',
            fontSize: '15px',
            lineHeight: 1.6,
          }}
        >
          {message.split(userName || '').map((part, index, array) => {
            if (index === array.length - 1) return part;
            return (
              <React.Fragment key={index}>
                {part}
                <Box
                  component="span"
                  sx={{
                    fontWeight: 600,
                    color: '#111827',
                  }}
                >
                  {userName}
                </Box>
              </React.Fragment>
            );
          })}
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          pt: 2,
          gap: 2,
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '15px',
            px: 4,
            py: 1.25,
            borderRadius: 2,
            color: '#374151',
            borderColor: '#d1d5db',
            bgcolor: 'white',
            '&:hover': {
              bgcolor: '#f9fafb',
              borderColor: '#9ca3af',
            },
            '&:disabled': {
              borderColor: '#e5e7eb',
              color: '#9ca3af',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '15px',
            px: 4,
            py: 1.25,
            borderRadius: 2,
            boxShadow: 'none',
            ...getConfirmButtonStyles(),
          }}
        >
          {loading ? 'Processing...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};