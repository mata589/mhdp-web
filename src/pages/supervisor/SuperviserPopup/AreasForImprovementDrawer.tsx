import React from 'react';
import ReactDOM from 'react-dom';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Alert,
  AlertTitle
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface AreasForImprovementDrawerProps {
  open: boolean;
  onClose: () => void;
}

const agentData = [
  { name: 'James Ogat', avatar: 'J', bgColor: '#CCE5E5', score: '70%', issue: '30%', label: 'Listening' },
  { name: 'Sarah Mukasa', avatar: 'S', bgColor: '#FFE5B2', score: '63%', issue: '34%', label: 'Listening' },
  { name: 'Betty Mirembe', avatar: 'B', bgColor: '#DBE6F0', score: '50%', issue: '50%', label: 'Listening' },
  { name: 'James Ogat', avatar: 'J', bgColor: '#CCE5E5', score: '70%', issue: '21%', label: 'Listening' },
  { name: 'Sarah Mukasa', avatar: 'S', bgColor: '#FFE5B2', score: '63%', issue: '34%', label: 'Listening' },
  { name: 'Betty Mirembe', avatar: 'B', bgColor: '#DBE6F0', score: '50%', issue: '100%', label: 'Listening' },
  { name: 'James Ogat', avatar: 'J', bgColor: '#CCE5E5', score: '70%', issue: '28%', label: 'Listening' },
  { name: 'Betty Mirembe', avatar: 'B', bgColor: '#DBE6F0', score: '50%', issue: '30%', label: 'Listening', hasMenu: true }
];

export default function AreasForImprovementDrawer({ open, onClose }: AreasForImprovementDrawerProps) {
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
            Areas for improvement
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

        {/* Alert Section */}
        <Box sx={{ margin: '16px 20px' }}>
          <Alert 
            severity="error"
            icon={<ErrorOutlineIcon sx={{ fontSize: '16px' }} />}
            sx={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FEE2E2',
              borderRadius: '8px',
              padding: '12px',
              alignItems: 'flex-start',
              '& .MuiAlert-icon': {
                padding: '2px 0 0 0',
                marginRight: '8px',
                color: '#DC2626'
              },
              '& .MuiAlert-message': {
                padding: 0,
                flex: 1
              }
            }}
            action={
              <Typography sx={{ 
                fontSize: '11px', 
                fontWeight: 600, 
                color: '#DC2626',
                whiteSpace: 'nowrap',
                paddingTop: '2px'
              }}>
                High priority
              </Typography>
            }
          >
            <AlertTitle sx={{ 
              fontSize: '13px', 
              fontWeight: 600, 
              color: '#111827',
              marginBottom: '4px',
              marginTop: 0
            }}>
              Active listening skills
            </AlertTitle>
            <Typography sx={{ 
              fontSize: '12px', 
              color: '#6B7280',
              lineHeight: 1.4
            }}>
              10 agents need improvement
            </Typography>
          </Alert>
        </Box>

        {/* Agents Count */}
        <Box sx={{ 
          padding: '12px 20px', 
          backgroundColor: '#F9FAFB',
          borderBottom: '1px solid #E5E7EB'
        }}>
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
                paddingTop: '14px',
                paddingBottom: '14px',
                borderBottom: idx < agentData.length - 1 ? '1px solid #F3F4F6' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {/* Agent Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                <Box sx={{ 
                  width: '28px', 
                  height: '28px', 
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '75px', flex: 1 }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 400, color: '#111827' }}>
                    {agent.name}
                  </Typography>
                  <Typography sx={{ fontSize: '12px', fontWeight: 500, color: '#4682B4' }}>
                    {agent.score}
                  </Typography>
                </Box>
              </Box>

              {/* Issue */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#DC2626' }}>
                  {agent.issue}
                </Typography>
                <Typography sx={{ fontSize: '11px', color: '#6B7280' }}>
                  {agent.label}
                </Typography>
              </Box>

              {/* Menu Icon */}
              {agent.hasMenu && (
                <IconButton sx={{ padding: '4px', marginLeft: '8px', color: '#6B7280' }}>
                  <MoreHorizIcon sx={{ fontSize: '18px' }} />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );

  // Use ReactDOM.createPortal to render outside the layout
  return ReactDOM.createPortal(drawerContent, document.body);
}