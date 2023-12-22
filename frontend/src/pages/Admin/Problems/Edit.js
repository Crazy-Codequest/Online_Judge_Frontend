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
import CloseIcon from "@mui/icons-material/Close";

import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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
    solution: selectedProblem.solution,
    description: selectedProblem.description,
    constraints: selectedProblem.constraints,
    examples: selectedProblem.examples,
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

  const handleAddExample = () => {
    setUpdatedProblemData((prevProblem) => ({
      ...prevProblem,
      examples: [
        ...prevProblem.examples,
        { input: "", output: "", explanation: "" },
      ],
    }));
  };

  const handleArrayInputChange = (name, value) => {
    setUpdatedProblemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteExample = (index) => {
    const updatedExamples = [...updatedProblemData.examples];
    updatedExamples.splice(index, 1);

    setUpdatedProblemData((prevProblem) => ({
      ...prevProblem,
      examples: updatedExamples,
    }));
  };

  const handleExampleChange = (index, field, value) => {
    const updatedExamples = [...updatedProblemData.examples];
    updatedExamples[index][field] = value;

    setUpdatedProblemData((prevProblem) => ({
      ...prevProblem,
      examples: updatedExamples,
    }));
  };

  return (
    selectedProblem && (
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth={false}
        fullScreen
      >
        <DialogTitle className="mt-2 ml-2">Edit Problem</DialogTitle>
        <div onClick={() => setOpenEditDialog(false)} className="close-icon">
          <CloseIcon />
        </div>
        <DialogContent className="dialog-content">
          <DialogContentText>Enter problem details</DialogContentText>
          <TextField
            label="Statement"
            variant="outlined"
            fullWidth
            margin="dense"
            name="statement"
            value={updatedProblemData.statement}
            onChange={handleInputChange}
          />
          <div className="flex-end">
            <TextField
              label="Difficulty"
              variant="outlined"
              className="mt-1"
              margin="dense"
              name="difficulty"
              select
              style={{ width: "45%" }}
              value={updatedProblemData.difficulty}
              onChange={handleInputChange}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </TextField>
            <TextField
              value={updatedProblemData.topic}
              label="Topic"
              className="mt-1"
              variant="outlined"
              fullWidth
              name="topic"
              select
              style={{ width: "45%" }}
              margin="dense"
              onChange={handleInputChange}
            >
              <MenuItem value="strings">Strings</MenuItem>
              <MenuItem value="arrays">Arrays</MenuItem>
            </TextField>
          </div>

          <TextField
            value={updatedProblemData.competition_problem}
            label="Competition Problem"
            variant="outlined"
            className="mt-1"
            fullWidth
            margin="dense"
            name="competition_problem"
            select
            onChange={handleInputChange}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </TextField>

          <TextField
            value={updatedProblemData.description?.join("\n")}
            label="Description"
            variant="outlined"
            className="mt-1"
            fullWidth
            multiline
            rows={3}
            margin="dense"
            name="description"
            onChange={(e) =>
              handleArrayInputChange("description", e.target.value.split("\n"))
            }
          />
          <TextField
            value={updatedProblemData.constraints?.join("\n")}
            label="Constraints"
            variant="outlined"
            className="mt-1"
            fullWidth
            multiline
            rows={3}
            margin="dense"
            name="constraints"
            onChange={(e) =>
              handleArrayInputChange("constraints", e.target.value.split("\n"))
            }
          />
          {updatedProblemData.examples?.length && (
            <div className="examples mt-2">
              {updatedProblemData.examples.map((example, index) => (
                <div key={index}>
                  <TextField
                    label="Input Example"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    name={`inputExample-${index}`}
                    value={example.input}
                    onChange={(e) =>
                      handleExampleChange(index, "input", e.target.value)
                    }
                  />

                  <TextField
                    label="Output Example"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    name={`outputExample-${index}`}
                    value={example.output}
                    onChange={(e) =>
                      handleExampleChange(index, "output", e.target.value)
                    }
                  />

                  <TextField
                    label="Explanation"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    name={`explanation-${index}`}
                    value={example.explanation}
                    onChange={(e) =>
                      handleExampleChange(index, "explanation", e.target.value)
                    }
                  />

                  <IconButton onClick={() => handleDeleteExample(index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          )}
          <Button onClick={handleAddExample}>Add Example</Button>
        </DialogContent>
        <DialogActions className="action-buttons">
          <Button onClick={handleUpdateProblem}>Save</Button>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export default Edit;
