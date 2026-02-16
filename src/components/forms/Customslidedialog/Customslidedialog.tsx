import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Divider,
  FormControl,
  FormLabel,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
  Chip,
  Select,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Close, Add } from '@mui/icons-material';

// Field types supported by the dialog
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel' 
  | 'url'
  | 'textarea' 
  | 'select' 
  | 'multiselect'
  | 'checkbox' 
  | 'radio' 
  | 'switch'
  | 'date'
  | 'time'
  | 'datetime-local';

// Option interface for select, multiselect, and radio fields
export interface FieldOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

// Main field configuration interface
export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  options?: FieldOption[]; // For select, multiselect, radio
  gridColumn?: string; // For grid layout (e.g., '1 / -1', 'span 2')
  validation?: {
    pattern?: RegExp;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    custom?: (value: any) => string | null; // Return error message or null
  };
  rows?: number; // For textarea
  multiline?: boolean;
  sx?: any; // Custom MUI sx prop
  onChange?: (value: any, allValues: Record<string, any>) => void; // Custom onChange handler
  dependsOn?: string; // Field name this field depends on
  showWhen?: (values: Record<string, any>) => boolean; // Conditional rendering
}

export interface CustomSlideDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  fields: FormField[];
  onSave: (data: Record<string, any>) => Promise<void> | void;
  saveButtonText?: string;
  cancelButtonText?: string;
  initialValues?: Record<string, any>;
  width?: number | string;
  showDivider?: boolean;
  gridColumns?: number; // Number of columns in the grid
  loading?: boolean;
  validateOnChange?: boolean;
}

