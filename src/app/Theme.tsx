'use client'
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    
    primary: {
      main: '#1e6f9e', // Custom primary color
      light: '#6161d3', // Lighter shade of primary color
      dark: '#0d0d0d', // Darker shade of primary color
      contrastText: '#ffffff', // Text color to contrast with primary
    },
    secondary: {
      main: '#393939', // Custom secondary color
      light: '#6161d3',
      dark: '#c41c00',
      contrastText: '#000000',
    },
    error: {
      main: '#d32f2f', // Error color
    },
    warning: {
      main: '#ffa000', // Warning color
    },
    info: {
      main: '#1976d2', // Info color
    },
    success: {
      main: '#388e3c', // Success color
    },
    background: {
      default: '#1b1b1a', // Page background color
      paper: '#262727', // Background of paper elements
    },
    text: {
      primary: '#ffffff', // Default text color
      secondary: '#555455', // Secondary text color
    },
  },
});

export default theme;