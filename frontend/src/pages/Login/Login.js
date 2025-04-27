import * as React from "react";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import logoImage from '../../images/logo.png';
import bgImg from "../../images/bg2.avif";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark", 
    primary: {
      main: "#3F51B5", // e.g. Indigo or a vibrant blue
    },
    secondary: {
      main: "#9c27b0", // e.g. a purple
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Roboto Mono", monospace', 
    h5: { fontWeight: 600 }, 
  },
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          p: 2,
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            bgcolor: "rgba(0,0,0,0.7)",
            py: 4,
            px: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={logoImage}
              alt="Platform Logo"
              sx={{
                maxWidth: "80px",
              }}
            />
          </Box>
          <Typography variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSignIn} noValidate>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                style: { fontSize: "2rem" },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                style: { fontSize: "2rem" },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                py: 1,
                fontWeight: "bold",
                borderRadius: 2,
                boxShadow: "none",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 0 10px 2px #39ff14",
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Typography variant="h6">Sign In</Typography>
              )}
            </Button>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Don't have an account?
                <Button
                  onClick={() => navigate("/signup")}
                  variant="text"
                  size="small"
                  sx={{ textTransform: "none", ml: 1 }}
                >
                  <Typography
                    sx={{ color: "primary.main" }}
                    variant="h6"
                    color="text.secondary"
                  >
                    Sign Up
                  </Typography>
                </Button>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box component="footer" sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Coding Platform. All rights reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
