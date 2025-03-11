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
import { TableContainer, Paper, Button } from "@mui/material";
import Problems from "./Table/Problems";
import Submissions from "./Table/Submissions";
import Leaderboard from "./Table/Leaderboard";
import CompetitionTerms from "../Terms";

const Competition = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [problems, setProblems] = useState({});
  const [submissions, setSubmissions] = useState({});
  const [allSubmissions, setAllSubmissions] = useState({});
  const [leaderboard, setLeaderboard] = useState({});
  const [loading, setLoading] = useState(true);
  const [menuOption, setMenuOption] = useState("problems");
  const [terms, setTerms] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const { timestamp } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const checkTimeStamp = (data) => {
    console.log(data.fetchedCompetition.users);
    const timestamp = data.fetchedCompetition.users.filter(
      (compuser) => compuser.userId === user._id
    )[0].timestamp;
    dispatch(setTimestamp(timestamp));
    if (timestamp) {
      setTerms(false);
    }
  }

  const getCompetitionOverview = async () => {
    try {
      const { data } = await axios.post(
        urlConstants.getCompetition,
        {
          id: params.id,
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
      checkTimeStamp(data);
      setProblems(data.fetchedCompetition.problems); 
    } catch (e) {
      console.log(e);
      
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
          u_id: user._id,
          verdict: "passed",
        },
        getConfig()
      );
      setSubmissions(data.submissions);
    } catch (e) {
      console.log(e);
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
      console.log(e);
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
      console.log(e);
    }
  };

  const verifySubmissions = (problemId) => {
    const numberOfPassedSubmissions = submissions?.filter(
      (submission) =>
        String(submission.p_id) === problemId && submission.verdict === "passed"
    ).length;
    return numberOfPassedSubmissions;
  };

  const registerUserForCompetiton = async () => {
    try {
      await axios.post(
        urlConstants.registerUserForCompetiton,
        {
          user_id: user._id,
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
    <div className="competition-page">
      <CompetitionTimer competitionTimestamp={timestamp} />
      <div className="header">
        <Button
          className={`width-33 outline-grey black ${
            menuOption === "problems" ? "red" : ""
          }`}
          variant="outlined"
          onClick={() => setMenuOption("problems")}
        >
          Problem
        </Button>
        <Button
          className={`width-33 outline-grey black ${
            menuOption === "submissions" ? "red" : ""
          }`}
          variant="outlined"
          onClick={() => setMenuOption("submissions")}
        >
          Submissions
        </Button>
        <Button
          className={`width-33 outline-grey black ${
            menuOption === "leaderboard" ? "red" : ""
          }`}
          variant="outlined"
          onClick={() => setMenuOption("leaderboard")}
        >
          Leaderboard
        </Button>
      </div>
      <TableContainer
        className="table"
        sx={{ width: "50rem" }}
        component={Paper}
      >
        {menuOption === "problems" && (
          <Problems problems={problems} verifySubmissions={verifySubmissions} />
        )}
        {menuOption === "submissions" && (
          <Submissions allSubmissions={allSubmissions} />
        )}
        {menuOption === "leaderboard" && (
          <Leaderboard leaderboard={leaderboard} />
        )}
      </TableContainer>
    </div>
  );
};

export default Competition;
