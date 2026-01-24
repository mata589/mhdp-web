// DateRangeSelector.tsx - Using react-date-range (free library)
import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Popover, Box, Button } from '@mui/material';
import { DateRangePicker as ReactDateRangePicker } from 'react-date-range';
import { format, parse } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface DateRangeSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  sx?: any;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  value = '04/08/2025 - 04/09/2025',
  onChange,
  placeholder = 'Select date range',
  fullWidth = false,
  size = 'small',
  sx = {}
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Parse the display value to Date objects
  const parseDisplayValue = (displayValue: string): { startDate: Date; endDate: Date } => {
    if (!displayValue) {
      return { startDate: new Date(), endDate: new Date() };
    }
    
    const parts = displayValue.split(' - ');
    if (parts.length !== 2) {
      return { startDate: new Date(), endDate: new Date() };
    }
    
    try {
      const startDate = parse(parts[0], 'MM/dd/yyyy', new Date());
      const endDate = parse(parts[1], 'MM/dd/yyyy', new Date());
      return { startDate, endDate };
    } catch {
      return { startDate: new Date(), endDate: new Date() };
    }
  };

  const [dateRange, setDateRange] = useState([
    {
      startDate: parseDisplayValue(value).startDate,
      endDate: parseDisplayValue(value).endDate,
      key: 'selection'
    }
  ]);

  // Format Date objects to display string
  const formatDateRange = (start: Date, end: Date): string => {
    try {
      const startStr = format(start, 'MM/dd/yyyy');
      const endStr = format(end, 'MM/dd/yyyy');
      return `${startStr} - ${endStr}`;
    } catch {
      return '';
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // Reset to current value
    const parsed = parseDisplayValue(value);
    setDateRange([{
      startDate: parsed.startDate,
      endDate: parsed.endDate,
      key: 'selection'
    }]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {
    const { startDate, endDate } = dateRange[0];
    const formattedValue = formatDateRange(startDate, endDate);
    if (formattedValue && onChange) {
      onChange(formattedValue);
    }
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <TextField
        value={value}
        placeholder={placeholder}
        variant="outlined"
        size={size}
        onClick={handleClick}
        sx={{
          width: fullWidth ? '100%' : { xs: '100%', sm: '240px' },
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            fontSize: '0.875rem',
            color: '#374151',
            fontWeight: 400,
            pr: 1,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d1d5db',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0d9488',
              borderWidth: '1px',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d1d5db',
          },
          '& .MuiOutlinedInput-input': {
            cursor: 'pointer',
            padding: '10px 14px',
          },
          ...sx
        }}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" edge="end" sx={{ mr: -0.5 }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          mt: 1,
          '& .MuiPopover-paper': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
          }
        }}
      >
        <Box sx={{ 
          '& .rdrCalendarWrapper': {
            backgroundColor: 'white',
          },
          '& .rdrDateRangePickerWrapper': {
            backgroundColor: 'white',
          },
          '& .rdrDefinedRangesWrapper': {
            display: 'none', // Hide preset ranges
          },
          '& .rdrDateDisplayWrapper': {
            backgroundColor: '#f9fafb',
          },
          '& .rdrDayToday .rdrDayNumber span::after': {
            backgroundColor: '#0d9488',
          },
          '& .rdrDay:not(.rdrDayPassive) .rdrInRange, & .rdrDay:not(.rdrDayPassive) .rdrStartEdge, & .rdrDay:not(.rdrDayPassive) .rdrEndEdge': {
            backgroundColor: '#0d9488',
          },
          '& .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span, & .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span, & .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span': {
            color: 'white',
          },
        }}>
          <ReactDateRangePicker
            onChange={(item: any) => setDateRange([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={dateRange}
            direction="horizontal"
          />

          <Box sx={{ display: 'flex', gap: 1, p: 2, justifyContent: 'flex-end', borderTop: '1px solid #e5e7eb' }}>
            <Button
              onClick={handleCancel}
              sx={{
                textTransform: 'none',
                color: '#6b7280',
                fontSize: '0.875rem',
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              variant="contained"
              sx={{
                textTransform: 'none',
                bgcolor: '#0d9488',
                fontSize: '0.875rem',
                '&:hover': {
                  bgcolor: '#0f766e',
                },
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};