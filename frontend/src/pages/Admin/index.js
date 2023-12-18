import React, { useState } from "react";
import UserLogic from "./Users/Routes";
import Sidebar from "./Sidebar";
import ProblemRoutes from "./Problems/Routes";
import CompetitonHandle from "./Competitions/Routes";

const Admin = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openCreateProblemDialog, setOpenProblemCreateDialog] = useState(false);
  const [currentState, setCurrentState] = useState("Problems");

  return (
    <div className="admin-page">
      <Sidebar
        setOpenCreateDialog={setOpenCreateDialog}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        setCurrentState={setCurrentState}
        setOpenProblemCreateDialog={setOpenProblemCreateDialog}
      />
      {currentState === "Users" && (
        <UserLogic
          openCreateDialog={openCreateDialog}
          setOpenCreateDialog={setOpenCreateDialog}
        />
      )}
      {currentState === "Problems" && (
        <ProblemRoutes
          openCreateProblemDialog={openCreateProblemDialog}
          setOpenProblemCreateDialog={setOpenProblemCreateDialog}
        />
      )}
      {currentState === "Competitions" && (
        <CompetitonHandle
          openCreateDialog={openCreateDialog}
          setOpenCreateDialog={setOpenCreateDialog}
        />
      )}
    </div>
  );
};

export default Admin;
