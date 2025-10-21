// src/components/common/DataTable/DataTable.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
} from '@mui/material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
  renderCell?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onRowClick?: (row: any) => void;
  isLoading?: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  title,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onRowClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    // Mobile Card Layout
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {title && (
          <Box p={2}>
            <Typography variant="h6">{title}</Typography>
          </Box>
        )}
        <Box sx={{ p: 2 }}>
          {data.map((row, index) => (
            <Card
              key={index}
              sx={{
                mb: 2,
                cursor: onRowClick ? 'pointer' : 'default',
                '&:hover': onRowClick ? { boxShadow: 2 } : {},
              }}
              onClick={() => onRowClick?.(row)}
            >
              <CardContent>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <Box key={column.id} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        {column.label}:
                      </Typography>
                      <Box>
                        {column.renderCell
                          ? column.renderCell(value, row)
                          : column.format
                          ? column.format(value)
                          : value}
                      </Box>
                    </Box>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </Box>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          onRowsPerPageChange={(event) =>
            onRowsPerPageChange(parseInt(event.target.value, 10))
          }
          sx={{
            '& .MuiTablePagination-toolbar': {
              flexDirection: 'column',
              gap: 1,
            },
            '& .MuiTablePagination-spacer': {
              display: 'none',
            },
          }}
        />
      </Paper>
    );
  }

  // Desktop Table Layout
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {title && (
        <Box p={2}>
          <Typography variant="h6">{title}</Typography>
        </Box>
      )}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="data table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={index}
                onClick={() => onRowClick?.(row)}
                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.renderCell
                        ? column.renderCell(value, row)
                        : column.format
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(event) =>
          onRowsPerPageChange(parseInt(event.target.value, 10))
        }
      />
    </Paper>
  );
};