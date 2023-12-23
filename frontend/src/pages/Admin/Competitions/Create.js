import React, { useEffect, useState } from "react";
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
import { adminRoutes, urlConstants } from "../../../apis";
import { toast } from "react-toastify";
import { getConfig } from "../../../utils/getConfig";

import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import CustomDatepicker from "./Datepicker";

const Create = ({
  openCreateDialog,
  setOpenCreateDialog,
  setCompetitionsData,
}) => {
  const [newCompetition, setNewCompetition] = useState({
    title: "",
    start_date: null,
    end_date: null,
    problems: "",
    user: "",
  });
  const [problems, setProblems] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const handleCreateCompetition = async () => {
    try {
      let { data } = await axios.post(
        urlConstants.createCompetition,
        {
          ...newCompetition,
          start_date: new Date(newCompetition.start_date),
          end_date: new Date(newCompetition.end_date),
        },
        getConfig()
      );
      const competition = data.competiton;
      setCompetitionsData((prev) => [...prev, competition]);
      setOpenCreateDialog(false);
      toast.success("Competition created successfully!");
      setNewCompetition({});
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDateChange = (name, value) => {
    setNewCompetition((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewCompetition((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getProblemIds = async () => {
    try {
      const { data } = await axios.get(
        `${adminRoutes.getProblemIds}/${user._id}`
      );
      setProblems(data.problems);
      console.log(data.problems);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getUserIds = async () => {
    try {
      const { data } = await axios.get(
        `${adminRoutes.adminUserId}/${user._id}`
      );
      setUsers(data.users);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getProblemIds();
    getUserIds();
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      fullScreen
      open={openCreateDialog}
      onClose={() => setOpenCreateDialog(false)}
    >
      {console.log(newCompetition)}
      <DialogTitle className="mt-2 ml-2">Create Competition</DialogTitle>
      <DialogContent className="dialog-content">
        <DialogContentText>Enter compeitition details</DialogContentText>
        <div onClick={() => setOpenCreateDialog(false)} className="close-icon">
          <CloseIcon />
        </div>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="dense"
          name="title"
          value={newCompetition.title}
          onChange={handleInputChange}
          className="mt-1"
        />
        <CustomDatepicker
          start_date={newCompetition.start_date}
          end_date={newCompetition.end_date}
          handleChange={handleDateChange}
        />
        <TextField
          value={newCompetition.user}
          label="User Id"
          variant="outlined"
          fullWidth
          margin="dense"
          name="user"
          onChange={handleInputChange}
          className="mt-1"
          select
        >
          {users.map((user) => (
            <MenuItem
              key={user._id}
              value={user._id}
            >{`${user.firstname} ${user.lastname}`}</MenuItem>
          ))}
        </TextField>
        <TextField
          value={newCompetition.problems}
          label="Problem Id"
          variant="outlined"
          fullWidth
          margin="dense"
          name="problems"
          onChange={handleInputChange}
          className="mt-1"
          select
        >
          {problems.map((problem) => (
            <MenuItem key={user._id} value={problem._id}>
              {problem.statement}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions className="action-buttons">
        <Button onClick={handleCreateCompetition}>Create</Button>
        <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Create;
