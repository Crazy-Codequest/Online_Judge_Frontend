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

  return (
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
        py: 4,
        overflowY: "hidden"
      }}
    >
      {competitions.map((competition, index) => (
        <Card
          key={competition._id}
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              height: 180,
              objectFit: "cover",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
            src={images[index % images.length]}
            alt="Competition Banner"
          />
          <CardContent sx={{ p: 2 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ cursor: "pointer", mb: 1 }}
              onClick={() => handleCompetitionRedirect(competition)}
            >
              {competition.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              📅 Start:{" "}
              <strong>{getFormattedDateTime(competition.start_date)}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              🏁 End:{" "}
              <strong>{getFormattedDateTime(competition.end_date)}</strong>
            </Typography>
          </CardContent>
          <CardActions sx={{ px: 2, pb: 2 }}>
            <Button
              fullWidth
              variant={foundUser(competition) ? "contained" : "outlined"}
              color={foundUser(competition) ? "success" : "primary"}
              onClick={() => addUserToCompetition(competition._id)}
            >
              {foundUser(competition) ? "✅ Registered" : "Register"}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Competitions;
