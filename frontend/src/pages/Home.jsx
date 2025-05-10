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
  Chip,
  useTheme,
} from "@mui/material";
import {
  EmojiEvents,
  Announcement,
  School,
  BarChart,
  Code,
  TrendingUp,
  Lightbulb,
  Speed,
  Psychology,
  Search,
  Star,
  Timer,
  Bolt,
  CheckCircle,
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
import { calculateTimeLeft } from "../utils/time";

const accent = "#7b5cff";
const accent2 = "#00e0d3";

const HomePage = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyProblem, setDailyProblem] = useState({});
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedProblems, setSearchedproblems] = useState([]);
  const [timeLeft, setTimeLeft] = useState("12:34:56");

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

  const learningPaths = [
    {
      title: "Data Structures",
      description: "Master fundamental data structures",
      icon: <School sx={{ color: accent2 }} />,
      progress: 65,
      color: accent2,
    },
    {
      title: "Algorithms",
      description: "Learn essential algorithms",
      icon: <Speed sx={{ color: accent }} />,
      progress: 40,
      color: accent,
    },
    {
      title: "Problem Solving",
      description: "Enhance your problem-solving skills",
      icon: <Psychology sx={{ color: "#ffb300" }} />,
      progress: 25,
      color: "#ffb300",
    },
  ];

  const difficultyColors = {
    Easy: accent2,
    Medium: accent,
    Hard: "#ff4c4c",
  };

  const recentActivities = [
    { type: "problem", title: "Solved Two Sum", difficulty: "Easy", time: "2h ago" },
    { type: "achievement", title: "Completed 50 Problems", time: "5h ago" },
    { type: "streak", title: "7 Day Streak", time: "1d ago" },
  ];

  useEffect(() => {
    const fetchDailyProblem = async () => {
      try {
        const response = await axios.get(urlConstants.getDailyProblem, getConfig());
        setDailyProblem(response.data.dailyProblem);
      } catch (error) {
        console.error("Error fetching daily problem:", error);
      }
    };

    fetchDailyProblem();
  }, []);

  useEffect(() => {
    const fetchSearchedProblems = async () => {
      try {
        const response = await axios.get(`${urlConstants.getSearchedProblems}/${search}`, {
          ...getConfig(),
        });
        setSearchedproblems(response.data.problems);
      } catch (error) {
        console.error("Error fetching searched problems:", error);
      }
    }

     if(search.length > 1){
      fetchSearchedProblems();
    }else if(search.length === 0){
      setSearchedproblems([]);
    }
  }, [search]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ bgcolor: theme.palette.background.main, minHeight: "100vh", py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
          animation: "fadeIn 2s ease-in-out",
          background: `linear-gradient(90deg, ${accent}, ${accent2})`,
          color: "white",
          fontWeight: 700,
          fontSize: "1.2rem",
          borderRadius: 2,
          mb: 4,
          mx: 2,
          textAlign: "center",
          "@keyframes fadeIn": {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        }}
      >
        🚀 Welcome to CodeQuest! Start your coding journey today! 🚀
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          py: 4,
          animation: "fadeInUp 2s ease-in-out",
          "@keyframes fadeInUp": {
            from: { opacity: 0, transform: "translateY(20px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.secondary, mb: 2 }}
        >
          🎨 Design in Progress 🎨
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary, textAlign: "center" }}
        >
          We are working hard to bring you an amazing experience. Stay tuned for
          exciting updates!
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: theme.shadows[2] }}>
              <Typography variant="h3" fontWeight={700} sx={{ color: accent2, mb: 2 }}>
                Welcome to CodeQuest
              </Typography>
              <Typography variant="h5" sx={{ color: accent2, mb: 2 }}>
                Master DSA, Ace Interviews, and Join the Top Coders!
              </Typography>
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
                Practice coding problems, track your progress, and climb the leaderboard. Start your journey to coding excellence today.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Link to="/problems">
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background: `linear-gradient(90deg, ${accent}, ${accent2})`,
                      color: 'white',
                      fontWeight: 700,
                      px: 4,
                      boxShadow: 'none',
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': { 
                        background: `linear-gradient(90deg, ${accent2}, ${accent})`,
                        bgcolor: 'grey.300'
                      },
                    }}
                  >
                    Start Coding
                  </Button>
                </Link>
                <Link to="/problems">
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: accent2,
                      color: accent2,
                      fontWeight: 700,
                      px: 4,
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': { 
                        borderColor: accent, 
                        color: accent,
                        bgcolor: 'grey.300'
                      },
                    }}
                  >
                    Learning Paths
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: theme.shadows[2] }}>
              <Typography variant="h6" sx={{ color: accent, mb: 2 }}>
                Platform Stats
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(statsSummary).map(([key, value]) => (
                  <Grid item xs={4} key={key}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h4" fontWeight={700} sx={{ color: accent2 }}>
                        {new Intl.NumberFormat().format(value)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, borderRadius: 3, mb: 4, boxShadow: theme.shadows[2] }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: accent, mb: 3 }}>
            Learning Paths
          </Typography>
          <Grid container spacing={3}>
            {learningPaths.map((path) => (
              <Grid item xs={12} md={4} key={path.title}>
                <Paper sx={{ borderRadius: 2, p: 3, boxShadow: theme.shadows[1] }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: "transparent", width: 48, height: 48 }}>{path.icon}</Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={700} sx={{ color: accent2 }}>{path.title}</Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{path.description}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Progress</Typography>
                      <Typography variant="body2" sx={{ color: path.color, fontWeight: 700 }}>{path.progress}%</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 8, bgcolor: theme.palette.secondary.main, borderRadius: 4 }}>
                      <Box sx={{ width: `${path.progress}%`, height: 8, bgcolor: path.color, borderRadius: 4 }} />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: theme.shadows[2] }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5" fontWeight={700} sx={{ color: accent }}>
                  Daily Challenge
                </Typography>
                <Chip
                  icon={<Timer sx={{ color: accent2 }} />}
                  label={`Resets in ${timeLeft}`}
                  sx={{ bgcolor: theme.palette.secondary.main, color: theme.palette.text.secondary, fontWeight: 700, borderRadius: 1 }}
                />
              </Box>
              <DailyChallenge dailyProblem={dailyProblem} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: theme.shadows[2] }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: accent, mb: 2 }}>
                Top Performers
              </Typography>
              {leaderboardData.map((user, idx) => (
                <Box
                  key={user.rank}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    py: 1.5,
                    borderBottom: idx !== leaderboardData.length - 1 ? `1px solid ${theme.palette.secondary.main}` : 0,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: idx === 0 ? accent : accent2,
                      color: 'white',
                      width: 40,
                      height: 40,
                      fontWeight: 700,
                    }}
                  >
                    {user.rank}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {user.user}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      Score: {user.score}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: theme.shadows[2] }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: accent, mb: 2 }}>
                Quick Access
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search problems..."
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    fieldset: { borderColor: theme.palette.secondary.main },
                  }}
                  InputProps={{
                    startAdornment: <Search sx={{ color: accent2, mr: 1 }} />,
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => setSearch(search)}
                  sx={{
                    background: `linear-gradient(90deg, ${accent}, ${accent2})`,
                    color: 'white',
                    fontWeight: 700,
                    px: 4,
                    borderRadius: 2,
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': { background: `linear-gradient(90deg, ${accent2}, ${accent})` },
                  }}
                >
                  Search
                </Button>
              </Box>
              {searchedProblems && (
                <Grid container spacing={2}>
                  {searchedProblems.map((problem) => (
                    <Grid item xs={12} key={problem._id}>
                      <Paper sx={{ 
                        bgcolor: theme.palette.secondary.main, 
                        p: 2, 
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'grey.300',
                          transition: 'background-color 0.2s ease'
                        }
                      }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Box>
                            <Typography variant="h6" fontWeight={700}>
                              {problem.statement}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                              <Chip
                                size="small"
                                label={problem.difficulty}
                                sx={{
                                  bgcolor: difficultyColors[problem.difficulty],
                                  color: 'white',
                                  fontWeight: 700,
                                }}
                              />
                              {/* <Chip
                                size="small"
                                icon={<Star sx={{ color: accent2 }} />}
                                label={`${problem.rating || 0} Rating`}
                                sx={{
                                  bgcolor: theme.palette.secondary.main,
                                  color: accent2,
                                  fontWeight: 700,
                                }}
                              /> */}
                            </Box>
                          </Box>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              background: accent,
                              color: 'white',
                              fontWeight: 700,
                              borderRadius: 2,
                              '&:hover': {
                                bgcolor: 'grey.300',
                                color: 'text.primary'
                              }
                            }}
                          >
                            Solve
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: theme.shadows[2] }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: accent, mb: 2 }}>
                Recent Activities
              </Typography>
              {recentActivities.map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    py: 1.5,
                    borderBottom: index !== recentActivities.length - 1 ? `1px solid ${theme.palette.secondary.main}` : 0,
                    '&:hover': {
                      bgcolor: 'grey.300',
                      transition: 'background-color 0.2s ease'
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: activity.type === "problem" ? accent2 : activity.type === "achievement" ? accent : "#ffb300",
                      color: 'white',
                      width: 40,
                      height: 40,
                      fontWeight: 700,
                    }}
                  >
                    {activity.type === "problem" ? <CheckCircle /> : activity.type === "achievement" ? <EmojiEvents /> : <Bolt />}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {activity.title}
                    </Typography>
                    {activity.difficulty && (
                      <Chip
                        size="small"
                        label={activity.difficulty}
                        sx={{
                          bgcolor: difficultyColors[activity.difficulty],
                          color: 'white',
                          fontWeight: 700,
                          mt: 0.5,
                        }}
                      />
                    )}
                  </Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {activity.time}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
