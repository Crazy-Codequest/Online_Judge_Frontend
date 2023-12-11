import React, { useState } from "react";
import UserLogic from "./Users/UserRoutes";
import Sidebar from "./Sidebar";
import ProblemRoutes from "./Problems/ProblemRoutes";

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
      <UserLogic
        openCreateDialog={openCreateDialog}
        setOpenCreateDialog={setOpenCreateDialog}
      />
      <ProblemRoutes
        openCreateProblemDialog={openCreateProblemDialog}
        setOpenProblemCreateDialog={setOpenProblemCreateDialog}
      />
    </div>
  );
};

export default Admin;
