import React, { useState } from "react";
import Table from "./Table";
import Create from "./Create";
import Edit from "./Edit";
import Delete from "../Users/Delete";

const ProblemRoutes = ({
  openCreateProblemDialog,
  setOpenProblemCreateDialog,
}) => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState({});
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [problemsData, setProblemsData] = useState([]);
  return (
    <>
      <Table
        problems={problems}
        setProblems={setProblems}
        openCreateDialog={openCreateDialog}
        setOpenCreateDialog={setOpenCreateDialog}
        selectedProblem={selectedProblem}
        setSelectedProblem={setSelectedProblem}
        problemsData={problemsData}
        setProblemsData={setProblemsData}
        setOpenEditDialog={setOpenEditDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
      />
      {openEditDialog && (
        <Edit
          openEditDialog={openEditDialog}
          selectedProblem={selectedProblem}
          setOpenEditDialog={setOpenEditDialog}
          problems={problems}
          setProblems={setProblems}
        />
      )}
      <Create
        openCreateDialog={openCreateProblemDialog}
        setOpenCreateDialog={setOpenProblemCreateDialog}
        selectedProblem={selectedProblem}
        setSelectedProblem={setSelectedProblem}
        setProblemsData={setProblemsData}
      />
      <Delete
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        selectedProblem={selectedProblem}
        setSelectedProblem={setSelectedProblem}
        problems={problems}
        setProblems={setProblems}
      />
    </>
  );
};

export default ProblemRoutes;
