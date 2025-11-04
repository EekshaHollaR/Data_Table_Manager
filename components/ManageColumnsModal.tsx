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
  Divider,
  useTheme,
} from '@mui/material';
import { Delete, Add, ViewColumn } from '@mui/icons-material';
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
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddColumn();
    }
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
          boxShadow: isDark 
            ? '0 16px 48px rgba(0, 0, 0, 0.5)' 
            : '0 16px 48px rgba(0, 0, 0, 0.12)',
          background: isDark 
            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
            : 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
          border: isDark ? '1px solid #334155' : 'none',
        }
      }}
    >
      <DialogTitle sx={{ 
        borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
        fontWeight: 700,
        color: isDark ? '#f1f5f9' : '#0f172a',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        pb: 2,
      }}>
        <ViewColumn sx={{ 
          color: isDark ? '#38bdf8' : '#0284c7',
          fontSize: '1.75rem',
        }} />
        <Box>
          <Typography variant="h6" component="span" fontWeight={700}>
            Manage Columns
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: isDark ? '#94a3b8' : '#64748b',
              fontWeight: 400,
            }}
          >
            Add, remove, or toggle column visibility
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ 
        p: 3,
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
      }}>
        <Stack spacing={3}>
          {/* Add New Column Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 2.5, 
              borderRadius: '12px',
              border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
              backgroundColor: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(248, 250, 252, 0.5)',
              boxShadow: isDark 
                ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                : '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Add sx={{ 
                  color: isDark ? '#4ade80' : '#16a34a',
                  fontSize: '1.25rem',
                }} />
                <Typography 
                  variant="subtitle1" 
                  fontWeight={600}
                  sx={{ color: isDark ? '#f1f5f9' : '#0f172a' }}
                >
                  Add New Column
                </Typography>
              </Box>
              
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <TextField
                  label="Column Name"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., Department"
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      '& fieldset': {
                        borderColor: isDark ? '#475569' : '#e2e8f0',
                      },
                      '&:hover fieldset': {
                        borderColor: isDark ? '#38bdf8' : '#0284c7',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: isDark ? '#38bdf8' : '#0284c7',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: isDark ? '#94a3b8' : '#64748b',
                    },
                    '& .MuiInputBase-input': {
                      color: isDark ? '#f1f5f9' : '#0f172a',
                    },
                  }}
                />
                <TextField
                  label="Field Name"
                  value={newColumnField}
                  onChange={(e) => setNewColumnField(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., department"
                  fullWidth
                  size="small"
                  helperText="Lowercase, no spaces"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      '& fieldset': {
                        borderColor: isDark ? '#475569' : '#e2e8f0',
                      },
                      '&:hover fieldset': {
                        borderColor: isDark ? '#38bdf8' : '#0284c7',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: isDark ? '#38bdf8' : '#0284c7',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: isDark ? '#94a3b8' : '#64748b',
                    },
                    '& .MuiInputBase-input': {
                      color: isDark ? '#f1f5f9' : '#0f172a',
                    },
                    '& .MuiFormHelperText-root': {
                      color: isDark ? '#64748b' : '#94a3b8',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddColumn}
                  startIcon={<Add />}
                  sx={{
                    minWidth: '120px',
                    borderRadius: '8px',
                    height: '40px',
                    fontWeight: 600,
                    boxShadow: 'none',
                    backgroundColor: isDark ? '#38bdf8' : '#0284c7',
                    color: isDark ? '#0f172a' : '#ffffff',
                    '&:hover': {
                      backgroundColor: isDark ? '#7dd3fc' : '#0369a1',
                      transform: 'translateY(-2px)',
                      boxShadow: isDark 
                        ? '0 4px 12px rgba(56, 189, 248, 0.3)' 
                        : '0 4px 12px rgba(2, 132, 199, 0.2)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Add
                </Button>
              </Stack>
              
              {errorMessage && (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: isDark ? '#f87171' : '#dc2626',
                    mt: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  ⚠️ {errorMessage}
                </Typography>
              )}
            </Stack>
          </Paper>

          <Divider sx={{ 
            borderColor: isDark ? '#334155' : '#e2e8f0',
            my: 1,
          }} />

          {/* Existing Columns List */}
          <Box>
            <Typography 
              variant="subtitle1" 
              fontWeight={600}
              gutterBottom
              sx={{ 
                color: isDark ? '#f1f5f9' : '#0f172a',
                mb: 2,
              }}
            >
              Current Columns ({columns.length})
            </Typography>
            
            <Paper 
              elevation={0}
              sx={{ 
                borderRadius: '12px',
                overflow: 'hidden',
                border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                boxShadow: isDark 
                  ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.05)',
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
              }}
            >
              <List sx={{ p: 0, maxHeight: '400px', overflow: 'auto' }}>
                {/* Header Row */}
                <ListItem 
                  sx={{ 
                    backgroundColor: isDark ? 'rgba(51, 65, 85, 0.5)' : '#f8fafc', 
                    py: 1.5,
                    borderBottom: isDark ? '2px solid #334155' : '2px solid #e2e8f0',
                  }}
                >
                  <Box sx={{ width: '40%', px: 1 }}>
                    <Typography variant="caption" fontWeight={600} sx={{ 
                      color: isDark ? '#cbd5e1' : '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Column Name
                    </Typography>
                  </Box>
                  <Box sx={{ width: '35%', px: 1 }}>
                    <Typography variant="caption" fontWeight={600} sx={{ 
                      color: isDark ? '#cbd5e1' : '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Field
                    </Typography>
                  </Box>
                  <Box sx={{ width: '15%', px: 1, textAlign: 'center' }}>
                    <Typography variant="caption" fontWeight={600} sx={{ 
                      color: isDark ? '#cbd5e1' : '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Visible
                    </Typography>
                  </Box>
                  <Box sx={{ width: '10%' }} />
                </ListItem>

                {/* Column Rows */}
                {columns.map((column, index) => (
                  <ListItem
                    key={column.id}
                    sx={{ 
                      py: 1.5,
                      borderBottom: index !== columns.length - 1 
                        ? (isDark ? '1px solid #334155' : '1px solid #e2e8f0')
                        : 'none',
                      '&:hover': { 
                        backgroundColor: isDark ? 'rgba(51, 65, 85, 0.3)' : '#f8fafc',
                      },
                      transition: 'background-color 0.2s ease-in-out',
                    }}
                  >
                    <Box sx={{ width: '40%', px: 1 }}>
                      <Typography 
                        variant="body2" 
                        fontWeight={500}
                        sx={{ color: isDark ? '#f1f5f9' : '#0f172a' }}
                      >
                        {column.label}
                      </Typography>
                    </Box>
                    <Box sx={{ width: '35%', px: 1 }}>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: isDark ? '#94a3b8' : '#64748b',
                          fontFamily: 'monospace',
                        }}
                      >
                        {column.field}
                      </Typography>
                    </Box>
                    <Box sx={{ width: '15%', px: 1, display: 'flex', justifyContent: 'center' }}>
                      <Checkbox
                        checked={column.visible}
                        onChange={() => dispatch(toggleColumnVisibility(column.id))}
                        size="small"
                        sx={{
                          color: isDark ? '#64748b' : '#94a3b8',
                          '&.Mui-checked': {
                            color: isDark ? '#38bdf8' : '#0284c7',
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ width: '10%', display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton
                        size="small"
                        onClick={() => dispatch(removeColumn(column.id))}
                        sx={{ 
                          color: isDark ? '#f87171' : '#dc2626',
                          '&:hover': {
                            backgroundColor: isDark 
                              ? 'rgba(248, 113, 113, 0.1)' 
                              : 'rgba(220, 38, 38, 0.1)',
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s ease-in-out',
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}

                {columns.length === 0 && (
                  <ListItem sx={{ py: 4 }}>
                    <ListItemText
                      primary={
                        <Typography 
                          align="center" 
                          sx={{ 
                            color: isDark ? '#64748b' : '#94a3b8',
                          }}
                        >
                          No columns added yet. Start by adding a new column above.
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ 
        borderTop: isDark ? '1px solid #334155' : '1px solid #e2e8f0', 
        p: 3, 
        backgroundColor: isDark ? '#1e293b' : '#f8fafc',
        gap: 1,
      }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            borderColor: isDark ? '#475569' : '#e2e8f0',
            color: isDark ? '#cbd5e1' : '#475569',
            '&:hover': {
              borderColor: isDark ? '#64748b' : '#cbd5e1',
              backgroundColor: isDark ? 'rgba(100, 116, 139, 0.1)' : 'rgba(203, 213, 225, 0.1)',
            },
          }}
        >
          Close
        </Button>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            boxShadow: 'none',
            backgroundColor: isDark ? '#38bdf8' : '#0284c7',
            color: isDark ? '#0f172a' : '#ffffff',
            '&:hover': {
              backgroundColor: isDark ? '#7dd3fc' : '#0369a1',
              transform: 'translateY(-1px)',
              boxShadow: isDark 
                ? '0 4px 12px rgba(56, 189, 248, 0.3)' 
                : '0 4px 12px rgba(2, 132, 199, 0.2)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
