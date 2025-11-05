'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRows } from '@/redux/features/tableSlice';
import { Container } from '@mui/material';
import DataTable from '@/components/DataTable';
import { TableRow } from '@/types/table.types';

export default function Home() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const sampleData: TableRow[] = [
  //     { id: '1', name: 'John Doe', email: 'john@example.com', age: 28, role: 'Developer' },
  //     { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 32, role: 'Designer' },
  //     { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 45, role: 'Manager' },
  //     { id: '4', name: 'Alice Brown', email: 'alice@example.com', age: 29, role: 'Developer' },
  //     { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', age: 38, role: 'Analyst' },
  //     { id: '6', name: 'Diana Martinez', email: 'diana@example.com', age: 31, role: 'Designer' },
  //     { id: '7', name: 'Ethan Garcia', email: 'ethan@example.com', age: 26, role: 'Developer' },
  //     { id: '8', name: 'Fiona Lee', email: 'fiona@example.com', age: 35, role: 'Manager' },
  //     { id: '9', name: 'George Wang', email: 'george@example.com', age: 42, role: 'Analyst' },
  //     { id: '10', name: 'Hannah Kim', email: 'hannah@example.com', age: 27, role: 'Designer' },
  //   ];

  //   dispatch(setRows(sampleData));
  // }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <DataTable />
    </Container>
  );
}
