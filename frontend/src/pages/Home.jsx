import React, { useEffect, useState } from "react";
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
  EmojiEvents,
  Announcement,
  School,
  BarChart,
  Code,
  TrendingUp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { urlConstants } from "../apis";
import axios from "axios";
import { getConfig } from "../utils/getConfig";
import PracticeCalendar from "./Admin/PracticeCalendar";
import FloatingText from "./FloatingButton";
import ProfessionalButton from "../components/Button/ProfessionalButton";
import DailyChallenge from "./Problems/DailyChallenge";
import useProblem from "../hooks/use-problem.hook";


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
  const [dailyProblem, setDailyProblem] = useState({});
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const { getSearchedProblems,
    searchedProblems } = useProblem();

  const getProblems = async () => {
    try {
      const { data } = await axios.get(urlConstants.getProblems, getConfig());
      setProblems(data.problems);
    } catch (e) {
      console.error(e);
    } finally {
      // setLoading(false);
    }
  };

  const leaderboardData = [
    { rank: 1, user: "CodeMaster", score: 2450 },
    { rank: 2, user: "AlgoPro", score: 2315 },
    { rank: 3, user: "JavaWizard", score: 2245 },
  ];

  const statsSummary = {
    totalProblems: 100,
    activeUsers: 50,
    dailySubmissions: 100,
  };

  const getData = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.getProblem,
        {
          id: "67c54bdeece1696d8d2e66e5",
        },
        getConfig()
      );
      setDailyProblem(data.customprob);
    } catch (e) {
      console.log(e);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    getData();
    getProblems();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ width: "100%", mb: 10 }}>
        <FloatingText />
      </Box>
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
            CodeQuest - A Algorithm Excellence Platform
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
              sx={{ width: "fit-content" }}
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
            <DailyChallenge dailyProblem={dailyProblem} />
          </Paper>

          <PracticeCalendar problems={problems} />
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === "Enter"){
                  getSearchedProblems(search);
                }
              }}
              placeholder="Search problems..."
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <ProfessionalButton
                    onClick={() => getSearchedProblems(search)}
                    variant="contained"
                    size="small"
                  >
                    Search
                  </ProfessionalButton>
                ),
              }}
            />
            {searchedProblems && searchedProblems.map((problem) => (
              <DailyChallenge key={problem._id} dailyProblem={problem} />
            ))}
            <Link to="competitions">
              <ProfessionalButton
                fullWidth
                variant="outlined"
                startIcon={<Announcement />}
              >
                Contest Archive
              </ProfessionalButton>
            </Link>
            <Link to="/analytics">
              <ProfessionalButton
                fullWidth
                variant="outlined"
                startIcon={<BarChart />}
              >
                Progress Analytics
              </ProfessionalButton>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HomePage;
