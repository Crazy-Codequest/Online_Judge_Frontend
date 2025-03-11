import { Box } from '@mui/material'
import React from 'react'

const GreyCircle = ({children, sx, onClick}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        ...sx,
      }}
    >
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.main",
          cursor: "pointer",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default GreyCircle