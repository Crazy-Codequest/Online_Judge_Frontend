import React, { useEffect, useState } from "react";
import "./Competitions.css";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loader/Loader";
import axios from "axios";
import getFormattedDateTime from "../../utils/time";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Competitions = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const addUserToCompetition = async (id) => {
    try {
      await axios.post("http://localhost:5000/api/competition/registeruser", {
        user_id: user._id,
        id,
      });
      setCompetitions((prevCompetitions) =>
        prevCompetitions.map((competition) =>
          competition._id === id
            ? { ...competition, user: [...competition.user, user._id] }
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
        "http://localhost:5000/api/competition",
        {
          id: params.id,
        }
      );
      setCompetitions(data.competitions);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
                    onClick={() => getSearchedCompetition(competition._id)}
                  >
                    {competition.title}
                  </h3>
                  <p className="grey">
                    {getFormattedDateTime(competition.start_date)}
                  </p>
                </div>
                <button
                  onClick={() => addUserToCompetition(competition._id)}
                  className={`btn-col primary ${
                    competition.user.includes(user._id) ? "register" : ""
                  }`}
                >
                  {competition.user.includes(user._id)
                    ? "Registered"
                    : "Register"}
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
