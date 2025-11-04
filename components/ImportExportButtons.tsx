'use client';

import React, { useRef, useState } from 'react';
import { 
  Button, 
  Stack, 
  TextField, 
  Snackbar, 
  Alert,
  useTheme,
  Box,
  Typography,
} from '@mui/material';
import { CloudUpload, CloudDownload, InsertDriveFile } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setRows, updateColumns } from '@/redux/features/tableSlice';
import { importCSV, exportCSV } from '@/utils/csvHelpers';

export default function ImportExportButtons() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { rows, columns } = useSelector((state: RootState) => state.table);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('table-export.csv');
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    importCSV(
      file,
      (data, importedColumns) => {
        dispatch(setRows(data));
        
        // Merge imported columns with existing ones, avoiding duplicates
        const existingColumnIds = new Set(columns.map(col => col.id));
        const newColumns = importedColumns.filter(col => !existingColumnIds.has(col.id));
        const mergedColumns = [...columns, ...newColumns];
        
        dispatch(updateColumns(mergedColumns));
        
        setSnackbar({
          open: true,
          message: `Successfully imported ${data.length} rows with ${importedColumns.length} columns`,
          severity: 'success',
        });
      },
      (error) => {
        setSnackbar({
          open: true,
          message: error,
          severity: 'error',
        });
      }
    );

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExport = () => {
    if (rows.length === 0) {
      setSnackbar({
        open: true,
        message: 'No data to export',
        severity: 'error',
      });
      return;
    }

    try {
      exportCSV(rows, columns, filename);
      setSnackbar({
        open: true,
        message: `Successfully exported ${rows.length} rows`,
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to export CSV file',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Stack 
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2} 
        alignItems={{ xs: 'stretch', sm: 'center' }}
        flexWrap="wrap"
        sx={{ width: '100%' }}
      >
        {/* Import Button */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleImport}
          style={{ display: 'none' }}
          id="csv-upload"
        />
        <label htmlFor="csv-upload" style={{ display: 'flex', flex: { xs: 1, sm: 'initial' } }}>
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUpload />}
            fullWidth
            sx={{ 
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 500,
              py: 1,
              px: 2.5,
              borderWidth: '1.5px',
              borderColor: isDark ? '#475569' : '#cbd5e1',
              color: isDark ? '#cbd5e1' : '#475569',
              backgroundColor: isDark ? 'rgba(51, 65, 85, 0.3)' : '#ffffff',
              '&:hover': {
                borderWidth: '1.5px',
                backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.05)',
                borderColor: isDark ? '#38bdf8' : '#0284c7',
                color: isDark ? '#38bdf8' : '#0284c7',
                transform: 'translateY(-2px)',
                boxShadow: isDark 
                  ? '0 4px 12px rgba(56, 189, 248, 0.2)' 
                  : '0 4px 12px rgba(2, 132, 199, 0.15)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Import CSV
          </Button>
        </label>

        {/* Filename Input */}
        <TextField
          size="small"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="filename.csv"
          InputProps={{
            startAdornment: (
              <InsertDriveFile 
                sx={{ 
                  mr: 1, 
                  fontSize: '1.2rem',
                  color: isDark ? '#94a3b8' : '#64748b',
                }} 
              />
            ),
          }}
          sx={{ 
            flex: { xs: 1, sm: 'initial' },
            minWidth: { xs: '100%', sm: '220px' },
            maxWidth: { xs: '100%', sm: '280px' },
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: isDark ? 'rgba(51, 65, 85, 0.3)' : '#ffffff',
              fontWeight: 500,
              '& fieldset': {
                borderWidth: '1.5px',
                borderColor: isDark ? '#475569' : '#cbd5e1',
              },
              '&:hover fieldset': { 
                borderColor: isDark ? '#38bdf8' : '#0284c7',
              },
              '&.Mui-focused fieldset': {
                borderWidth: '1.5px',
                borderColor: isDark ? '#38bdf8' : '#0284c7',
                boxShadow: isDark 
                  ? '0 0 0 3px rgba(56, 189, 248, 0.15)' 
                  : '0 0 0 3px rgba(2, 132, 199, 0.1)',
              },
              '& input': {
                color: isDark ? '#f1f5f9' : '#0f172a',
                fontWeight: 500,
              },
            },
          }}
        />

        {/* Export Button */}
        <Button
          variant="contained"
          onClick={handleExport}
          startIcon={<CloudDownload />}
          sx={{ 
            borderRadius: '10px',
            textTransform: 'none',
            fontWeight: 600,
            py: 1,
            px: 3,
            boxShadow: 'none',
            flex: { xs: 1, sm: 'initial' },
            backgroundColor: isDark ? '#38bdf8' : '#0284c7',
            color: isDark ? '#0f172a' : '#ffffff',
            '&:hover': {
              backgroundColor: isDark ? '#7dd3fc' : '#0369a1',
              transform: 'translateY(-2px)',
              boxShadow: isDark 
                ? '0 4px 12px rgba(56, 189, 248, 0.3)' 
                : '0 4px 12px rgba(2, 132, 199, 0.2)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Export CSV
        </Button>
      </Stack>

      {/* Enhanced Snackbar with Dark Mode Support */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          icon={snackbar.severity === 'success' ? '✓' : '⚠'}
          sx={{ 
            borderRadius: '10px',
            fontWeight: 500,
            minWidth: '300px',
            boxShadow: isDark 
              ? '0 8px 24px rgba(0, 0, 0, 0.4)' 
              : '0 4px 12px rgba(0, 0, 0, 0.15)',
            ...(snackbar.severity === 'success' && {
              backgroundColor: isDark ? '#4ade80' : '#16a34a',
              color: isDark ? '#0f172a' : '#ffffff',
            }),
            ...(snackbar.severity === 'error' && {
              backgroundColor: isDark ? '#f87171' : '#dc2626',
              color: '#ffffff',
            }),
            '& .MuiAlert-icon': {
              color: snackbar.severity === 'success' 
                ? (isDark ? '#0f172a' : '#ffffff')
                : '#ffffff',
              fontSize: '1.5rem',
            },
            '& .MuiAlert-message': {
              fontSize: '0.95rem',
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
