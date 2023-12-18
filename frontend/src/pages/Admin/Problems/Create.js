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

const Create = ({ openCreateDialog, setOpenCreateDialog, setProblemsData }) => {
  const [newProblem, setNewProblem] = useState({
    statement: "",
    difficulty: "",
    topic: "",
    competition_problem: "",
    solution: "",
    description: [""],
    constraints: [""],
    examples: [],
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

  const handleExampleChange = (index, field, value) => {
    const updatedExamples = [...newProblem.examples];
    updatedExamples[index][field] = value;

    setNewProblem((prevProblem) => ({
      ...prevProblem,
      examples: updatedExamples,
    }));
  };

  const handleAddExample = () => {
    setNewProblem((prevProblem) => ({
      ...prevProblem,
      examples: [
        ...prevProblem.examples,
        { input: "", output: "", explanation: "" },
      ],
    }));
  };

  const handleDeleteExample = (index) => {
    const updatedExamples = [...newProblem.examples];
    updatedExamples.splice(index, 1);

    setNewProblem((prevProblem) => ({
      ...prevProblem,
      examples: updatedExamples,
    }));
  };

  const handleArrayInputChange = (name, value) => {
    setNewProblem((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog
      open={openCreateDialog}
      onClose={() => setOpenCreateDialog(false)}
      fullWidth
      maxWidth={false}
      fullScreen
    >
      <DialogTitle className="mt-2 ml-2">Create Problem</DialogTitle>
      <div onClick={() => setOpenCreateDialog(false)} className="close-icon">
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
          value={newProblem.statement}
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
            value={newProblem.difficulty}
            onChange={handleInputChange}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </TextField>
          <TextField
            value={newProblem.topic}
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
          value={newProblem.competition_problem}
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
          value={newProblem.description?.join("\n")}
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
          value={newProblem.constraints?.join("\n")}
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
        {newProblem.examples?.length && (
          <div className="examples mt-2">
            {newProblem.examples.map((example, index) => (
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
        <Button onClick={handleCreateProblem}>Create</Button>
        <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Create;
