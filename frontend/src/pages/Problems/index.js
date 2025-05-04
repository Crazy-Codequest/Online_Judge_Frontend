import React, { useState, useEffect } from "react";
import { Box, Chip, Paper, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { getConfig } from "../../utils/getConfig";
import { PROBLEMS_PER_PAGE } from "../../utils/constants";
import { urlConstants } from "../../apis";
import Loading from "../Loader/Loader";
import { Link } from "react-router-dom";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topicCounts, setTopicCounts] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PROBLEMS_PER_PAGE,
  });
  const [selectedTopic, setSelectedTopic] = useState(null);

  const theme = useTheme();

  useEffect(() => {
    const getProblems = async () => {
      try {
        const { data } = await axios.get(urlConstants.getProblems, getConfig());
        setProblems(data.problems);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    const getTopicCounts = async () => {
      try {
        const { data } = await axios.get(
          urlConstants.getTopicCounts,
          getConfig()
        );
        setTopicCounts(data.topicCounts);
      } catch (e) {
        console.log(e);
      }
    };

    getProblems();
    getTopicCounts();
  }, []);

  const filteredProblems = selectedTopic
    ? problems.filter((p) => p.topic === selectedTopic)
    : problems;

  const columns = [
    {
      field: "statement",
      headerName: "Statement",
      flex: 2,
      sortable: true,
      renderCell: (params) => (
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          to={`/statement/${params.row._id}`}
        >
          <span style={{ cursor: "pointer" }}>{params.value}</span>
        </Link>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      valueGetter: (value) => {
        if (Array.isArray(value)) {
          const text = value.join(" ");
          return text.length > 100 ? text.substring(0, 100) + "..." : text;
        }
        return value;
      },
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      flex: 1,
      sortable: true,
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
      sortable: true,
    },
  ];

  if (loading) return <Loading />;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 6,
      }}
    >
      {/* Topic Filter */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          width: { xs: "95%", md: "75%", lg: "60%" },
          mb: 4,
          p: 2,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {topicCounts.map((topic) => (
          <Chip
            key={topic._id}
            label={`${topic._id} (${topic.count})`}
            variant={selectedTopic === topic._id ? "filled" : "outlined"}
            color="primary"
            onClick={() =>
              setSelectedTopic((prev) =>
                prev === topic._id ? null : topic._id
              )
            }
            sx={{ fontWeight: 500, px: 1, cursor: "pointer" }}
          />
        ))}
        {selectedTopic && (
          <Button
            onClick={() => setSelectedTopic(null)}
            size="small"
            sx={{ ml: "auto" }}
          >
            Clear Filter
          </Button>
        )}
      </Paper>

      {/* Data Table */}
      <Box sx={{ width: { xs: "95%", md: "75%", lg: "60%" } }}>
        <DataGrid
          rows={filteredProblems.slice(
            paginationModel.page * paginationModel.pageSize,
            (paginationModel.page + 1) * paginationModel.pageSize
          )}
          columns={columns}
          rowCount={filteredProblems.length}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[PROBLEMS_PER_PAGE]}
          getRowId={(row) => row._id}
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.secondary.main,
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: theme.palette.action.hover,
            },
            "& .MuiDataGrid-cell": {
              py: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Problems;
