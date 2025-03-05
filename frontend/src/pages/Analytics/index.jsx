import React, { useEffect, useState } from "react";
import { Container, CardContent, Typography, Avatar, Box, Stack } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const AnalyticsCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: 20,
  boxShadow: 0,
  overflow: "hidden",
}));

const CardWrapper = ({ children }) => (
  <AnalyticsCard>
    <CardContent>{children}</CardContent>
  </AnalyticsCard>
);

export default function UserAnalyticsPage() {
  const { userId } = useParams(); // e.g., route: /analytics/:userId
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = {
      user: {
        _id: "user123",
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
      },
      totalSubmissions: 30,
      verdictDistribution: {
        Accepted: 20,
        WrongAnswer: 5,
        TimeLimitExceeded: 3,
        RuntimeError: 2,
      },
      competitions: 5,
      socialLinksCount: 3,
    };

    setTimeout(() => {
      setAnalyticsData(data);
      setLoading(false);
    }, 1000);
  }, [userId]);

  if (loading) {
    return (
      <Container sx={{ py: 3 }}>
        <Typography variant="h6">Loading analytics...</Typography>
      </Container>
    );
  }

  if (!analyticsData) {
    return (
      <Container sx={{ py: 3 }}>
        <Typography variant="h6">No analytics data available</Typography>
      </Container>
    );
  }

  const {
    user,
    totalSubmissions,
    verdictDistribution,
    competitions,
    socialLinksCount,
  } = analyticsData;

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Analytics
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 2,
          mb: 3,
        }}
      >
        <CardWrapper>
          <Typography variant="h6">User Information</Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Avatar>{user.firstname.charAt(0)}</Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body1">
                {user.firstname} {user.lastname}
              </Typography>
              <Typography variant="body2">{user.email}</Typography>
            </Box>
          </Box>
        </CardWrapper>
        <CardWrapper>
          <Typography variant="h6">Total Submissions</Typography>
          <Typography variant="h4">{totalSubmissions}</Typography>
        </CardWrapper>
        <CardWrapper>
          <Typography variant="h6">Competitions Registered</Typography>
          <Typography variant="h4">{competitions}</Typography>
        </CardWrapper>
      </Box>

      <Typography variant="h5" gutterBottom>
        Verdict Distribution
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 3,
          mt: 2
        }}
      >
        {Object.entries(verdictDistribution).map(([verdict, count]) => (
          <CardWrapper key={verdict}>
            <Typography variant="subtitle1">{verdict}</Typography>
            <Typography variant="h5">{count}</Typography>
          </CardWrapper>
        ))}
      </Box>

      <Typography variant="h5" gutterBottom>
        Social Profiles Linked
      </Typography>
      <CardWrapper>
        <Stack gap={2} mt={2} flexDirection="row">
          <GitHubIcon />
          <LinkedInIcon />
          <TwitterIcon />
          <InstagramIcon />
        </Stack>
      </CardWrapper>
      <Box mb={10} />
    </Container>
  );
}
