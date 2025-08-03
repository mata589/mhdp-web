import { createTheme } from '@mui/material/styles';

// Extend the theme interface to include custom color variants
declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#008080', // Teal
      light: '#4db6b6',
      dark: '#005959',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffa500', // Orange
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
  typography: {
    fontFamily: 'Inter, "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
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