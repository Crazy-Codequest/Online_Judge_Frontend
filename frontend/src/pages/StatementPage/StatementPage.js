import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

const StatementPage = ({
  examples,
  setDesc,
  statement,
  description,
  constraints,
}) => {
  const descElements = () => {
    return description.map((line, index) => (
      <Typography key={index} variant="body1">
        {line}
      </Typography>
    ));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 2,
        borderRadius: 2,
        minHeight: "90vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{ cursor: "pointer" }}
          onClick={() => setDesc(true)}
        >
          Description
        </Typography>
        <Typography
          variant="h2"
          sx={{ cursor: "pointer" }}
          onClick={() => setDesc(false)}
        >
          Submissions
        </Typography>
      </Box>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h6">{statement}</Typography>
        {descElements()}

        {examples && (
          <>
            <Typography mt={2} variant="h6">
              Examples:
            </Typography>
            <ul>
              {examples.map((example) => (
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
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
            <Typography variant="h6" sx={{ mt: 2 }}>
              Constraints:
            </Typography>
            <List sx={{ listStyleType: "disc", pl: 2, fontSize: "1.5rem" }}>
              {constraints.map((constraint, index) => (
                <ListItem
                  key={index}
                  sx={{
                    listStyleType: "disc",
                    display: "list-item",
                    py: 0,
                    margin: 0,
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
    </Box>
  );
};

export default StatementPage;
