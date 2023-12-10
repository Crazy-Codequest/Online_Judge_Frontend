import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";

const Delete = ({
  selectedUser,
  setSelectedUser,
  openDeleteDialog,
  setOpenDeleteDialog,
  users,
  setUsers,
}) => {
  const handleDeleteUser = async () => {
    // await deleteUser(selectedUser._id);
    setUsers(users.filter((user) => user._id !== selectedUser._id));
    setSelectedUser(null);
    setOpenDeleteDialog(false);
    toast.success("User deleted successfully!");
  };

  return (
    <div>
      {selectedUser && (
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleDeleteUser}>
              Delete
            </Button>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Delete;
