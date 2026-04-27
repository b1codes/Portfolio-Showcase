/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { createTheme } from '@mui/material/styles';

// Create a theme instance that reflects the original design.
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
        primary: '#ffffff',
        secondary: '#e0e0e0',
    }
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
     h2: {
        fontSize: '2.5rem',
        fontWeight: 700,
    },
     h3: {
        fontSize: '1.5rem',
        color: '#ffffff',
        fontWeight: 500,
    },
     h4: {
        fontSize: '1.25rem',
        fontWeight: 500,
    },
  },
});