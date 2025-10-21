import { createTheme } from '@mui/material/styles';

// Extend the theme interface to include custom color variants
declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
  }

  interface Palette {
    status: {
      available: string;
      busy: string;
      away: string;
      offline: string;
    };
  }

  interface PaletteOptions {
    status?: {
      available?: string;
      busy?: string;
      away?: string;
      offline?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#008080', 
      light: '#4db6b6',
      dark: '#005959',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffa500', 
      light: '#ffcc66',
      dark: '#cc7700',
      contrastText: '#000000',
    },
    info: {
      main: '#607d8b', // Steel blue
      light: '#8eacbb',
      dark: '#455a64',
    },
    error: {
      main: '#f44336', // Red for critical alerts
      lighter: '#ffebee', // Light red background for hover states
    },
    warning: {
      main: '#ff9800', // Yellow for warnings
    },
    success: {
      main: '#4caf50', // Green for stable states
    },
    status: {
      available: '#4ade80', // Green for available
      busy: '#f59e0b',      // Amber for busy
      away: '#ef4444',      // Red for away
      offline: '#6b7280'    // Gray for offline
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: 'Inter, "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      [createTheme().breakpoints.down('md')]: {
        fontSize: '2rem',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1.75rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      [createTheme().breakpoints.down('md')]: {
        fontSize: '1.75rem',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      [createTheme().breakpoints.down('md')]: {
        fontSize: '1.5rem',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1.25rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      [createTheme().breakpoints.down('md')]: {
        fontSize: '1.25rem',
      },
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1.125rem',
      },
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '1.125rem',
      },
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '0.875rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '0.875rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      [createTheme().breakpoints.down('sm')]: {
        fontSize: '0.75rem',
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #e0e0e0',
          boxShadow: 'none',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '0 8px',
          '&.Mui-selected': {
            backgroundColor: '#008080',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#005959',
            },
            '& .MuiListItemIcon-root': {
              color: '#ffffff',
            },
          },
        },
      },
    },
  },
});