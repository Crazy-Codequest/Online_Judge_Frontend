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
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Typography sx={{ cursor: "pointer" }} onClick={() => setDesc(true)}>
          Description
        </Typography>
        <Typography sx={{ cursor: "pointer" }} onClick={() => setDesc(false)}>
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
            <Typography variant="h6">Examples:</Typography>
            <ul>
              {examples.map((example) => (
                <main key={example.input}>
                  <div className="mt-2 example">
                    <Typography className="bold">Input: </Typography>
                    <Typography>{` ${example.input}`}</Typography>
                  </div>
                  <div className="example">
                    <Typography className="bold">Output: </Typography>
                    <Typography>{example.output}</Typography>
                  </div>
                  <div className="example">
                    <Typography className="bold">Explanation: </Typography>
                    <Typography>{example.explanation}</Typography>
                  </div>
                </main>
              ))}
            </ul>
          </>
        )}
        {constraints && (
          <>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              Constraints:
            </Typography>
            <List>
              {constraints.map((constraint, index) => (
                <ListItem key={index} sx={{ mb: 1 }}>
                  <ListItemText primary={constraint} />
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
