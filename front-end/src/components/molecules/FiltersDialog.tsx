import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

export interface FilterProps {
  categories: string[];
  status: string[];
  open: boolean;
  filterCategory: string;
  filterStatus: string;
  handleChange: (event: SelectChangeEvent, type: string) => void;
  handleClose: (event: React.SyntheticEvent<unknown>, reason?: string) => void;
  handleSubmit: () => void;
}

export default function FiltersDialog({
  categories,
  status,
  open,
  filterCategory,
  filterStatus,
  handleChange,
  handleClose,
  handleSubmit,
}: FilterProps) {
  return (
    <div>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select the filters:</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Category</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={filterCategory}
                onChange={(e) => handleChange(e, 'category')}
                input={<OutlinedInput label="Category" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories?.map((e, i) => (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Status</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={filterStatus}
                onChange={(e) => handleChange(e, 'status')}
                input={<OutlinedInput label="Status" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {status?.map((e, i) => (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
