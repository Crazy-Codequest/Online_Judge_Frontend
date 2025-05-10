import React from "react";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { EmojiEvents as TrophyIcon } from "@mui/icons-material";

const Leaderboard = ({ leaderboard }) => {
  if (!leaderboard) return null;

  const columns = [
    {
      field: "rank",
      headerName: "Rank",
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.row.rank <= 3 ? (
            <TrophyIcon 
              sx={{ 
                color: params.row.rank === 1 ? '#FFD700' : 
                       params.row.rank === 2 ? '#C0C0C0' : '#CD7F32',
              }} 
            />
          ) : (
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
              #{params.row.rank}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "user",
      headerName: "User",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width: 32,
              height: 32,
              fontSize: '0.9rem'
            }}
          >
            {params.value.username[0].toUpperCase()}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 600 }}>
              {params.value.username}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {params.value.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "totalScore",
      headerName: "Score",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.95rem',
            height: 28,
          }}
        />
      ),
    },
  ];

  const rows = leaderboard.map((entry, index) => ({
    id: entry.user.id,
    rank: index + 1,
    user: entry.user,
    totalScore: entry.totalScore,
  }));

  return (
    <Box sx={{ width: "100%", height: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        disableColumnSeparator
        disableSelectionOnClick
        hideFooterSelectedRowCount
        sx={{
          border: "none",
          '& .MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
            borderBottom: "1px solid #f0f0f0",
            background: 'transparent',
            py: 1.5,
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: "#fafafa",
            borderBottom: "2px solid #f0f0f0",
            '& .MuiDataGrid-columnHeader': {
              padding: "14px 8px",
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700,
              color: "text.primary",
            },
          },
          '& .MuiDataGrid-row': {
            '&:nth-of-type(1)': {
              backgroundColor: 'rgba(255, 215, 0, 0.05)',
            },
            '&:nth-of-type(2)': {
              backgroundColor: 'rgba(192, 192, 192, 0.05)',
            },
            '&:nth-of-type(3)': {
              backgroundColor: 'rgba(205, 127, 50, 0.05)',
            },
            '&:hover': {
              backgroundColor: "#f5faff",
            },
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: "1px solid #f0f0f0",
            padding: "12px",
          },
          '& .MuiDataGrid-pagination': {
            fontSize: "0.98rem",
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
      />
    </Box>
  );
};

export default Leaderboard;
