import React, { useState } from "react";
import Table from "./Table";
import Create from "./Create";
import Edit from "./Edit";

const ProblemRoutes = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState({});
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
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
      />
      <Create
        openCreateDialog={openCreateDialog}
        setOpenCreateDialog={setOpenCreateDialog}
        setProblemsData={setProblemsData}
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
    </>
  );
};

export default ProblemRoutes;
