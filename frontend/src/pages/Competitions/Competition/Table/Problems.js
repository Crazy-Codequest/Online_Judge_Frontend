import React from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const Problems = ({ problems, verifySubmissions }) => {
  const navigate = useNavigate();

  const columns = [
    {
      field: "statement",
      headerName: "Statement",
      flex: 2,
      sortable: true,
      renderCell: (params) => (
        <Typography
          noWrap
          sx={{
            cursor: "pointer",
            color: "blue",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => navigate(`/competition/statement/${params.row._id}`)}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
      sortable: true,
      renderCell: (params) => <Typography noWrap>{params.value}</Typography>,
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      flex: 1,
      sortable: true,
      renderCell: (params) => <Typography noWrap>{params.value}</Typography>,
    },
    {
      field: "verdict",
      headerName: "Verdict",
      flex: 1,
      sortable: false,
      valueGetter: (params) =>
        verifySubmissions(params?.row?._id) > 0 ? "Passed" : "NA",
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: "bold",
            color: params.value === "Passed" ? "green" : "red",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "auto" }}>
      <DataGrid
        rows={problems}
        columns={columns}
        getRowId={(row) => row._id}
        autoHeight
        disableColumnSeparator
        disableSelectionOnClick
        hideFooterSelectedRowCount
        getRowClassName={(params) =>
          verifySubmissions(params.row._id) > 0 ? "green-row" : ""
        }
        sx={{
          border: "none",
          "& .MuiDataGrid-cell": {
            padding: "8px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
          },
          "& .green-row": {
            backgroundColor: "rgba(0, 255, 0, 0.2)", // Light green for passed verdict
          },
        }}
      />
    </Box>
  );
};

export default Problems;
