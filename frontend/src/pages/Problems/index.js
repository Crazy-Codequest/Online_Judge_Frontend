import React, { useState, useEffect } from "react";
import { Box, Chip, Paper, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { getConfig } from "../../utils/getConfig";
import { PROBLEMS_PER_PAGE } from "../../utils/constants";
import { urlConstants } from "../../apis";
import Loading from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProblems, setTotalProblems] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PROBLEMS_PER_PAGE,
  });
  const [topicCounts, setTopicCounts] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    const getProblems = async () => {
      try {
        const { data } = await axios.get(urlConstants.getProblems, getConfig());
        setTotalProblems(data.problems.length);
        setProblems(data.problems);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    const getTopicCounts = async () => {
      try{
        const {data} = await axios.get(urlConstants.getTopicCounts, getConfig());
        setTopicCounts(data.topicCounts);
        console.log(data.topicCounts);
      }catch(e){
        console.log(e);
      }
    }

    getProblems();
    getTopicCounts();
  }, []);

  if (loading) return <Loading />;

const columns = [
  {
    field: "statement",
    headerName: "Statement",
    flex: 2,
    sortable: true,
    renderCell: (params) => (
      <Link
        style={{
          color: "inherit",
          textDecoration: "none",
        }}
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
    valueGetter: (value, row, column, apiRef) => {
      const descArray = value;
      if (Array.isArray(descArray)) {
        const formattedDesc = descArray.join(" ");
        return formattedDesc.length > 100
          ? `${formattedDesc.substring(0, 100)}...`
          : formattedDesc;
      }
      console.log(value);

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


  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          width: { xs: "95%", md: "70%", lg: "50%" },
          mb: 3,
        }}
      >
        {topicCounts.map((topic) => {
          return (
            <Typography>
              {`${topic._id} `}
              <Chip sx={{ p: 0 }} variant="filter" label={topic.count} />
            </Typography>
          );
        })}
      </Box>
      <Box
        sx={{
          width: { xs: "95%", md: "70%", lg: "50%" },
          boxShadow: "none",
        }}
      >
        <DataGrid
          rows={problems.slice(
            paginationModel.page * paginationModel.pageSize,
            (paginationModel.page + 1) * paginationModel.pageSize
          )}
          columns={columns}
          pagination
          paginationMode="server"
          rowCount={totalProblems}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          getRowId={(row) => row._id}
          disableColumnSeparator
          disableSelectionOnClick
          hideFooterSelectedRowCount
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
          }
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              padding: "4px",
              border: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.secondary.main,
              borderBottom: "none",
            },
            "& .MuiDataGrid-row": {
              // backgroundColor: theme.palette.secondary.main,
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: theme.palette.secondary.main,
            },
            "& .MuiDataGrid-virtualScroller": {
              border: "none",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Problems;
