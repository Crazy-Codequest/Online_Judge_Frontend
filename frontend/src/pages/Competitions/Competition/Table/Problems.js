import React from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Problems = ({ problems, verifySubmissions }) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className="table-header">Statement</TableCell>
          <TableCell className="table-header">Topic</TableCell>
          <TableCell className="table-header">Difficulty</TableCell>
          <TableCell className="table-header">Verdict</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {problems.map((problem) => (
          <TableRow
            className={`${verifySubmissions(problem._id) > 0 ? "green" : ""}`}
            key={problem._id}
          >
            <TableCell
              className={`pointer`}
              onClick={() => navigate(`/competition/statement/${problem._id}`)}
            >
              {problem.statement}
            </TableCell>
            <TableCell className="grey">{problem.topic}</TableCell>
            <TableCell className="grey">{problem.difficulty}</TableCell>
            <TableCell className="grey">
              {verifySubmissions(problem._id) > 0 ? "Passed" : "NA"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Problems;
