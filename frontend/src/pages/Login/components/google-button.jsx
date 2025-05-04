import { Box, Button, Typography } from '@mui/material';
import React from 'react'

const GoogleButton = ({ handleGoogleSignIn }) => {
  return (
    <Button
      fullWidth
      onClick={handleGoogleSignIn}
      variant="outlined"
      startIcon={
        <Box
          component="img"
          src="https://app.uizard.io/static/media/google.c17df322b408a9f3f31c4bc735c95e04.svg"
          alt="Google"
          sx={{ width: 20, height: 20 }}
        />
      }
      sx={{
        textTransform: "none",
        borderColor: "#4285F4",
        color: "#fff",
        fontWeight: 600,
        "&:hover": {
          backgroundColor: "#357ae8",
          borderColor: "#357ae8",
        },
      }}
    >
      <Typography variant="h6">Sign in with Google</Typography>
    </Button>
  );
};

export default GoogleButton