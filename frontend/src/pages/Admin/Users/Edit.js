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
import { getConfig } from "../../../utils/getConfig";

const Edit = ({
  selectedUser,
  openEditDialog,
  setOpenEditDialog,
  setUsers,
  users,
  updateUser,
}) => {
  const [updatedUserData, setUpdatedUserData] = useState({
    firstname: selectedUser.firstname,
    lastname: selectedUser.lastname,
    email: selectedUser.email,
    role: selectedUser.role,
  });

  const handleUpdateUser = async () => {
    try {
      // const updatedUser = await updateUser(
      //   {
      //     id: selectedUser._id,
      //     user: { ...selectedUser, ...updatedUserData },
      //   },
      //   getConfig()
      // );
      const updatedUser = { ...selectedUser, ...updatedUserData };
      setUsers(
        users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
      setOpenEditDialog(false);
      toast.success("User updated successfully!");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    selectedUser && (
      <div>
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit user details</DialogContentText>
            <TextField
              label="Firstname"
              variant="outlined"
              fullWidth
              margin="dense"
              name="firstname"
              value={updatedUserData.firstname}
              onChange={handleInputChange}
            />
            <TextField
              label="Lastname"
              variant="outlined"
              fullWidth
              margin="dense"
              name="lastname"
              value={updatedUserData.lastname}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="dense"
              name="email"
              value={updatedUserData.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Role"
              variant="outlined"
              fullWidth
              margin="dense"
              name="role"
              value={updatedUserData.role}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateUser}>Update</Button>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
};

export default Edit;
