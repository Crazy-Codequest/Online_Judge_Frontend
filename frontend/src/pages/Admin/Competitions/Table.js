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
import { COMPETITIONS_PER_PAGE } from "../../../utils/constants";
import { urlConstants } from "../../../apis";
import getFormattedDateTime from "../../../utils/time";

const CompetitionTable = ({
  setSelectedCompetition,
  setOpenEditDialog,
  setOpenDeleteDialog,
  competitions,
  setCompetitions,
  openCreateDialog,
  competitionsData,
  setCompetitionsData,
}) => {
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const count = Math.ceil(competitionsData.length / COMPETITIONS_PER_PAGE);

  const getCompetitions = async () => {
    try {
      const { data } = await axios.get(
        urlConstants.getCompetitions,
        getConfig()
      );
      setCompetitionsData(data.competitions);
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
    getCompetitions();
  }, []);

  useEffect(() => {
    if (competitionsData.length) {
      const filteredCompetitions = competitionsData.slice(
        (pageNumber - 1) * COMPETITIONS_PER_PAGE,
        pageNumber * COMPETITIONS_PER_PAGE
      );
      setCompetitions(filteredCompetitions);
    }
  }, [pageNumber, competitionsData]);

  return (
    <div className={`users-page ${openCreateDialog ? "collapse" : ""}`}>
      <TableContainer
        className="table"
        sx={{ width: "80%", margin: "2rem auto" }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="center">Title</TableCell>
              <TableCell className="center">Start Date</TableCell>
              <TableCell className="center">End Date</TableCell>
              <TableCell className="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {competitions.length > 0 && competitions.map((competition) => (
              <TableRow key={competition._id}>
                <TableCell className="center">{competition.title}</TableCell>
                <TableCell className="center">
                  {getFormattedDateTime(competition.start_date)}
                </TableCell>
                <TableCell className="center">
                  {getFormattedDateTime(competition.end_date)}
                </TableCell>
                <TableCell className="center">
                  <Button
                    onClick={() => {
                      setSelectedCompetition(competition);
                      setOpenEditDialog(true);
                    }}
                  >
                    <Edit />
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedCompetition(competition);
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

export default CompetitionTable;
