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

const Create = ({
  openCreateDialog,
  setOpenCreateDialog,
  setCompetitionsData,
}) => {
  const [newCompetition, setNewCompetition] = useState({
    title: "",
    start_date: "",
    end_date: "",
  });
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
    setNewCompetition((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
      <DialogTitle>Create Competition</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter compeitition details</DialogContentText>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="dense"
          name="title"
          value={newCompetition.title}
          onChange={handleInputChange}
        />
        <TextField
          label="Start Date"
          variant="outlined"
          fullWidth
          margin="dense"
          name="start_date"
          value={newCompetition.start_date}
          onChange={handleInputChange}
        />
        <TextField
          value={newCompetition.end_date}
          label="End"
          variant="outlined"
          fullWidth
          name="end_date"
          onChange={handleInputChange}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateCompetition}>Create</Button>
        <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Create;
