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
import axios from "axios";
import { urlConstants } from "../../../apis";
import { toast } from "react-toastify";
import { getConfig } from "../../../utils/getConfig";

const CreateUser = ({
  openCreateDialog,
  setOpenCreateDialog,
  setUsersData,
}) => {
  const [newUser, setNewUser] = useState({
    email: "",
    firstname: "",
    lastname: "",
    role: "",
  });
  const handleCreateUser = async () => {
    try {
      let { data } = await axios.post(
        urlConstants.createUser,
        {
          ...newUser,
        },
        getConfig()
      );
      const user = data.user;
      setUsersData((prev) => [...prev, user]);
      setOpenCreateDialog(false);
      toast.success("User updated successfully!");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          name="firstname"
          value={newUser.firstname}
          onChange={handleInputChange}
        />
        <TextField
          label="Lastname"
          variant="outlined"
          fullWidth
          margin="dense"
          name="lastname"
          value={newUser.lastname}
          onChange={handleInputChange}
        />
        <TextField
          value={newUser.email}
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          onChange={handleInputChange}
          margin="dense"
        />
        <TextField
          value={newUser.role}
          label="Role"
          variant="outlined"
          fullWidth
          margin="dense"
          name="role"
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateUser}>Create</Button>
        <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUser;
