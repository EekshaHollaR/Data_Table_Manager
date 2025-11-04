'use client';

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7, Settings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/redux/features/themeSlice';
import { RootState } from '@/redux/store';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <IconButton
      onClick={() => dispatch(toggleTheme())}
      color="inherit"
      sx={{
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
      }}
    >
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
}
