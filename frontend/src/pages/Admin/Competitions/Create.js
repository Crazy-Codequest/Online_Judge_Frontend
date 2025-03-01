import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Chip,
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
    problems: [],
    users: [],
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
    setNewCompetition((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddItem = (item, type, key) => {
    console.log(item);
    setNewCompetition((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], { key: key, value: item }],
    }));
  };

  const handleAddProblem = (item, type) => {
    setNewCompetition((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], item],
    }));
  };

  const handleRemoveItem = (index, type) => {
    setNewCompetition((prevData) => ({
      ...prevData,
      [type]: prevData[type].filter((_, i) => i !== index),
    }));
  };

  const getProblemIds = async () => {
    try {
      const { data } = await axios.get(
        `${adminRoutes.getProblemIds}/${user._id}`
      );
      setProblems(data.problems);
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
      <DialogTitle className="mt-2 ml-2">Create Competition</DialogTitle>
      <DialogContent className="dialog-content">
        <DialogContentText>Enter competition details</DialogContentText>
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
          label="Applicants"
          variant="outlined"
          fullWidth
          margin="dense"
          name="users"
          select
          className="mt-3"
          onChange={(e) => handleAddItem(e.target.value, "users")}
        >
          {users.map((user, index) => (
            <MenuItem key={index} value={user._id}>
              {`${user.firstname} ${user.lastname}`}
            </MenuItem>
          ))}
        </TextField>
        <div className="mt-2">
          {newCompetition.users.map((user, index) => (
            <Chip
              key={index}
              label={`${user.firstname} ${user.lastname}`}
              onDelete={() => handleRemoveItem(index, "users")}
              className="mr-2"
            />
          ))}
        </div>
        <TextField
          label="Problem Ids"
          variant="outlined"
          fullWidth
          margin="dense"
          name="problems"
          select
          className="mt-1"
          onChange={(e) => handleAddProblem(e.target.value, "problems")}
        >
          {problems.map((problem, index) => (
            <MenuItem key={index} value={problem._id}>
              {problem.statement}
            </MenuItem>
          ))}
        </TextField>
        <div className="mt-2">
          {newCompetition.problems.map((problem, index) => (
            <Chip
              key={index}
              label={problem.statement}
              onDelete={() => handleRemoveItem(index, "problems")}
              className="mr-2"
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions className="action-buttons">
        <Button onClick={handleCreateCompetition}>Create</Button>
        <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Create;
