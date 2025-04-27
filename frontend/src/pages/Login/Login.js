import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import axios from "axios";
import { urlConstants } from "../../apis";
import { toast } from "react-toastify";
import logo from "../../images/logo.png";

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(formRef.current);

    try {
      const response = await axios.post(urlConstants.loginUser, {
        email: data.get("email"),
        password: data.get("password"),
      });

      const { user, token } = response.data;

      localStorage.setItem("user", JSON.stringify({ user }));
      localStorage.setItem("token", token);

      dispatch(loginSuccess({ user, token }));

      toast.success("Logged in successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Incorrect email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          src={logo}
          sx={{
            width: 80,
            height: 80,
            mb: 2,
          }}
          variant="rounded"
        />
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <Box
          component="form"
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            defaultValue="test@gmail.com"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            defaultValue="Test@123"
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" underline="hover">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2" underline="hover">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/" underline="hover">
            Chirag
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;
