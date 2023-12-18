import { useState } from "react";
import Table from "./Table";
import Create from "./Create";
import Edit from "./Edit";
import Delete from "./Delete";

const CompetitonHandle = ({ openCreateDialog, setOpenCreateDialog }) => {
  const [competitionsData, setCompetitionsData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  return (
    <>
      <Table
        selectedCompetition={selectedCompetition}
        setSelectedCompetition={setSelectedCompetition}
        setOpenEditDialog={setOpenEditDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        competitions={competitions}
        setCompetitions={setCompetitions}
        openCreateDialog={openCreateDialog}
        competitionsData={competitionsData}
        setCompetitionsData={setCompetitionsData}
      />
      <Create
        openCreateDialog={openCreateDialog}
        setOpenCreateDialog={setOpenCreateDialog}
        selectedCompetition={selectedCompetition}
        setSelectedCompetition={setSelectedCompetition}
        setCompetitionsData={setCompetitionsData}
      />
      {openEditDialog && (
        <Edit
          openEditDialog={openEditDialog}
          selectedCompetition={selectedCompetition}
          setOpenEditDialog={setOpenEditDialog}
          competitions={competitions}
          setCompetitions={setCompetitions}
        />
      )}
      <Delete
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        selectedCompetition={selectedCompetition}
        setSelectedCompetition={setSelectedCompetition}
        competitions={competitions}
        setCompetitions={setCompetitions}
      />
    </>
  );
};
export default CompetitonHandle;
