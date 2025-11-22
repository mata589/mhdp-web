// src/components/SearchFilterBar/SearchFilterBar.tsx
import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
export interface FilterOption {
  value: string;
  label: string;
}
interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions: FilterOption[];
  showFilter?: boolean;
}
export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filterValue,
  onFilterChange,
  filterOptions,
  showFilter = true,
}) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2, 
      mb: 3, 
      justifyContent: 'space-between',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'stretch', sm: 'center' }
    }}>
      <TextField
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          width: { xs: '100%', sm: 510 },
          bgcolor: 'white',
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#9ca3af' }} />
            </InputAdornment>
          ),
        }}
      />
      {showFilter && (
        <FormControl sx={{ 
          minWidth: { xs: '100%', sm: 150 }, 
          bgcolor: 'white', 
          borderRadius: 3,
          width: { xs: '100%', sm: 'auto' }
        }}>
          <Select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: 3,
            }}
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};
