import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Pagination } from "@mui/material";
import axios from "axios";
import { getConfig } from "../../utils/getConfig";
import { PROBLEMS_PER_PAGE } from "../../utils/constants";
import { urlConstants } from "../../apis";
import Loading from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [problemsData, setProblemsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const count = Math.ceil(problemsData.length / PROBLEMS_PER_PAGE);

  const navigate = useNavigate();

  const getProblems = async () => {
    try {
      const { data } = await axios.get(urlConstants.getProblems, getConfig());

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
    if (problemsData.length) {
      const filteredProblems = problemsData.slice(
        (pageNumber - 1) * PROBLEMS_PER_PAGE,
        pageNumber * PROBLEMS_PER_PAGE
      );
      setProblems(filteredProblems);
    }
  }, [pageNumber, problemsData]);

  useEffect(() => {
    getProblems();
  }, []);

  if (loading && problems.length === 0) {
    return <Loading />;
  }

  return (
    <div className="problem-list">
      {console.log(problems)}
      <TableContainer
        className="table"
        sx={{ width: "100%", margin: "2rem auto" }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="center">Statement</TableCell>
              <TableCell className="center">Description</TableCell>
              <TableCell className="center">Topic</TableCell>
              <TableCell className="center">Difficulty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((problem) => (
              <TableRow key={problem._id}>
                <TableCell
                  onClick={(event) => navigate(`/statement/${problem._id}`)}
                  width="40%"
                  className="center pointer"
                >
                  {problem.statement}
                </TableCell>
                <TableCell width="30%" className="center">
                  {`${
                    String(problem.description).length > 100
                      ? String(problem.description).substring(0, 100) + "..."
                      : String(problem.description)
                  }`}
                </TableCell>
                <TableCell width="15%" className="center">
                  {problem.difficulty}
                </TableCell>
                <TableCell width="15%" className="center">
                  {problem.competition_problem ? "true" : "false"}
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

export default Problems;
