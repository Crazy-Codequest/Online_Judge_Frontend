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
import { urlConstants } from "../../../apis";
import axios from "axios";

const Edit = ({
  selectedProblem,
  openEditDialog,
  setOpenEditDialog,
  setProblems,
  problems,
  updateUser,
}) => {
  const [updatedProblemData, setUpdatedProblemData] = useState({
    statement: selectedProblem.statement,
    difficulty: selectedProblem.difficulty,
    topic: selectedProblem.topic,
    competition_problem: selectedProblem.competition_problem,
  });

  const handleUpdateProblem = async () => {
    try {
      await axios.post(
        urlConstants.updateProblem,
        {
          id: selectedProblem._id,
          ...selectedProblem,
          ...updatedProblemData,
        },
        getConfig()
      );
      const updatedProblem = { ...selectedProblem, ...updatedProblemData };
      setProblems(
        problems.map((problem) =>
          problem._id === updatedProblem._id ? updatedProblem : problem
        )
      );
      setOpenEditDialog(false);
      toast.success("Problem updated successfully!");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProblemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    selectedProblem && (
      <div>
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit user details</DialogContentText>
            <TextField
              label="Statement"
              variant="outlined"
              fullWidth
              margin="dense"
              name="statement"
              value={updatedProblemData.statement}
              onChange={handleInputChange}
            />
            <TextField
              label="Difficulty"
              variant="outlined"
              fullWidth
              margin="dense"
              name="difficulty"
              value={updatedProblemData.difficulty}
              onChange={handleInputChange}
            />
            <TextField
              label="Topic"
              variant="outlined"
              fullWidth
              margin="dense"
              name="topic"
              value={updatedProblemData.topic}
              onChange={handleInputChange}
            />
            <TextField
              label="Competition Problem"
              variant="outlined"
              fullWidth
              margin="dense"
              name="competition_problem"
              value={updatedProblemData.competition_problem}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateProblem}>Update</Button>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
};

export default Edit;
