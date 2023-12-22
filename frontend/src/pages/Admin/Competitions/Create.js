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
import { urlConstants } from "../../../apis";
import { toast } from "react-toastify";
import { getConfig } from "../../../utils/getConfig";

import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

const Create = ({
  openCreateDialog,
  setOpenCreateDialog,
  setCompetitionsData,
}) => {
  const [newCompetition, setNewCompetition] = useState({
    title: "",
    start_date: null,
    end_date: "",
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
          problems: [],
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
        `${urlConstants.adminProblemId}/${user._id}`
      );
      setProblems(data.problems);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getUserIds = async () => {
    try {
      const { data } = await axios.get(
        `${urlConstants.adminUserId}/${user._id}`
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
      <DialogTitle>Create Competition</DialogTitle>
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
        <TextField
          label="Start Date"
          variant="outlined"
          fullWidth
          margin="dense"
          name="start_date"
          value={newCompetition.start_date}
          onChange={handleInputChange}
          className="mt-1"
        />
        <TextField
          value={newCompetition.end_date}
          label="End"
          variant="outlined"
          fullWidth
          name="end_date"
          onChange={handleInputChange}
          margin="dense"
          className="mt-1"
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
              value={user}
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
            <MenuItem value={problem}>{problem.statement}</MenuItem>
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
