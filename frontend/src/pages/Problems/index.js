import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
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

  const navigate = useNavigate();

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

    getProblems();
  }, []);

  if (loading) return <Loading />;

const columns = [
  {
    field: "statement",
    headerName: "Statement",
    flex: 2,
    sortable: true,
    renderCell: (params) => (
      <Link style={{
        color: "inherit", textDecoration: "none"
      }} to={`/statement/${params.row._id}`}>
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
    field: "competition_problem",
    headerName: "Competition Problem",
    flex: 1,
    sortable: true,
    valueGetter: (params) => (params.value ? "Yes" : "No"),
  },
];


  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", py: 6 }}>
      <Paper sx={{ width: "50%", boxShadow: "none" }}>
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
              backgroundColor: "#f5f5f5",
              borderBottom: "none",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "white",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#f9f9f9",
            },
            "& .MuiDataGrid-virtualScroller": {
              border: "none",
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default Problems;
