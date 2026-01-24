declare module 'react-date-range' {
    import { ComponentType } from 'react';
  
    export interface Range {
      startDate: Date;
      endDate: Date;
      key: string;
    }
  
    export interface DateRangePickerProps {
      onChange: (item: { [key: string]: Range }) => void;
      showSelectionPreview?: boolean;
      moveRangeOnFirstSelection?: boolean;
      months?: number;
      ranges: Range[];
      direction?: 'horizontal' | 'vertical';
      scroll?: { enabled: boolean };
    }
  
    export const DateRangePicker: ComponentType<DateRangePickerProps>;
  }
  
  declare module 'react-date-range/dist/styles.css';
  declare module 'react-date-range/dist/theme/default.css';