import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loader/Loader";
import axios from "axios";
import getFormattedDateTime from "../../utils/time";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { urlConstants } from "../../apis";
import { getConfig } from "../../utils/getConfig";

const Competitions = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const addUserToCompetition = async (id) => {
    try {
      await axios.post(
        urlConstants.registerForCompetiton,
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
    <div className="competition-page">
      <div className="table">
        {competitions.map((competition) => (
          <div key={competition._id} className="compeitition-card">
            <div className="card-content">
              <img
                className="card-img"
                src="https://leetcode.com/_next/static/images/weekly-default-553ede7bcc8e1b4a44c28a9e4a32068c.png"
              />
              <div className="card-info">
                <div>
                  <h3
                    className="pointer"
                    onClick={() => handleCompetitionRedirect(competition)}
                  >
                    {competition.title}
                  </h3>
                  <p className="grey">
                    Start - {getFormattedDateTime(competition.start_date)}
                  </p>
                  <p className="grey">
                    End - {getFormattedDateTime(competition.end_date)}
                  </p>
                </div>
                <button
                  onClick={() => addUserToCompetition(competition._id)}
                  className={`btn-col primary ${
                    foundUser(competition) ? "register" : ""
                  }`}
                >
                  {foundUsers(competition) ? "Registered" : "Register"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Competitions;
