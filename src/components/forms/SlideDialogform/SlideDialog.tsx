import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  ArrowBack,
  Close as CloseIcon,
} from '@mui/icons-material';

// Field types for the form
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  options?: { value: string; label: string }[];
  gridColumn?: string; // For custom grid positioning (e.g., '1 / -1' for full width)
  rows?: number; // For textarea
  required?: boolean;
}

interface SlideDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: FormField[];
  onSave: (data: Record<string, any>) => void;
  saveButtonText?: string;
}

export function SlideDialog({
  open,
  onClose,
  title,
  fields,
  onSave,
  saveButtonText = 'Save',
}: SlideDialogProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setFormData({});
  };

  const handleClose = () => {
    setFormData({});
    onClose();
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'select':
        return (
          <FormControl fullWidth size="small">
            <Select
              value={formData[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                {field.placeholder || `Select ${field.label.toLowerCase()}`}
              </MenuItem>
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'textarea':
        return (
          <TextField
            fullWidth
            placeholder={field.placeholder}
            size="small"
            multiline
            rows={field.rows || 2}
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          />
        );
      default:
        return (
          <TextField
            fullWidth
            placeholder={field.placeholder}
            size="small"
            type={field.type}
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          />
        );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          position: 'absolute',
          right: 0,
          top: 0,
          m: 0,
          height: '100vh',
          maxHeight: '100vh',
          borderRadius: 0,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleClose} size="small">
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" fontWeight="600">
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={handleClose} size="small">
            Close
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            size="small"
            sx={{
              bgcolor: '#00897b',
              '&:hover': { bgcolor: '#00796b' },
            }}
          >
            {saveButtonText}
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
          }}
        >
          {fields.map((field, index) => (
            <Box
              key={index}
              sx={{
                gridColumn: field.gridColumn || 'auto',
              }}
            >
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                {field.label}
                {field.required && (
                  <span style={{ color: '#d32f2f' }}> *</span>
                )}
              </Typography>
              {renderField(field)}
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
