import React from 'react';
import ReactDOM from 'react-dom';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

interface CallAgentLeaderboardProps {
  open: boolean;
  onClose: () => void;
}

const agentData = [
  { rank: '#1', name: 'James Ojat', avatar: 'J', bgColor: '#CCE5E5', calls: '196 calls handled', score: '85%', critical: '23 critical' },
  { rank: '#2', name: 'Sarah Mukasa', avatar: 'S', bgColor: '#FFE5B2', calls: '142 calls handled', score: '80%', critical: '18 critical' },
  { rank: '#3', name: 'Mark John', avatar: 'M', bgColor: '#E8E8F5', calls: '198 calls handled', score: '95%', critical: '21 critical' },
  { rank: '#4', name: 'James Ojat', avatar: 'J', bgColor: '#CCE5E5', calls: '196 calls handled', score: '85%', critical: '23 critical' },
  { rank: '#5', name: 'Sarah Mukasa', avatar: 'S', bgColor: '#FFE5B2', calls: '142 calls handled', score: '80%', critical: '18 critical' },
  { rank: '#6', name: 'Mark John', avatar: 'M', bgColor: '#E8E8F5', calls: '198 calls handled', score: '95%', critical: '21 critical' },
  { rank: '#7', name: 'James Ojat', avatar: 'J', bgColor: '#CCE5E5', calls: '196 calls handled', score: '85%', critical: '23 critical' },
  { rank: '#8', name: 'Sarah Mukasa', avatar: 'S', bgColor: '#FFE5B2', calls: '142 calls handled', score: '80%', critical: '18 critical' },
  { rank: '#9', name: 'Mark John', avatar: 'M', bgColor: '#E8E8F5', calls: '138 calls handled', score: '95%', critical: '21 critical' }
];

export default function CallAgentLeaderboard({ open, onClose }: CallAgentLeaderboardProps) {
  const handleClose = () => {
    onClose();
  };

  const drawerContent = open ? (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      container={() => document.body}
      disablePortal={false}
      BackdropProps={{
        sx: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1300
        }
      }}
      ModalProps={{
        container: document.body,
        keepMounted: false
      }}
      PaperProps={{
        sx: {
          width: '400px',
          backgroundColor: '#ffffff',
          height: '100vh',
          position: 'fixed',
          right: 0,
          top: 0,
          zIndex: 1301
        }
      }}
      sx={{
        position: 'fixed',
        zIndex: 1300
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          padding: '16px 20px', 
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography sx={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#111827'
          }}>
            Call agent leaderboard
          </Typography>
          <IconButton 
            onClick={handleClose}
            sx={{ 
              padding: '4px',
              '&:hover': { backgroundColor: '#F3F4F6' }
            }}
          >
            <CloseIcon sx={{ fontSize: '18px', color: '#6B7280' }} />
          </IconButton>
        </Box>

        {/* Search */}
        <Box sx={{ padding: '16px 20px' }}>
          <TextField
            fullWidth
            placeholder="Search agent name"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: '18px', color: '#9CA3AF' }} />
                </InputAdornment>
              ),
              sx: {
                fontSize: '13px',
                backgroundColor: '#ffffff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E5E7EB'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4682B4',
                  borderWidth: '1px'
                }
              }
            }}
            inputProps={{
              sx: {
                padding: '8px 8px 8px 0',
                fontSize: '13px',
                color: '#111827',
                '&::placeholder': {
                  color: '#9CA3AF',
                  opacity: 1
                }
              }
            }}
          />
        </Box>

        {/* Agents Count & Header */}
        <Box sx={{ padding: '0 20px' }}>
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <Typography sx={{ 
              fontSize: '12px', 
              fontWeight: 600, 
              color: '#111827' 
            }}>
              Agents
            </Typography>
            <Chip 
              label="100"
              size="small"
              sx={{
                height: '20px',
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: '#F3F4F6',
                color: '#6B7280',
                '& .MuiChip-label': {
                  padding: '0 8px'
                }
              }}
            />
          </Box>

          {/* Table Header */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: '40px 1fr 140px',
            gap: '12px',
            paddingBottom: '8px',
            borderBottom: '1px solid #E5E7EB'
          }}>
            <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#6B7280' }}>
              Rank
            </Typography>
            <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#6B7280' }}>
              Agent
            </Typography>
            <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textAlign: 'right' }}>
              Conversation quality
            </Typography>
          </Box>
        </Box>

        {/* Agent List */}
        <Box sx={{ 
          flex: 1, 
          overflowY: 'auto',
          padding: '0 20px'
        }}>
          {agentData.map((agent, idx) => (
            <Box 
              key={idx} 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: '40px 1fr 140px',
                gap: '12px',
                alignItems: 'center',
                paddingTop: '12px',
                paddingBottom: '12px',
                borderBottom: idx < agentData.length - 1 ? '1px solid #F3F4F6' : 'none'
              }}
            >
              {/* Rank */}
              <Typography sx={{ 
                fontSize: '13px', 
                fontWeight: 600, 
                color: '#111827' 
              }}>
                {agent.rank}
              </Typography>

              {/* Agent Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Box sx={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: agent.bgColor,
                  color: '#111827',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '13px', 
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                  {agent.avatar}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                  <Typography sx={{ 
                    fontSize: '13px', 
                    fontWeight: 500, 
                    color: '#111827',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {agent.name}
                  </Typography>
                  <Typography sx={{ 
                    fontSize: '11px', 
                    color: '#6B7280',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {agent.calls}
                  </Typography>
                </Box>
              </Box>

              {/* Score & Critical */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-end',
                gap: '2px'
              }}>
                <Typography sx={{ 
                  fontSize: '13px', 
                  fontWeight: 600, 
                  color: '#4682B4' 
                }}>
                  {agent.score}
                </Typography>
                <Typography sx={{ 
                  fontSize: '11px', 
                  color: '#6B7280' 
                }}>
                  {agent.critical}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Footer */}
        <Box sx={{ 
          padding: '16px 20px', 
          borderTop: '1px solid #E5E7EB'
        }}>
          <button
            onClick={handleClose}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#ffffff',
              color: '#4682B4',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F9FAFB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            Close
          </button>
        </Box>
      </Box>
    </Drawer>
  ) : null;

  return open && ReactDOM.createPortal(drawerContent, document.body);
}