import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Box, Button, Chip, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { Alert } from "@mui/material";

const EmailForm = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("Email sent successfully!");
          setFormData({ user_name: "", user_email: "", message: "" });
        },
        (error) => {
          setStatus("Failed to send email.");
          console.error(error);
        }
      );
  };

  const textFieldStyles = {
    borderRadius: 1,
    color: "#fff",
    borderColor: "rgba(255,255,255,0.3)",
    "& .MuiInputBase-input::placeholder": {
      color: "rgba(21 16 48, 0.5)",
      opacity: 0.8,
    },
  };

  const chipStyles = {
    borderRadius: "999px",
    cursor: "pointer",
    p: 2,
    border: "2px solid #fff",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus("");
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <Paper
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: theme.palette.background.main,
        borderRadius: 2,
      }}
    >
      <Box sx={{ flex: 1, p: 0 }}>
        <Box
          sx={{
            borderRadius: 5,
            p: 2.5,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography mb={2} variant="h4">
            Any Feedback
          </Typography>
          <form ref={sectionRef} onSubmit={sendEmail}>
            <Stack gap={2}>
              <Typography variant="subtitle1">Your Name</Typography>
              <TextField
                type="text"
                name="user_name"
                placeholder="What's your good name?"
                value={formData.user_name}
                onChange={handleChange}
                required
                sx={textFieldStyles}
              />
              <Typography variant="subtitle1">Your Email</Typography>
              <TextField
                type="email"
                name="user_email"
                placeholder="What is your email?"
                value={formData.user_email}
                onChange={handleChange}
                required
                sx={textFieldStyles}
              />
              <Typography variant="subtitle1">Your Message</Typography>
              <TextField
                type="text"
                name="message"
                placeholder="What do you want to say?"
                value={formData.message}
                onChange={handleChange}
                required
                multiline
                rows={5}
                sx={textFieldStyles}
              />
              <Button
                type="submit"
                sx={{ borderRadius: 2, mt: 2, width: "20%" }}
                variant="contained"
              >
                SEND
              </Button>
            </Stack>
          </form>
          {status && (
            <Alert
              severity={status.includes("success") ? "success" : "error"}
              sx={{ mt: 2 }}
            >
              {status}
            </Alert>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default EmailForm;
