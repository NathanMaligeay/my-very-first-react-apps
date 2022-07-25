import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function IconButtons() {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="add time">
        <KeyboardDoubleArrowUpIcon />
      </IconButton>
      <IconButton aria-label="remove time">
        <KeyboardDoubleArrowDownIcon />
      </IconButton>
    </Stack>
  );
}