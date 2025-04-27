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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import axios from "axios";
import { getConfig } from "../../../utils/getConfig";
import Loading from "../../Loader/Loader";
import { USERS_PER_PAGE } from "../../../utils/constants";
import { urlConstants } from "../../../apis";

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
        urlConstants.getUsers,
        getConfig()
      );
      setUsersData(data.users);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
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
    <>
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
    </>
  );
};

export default UserTable;
