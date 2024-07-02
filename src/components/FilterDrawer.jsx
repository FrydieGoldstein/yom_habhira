import React from 'react';
import { Drawer, IconButton, Button, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FilterDrawer = ({ open, onClose, title, children, onClear, onApply }) => {
  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
          <Typography variant="h6">{title}</Typography>
          <Button onClick={onClear}>נקה הכל</Button>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', marginTop: 2 }}>
          {children}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button variant="contained" onClick={onApply}>אישור</Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;