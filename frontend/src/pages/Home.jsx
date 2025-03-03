import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  Avatar,
  Grid,
  styled,
  useTheme,
} from "@mui/material";
import {
  CalendarMonth,
  EmojiEvents,
  Announcement,
  School,
  BarChart,
  Code,
  TrendingUp,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { format } from "date-fns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Link } from "react-router-dom";

const ProfessionalButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: "8px",
  textTransform: "none",
  transition: "all 0.3s ease",
  fontWeight: 600,
  letterSpacing: "0.5px",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[3],
  },
}));

const SectionHeader = ({ title, icon, color = "primary" }) => {
  const theme = useTheme();
  return (
    <Box display="flex" alignItems="center" gap={2} mb={3}>
      <Avatar sx={{ bgcolor: `${color}.main`, color: "common.white" }}>
        {icon}
      </Avatar>
      <Typography variant="h6" fontWeight="600">
        {title}
      </Typography>
    </Box>
  );
};

const HomePage = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const problemOfTheDay = {
    id: 101,
    title: "Array Manipulation",
    difficulty: "Medium",
    description:
      "Solve this array manipulation problem using optimal approaches...",
  };

  const leaderboardData = [
    { rank: 1, user: "CodeMaster", score: 2450 },
    { rank: 2, user: "AlgoPro", score: 2315 },
    { rank: 3, user: "JavaWizard", score: 2245 },
  ];

  const statsSummary = {
    totalProblems: 1250,
    activeUsers: 3850,
    dailySubmissions: 14500,
  };

  const problemCalendar = {
    [format(new Date(), "yyyy-MM-dd")]: {
      id: 101,
      title: "Daily Challenge",
      difficulty: "Medium",
    },
    "2024-03-15": { id: 102, title: "Binary Search", difficulty: "Easy" },
    "2024-03-20": { id: 103, title: "DP Challenge", difficulty: "Hard" },
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Design in progress
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateAreas: {
            xs: `
              "hero"
              "techInfo"
              "potdCalendar"
              "stats"
              "leaderboard"
              "quick"
            `,
            md: `
              "hero techInfo"
              "potdCalendar potdCalendar"
              "stats leaderboard"
              "quick quick"
            `,
          },
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
          transition: "all 0.3s ease",
        }}
      >
        <Paper
          sx={{
            gridArea: "hero",
            p: 4,
            borderRadius: 4,
            bgcolor: "primary.main",
            color: "common.white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Algorithm Excellence
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              fontStyle: "italic",
              "&::before": { content: '"“"', fontSize: "2em", mr: 1 },
              "&::after": { content: '"”"', fontSize: "2em", ml: 0.5 },
            }}
          >
            Talk is cheap. Show me the code.
            <Box
              component="span"
              display="block"
              mt={1}
              fontSize="0.8em"
              sx={{ opacity: 0.8 }}
            >
              - Linus Torvalds, Creator of Linux and Git
            </Box>
          </Typography>
          <Link to="/problems">
            <ProfessionalButton
              variant="contained"
              color="secondary"
              size="large"
              sx={{ width: "fit-content", mt: 3 }}
            >
              Start Coding
            </ProfessionalButton>
          </Link>
        </Paper>

        <Paper
          sx={{
            gridArea: "techInfo",
            p: 4,
            borderRadius: 4,
            bgcolor: "warning.main",
            color: "common.white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <SectionHeader
            title="DSA Technical Insights"
            icon={<School />}
            color="warning"
          />
          <Typography variant="body1">
            Arrays store data contiguously, allowing O(1) access while demanding
            careful memory management during resizing. Strings, typically
            implemented as character arrays, leverage this design for efficient
            manipulation, enabling powerful techniques like sliding window
            algorithms for pattern matching.
          </Typography>
        </Paper>

        <Box
          sx={{
            gridArea: "potdCalendar",
            display: "grid",
            gridTemplateColumns: "7fr 0.3fr",
            gap: 2,
          }}
        >
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <SectionHeader
              title="Daily Challenge"
              icon={<Code />}
              color="warning"
            />
            <Box bgcolor="action.hover" p={3} borderRadius={3}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {problemOfTheDay.title}
                <Box
                  component="span"
                  color="text.secondary"
                  ml={2}
                  fontSize="0.875rem"
                >
                  #{problemOfTheDay.id}
                </Box>
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {problemOfTheDay.description}
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={3}>
                <Box>
                  <Typography variant="caption" color="text.disabled">
                    Difficulty:
                  </Typography>
                  <Typography
                    variant="body2"
                    color={
                      problemOfTheDay.difficulty === "Easy"
                        ? "success.main"
                        : problemOfTheDay.difficulty === "Medium"
                        ? "warning.main"
                        : "error.main"
                    }
                    fontWeight="600"
                  >
                    {problemOfTheDay.difficulty}
                  </Typography>
                </Box>
                <ProfessionalButton variant="contained">
                  Solve Challenge
                </ProfessionalButton>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <SectionHeader
              title="Practice Calendar"
              icon={<CalendarMonth />}
              color="success"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Paper>
        </Box>

        <Paper sx={{ gridArea: "stats", p: 4, borderRadius: 4 }}>
          <SectionHeader
            title="Platform Stats"
            icon={<TrendingUp />}
            color="info"
          />
          <Grid container spacing={3}>
            {Object.entries(statsSummary).map(([key, value]) => (
              <Grid item xs={12} sm={4} key={key}>
                <Box textAlign="center">
                  <Typography variant="h3" fontWeight={700}>
                    {new Intl.NumberFormat().format(value)}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    textTransform="uppercase"
                    sx={{ mt: 1 }}
                  >
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper sx={{ gridArea: "leaderboard", p: 4, borderRadius: 4 }}>
          <SectionHeader
            title="Top Performers"
            icon={<EmojiEvents />}
            color="error"
          />
          {leaderboardData.map((user) => (
            <Box
              key={user.rank}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py={2}
              borderBottom="1px solid"
              borderColor="divider"
            >
              <Typography variant="body2" fontWeight={600}>
                #{user.rank} {user.user}
              </Typography>
              <Typography color="text.secondary">{user.score} pts</Typography>
            </Box>
          ))}
        </Paper>

        <Paper sx={{ gridArea: "quick", p: 4, borderRadius: 4 }}>
          <SectionHeader
            title="Quick Access"
            icon={<School />}
            color="secondary"
          />
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              fullWidth
              placeholder="Search problems..."
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <ProfessionalButton variant="contained" size="small">
                    Search
                  </ProfessionalButton>
                ),
              }}
            />
            <Link to="competitions">
              <ProfessionalButton
                fullWidth
                variant="outlined"
                startIcon={<Announcement />}
              >
                Contest Archive
              </ProfessionalButton>
            </Link>
            <ProfessionalButton
              fullWidth
              variant="outlined"
              startIcon={<BarChart />}
            >
              Progress Analytics
            </ProfessionalButton>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage;
