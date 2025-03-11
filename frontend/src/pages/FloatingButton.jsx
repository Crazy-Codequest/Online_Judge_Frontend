import React from "react";
import { Typography, Box } from "@mui/material";
import { keyframes } from "@mui/system";

const marquee = keyframes`
  0% {
    transform: translateX(300%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export default function FloatingText() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        sx={{
          position: "absolute",
          whiteSpace: "nowrap",
          animation: `${marquee} 10s linear infinite`,
        }}
      >
        Design in progress
      </Typography>
    </Box>
  );
}
