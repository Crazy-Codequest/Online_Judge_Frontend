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

const Submissions = ({ allSubmissions }) => {
  if(!allSubmissions) return null;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className="table-header">User</TableCell>
          <TableCell className="table-header">Result</TableCell>
          <TableCell className="table-header">Submitted At</TableCell>
          <TableCell className="table-header">Language</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allSubmissions.map((submission) => (
          <TableRow
            sx={{
              ...(submission.verdict === "passed" && {backgroundColor: "rgba(0, 255, 0, 0.2)"}),
            }}
            key={submission._id}
          >
            <TableCell>{submission.user?.username}</TableCell>
            <TableCell className="grey">{submission.verdict}</TableCell>
            <TableCell className="grey">
              {getFormattedDateTime(submission.submitted_at)}
            </TableCell>
            <TableCell className="grey">{submission.language}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Submissions;
