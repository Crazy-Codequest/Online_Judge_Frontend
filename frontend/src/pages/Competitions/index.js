import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loader/Loader";
import axios from "axios";
import getFormattedDateTime from "../../utils/time";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { urlConstants } from "../../apis";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  Box,
  CardMedia,
  useTheme,
} from "@mui/material";
import { getConfig } from "../../utils/getConfig";
import { images } from "../../data/contest";
import { Event, Group, CheckCircle } from "@mui/icons-material";

const Competitions = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();

  const addUserToCompetition = async (id) => {
    try {
      await axios.post(
        urlConstants.addUserForCompetiton,
        {
          user_id: user._id,
          id,
        },
        getConfig()
      );
      setCompetitions((prevCompetitions) =>
        prevCompetitions.map((competition) =>
          competition._id === id
            ? {
                ...competition,
                user: {
                  ...competition.user,
                  userId: user._id, timestamp: new Date() ,
                },
              }
            : competition
        )
      );
      toast.success("Registered for competition successfully!");
    } catch (e) {
      console.log(e);
    }
  };

  const getSearchedCompetition = (competition) => {
    try {
      if (!foundUser(competition)) {
        toast.error("Please register for this competition first");
        return;
      } navigate(`/competition/${competition._id}`);
    } catch (e) {
      console.log(e);
    }
  };
  
  const getCompetitions = async () => {
    try {
      const { data } = await axios.get(
        `${urlConstants.getCompetitions}?id=${user._id}`,
        getConfig()
      );
      setCompetitions(data.competitions);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const foundUser = (competition) => {    
    if(!competition.user) return false;
    return competition.user["userId"] === user._id;
  };

  const handleCompetitionRedirect = (competition) => {
    const currentDate = new Date();
    if (
      currentDate >= new Date(competition.start_date) &&
      currentDate <= new Date(competition.end_date)
    ) {
      if (!foundUser(competition)) {
        toast.error("Please register for this competition first");
        return;
      }

      getSearchedCompetition(competition);
    } else {
      toast.error("This competition is not currently active");
    }
  };

  useEffect(() => {
    getCompetitions();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const getStatus = (competition) => {
    const now = new Date();
    if (now < new Date(competition.start_date)) return { label: "Upcoming", color: "info" };
    if (now > new Date(competition.end_date)) return { label: "Ended", color: "default" };
    return { label: "Ongoing", color: "success" };
  };

  return (
    <Box
      sx={{ bgcolor: theme.palette.background.main, minHeight: "100vh", py: 4, px: 2 }}
    >
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Event sx={{ fontSize: 36, color: "#1976d2", mb: -1, mr: 1 }} />
        <Typography
          variant="h4"
          fontWeight={800}
          color="#2d3a4a"
          display="inline"
        >
          Upcoming Competitions
        </Typography>
        <Typography variant="subtitle1" color="#7b8ba3" mt={1}>
          Join, compete, and climb the leaderboard!
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", lg: "80%" },
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          py: 2,
        }}
      >
        {competitions.length > 0 &&
          competitions.map((competition, index) => {
            const status = getStatus(competition);
            return (
              <Card
                key={competition._id}
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  position: "relative",
                  bgcolor: theme.palette.background.main,
                  "&:hover": {
                    transform: "scale(1.025)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{ position: "absolute", top: 16, left: 16, zIndex: 2 }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      bgcolor:
                        status.color === "success"
                          ? "#e8f5e9"
                          : status.color === "info"
                          ? "#e3f2fd"
                          : "#ececec",
                      color:
                        status.color === "success"
                          ? "#388e3c"
                          : status.color === "info"
                          ? "#1976d2"
                          : "#7b8ba3",
                      fontWeight: 700,
                    }}
                  >
                    {status.label}
                  </Typography>
                </Box>
                <CardMedia
                  component="img"
                  onClick={() => handleCompetitionRedirect(competition)}
                  sx={{
                    height: 180,
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    cursor: "pointer",
                  }}
                  src={images[index % images.length]}
                  alt="Competition Banner"
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight={800}
                    sx={{ cursor: "pointer", mb: 1, color: "#2d3a4a" }}
                    onClick={() => handleCompetitionRedirect(competition)}
                  >
                    {competition.title}
                  </Typography>
                  <Typography variant="body2" color="#7b8ba3">
                    📅 Start:{" "}
                    <strong>
                      {getFormattedDateTime(competition.start_date)}
                    </strong>
                  </Typography>
                  <Typography variant="body2" color="#7b8ba3" mb={1}>
                    🏁 End:{" "}
                    <strong>
                      {getFormattedDateTime(competition.end_date)}
                    </strong>
                  </Typography>
                  {competition.participants && (
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Group sx={{ fontSize: 18, color: "#1976d2", mr: 0.5 }} />
                      <Typography variant="caption" color="#1976d2">
                        {competition.participants.length} participants
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    fullWidth
                    variant={foundUser(competition) ? "contained" : "outlined"}
                    color={foundUser(competition) ? "success" : "primary"}
                    onClick={() => addUserToCompetition(competition._id)}
                    startIcon={foundUser(competition) ? <CheckCircle /> : null}
                    title={
                      foundUser(competition)
                        ? "You are registered for this competition"
                        : "Register to participate"
                    }
                    sx={{ fontWeight: 700, fontSize: 16, borderRadius: 2 }}
                    disabled={foundUser(competition)}
                  >
                    {foundUser(competition) ? "Registered" : "Register"}
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </Box>
    </Box>
  );
};

export default Competitions;
