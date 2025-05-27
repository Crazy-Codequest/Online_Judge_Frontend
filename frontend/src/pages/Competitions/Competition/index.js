import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Loader/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { urlConstants } from "../../../apis";
import { getConfig } from "../../../utils/getConfig";
import CompetitionTimer from "../timer";
import { setTimestamp } from "../../../features/auth/dataSlice";
import { 
  TableContainer, 
  Paper, 
  Box, 
  Container,
  Typography,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Divider
} from "@mui/material";
import Problems from "./Table/Problems";
import Submissions from "./Table/Submissions";
import Leaderboard from "./Table/Leaderboard";
import CompetitionTerms from "../Terms";

const Competition = () => {
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [problems, setProblems] = useState({});
  const [submissions, setSubmissions] = useState({});
  const [allSubmissions, setAllSubmissions] = useState({});
  const [leaderboard, setLeaderboard] = useState({});
  const [loading, setLoading] = useState(true);
  const [menuOption, setMenuOption] = useState("problems");
  const [terms, setTerms] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const { timestamp } = useSelector((state) => state.data);

  const isLightMode = theme.palette.mode === "light";
  const borderColor = isLightMode ? "#e0e0e0" : "#444";

  const dispatch = useDispatch();

  const checkTimeStamp = (data) => {
    const timestamp = data?.fetchedCompetition?.user?.timestamp;
    dispatch(setTimestamp(timestamp));
    if (timestamp) {
      setTerms(false);
    }
  }  

  const getCompetitionOverview = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.getCompetitionOverview,
        {
          id: params.id,
          userId: user?.id
        },
        getConfig()
      );
      checkTimeStamp(data);
    } catch (error) {
      console.error(error);
    }
  }

  const getProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        urlConstants.getCompetition,
        {
          id: params.id,
        },
        getConfig()
      );
      setProblems(data.fetchedCompetition.problems); 
    } catch (e) {
      console.error(e);
      
      if (
        e.response?.data?.error === "This competition is not currently active"
      ) {
        toast.error("Competition is currently inactive.");
      } else {
        toast.error("Sorry couldn't fetch the competition");
      }
      navigate("/competitions");
    } finally {
      setLoading(false);
    }
  };

  const getSubmissions = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.getUserSubmissions,
        {
          c_id: params.id,
          u_id: user?.id,
          verdict: "passed",
        },
        getConfig()
      );
      setSubmissions(data.submissions);
    } catch (e) {
      console.error(e);
    }
  };

  const getLeaderboard = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.getLeaderboard,
        {
          c_id: params.id,
        },
        getConfig()
      );
      setLeaderboard(data.leaderboard);
    } catch (e) {
      console.error(e);
    }
  };

  const getAllSubmissions = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.getAllSubmissions,
        {
          c_id: params.id,
        },
        getConfig()
      );

      setAllSubmissions(data.submissions);
    } catch (e) {
      console.error(e);
    }
  };

  const verifySubmissions = (problemId) => {
    const numberOfPassedSubmissions = submissions.length ? submissions?.filter(
      (submission) =>
        String(submission.p_id) === problemId && submission.verdict === "passed"
    ).length: 0;
    return numberOfPassedSubmissions;
  };

  const registerUserForCompetiton = async () => {
    try {
      await axios.post(
        urlConstants.registerUserForCompetiton,
        {
          user_id: user?.id,
          id: params.id,
        },
        getConfig()
      );
      await getCompetitionOverview();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCompetitionOverview();
  }, [])

  useEffect(() => {
    if(!terms){
      getProblems();
      getSubmissions();
      getAllSubmissions();
      getLeaderboard();
    }
  }, [terms]);

  if(terms){
    return <CompetitionTerms onAccept={registerUserForCompetiton} />;
  }

  if (loading && !problems.length) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.main,
        py: 4,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          width: { xs: "100%", lg: "70%" },
        }}
      >
        <Box
          sx={{
            mb: 4,
            p: 3,
          }}
        >
          <CompetitionTimer competitionTimestamp={timestamp} />
        </Box>

        <Box
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Tabs
            value={menuOption}
            onChange={(e, newValue) => setMenuOption(newValue)}
            variant={isMobile ? "fullWidth" : "standard"}
            centered={!isMobile}
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1.1rem",
                py: 2.5,
                minWidth: 160,
                color: "text.secondary",
                "&:hover": {
                  bgcolor: isLightMode ? "grey.300" : "grey.700",
                  color: isLightMode ? "text.primary" : "text.secondary",
                },
              },
              "& .Mui-selected": {
                color: "primary.main",
              },
              "& .MuiTabs-indicator": {
                height: 3,
                backgroundColor: "primary.main",
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography variant="h6">Problems</Typography>
                  {problems.length > 0 && (
                    <Box
                      sx={{
                        bgcolor: "primary.main",
                        borderRadius: "12px",
                        px: 1.5,
                        py: 0.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: isLightMode ? "#fff" : "#000",
                      }}
                    >
                      {problems.length}
                    </Box>
                  )}
                </Box>
              }
              value="problems"
            />
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography variant="h6">Submissions</Typography>
                  {submissions.length > 0 && (
                    <Box
                      sx={{
                        bgcolor: "primary.main",
                        borderRadius: "12px",
                        px: 1.5,
                        py: 0.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: isLightMode ? "#fff" : "#000",
                      }}
                    >
                      {submissions.length}
                    </Box>
                  )}
                </Box>
              }
              value="submissions"
            />
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography variant="h6">Leaderboard</Typography>
                  {leaderboard.length > 0 && (
                    <Box
                      sx={{
                        bgcolor: "primary.main",
                        borderRadius: "12px",
                        px: 1.5,
                        py: 0.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: isLightMode ? "#fff" : "#000",
                      }}
                    >
                      {leaderboard.length}
                    </Box>
                  )}
                </Box>
              }
              value="leaderboard"
            />
          </Tabs>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          {menuOption === "problems" && (
            <Problems
              problems={problems}
              verifySubmissions={verifySubmissions}
            />
          )}
          {menuOption === "submissions" && (
            <Submissions allSubmissions={allSubmissions} />
          )}
          {menuOption === "leaderboard" && (
            <Leaderboard leaderboard={leaderboard} />
          )}
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Competition;
