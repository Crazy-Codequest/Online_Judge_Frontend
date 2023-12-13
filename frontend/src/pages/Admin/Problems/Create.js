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

const Create = ({ openCreateDialog, setOpenCreateDialog, setProblemsData }) => {
  const [newProblem, setNewProblem] = useState({
    statement: "",
    difficulty: "",
    topic: "",
    competition_problem: "",
    solution: "",
  });
  const handleCreateProblem = async () => {
    try {
      let { data } = await axios.post(
        urlConstants.createProblem,
        {
          ...newProblem,
        },
        getConfig()
      );
      const problem = data.newprob;
      console.log(problem);
      setProblemsData((prev) => [...prev, problem]);
      setOpenCreateDialog(false);
      toast.success("Problem created successfully!");
      setNewProblem({});
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProblem((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
      <DialogTitle>Create Problem</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter problem details</DialogContentText>
        <TextField
          label="Statement"
          variant="outlined"
          fullWidth
          margin="dense"
          name="statement"
          value={newProblem.statement}
          onChange={handleInputChange}
        />
        <TextField
          label="Difficulty"
          variant="outlined"
          fullWidth
          margin="dense"
          name="difficulty"
          value={newProblem.difficulty}
          onChange={handleInputChange}
        />
        <TextField
          value={newProblem.topic}
          label="Topic"
          variant="outlined"
          fullWidth
          name="topic"
          onChange={handleInputChange}
          margin="dense"
        />
        <TextField
          value={newProblem.competition_problem}
          label="Competition Problem"
          variant="outlined"
          fullWidth
          margin="dense"
          name="competition_problem"
          onChange={handleInputChange}
        />
        <TextField
          value={newProblem.solution}
          label="Solution"
          variant="outlined"
          fullWidth
          margin="dense"
          name="solution"
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateProblem}>Create</Button>
        <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Create;
