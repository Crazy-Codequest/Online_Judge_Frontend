import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  CircularProgress,
  Link,
  CardMedia,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import logoImage from "../../images/logo.png";
import bgImg from "../../images/bg2.avif";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { urlConstants } from "../../apis";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#3F51B5" },
    secondary: { main: "#9c27b0" },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Roboto Mono", monospace',
    h5: { fontWeight: 600 },
  },
});

export default function SignUp() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(formRef.current);

    try {
      const user = await axios.post(urlConstants.registerUser, {
        email: data.get("email"),
        password: data.get("password"),
        firstname: data.get("firstname"),
        lastname: data.get("lastname"),
        username: data.get("username"),
      });
      localStorage.setItem("user", JSON.stringify({ user: user.data.user }));
      localStorage.setItem("token", user.data.token);
      dispatch(loginSuccess({ user: user.data.user }));
      toast.success("Registration successful!");
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data || "Registration failed!");
    } finally {
      setLoading(false);
    }
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
            Sign Up
          </Typography>

          <Box
            component="form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              label="First Name"
              name="firstname"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ style: { fontSize: "1.5rem" } }}
            />
            <TextField
              label="Last Name"
              name="lastname"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ style: { fontSize: "1.5rem" } }}
            />
            <TextField
              label="Username"
              name="username"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ style: { fontSize: "1.5rem" } }}
            />
            <TextField
              label="Email Address"
              name="email"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ style: { fontSize: "1.5rem" } }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ style: { fontSize: "1.5rem" } }}
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
                <Typography variant="h6">Sign Up</Typography>
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
                Already have an account?
                <Button
                  onClick={() => navigate("/signin")}
                  variant="text"
                  size="small"
                  sx={{ textTransform: "none", ml: 1 }}
                >
                  <Typography sx={{ color: "primary.main" }} variant="h6">
                    Sign In
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
