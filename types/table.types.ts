// src/types/table.types.ts
export interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
  field: string;
  editable?: boolean;
  order: number;
}

export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  department?: string;
  location?: string;
  [key: string]: any;
}

export interface TableState {
  rows: TableRow[];
  columns: ColumnConfig[];
  searchQuery: string;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  currentPage: number;
  rowsPerPage: number;
  editingRowId: string | null;
}
