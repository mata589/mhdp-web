import React from 'react';
import ReactDOM from 'react-dom';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

interface QualityMetricsPopupProps {
  open: boolean;
  onClose: () => void;
}

const agentData = [
  {
    name: 'James Ogat',
    avatar: 'J',
    badge: '80%',
    bgColor: '#CCE5E5',
    textColor: '#111827',
    metrics: [
      { label: 'Rapport', value: '88%' },
      { label: 'Listening', value: '78%' },
      { label: 'Analyzing', value: '78%' },
      { label: 'Motivating', value: '79%' },
      { label: 'Ending', value: '80%' }
    ]
  },
  {
    name: 'Sarah Mukasa',
    avatar: 'S',
    badge: '87%',
    bgColor: '#FFE5B2',
    textColor: '#111827',
    metrics: [
      { label: 'Rapport', value: '90%' },
      { label: 'Listening', value: '84%' },
      { label: 'Analyzing', value: '92%' },
      { label: 'Motivating', value: '89%' },
      { label: 'Ending', value: '88%' }
    ]
  },
  {
    name: 'Betty Mirembe',
    avatar: 'B',
    badge: '70%',
    bgColor: '#DBE6F0',
    textColor: '#111827',
    metrics: [
      { label: 'Rapport', value: '80%' },
      { label: 'Listening', value: '82%' },
      { label: 'Analyzing', value: '82%' },
      { label: 'Motivating', value: '80%' },
      { label: 'Ending', value: '73%' }
    ]
  },
  {
    name: 'James Ogat',
    avatar: 'J',
    badge: '80%',
    bgColor: '#CCE5E5',
    textColor: '#111827',
    metrics: [
      { label: 'Rapport', value: '86%' },
      { label: 'Listening', value: '76%' },
      { label: 'Analyzing', value: '78%' },
      { label: 'Motivating', value: '79%' },
      { label: 'Ending', value: '80%' }
    ]
  },
  {
    name: 'Sarah Mukasa',
    avatar: 'S',
    badge: '87%',
    bgColor: '#FFE5B2',
    textColor: '#111827',
    metrics: [
      { label: 'Rapport', value: '90%' },
      { label: 'Listening', value: '84%' },
      { label: 'Analyzing', value: '92%' },
      { label: 'Motivating', value: '89%' },
      { label: 'Ending', value: '88%' }
    ]
  }
];

export default function QualityMetricsPopup({ open, onClose }: QualityMetricsPopupProps) {
  if (!open) return null;

  const drawerContent = (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
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
          <IconButton 
            onClick={onClose}
            sx={{ 
              padding: '4px',
              '&:hover': { backgroundColor: '#F3F4F6' }
            }}
          >
            <CloseIcon sx={{ fontSize: '18px', color: '#6B7280' }} />
          </IconButton>
          <Typography sx={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#111827',
            flex: 1,
            textAlign: 'center',
            marginLeft: '8px',
            marginRight: '8px'
          }}>
            Conversation quality score
          </Typography>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffffff',
              color: '#4682B4',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
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

        {/* Search */}
        <Box sx={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB' }}>
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

        {/* Agent Count */}
        <Box sx={{ padding: '12px 20px', backgroundColor: '#F9FAFB' }}>
          <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>
            Agents 10
          </Typography>
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
                paddingTop: '16px',
                paddingBottom: '16px',
                borderBottom: idx < agentData.length - 1 ? '1px solid #F3F4F6' : 'none'
              }}
            >
              {/* Agent Header */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Box sx={{ 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%', 
                    backgroundColor: agent.bgColor,
                    color: agent.textColor,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '13px', 
                    fontWeight: 600 
                  }}>
                    {agent.avatar}
                  </Box>
                  <Typography sx={{ 
                    fontSize: '13px', 
                    fontWeight: 400, 
                    color: '#111827' 
                  }}>
                    {agent.name}
                  </Typography>
                </Box>
                <Typography sx={{ 
                  fontSize: '13px', 
                  color: '#14b8a6', 
                  fontWeight: 600 
                }}>
                  {agent.badge}
                </Typography>
              </Box>

              {/* Metrics */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                {agent.metrics.map((metric, midx) => (
                  <Box 
                    key={midx} 
                    sx={{ 
                      textAlign: 'center',
                      flex: '1',
                      minWidth: 0
                    }}
                  >
                    <Typography sx={{ 
                      fontSize: '13px', 
                      fontWeight: 600, 
                      color: '#4682B4',
                      marginBottom: '2px',
                      lineHeight: 1.2
                    }}>
                      {metric.value}
                    </Typography>
                    <Typography sx={{ 
                      fontSize: '10px', 
                      color: '#6B7280',
                      fontWeight: 400,
                      lineHeight: 1.2
                    }}>
                      {metric.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>


      </Box>
    </Drawer>
  );

  // Use ReactDOM.createPortal to render outside the layout
  return ReactDOM.createPortal(drawerContent, document.body);
}