export const CustomSlideDialog: React.FC<CustomSlideDialogProps> = ({
  open,
  onClose,
  title,
  subtitle,
  fields,
  onSave,
  saveButtonText = 'Save',
  cancelButtonText = 'Cancel',
  initialValues = {},
  width = 480,
  showDivider = true,
  gridColumns = 2,
  loading = false,
  validateOnChange = false,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data with default values and initial values
  // Only re-initialize when the dialog opens, not when fields/initialValues change
  useEffect(() => {
    if (open) {
      const defaultData: Record<string, any> = {};
      fields.forEach((field) => {
        if (initialValues[field.name] !== undefined) {
          defaultData[field.name] = initialValues[field.name];
        } else if (field.defaultValue !== undefined) {
          defaultData[field.name] = field.defaultValue;
        } else {
          // Set default values based on field type
          switch (field.type) {
            case 'multiselect':
              defaultData[field.name] = [];
              break;
            case 'checkbox':
            case 'switch':
              defaultData[field.name] = false;
              break;
            case 'number':
              defaultData[field.name] = '';
              break;
            default:
              defaultData[field.name] = '';
          }
        }
      });
      setFormData(defaultData);
      setErrors({});
      setTouched({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]); // Only depend on 'open' to prevent infinite loops

  // Validate a single field
  const validateField = (field: FormField, value: any): string | null => {
    // Required validation
    if (field.required) {
      if (value === '' || value === null || value === undefined) {
        return `${field.label} is required`;
      }
      if (Array.isArray(value) && value.length === 0) {
        return `${field.label} is required`;
      }
    }

    // Skip further validation if empty and not required
    if (!value && !field.required) return null;

    // Type-specific validation
    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Invalid email address';
      }
    }

    if (field.type === 'url') {
      try {
        new URL(value);
      } catch {
        return 'Invalid URL';
      }
    }

    if (field.type === 'tel') {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(value)) {
        return 'Invalid phone number';
      }
    }

    // Custom validation rules
    if (field.validation) {
      const { pattern, min, max, minLength, maxLength, custom } = field.validation;

      if (pattern && !pattern.test(value)) {
        return `${field.label} format is invalid`;
      }

      if (field.type === 'number') {
        const numValue = Number(value);
        if (min !== undefined && numValue < min) {
          return `${field.label} must be at least ${min}`;
        }
        if (max !== undefined && numValue > max) {
          return `${field.label} must be at most ${max}`;
        }
      }

      if (typeof value === 'string') {
        if (minLength !== undefined && value.length < minLength) {
          return `${field.label} must be at least ${minLength} characters`;
        }
        if (maxLength !== undefined && value.length > maxLength) {
          return `${field.label} must be at most ${maxLength} characters`;
        }
      }

      if (custom) {
        const customError = custom(value);
        if (customError) return customError;
      }
    }

    return null;
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      // Skip validation for hidden fields
      if (field.showWhen && !field.showWhen(formData)) {
        return;
      }

      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle field change
  const handleFieldChange = (fieldName: string, value: any) => {
    const newFormData = { ...formData, [fieldName]: value };
    setFormData(newFormData);

    // Find the field configuration
    const field = fields.find((f) => f.name === fieldName);

    // Call custom onChange if provided
    if (field?.onChange) {
      field.onChange(value, newFormData);
    }

    // Validate on change if enabled
    if (validateOnChange && touched[fieldName]) {
      const error = field ? validateField(field, value) : null;
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error || '',
      }));
    }
  };

  // Handle field blur
  const handleFieldBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const field = fields.find((f) => f.name === fieldName);
    if (field) {
      const error = validateField(field, formData[fieldName]);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error || '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    fields.forEach((field) => {
      allTouched[field.name] = true;
    });
    setTouched(allTouched);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render a single field based on its type
  const renderField = (field: FormField) => {
    // Check if field should be shown
    if (field.showWhen && !field.showWhen(formData)) {
      return null;
    }

    const value = formData[field.name] ?? '';
    const error = touched[field.name] && errors[field.name];
    const commonProps = {
      disabled: field.disabled || loading || isSubmitting,
      onBlur: () => handleFieldBlur(field.name),
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
      case 'date':
      case 'time':
      case 'datetime-local':
        return (
          <TextField
            fullWidth
            label={field.label}
            type={field.type}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            helperText={error || field.helperText}
            error={Boolean(error)}
            required={field.required}
            InputLabelProps={{
              shrink: field.type === 'date' || field.type === 'time' || field.type === 'datetime-local' || Boolean(value),
            }}
            sx={{
              ...field.sx,
              '& .MuiInputBase-root': {
                bgcolor: 'white',
              },
              '& .MuiInputBase-input': {
                color: '#111827',
              },
            }}
            {...commonProps}
          />
        );

      case 'textarea':
        return (
          <TextField
            fullWidth
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            helperText={error || field.helperText}
            error={Boolean(error)}
            required={field.required}
            multiline
            rows={field.rows || 4}
            InputLabelProps={{
              shrink: Boolean(value),
            }}
            sx={{
              ...field.sx,
              '& .MuiInputBase-root': {
                bgcolor: 'white',
              },
              '& .MuiInputBase-input': {
                color: '#111827',
              },
            }}
            {...commonProps}
          />
        );

      case 'select':
        return (
          <TextField
            fullWidth
            select
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            helperText={error || field.helperText}
            error={Boolean(error)}
            required={field.required}
            SelectProps={{
              displayEmpty: true,
            }}
            InputLabelProps={{
              shrink: Boolean(value) || Boolean(field.placeholder),
            }}
            sx={{
              ...field.sx,
              '& .MuiInputBase-root': {
                bgcolor: 'white',
              },
              '& .MuiSelect-select': {
                color: value ? '#111827' : '#9CA3AF',
              },
            }}
            {...commonProps}
          >
            {field.placeholder && (
              <MenuItem value="" disabled>
                {field.placeholder}
              </MenuItem>
            )}
            {field.options?.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );

      case 'multiselect':
        return (
          <FormControl fullWidth error={Boolean(error)} required={field.required}>
            <InputLabel shrink={Boolean(value && value.length > 0)}>{field.label}</InputLabel>
            <Select
              multiple
              value={value || []}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              input={<OutlinedInput label={field.label} />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((val) => {
                    const option = field.options?.find((opt) => opt.value === val);
                    return (
                      <Chip key={val} label={option?.label || val} size="small" />
                    );
                  })}
                </Box>
              )}
              sx={{
                bgcolor: 'white',
                '& .MuiSelect-select': {
                  color: '#111827',
                },
              }}
              {...commonProps}
            >
              {field.options?.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {(error || field.helperText) && (
              <FormHelperText>{error || field.helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl
            component="fieldset"
            error={Boolean(error)}
            required={field.required}
            sx={field.sx}
          >
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
            >
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  disabled={option.disabled || field.disabled}
                />
              ))}
            </RadioGroup>
            {(error || field.helperText) && (
              <FormHelperText>{error || field.helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControl error={Boolean(error)} sx={field.sx}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(value)}
                  onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                  {...commonProps}
                />
              }
              label={field.label}
            />
            {(error || field.helperText) && (
              <FormHelperText>{error || field.helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case 'switch':
        return (
          <FormControl error={Boolean(error)} sx={field.sx}>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(value)}
                  onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                  {...commonProps}
                />
              }
              label={field.label}
            />
            {(error || field.helperText) && (
              <FormHelperText>{error || field.helperText}</FormHelperText>
            )}
          </FormControl>
        );

      default:
        return null;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        zIndex: 1300, // Ensure drawer is above AppBar and other components
      }}
      PaperProps={{
        sx: {
          width: width,
          maxWidth: '100%',
          zIndex: 1300,
        },
      }}
      ModalProps={{
        keepMounted: false, // Better performance
        disableScrollLock: false, // Allow body scroll when drawer is open
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          bgcolor: 'white',
          zIndex: 1,
          borderBottom: showDivider ? '1px solid #E5E7EB' : 'none',
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#111827' }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: '#6B7280', mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <IconButton
          onClick={onClose}
          disabled={isSubmitting}
          sx={{
            color: '#6B7280',
            '&:hover': {
              bgcolor: '#F3F4F6',
            },
          }}
        >
          <Close />
        </IconButton>
      </Box>

      {/* Form Fields */}
      <Box
        sx={{
          p: 3,
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
            gap: 2.5,
          }}
        >
          {fields.map((field) => (
            <Box
              key={field.name}
              sx={{
                gridColumn: field.gridColumn || 'span 1',
              }}
            >
              {renderField(field)}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer Actions */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          gap: 2,
          justifyContent: 'flex-end',
          position: 'sticky',
          bottom: 0,
          bgcolor: 'white',
          borderTop: showDivider ? '1px solid #E5E7EB' : 'none',
          zIndex: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isSubmitting}
          sx={{
            textTransform: 'none',
            borderColor: '#E5E7EB',
            color: '#6B7280',
            '&:hover': {
              borderColor: '#D1D5DB',
              bgcolor: '#F9FAFB',
            },
          }}
        >
          {cancelButtonText}
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || isSubmitting}
          sx={{
            textTransform: 'none',
            bgcolor: '#0D9488',
            '&:hover': {
              bgcolor: '#0F766E',
            },
            boxShadow: 'none',
          }}
        >
          {isSubmitting ? 'Saving...' : saveButtonText}
        </Button>
      </Box>
    </Drawer>
  );
};

export default CustomSlideDialog;