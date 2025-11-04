'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import { TableRow } from '@/types/table.types';

interface Props {
  row: TableRow;
  field: string;
  isEditing: boolean;
  onUpdate: (field: string, value: any) => void;
}

export default function EditableCell({ row, field, isEditing, onUpdate }: Props) {
  const [value, setValue] = useState(row[field]);
  const [error, setError] = useState('');

  // Reset value when editing starts or ends
  useEffect(() => {
    setValue(row[field]);
    setError('');
  }, [row, field, isEditing]);

  const validateField = (fieldName: string, val: any): string => {
    if (!val && val !== 0) return 'Field is required';
    
    if (fieldName === 'age') {
      const num = Number(val);
      if (isNaN(num) || num < 0 || num > 150) {
        return 'Age must be a number between 0 and 150';
      }
    }

    if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        return 'Invalid email format';
      }
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    const validationError = validateField(field, newValue);
    setError(validationError);
    
    if (!validationError) {
      onUpdate(field, newValue);
    }
  };

  if (!isEditing) {
    return (
      <Box 
        component="span"
        sx={{ 
          fontWeight: field === 'name' ? 600 : 400,
          color: field === 'role' ? 'primary.main' : 'text.primary',
        }}
      >
        {row[field]}
      </Box>
    );
  }

  return (
    <TextField
      size="small"
      fullWidth
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      variant="outlined"
      sx={{ 
        minWidth: '160px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          backgroundColor: 'background.default',
          border: '1px solid #e2e8f0',
          '&:hover fieldset': { 
            borderColor: 'primary.light' 
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
            boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.15)',
          }
        },
      }}
    />
  );
}
