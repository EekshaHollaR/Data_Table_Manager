'use client';

import React, { useRef, useState } from 'react';
import { Button, Stack, TextField, Snackbar, Alert } from '@mui/material';
import { CloudUpload, CloudDownload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setRows, updateColumns } from '@/redux/features/tableSlice';
import { importCSV, exportCSV } from '@/utils/csvHelpers';

export default function ImportExportButtons() {
  const dispatch = useDispatch();
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
        direction="row" 
        spacing={2} 
        alignItems="center"
        flexWrap="wrap"
        sx={{ width: '100%' }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleImport}
          style={{ display: 'none' }}
          id="csv-upload"
        />
        <label htmlFor="csv-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUpload />}
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
              borderColor: '#e2e8f0',
              color: '#475569',
              '&:hover': {
                backgroundColor: '#f8fafc',
                borderColor: '#0284c7',
                color: '#0284c7',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Import CSV
          </Button>
        </label>

        <TextField
          size="small"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="Export filename"
          sx={{ 
            width: 200,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              '&:hover fieldset': { 
                borderColor: '#0284c7',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0284c7',
              }
            }
          }}
        />

        <Button
          variant="outlined"
          onClick={handleExport}
          startIcon={<CloudDownload />}
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            borderColor: '#e2e8f0',
            color: '#475569',
            '&:hover': {
              backgroundColor: '#f8fafc',
              borderColor: '#0284c7',
              color: '#0284c7',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Export CSV
        </Button>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
