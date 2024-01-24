import React from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import getFormattedDateTime from "../../../../utils/time";

const Submissions = ({ leaderboard }) => {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className="table-header">User</TableCell>
          <TableCell className="table-header">Email</TableCell>
          <TableCell className="table-header">Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {leaderboard.map((submission) => (
          <TableRow key={submission._id}>
            <TableCell>{submission.user.username}</TableCell>
            <TableCell>{submission.user.email}</TableCell>
            <TableCell className="grey">{submission.totalScore}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Submissions;
