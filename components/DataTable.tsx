'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  IconButton,
  Toolbar,
  Typography,
  TextField,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Card,
  CardContent,
  Avatar,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Edit,
  Delete,
  Save,
  Cancel,
  Settings,
  Search,
  AddCircle,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  setSearchQuery,
  setSortColumn,
  setCurrentPage,
  updateRow,
  deleteRow,
  setEditingRowId,
} from '@/redux/features/tableSlice';
import EditableCell from './EditableCell';
import ManageColumnsModal from './ManageColumnsModal';
import ImportExportButtons from './ImportExportButtons';
import ThemeToggle from './ThemeToggle';
import { TableRow as TableRowType } from '@/types/table.types';

export default function DataTable() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  // Redux states
  const {
    rows,
    columns,
    searchQuery,
    sortColumn,
    sortDirection,
    currentPage,
    rowsPerPage,
    editingRowId,
  } = useSelector((state: RootState) => state.table);

  // Local states
  const [manageColumnsOpen, setManageColumnsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<string | null>(null);
  const [editedRow, setEditedRow] = useState<TableRowType | null>(null);

  // Get visible columns
  const visibleColumns = useMemo(
    () => columns.filter(col => col.visible).sort((a, b) => a.order - b.order),
    [columns]
  );

  // Filter and sort rows
  const filteredAndSortedRows = useMemo(() => {
    let filtered = rows.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [rows, searchQuery, sortColumn, sortDirection]);

  // Paginate rows
  const paginatedRows = useMemo(() => {
    const start = currentPage * rowsPerPage;
    return filteredAndSortedRows.slice(start, start + rowsPerPage);
  }, [filteredAndSortedRows, currentPage, rowsPerPage]);

  // Handler functions
  const handleEditRow = (row: TableRowType) => {
    dispatch(setEditingRowId(row.id));
    setEditedRow({ ...row });
  };

  const handleCancelEdit = () => {
    dispatch(setEditingRowId(null));
    setEditedRow(null);
  };

  const handleSaveEdit = () => {
    if (editedRow) {
      dispatch(updateRow(editedRow));
      dispatch(setEditingRowId(null));
      setEditedRow(null);
    }
  };

  const handleCellUpdate = (field: string, value: any) => {
    if (editedRow) {
      setEditedRow({ ...editedRow, [field]: value });
    }
  };

  const handleDeleteClick = (id: string) => {
    setRowToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (rowToDelete) {
      dispatch(deleteRow(rowToDelete));
    }
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  return (
    <Box sx={{ 
      width: '100%',
      padding: { xs: 2, md: 3 },
      minHeight: '100vh',
      background: isDark 
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      transition: 'background 0.3s ease-in-out',
    }}>
      <Paper sx={{ 
        width: '100%', 
        mb: 3, 
        boxShadow: isDark ? '0 8px 30px rgba(0, 0, 0, 0.5)' : '0 8px 30px rgba(0, 0, 0, 0.12)',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: isDark ? '1px solid rgba(51, 65, 85, 0.5)' : 'none',
        transition: 'all 0.3s ease-in-out',
      }}>
        {/* Header */}
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          px: { xs: 2, md: 3 },
          py: 2,
          borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
          background: isDark 
            ? 'linear-gradient(90deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.4) 100%)'
            : 'transparent',
        }}>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              background: isDark 
                ? 'linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%)'
                : 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}
          >
            Dynamic Data Table
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <ThemeToggle />
            <Button 
              variant="outlined" 
              size="small"
              sx={{ 
                borderRadius: '8px',
                borderColor: isDark ? '#475569' : '#e2e8f0',
                color: isDark ? '#cbd5e1' : '#475569',
                '&:hover': {
                  borderColor: isDark ? '#38bdf8' : '#0284c7',
                  backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.05)',
                }
              }}
              startIcon={<Settings />}
              onClick={() => setManageColumnsOpen(true)}
            >
              Manage
            </Button>
          </Stack>
        </Toolbar>

        {/* Search */}
        <Toolbar sx={{ 
          px: { xs: 2, md: 3 },
          py: 1.5,
        }}>
          <Card sx={{ 
            width: '100%',
            borderRadius: '12px',
            boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            transition: 'all 0.3s ease-in-out',
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Search sx={{ color: isDark ? '#94a3b8' : '#64748b' }} />
                <TextField
                  size="small"
                  placeholder="Search all fields..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  fullWidth
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      color: isDark ? '#f1f5f9' : '#0f172a',
                    }
                  }}
                  sx={{ 
                    '& .MuiInputBase-root': {
                      fontSize: '0.95rem',
                    }
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Toolbar>

        {/* Import/Export Buttons */}
        <Toolbar sx={{ px: { xs: 2, md: 3 }, py: 1.5 }}>
          <ImportExportButtons />
        </Toolbar>

        {/* Table Content */}
        <Box sx={{ px: { xs: 2, md: 3 }, pb: 2 }}>
          <Card sx={{ 
            borderRadius: '12px', 
            border: isDark ? '1px solid #334155' : '1px solid #e2e8f0', 
            overflow: 'hidden',
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.4)' : 'none',
          }}>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {visibleColumns.map((column) => (
                      <TableCell 
                        key={column.id} 
                        sx={{ 
                          fontWeight: 600, 
                          backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                          color: isDark ? '#cbd5e1' : '#475569',
                          borderBottom: isDark ? '2px solid #334155' : '2px solid #e2e8f0',
                        }}
                      >
                        <TableSortLabel
                          active={sortColumn === column.field}
                          direction={sortColumn === column.field ? sortDirection : 'asc'}
                          onClick={() => dispatch(setSortColumn(column.field))}
                          sx={{
                            fontWeight: 600,
                            '&:hover': { 
                              color: isDark ? '#38bdf8' : '#0284c7',
                            },
                            '&.Mui-active': { 
                              color: isDark ? '#38bdf8' : '#0284c7',
                            },
                            '& .MuiTableSortLabel-icon': {
                              color: isDark ? '#38bdf8 !important' : '#0284c7 !important',
                            }
                          }}
                        >
                          {column.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell 
                      sx={{ 
                        fontWeight: 600, 
                        backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                        color: isDark ? '#cbd5e1' : '#475569',
                        borderBottom: isDark ? '2px solid #334155' : '2px solid #e2e8f0',
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRows.length === 0 ? (
                    <TableRow>
                      <TableCell 
                        colSpan={visibleColumns.length + 1} 
                        align="center"
                        sx={{ 
                          py: 8,
                          borderBottom: 'none',
                          backgroundColor: isDark ? '#1e293b' : '#ffffff',
                        }}
                      >
                        <Stack spacing={2} alignItems="center">
                          <Avatar sx={{ 
                            bgcolor: isDark ? 'rgba(56, 189, 248, 0.2)' : '#e0f2fe', 
                            color: isDark ? '#38bdf8' : '#0284c7', 
                            width: 56, 
                            height: 56,
                          }}>
                            <Search fontSize="large" />
                          </Avatar>
                          <Typography variant="h6" sx={{ color: isDark ? '#cbd5e1' : '#475569', fontWeight: 500 }}>
                            No data available
                          </Typography>
                          <Typography variant="body2" sx={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                            Import a CSV file or add data manually to get started
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedRows.map((row, index) => {
                      const isEditing = editingRowId === row.id;
                      const displayRow = isEditing && editedRow ? editedRow : row;

                      return (
                        <TableRow
                          key={row.id}
                          hover
                          sx={{
                            backgroundColor: isDark ? '#1e293b' : '#ffffff',
                            '&:hover': {
                              backgroundColor: isDark ? '#334155' : '#f8fafc',
                            },
                            transition: 'background-color 0.2s ease-in-out',
                          }}
                        >
                          {visibleColumns.map((column) => (
                            <TableCell 
                              key={column.id} 
                              sx={{ 
                                borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
                                color: isDark ? '#f1f5f9' : '#0f172a',
                              }}
                            >
                              <EditableCell
                                row={displayRow}
                                field={column.field}
                                isEditing={isEditing && column.editable !== false}
                                onUpdate={handleCellUpdate}
                              />
                            </TableCell>
                          ))}
                          <TableCell sx={{ borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0' }}>
                            {isEditing ? (
                              <Stack direction="row" spacing={1}>
                                <Tooltip title="Save changes">
                                  <IconButton 
                                    size="small" 
                                    onClick={handleSaveEdit}
                                    sx={{ 
                                      color: isDark ? '#4ade80' : '#16a34a',
                                      '&:hover': { 
                                        backgroundColor: isDark ? 'rgba(74, 222, 128, 0.1)' : 'rgba(22, 163, 74, 0.1)',
                                      }
                                    }}
                                  >
                                    <Save fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Cancel">
                                  <IconButton 
                                    size="small" 
                                    onClick={handleCancelEdit}
                                    sx={{ 
                                      color: isDark ? '#94a3b8' : '#64748b',
                                      '&:hover': { 
                                        backgroundColor: isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                                      }
                                    }}
                                  >
                                    <Cancel fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            ) : (
                              <Stack direction="row" spacing={1}>
                                <Tooltip title="Edit row">
                                  <IconButton 
                                    size="small" 
                                    onClick={() => handleEditRow(row)}
                                    sx={{ 
                                      color: isDark ? '#38bdf8' : '#0284c7',
                                      '&:hover': { 
                                        backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)',
                                      }
                                    }}
                                  >
                                    <Edit fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete row">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleDeleteClick(row.id)}
                                    sx={{ 
                                      color: isDark ? '#f87171' : '#dc2626',
                                      '&:hover': { 
                                        backgroundColor: isDark ? 'rgba(248, 113, 113, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                                      }
                                    }}
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAndSortedRows.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={(_, newPage) => dispatch(setCurrentPage(newPage))}
          sx={{ 
            borderTop: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
            px: 2,
            color: isDark ? '#cbd5e1' : '#475569',
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: isDark ? '#cbd5e1' : '#475569',
              fontWeight: 500,
            },
            '& .MuiTablePagination-select': {
              color: isDark ? '#f1f5f9' : '#0f172a',
            },
            '& .MuiIconButton-root': {
              color: isDark ? '#cbd5e1' : '#475569',
            }
          }}
        />
      </Paper>

      {/* Modals */}
      <ManageColumnsModal
        open={manageColumnsOpen}
        onClose={() => setManageColumnsOpen(false)}
      />

      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: isDark ? '0 8px 30px rgba(0, 0, 0, 0.5)' : '0 8px 30px rgba(0, 0, 0, 0.12)',
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            border: isDark ? '1px solid #334155' : 'none',
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, fontWeight: 600, color: isDark ? '#f1f5f9' : '#0f172a' }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: isDark ? '#cbd5e1' : '#475569' }}>
            Are you sure you want to delete this row? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
              color: isDark ? '#cbd5e1' : '#475569',
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained"
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: 'none',
              backgroundColor: isDark ? '#f87171' : '#dc2626',
              '&:hover': {
                backgroundColor: isDark ? '#ef4444' : '#b91c1c',
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
