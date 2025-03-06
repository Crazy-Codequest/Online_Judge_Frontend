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
} from "@mui/material";
import { getConfig } from "../../utils/getConfig";
import { images } from "../../data/contest";

const Competitions = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const addUserToCompetition = async (id) => {
    try {
      await axios.post(
        urlConstants.registerUserForCompetiton,
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
                users: [
                  ...competition.users,
                  { userId: user._id, timestamp: new Date() },
                ],
              }
            : competition
        )
      );
      toast.success("Registered for competition successfully!");
    } catch (e) {
      console.log(e);
    }
  };

  const getSearchedCompetition = (id) => {
    try {
      navigate(`/competition/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const getCompetitions = async () => {
    try {
      const { data } = await axios.get(
        urlConstants.getCompetitions,
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
    return competition.users.find((user) => user?.userId === user._id);
  };

  const foundUsers = (competition) => {
    return competition.users.find(
      (comp_user) => comp_user?.userId === user._id
    );
  };

  const handleCompetitionRedirect = (competition) => {
    const currentDate = new Date();
    if (
      currentDate >= new Date(competition.start_date) &&
      currentDate <= new Date(competition.end_date)
    ) {
      if (foundUser(competition)) {
        toast.error("Please register for this competition first");
        return;
      }

      getSearchedCompetition(competition._id);
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

  return (
    <Box
      sx={{
        width: { xs: "100%", lg: "60%" },
        mx: "auto",
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
        px: 4,
      }}
    >
      {competitions.map((competition, index) => (
        <Card key={competition._id} className="mb-2">
          <CardContent>
            <CardMedia
              component="img"
              sx={{
                maxHeight: "200px",
                width: "100%",
              }}
              src={images[index % 5]}
              alt="Competition Logo"
            />
            <Typography
              sx={{ mt: 1, cursor: "pointer" }}
              variant="h5"
              component="div"
              className="pointer"
              onClick={() => handleCompetitionRedirect(competition)}
            >
              {competition.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Start - {getFormattedDateTime(competition.start_date)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              End - {getFormattedDateTime(competition.end_date)}
            </Typography>
            <CardActions className="mt-1">
              <Button
                onClick={() => addUserToCompetition(competition._id)}
                variant="contained"
                style={{ width: "100%" }}
                className={`btn-col primary ${
                  foundUser(competition) ? "register" : ""
                }`}
              >
                {foundUsers(competition) ? "Registered" : "Register"}
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Competitions;
