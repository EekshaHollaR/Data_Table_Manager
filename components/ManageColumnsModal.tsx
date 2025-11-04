'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  toggleColumnVisibility,
  addColumn,
  removeColumn,
} from '@/redux/features/tableSlice';
import { ColumnConfig } from '@/types/table.types';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ManageColumnsModal({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.table.columns);
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnField, setNewColumnField] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddColumn = () => {
    if (!newColumnName.trim() || !newColumnField.trim()) {
      setErrorMessage('Both field and name are required');
      return;
    }

    // Check for duplicate columns
    if (columns.some(col => col.field === newColumnField)) {
      setErrorMessage('A column with this field already exists');
      return;
    }

    const newColumn: ColumnConfig = {
      id: newColumnField.toLowerCase().replace(/\s+/g, '_'),
      label: newColumnName,
      field: newColumnField,
      visible: true,
      editable: true,
      order: columns.length,
    };

    dispatch(addColumn(newColumn));
    setNewColumnName('');
    setNewColumnField('');
    setErrorMessage('');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12)',
          backgroundImage: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
        }
      }}
    >
      <DialogTitle sx={{ 
        borderBottom: '1px solid #e2e8f0',
        fontWeight: 700,
        color: 'secondary.main',
      }}>
        Manage Columns
      </DialogTitle>
      
      <DialogContent sx={{ 
        p: 3,
        '&::-webkit-scrollbar': { width: '8px' },
        '&::-webkit-scrollbar-track': { background: '#f1f5f9' },
        '&::-webkit-scrollbar-thumb': { background: '#cbd5e1', borderRadius: '4px' },
      }}>
        <Stack spacing={3}>
          {/* Add New Column Section */}
          <Paper sx={{ 
            p: 2, 
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Add New Column
            </Typography>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <TextField
                label="Column Name"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                placeholder="Display name"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    fontWeight: 500,
                  },
                }}
              />
              <TextField
                label="Field Name"
                value={newColumnField}
                onChange={(e) => setNewColumnField(e.target.value)}
                placeholder="Data field"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    fontWeight: 500,
                  },
                }}
                helperText="No spaces, lowercase, e.g. 'department'"
              />
              <Button
                variant="contained"
                onClick={handleAddColumn}
                startIcon={<Add />}
                sx={{
                  minWidth: '60px',
                  borderRadius: '10px',
                  height: '56px',
                  fontWeight: 600,
                  boxShadow: 'none',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Add
              </Button>
            </Stack>
            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errorMessage}
              </Typography>
            )}
          </Paper>

          {/* Existing Columns List */}
          <Paper sx={{ 
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            
          }}>
            <List sx={{ p: 0 }}>
              <ListItem 
                divider
                sx={{ 
                  backgroundColor: '#f8fafc', 
                  py: 1.5,
                  px: 2,
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight="bold">
                      Column Name
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      Visible in data preview
                    </Typography>
                  }
                />
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight="bold">
                      Field
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      Data identifier
                    </Typography>
                  }
                  sx={{ mx: 2 }}
                />
                <Typography variant="subtitle2" fontWeight="bold" sx={{ minWidth: 100, textAlign: 'center' }}>
                  Visible
                </Typography>
                <Box sx={{ width: 40 }} />
              </ListItem>

              {columns.map((column) => (
                <ListItem
                  key={column.id}
                  divider
                  sx={{ 
                    py: 1, 
                    px: 2,
                    '&:hover': { 
                      backgroundColor: '#f8fafc',
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={500}>
                        {column.label}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {column.field}
                      </Typography>
                    }
                    sx={{ 
                      mr: 2,
                      pr: 1,
                      borderRight: '1px solid #e2e8f0',
                    }}
                  />
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 200 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={column.visible}
                          onChange={() => dispatch(toggleColumnVisibility(column.id))}
                          size="small"
                        />
                      }
                      label=""
                      sx={{ m: 0 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => dispatch(removeColumn(column.id))}
                      sx={{ 
                        color: 'error.main',
                        '&:hover': {
                          backgroundColor: 'error.lighter',
                          transform: 'scale(1.1)',
                        }
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </ListItem>
              ))}

              {columns.length === 0 && (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
                        No columns added yet. Start by adding a new column above.
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ 
        borderTop: '1px solid #e2e8f0', 
        p: 3, 
        backgroundColor: '#f8fafc' 
      }}>
        <Button 
          onClick={onClose}
          variant="text"
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
