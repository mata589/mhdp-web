import React, { useState, useMemo } from 'react';
import {
  Paper,
  Typography,
  Box,
  Stack,
  FormControl,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FilterList, Star } from '@mui/icons-material';
import CustomChip from '../common/CustomChip/CustomChip';
import { ActionButtonsGroup } from '../common/ActionButtonsGroup/ActionButtonsGroup';
import type { RiskLevel, CallOutcome } from '../common/CustomChip/CustomChip';

export interface Call {
  id: string;
  dateTime: string;
  caller: string;
  primaryTopic: string;
  riskLevel: RiskLevel;
  outcome: CallOutcome;
  qualityScore: string;
  recordingUrl?: string;
  duration?: string;
  onPlay?: () => void;
  onView?: () => void;
}

export interface CallActivityTableProps {
  calls: Call[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  showPagination?: boolean;
  totalResults?: number;
  currentPage?: number;
  onViewAll?: () => void;
  onPageChange?: (page: number) => void;
}

const formatDateTime = (dateTimeString: string) => {
  const parts = dateTimeString.split(' ');
  const date = `${parts[1]} ${parts[2]} ${parts[3]}`;
  const time = `${parts[4]} ${parts[5]} - ${parts[7]} ${parts[8]}`;
  return { date, time };
};

const CallActivityTable: React.FC<CallActivityTableProps> = ({
  calls,
  title = 'Recent call activity',
  subtitle = 'Your most recent interactions with complete call details',
  showFilters = true,
  showPagination = false,
  totalResults,
  currentPage = 1,
  onViewAll,
  onPageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [statusFilter, setStatusFilter] = useState<string>('All status');
  const [languageFilter, setLanguageFilter] = useState<string>('All languages');

  const filteredCalls = useMemo(() => {
    return calls.filter((call) => {
      const matchesStatus = statusFilter === 'All status' || call.riskLevel === statusFilter;
      const matchesLanguage = languageFilter === 'All languages' || call.caller === languageFilter;
      return matchesStatus && matchesLanguage;
    });
  }, [calls, statusFilter, languageFilter]);

  const displayTotalResults = totalResults ?? filteredCalls.length;
  const displayedCalls = showPagination ? filteredCalls : filteredCalls.slice(0, 10);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        border: '1px solid #f3f4f6',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1.125rem' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            {subtitle}
          </Typography>
        </Box>

        {showFilters && (
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
                }}
              >
                <MenuItem value="All status">All status</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                sx={{
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' },
                }}
              >
                <MenuItem value="All languages">All languages</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="Luganda">Luganda</MenuItem>
                <MenuItem value="Swahili">Swahili</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                borderColor: '#e5e7eb',
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
              }}
            >
              More Filters
            </Button>
          </Box>
        )}
      </Box>

      {/* Desktop: Full Table */}
      {!isMobile ? (
        <TableContainer>
          <Table>
            {/* Table Header */}
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: '#f9fafb',
                  '& th': {
                    fontWeight: 600,
                    color: '#6b7280',
                    fontSize: '0.813rem',
                    py: 1.5,
                  },
                }}
              >
                <TableCell>Date & Time</TableCell>
                <TableCell>Caller ID</TableCell>
                <TableCell>Primary Topic</TableCell>
                <TableCell>Risk level</TableCell>
                <TableCell>Outcome</TableCell>
                <TableCell>Quality Score</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {displayedCalls.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No calls found matching the selected filters
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                displayedCalls.map((call, index) => {
                  const { date, time } = formatDateTime(call.dateTime);
                  return (
                    <TableRow
                      key={`${call.id}-${index}`}
                      sx={{
                        '&:hover': { backgroundColor: '#fafafa' },
                        transition: 'background-color 0.15s',
                        '&:last-child td': { border: 0 },
                      }}
                    >
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                            {date}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                            {time}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                            {call.id}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                            {call.caller}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          {call.primaryTopic}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <CustomChip label={call.riskLevel} variant="risk" />
                      </TableCell>

                      <TableCell>
                        <CustomChip label={call.outcome} variant="outcome" />
                      </TableCell>

                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Star sx={{ color: '#fbbf24', fontSize: 18 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                            {call.qualityScore}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="right">
                        <ActionButtonsGroup onPlay={call.onPlay} onView={call.onView} />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        /* Mobile: Card View */
        <Stack spacing={2}>
          {displayedCalls.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No calls found matching the selected filters
              </Typography>
            </Box>
          ) : (
            displayedCalls.map((call, index) => {
              const { date, time } = formatDateTime(call.dateTime);
              return (
                <Box
                  key={`${call.id}-${index}`}
                  sx={{
                    p: 2,
                    border: '1px solid #f3f4f6',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    '&:hover': { backgroundColor: '#fafafa' },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                        Call {call.id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {call.caller}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <CustomChip label={call.riskLevel} variant="risk" size="small" />
                      <CustomChip label={call.outcome} variant="outcome" size="small" />
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>
                    {call.primaryTopic}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Box>
                      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                        {date}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                        {time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Star sx={{ color: '#fbbf24', fontSize: 16 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {call.qualityScore}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ActionButtonsGroup onPlay={call.onPlay} onView={call.onView} />
                  </Box>
                </Box>
              );
            })
          )}
        </Stack>
      )}

      {/* Footer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 3,
          pt: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            Page
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '0.875rem', color: '#059669', fontWeight: 600 }}
          >
            {currentPage}-{Math.min(currentPage * 10, displayTotalResults)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            of {displayTotalResults} results
          </Typography>
        </Box>

        {showPagination ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              disabled={currentPage === 1}
              onClick={() => onPageChange?.(currentPage - 1)}
              sx={{
                textTransform: 'none',
                fontSize: '0.875rem',
                borderRadius: '6px',
                borderColor: '#e5e7eb',
                color: '#374151',
                '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
                '&:disabled': { borderColor: '#f3f4f6', color: '#9ca3af' },
              }}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              disabled={currentPage * 10 >= displayTotalResults}
              onClick={() => onPageChange?.(currentPage + 1)}
              sx={{
                textTransform: 'none',
                fontSize: '0.875rem',
                borderRadius: '6px',
                borderColor: '#e5e7eb',
                color: '#374151',
                '&:hover': { borderColor: '#d1d5db', backgroundColor: '#f9fafb' },
                '&:disabled': { borderColor: '#f3f4f6', color: '#9ca3af' },
              }}
            >
              Next
            </Button>
          </Box>
        ) : (
          <Button
            variant="text"
            onClick={onViewAll}
            sx={{
              color: '#0891b2',
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '0.875rem',
              '&:hover': { backgroundColor: 'rgba(8, 145, 178, 0.04)' },
            }}
          >
            View All Call History
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default CallActivityTable;
