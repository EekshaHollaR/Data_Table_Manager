// src/utils/csvHelpers.ts
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { TableRow, ColumnConfig } from '@/types/table.types';

export const importCSV = (
  file: File,
  onSuccess: (rows: TableRow[], columns: ColumnConfig[]) => void,
  onError: (error: string) => void
): void => {
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: (results) => {
      try {
        if (!Array.isArray(results.data) || results.data.length === 0) {
          onError('CSV file is empty or invalid format');
          return;
        }

        // Extract all unique field names from the CSV
        const allFields = new Set<string>();
        results.data.forEach((row: any) => {
          Object.keys(row).forEach((key) => {
            if (key && key.trim() !== '') {
              allFields.add(key.trim());
            }
          });
        });

        // Create column configurations from CSV headers
        const columns: ColumnConfig[] = Array.from(allFields).map((field, idx) => ({
          id: field.toLowerCase().replace(/\s+/g, '_'),
          label: field.charAt(0).toUpperCase() + field.slice(1),
          visible: true,
          field: field,
          editable: true,
          order: idx,
        }));

        // Parse data rows
        const parsedData: TableRow[] = results.data.map((row: any, index: number) => {
          const rowData: TableRow = {
            id: row.id || `row-${Date.now()}-${index}`,
            name: '',
            email: '',
            age: 0,
            role: '',
          };

          // Map all fields from CSV to row data
          Object.keys(row).forEach((key) => {
            if (key && key.trim() !== '') {
              rowData[key] = row[key];
            }
          });

          return rowData;
        });

        onSuccess(parsedData, columns);
      } catch (error) {
        onError('Error parsing CSV file. Please check the file format.');
      }
    },
    error: (error) => {
      onError(`CSV Parse Error: ${error.message}`);
    },
  });
};

export const exportCSV = (
  rows: TableRow[],
  columns: ColumnConfig[],
  filename: string = 'table-export.csv'
): void => {
  try {
    const visibleColumns = columns.filter(col => col.visible);
    
    // Create CSV data with only visible columns
    const csvData = rows.map(row => {
      const csvRow: any = {};
      visibleColumns.forEach(col => {
        csvRow[col.label] = row[col.field] !== undefined ? row[col.field] : '';
      });
      return csvRow;
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
    // Ensure filename has .csv extension
    const finalFilename = filename.endsWith('.csv') ? filename : `${filename}.csv`;
    saveAs(blob, finalFilename);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw new Error('Failed to export CSV file');
  }
};
