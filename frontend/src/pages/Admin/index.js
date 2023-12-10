import { useState } from "react";
import Sidebar from "./Sidebar";
import UserTable from "./Users";
import CreateUser from "./Users/Create";
import Edit from "./Users/Edit";
import Delete from "./Users/Delete";

const Admin = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentState, setCurrentState] = useState("Users");

  return (
    <div className="admin-page">
      <Sidebar
        setOpenCreateDialog={setOpenCreateDialog}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        setCurrentState={setCurrentState}
      />
      {currentState === "Users" && (
        <UserTable
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          setOpenEditDialog={setOpenEditDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          users={users}
          setUsers={setUsers}
          openCreateDialog={openCreateDialog}
          usersData={usersData}
          setUsersData={setUsersData}
        />
      )}
      <CreateUser
        openCreateDialog={openCreateDialog}
        setOpenCreateDialog={setOpenCreateDialog}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setUsersData={setUsersData}
      />
      {openEditDialog && (
        <Edit
          openEditDialog={openEditDialog}
          selectedUser={selectedUser}
          setOpenEditDialog={setOpenEditDialog}
          users={users}
          setUsers={setUsers}
        />
      )}
      <Delete
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
};
export default Admin;
