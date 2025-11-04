'use client';

import { useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ReduxProvider } from '@/redux/provider';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getTheme } from '@/utils/theme';
import { colorPalette } from '@/utils/colorTheme';
import { typography } from '@/utils/typography';

import './globals.css';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Dynamic Data Table Manager</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto+Flex:opsz,wght@8..144,300;8..144,400;8..144;
500;8..144,600;8..144;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body>
        <ReduxProvider>
          <ThemeWrapper>{children}</ThemeWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
