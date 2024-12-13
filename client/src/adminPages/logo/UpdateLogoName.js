import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLogoName,
  createLogoName,
  updateLogoName,
  deleteLogoName,
} from './logoNameSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const UpdateLogoName = () => {
  const dispatch = useDispatch();
  const { logoName, loading, error } = useSelector((state) => state.logoName);

  const [newName, setNewName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [deleteId, setDeleteId] = useState(null); // For delete confirmation dialog

  useEffect(() => {
    dispatch(fetchLogoName());
  }, [dispatch]);

  const handleCreate = () => {
    if (newName.trim()) {
      dispatch(createLogoName({ name: newName }));
      setNewName('');
    }
  };

  const handleEdit = (id, currentValue) => {
    setEditId(id);
    setEditValue(currentValue);
  };

  const handleSave = () => {
    dispatch(updateLogoName({ id: editId, name: editValue }));
    setEditId(null);
    setEditValue('');
  };

  const handleDelete = (id) => {
    dispatch(deleteLogoName(id));
    setDeleteId(null); // Close the dialog
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography sx={{ color: 'red', textAlign: 'center', mt: 3 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Paper sx={{ p: 4, maxWidth: '800px', margin: '20px auto' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>
        Logo Name Manager
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TextField
          label="New Logo Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          sx={{ flex: 1, mr: 2 }}
        />
        <Button
          onClick={handleCreate}
          variant="contained"
          color="primary"
          sx={{ height: '100%' }}
        >
          Add
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Logo Name</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logoName.map((logo, index) => (
              <TableRow key={logo._id}>
                {/* Display sequential IDs based on the array index */}
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {editId === logo._id ? (
                    <TextField
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      fullWidth
                    />
                  ) : (
                    logo.name
                  )}
                </TableCell>
                <TableCell>
                  {editId === logo._id ? (
                    <>
                      <Button
                        onClick={handleSave}
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditId(null)}
                        variant="outlined"
                        color="secondary"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleEdit(logo._id, logo.name)}
                        variant="outlined"
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => setDeleteId(logo._id)}
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        aria-labelledby="delete-confirm-dialog"
      >
        <DialogTitle id="delete-confirm-dialog">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this logo name? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(deleteId)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UpdateLogoName;
