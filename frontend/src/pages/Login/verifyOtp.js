import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  CardMedia,
} from "@mui/material";
import { toast } from "react-toastify";
import bgImg from "../../images/onboarding.png";
import logoImage from "../../images/logo.png";
import axios from "axios";
import { urlConstants } from "../../apis";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";

export default function VerifyOtp({ email }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await axios.post(urlConstants.verifyOtp, {
        email,
        otp,
      });

      localStorage.setItem("user", JSON.stringify({ user: res.data.user }));
      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess({ user: res.data.user }));
      toast.success("OTP Verified! Redirecting...");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Invalid OTP!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          bgcolor: "rgba(0,0,0,0.7)",
          py: 3,
          px: 3,
          borderRadius: 2,
          boxShadow: 3,
          minWidth: "30vw"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <CardMedia
            component="img"
            image={logoImage}
            alt="Platform Logo"
            sx={{ maxWidth: "80px" }}
          />
        </Box>

        <Typography variant="h5" align="center" gutterBottom>
          Verify OTP
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          mb={2}
        >
          Enter the 6-digit code sent to <strong>{email}</strong>
        </Typography>

        <TextField
          label="OTP"
          variant="outlined"
          fullWidth
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          margin="normal"
          InputLabelProps={{ style: { fontSize: "1.5rem" } }}
        />

        <Button
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
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <Typography variant="h6">Verify</Typography>
          )}
        </Button>
      </Container>
    </Box>
  );
}
