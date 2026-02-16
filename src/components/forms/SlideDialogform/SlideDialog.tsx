import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Snackbar,
  Alert,
  Autocomplete,
} from '@mui/material';
import {
  ArrowBack,
  Close as CloseIcon,
} from '@mui/icons-material';
import systemAdminApi from '../../../services/api/systemAdminApi';


// Field types for the form
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'facility';
  placeholder?: string;
  options?: { value: string; label: string }[];
  gridColumn?: string;
  rows?: number;
  required?: boolean;
  defaultValue?: any;
}

interface SlideDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: FormField[];
  onSave: (data: Record<string, any>) => void;
  saveButtonText?: string;
  initialValues?: Record<string, any>;
}

export function SlideDialog({
  open,
  onClose,
  title,
  fields,
  onSave,
  saveButtonText = 'Save',
  initialValues = {},
}: SlideDialogProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [facilities, setFacilities] = useState<Array<{ id: string; name: string }>>([]);
  const [loadingFacilities, setLoadingFacilities] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  // Load facilities when dialog opens
  useEffect(() => {
    if (open && fields.some(field => field.type === 'facility')) {
      loadFacilities();
    }
  }, [open]);

  // Initialize form data when dialog opens or initialValues change
  useEffect(() => {
    if (open) {
      const initialData: Record<string, any> = {};
      
      fields.forEach((field) => {
        if (field.type === 'facility') {
          // For facility fields, look for facility_id in initialValues
          const facilityId = initialValues.facility_id || initialValues[field.name]?.id;
          if (facilityId && facilities.length > 0) {
            // Find the matching facility object
            const facility = facilities.find(f => f.id === facilityId);
            initialData[field.name] = facility || null;
          } else {
            initialData[field.name] = field.defaultValue || null;
          }
        } else if (initialValues[field.name] !== undefined) {
          initialData[field.name] = initialValues[field.name];
        } else if (field.defaultValue !== undefined) {
          initialData[field.name] = field.defaultValue;
        } else {
          initialData[field.name] = '';
        }
      });
      
      setFormData(initialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, JSON.stringify(initialValues), facilities]);

  const loadFacilities = async () => {
    setLoadingFacilities(true);
    try {
      // Call API directly with just limit and offset like Swagger does
      const response = await systemAdminApi.getFacilities();
      
      // Check if response has the expected structure
      if (!response || !response.results) {
        throw new Error('Invalid response structure from API');
      }
      
      const facilityList = response.results.map((facility: { facility_id: any; facility_name: any; }) => ({
        id: facility.facility_id,
        name: facility.facility_name,
      }));
      
      setFacilities(facilityList);
    } catch (error: any) {
      console.error('Failed to load facilities:', error);
      
      // Better error message extraction
      let errorMessage = 'Unknown error';
      if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error?.detail) {
        errorMessage = error.detail;
      } else {
        errorMessage = JSON.stringify(error);
      }
      
      console.error('Error details:', errorMessage);
      setSnackbar({
        open: true,
        message: `Failed to load facilities: ${errorMessage}`,
        severity: 'error',
      });
      // Set empty array so the component doesn't break
      setFacilities([]);
    } finally {
      setLoadingFacilities(false);
    }
  };

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Transform formData to extract facility_id from facility object
      const transformedData = { ...formData };
      
      fields.forEach((field) => {
        if (field.type === 'facility' && transformedData[field.name]) {
          // Replace facility object with just the facility_id
          transformedData.facility_id = transformedData[field.name].id;
          // Remove the facility object field
          delete transformedData[field.name];
        }
      });
      
      await onSave(transformedData);
      setSnackbar({
        open: true,
        message: 'Successfully saved!',
        severity: 'success',
      });
      setTimeout(() => {
        setFormData({});
        onClose();
      }, 1000);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to save',
        severity: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setFormData({});
    onClose();
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || '';
    
    switch (field.type) {
      case 'facility':
        return (
          <Autocomplete
            fullWidth
            options={facilities}
            getOptionLabel={(option) => option.name}
            value={value || null}
            onChange={(_, newValue) => {
              handleFieldChange(field.name, newValue);
            }}
            loading={loadingFacilities}
            disablePortal
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={field.placeholder || 'Select facility'}
                size="small"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingFacilities ? <CircularProgress size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    bgcolor: 'white',
                  },
                  '& .MuiInputBase-input': {
                    color: '#111827',
                  },
                }}
              />
            )}
            disabled={loadingFacilities}
            noOptionsText={loadingFacilities ? "Loading facilities..." : "No facilities found"}
          />
        );
      case 'select':
        return (
          <FormControl fullWidth size="small">
            <Select
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              displayEmpty
              sx={{
                bgcolor: 'white',
                '& .MuiSelect-select': {
                  color: value ? '#111827' : '#9CA3AF',
                },
              }}
            >
              <MenuItem value="" disabled>
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
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            InputLabelProps={{
              shrink: Boolean(value),
            }}
            sx={{
              '& .MuiInputBase-root': {
                bgcolor: 'white',
              },
              '& .MuiInputBase-input': {
                color: '#111827',
              },
            }}
          />
        );
      default:
        return (
          <TextField
            fullWidth
            placeholder={field.placeholder}
            size="small"
            type={field.type}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            InputLabelProps={{
              shrink: Boolean(value),
            }}
            sx={{
              '& .MuiInputBase-root': {
                bgcolor: 'white',
              },
              '& .MuiInputBase-input': {
                color: '#111827',
              },
            }}
          />
        );
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          zIndex: 1300,
        }}
        PaperProps={{
          sx: {
            position: 'absolute',
            right: 0,
            top: 0,
            m: 0,
            height: '100vh',
            maxHeight: '100vh',
            borderRadius: 0,
            zIndex: 1300,
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              zIndex: 1299,
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e0e0e0',
            position: 'sticky',
            top: 0,
            bgcolor: 'white',
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={handleClose} size="small" disabled={saving}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" fontWeight="600">
              {title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              onClick={handleClose} 
              size="small"
              disabled={saving}
              sx={{
                textTransform: 'none',
                color: '#6B7280',
              }}
            >
              Close
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              size="small"
              disabled={saving}
              sx={{
                bgcolor: '#00897b',
                '&:hover': { bgcolor: '#00796b' },
                textTransform: 'none',
                boxShadow: 'none',
                minWidth: 80,
              }}
            >
              {saving ? <CircularProgress size={20} color="inherit" /> : saveButtonText}
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent 
          sx={{ 
            p: 3,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
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
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}