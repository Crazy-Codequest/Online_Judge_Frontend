import React from "react";
import { Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.default"
    >
      <Typography variant="h5" color="text.secondary">
        Loading...
      </Typography>
    </Box>
  );
};

export default Loading;
