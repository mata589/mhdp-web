// DateRangeExportToolbar.tsx
import React from 'react';
import { Box } from '@mui/material';
import { ExportButton } from '../ExportButton/ExportButton';
import { DateRangeSelector } from '../DateRangeSelector/DateRangeSelector';

interface DateRangeExportToolbarProps {
  dateValue?: string;
  onDateChange?: (value: string) => void;
  onExport?: () => void;
  exportLabel?: string;
  showExport?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const DateRangeExportToolbar: React.FC<DateRangeExportToolbarProps> = ({
  dateValue,
  onDateChange,
  onExport,
  exportLabel = 'Export report',
  showExport = true,
  orientation = 'horizontal'
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexDirection: orientation === 'vertical' ? 'column' : { xs: 'column', sm: 'row' },
        width: orientation === 'vertical' ? '100%' : { xs: '100%', sm: 'auto' },
      }}
    >
      <DateRangeSelector
        value={dateValue}
        onChange={onDateChange}
        fullWidth={orientation === 'vertical'}
      />
      {showExport && (
        <ExportButton
          onClick={onExport}
          label={exportLabel}
          fullWidth={orientation === 'vertical'}
        />
      )}
    </Box>
  );
};