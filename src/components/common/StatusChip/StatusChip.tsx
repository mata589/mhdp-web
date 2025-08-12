import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface StatusChipProps {
  status: 'Available' | 'Busy' | 'Away' | 'Offline' | 'Break';
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const theme = useTheme();
  
  const statusStyles = {
    'Available': {
      backgroundColor: 'rgba(74, 222, 128, 0.1)', // Light green transparent
      borderColor: '#22c55e', // Darker green border
      color: '#15803d', // Dark green text
      dotColor: '#22c55e' // Green dot
    },
    'Busy': {
      backgroundColor: 'rgba(245, 158, 11, 0.1)', // Light amber transparent
      borderColor: '#f59e0b', // Amber border
      color: '#d97706', // Dark amber text
      dotColor: '#f59e0b' // Amber dot
    },
    'Away': {
      backgroundColor: 'rgba(239, 68, 68, 0.1)', // Light red transparent
      borderColor: '#ef4444', // Red border
      color: '#dc2626', // Dark red text
      dotColor: '#ef4444' // Red dot
    },
    'Offline': {
      backgroundColor: 'rgba(107, 114, 128, 0.1)', // Light gray transparent
      borderColor: '#6b7280', // Gray border
      color: '#4b5563', // Dark gray text
      dotColor: '#6b7280' // Gray dot
    },
    'Break': {
      backgroundColor: 'rgba(96, 125, 139, 0.1)', // Light steel blue transparent
      borderColor: '#607d8b', // Steel blue border
      color: '#455a64', // Dark steel blue text
      dotColor: '#607d8b' // Steel blue dot
    }
  };

  const currentStyle = statusStyles[status];

  return (
    <Chip 
      label={status}
      sx={{ 
        backgroundColor: currentStyle.backgroundColor,
        color: currentStyle.color,
        border: `2px solid ${currentStyle.borderColor}`,
        fontWeight: 700, // Bold text
        fontSize: '0.75rem',
        '& .MuiChip-label': {
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 700,
          '&::before': {
            content: '""',
            width: '8px',
            height: '8px',
            backgroundColor: currentStyle.dotColor,
            borderRadius: '50%'
          }
        }
      }}
    />
  );
};

export default StatusChip;