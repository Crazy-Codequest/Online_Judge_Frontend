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
import { PROBLEMS_PER_PAGE } from "../../../utils/constants";
import { adminRoutes, urlConstants } from "../../../apis";
import { useSelector } from "react-redux";

const ProblemsTable = ({
  setSelectedProblem,
  setOpenEditDialog,
  setOpenDeleteDialog,
  problems,
  setProblems,
  openCreateDialog,
  problemsData,
  setProblemsData,
}) => {
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const count = Math.ceil(problemsData.length / PROBLEMS_PER_PAGE);

  const { user } = useSelector((state) => state.auth);

  const getProblems = async () => {
    try {
      const { data } = await axios.get(
        `${adminRoutes.getProblems}/${user._id}`,
        getConfig()
      );
      setProblemsData(data.problems);
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
    getProblems();
  }, []);

  useEffect(() => {
    if (problemsData.length) {
      const filteredProblems = problemsData.slice(
        (pageNumber - 1) * PROBLEMS_PER_PAGE,
        pageNumber * PROBLEMS_PER_PAGE
      );
      setProblems(filteredProblems);
    }
  }, [pageNumber, problemsData]);

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
              <TableCell className="center">Statement</TableCell>
              <TableCell className="center">Difficulty</TableCell>
              <TableCell className="center">Topic</TableCell>
              <TableCell className="center">Competition Problem</TableCell>
              <TableCell className="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((problem) => (
              <TableRow key={problem._id}>
                <TableCell className="center">{problem.statement}</TableCell>
                <TableCell className="center">{problem.difficulty}</TableCell>
                <TableCell className="center">{problem.topic}</TableCell>
                <TableCell className="center">
                  {problem.competition_problem ? "true" : "false"}
                </TableCell>
                <TableCell className="center">
                  <Button>
                    <Edit
                      onClick={() => {
                        console.log(problem);
                        setSelectedProblem(problem);
                        setOpenEditDialog(true);
                      }}
                    />
                  </Button>
                  <Button>
                    <Delete
                      onClick={() => {
                        setSelectedProblem(problem);
                        setOpenDeleteDialog(true);
                      }}
                    />
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

export default ProblemsTable;
