import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import axios from "axios";
import { getConfig } from "../../../utils/getConfig";
import Loading from "../../Loader/Loader";
import { USERS_PER_PAGE } from "../../../utils/constants";

// Replace this with your API calls or other data source

const createUser = async (user) => {
  const response = await fetch("https://your-api-endpoint.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

const updateUser = async (user) => {
  const response = await fetch(
    `https://your-api-endpoint.com/users/<span class="math-inline">\{<2\>user\.\_id\}\`, \{
method\: 'PUT',
headers\: \{
'Content\-Type'\: 'application/json'
\},
body\: JSON\.stringify\(user\)
\}\);
const data \= await response\.json\(\);
return data;</2\>
\};
const deleteUser \= async \(userId\) \=\> \{
const response \= await fetch\(\`https\://your\-api\-endpoint\.com/users/</span>{userId}`,
    {
      method: "DELETE",
    }
  );
  await response.json();
};

const UserTable = ({
  setSelectedUser,
  setOpenEditDialog,
  setOpenDeleteDialog,
  users,
  setUsers,
  openCreateDialog,
  usersData,
  setUsersData,
}) => {
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const count = Math.ceil(usersData.length / USERS_PER_PAGE);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/users",
        getConfig()
      );
      setUsersData(data.users);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    // Get form values for new user
    const newUser = {
      // ...
    };
    const createdUser = await createUser(newUser);
    setUsers([...users, createdUser]);
  };

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (usersData.length) {
      const filteredUsers = usersData.slice(
        (pageNumber - 1) * USERS_PER_PAGE,
        pageNumber * USERS_PER_PAGE
      );
      setUsers(filteredUsers);
    }
  }, [pageNumber, usersData]);

  return (
    <div className={`users-page ${openCreateDialog ? "collapse" : ""}`}>
      <TableContainer
        className="table"
        sx={{ width: "100%", margin: "2rem auto" }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="center">Firstname</TableCell>
              <TableCell className="center">Lastname</TableCell>
              <TableCell className="center">Email</TableCell>
              <TableCell className="center">Role</TableCell>
              <TableCell className="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="center">{user.firstname}</TableCell>
                <TableCell className="center">{user.lastname}</TableCell>
                <TableCell className="center">{user.email}</TableCell>
                <TableCell className="center">{user.role}</TableCell>
                <TableCell className="center">
                  <Button
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenEditDialog(true);
                    }}
                  >
                    <Edit />
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={count}
        page={pageNumber}
        onChange={handleChangePage}
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      />
    </div>
  );
};

export default UserTable;
