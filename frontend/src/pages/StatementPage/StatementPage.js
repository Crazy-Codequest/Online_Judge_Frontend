import { Box, List, ListItem, ListItemText, Skeleton, Typography, Paper, useTheme } from "@mui/material";
import React from "react";

const blockBg = "#f7f7fa";

const StatementPage = ({
  examples,
  setDesc,
  statement,
  description,
  constraints,
  loading
}) => {
  const theme = useTheme();

  const descElements = () => {
    return description.map((line, index) => (
      <Typography key={index} variant="body1" sx={{ color: theme.palette.text.primary }}>
        {line}
      </Typography>
    ));
  };

  if(loading) {
    return <Skeleton variant="rectangular" width="100%" height="90vh" />
  }

  return (
    <Paper
      sx={{
        p: 0,
        borderRadius: 2,
        minHeight: "90vh",
        boxShadow: '0 2px 12px #0001',
        border: '1px solid #ececec',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Tabs */}
      <Box sx={{ display: "flex", gap: 2, borderBottom: '1px solid #ececec', px: 3, pt: 2, pb: 1 }}>
        <Typography
          variant="h5"
          sx={{ cursor: "pointer", fontWeight: 700, pb: 1, borderBottom: '3px solid #1976d2' }}
          onClick={() => setDesc(true)}
        >
          Description
        </Typography>
        <Typography
          variant="h5"
          sx={{ cursor: "pointer", fontWeight: 700, pb: 1, borderBottom: '3px solid transparent'  }}
          onClick={() => setDesc(false)}
        >
          Submissions
        </Typography>
      </Box>
      {/* Content */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#444" }}>{statement}</Typography>
        {descElements()}

        {examples && (
          <>
            <Typography mt={2} variant="h6" sx={{ fontWeight: 700, color: "#444" }}>
              Examples:
            </Typography>
            <ul style={{ paddingLeft: 0 }}>
              {examples.map((example, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    border: '1px solid #ececec',
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography fontWeight="bold">Input: </Typography>
                    <Typography>{` ${example.input}`}</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight="bold">Output: </Typography>
                    <Typography>{example.output}</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight="bold">Explanation: </Typography>
                    <Typography>{example.explanation}</Typography>
                  </Box>
                </Box>
              ))}
            </ul>
          </>
        )}
        {constraints && (
          <>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 700, color: "#444" }}>
              Constraints:
            </Typography>
            <List sx={{ listStyleType: "disc", pl: 2, fontSize: "1.1rem", color: "#555" }}>
              {constraints.map((constraint, index) => (
                <ListItem
                  key={index}
                  sx={{
                    listStyleType: "disc",
                    display: "list-item",
                    py: 0,
                    margin: 0,
                    borderBottom: '1px solid #ececec',
                    backgroundColor: '#fff',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={constraint}
                    sx={{ marginLeft: "-10px" }}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default StatementPage;
