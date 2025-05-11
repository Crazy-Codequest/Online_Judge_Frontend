import React, { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Paper,
  Typography,
  useTheme,
  Button,
  Avatar,
  InputAdornment,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Badge,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  Star,
  Lock,
  MenuBook,
  Forum,
  Assignment,
  Favorite,
  CalendarToday,
  EmojiEvents,
  Search,
  CheckCircle,
  ListAlt,
  TrendingUp,
  School,
  LibraryBooks,
  PlayCircleFilled,
  ArrowForwardIos,
  Add,
} from "@mui/icons-material";
import axios from "axios";
import { getConfig } from "../../utils/getConfig";
import { PROBLEMS_PER_PAGE } from "../../utils/constants";
import { urlConstants } from "../../apis";
import Loading from "../Loader/Loader";
import { Link } from "react-router-dom";

const difficultyColors = {
  easy: "#4CAF50",
  medium: "#FF9800",
  hard: "#F44336",
};

const sidebarLists = [
  { icon: <LibraryBooks />, label: "Library" },
  { icon: <School />, label: "Study Plan" },
  { icon: <Forum />, label: "Discuss" },
];

const myLists = [
  { icon: <Favorite />, label: "Favorite", locked: false },
  { icon: <Assignment />, label: "solve again", locked: true },
  { icon: <Assignment />, label: "doubts", locked: true },
  { icon: <Assignment />, label: "try different method", locked: true },
  { icon: <Assignment />, label: "blind_seventyfive", locked: true },
  { icon: <Assignment />, label: "using bits", locked: true },
  { icon: <Assignment />, label: "couldn't solve", locked: true },
  { icon: <Assignment />, label: "upvoted", locked: true },
  { icon: <Assignment />, label: "understanding solution", locked: true },
  { icon: <Assignment />, label: "reverse solutions", locked: true },
];

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topicCounts, setTopicCounts] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PROBLEMS_PER_PAGE,
  });
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [search, setSearch] = useState("");

  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const borderColor = theme.palette.border.secondary;
  const hoverColor = isLightMode ? "#f0f7ff" : "#333";

  useEffect(() => {
    const getProblems = async () => {
      try {
        const { data } = await axios.get(urlConstants.getProblems, getConfig());
        setProblems(data.problems);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    const getTopicCounts = async () => {
      try {
        const { data } = await axios.get(
          urlConstants.getTopicCounts,
          getConfig()
        );
        setTopicCounts(data.topicCounts);
      } catch (e) {
        console.log(e);
      }
    };

    getProblems();
    getTopicCounts();
  }, []);

  const filteredProblems = problems.filter(
    (p) =>
      (!selectedTopic || p.topic === selectedTopic) &&
      (!search || p.statement.toLowerCase().includes(search.toLowerCase()))
  );

  // --- UI ---
  if (loading) return <Loading />;

  const activeAvatarBg = '#1976d2';

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: theme.palette.background.main,
        minHeight: "100vh",
        p: {xs: 2, lg: 0}
      }}
    >
      <Box
        sx={{
          width: 240,
          borderRight: `1px solid ${borderColor}`,
          px: 2,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Divider sx={{ mt: 1 }} />
        <Typography
          variant="subtitle2"
          sx={{ ml: 1, fontSize: 15, fontWeight: 600 }}
        >
          My Lists
        </Typography>
        <List>
          {myLists.map((item) => (
            <ListItem button key={item.label} sx={{ borderRadius: 2 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 16 }}
              />
              {item.locked && (
                <Tooltip title="Private List">
                  <Lock fontSize="small" color="disabled" />
                </Tooltip>
              )}
            </ListItem>
          ))}
        </List>
        <Button
          startIcon={<Add />}
          sx={{
            mt: 1,
            ml: 1,
            fontSize: 15,
            textTransform: "none",
            boxShadow: "none",
            bgcolor: "transparent",
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
          size="medium"
        >
          New List
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 0,
          py: 4,
          width: "100%",
          overflowX: { xs: "auto", lg: "hidden" },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 950, mx: "auto" }}>
          {/* Announcement Banner */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
              overflowX: "auto",
              pb: 1,
              width: "100%",
            }}
          >
            <Card
              sx={{
                minWidth: 260,
                bgcolor: theme.palette.background.main,
                fontSize: 16,
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Typography fontWeight={700} gutterBottom fontSize={17}>
                  LeetCode's Interview Crash Course:
                </Typography>
                <Typography variant="body2" fontSize={15}>
                  System Design for Interviews and Beyond
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  variant="outlined"
                  sx={{
                    fontSize: 15,
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Start Learning
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                minWidth: 260,
                bgcolor: theme.palette.background.main,
                fontSize: 16,
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Typography fontWeight={700} gutterBottom fontSize={17}>
                  LeetCode's Interview Crash Course:
                </Typography>
                <Typography variant="body2" fontSize={15}>
                  Data Structures and Algorithms
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  variant="outlined"
                  sx={{
                    fontSize: 15,
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Start Learning
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                minWidth: 260,
                bgcolor: theme.palette.background.main,
                fontSize: 16,
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Typography fontWeight={700} gutterBottom fontSize={17}>
                  New & Trending Company Qs
                </Typography>
                <Typography variant="body2" fontSize={15}>
                  Latest Qs From Big Tech
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  variant="outlined"
                  sx={{
                    fontSize: 15,
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Claim Now
                </Button>
              </CardActions>
            </Card>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              mb: 2,
              overflowX: "auto",
              pb: 1,
              width: "100%",
            }}
          >
            <Chip
              label="All Topics"
              color={!selectedTopic ? "primary" : "default"}
              onClick={() => setSelectedTopic(null)}
              sx={{
                fontWeight: 700,
                fontSize: 15,
                px: 2,
                height: 36,
                bgcolor: !selectedTopic ? "#e0e0e0" : "#fff",
                border: "none",
                boxShadow: "none",
              }}
            />
            {topicCounts.map((topic) => (
              <Chip
                key={topic._id}
                label={`${topic._id} (${topic.count})`}
                color={selectedTopic === topic._id ? "primary" : "default"}
                onClick={() => setSelectedTopic(topic._id)}
                sx={{
                  fontWeight: 700,
                  fontSize: 15,
                  px: 2,
                  height: 36,
                  border: "none",
                  boxShadow: "none",
                }}
              />
            ))}
          </Box>

          <TextField
            fullWidth
            placeholder="Search questions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mb: 2,
              borderRadius: 2,
              fontSize: 16,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#111" }} />
                </InputAdornment>
              ),
              style: { fontSize: 16, height: 44 },
            }}
            inputProps={{ style: { fontSize: 16, height: 44 } }}
          />

          <Paper
            sx={{
              p: 0,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "none",
              border: `1px solid ${borderColor}`,
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                bgcolor: theme.palette.background.main,
                borderBottom: `1px solid ${borderColor}`,
                px: 2,
                py: 1,
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              <Box sx={{ width: 40 }}>#</Box>
              <Box sx={{ flex: 2 }}>Title</Box>
              <Box sx={{ width: 120, textAlign: "center" }}>Acceptance</Box>
              <Box sx={{ width: 100, textAlign: "center" }}>Difficulty</Box>
              <Box sx={{ width: 140, textAlign: "center" }}>Topic</Box>
            </Box>
            {filteredProblems.length === 0 && (
              <Typography sx={{ p: 3, textAlign: "center", fontSize: 16 }}>
                No problems found.
              </Typography>
            )}
            {filteredProblems
              .slice(
                paginationModel.page * paginationModel.pageSize,
                (paginationModel.page + 1) * paginationModel.pageSize
              )
              .map((problem, idx) => (
                <Box
                  key={problem._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    py: 1.5,
                    borderBottom: `1px solid ${borderColor}`,
                    bgcolor: theme.palette.background.main,
                    transition: "background 0.2s",
                    cursor: "pointer",
                    fontSize: 16,
                    "&:hover": { bgcolor: hoverColor },
                  }}
                  component={Link}
                  to={`/statement/${problem._id}`}
                >
                  <Box sx={{ width: 40 }}>
                    {paginationModel.page * paginationModel.pageSize + idx + 1}
                  </Box>
                  <Box
                    sx={{
                      flex: 2,
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    {problem.statement}
                  </Box>
                  <Box
                    sx={{
                      width: 120,
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    {problem.acceptance
                      ? `${problem.acceptance.toFixed(1)}%`
                      : "-"}
                  </Box>
                  <Box sx={{ width: 100, textAlign: "center" }}>
                    <Chip
                      label={problem.difficulty}
                      size="medium"
                      sx={{
                        bgcolor: difficultyColors[problem.difficulty] || "#eee",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 15,
                        textTransform: "capitalize",
                        height: 32,
                        border: "none",
                        boxShadow: "none",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: 140,
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    {problem.topic}
                  </Box>
                </Box>
              ))}
          </Paper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              fontSize: 16,
            }}
          >
            <Button
              disabled={paginationModel.page === 0}
              onClick={() =>
                setPaginationModel((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              sx={{
                fontSize: 15,
                px: 2,
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Previous
            </Button>
            <Typography sx={{ mx: 2, alignSelf: "center", fontSize: 16 }}>
              Page {paginationModel.page + 1} of{" "}
              {Math.ceil(filteredProblems.length / paginationModel.pageSize)}
            </Typography>
            <Button
              disabled={
                (paginationModel.page + 1) * paginationModel.pageSize >=
                filteredProblems.length
              }
              onClick={() =>
                setPaginationModel((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              sx={{
                fontSize: 15,
                px: 2,
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: 300,
          borderLeft: `1px solid ${borderColor}`,
          py: 3,
          px: 2,
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: "none",
            border: `1px solid ${borderColor}`,
            bgcolor: theme.palette.background.main,
          }}
        >
          <Typography fontWeight={700} sx={{ mb: 1, fontSize: 16 }}>
            Top Solvers
          </Typography>
          <List>
            {["Alice", "Bob", "Charlie", "David", "Eve"].map((solver, idx) => (
              <ListItem key={idx} sx={{ px: 0 }}>
                <ListItemText
                  primary={`${idx + 1}. ${solver}`}
                  primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: 14, color: theme.palette.text.secondary }}
                >
                  {Math.floor(Math.random() * 1000)} pts
                </Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: "none",
            border: `1px solid ${borderColor}`,
            bgcolor: theme.palette.background.main,
          }}
        >
          <Typography fontWeight={700} sx={{ mb: 1, fontSize: 16 }}>
            Would you recommend your friends to try the new Library?
          </Typography>
          <Box sx={{ display: "flex", gap: 0.2, flexwrap: "wrap" }}>
            {["😞", "🤔", "😐", "😃", "🤩"].map((emoji, idx) => (
              <IconButton
                key={idx}
                sx={{ fontSize: 22, color: activeAvatarBg }}
              >
                {emoji}
              </IconButton>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Problems;
