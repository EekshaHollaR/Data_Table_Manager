// src/redux/features/tableSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableState, TableRow, ColumnConfig } from '@/types/table.types';

const defaultColumns: ColumnConfig[] = [
  { id: 'name', label: 'Name', visible: true, field: 'name', editable: true, order: 0 },
  { id: 'email', label: 'Email', visible: true, field: 'email', editable: true, order: 1 },
  { id: 'age', label: 'Age', visible: true, field: 'age', editable: true, order: 2 },
  { id: 'role', label: 'Role', visible: true, field: 'role', editable: true, order: 3 },
];

const initialState: TableState = {
  rows: [],
  columns: defaultColumns,
  searchQuery: '',
  sortColumn: null,
  sortDirection: 'asc',
  currentPage: 0,
  rowsPerPage: 10,
  editingRowId: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<TableRow[]>) => {
      state.rows = action.payload;
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.rows.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<TableRow>) => {
      const index = state.rows.findIndex(row => row.id === action.payload.id);
      if (index !== -1) {
        state.rows[index] = action.payload;
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter(row => row.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 0;
    },
    setSortColumn: (state, action: PayloadAction<string>) => {
      if (state.sortColumn === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortColumn = action.payload;
        state.sortDirection = 'asc';
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    updateColumns: (state, action: PayloadAction<ColumnConfig[]>) => {
      state.columns = action.payload;
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const column = state.columns.find(col => col.id === action.payload);
      if (column) {
        column.visible = !column.visible;
      }
    },
    addColumn: (state, action: PayloadAction<ColumnConfig>) => {
      state.columns.push(action.payload);
    },
    removeColumn: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter(col => col.id !== action.payload);
    },
    reorderColumns: (state, action: PayloadAction<ColumnConfig[]>) => {
      state.columns = action.payload;
    },
    setEditingRowId: (state, action: PayloadAction<string | null>) => {
      state.editingRowId = action.payload;
    },
  },
});

export const {
  setRows,
  addRow,
  updateRow,
  deleteRow,
  setSearchQuery,
  setSortColumn,
  setCurrentPage,
  updateColumns,
  toggleColumnVisibility,
  addColumn,
  removeColumn,
  reorderColumns,
  setEditingRowId,
} = tableSlice.actions;

export default tableSlice.reducer;
