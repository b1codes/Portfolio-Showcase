/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { createTheme } from '@mui/material/styles';

// Create a theme instance that reflects the original design with added polish.
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A26BFA', // Slightly more vibrant purple
    },
    secondary: {
      main: '#05E0C9', // Brighter teal for high contrast
    },
    background: {
      default: '#0B0910', // Deep tinted neutral
      paper: 'rgba(22, 18, 33, 0.65)', // Translucent dark purple for glassmorphism
    },
    text: {
        primary: '#F0EEF6',
        secondary: '#9A92B3',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
     h2: {
        fontSize: '2.25rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
    },
     h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
        color: '#F0EEF6',
    },
     h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
    },
    h5: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.5,
    },
    body1: {
        lineHeight: 1.6,
    },
    body2: {
        lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.15)',
          background: 'rgba(255, 255, 255, 0.02)',
        }
      }
    }
  }
});