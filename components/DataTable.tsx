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
} from '@mui/material';
import {
  Edit,
  Delete,
  Save,
  Cancel,
  Settings,
  Search,
  AddCircle,
  MoreHoriz,
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
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    }}>
      <Paper sx={{ 
        width: '100%', 
        mb: 3, 
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
      }}>
        {/* Headers */}
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          px: { xs: 2, md: 3 },
          py: 2,
          borderBottom: '1px solid #e2e8f0',
        }}>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
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
              sx={{ borderRadius: '8px' }}
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
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0',
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Search color="action" />
                <TextField
                  size="small"
                  placeholder="Search all fields..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  fullWidth
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
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
          <Card sx={{ borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {visibleColumns.map((column) => (
                      <TableCell 
                        key={column.id} 
                        sx={{ 
                          fontWeight: 600, 
                          backgroundColor: '#f8fafc',
                          color: '#475569',
                          borderBottom: '2px solid #e2e8f0',
                        }}
                      >
                        <TableSortLabel
                          active={sortColumn === column.field}
                          direction={sortColumn === column.field ? sortDirection : 'asc'}
                          onClick={() => dispatch(setSortColumn(column.field))}
                          sx={{
                            fontWeight: 600,
                            '&:hover': { color: 'primary.main' },
                            '&.Mui-active': { color: 'primary.main' },
                          }}
                        >
                          {column.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell 
                      sx={{ 
                        fontWeight: 600, 
                        backgroundColor: '#f8fafc',
                        color: '#475569',
                        borderBottom: '2px solid #e2e8f0',
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
                        }}
                      >
                        <Stack spacing={2} alignItems="center">
                          <Avatar sx={{ 
                            bgcolor: '#e0f2fe', 
                            color: '#0284c7', 
                            width: 56, 
                            height: 56,
                          }}>
                            <Search fontSize="large" />
                          </Avatar>
                          <Typography variant="h6" color="text.secondary" fontWeight={500}>
                            No data available
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
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
                            '&:hover': {
                              backgroundColor: '#f8fafc',
                            },
                            transition: 'background-color 0.2s ease-in-out',
                          }}
                        >
                          {visibleColumns.map((column) => (
                            <TableCell key={column.id} sx={{ borderBottom: '1px solid #e2e8f0' }}>
                              <EditableCell
                                row={displayRow}
                                field={column.field}
                                isEditing={isEditing && column.editable !== false}
                                onUpdate={handleCellUpdate}
                              />
                            </TableCell>
                          ))}
                          <TableCell sx={{ borderBottom: '1px solid #e2e8f0' }}>
                            {isEditing ? (
                              <Stack direction="row" spacing={1}>
                                <Tooltip title="Save changes">
                                  <IconButton 
                                    size="small" 
                                    color="primary" 
                                    onClick={handleSaveEdit}
                                    sx={{ 
                                      '&:hover': { 
                                        backgroundColor: '#e0f2fe',
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
                                      '&:hover': { 
                                        backgroundColor: '#f1f5f9',
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
                                      '&:hover': { 
                                        backgroundColor: '#e0f2fe',
                                        color: 'primary.main'
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
                                      '&:hover': { 
                                        backgroundColor: '#fee2e2',
                                        color: 'error.main'
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
            borderTop: '1px solid #e2e8f0',
            px: 2,
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: 'text.secondary',
              fontWeight: 500,
            },
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
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        <DialogTitle sx={{ pb: 1, fontWeight: 600 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.secondary' }}>
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
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained"
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: 'none',
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
