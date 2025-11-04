import { createTheme, PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode colors
          primary: {
            main: '#0284c7',
            light: '#38bdf8',
            dark: '#0369a1',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#64748b',
            light: '#94a3b8',
            dark: '#475569',
            contrastText: '#ffffff',
          },
          background: {
            default: '#f8fafc',
            paper: '#ffffff',
          },
          text: {
            primary: '#0f172a',
            secondary: '#475569',
            disabled: '#94a3b8',
          },
          divider: '#e2e8f0',
          error: {
            main: '#dc2626',
            light: '#fee2e2',
          },
          success: {
            main: '#16a34a',
            light: '#dcfce7',
          },
          warning: {
            main: '#d97706',
            light: '#fef3c7',
          },
        }
      : {
          // Dark mode colors
          primary: {
            main: '#38bdf8',
            light: '#7dd3fc',
            dark: '#0284c7',
            contrastText: '#0f172a',
          },
          secondary: {
            main: '#94a3b8',
            light: '#cbd5e1',
            dark: '#64748b',
            contrastText: '#0f172a',
          },
          background: {
            default: '#0f172a',
            paper: '#1e293b',
          },
          text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
            disabled: '#64748b',
          },
          divider: '#334155',
          error: {
            main: '#f87171',
            light: '#7f1d1d',
          },
          success: {
            main: '#4ade80',
            light: '#14532d',
          },
          warning: {
            main: '#fbbf24',
            light: '#78350f',
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: mode === 'light' 
    ? [
        'none',
        '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0 8px 30px rgba(0, 0, 0, 0.12)',
        '0 2px 8px rgba(0, 0, 0, 0.08)',
        '0 4px 12px rgba(0, 0, 0, 0.15)',
        ...Array(15).fill('0 1px 3px 0 rgba(0, 0, 0, 0.1)'),
      ]
    : [
        'none',
        '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        '0 1px 3px 0 rgba(0, 0, 0, 0.4)',
        '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
        '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
        '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        '0 8px 30px rgba(0, 0, 0, 0.3)',
        '0 2px 8px rgba(0, 0, 0, 0.25)',
        '0 4px 12px rgba(0, 0, 0, 0.35)',
        ...Array(15).fill('0 1px 3px 0 rgba(0, 0, 0, 0.3)'),
      ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)',
            transition: 'all 0.2s ease-in-out',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: mode === 'light' ? '1px solid #e2e8f0' : '1px solid #334155',
        },
        head: {
          fontWeight: 600,
          backgroundColor: mode === 'light' ? '#f8fafc' : '#1e293b',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: mode === 'light' ? '#0284c7' : '#38bdf8',
            },
          },
        },
      },
    },
  },
});
