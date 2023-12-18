import { useState } from "react";
import UserTable from "./Table";
import CreateUser from "./Create";
import Edit from "./Edit";
import Delete from "./Delete";

const UserLogic = ({ openCreateDialog, setOpenCreateDialog }) => {
  const [usersData, setUsersData] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [users, setUsers] = useState([]);

  return (
    <>
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
    </>
  );
};
export default UserLogic;
