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

const CreateUser = ({ openCreateDialog, setOpenCreateDialog }) => {
  const handleCreateUser = async () => {
    setOpenCreateDialog(false);
  };

  return (
    <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter user details</DialogContentText>
        <TextField
          label="Firstname"
          variant="outlined"
          fullWidth
          margin="dense"
          // Your form fields for new user
        />
        <TextField
          label="Lastname"
          variant="outlined"
          fullWidth
          margin="dense"
          // Your form fields for new user
        />
        {/* Other user details fields */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateUser}>Create</Button>
        <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUser;
