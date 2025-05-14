import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { toast } from "react-toastify";

const EditableTable = ({ lists, setLists }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const handleEditOpen = (list) => {
    setSelectedList(list);
    setEditedName(list.name);
    setEditedDescription(list.description);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedList(null);
  };

  const handleDeleteOpen = (list) => {
    setSelectedList(list);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setSelectedList(null);
  };

  const handleEditSave = () => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list._id === selectedList._id
          ? { ...list, name: editedName, description: editedDescription }
          : list
      )
    );
    toast.success("List updated successfully!");
    handleEditClose();
  };

  const handleDeleteConfirm = () => {
    setLists((prevLists) =>
      prevLists.filter((list) => list._id !== selectedList._id)
    );
    toast.success("List deleted successfully!");
    handleDeleteClose();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lists.map((list) => (
            <TableRow key={list._id}>
              <TableCell>{list.name}</TableCell>
              <TableCell>{list.description}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleEditOpen(list)}>
                    <Edit color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDeleteOpen(list)}>
                    <Delete color="error" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit List</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit the details of the list below:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <DialogTitle>Delete List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the list "{selectedList?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default EditableTable;